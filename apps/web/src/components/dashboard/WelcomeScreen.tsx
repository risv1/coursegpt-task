import Image from "next/image";

type WelcomeScreenProps = {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  inputValue,
  onInputChange,
  onSubmit,
}) => {

  return (
    <>
      <div className="flex flex-col h-full justify-center items-center px-4 py-8">
        <div className="max-w-2xl w-full text-center">
          <div className="relative h-20 w-20 mx-auto mb-6">
            <Image src="/images/logo.png" alt="CourseGPT Logo" fill className="object-contain" />
          </div>

          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
            Welcome to Course<span className="text-red-400">GPT</span>
          </h1>

          <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-lg mx-auto">
            Create engaging educational content with AI assistance. Describe your lesson topic below
            to generate a structured lesson plan with learning outcomes, key concepts, and activities.
          </p>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 mb-8">
            <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">Try asking about topics like:</h2>

            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm">
                Introduction to Python programming
              </span>
              <span className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm">
                Climate change impacts
              </span>
              <span className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm">
                Renaissance art history
              </span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={onSubmit} className="relative">
              <textarea
                value={inputValue}
                onChange={onInputChange}
                placeholder="Describe your lesson topic and content requirements..."
                className="w-full border border-neutral-300 dark:border-neutral-600 rounded-xl py-4 px-5 pr-16 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent resize-none bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm"
                rows={4}
              />
              <button
                type="submit"
                className="absolute right-3 bottom-3 bg-red-400 hover:cursor-pointer text-black rounded-full p-3 transition-colors shadow-sm hover:shadow flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
              </button>
            </form>
            <div className="mt-3 flex justify-between items-center">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Be as specific as possible for better results
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
