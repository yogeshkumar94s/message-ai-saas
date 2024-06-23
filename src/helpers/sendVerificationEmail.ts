import { resend } from "@/lib/resend";
import { EmailTemplate } from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Random Jokes: Verification Code",
      react: EmailTemplate({ username, otp: verifyCode }),
    });
    return { success: true, message: "VerificationEmail sent successfully!" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email!" };
  }
}
