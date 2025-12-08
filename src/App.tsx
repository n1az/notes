import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Thoughts } from "./components/Thoughts";
import { Photos } from "./components/Photos";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && <Loader onComplete={handleLoaderComplete} duration={3} />}
      <div className="min-h-screen transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <Thoughts />
          <Photos />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}