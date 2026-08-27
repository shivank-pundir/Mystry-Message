"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2, MessageCircle } from "lucide-react";
import { Message } from "@/models/user";
import axios, { AxiosError } from "axios";
import { ApiResponce } from "@/types/apiResponce";
import { toast } from "@/components/ui/toast";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({
  message,
  onMessageDelete,
}: MessageCardProps) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete<ApiResponce>(
        `/api/delete-message/${message._id}`
      );

      toast.add({
        title: "Message deleted",
        description: response.data.message,
      });

      onMessageDelete(message._id.toString());
    } catch (error) {
      console.error("Delete message error:", error);

      const axiosError = error as AxiosError<ApiResponce>;

      toast.add({
        title: "Unable to delete",
        description:
          axiosError.response?.data?.message ??
          "Something went wrong while deleting the message.",
        priority: "high",
      });
    }
  };

  const formattedDate = message.createdAt
    ? new Date(message.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <Card className="group overflow-hidden border-stone-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between border-b border-stone-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
            <MessageCircle className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Anonymous Message
            </p>

            <p className="text-xs text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-red-50
              hover:text-red-500
            "
            aria-label="Delete message"
          >
            <Trash2 className="h-4 w-4" />
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete this message?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This message will
                be permanently removed from your dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent className="px-5 py-5">
        <div className="rounded-xl bg-stone-50 p-4">
          <p className="text-[15px] leading-7 text-slate-700">
            {message.content}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Anonymous
          </span>

          <span className="text-xs text-slate-400">
            {message.createdAt
              ? new Date(message.createdAt).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  }
                )
              : ""}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCard;