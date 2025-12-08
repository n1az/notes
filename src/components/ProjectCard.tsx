import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export function ProjectCard({ title, category, description, image, tags }: ProjectCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden border-4 border-foreground mb-4 aspect-[4/3] bg-card shadow-[8px_8px_0px_0px_rgba(45,27,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(252,208,106,1)] transition-all hover:shadow-[12px_12px_0px_0px_rgba(45,27,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(252,208,106,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm px-3 py-1 bg-secondary text-secondary-foreground border-2 border-foreground">{category}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}