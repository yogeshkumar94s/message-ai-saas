import UserModel from "@/models/User";
import dbConnect from "@/lib/db";

import { Message } from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 404 }
      );
    }
    // is user accepting the messages
    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting the message",
        },
        { status: 403 }
      );
    }
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 401 }
    );
  } catch (error) {
    console.log("Error adding message", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
