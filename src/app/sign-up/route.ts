import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { findExistingUser } from "@/helpers/sign-up/findExistingUser";
import { updateOrCreateUser } from "@/helpers/sign-up/updateOrCreateUser";
import { generateVerificationCode } from "@/helpers/sign-up/generateVerificationCode";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    const { existingUserVerifiedByUsername, existingUserByEmail } =
      await findExistingUser(username, email);

    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const verifyCode = generateVerificationCode();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry time to 1 hour

    if (existingUserByEmail && existingUserByEmail.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User already exists with this email! Try with a different one",
        },
        { status: 400 }
      );
    }

    await updateOrCreateUser(
      existingUserByEmail,
      username,
      email,
      password,
      verifyCode,
      expiryDate
    );

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully! Please verify your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}

// import dbConnect from "@/lib/db";
// import UserModel from "@/models/User";
// import bcrypt from "bcryptjs";

// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// export async function POST(request: Request) {
//   await dbConnect();

//   try {
//     const { username, email, password } = await request.json();

//     const existingUserVerifiedByUsername = await UserModel.findOne({
//       username,
//       isVerified: true,
//     });

//     if (existingUserVerifiedByUsername) {
//       return Response.json(
//         {
//           success: false,
//           message: "Username is already taken",
//         },
//         { status: 400 }
//       );
//     }

//     const existingUserByEmail = await UserModel.findOne({ email });

//     const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

//     if (existingUserByEmail) {
//       if (existingUserByEmail.isVerified) {
//         return Response.json(
//           {
//             success: false,
//             message:
//               "User already exist with this email! Try with different one",
//           },
//           { status: 400 }
//         );
//       } else {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         existingUserByEmail.password = hashedPassword;
//         existingUserByEmail.verifyCode = verifyCode;
//         existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
//         await existingUserByEmail.save();
//       }
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const expiryDate = new Date();
//       expiryDate.setHours(expiryDate.getHours() + 1);

//       const newUser = new UserModel({
//         username,
//         email,
//         password: hashedPassword,
//         verifyCode,
//         verifyCodeExpiry: expiryDate,
//         isVerified: false,
//         isAcceptingMessages: true,
//         messages: [],
//       });

//       await newUser.save();
//     }

//     // send Verificaton Email
//     const emailResponse = await sendVerificationEmail(
//       email,
//       username,
//       verifyCode
//     );

//     if (!emailResponse.success) {
//       return Response.json(
//         {
//           success: false,
//           message: emailResponse.message,
//         },
//         { status: 500 }
//       );
//     }

//     return Response.json(
//       {
//         success: true,
//         message: "User registered successfully! Please verify your email. ",
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error registering user", error);
//     return Response.json(
//       {
//         success: false,
//         message: "Error registering user",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
