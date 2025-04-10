/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MessageList from "@/components/dashboard/MessageList";
import WelcomeScreen from "@/components/dashboard/WelcomeScreen";
import DownloadModal from "@/components/dashboard/DownloadModal";
import DashLayout from "@/layouts/DashLayout";
import Loader from "@/components/common/Loader";
import { sampleResponse } from "@/utils/sample";
import Toast from "@/components/common/Toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Chat = {
  id: string;
  title: string;
  lastUpdated: string;
  messages: Message[];
};

const mockApi = {
  getChatList: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { id: "1", title: "Introduction to Biology", lastUpdated: "2 days ago" },
      {
        id: "2",
        title: "Advanced Physics Concepts",
        lastUpdated: "1 week ago",
      },
      { id: "3", title: "History of Ancient Rome", lastUpdated: "3 weeks ago" },
    ];
  },

  getChatById: async (id: string): Promise<Chat> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const chats: Record<string, Chat> = {
      "1": {
        id: "1",
        title: "Introduction to Biology",
        lastUpdated: "2 days ago",
        messages: [],
      },
      "2": {
        id: "2",
        title: "Advanced Physics Concepts",
        lastUpdated: "1 week ago",
        messages: [],
      },
      "3": {
        id: "3",
        title: "History of Ancient Rome",
        lastUpdated: "3 weeks ago",
        messages: [],
      },
    };

    return (
      chats[id] || {
        id,
        title: "New Lesson",
        lastUpdated: "Just now",
        messages: [],
      }
    );
  },

  updateChat: async (chat: Chat): Promise<Chat> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return chat;
  },

  createChat: async (): Promise<Chat> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newId = Date.now().toString();
    return {
      id: newId,
      title: "New Lesson",
      lastUpdated: "Just now",
      messages: [],
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteChat: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return true;
  },
};

const Dashboard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id") || "1";

  const [chatList, setChatList] = useState<
    { id: string; title: string; lastUpdated: string }[]
  >([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [inputValue, setValue] = useState("");
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dismissError = () => setError(null);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const chats = await mockApi.getChatList();
        setChatList(chats);
      } catch (error) {
        console.error("Failed to fetch chat list:", error);
        setError("Failed to load your chats. Please try again.");
      }
    };

    fetchChatList();
  }, []);

  useEffect(() => {
    const fetchCurrentChat = async () => {
      setIsChatLoading(true);
      try {
        const chat = await mockApi.getChatById(chatId);
        setCurrentChat(chat);
      } catch (error) {
        console.error(`Failed to fetch chat ${chatId}:`, error);
        setError("Failed to load chat content. Please try again.");
      } finally {
        setIsChatLoading(false);
      }
    };

    fetchCurrentChat();
  }, [chatId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !currentChat) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
    };

    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }),
      }
    );
    if (!apiResponse.ok) {
      console.error("Failed to fetch AI response");
      return;
    }
    const responseData = await apiResponse.json();
    const content = responseData.data;

    const aiResponse: Message = {
      role: "assistant",
      content: JSON.stringify(content),
    };

    const newMessages = [...currentChat.messages, userMessage, aiResponse];

    let updatedTitle = currentChat.title;
    if (currentChat.messages.length === 0) {
      const words = inputValue.split(" ");
      const shortTitle = words.slice(0, Math.min(4, words.length)).join(" ");
      updatedTitle = `Course on: ${shortTitle}${words.length > 4 ? "..." : ""}`;
    }

    const updatedChat: Chat = {
      ...currentChat,
      messages: newMessages,
      title: updatedTitle,
      lastUpdated: "Just now",
    };

    setCurrentChat(updatedChat);

    setChatList((prevList) =>
      prevList.map((chat) =>
        chat.id === updatedChat.id
          ? { ...chat, title: updatedTitle, lastUpdated: "Just now" }
          : chat
      )
    );

    setValue("");

    try {
      await mockApi.updateChat(updatedChat);
    } catch (error) {
      console.log("Failed to save chat:", error);
      setError("Failed to save your message. Please try again.");
    }
  };

  const handleRegenerate = async (index: number) => {
    if (!currentChat) return;

    const updatedMessages = [...currentChat.messages];
    updatedMessages[index].content += " [Regenerated content]";

    const updatedChat: Chat = {
      ...currentChat,
      messages: updatedMessages,
      lastUpdated: "Just now",
    };

    setCurrentChat(updatedChat);

    try {
      await mockApi.updateChat(updatedChat);
    } catch (error) {
      console.log("Failed to regenerate content:", error);
      setError("Failed to regenerate content. Please try again.");
    }
  };

  const handleDelete = async (index: number) => {
    if (!currentChat) return;

    const newMessages = [...currentChat.messages];
    newMessages.splice(index - 1, 2);

    const updatedChat: Chat = {
      ...currentChat,
      messages: newMessages,
      lastUpdated: "Just now",
    };

    setCurrentChat(updatedChat);

    try {
      await mockApi.updateChat(updatedChat);
    } catch (error) {
      console.log("Failed to delete message:", error);
      setError("Failed to delete message. Please try again.");
    }
  };

  const createNewChat = async () => {
    try {
      const newChat = await mockApi.createChat();

      setChatList((prevList) => [
        {
          id: newChat.id,
          title: newChat.title,
          lastUpdated: newChat.lastUpdated,
        },
        ...prevList,
      ]);

      router.push(`/dashboard?id=${newChat.id}`);
    } catch (error) {
      console.error("Failed to create new chat:", error);
      setError("Failed to create new chat. Please try again.");
    }
  };

  const handleSetActiveChat = (id: string) => {
    router.push(`/dashboard?id=${id}`);
  };

  const handleDeleteChat = async (id: string) => {
    try {
      await mockApi.deleteChat(id);

      setChatList((prevList) => prevList.filter((chat) => chat.id !== id));

      if (chatId === id) {
        const nextChat = chatList.find((chat) => chat.id !== id);
        if (nextChat) {
          router.push(`/dashboard?id=${nextChat.id}`);
        } else {
          createNewChat();
        }
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
      setError("Failed to delete lesson. Please try again.");
    }
  };

  return (
    <DashLayout
      chatId={chatId}
      chats={chatList}
      activeChat={chatId}
      setActiveChat={handleSetActiveChat}
      createNewChat={createNewChat}
      deleteChat={handleDeleteChat}
    >
      {error && <Toast message={error} type="error" onDismiss={dismissError} />}
      {isChatLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader size="lg" />
        </div>
      ) : currentChat && currentChat.messages.length === 0 ? (
        <WelcomeScreen
          inputValue={inputValue}
          onInputChange={(e) => setValue(e.target.value)}
          onSubmit={handleSubmit}
        />
      ) : currentChat ? (
        <>
          <MessageList
            messages={currentChat.messages}
            onRegenerate={handleRegenerate}
            onDelete={handleDelete}
            onDownload={() => setDownloadModalOpen(true)}
          />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center text-neutral-500">
          Chat not found
        </div>
      )}

      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        courseData={
          currentChat && currentChat.messages.length > 0
            ? JSON.parse(
                currentChat.messages.find((m) => m.role === "assistant")
                  ?.content || "{}"
              )
            : null
        }
      />
    </DashLayout>
  );
};

export default Dashboard;
