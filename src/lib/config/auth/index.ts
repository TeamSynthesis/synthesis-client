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
import db from "../db";

const adapter = new DrizzlePostgreSQLAdapter(db, UserSession, User);
const auth = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
    };
  },
  getSessionAttributes: (attributes) => {
    return {
      geoLocation: attributes.geoLocation,
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

const gitHub = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
  redirectURI: GITHUB_REDIRECT_URI,
});

type Auth = typeof auth;

export { auth, gitHub, type Auth };
