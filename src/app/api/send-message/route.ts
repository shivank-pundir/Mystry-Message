import dbConnect from "@/lib/connectdb";
import UserModel from "@/models/user";
import {Message} from "@/models/user";


export async function POST(request: Request) {
    try {
        await dbConnect();

        const { username, content } = await request.json();

        // Validate request data
        if (!username || !content) {
            return Response.json(
                {
                    success: false,
                    message: "Username and content are required",
                },
                { status: 400 }
            );
        }

        // Find the user
        const user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // Check whether user accepts messages
        if (!user.isAcceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting messages",
                },
                { status: 403 }
            );
        }

        // Create message
        const newMessage = {
            content,
            createdAt: new Date(),
        };

        // Add message to user's messages array
        user.messages.push(newMessage as Message);

        // Save user
        await user.save();

        return Response.json(
            {
                success: true,
                message: "Message sent successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Failed to send the message to the user:",
            error
        );

        return Response.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}