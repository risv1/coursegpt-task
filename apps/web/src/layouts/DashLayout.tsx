import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Theme from "@/components/common/Theme";

type Chat = {
  id: string;
  title: string;
  lastUpdated: string;
}

type DashLayoutProps = {
  children: ReactNode;
  chatId: string | null;
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (id: string) => void;
  createNewChat: () => void;
  deleteChat: (id: string) => void;
}

const DashLayout: React.FC<DashLayoutProps> = ({
  children,
  chats,
  activeChat,
  setActiveChat,
  createNewChat,
  deleteChat,
}) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <div className="fixed top-10 right-10">
        <Theme />
      </div>
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
      />

      <div className="flex-1 flex flex-col rounded-r-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default DashLayout;
