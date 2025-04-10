"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MessageList from "@/components/dashboard/MessageList";
import MessageInput from "@/components/dashboard/MessageInput";
import WelcomeScreen from "@/components/dashboard/WelcomeScreen";
import DownloadModal from "@/components/dashboard/DownloadModal";
import Theme from "@/components/common/Theme";


type Message = {
  role: "user" | "assistant";
  content: string;
}

type Chat = {
  id: string;
  title: string;
  lastUpdated: string;
}

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setValue] = useState("");
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    { id: "1", title: "Introduction to Biology", lastUpdated: "2 days ago" },
    { id: "2", title: "Advanced Physics Concepts", lastUpdated: "1 week ago" },
    { id: "3", title: "History of Ancient Rome", lastUpdated: "3 weeks ago" },
  ]);
  const [activeChat, setActiveChat] = useState<string | null>("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue
    };

    const aiResponse: Message = {
      role: "assistant",
      content: JSON.stringify({
        title: `Complete Course on ${inputValue}`,
        description: `A comprehensive course covering all essential aspects of ${inputValue}, designed for effective learning and practical application.`,
        totalDuration: "180 minutes",
        targetAudience: "Intermediate level students",
        learningOutcomes: [
          `Understand core principles and concepts of ${inputValue}`,
          `Apply analytical techniques to solve ${inputValue}-related problems`,
          `Evaluate real-world applications of ${inputValue}`
        ],
        difficulty: "Intermediate",
        prerequisites: ["Basic understanding of the subject area"],
        modules: [
          {
            id: "mod1",
            title: "Introduction to Key Concepts",
            description: "Fundamental principles and terminology",
            duration: "45 minutes",
            content: `This module introduces you to the essential concepts and terminology in ${inputValue}. We'll explore the historical context and development of key ideas, providing a solid foundation for more advanced topics.

            By the end of this module, you'll be familiar with the core vocabulary and conceptual framework needed to understand ${inputValue} in depth.`,
            images: [
              {
                title: "Conceptual Overview",
                url: "https://example.com/images/overview.jpg",
                description: "Visual summary of key concepts and their relationships"
              },
              {
                title: "Historical Development",
                url: "https://example.com/images/history.jpg",
                description: "Timeline showing the evolution of ideas in this field"
              }
            ],
            externalLinks: [
              {
                title: "Introduction Video",
                url: "https://example.com/videos/intro.mp4",
                type: "video"
              },
              {
                title: "Key Terminology Guide",
                url: "https://example.com/readings/terminology.html",
                type: "reading"
              }
            ],
            quiz: [
              {
                question: `What is the primary purpose of studying ${inputValue}?`,
                options: ["Historical appreciation", "Practical application", "Theoretical development", "Cultural significance"],
                correctAnswer: 1,
                explanation: "While all aspects have value, the practical application of these concepts is the primary purpose of study, as it enables real-world problem-solving and innovation."
              },
              {
                question: "Which approach is most effective when beginning to study this subject?",
                options: ["Memorizing definitions", "Understanding core principles", "Analyzing complex examples", "Studying historical context"],
                correctAnswer: 1,
                explanation: "Understanding the fundamental principles provides the necessary foundation to build more complex knowledge and apply concepts effectively in various contexts."
              }
            ]
          },
          {
            id: "mod2",
            title: "Practical Applications",
            description: "Real-world uses and case studies",
            duration: "60 minutes",
            content: `In this module, we explore how the concepts from the introductory section apply in practical scenarios. You'll examine case studies and learn techniques for implementing these ideas in various contexts.

            We'll analyze successful examples and discuss common challenges in application, along with strategies to overcome them.`,
            images: [
              {
                title: "Application Framework",
                url: "https://example.com/images/framework.jpg",
                description: "Step-by-step process for practical implementation"
              },
              {
                title: "Case Study Results",
                url: "https://example.com/images/results.jpg",
                description: "Visual data showing outcomes from real-world applications"
              }
            ],
            externalLinks: [
              {
                title: "Expert Demonstration",
                url: "https://example.com/videos/demo.mp4",
                type: "video"
              },
              {
                title: "Case Study Collection",
                url: "https://example.com/readings/cases.html",
                type: "document"
              }
            ],
            quiz: [
              {
                question: "Which factor most significantly affects successful implementation?",
                options: ["Available budget", "Team expertise", "Time constraints", "Technological tools"],
                correctAnswer: 1,
                explanation: "While all factors matter, team expertise is consistently the most critical element, as knowledgeable practitioners can adapt to budget limitations, time constraints, and technological challenges."
              },
              {
                question: "What is the recommended first step when applying these concepts?",
                options: ["Detailed planning", "Stakeholder analysis", "Resource gathering", "Problem definition"],
                correctAnswer: 3,
                explanation: "Clear problem definition is essential as the first step because it ensures all subsequent efforts are properly aligned with the actual needs and goals of the project."
              }
            ]
          },
          {
            id: "mod3",
            title: "Advanced Topics and Future Directions",
            description: "Emerging trends and cutting-edge developments",
            duration: "75 minutes",
            content: `The final module explores advanced concepts and current research trends in ${inputValue}. We'll examine how the field is evolving and discuss potential future developments.

            You'll learn about innovative approaches and gain insight into how experts are pushing boundaries in this area.`,
            images: [
              {
                title: "Innovation Map",
                url: "https://example.com/images/innovation.jpg",
                description: "Visual representation of emerging trends and their connections"
              },
              {
                title: "Future Projections",
                url: "https://example.com/images/future.jpg",
                description: "Data visualization of predicted developments over the next decade"
              }
            ],
            externalLinks: [
              {
                title: "Expert Panel Discussion",
                url: "https://example.com/videos/panel.mp4",
                type: "video"
              },
              {
                title: "Recent Research Summary",
                url: "https://example.com/readings/research.pdf",
                type: "research"
              }
            ],
            quiz: [
              {
                question: "Which emerging trend is likely to have the most significant impact?",
                options: ["Technological integration", "Interdisciplinary approaches", "Data-driven methodologies", "Global standardization"],
                correctAnswer: 1,
                explanation: "Interdisciplinary approaches are showing the most promise for breakthrough advances as they combine diverse perspectives and methodologies to address complex challenges in ways that single-discipline approaches cannot."
              },
              {
                question: "What skill will be most valuable for practitioners in this field over the next decade?",
                options: ["Technical specialization", "Cross-disciplinary collaboration", "Traditional methodologies", "Historical knowledge"],
                correctAnswer: 1,
                explanation: "As the field becomes more interconnected with other domains, the ability to collaborate across disciplinary boundaries will become increasingly valuable, enabling innovation and comprehensive solutions."
              }
            ]
          }
        ],
        assessment: {
          type: "Mixed",
          components: [
            { type: "Project work", weight: "40%" },
            { type: "Written examination", weight: "35%" },
            { type: "Participation and discussion", weight: "25%" }
          ],
          passingCriteria: "70% overall score with minimum 60% in each component"
        }
      })
    };

    setMessages([...messages, userMessage, aiResponse]);
    setValue("");

    if (messages.length === 0) {
      const newChat = {
        id: Date.now().toString(),
        title: `Course on ${inputValue}`,
        lastUpdated: "Just now",
      };
      setChats([newChat, ...chats]);
      setActiveChat(newChat.id);
    }
  };

  const handleRegenerate = (index: number) => {
    const updatedMessages = [...messages];
    updatedMessages[index].content += " [Regenerated content]";
    setMessages(updatedMessages);
  };

  const handleDelete = (index: number) => {
    const newMessages = [...messages];
    newMessages.splice(index - 1, 2);
    setMessages(newMessages);
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Lesson",
      lastUpdated: "Just now",
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
    setMessages([]);
  };

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
      />

      <div className="flex-1 flex flex-col rounded-r-xl overflow-hidden">
        {messages.length === 0 ? (
          <WelcomeScreen
            inputValue={inputValue}
            onInputChange={(e) => setValue(e.target.value)}
            onSubmit={handleSubmit}
          />
        ) : (
          <>
            <MessageList
              messages={messages}
              onRegenerate={handleRegenerate}
              onDelete={handleDelete}
              onDownload={() => setDownloadModalOpen(true)}
            />
            <MessageInput
              value={inputValue}
              onChange={(e) => setValue(e.target.value)}
              onSubmit={handleSubmit}
              placeholder="Ask follow-up questions or request modifications..."
            />
          </>
        )}
      </div>

      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
