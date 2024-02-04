// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user: import("lucia").User | null;
      session: import("lucia").Session | null;
    }
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}
declare module "lucia" {
  interface Register {
    Lucia: import("$lib/config/auth").Auth;
    DatabaseUserAttributes: Pick<import("$lib/models/user/user").TUser, "id">;
    DatabaseSessionAttributes: Pick<
      import("$lib/models/user/user-session").TUserSession,
      "createdAt" | "ipAddress" | "userAgent"
    >;
  }
}

export {};
