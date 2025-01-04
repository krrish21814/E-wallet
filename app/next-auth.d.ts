import { DefaultSession } from "next-auth";

// Extend the default session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the userId field here
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"]; // Keep the rest of the user properties
  }

  interface User {
    id: string; // Add the userId to the User interface as well
  }
}
