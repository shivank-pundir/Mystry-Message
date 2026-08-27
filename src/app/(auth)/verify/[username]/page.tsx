"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { verifySchema } from "@/schemas/verfifySchema";
import axios, { AxiosError } from "axios";
import { ApiResponce } from "@/types/apiResponce";
import {
  MessageCircle,
  ShieldCheck,
  Loader2,
  ArrowRight,
  XCircle,
} from "lucide-react";

const Page = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post<ApiResponce>("/api/verify-code", {
        username: params.username,
        code: data.code,
      });

      toast.add({
        title: "Success",
        description: response.data.message,
      });

      router.replace("/sign-up");
    } catch (error) {
      console.error("Verification error:", error);

      const axiosError = error as AxiosError<ApiResponce>;

      const errorMessage =
        axiosError.response?.data?.message ?? "Something went wrong";

      toast.add({
        title: "Verification failed",
        description: errorMessage,
        priority: "high",
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md">

          {/* Logo / Brand */}
          <div className="mb-8 flex flex-col items-center">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800">
              <MessageCircle className="h-7 w-7 text-slate-200" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Mestry Message
            </h1>

            <p className="mt-2 text-center text-sm text-slate-400">
              Share messages. Stay anonymous.
            </p>

          </div>

          {/* Verification Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20 sm:p-8">

            {/* Header */}
            <div className="mb-8 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
                <ShieldCheck className="h-6 w-6 text-slate-300" />
              </div>

              <h2 className="text-xl font-semibold text-white">
                Verify your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                We&apos;ve sent a 6-digit verification code to your email.
                Enter it below to verify your account.
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >

              {/* Verification Code */}
              <div className="space-y-2">

                <label
                  htmlFor="code"
                  className="text-sm font-medium text-slate-300"
                >
                  Verification Code
                </label>

                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="000000"
                  maxLength={6}
                  {...form.register("code")}
                  className={`h-14 w-full rounded-lg border bg-slate-950 px-4 text-center text-xl font-semibold tracking-[0.5em] text-white outline-none transition placeholder:text-slate-700 placeholder:tracking-[0.5em] focus:ring-2 ${
                    form.formState.errors.code
                      ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-700 focus:border-slate-500 focus:ring-slate-500/20"
                  }`}
                />

                {form.formState.errors.code && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400">
                    <XCircle className="h-3.5 w-3.5" />

                    {form.formState.errors.code.message}
                  </p>
                )}

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-700 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

            </form>

            {/* Help text */}
            <div className="mt-6 border-t border-slate-800 pt-6">

              <p className="text-center text-sm text-slate-500">
                Didn&apos;t receive the code?
              </p>

              <p className="mt-1 text-center text-xs text-slate-600">
                Check your spam folder or try signing up again.
              </p>

            </div>

          </div>

          {/* Back to Sign In */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}

            <button
              type="button"
              onClick={() => router.replace("/sign-in")}
              className="font-semibold text-slate-300 transition hover:text-white hover:underline"
            >
              Sign in
            </button>
          </p>

        </div>
      </div>
    </main>
  );
};

export default Page;   