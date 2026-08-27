"use client";

import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ApiResponce,
  AcceptMessageResponse,
} from "@/types/apiResponce";

import {
  Copy,
  RefreshCw,
  MessageCircle,
  Link as LinkIcon,
  Inbox,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

import MessageCard from "@/components/MessageCard";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { toast } from "@/components/ui/toast";

import { Message } from "@/models/user";
import { User } from "next-auth";

import { acceptMessagesSchema } from "@/schemas/acceptMessageSchema";

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const { watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  // DELETE MESSAGE FROM UI

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter(
        (message) => message._id.toString() !== messageId
      )
    );
  };

  // FETCH ACCEPT MESSAGE SETTING
  const fetchAcceptingMessage = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get<AcceptMessageResponse>(
        "/api/accept-messages"
      );

      setValue(
        "acceptMessages",
        response.data.isAcceptingMessage ?? false
      );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponce>;

      toast.add({
        title: "Unable to load settings",
        description:
          axiosError.response?.data?.message ??
          "Error fetching message settings",
        priority: "high",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // FETCH MESSAGES

  const fetchMessages = useCallback(
    async (refresh = false) => {
      setIsLoading(true);

      try {
        const response = await axios.get<ApiResponce>(
          "/api/get-messages"
        );

        setMessages(response.data.messages || []);

        if (refresh) {
          toast.add({
            title: "Messages refreshed",
            description: "Showing the latest messages.",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponce>;

        toast.add({
          title: "Unable to load messages",
          description:
            axiosError.response?.data?.message ??
            "Error fetching messages",
          priority: "high",
        });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // INITIAL FETCH
 

  useEffect(() => {
    if (!session?.user) return;

    fetchMessages();
    fetchAcceptingMessage();
  }, [
    session,
    fetchMessages,
    fetchAcceptingMessage,
  ]);

  // HANDLE SWITCH

  const handleSwitchChange = async () => {
    const newValue = !acceptMessages;

    setIsSwitchLoading(true);

    try {
      const response = await axios.post<ApiResponce>(
        "/api/accept-messages",
        {
          acceptMessages: newValue,
        }
      );

      setValue("acceptMessages", newValue);

      toast.add({
        title: "Settings updated",
        description: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponce>;

      toast.add({
        title: "Unable to update settings",
        description:
          axiosError.response?.data?.message ??
          "Error changing message settings",
        priority: "high",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  };

  // PROFILE URL


  const user = session?.user as User | undefined;

  const username = user?.username;

  const profileUrl =
    typeof window !== "undefined" && username
      ? `${window.location.origin}/u/${username}`
      : "";

  // COPY PROFILE URL

  const copyToClipboard = async () => {
    if (!profileUrl) return;

    try {
      await navigator.clipboard.writeText(profileUrl);

      toast.add({
        title: "Link copied!",
        description:
          "Your profile URL has been copied to the clipboard.",
      });
    } catch (error) {
      console.error("Copy error:", error);

      toast.add({
        title: "Copy failed",
        description: "Unable to copy the profile URL.",
        priority: "high",
      });
    }
  };

  // LOADING


  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
            <RefreshCw className="h-5 w-5 animate-spin text-indigo-600" />
          </div>

          <p className="text-sm text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // NOT LOGGED IN

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4">
        <Card className="w-full max-w-md border-stone-200 bg-white shadow-sm">
          <CardContent className="p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
              <ShieldCheck className="h-6 w-6 text-indigo-600" />
            </div>

            <h1 className="mt-5 text-xl font-semibold text-slate-900">
              Please sign in
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You need to be logged in to access your dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // DASHBOARD

  return (
    <div className="min-h-screen bg-[#faf9f7] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        //    HEADER

        <header className="mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                <Sparkles className="h-3.5 w-3.5" />
                Anonymous inbox
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Welcome back, {username} 
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Manage your anonymous messages, share your
                profile, and control who can send you messages.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  acceptMessages
                    ? "bg-emerald-500"
                    : "bg-slate-300"
                }`}
              />

              {acceptMessages
                ? "Accepting messages"
                : "Messages paused"}
            </div>
          </div>
        </header>

        
          //  PROFILE LINK

        <Card className="mb-6 overflow-hidden border-stone-200 bg-white shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                  <LinkIcon className="h-5 w-5 text-indigo-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Share your profile
                  </h2>

                  <p className="mt-1 max-w-lg text-sm leading-5 text-slate-500">
                    Share this link with friends so they can
                    send you anonymous messages.
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
                <div className="flex min-w-0 items-center rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 lg:w-96">
                  <span className="truncate text-sm text-slate-500">
                    {profileUrl}
                  </span>
                </div>

                <Button
                  onClick={copyToClipboard}
                  className="gap-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

          //  CONTROL CARDS
      

        <div className="mb-10 grid gap-4 md:grid-cols-2">

          {/* ACCEPT MESSAGES */}

          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">

                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      acceptMessages
                        ? "bg-emerald-50"
                        : "bg-stone-100"
                    }`}
                  >
                    <MessageCircle
                      className={`h-5 w-5 ${
                        acceptMessages
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Accept messages
                    </h2>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {acceptMessages
                        ? "People can send you anonymous messages."
                        : "Your profile is currently not accepting messages."}
                    </p>
                  </div>
                </div>

                <Switch
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                />
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    acceptMessages
                      ? "bg-emerald-500"
                      : "bg-slate-300"
                  }`}
                />

                <span className="text-xs font-medium text-slate-500">
                  {acceptMessages
                    ? "Currently accepting messages"
                    : "Currently not accepting messages"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* MESSAGE COUNT / REFRESH */}

          <Card className="border-stone-200 bg-white shadow-sm">
            <CardContent className="flex h-full items-center justify-between p-5 sm:p-6">

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                  <Inbox className="h-5 w-5 text-amber-600" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Your inbox
                  </p>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      {messages.length}
                    </span>

                    <span className="text-sm text-slate-400">
                      {messages.length === 1
                        ? "message"
                        : "messages"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => fetchMessages(true)}
                disabled={isLoading}
                className="gap-2 rounded-xl border-stone-200 bg-white text-slate-600 hover:bg-stone-50 hover:text-slate-900"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isLoading ? "animate-spin" : ""
                  }`}
                />

                <span className="hidden sm:inline">
                  Refresh
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>

         //   MESSAGES HEADER

        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Your Messages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Anonymous messages and feedback from others.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1.5 shadow-sm sm:flex">
            <Inbox className="h-4 w-4 text-slate-400" />

            <span className="text-sm font-medium text-slate-600">
              {messages.length}
            </span>
          </div>
        </div>

    
           // LOADING
      

        {isLoading && messages.length === 0 ? (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-stone-200 bg-white">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50">
                <RefreshCw className="h-5 w-5 animate-spin text-indigo-600" />
              </div>

              <span className="text-sm text-slate-500">
                Loading your messages...
              </span>
            </div>
          </div>
        ) : messages.length === 0 ? (

            // EMPTY STATE

          <Card className="border-dashed border-stone-300 bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center px-6 py-20 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                <MessageCircle className="h-7 w-7 text-indigo-600" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Your inbox is empty
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Share your profile link with friends and
                others. Their anonymous messages will appear
                here.
              </p>

              <Button
                onClick={copyToClipboard}
                className="mt-6 gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700"
              >
                <Copy className="h-4 w-4" />
                Copy Profile Link
              </Button>
            </CardContent>
          </Card>

        ) : (

         //    MESSAGE GRID

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {messages.map((message) => (
              <MessageCard
                key={message._id.toString()}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))}
          </div>
        )}
        
        //    PRIVACY FOOTER
     
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />

          <span>
            Your messages are private and anonymous.
          </span>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;