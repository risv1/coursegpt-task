import React from "react";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import {
  FiLayers,
  FiEdit,
  FiFileText,
} from "react-icons/fi";
import { LuBrain } from "react-icons/lu";

const FeatureSection = ({
  title,
  description,
  icon: Icon,
  children,
  imageUrl,
  reverse = false,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children?: React.ReactNode;
  imageUrl: string;
  reverse?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-12 py-16 border-b border-neutral-200 dark:border-neutral-800`}
    >
      <div className="flex-1">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-400 p-3 rounded-lg inline-block mb-4">
          <Icon size={24} />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">
          {title}
        </h2>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
          {description}
        </p>
        {children}
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 p-2">
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

const FeaturesPage = () => {
  return (
    <>
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
              AI-Powered <span className="text-red-400">Features</span>
            </h1>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Discover the powerful tools that make CourseGPT the best platform
              for creating educational content
            </p>
          </div>

          <FeatureSection
            title="AI Lesson Generation"
            description="Create comprehensive lessons in seconds with our advanced AI templates. CourseGPT analyzes your topic and generates structured content with learning objectives, explanations, examples, and assessments."
            icon={LuBrain}
            imageUrl="/images/lesson.png"
          >
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Generate
                complete lessons from just a topic
              </li>
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Create clear
                learning objectives automatically
              </li>
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Include
                relevant examples and exercises
              </li>
            </ul>
          </FeatureSection>

          <FeatureSection
            title="Smart Content Organization"
            description="Effortlessly structure and sequence your course modules for optimal learning. Our intelligent system helps you organize lessons in a logical progression that enhances student understanding."
            icon={FiLayers}
            imageUrl="/images/content.png"
            reverse={true}
          >
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Drag-and-drop
                module organization
              </li>
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Automatic
                sequencing suggestions
              </li>
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Prerequisite
                mapping and visualization
              </li>
            </ul>
          </FeatureSection>

          <FeatureSection
            title="Interactive Editor"
            description="Refine AI-generated content with our intuitive, education-focused editing tools. Customize every aspect of your lessons while maintaining pedagogical best practices."
            icon={FiEdit}
            imageUrl="/images/editing.png"
          >
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Rich text
                formatting designed for educators
              </li>
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Section-by-section
                AI regeneration
              </li>
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Embedded
                media and interactive elements
              </li>
            </ul>
          </FeatureSection>

          <FeatureSection
            title="Assessment Builder"
            description="Design effective quizzes, tests, and activities to reinforce learning concepts. Our AI helps create varied question types that test different levels of understanding."
            icon={FiFileText}
            imageUrl="/images/quiz.png"
            reverse={true}
          >
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Multiple
                question formats (MCQ, short answer, etc.)
              </li>
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> AI-generated
                questions based on content
              </li>
              <li className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-green-500 font-bold">✓</span> Difficulty
                level classification
              </li>
            </ul>
          </FeatureSection>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeaturesPage;
