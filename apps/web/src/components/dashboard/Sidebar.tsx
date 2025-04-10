import { CiCirclePlus } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { useState } from "react";
type Chat = {
  id: string;
  title: string;
  lastUpdated: string;
}

type SidebarProps = {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (id: string) => void;
  createNewChat: () => void;
  deleteChat?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChat,
  setActiveChat,
  createNewChat,
  deleteChat,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();

    if (deleteConfirmId === chatId) {
      deleteChat?.(chatId);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(chatId);
    }
  };

  return (
    <div className="w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 flex flex-col shadow-md">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-800 dark:text-white">
              Course<span className="text-red-400">GPT</span>
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Educational content creator
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={createNewChat}
          className="flex items-center justify-center w-full py-2.5 px-4 bg-red-400 hover:cursor-pointer text-black font-medium rounded-full transition shadow-sm hover:shadow"
        >
          <CiCirclePlus size={20} className="mr-2" />
          New Lesson
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <div className="sticky top-0 bg-white dark:bg-neutral-900 pt-2 pb-1 px-2 z-10">
          <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Recent Lessons
          </h2>
          <div className="h-px bg-gradient-to-r from-red-400/20 via-red-400/40 to-red-400/20 mt-2"></div>
        </div>

        <div className="space-y-1 mt-2 py-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                activeChat === chat.id
                  ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 shadow-sm"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-transparent"
              }`}
            >
              <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-red-400 mr-3">
                <IoBookOutline size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-medium truncate ${
                  activeChat === chat.id
                    ? "text-red-600 dark:text-red-400"
                    : "text-neutral-900 dark:text-neutral-200"
                }`}>
                  {chat.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {chat.lastUpdated}
                </p>
              </div>

              <button
                onClick={(e) => handleDeleteClick(e, chat.id)}
                className={`ml-2 p-1.5 rounded-full transition-all ${
                  deleteConfirmId === chat.id
                    ? "bg-red-500 text-white"
                    : "opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 text-neutral-500 dark:text-neutral-400"
                }`}
                title={deleteConfirmId === chat.id ? "Click again to confirm" : "Delete lesson"}
                aria-label="Delete lesson"
              >
                <RiDeleteBin6Line size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-700/50">
          <div className="h-10 w-10 rounded-full bg-red-400 flex items-center justify-center text-white shadow-sm">
            <span className="text-sm font-medium">RV</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Rishi Viswanathan
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
              Instructor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
