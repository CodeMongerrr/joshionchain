import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Shield, Database, Zap, Globe } from "lucide-react";

const projects = [
  {
    title: "Homomorphic ERC20 Token",
    description: "Revolutionary encrypted token implementation using FHE/TFHE with RSA ring signatures supporting 100+ participants while maintaining 99.99% verification accuracy.",
    tech: ["Rust", "Solidity", "RSA", "AES-128", "FHE/TFHE"],
    icon: Shield,
    github: "https://github.com/CodeMongerrr",
    demo: "#",
    highlights: ["2048-bit RSA keys", "100+ participants", "99.99% accuracy"]
  },
  {
    title: "Immutable Attestation Protocol",
    description: "High-performance Ethereum event log indexer processing 2.1M+ blocks with 50+ go-routines, achieving 1,800+ events/sec processing rate.",
    tech: ["Go", "BoltDB", "Ethereum", "IPFS", "Solidity"],
    icon: Database,
    github: "https://github.com/CodeMongerrr",
    demo: "#",
    highlights: ["2.1M+ blocks indexed", "1,800+ events/sec", "Real-time sync"]
  },
  {
    title: "zkSNARK Identity Framework",
    description: "Decentralized identity protocol using Soulbound NFTs with merkle proof validation, preventing certificate fraud for 5+ universities.",
    tech: ["Rust", "Bellman", "Solidity", "React.js", "IPFS"],
    icon: Zap,
    github: "https://github.com/CodeMongerrr",
    demo: "#",
    highlights: ["Soulbound NFTs", "Merkle proofs", "5+ universities"]
  },
  {
    title: "Multichain Domain Infrastructure",
    description: "Building multi-chain domain infrastructure where .btc, .eth, .sol become programmable on-chain assets with tokenized ownership and governance.",
    tech: ["React", "TypeScript", "Alchemy API", "Solidity", "Multi-chain"],
    icon: Globe,
    github: "https://github.com/CodeMongerrr",
    demo: "#",
    highlights: ["Multi-chain support", "Tokenized domains", "In Progress"],
    inProgress: true
  },
  {
    title: "Cross-chain AMM Prototype",
    description: "Automated market maker prototype enabling seamless cross-chain liquidity provision with advanced routing algorithms.",
    tech: ["Solidity", "Web3.js", "Chainlink", "Uniswap V3", "Go"],
    icon: ExternalLink,
    github: "https://github.com/CodeMongerrr",
    demo: "#",
    highlights: ["Cross-chain AMM", "Liquidity routing", "DeFi protocol"]
  },
  {
    title: "Multichain HD Wallet",
    description: "Enterprise-grade HD wallet with BIP39/BIP44 compliance, supporting 8 networks and processing 5000+ transactions with advanced security.",
    tech: ["JavaScript", "BIP39", "BIP44", "GraphQL", "Apollo"],
    icon: Shield,
    github: "https://github.com/CodeMongerrr",
    demo: "#",
    highlights: ["8 networks", "5000+ transactions", "BIP compliance"]
  }
];

const ProjectsSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="bg-gradient-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge blockchain and AI projects showcasing innovation in DeFi, cryptography, and decentralized systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="group bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-primary/20 border border-primary/30 group-hover:shadow-glow transition-all duration-300">
                    <project.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 h-auto hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 h-auto hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors duration-300">
                  {project.title}
                  {project.inProgress && (
                    <Badge variant="secondary" className="ml-2 bg-accent/20 text-accent border-accent/30">
                      In Progress
                    </Badge>
                  )}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground/80 mb-2">Key Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.highlights.map((highlight) => (
                        <Badge 
                          key={highlight} 
                          variant="outline" 
                          className="text-xs bg-surface border-primary/30 text-primary"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground/80 mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="text-xs bg-muted/50 text-foreground border-border"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a href="https://github.com/CodeMongerrr" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;