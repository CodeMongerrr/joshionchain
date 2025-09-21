import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Shield, Database, Zap, Globe } from "lucide-react";

const projects = [
  {
    title: "Ethereum Event Log Indexer",
    description: "Go-based, high-throughput Ethereum log indexer processing millions of blocks; uses goroutines and BoltDB storage to build reliable blockchain analytics backend.",
    tech: ["Go", "Ethereum", "BoltDB", "go-ethereum"],
    icon: Database,
    github: "https://github.com/CodeMongerrr/eth-log-indexer",
    demo: "#",
    highlights: ["Millions of blocks indexed", "Worker goroutines", "Efficient log DB storage"]
  },
  {
    title: "RSA Ring Signature Library",
    description: "Rust library implementing RSA ring signatures using 2048-bit keys, with AES-128 hybrid encryption helpers; key routines for sign-verify workflows built for privacy use-cases on chain or off chain.",
    tech: ["Rust", "RSA", "AES-128"],
    icon: Shield,
    github: "https://github.com/CodeMongerrr/Ring_Signature_Implementation",
    demo: "#",
    highlights: ["Ring signature primitives", "Secure sign & verify", "Hybrid encryption support"]
  },
  {
    title: "Gas Checker",
    description: "Real-time Ethereum gas price dashboard built with React + TypeScript; visualizes gas bands, sends alerts; frontend architecture supports integration with Web3 providers in future versions.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    icon: ExternalLink,
    github: "https://github.com/CodeMongerrr/Gas-Checker",
    demo: "#",
    highlights: ["Live gas visualization", "Alert system", "Prepared for Web3 integration"]
  },
  {
    title: "Homomorphic ERC20 Prototype",
    description: "ERC20 token built on Fully Homomorphic Encryption (fhEVM) with Hardhat + TypeScript and dockerized fhEVM nodes; focus on encrypted smart contracts and developer tooling.",
    tech: ["Solidity", "TypeScript", "Hardhat", "fhEVM", "Docker"],
    icon: Shield,
    github: "https://github.com/CodeMongerrr/Inco_Safe_FHE",
    demo: "#",
    highlights: ["Encrypted ERC20 token", "Mock & real test modes", "fhEVM docker-compose setup"]
  },
  {
    title: "CertiCryp – NFT Certificates",
    description: "DApp for universities/institutions to issue and verify certificates as ERC-721 NFTs; smart contracts + frontend components combine to deliver tamper-proof credential issuance.",
    tech: ["Solidity", "React", "ERC-721"],
    icon: Globe,
    github: "https://github.com/CodeMongerrr/Certicryp",
    demo: "#",
    highlights: ["NFT certificates", "Issued on Ethereum", "Verification UI + contracts"]
  },
  {
    title: "SnapTrade Extension",
    description: "Browser extension integrating SnapTrade API to surface brokerage balances, positions, and transaction data in a unified dashboard; supports secure frontend logic and user-centered UI.",
    tech: ["JavaScript", "SnapTrade API", "Chrome Extension"],
    icon: ExternalLink,
    github: "https://github.com/CodeMongerrr/SnapTrade",
    demo: "#",
    highlights: ["Real-time portfolio view", "Secure client-side data display", "Brokerage API integration"]
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