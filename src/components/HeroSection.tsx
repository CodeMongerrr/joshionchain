import { Github, Linkedin, Twitter, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Aditya Joshi
            </span>
          </h1>
          
          <p className="text-xl md:text-2l text-muted-foreground mb-4 font-mono">
            Blockchain Developer | Full-Stack Engineer | Protocol Builder
          </p>
          
          <p className="text-lg md:text-l text-foreground/80 mb-12 max-w-3xl mx-auto">
            Building the future with Smart Contracts, Encrypted Tokens, AI × Crypto, and DeFi infrastructure.
            Blockchain Engineer Intern at <span className="text-primary font-semibold">Nethermind</span> | 
            IIT (ISM) Dhanbad | ETHBangkok Hackathon Winner
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View Projects
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center mb-16">
            <a 
              href="https://github.com/CodeMongerrr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-glow"
            >
              <Github className="h-6 w-6 text-primary" />
            </a>
            <a 
              href="https://www.linkedin.com/in/adityaroshanjoshiiitism/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-glow"
            >
              <Linkedin className="h-6 w-6 text-primary" />
            </a>
            <a 
              href="https://twitter.com/JoshiOnChain" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-glow"
            >
              <Twitter className="h-6 w-6 text-primary" />
            </a>
            <a 
              href="mailto:joshionchain@gmail.com"
              className="p-3 rounded-full bg-card/50 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-glow"
            >
              <Mail className="h-6 w-6 text-primary" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-primary mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;