import { Calendar, Clock } from "lucide-react";
import { useMode } from "../contexts/ModeContext";

const thoughts = [
  {
    title: "The Future of Multimodal AI",
    date: "Nov 28, 2024",
    readTime: "5 min read",
    excerpt: "Exploring how combining vision, language, and audio models is revolutionizing AI applications and creating more human-like interactions.",
    image: "https://images.unsplash.com/photo-1674027215016-0a4abfdbf1cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZnV0dXJlfGVufDF8fHx8MTc2NTE4NjEwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["AI", "Multimodal", "Research"]
  },
  {
    title: "Building Scalable ML Pipelines",
    date: "Nov 15, 2024",
    readTime: "8 min read",
    excerpt: "Lessons learned from deploying machine learning models at scale - from data preprocessing to monitoring in production.",
    image: "https://images.unsplash.com/photo-1744130268219-3efd622e04fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrcyUyMGFic3RyYWN0fGVufDF8fHx8MTc2NTIxOTk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["MLOps", "Engineering", "Best Practices"]
  },
  {
    title: "Transfer Learning in Computer Vision",
    date: "Oct 30, 2024",
    readTime: "6 min read",
    excerpt: "How pre-trained models are democratizing AI - achieving state-of-the-art results with limited data and compute resources.",
    image: "https://images.unsplash.com/photo-1761305135230-a626d3c8d0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBjb25jZXB0fGVufDF8fHx8MTc2NTIxOTk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Computer Vision", "Transfer Learning", "Tutorial"]
  },
  {
    title: "Ethics in AI Development",
    date: "Oct 12, 2024",
    readTime: "7 min read",
    excerpt: "Discussing the responsibility of AI engineers in building fair, transparent, and accountable systems for society.",
    image: "https://images.unsplash.com/photo-1609619385076-36a873425636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjUxNTMxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Ethics", "AI Safety", "Opinion"]
  }
];

export function Thoughts() {
  const { mode } = useMode();
  
  if (mode !== 'thought') return null;
  
  return (
    <>
      {/* Grain texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 mix-blend-multiply z-[1]"
        style={{
          backgroundImage: 'url("https://img.freepik.com/premium-photo/white-dust-scratches-black-background_279525-2.jpg?w=640")',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <section id="thoughts" className="py-20 px-4 bg-transparent animate-in fade-in duration-700 relative z-10 min-h-[200vh]" style={{ backgroundColor: 'transparent' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-white" style={{ fontFamily: 'var(--font-primary)' }}>Recent Thoughts</h2>
            <p className="max-w-2xl mx-auto text-gray-300" style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase' }}>
              Sharing insights, learnings, and perspectives on AI, machine learning, and the future of technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {thoughts.map((thought, index) => (
              <article key={index} className="bg-[#1a1a1a] border-2 border-gray-700 shadow-lg overflow-hidden hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-xl transition-all">
                <div className="h-48 overflow-hidden border-b-2 border-gray-700">
                  <img 
                    src={thought.image} 
                    alt={thought.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {thought.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-gray-800 border border-gray-600 text-sm text-gray-300"
                        style={{ fontFamily: 'monospace', fontSize: '10px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: 'var(--font-primary)' }}>{thought.title}</h3>
                  <p className="mb-4 text-gray-400" style={{ fontFamily: 'monospace', fontSize: '12px' }}>{thought.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500" style={{ fontFamily: 'monospace', fontSize: '10px' }}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{thought.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{thought.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}