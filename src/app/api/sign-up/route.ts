import dbConnect from "@/lib/connectdb";
import { sendVerficationEmail } from "@/lib/halper/sendVerficationEmail";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        // Basic validation
        if (!username || !email || !password) {
            return Response.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        const normalizedUsername = username.trim();
        const normalizedEmail = email.toLowerCase().trim();

        // Check if username already exists and is verified
        const existingUserVerifiedByUsername =
            await UserModel.findOne({
                username: normalizedUsername,
                isVerified: true,
            });

        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken",
                },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingUserFindByEmail = await UserModel.findOne({
            email: normalizedEmail,
        });

        // Generate 6-digit verification code
        const verifyCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // OTP expires after 1 hour
        const expiryDate = new Date(
            Date.now() + 60 * 60 * 1000
        );

        if (existingUserFindByEmail) {

            // Email already belongs to a verified user
            if (existingUserFindByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User already exists with this email",
                    },
                    { status: 400 }
                );
            }

            // User exists but is not verified
            const hashPassword = await bcrypt.hash(password, 10);

            existingUserFindByEmail.password = hashPassword;
            existingUserFindByEmail.verifyCode = verifyCode;
            existingUserFindByEmail.verifyCodeExpiry = expiryDate;

            await existingUserFindByEmail.save();

        } else {

            // Create a new user
            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                username: normalizedUsername,
                email: normalizedEmail,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            });

            await newUser.save();
        }

        // Send verification email
        const verificationEmail = await sendVerficationEmail(
            normalizedEmail,
            normalizedUsername,
            verifyCode
        );

        if (!verificationEmail.success) {
            return Response.json(
                {
                    success: false,
                    message: verificationEmail.message,
                },
                { status: 500 }
            );
        }

        // Success response
        return Response.json(
            {
                success: true,
                message:
                    "User registered successfully. Please verify your email.",
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error registering user:", error);

        return Response.json(
            {
                success: false,
                message: "Error registering user",
            },
            { status: 500 }
        );
    }
}