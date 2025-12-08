import { Button } from "./ui/button";
import { ArrowDown, Sparkles, Cpu, Brain } from "lucide-react";
import { ArrakisObject } from "./ArrakisObject";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#388EA4] dark:bg-background">
      {/* 3D Arrakis Object Background - Changes color based on theme */}
      <div className="absolute inset-0 z-0">
        <ArrakisObject 
          lightColor1="#e8c8e8" 
          lightColor2="#9d529d"
          darkColor1="#e8c8e8" 
          darkColor2="#9d529d"
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary border-4 border-foreground rotate-12 opacity-30 z-10" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-accent border-4 border-foreground -rotate-12 opacity-30 z-10" />
      <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-muted border-4 border-foreground rotate-45 opacity-30 z-10" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-8 flex justify-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(45,27,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(252,208,106,1)]">
            <Brain size={20} />
            AI Engineer
          </span>
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(45,27,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(252,208,106,1)]">
            <Cpu size={20} />
            ML Specialist
          </span>
        </div>
        
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" onClick={scrollToProjects} className="text-lg px-8 py-6">
            View My Work
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-lg px-8 py-6">
            Get In Touch
          </Button>
        </div>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="mx-auto" size={40} strokeWidth={3} />
        </div>
      </div>
    </section>
  );
}