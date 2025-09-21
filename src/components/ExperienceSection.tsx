import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, MapPin, Trophy, Users, Presentation } from "lucide-react";

const experiences = [
  {
    company: "Nethermind",
    role: "Research Intern, Core Blockchain Engineering",
    location: "London, UK (Remote)",
    duration: "May 2024 – August 2024",
    description: "Led cutting-edge blockchain infrastructure development for Starknet ecosystem",
    achievements: [
      "Architected P2P networking protocols for Juno nodes with advanced gossip algorithms",
      "40% reduction in synchronization latency across 2,000+ Starknet nodes",
      "Developed Cairo verification engine with zkSTARK validation pipeline",
      "Processed 50K+ daily transactions with 99.97% accuracy",
      "Engineered high-performance Voyager explorer backend with 25% performance boost",
      "Supported 10M+ daily queries through optimized Redis caching"
    ],
    skills: ["Go", "Cairo", "zkSTARK", "P2P Networks", "Redis", "Blockchain Infrastructure"]
  },
  {
    company: "Tabibi Healthcare Solutions",
    role: "Founding Developer",
    location: "Dubai, UAE (Remote)",
    duration: "November 2023 – March 2024",
    description: "Founded and developed healthcare microservices platform for UAE market",
    achievements: [
      "Built 12 healthcare microservices with OAuth2.0 authentication",
      "Implemented AES-256 encryption for 1000+ UAE users",
      "Developed patient anonymization pipeline using differential privacy",
      "Achieved HIPAA compliance with 99.8% uptime",
      "Scaled platform to serve healthcare providers across UAE"
    ],
    skills: ["Microservices", "OAuth2.0", "AES-256", "HIPAA", "Healthcare Tech", "Differential Privacy"]
  },
  {
    company: "SimplyFi InfoTech Solutions",
    role: "Blockchain Developer Intern",
    location: "Mumbai, India (Remote)",
    duration: "October 2023 – December 2023",
    description: "Developed enterprise blockchain solutions and wallet infrastructure",
    achievements: [
      "Engineered multichain HD wallet with BIP39/BIP44 compliance",
      "Supported 8 blockchain networks and 5000+ transactions",
      "Implemented GraphQL federation reducing API response time by 60%",
      "Built custom resolvers using Apollo Server",
      "Delivered production-ready wallet infrastructure"
    ],
    skills: ["Blockchain", "BIP39/BIP44", "GraphQL", "Apollo Server", "Multichain", "HD Wallets"]
  }
];

const achievements = [
  {
    title: "ETHBangkok & DevCon 2024 Participant",
    description: "Presented 'Self Learning Agentic KOLs' to 500+ Web3 professionals",
    icon: Presentation,
    highlight: "500+ attendees"
  },
  {
    title: "Blockchain Research Lead @CyberLabs",
    description: "Guided 30+ students through blockchain and backend development",
    icon: Users,
    highlight: "30+ students mentored"
  },
  {
    title: "5+ Hackathon Winner",
    description: "ETHBangkok, ETHIndia, ETHOnline, TechFest, SIH victories",
    icon: Trophy,
    highlight: "5+ victories"
  },
  {
    title: "Technical Coordinator @LightsCameraISM",
    description: "Managed technical operations for 50+ member videography club",
    icon: Building,
    highlight: "50+ members"
  }
];

const ExperienceSection = () => {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Professional <span className="bg-gradient-secondary bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building the future of blockchain technology across leading organizations and hackathons
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 mb-20">
          {experiences.map((exp, index) => (
            <Card 
              key={exp.company}
              className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display text-primary">
                      {exp.company}
                    </h3>
                    <p className="text-lg font-semibold text-foreground">
                      {exp.role}
                    </p>
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-lg">
                  {exp.description}
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-foreground/90">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-foreground mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge 
                        key={skill}
                        variant="secondary" 
                        className="bg-primary/10 text-primary border-primary/30"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leadership & Achievements */}
        <div>
          <h3 className="text-3xl font-display font-bold text-center mb-12">
            Leadership & <span className="bg-gradient-primary bg-clip-text text-transparent">Achievements</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.title}
                className="group bg-gradient-surface border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20 border border-primary/30 group-hover:shadow-glow transition-all duration-300">
                      <achievement.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h4 className="font-bold text-lg font-display group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {achievement.description}
                      </p>
                      <Badge 
                        variant="outline" 
                        className="bg-surface border-accent/30 text-accent"
                      >
                        {achievement.highlight}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;