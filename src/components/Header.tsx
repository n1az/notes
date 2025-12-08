import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between h-14">
          {/* Logo/Brand */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            NIAZ
          </button>

          {/* Vertical divider */}
          <div className="h-full w-px bg-foreground/10"></div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center h-full">
            <button 
              onClick={() => scrollToSection('projects')}
              className="h-full px-6 text-sm font-medium hover:text-foreground/70 transition-colors relative group border-r border-foreground/10"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <button 
              onClick={() => scrollToSection('thoughts')}
              className="h-full px-6 text-sm font-medium hover:text-foreground/70 transition-colors relative group border-r border-foreground/10"
            >
              Thoughts
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <button 
              onClick={() => scrollToSection('photos')}
              className="h-full px-6 text-sm font-medium hover:text-foreground/70 transition-colors relative group border-r border-foreground/10"
            >
              Photos
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="h-full px-6 text-sm font-medium hover:text-foreground/70 transition-colors relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center h-full border-l border-r border-foreground/10 px-6">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}