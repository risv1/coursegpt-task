/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  RiRefreshLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";
import { BiTrash, BiDownload, BiLinkExternal } from "react-icons/bi";
import { BsImages, BsPlayCircle, BsQuestionCircle } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Image = {
  title: string;
  url: string;
  description: string;
};

type ExternalLink = {
  title: string;
  url: string;
  type: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type Module = {
  id: string;
  title: string;
  description: string;
  duration: string;
  content: string;
  subtopics?: string[];
  images: Image[];
  externalLinks: ExternalLink[];
  quiz: QuizQuestion[];
};
type AssessmentComponent = {
  type: string;
  weight: string;
};

type CourseContent = {
  title: string;
  description: string;
  totalDuration: string;
  targetAudience: string;
  learningOutcomes: string[];
  difficulty: string;
  prerequisites: string[];
  modules: Module[];
  assessment?: {
    type: string;
    components: AssessmentComponent[];
    passingCriteria: string;
  };
};

type MessageListProps = {
  messages: Message[];
  onRegenerate: (index: number) => void;
  onDelete: (index: number) => void;
  onDownload: () => void;
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onRegenerate,
  onDelete,
  onDownload,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [showQuiz, setShowQuiz] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleQuiz = (moduleId: string) => {
    setShowQuiz((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const selectAnswer = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const parseCourseContent = (content: string): CourseContent | null => {
    try {
      const parsed = JSON.parse(content);

      if (parsed.modules) {
        parsed.modules = parsed.modules.map((module: any) => {
          if (module.images) {
            module.images = module.images.map((img: any) => ({
              title: img.title || "",
              url: img.imageUrl || img.url || "",
              description: img.description || "",
            }));
          }

          if (module.externalLinks) {
            module.externalLinks = module.externalLinks.map((link: any) => ({
              title: link.title || "",
              url: link.link || link.url || "",
              type: link.type || "link",
            }));
          }

          return {
            id: module.id || "",
            title: module.title || "",
            description: module.description || "",
            duration: module.duration || "",
            content: module.content || module.description || "",
            subtopics: module.subtopics || [],
            images: module.images || [],
            externalLinks: module.externalLinks || [],
            quiz: module.quiz || [],
          };
        });
      }

      return parsed;
    } catch (e) {
      console.error("Failed to parse course content:", e);
      return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-8 max-w-4xl mx-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "user" ? (
              <div className="max-w-xl rounded-2xl p-5 bg-red-400 text-black rounded-br-none shadow-sm">
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ) : (
              <div className="w-full rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm rounded-bl-none overflow-hidden">
                {(() => {
                  const courseContent = parseCourseContent(message.content);

                  if (courseContent) {
                    return (
                      <>
                        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                            {courseContent.title}
                          </h2>
                          <p className="text-neutral-600 dark:text-neutral-300 mt-2">
                            {courseContent.description}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-4">
                            <div className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm flex items-center">
                              <BsImages className="mr-1" size={14} />
                              {courseContent.difficulty}
                            </div>
                            <div className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm flex items-center">
                              <BsPlayCircle className="mr-1" size={14} />
                              {courseContent.totalDuration} minutes
                            </div>
                            <div className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm flex items-center">
                              <HiOutlineDocumentText
                                className="mr-1"
                                size={14}
                              />
                              {courseContent.modules?.length || 0} modules
                            </div>
                          </div>

                          {courseContent.learningOutcomes &&
                            courseContent.learningOutcomes.length > 0 && (
                              <div className="mt-6">
                                <h3 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                                  Learning Outcomes
                                </h3>
                                <ul className="list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
                                  {courseContent.learningOutcomes.map(
                                    (outcome, i) => (
                                      <li key={i}>{outcome}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {courseContent.prerequisites &&
                            courseContent.prerequisites.length > 0 && (
                              <div className="mt-4">
                                <h3 className="text-md font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                                  Prerequisites
                                </h3>
                                <ul className="list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
                                  {courseContent.prerequisites.map(
                                    (prereq, i) => (
                                      <li key={i}>{prereq}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>

                        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                          {courseContent.modules.map((module, moduleIndex) => {
                            const isOpen = openSections[module.id] ?? false;
                            const isQuizOpen = showQuiz[module.id] ?? false;

                            return (
                              <div key={module.id}>
                                <div>
                                  <button
                                    onClick={() => toggleSection(module.id)}
                                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors"
                                  >
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-500 flex items-center justify-center mr-3">
                                        <span className="font-medium">
                                          {moduleIndex + 1}
                                        </span>
                                      </div>
                                      <div className="text-left">
                                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                                          {module.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                          {module.duration} minutes
                                        </p>
                                      </div>
                                    </div>
                                    <span>
                                      {isOpen ? (
                                        <RiArrowUpSLine size={20} />
                                      ) : (
                                        <RiArrowDownSLine size={20} />
                                      )}
                                    </span>
                                  </button>
                                </div>

                                {isOpen && (
                                  <div className="px-5 pb-5">
                                    <div className="pl-14">
                                      <p className="text-md text-black dark:text-white mb-4">
                                        {module.description}
                                      </p>

                                      {module.subtopics && module.subtopics.length > 0 && (
                                        <div className="mb-6">
                                          <h4 className="text-md font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                                            Topics Covered
                                          </h4>
                                          <ul className="list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
                                            {module.subtopics.map((topic, i) => (
                                              <li key={i}>{topic}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}

                                      {module.images &&
                                        module.images.length > 0 && (
                                          <div className="mb-6">
                                            <h4 className="text-md font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                                              Visual Resources
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                              {module.images.map(
                                                (image, imgIndex) => (
                                                  <a
                                                    key={imgIndex}
                                                    href={image.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:border-red-300 dark:hover:border-red-500/30 transition-colors group"
                                                  >
                                                    <div className="h-36 bg-neutral-100 dark:bg-neutral-800 relative">
                                                      <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                                                        <BsImages size={24} />
                                                      </div>
                                                    </div>
                                                    <div className="p-3">
                                                      <h5 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                        {image.title}
                                                      </h5>
                                                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                                        {image.description}
                                                      </p>
                                                    </div>
                                                  </a>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      {module.externalLinks &&
                                        module.externalLinks.length > 0 && (
                                          <div className="mb-6">
                                            <h4 className="text-md font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                                              External Resources
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                              {module.externalLinks.map(
                                                (link, linkIndex) => (
                                                  <a
                                                    key={linkIndex}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center p-3 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-red-300 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group"
                                                  >
                                                    <div className="flex-1">
                                                      <p className="font-medium text-neutral-900 dark:text-neutral-100 line-clamp-1">
                                                        {link.title}
                                                      </p>
                                                    </div>
                                                    <BiLinkExternal
                                                      size={18}
                                                      className="text-neutral-400 group-hover:text-red-400"
                                                    />
                                                  </a>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}

                                      {module.quiz &&
                                        module.quiz.length > 0 && (
                                          <div className="bg-neutral-50 dark:bg-neutral-700/30 rounded-xl overflow-hidden">
                                            <button
                                              onClick={() =>
                                                toggleQuiz(module.id)
                                              }
                                              className="w-full flex items-center justify-between p-4 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-colors"
                                            >
                                              <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-500 flex items-center justify-center mr-3">
                                                  <BsQuestionCircle size={16} />
                                                </div>
                                                <h4 className="font-medium">
                                                  Self-Assessment Quiz
                                                </h4>
                                              </div>
                                              <span>
                                                {isQuizOpen ? (
                                                  <RiArrowUpSLine size={20} />
                                                ) : (
                                                  <RiArrowDownSLine size={20} />
                                                )}
                                              </span>
                                            </button>

                                            {isQuizOpen && (
                                              <div className="p-4">
                                                <div className="space-y-6">
                                                  {module.quiz.map(
                                                    (quizItem, quizIndex) => {
                                                      const questionId = `${module.id}-q${quizIndex}`;
                                                      const selectedAnswer =
                                                        selectedAnswers[
                                                          questionId
                                                        ];

                                                      return (
                                                        <div
                                                          key={questionId}
                                                          className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm"
                                                        >
                                                          <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                                                            {quizIndex + 1}.{" "}
                                                            {quizItem.question}
                                                          </p>
                                                          <div className="space-y-2 mb-4">
                                                            {quizItem.options.map(
                                                              (
                                                                option,
                                                                optionIndex
                                                              ) => (
                                                                <button
                                                                  key={
                                                                    optionIndex
                                                                  }
                                                                  onClick={() =>
                                                                    selectAnswer(
                                                                      questionId,
                                                                      optionIndex
                                                                    )
                                                                  }
                                                                  className={`w-full text-left p-3 rounded-lg border ${
                                                                    selectedAnswer ===
                                                                    optionIndex
                                                                      ? "border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-500"
                                                                      : "border-neutral-200 dark:border-neutral-700 hover:border-red-300 dark:hover:border-red-600"
                                                                  }`}
                                                                >
                                                                  <div className="flex items-center">
                                                                    <div
                                                                      className={`w-5 h-5 flex-shrink-0 rounded-full border ${
                                                                        selectedAnswer ===
                                                                        optionIndex
                                                                          ? "border-red-500 bg-red-500"
                                                                          : "border-neutral-300 dark:border-neutral-600"
                                                                      } mr-3 flex items-center justify-center`}
                                                                    >
                                                                      {selectedAnswer ===
                                                                        optionIndex && (
                                                                        <div className="w-2 h-2 rounded-full bg-white" />
                                                                      )}
                                                                    </div>
                                                                    <p className="text-neutral-700 dark:text-neutral-300">
                                                                      {option}
                                                                    </p>
                                                                  </div>
                                                                </button>
                                                              )
                                                            )}
                                                          </div>

                                                          {selectedAnswer !==
                                                            undefined && (
                                                            <div
                                                              className={`p-3 rounded-lg ${
                                                                selectedAnswer ===
                                                                quizItem.correctAnswer
                                                                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50"
                                                                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50"
                                                              }`}
                                                            >
                                                              <p
                                                                className={`font-medium mb-1 ${
                                                                  selectedAnswer ===
                                                                  quizItem.correctAnswer
                                                                    ? "text-green-700 dark:text-green-400"
                                                                    : "text-red-700 dark:text-red-400"
                                                                }`}
                                                              >
                                                                {selectedAnswer ===
                                                                quizItem.correctAnswer
                                                                  ? "Correct!"
                                                                  : "Incorrect"}
                                                              </p>
                                                              <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                                                                {
                                                                  quizItem.explanation
                                                                }
                                                              </p>
                                                            </div>
                                                          )}
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {courseContent.assessment && (
                          <div className="p-5 bg-neutral-50 dark:bg-neutral-800/80 border-t border-neutral-200 dark:border-neutral-700">
                            <h3 className="text-md font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
                              Assessment Strategy
                            </h3>
                            <div className="mb-4">
                              <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                                <span className="font-medium">Type:</span>{" "}
                                {courseContent.assessment.type}
                              </p>

                              {courseContent.assessment.components &&
                                courseContent.assessment.components.length >
                                  0 && (
                                  <div>
                                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                      Components:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {courseContent.assessment.components.map(
                                        (component, i) => (
                                          <div
                                            key={i}
                                            className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-xs flex items-center"
                                          >
                                            <span className="text-neutral-700 dark:text-neutral-300">
                                              {component.type}
                                            </span>
                                            <span className="ml-1 font-semibold text-red-500">
                                              {component.weight}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              <span className="font-medium">
                                Passing criteria:
                              </span>{" "}
                              {courseContent.assessment.passingCriteria}
                            </p>
                          </div>
                        )}
                        <div className="p-5 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                          <div>
                            <button
                              onClick={onDownload}
                              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg transition-colors flex items-center text-sm"
                            >
                              <BiDownload size={16} className="mr-2" />
                              Download Course
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => onRegenerate(index)}
                              className="p-2 text-neutral-500 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              title="Regenerate"
                            >
                              <RiRefreshLine size={18} />
                            </button>
                            <button
                              onClick={() => onDelete(index)}
                              className="p-2 text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              title="Delete"
                            >
                              <BiTrash size={18} />
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  }

                  return (
                    <div className="p-5">
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: message.content
                            .replace(/\n/g, "<br>")
                            .replace(/#{1,6} (.*?)$/gm, "<h$1>$2</h$1>")
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/- (.*?)$/gm, "<li>$1</li>")
                            .replace(/<li>/g, "<ul><li>")
                            .replace(/<\/li>/g, "</li></ul>")
                            .replace(/<\/ul><ul>/g, ""),
                        }}
                      />
                      <div className="flex mt-4 space-x-1 justify-end">
                        <button
                          onClick={() => onRegenerate(index)}
                          className="p-2 text-neutral-500 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Regenerate"
                        >
                          <RiRefreshLine size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(index)}
                          className="p-2 text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <BiTrash size={18} />
                        </button>
                        <button
                          onClick={onDownload}
                          className="p-2 text-neutral-500 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Download"
                        >
                          <BiDownload size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
