import UserModel from "@/models/User";

export async function findExistingUser(username: string, email: string) {
  const existingUserVerifiedByUsername = await UserModel.findOne({
    username,
    isVerified: true,
  });

  const existingUserByEmail = await UserModel.findOne({ email });

  return { existingUserVerifiedByUsername, existingUserByEmail };
}
