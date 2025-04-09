import React from "react";
import Link from "next/link";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin
} from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-8 md:px-16 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Course<span className="text-red-400">GPT</span>
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-md">
              An intelligent authoring tool that empowers educators to create, organize,
              and enhance educational content with AI.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/risv1/coursegpt-task" target="_blank" className="text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400">
                <FiGithub size={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400">
                <FiTwitter size={20} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400">
                <FiLinkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400">Home</Link></li>
              <li><Link href="/features" className="text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400">Features</Link></li>
              <li><Link href="/pricing" className="text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400">Pricing</Link></li>
              <li><Link href="/contact" className="text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            © {new Date().getFullYear()} CourseGPT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
