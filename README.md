# 🔐 Secret Message

A full-stack anonymous messaging web application built with **Next.js, TypeScript, MongoDB, and NextAuth**.

Secret Message allows users to create an account, share their unique profile link, and receive anonymous messages from anyone. Users can manage their messages from a personal dashboard and use AI to generate interesting message suggestions.

## ✨ Features

* 🔐 User authentication with NextAuth
* 📝 User registration and login
* 📧 Email verification using OTP
* 👤 Unique username/profile for every user
* 🔗 Shareable anonymous messaging link
* 💬 Receive anonymous messages
* 📊 Personal dashboard to manage messages
* 🗑️ Delete messages
* 🔄 Refresh messages
* 📋 Copy profile URL to clipboard
* 🔘 Enable/disable receiving messages
* 🤖 AI-powered message suggestions using Google Gemini
* 📱 Responsive design
* 🎨 Modern UI using Tailwind CSS and shadcn/ui
* ✅ Form validation using React Hook Form and Zod
* 📩 Email functionality using Resend

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **TypeScript**
* **React**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide React**
* **React Hook Form**
* **Zod**

### Backend

* **Next.js API Routes**
* **MongoDB**
* **Mongoose**
* **NextAuth**
* **Axios**

### Other Services

* **Resend** — Email delivery and verification
* **Google Gemini AI** — AI-generated message suggestions

---

## 📂 Project Structure

```text
my-app/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── verify/
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── sign-up/
│   │   │   ├── verify-code/
│   │   │   ├── send-message/
│   │   │   └── get-messages/
│   │   │
│   │   ├── dashboard/
│   │   ├── home/
│   │   └── page.tsx
│   │
│   ├── components/
│   │   └── ui/
│   │
│   ├── lib/
│   │   ├── connectdb.ts
│   │   └── resend.ts
│   │
│   ├── models/
│   │   ├── user.ts
│   │   └── message.ts
│   │
│   ├── schemas/
│   │   └── signupSchema.ts
│   │
│   ├── types/
│   │   └── apiResponce.ts
│   │
│   └── middleware.ts
│
├── public/
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

> Your exact folder structure may differ depending on the current version of the project.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
https://github.com/shivank-pundir/Mystry-Message

### 2. Navigate to the project

```bash
cd your-repository
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string

NEXTAUTH_SECRET=your_nextauth_secret

RESEND_API_KEY=your_resend_api_key

GEMINI_API_KEY=your_gemini_api_key
```

Replace the values with your own credentials.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔑 Environment Variables

| Variable          | Description                             |
| ----------------- | --------------------------------------- |
| `MONGODB_URI`     | MongoDB database connection string      |
| `NEXTAUTH_SECRET` | Secret used by NextAuth                 |
| `RESEND_API_KEY`  | API key for sending verification emails |
| `GEMINI_API_KEY`  | Google Gemini API key                   |

**Never commit your `.env.local` file to GitHub.**

Make sure `.env.local` is included in `.gitignore`.

---

## 🔄 Application Flow

```text
                    ┌───────────────┐
                    │    Home Page  │
                    └───────┬───────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
              Sign Up                Sign In
                 │                     │
                 ▼                     ▼
          Email Verification       Dashboard
                 │                     │
                 ▼                     │
             Dashboard ◄───────────────┘
                 │
                 ▼
        Share Anonymous Link
                 │
                 ▼
       Someone Sends a Message
                 │
                 ▼
          Receive Message
                 │
                 ▼
             Dashboard
```

---

## 💬 How It Works

### 1. Create an Account

Users register using:

* Username
* Email
* Password

The registration form is validated using **Zod** and **React Hook Form**.

### 2. Verify Email

After registration, an OTP/verification code is sent to the user's email using **Resend**.

The user enters the verification code to activate their account.

### 3. Dashboard

After successful authentication, users can access their dashboard.

The dashboard allows users to:

* View received messages
* Delete messages
* Refresh messages
* Copy their anonymous profile URL
* Enable/disable message receiving

### 4. Share Your Link

Every user gets a unique URL similar to:

```text
https://your-domain.com/u/username
```

The user can share this link with friends or on social media.

### 5. Receive Anonymous Messages

Anyone with the link can send a message without creating an account.

Example:

```text
https://your-domain.com/u/shivank
```

The recipient can see the message from their dashboard without knowing who sent it.

### 6. AI Message Suggestions

The application also integrates **Google Gemini AI** to generate interesting, open-ended questions that users can send anonymously.

---

## 🤖 AI Integration

Google Gemini is used to generate message suggestions.

The application sends a prompt to Gemini asking it to generate multiple interesting and open-ended questions.

Example suggestions:

```text
What is one thing you wish more people knew about you?

What is your biggest goal right now?

What is the best advice you've ever received?

What is something you've always wanted to try?
```

---

## 🗄️ Database

The application uses **MongoDB** with **Mongoose**.

Main collections/models include:

### User

Stores information such as:

* Username
* Email
* Password
* Verification status
* Verification code
* Verification code expiry
* Message acceptance status

### Message

Stores:

* Message content
* Recipient/user reference
* Creation date

---

## 🔐 Authentication & Authorization

Authentication is handled using **NextAuth**.

The application protects private routes such as:

```text
/dashboard
```

Unauthenticated users attempting to access protected pages are redirected to the sign-in page.

Authenticated users are redirected to the dashboard when trying to access authentication pages.

---

## 📧 Email Verification

Email verification is implemented using **Resend**.

The verification flow is:

```text
Sign Up
   ↓
Generate Verification Code
   ↓
Send Email
   ↓
User Enters Code
   ↓
Verify Code
   ↓
Account Activated
```

---

## 🎨 UI

The UI is built using:

* Tailwind CSS
* shadcn/ui
* Lucide React

The application uses reusable components such as:

* Cards
* Buttons
* Inputs
* Forms
* Dialogs
* Alerts
* Switches
* Toast notifications

---

## 🧪 Development

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

## 📌 Future Improvements

Some features that can be added in the future:

* [ ] Dark/light mode
* [ ] Google/GitHub authentication
* [ ] Rate limiting for anonymous messages
* [ ] Message pagination
* [ ] Search messages
* [ ] Message analytics
* [ ] Better AI-powered suggestions
* [ ] User profile customization
* [ ] Report inappropriate messages
* [ ] Improved email templates
* [ ] Production deployment

---

## 🌐 Deployment

The application can be deployed using platforms such as **Vercel**.

Before deployment, make sure all required environment variables are configured in the deployment platform.

---

## 👨‍💻 Author

**Shivank Pundir**

* GitHub: https://github.com/shivank-pundir/Mystry-Message
* LinkedIn: https://www.linkedin.com/in/shivank-pundir-9919b431a/
* LeetCode:https://leetcode.com/u/shivapundir/

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

Feel free to fork the repository and build your own version!

---

## 📄 License

This project is created for learning and development purposes.
