import Hero from "@/components/home/Hero";
import Bento from "@/components/home/Bento";
import Footer from "@/components/common/Footer";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-white dark:bg-black flex flex-col max-w-[90vw] mx-auto">
      <Hero />
      <Bento />
      <Footer />
    </main>
  );
};

export default Home;
