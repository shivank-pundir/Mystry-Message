"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  XCircle,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { toast } from "@/components/ui/toast";

const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or username is required"),

  password: z
    .string()
    .min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const Page = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        identifier: data.identifier.trim(),
        password: data.password,
        redirect: false,
      });

      // No response
      if (!result) {
        toast.add({
          title: "Sign in failed",
          description:
            "Something went wrong. Please try again.",
          priority: "high",
        });

        return;
      }

      // Authentication failed
      if (result.error) {
        toast.add({
          title: "Sign in failed",
          description: result.error,
          priority: "high",
        });

        return;
      }

      // Authentication successful
      toast.add({
        title: "Success",
        description: "You have signed in successfully.",
      });

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);

      toast.add({
        title: "Sign in failed",
        description:
          "Something went wrong. Please try again.",
        priority: "high",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-10 sm:px-6">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md">

          {/* ========================================
              BRAND
          ======================================== */}

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

          {/* ========================================
              SIGN IN CARD
          ======================================== */}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">

            {/* Header */}

            <div className="mb-7">
              <h2 className="text-xl font-semibold text-slate-900">
                Welcome back
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sign in to continue to your account.
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* ========================================
                  EMAIL / USERNAME
              ======================================== */}

              <div className="space-y-2">

                <label
                  htmlFor="identifier"
                  className="text-sm font-medium text-slate-700"
                >
                  Email or Username
                </label>

                <div className="relative">

                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="identifier"
                    type="text"
                    placeholder="Enter your email or username"
                    autoComplete="username"
                    {...form.register("identifier")}
                    className={`h-11 w-full rounded-lg border bg-stone-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                      form.formState.errors.identifier
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-stone-200 focus:border-indigo-400 focus:ring-indigo-100"
                    }`}
                  />

                </div>

                {form.formState.errors.identifier && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500">
                    <XCircle className="h-3.5 w-3.5" />

                    {form.formState.errors.identifier.message}
                  </p>
                )}

              </div>

              {/* ========================================
                  PASSWORD
              ======================================== */}

              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
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

              {/* ========================================
                  SIGN IN BUTTON
              ======================================== */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* ========================================
                  DIVIDER
              ======================================== */}

              <div className="relative my-6">

                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-slate-400">
                    New to Mestry Message?
                  </span>
                </div>

              </div>

              {/* ========================================
                  SIGN UP
              ======================================== */}

              <p className="text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}

                <Link
                  href="/sign-up"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
                >
                  Create account
                </Link>
              </p>

            </form>
          </div>

          {/* ========================================
              SECURITY MESSAGE
          ======================================== */}

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