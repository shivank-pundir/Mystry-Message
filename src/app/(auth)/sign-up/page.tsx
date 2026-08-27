"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponce } from "@/types/apiResponce";
import { toast } from "@/components/ui/toast";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // ---------------------------------------------
  // CHECK USERNAME AVAILABILITY
  // ---------------------------------------------

  const checkUsernameUnique = async (username: string) => {
    if (!username.trim()) {
      setUsernameMessage("");
      setIsCheckingUsername(false);
      return;
    }

    setIsCheckingUsername(true);
    setUsernameMessage("");

    try {
      const response = await axios.get<ApiResponce>(
        `/api/check-username-validation?username=${encodeURIComponent(
          username.trim()
        )}`
      );

      setUsernameMessage(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponce>;

      setUsernameMessage(
        axiosError.response?.data?.message ??
          "Error checking username"
      );
    } finally {
      setIsCheckingUsername(false);
    }
  };

  // ---------------------------------------------
  // DEBOUNCE USERNAME CHECK
  // ---------------------------------------------

  const debouncedCheckUsername = useDebounceCallback(
    checkUsernameUnique,
    300
  );

  // ---------------------------------------------
  // SUBMIT SIGNUP
  // ---------------------------------------------

  const onSubmit = async (
    data: z.infer<typeof signUpSchema>
  ) => {
    if (isCheckingUsername) {
      toast.add({
        title: "Please wait",
        description:
          "Checking username availability...",
        priority: "high",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponce>(
        "/api/sign-up",
        data
      );

      toast.add({
        title: "Account created",
        description: response.data.message,
      });

      router.replace(`/verify/${data.username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponce>;

      const errorMessage =
        axiosError.response?.data?.message ??
        "Something went wrong. Please try again.";

      toast.add({
        title: "Signup failed",
        description: errorMessage,
        priority: "high",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------------------------------
  // USERNAME STATUS
  // ---------------------------------------------

  const usernameAvailable =
    Boolean(usernameMessage) &&
    !usernameMessage.toLowerCase().includes("already") &&
    !usernameMessage.toLowerCase().includes("taken") &&
    !usernameMessage.toLowerCase().includes("exist") &&
    !usernameMessage.toLowerCase().includes("unavailable");

  const usernameUnavailable =
    Boolean(usernameMessage) && !usernameAvailable;

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-10 sm:px-6">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md">

          {/* =========================================
              BRAND
          ========================================= */}

          <div className="mb-8 flex flex-col items-center">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50">
              <MessageCircle className="h-7 w-7 text-indigo-600" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Mestry Message
            </h1>

            <p className="mt-2 text-center text-sm text-slate-500">
              Share messages. Stay anonymous.
            </p>

          </div>

          {/* =========================================
              SIGN UP CARD
          ========================================= */}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">

            {/* Heading */}

            <div className="mb-7">
              <h2 className="text-xl font-semibold text-slate-900">
                Create your account
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Join Mestry Message and start receiving
                anonymous messages.
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* =========================================
                  USERNAME
              ========================================= */}

              <div className="space-y-2">

                <label
                  htmlFor="username"
                  className="text-sm font-medium text-slate-700"
                >
                  Username
                </label>

                <div className="relative">

                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    autoComplete="username"
                    {...form.register("username", {
                      onChange: (e) => {
                        const value = e.target.value;

                        setUsername(value);
                        setUsernameMessage("");

                        debouncedCheckUsername(value);
                      },
                    })}
                    className={`h-11 w-full rounded-lg border bg-stone-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                      form.formState.errors.username
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : usernameUnavailable
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : usernameAvailable
                        ? "border-emerald-300 focus:border-emerald-400 focus:ring-emerald-100"
                        : "border-stone-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  />

                  {/* Checking */}

                  {isCheckingUsername && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-slate-400" />
                  )}

                  {/* Available */}

                  {!isCheckingUsername &&
                    usernameAvailable && (
                      <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                    )}

                  {/* Unavailable */}

                  {!isCheckingUsername &&
                    usernameUnavailable && (
                      <XCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
                    )}

                </div>

                {/* Zod error */}

                {form.formState.errors.username && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500">
                    <XCircle className="h-3.5 w-3.5" />

                    {form.formState.errors.username.message}
                  </p>
                )}

                {/* Checking */}

                {isCheckingUsername &&
                  !form.formState.errors.username && (
                    <p className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />

                      Checking username availability...
                    </p>
                  )}

                {/* Result */}

                {!isCheckingUsername &&
                  usernameMessage &&
                  !form.formState.errors.username && (
                    <p
                      className={`flex items-center gap-1.5 text-xs ${
                        usernameUnavailable
                          ? "text-red-500"
                          : "text-emerald-600"
                      }`}
                    >
                      {usernameUnavailable ? (
                        <XCircle className="h-3.5 w-3.5" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      )}

                      {usernameMessage}
                    </p>
                  )}

              </div>

              {/* =========================================
                  EMAIL
              ========================================= */}

              <div className="space-y-2">

                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <div className="relative">

                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...form.register("email")}
                    className={`h-11 w-full rounded-lg border bg-stone-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                      form.formState.errors.email
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-stone-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  />

                </div>

                {form.formState.errors.email && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500">
                    <XCircle className="h-3.5 w-3.5" />

                    {form.formState.errors.email.message}
                  </p>
                )}

              </div>

              {/* =========================================
                  PASSWORD
              ========================================= */}

              <div className="space-y-2">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">

                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    {...form.register("password")}
                    className={`h-11 w-full rounded-lg border bg-stone-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                      form.formState.errors.password
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-stone-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>

                </div>

                {form.formState.errors.password && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500">
                    <XCircle className="h-3.5 w-3.5" />

                    {form.formState.errors.password.message}
                  </p>
                )}

              </div>

              {/* =========================================
                  SUBMIT
              ========================================= */}

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  isCheckingUsername
                }
                className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* =========================================
                  DIVIDER
              ========================================= */}

              <div className="relative my-6">

                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-slate-400">
                    Already a member?
                  </span>
                </div>

              </div>

              {/* =========================================
                  SIGN IN
              ========================================= */}

              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}

                <Link
                  href="/sign-in"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
                >
                  Sign in
                </Link>
              </p>

            </form>
          </div>

          {/* =========================================
              PRIVACY
          ========================================= */}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />

            <span>
              Your account and messages stay private.
            </span>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Page;