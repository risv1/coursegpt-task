import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="w-full py-16 flex flex-col-reverse md:flex-row items-center border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
        <div className="flex flex-col items-start justify-center gap-6">
          <div className="flex flex-col w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-neutral-900 dark:text-white leading-tight">
              Create Better Courses
            </h1>
            <div className="bg-neutral-950 w-fit px-4 py-2 rounded-xl">
              <span className="text-4xl sm:text-5xl md:text-6xl text-red-400 font-bold italic">
                Faster
              </span>
            </div>
          </div>

          <p className="text-lg sm:text-xl max-w-xl text-neutral-700 dark:text-neutral-300">
            CourseGPT is an intelligent authoring tool that empowers educators
            to efficiently create, organize, and enhance educational content
            with the power of AI.
          </p>

          <div className="flex flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <Link
              href="/dashboard"
              className="bg-red-400 text-black font-medium rounded-full px-5 py-3 text-lg flex items-center gap-2 w-fit"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="text-neutral-800 dark:text-neutral-200 hover:text-red-400 dark:hover:text-red-400 font-medium transition-colors text-center sm:text-left py-3"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 hidden md:flex justify-center items-center p-6 md:p-8 mb-8 md:mb-0">
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] border-4 border-red-400 rounded-lg">
          <Image
            src="/images/hero.png"
            alt="CourseGPT Platform"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
