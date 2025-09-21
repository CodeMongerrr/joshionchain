import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Shield, Brain, Globe, Zap } from "lucide-react";

const skillCategories = [
  {
    category: "Blockchain & Web3",
    icon: Shield,
    color: "primary",
    skills: [
      { name: "Ethereum", level: 95 },
      { name: "Solidity", level: 90 },
      { name: "Starknet", level: 85 },
      { name: "Polygon", level: 80 },
      { name: "Web3.js/Ethers.js", level: 90 },
      { name: "Hardhat", level: 85 },
      { name: "OpenZeppelin", level: 85 },
      { name: "IPFS", level: 75 }
    ]
  },
  {
    category: "Cryptography & ZK",
    icon: Zap,
    color: "secondary",
    skills: [
      { name: "FHE/TFHE", level: 85 },
      { name: "zkSNARK", level: 80 },
      { name: "Ring Signatures", level: 75 },
      { name: "Circom", level: 70 },
      { name: "RSA Encryption", level: 85 },
      { name: "AES Cryptography", level: 80 }
    ]
  },
  {
    category: "Programming Languages",
    icon: Code,
    color: "accent",
    skills: [
      { name: "GoLang", level: 80 },
      { name: "Rust", level: 60 },
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "C/C++", level: 75 },
      { name: "SQL", level: 80 }
    ]
  },
  {
    category: "Web Development",
    icon: Globe,
    color: "primary",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "Node.js", level: 90 },
      { name: "GraphQL", level: 80 },
      { name: "Docker", level: 75 },
      { name: "Git", level: 90 }
    ]
  },
  {
    category: "Database & Backend",
    icon: Database,
    color: "secondary",
    skills: [
      { name: "Redis", level: 80 },
      { name: "BoltDB", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "Microservices", level: 85 },
      { name: "OAuth2.0", level: 80 },
    ]
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    color: "accent",
    skills: [
      { name: "AI × Crypto", level: 80 },
      { name: "Machine Learning", level: 60 },
      { name: "Agentic Systems", level: 75 }
    ]
  }
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return {
        border: "border-primary/30",
        bg: "bg-primary/20",
        text: "text-primary",
        glow: "group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
        progress: "bg-primary"
      };
    case "secondary":
      return {
        border: "border-secondary/30",
        bg: "bg-secondary/20",
        text: "text-secondary",
        glow: "group-hover:shadow-[0_0_20px_hsl(var(--secondary)/0.3)]",
        progress: "bg-secondary"
      };
    case "accent":
      return {
        border: "border-accent/30",
        bg: "bg-accent/20",
        text: "text-accent",
        glow: "group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)]",
        progress: "bg-accent"
      };
    default:
      return {
        border: "border-primary/30",
        bg: "bg-primary/20",
        text: "text-primary",
        glow: "group-hover:shadow-glow",
        progress: "bg-primary"
      };
  }
};

const SkillsSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertise across blockchain infrastructure, cryptography, and full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => {
            const colors = getColorClasses(category.color);
            
            return (
              <Card
                key={category.category}
                className={`group bg-card/50 border-border/50 hover:${colors.border} transition-all duration-500 ${colors.glow} backdrop-blur-sm`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border} group-hover:shadow-glow transition-all duration-300`}>
                      <category.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className={`text-xl font-bold font-display ${colors.text}`}>
                      {category.category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-foreground font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors.progress} rounded-full transition-all duration-1000 ease-out`}
                            style={{
                              width: `${skill.level}%`,
                              animation: `skillProgress 2s ease-out ${Math.random() * 0.5}s`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-display font-bold mb-8">
            Additional <span className="bg-gradient-secondary bg-clip-text text-transparent">Technologies</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Chainlink", "Uniswap", "Aave", "EIPs", "Base", "Filecoin", "BIP39/BIP44",
              "Apollo Server", "OAuth2.0", "AES-256", "HIPAA", "Differential Privacy",
              "Cairo", "zkSTARK", "P2P Networks", "Gossip Protocols", "Merkle Trees"
            ].map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-full bg-surface border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <span className="text-sm font-medium text-foreground/90">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;