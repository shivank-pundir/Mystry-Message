"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/toast";
import {
  Sparkles,
  Send,
  Loader2,
  MessageCircle,
  Check,
} from "lucide-react";

import { ApiResponce } from "@/types/apiResponce";

const Page = () => {
  const params = useParams<{ username: string }>();

  const username = params.username;

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const maxLength = 500;

  // ================================
  // Generate AI suggestions
  // ================================

  const generateSuggestions = async () => {
    setIsGenerating(true);

    try {
      const response = await axios.post("/api/ai/message", {
        context: `Anonymous messages for ${username}`,
      });

      if (response.data.success) {
        setSuggestions(response.data.suggestions);

        toast.add({
          title: "AI suggestions generated",
          description: "Choose one to use as your message.",
        });
      }
    } catch (error) {
      console.error("AI suggestion error:", error);

      const axiosError = error as AxiosError<ApiResponce>;

      toast.add({
        title: "AI Error",
        description:
          axiosError.response?.data?.message ??
          "Unable to generate suggestions",
        priority: "high",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // ================================
  // Select AI suggestion
  // ================================

  const selectSuggestion = (suggestion: string) => {
    setMessage(suggestion);

    toast.add({
      title: "Suggestion selected",
      description: "You can edit the message before sending.",
    });
  };

  // ================================
  // Send message
  // ================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!message.trim()) {
      toast.add({
        title: "Message required",
        description: "Please write a message before sending.",
        priority: "high",
      });

      return;
    }

    setIsSending(true);

    try {
      const response = await axios.post<ApiResponce>(
        "/api/send-message",
        {
          username,
          content: message.trim(),
        }
      );

      toast.add({
        title: "Message sent!",
        description:
          response.data.message ??
          "Your anonymous message was sent successfully.",
      });

      setMessage("");
      setSuggestions([]);
    } catch (error) {
      console.error("Send message error:", error);

      const axiosError = error as AxiosError<ApiResponce>;

      toast.add({
        title: "Unable to send message",
        description:
          axiosError.response?.data?.message ??
          "Something went wrong while sending your message.",
        priority: "high",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-12 text-slate-900">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <div className="w-full">
          {/* ================= HEADER ================= */}

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
              <MessageCircle className="h-7 w-7 text-indigo-600" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Send an anonymous message
            </h1>

            <p className="mt-3 text-slate-500">
              Send a message to{" "}
              <span className="font-semibold text-slate-800">
                @{username}
              </span>
            </p>
          </div>

          {/* ================= MAIN CARD ================= */}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit}>
              {/* Message input */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Your message
                  </label>

                  <span className="text-xs text-slate-400">
                    {message.length}/{maxLength}
                  </span>
                </div>

                <textarea
                  id="message"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  maxLength={maxLength}
                  rows={6}
                  placeholder="Write something kind, interesting, or fun..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-stone-200
                    bg-stone-50
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-indigo-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-50
                  "
                />
              </div>

              {/* ================= AI BUTTON ================= */}

              <div className="mt-5">
                <button
                  type="button"
                  onClick={generateSuggestions}
                  disabled={isGenerating}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-indigo-100
                    bg-indigo-50
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-indigo-700
                    transition
                    hover:bg-indigo-100
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Get AI suggestions
                    </>
                  )}
                </button>

                <p className="mt-2 text-xs text-slate-400">
                  Need inspiration? Let AI suggest something to
                  ask.
                </p>
              </div>

              {/* ================= AI SUGGESTIONS ================= */}

              {suggestions.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-800">
                      AI suggestions
                    </h2>

                    <button
                      type="button"
                      onClick={generateSuggestions}
                      disabled={isGenerating}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Generate again
                    </button>
                  </div>

                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => {
                      const isSelected = message === suggestion;

                      return (
                        <button
                          type="button"
                          key={`${suggestion}-${index}`}
                          onClick={() =>
                            selectSuggestion(suggestion)
                          }
                          className={`
                            group
                            flex
                            w-full
                            items-start
                            justify-between
                            gap-4
                            rounded-xl
                            border
                            p-4
                            text-left
                            transition
                            ${
                              isSelected
                                ? "border-indigo-200 bg-indigo-50"
                                : "border-stone-200 bg-stone-50 hover:border-indigo-200 hover:bg-indigo-50/50"
                            }
                          `}
                        >
                          <span className="text-sm leading-6 text-slate-700">
                            {suggestion}
                          </span>

                          {isSelected && (
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ================= SEND BUTTON ================= */}

              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="
                  mt-7
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-indigo-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send anonymously
                  </>
                )}
              </button>
            </form>

            {/* ================= PRIVACY MESSAGE ================= */}

            <div className="mt-5 rounded-xl bg-stone-50 px-4 py-3 text-center">
              <p className="text-xs text-slate-500">
                🔒 Your identity will not be shared with the
                recipient.
              </p>
            </div>
          </div>

          {/* ================= FOOTER ================= */}

          <p className="mt-6 text-center text-xs text-slate-400">
            Powered by Mystry Message
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;