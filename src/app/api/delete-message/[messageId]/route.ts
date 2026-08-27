import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import dbConnect from "@/lib/connectdb";
import UserModel from "@/models/user";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ messageId: string }> }
) {
  try {
    const { messageId } = await params;

    // Validate message ID
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return Response.json(
        {
          success: false,
          message: "Invalid message ID",
        },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Get logged-in user
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    // Delete message only from the logged-in user's messages
    const result = await UserModel.updateOne(
      {
        _id: session.user._id,
        "messages._id": messageId,
      },
      {
        $pull: {
          messages: {
            _id: messageId,
          },
        },
      }
    );

    // Nothing was modified
    if (result.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);

    return Response.json(
      {
        success: false,
        message: "Error deleting message",
      },
      { status: 500 }
    );
  }
}