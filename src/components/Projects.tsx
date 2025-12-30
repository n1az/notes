import { ProjectCard } from "./ProjectCard";
import { useMode } from "../contexts/ModeContext";

const projects = [
  {
    title: "Neural Style Transfer",
    category: "Deep Learning",
    description: "Implemented a convolutional neural network that transforms images using artistic styles, achieving real-time performance with TensorFlow.",
    image: "https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NjUxNjQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Deep Learning", "CNN", "TensorFlow"]
  },
  {
    title: "Predictive Analytics System",
    category: "Machine Learning",
    description: "Built a time-series forecasting model using LSTM networks to predict market trends with 89% accuracy on test data.",
    image: "https://images.unsplash.com/photo-1484662020986-75935d2ebc66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBkYXRhfGVufDF8fHx8MTc2NTE4MTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["LSTM", "Time-Series", "PyTorch"]
  },
  {
    title: "AI Chatbot Framework",
    category: "NLP",
    description: "Developed an intelligent chatbot using transformer models and fine-tuned GPT architecture for domain-specific conversations.",
    image: "https://images.unsplash.com/photo-1625314887424-9f190599bd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3R8ZW58MXx8fHwxNzY1MTY4MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["NLP", "Transformers", "GPT"]
  },
  {
    title: "Customer Segmentation",
    category: "Data Science",
    description: "Applied unsupervised learning techniques including K-means and DBSCAN to segment customers and optimize marketing strategies.",
    image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjUxOTc2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Clustering", "K-means", "Scikit-learn"]
  },
  {
    title: "Object Detection System",
    category: "Computer Vision",
    description: "Created a real-time object detection system using YOLO v8, processing 30+ FPS for autonomous vehicle applications.",
    image: "https://images.unsplash.com/photo-1655272427565-c64fd73298df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHZpc2lvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY1MjE5OTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["YOLO", "Computer Vision", "OpenCV"]
  },
  {
    title: "Sentiment Analysis Engine",
    category: "NLP",
    description: "Engineered a sentiment classifier using BERT embeddings achieving 94% accuracy on multi-language social media data.",
    image: "https://images.unsplash.com/photo-1653564142048-d5af2cf9b50f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwbGVhcm5pbmclMjBjb2RlfGVufDF8fHx8MTc2NTIxOTkwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["BERT", "NLP", "Hugging Face"]
  }
];

export function Projects() {
  const { mode } = useMode();
  
  if (mode !== 'ai') return null;
  
  return (
    <section id="ai-content" className="py-20 px-4 bg-transparent animate-in fade-in duration-700 min-h-[400vh] relative z-10">
      <div id="projects" className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4">Selected Projects</h2>
          <p className="max-w-2xl mx-auto">
            A collection of my recent AI and machine learning projects spanning computer vision, NLP, and predictive analytics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* Additional scrolling sections for metaball animation */}
        <div className="h-screen flex items-center justify-center mb-32">
          <div className="text-center max-w-3xl">
            <h2 className="text-6xl font-bold mb-6 uppercase" style={{ fontFamily: 'Metanoia, sans-serif' }}>
              Deep Learning Expertise
            </h2>
            <p className="text-2xl text-muted-foreground">
              Building neural networks with state-of-the-art architectures
            </p>
          </div>
        </div>

        <div className="h-screen flex items-center justify-center mb-32">
          <div className="text-center max-w-3xl">
            <h2 className="text-6xl font-bold mb-6 uppercase" style={{ fontFamily: 'Metanoia, sans-serif' }}>
              Computer Vision
            </h2>
            <p className="text-2xl text-muted-foreground">
              Creating intelligent systems that see and understand the world
            </p>
          </div>
        </div>

        <div className="h-screen flex items-center justify-center">
          <div className="text-center max-w-3xl">
            <h2 className="text-6xl font-bold mb-6 uppercase" style={{ fontFamily: 'Metanoia, sans-serif' }}>
              AI Innovation
            </h2>
            <p className="text-2xl text-muted-foreground">
              Pushing the boundaries of what's possible with artificial intelligence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}