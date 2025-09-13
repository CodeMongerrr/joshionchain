import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate blockchain researcher and full-stack engineer building the decentralized future
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Placeholder */}
          <div className="order-2 lg:order-1">
            <Card className="p-8 bg-gradient-surface border-border/50 shadow-card">
              <div className="aspect-square rounded-2xl bg-gradient-primary/20 border border-primary/30 flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">AJ</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>IIT (ISM) Dhanbad, Jharkhand</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span>Research Intern @ Nethermind</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>London, UK (Remote)</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Bio Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                I'm a blockchain researcher and full-stack engineer currently pursuing an 
                <span className="text-primary font-semibold"> Integrated Master of Technology in Applied Geology </span>
                at IIT (ISM) Dhanbad, graduating in May 2026.
              </p>
              
              <p>
                As a <span className="text-primary font-semibold">Research Intern at Nethermind</span>, 
                I've architected peer-to-peer networking protocols for Juno nodes, developed Cairo verification engines, 
                and engineered high-performance backends for blockchain explorers.
              </p>

              <p>
                I'm passionate about the intersection of blockchain technology and AI, building everything from 
                homomorphic encryption tokens to zkSNARK proof frameworks. My work spans across 
                <span className="text-secondary font-semibold"> DeFi protocols</span>, 
                <span className="text-accent font-semibold"> cryptographic systems</span>, and 
                <span className="text-primary font-semibold"> decentralized infrastructure</span>.
              </p>

              <p>
                When I'm not coding, you'll find me speaking at conferences like 
                <span className="text-primary font-semibold"> ETHBangkok & DevCon 2024</span>, 
                winning hackathons at ETHGlobal, or leading blockchain education initiatives as 
                Research Lead at CyberLabs, IIT ISM.
              </p>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Key Achievements</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                  ETHBangkok Speaker 2024
                </Badge>
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                  5+ Hackathon Winner
                </Badge>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  Blockchain Research Lead
                </Badge>
                <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                  Nethermind Research Intern
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;