import { Brain, Database, Code2, TrendingUp, Eye, Network } from "lucide-react";

const skills = [
  {
    icon: Brain,
    title: "Deep Learning",
    description: "Building neural networks with TensorFlow, PyTorch, and Keras for complex pattern recognition."
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Processing and analyzing large datasets using Python, SQL, and distributed computing frameworks."
  },
  {
    icon: Code2,
    title: "MLOps",
    description: "Deploying and monitoring ML models in production with Docker, Kubernetes, and cloud platforms."
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Creating forecasting models and statistical analysis for data-driven decision making."
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Developing image processing and object detection systems using CNNs and transformer architectures."
  },
  {
    icon: Network,
    title: "NLP",
    description: "Building language models and text processing systems with transformers and large language models."
  }
];

export function Skills() {
  return (
    <section className="py-20 px-4 bg-accent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4">Skills & Expertise</h2>
          <p className="max-w-2xl mx-auto">
            I combine machine learning expertise with software engineering to build intelligent, scalable AI systems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="p-6 bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(45,27,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(252,208,106,1)]">
                <div className="w-14 h-14 bg-primary border-4 border-foreground flex items-center justify-center mb-4">
                  <Icon size={28} strokeWidth={3} className="text-primary-foreground" />
                </div>
                <h3 className="mb-2">{skill.title}</h3>
                <p>{skill.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}