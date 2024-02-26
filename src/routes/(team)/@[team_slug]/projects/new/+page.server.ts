import type { PageServerLoad } from "./$types";
import { z } from "zod";

const newProjectFromAISchema = z.object({
  name: z
    .string()
    .min(2, { message: "Project name must be at least 2 characters long" })
    .max(64, { message: "Project name must be less than 64 characters long" }),

  description: z
    .string()
    .min(32, { message: "Project name must be at least 2 characters long" })
    .max(2056, {
      message: "Project name must be less than 64 characters long",
    }),
});
