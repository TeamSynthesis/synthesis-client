import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { dev } from "$app/environment";
import { GitHub } from "arctic";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
} from "$env/static/private";
import { UserSession } from "$lib/models/user/user-session";
import { User } from "$lib/models/user/user";
import db, { type DB, type TX } from "../db";

const initializeAuth = (db: DB | TX) =>
  new Lucia(new DrizzlePostgreSQLAdapter(db, UserSession, User), {
    getUserAttributes: (attributes) => {
      return {
        id: attributes.id,
      };
    },
    getSessionAttributes: (attributes) => {
      return {
        createdAt: attributes.createdAt,
        ipAddress: attributes.ipAddress,
        userAgent: attributes.userAgent,
      };
    },
    sessionCookie: {
      attributes: {
        secure: !dev,
      },
    },
  });

const auth = initializeAuth(db);

const gitHub = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
  redirectURI: GITHUB_REDIRECT_URI,
});

type Auth = typeof auth;

export { auth, gitHub, initializeAuth, type Auth };
