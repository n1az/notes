import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, Linkedin, Github } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only: Log form data
    console.log("Form submitted:", formData);
    alert("Thank you for your message! (This is a demo - form data is not actually sent)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4">Let's Collaborate</h2>
          <p className="max-w-2xl mx-auto">
            Interested in working together on AI projects or discussing machine learning opportunities? Let's connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="mb-6">Connect With Me</h3>
              <div className="space-y-4">
                <a href="mailto:niaz.morshed@ai-engineer.com" className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <div className="w-12 h-12 bg-secondary border-4 border-foreground flex items-center justify-center">
                    <Mail size={24} strokeWidth={3} className="text-secondary-foreground" />
                  </div>
                  <span>niaz.morshed@ai-engineer.com</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <div className="w-12 h-12 bg-accent border-4 border-foreground flex items-center justify-center">
                    <Linkedin size={24} strokeWidth={3} className="text-accent-foreground" />
                  </div>
                  <span>LinkedIn Profile</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <div className="w-12 h-12 bg-muted border-4 border-foreground flex items-center justify-center">
                    <Github size={24} strokeWidth={3} className="text-muted-foreground" />
                  </div>
                  <span>GitHub Portfolio</span>
                </a>
              </div>
            </div>

            <div className="pt-8 border-t-4 border-foreground">
              <p>
                Currently pursuing Master's in Data Science and open to research collaborations, 
                AI/ML consulting, and innovative projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}