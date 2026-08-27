import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/connectdb";
import UserModel from "@/models/user";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }

    const user = session.user as User;

    if (!user._id) {
      return Response.json(
        {
          success: false,
          message: "User ID not found in session",
        },
        { status: 400 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    const userData = await UserModel.findById(userId).select(
      "messages"
    );

    if (!userData) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const messages = [...(userData.messages || [])].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    return Response.json(
      {
        success: true,
        message: "Messages fetched successfully",
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}