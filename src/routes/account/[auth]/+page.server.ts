import { error, fail, redirect, isRedirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { type TX, getPooledConnection } from "$lib/config/db";
import { User } from "$lib/models/user/user";
import bcrypt from "bcryptjs";
import logger from "$lib/utils/logger";
import { auth, initializeAuth } from "$lib/config/auth";
import { eq } from "drizzle-orm";

const emailAuthSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(1024, { message: "Password must be less than 1024 characters long" })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message:
        "Password must contain at least one number, one uppercase letter and one one lowercase letter.",
    }),
});

export const load: PageServerLoad = async (e) => {
  if (!["sign-in", "sign-up"].includes(e.params.auth)) throw error(404);
  const form = await superValidate(e, emailAuthSchema);
  return {
    form,
  };
};

export const actions = {
  default: async (e) => {
    const form = await superValidate(e, emailAuthSchema);
    const fancyFail = _initializeFancyFail(form);

    if (!form.valid) return fancyFail("Invalid form data");
    const { pool, db } = getPooledConnection();

    try {
      pool.connect();
      switch (e.params.auth) {
        case "sign-up":
          const userId: string = uuid();
          await db.transaction(async (tx) => {
            await Promise.all([
              tx.insert(User).values({
                id: userId,
                email: form.data.email,
                username: "unset:" + userId,
                createdAt: new Date(),
                authProvider: "email",
                passwordHash: bcrypt.hashSync(
                  form.data.password,
                  bcrypt.genSaltSync(10)
                ),
              }),
              _createSession(e, userId, tx),
            ]).catch((e: any) => {
              throw e;
            });
          });
          throw redirect(302, "/account/details");

        case "sign-in":
          const user = (
            await db
              .select({ id: User.id, passwordHash: User.passwordHash })
              .from(User)
              .where(eq(User.email, form.data.email))
          )[0];
          if (
            !user ||
            !user.passwordHash ||
            !bcrypt.compareSync(form.data.password, user.passwordHash)
          )
            return fancyFail("Invalid email or password", 401);
          await _createSession(e, user.id);
          throw redirect(302, "/@~");
      }
    } catch (e: any) {
      if (isRedirect(e)) throw e;
      if (
        e?.message?.includes('violates unique constraint "user_email_unique"')
      )
        return fancyFail("The email address is already in use", 400);
      logger("ERROR", "Error creating user", e);
      return fancyFail("An internal error has occured.  Please try again", 500);
    } finally {
      pool.end();
    }
  },
};

export const _initializeFancyFail = (form: any) => {
  return (message: string, status?: number) => {
    if (message.includes("email")) form.errors.email = message;
    if (message.includes("password")) form.errors.password = message;
    form.errors._errors = [message];

    return fail(status ?? 400, {
      form,
    });
  };
};

export const _createSession = async (e: any, userId: string, tx?: TX) => {
  let _auth = auth;
  if (tx) _auth = initializeAuth(tx);

  const session = await _auth.createSession(
    userId,
    {
      createdAt: new Date(),
      ipAddress: e.getClientAddress(),
      userAgent: e.request.headers.get("user-agent") ?? null,
    },
    {
      sessionId: uuid(),
    }
  );

  const sessionCookie = auth.createSessionCookie(session.id);

  e.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });
};
