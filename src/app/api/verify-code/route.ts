import dbConnect from "@/lib/connectdb";
import UserModel from "@/models/user";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json();

        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({
            username: decodedUsername
        });

        // User not found
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 404 }
            );
        }

        // Check if code is expired
        const isCodeNotExpired =
            new Date(user.verifyCodeExpiry) > new Date();

        if (!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message:
                        "Verification code has expired, please signup again to get a new code"
                },
                { status: 400 }
            );
        }

        // Check verification code
        const isCodeValid = user.verifyCode === code;

        if (!isCodeValid) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid verification code"
                },
                { status: 400 }
            );
        }

        // Verify user
        user.isVerified = true;

        await user.save();

        return Response.json(
            {
                success: true,
                message: "Account verified successfully"
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error verifying username:", error);

        return Response.json(
            {
                success: false,
                message: "Error verifying username"
            },
            { status: 500 }
        );
    }
} 