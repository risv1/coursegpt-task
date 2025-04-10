import React, { useState, useRef, useEffect } from 'react';
import { BiRefresh, BiCheck, BiX } from 'react-icons/bi';

type ContentEditorProps = {
  content: string;
  onSave: (newContent: string) => void;
  onRegenerate?: () => void;
  title?: string;
  isEditable?: boolean;
};

const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  onSave,
  onRegenerate,
  title,
  isEditable = true
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <div className="relative group">
      {title && (
        <h3 className="text-md font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
          {title}
        </h3>
      )}

      {isEditing ? (
        <div className="w-full">
          <textarea
            ref={textareaRef}
            value={editedContent}
            onChange={handleTextareaInput}
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-neutral-700 dark:text-neutral-100 min-h-[100px] resize-none"
          />

          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
            >
              <BiX size={20} />
            </button>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-green-600 dark:text-green-400"
            >
              <BiCheck size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`prose prose-sm dark:prose-invert max-w-none ${isEditable ? 'group-hover:bg-neutral-50 dark:group-hover:bg-neutral-800/50 cursor-text rounded-lg p-3 -m-3' : ''}`}
          onClick={isEditable ? () => setIsEditing(true) : undefined}
        >
          {content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-3 last:mb-0">{paragraph.trim()}</p>
          ))}
        </div>
      )}

      {!isEditing && onRegenerate && isEditable && (
        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onRegenerate}
            className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-600 dark:text-neutral-400"
            title="Regenerate content"
          >
            <BiRefresh size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
