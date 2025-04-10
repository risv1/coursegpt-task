import React from "react";

type MessageInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
};

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Type your message...",
}) => {
  return (
    <div className="border-t border-neutral-200 dark:border-neutral-700 p-4 bg-inherit rounded-b-xl">
      <form onSubmit={onSubmit} className="max-w-3xl mx-auto">
        <div className="relative">
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border border-neutral-300 dark:border-neutral-600 rounded-xl py-3 px-4 pr-16 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent resize-none bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm"
            rows={3}
          />
          <div className="absolute right-3 bottom-3 flex items-center space-x-2">
            <button
              type="submit"
              className="bg-red-400 hover:cursor-pointer text-black rounded-full p-2.5 transition-colors shadow-sm hover:shadow flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 2L11 13"></path>
                <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
