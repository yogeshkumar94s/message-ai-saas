import { z } from "zod";

const messageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Message content cannot be empty" })
    .max(500, { message: "Message content cannot exceed 500 characters" }),
});

export default messageSchema;
