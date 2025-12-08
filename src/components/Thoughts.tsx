import { Calendar, Clock } from "lucide-react";

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
  return (
    <section id="thoughts" className="py-20 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4">Recent Thoughts</h2>
          <p className="max-w-2xl mx-auto">
            Sharing insights, learnings, and perspectives on AI, machine learning, and the future of technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {thoughts.map((thought, index) => (
            <article key={index} className="bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(45,27,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(252,208,106,1)] overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(45,27,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(252,208,106,1)] transition-all">
              <div className="h-48 overflow-hidden border-b-4 border-foreground">
                <img 
                  src={thought.image} 
                  alt={thought.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {thought.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-muted border-2 border-foreground text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-3">{thought.title}</h3>
                <p className="mb-4">{thought.excerpt}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{thought.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{thought.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}