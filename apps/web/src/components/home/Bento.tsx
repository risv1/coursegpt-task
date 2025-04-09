import React from "react";
import BentoCard from "./BentoCard";
import {
  FiLayers,
  FiEdit,
  FiBook,
  FiFileText,
} from "react-icons/fi";
import { LuBrain } from "react-icons/lu";

const Bento: React.FC = () => {
  return (
    <section id="features" className="w-full py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
            Intelligent Course <span className="text-red-400">Creation</span>
          </h2>
          <p className="text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            Transform your teaching materials with our AI-powered tools designed for educators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BentoCard
            title="AI Lesson Generation"
            description="Create comprehensive lessons in seconds with our advanced AI templates."
            icon={LuBrain}
            variant="primary"
          />
          <BentoCard
            title="Smart Content Organization"
            description="Effortlessly structure and sequence your course modules for optimal learning."
            icon={FiLayers}
            variant="secondary"
          />
          <BentoCard
            title="Interactive Editor"
            description="Refine AI-generated content with our intuitive, education-focused editing tools."
            icon={FiEdit}
            variant="primary"
          />
          <BentoCard
            title="Learning Outcome Creation"
            description="Generate clear, measurable learning objectives aligned with educational standards."
            icon={FiBook}
            variant="secondary"
            className="md:col-span-2 lg:col-span-1"
          />
          <BentoCard
            title="Assessment Builder"
            description="Design effective quizzes and activities to reinforce learning concepts."
            icon={FiFileText}
            variant="primary"
            className="md:col-span-2 lg:col-span-2"
          />
        </div>
      </div>
    </section>
  );
};

export default Bento;
