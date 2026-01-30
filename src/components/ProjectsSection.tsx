import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Shield, Database, Zap, Globe } from "lucide-react";
import ethIndexerImg from "@/assets/eth-log-indexer.png";
import rsaRingImg from "@/assets/rsa-ring-signature.png";
import gasCheckerImg from "@/assets/gas-checker.png";
import fheImg from "@/assets/certicryp.png";
import certiImg from "@/assets/certicryped.png";
import snapImg from "@/assets/snaptrade.png";
const projects = [
  {
    title: "Ethereum Event Log Indexer",
    description: "Go-based, high-throughput Ethereum log indexer processing millions of blocks; uses goroutines and BoltDB storage to build reliable blockchain analytics backend.",
    tech: ["GoLang", "Ethereum", "BoltDB", "go-ethereum"],
    icon: Database,
    github: "https://github.com/CodeMongerrr/eth-log-indexer",
    demo: "#",
    image: ethIndexerImg,
    highlights: ["Millions of blocks indexed", "Worker goroutines", "Efficient log DB storage"]
  },
  {
    title: "RSA Ring Signature Library",
    description: "Rust library implementing RSA ring signatures using 2048-bit keys, with AES-128 hybrid encryption helpers; key routines for sign-verify workflows built for privacy use-cases on chain or off chain.",
    tech: ["Rust", "RSA", "AES-128"],
    icon: Shield,
    github: "https://github.com/CodeMongerrr/Ring_Signature_Implementation",
    demo: "#",
    image: rsaRingImg,
    highlights: ["Ring signature primitives", "Secure sign & verify", "Hybrid encryption support"]
  },
  {
    title: "Gas Checker",
    description: "Real-time Ethereum gas price dashboard built with React + TypeScript; visualizes gas bands, sends alerts; frontend architecture supports integration with Web3 providers in future versions.",
    tech: ["React", "JS / TS", "Alchemy API"],
    icon: ExternalLink,
    github: "https://github.com/CodeMongerrr/Gas-Checker",
    demo: "#",
    image: gasCheckerImg,
    highlights: ["Live gas visualization", "Alert system", "Prepared for Web3 integration"]
  },
  {
    title: "Homomorphic ERC20 Prototype",
    description: "ERC20 token built on Fully Homomorphic Encryption (fhEVM) with Hardhat + TypeScript and dockerized fhEVM nodes; focus on encrypted smart contracts and developer tooling.",
    tech: ["Solidity", "TypeScript", "Hardhat", "fhEVM", "Zama"],
    icon: Shield,
    github: "https://github.com/CodeMongerrr/CRC20-Token-Standards",
    demo: "#",
    image: fheImg,
    highlights: ["Encrypted ERC20 token", "Mock & real test modes", "fhEVM docker-compose setup"]
  },
  {
    title: "CertiCryp – NFT Certificates",
    description: "DApp for universities/institutions to issue and verify certificates as ERC-721 NFTs; smart contracts + frontend components combine to deliver tamper-proof credential issuance.",
    tech: ["Solidity", "React", "ERC-721"],
    icon: Globe,
    github: "https://github.com/CodeMongerrr/Certicryped",
    demo: "#",
    image: certiImg,
    highlights: ["NFT certificates", "Issued on Ethereum", "Verification UI + contracts"]
  },
  {
    title: "SnapTrade Extension",
    description: "Browser extension integrating SnapTrade API to surface brokerage balances, positions, and transaction data in a unified dashboard; supports secure frontend logic and user-centered UI.",
    tech: ["JS/TS", "Hyperliquid", "Chrome Extension"],
    icon: ExternalLink,
    github: "https://github.com/CodeMongerrr/SnapTrade",
    demo: "#",
    image: snapImg,
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
              className="group bg-card/50 border-border/50 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              {/* 🔹 Image Banner */}
              <div className="w-full h-42 overflow-hidden border-b border-border/50 bg-muted/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <CardHeader className="pb-2 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold font-display group-hover:text-primary transition-colors duration-300 leading-snug">
                    {project.title}
                  </h3>

                  <div className="flex gap-2 shrink-0">
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
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-1">
                {/* 🔹 Description */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* 🔹 Highlights */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                    Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                      <Badge
                        key={highlight}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border border-primary/20"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 🔹 Tech Stack */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wide">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs bg-transparent text-muted-foreground border-border"
                      >
                        {tech}
                      </Badge>
                    ))}
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