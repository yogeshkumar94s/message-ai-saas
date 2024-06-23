import UserModel from "@/models/User";
import { hashPassword } from "./hashedPassword";

export async function updateOrCreateUser(
  existingUser: any,
  username: string,
  email: string,
  password: string,
  verifyCode: string,
  expiryDate: Date
) {
  const hashedPassword = await hashPassword(password);

  if (existingUser) {
    existingUser.password = hashedPassword;
    existingUser.verifyCode = verifyCode;
    existingUser.verifyCodeExpiry = expiryDate;
    await existingUser.save();
  } else {
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpiry: expiryDate,
      isVerified: false,
      isAcceptingMessages: true,
      messages: [],
    });

    await newUser.save();
  }
}
