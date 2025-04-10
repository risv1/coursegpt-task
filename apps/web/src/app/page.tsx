import Hero from "@/components/home/Hero";
import Bento from "@/components/home/Bento";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-white dark:bg-neutral-950 flex flex-col max-w-[90vw] mx-auto">
      <Navbar />
      <Hero />
      <Bento />
      <Footer />
    </main>
  );
};

export default Home;
