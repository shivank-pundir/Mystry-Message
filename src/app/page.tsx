"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Link2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Send,
  Lock,
} from "lucide-react";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#e0ded9] text-slate-900">

   

      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Mystry Message
            </span>
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              How it works
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              About
            </a>
          </div>

          {/* Auth Buttons */}

          <div className="flex items-center gap-2 sm:gap-3">

            <Link
              href="/sign-in"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Sign in
            </Link>

            <Link
              href="/sign-up"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Get started
            </Link>

          </div>

        </div>
      </nav>


      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}

      <section className="relative overflow-hidden">

        {/* Soft background decoration */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-100/70 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* LEFT */}

            <div className="max-w-2xl">

              {/* Small badge */}

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
                <Sparkles className="h-4 w-4" />
                Simple. Private. Anonymous.
              </div>

              {/* Heading */}

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">

                Let people speak
                <span className="text-indigo-600">
                  {" "}freely.
                </span>

              </h1>

              {/* Description */}

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Share your personal link and receive honest,
                anonymous messages from friends, classmates,
                or anyone you choose.
              </p>

              {/* Buttons */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Create your account
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Sign in
                </Link>

              </div>

              {/* Small trust points */}

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Check className="h-4 w-4 text-green-600" />
                  Easy to use
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Check className="h-4 w-4 text-green-600" />
                  Anonymous messages
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Check className="h-4 w-4 text-green-600" />
                  Free to get started
                </div>

              </div>

            </div>


            {/* RIGHT - PRODUCT PREVIEW */}

            <div className="relative mx-auto w-full max-w-lg lg:ml-auto">

              {/* Background card */}

              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60">

                {/* Fake browser header */}

                <div className="flex items-center gap-2 border-b border-slate-100 px-3 pb-3">

                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                  <div className="ml-3 flex-1 rounded-md bg-slate-50 px-3 py-1.5 text-xs text-slate-400">
                    mystry-message.com/u/username
                  </div>

                </div>

                {/* Message preview */}

                <div className="p-5 sm:p-7">

                  <div className="mb-5">
                    <p className="text-sm font-medium text-slate-500">
                      Send an anonymous message to
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      @username
                    </h3>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        Your message
                      </span>

                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                      "Your projects are really impressive.
                      Keep building!"
                    </p>

                  </div>

                  <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <Send className="h-4 w-4" />
                    Send anonymously
                  </button>

                </div>

              </div>

              {/* Floating notification */}

              <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      New anonymous message
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      You received a new message
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* FEATURES */}
      {/* ================================================= */}

      <section
        id="features"
        className="border-y border-slate-200 bg-white"
      >

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          {/* Section heading */}

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Features
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Everything you need for anonymous messages
            </h2>

            <p className="mt-4 text-slate-600">
              Keep it simple. Share your link, receive messages,
              and manage everything from one dashboard.
            </p>

          </div>


          {/* Cards */}

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                <ShieldCheck className="h-5 w-5 text-indigo-600" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Stay anonymous
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                People can send messages without revealing
                their identity, making it easier to share
                honest thoughts.
              </p>

            </div>


            {/* Card 2 */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                <Link2 className="h-5 w-5 text-indigo-600" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                One personal link
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Get your own profile link and share it with
                friends, classmates, or your social audience.
              </p>

            </div>


            {/* Card 3 */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                <MessageCircle className="h-5 w-5 text-indigo-600" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Simple dashboard
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                View your messages, control whether you accept
                messages, and manage everything from one place.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* HOW IT WORKS */}
      {/* ================================================= */}

      <section
        id="how-it-works"
        className="bg-slate-50"
      >

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Left */}

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Start receiving messages in minutes
              </h2>

              <p className="mt-4 max-w-lg leading-7 text-slate-600">
                No complicated setup. Create your account,
                share your link, and let people send you
                anonymous messages.
              </p>

            </div>


            {/* Steps */}

            <div className="space-y-5">

              {/* Step 1 */}

              <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  1
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Create your account
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Sign up and verify your email to get started.
                  </p>
                </div>

              </div>


              {/* Step 2 */}

              <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  2
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Share your personal link
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Copy your profile URL and share it wherever
                    you want.
                  </p>
                </div>

              </div>


              {/* Step 3 */}

              <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  3
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Receive anonymous messages
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Messages sent through your link will appear
                    in your dashboard.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* ABOUT / CTA */}
      {/* ================================================= */}

      <section
        id="about"
        className="bg-white"
      >

        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
            <Copy className="h-5 w-5 text-indigo-600" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Ready to hear what people really think?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Create your personal anonymous message link and
            start receiving honest messages from the people
            around you.
          </p>

          <Link
            href="/sign-up"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Get started for free
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

      </section>


     

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>

            <span className="font-semibold text-slate-800">
              Mystry Message
            </span>

          </div>

          <p className="text-sm text-slate-500">
            Share thoughts. Stay anonymous.
          </p>

        </div>

      </footer>

    </main>
  );
};

export default HomePage;