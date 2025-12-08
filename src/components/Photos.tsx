import { Camera, MapPin } from "lucide-react";
import { useState } from "react";

const photos = [
  {
    image: "https://images.unsplash.com/photo-1642287040066-2bd340523289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMG5pZ2h0fGVufDF8fHx8MTc2NTEzNjYwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Night Architecture",
    location: "Downtown",
    camera: "Sony A7III"
  },
  {
    image: "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY1MjE5NzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Mountain Vista",
    location: "Rocky Mountains",
    camera: "Canon EOS R5"
  },
  {
    image: "https://images.unsplash.com/photo-1598087216773-d02ad98034f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMGNpdHl8ZW58MXx8fHwxNzY1MTg3MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Urban Life",
    location: "City Streets",
    camera: "Fuji X-T4"
  },
  {
    image: "https://images.unsplash.com/photo-1584282479918-1ea22427dc0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjUxMzk1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Flower Meadow",
    location: "Countryside",
    camera: "Nikon Z6"
  },
  {
    image: "https://images.unsplash.com/photo-1430414734948-17ebbe665afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY1MjA2NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Golden Hour",
    location: "Coastal View",
    camera: "Sony A7III"
  },
  {
    image: "https://images.unsplash.com/photo-1651331189447-704ac3643c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5c2NhcGUlMjBtb2Rlcm58ZW58MXx8fHwxNzY1MjE5OTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Modern Cityscape",
    location: "Metropolitan",
    camera: "Canon EOS R5"
  },
  {
    image: "https://images.unsplash.com/photo-1643649215570-6f61cddc3acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY1MTYwODY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Minimalist Forms",
    location: "Studio",
    camera: "Fuji X-T4"
  },
  {
    image: "https://images.unsplash.com/photo-1489396160836-2c99c977e970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjUyMDAxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Travel Memories",
    location: "Venice",
    camera: "Sony A7III"
  }
];

export function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section id="photos" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4">Photo Gallery</h2>
          <p className="max-w-2xl mx-auto">
            Capturing moments and perspectives through my lens - from urban landscapes to nature's beauty.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative bg-card border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(45,27,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(252,208,106,1)] overflow-hidden hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_rgba(45,27,0,1)] dark:hover:shadow-[9px_9px_0px_0px_rgba(252,208,106,1)] transition-all cursor-pointer"
              onClick={() => setSelectedPhoto(index)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
                  <h4 className="mb-2 text-background">{photo.title}</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{photo.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera size={14} />
                      <span>{photo.camera}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-5xl w-full">
            <img
              src={photos[selectedPhoto].image}
              alt={photos[selectedPhoto].title}
              className="w-full border-4 border-background shadow-[12px_12px_0px_0px_rgba(255,229,180,1)]"
            />
            <div className="mt-6 text-background text-center">
              <h3 className="mb-2 text-background">{photos[selectedPhoto].title}</h3>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{photos[selectedPhoto].location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera size={18} />
                  <span>{photos[selectedPhoto].camera}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}