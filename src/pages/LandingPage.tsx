import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Linkedin, 
  BarChart3,
  Search
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Pricing from "@/components/Pricing";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/04333007-6586-4328-9846-6ef246276133/mesh-gradient-bg-5365a84a-1776353564988.webp" 
              alt="Background Gradient" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4 py-1 px-3 border-primary/20 bg-primary/5 text-primary">
                ATS Optimization v2.0 is Live
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
                Optimize Your CV for <span className="text-primary italic">Any Job</span> in Seconds
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Stop being ghosted by recruiters. Use professional-grade AI to tailor your experience to specific job listings and beat the ATS filters.
              </p>
              <div className="flex flex-col sm:row items-center justify-center gap-4">
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="h-14 px-8 text-md gap-2 rounded-full shadow-lg shadow-primary/20">
                    Get Started Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-14 px-8 text-md rounded-full bg-white/50 backdrop-blur-sm">
                  View Demo
                </Button>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-6 grayscale opacity-60 text-sm font-medium">
                <div className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Public prototype</div>
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Demo data only</div>
              </div>
            </motion.div>

            {/* Hero Image / Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 relative max-w-5xl mx-auto"
            >
              <div className="relative rounded-2xl border border-border/50 shadow-2xl overflow-hidden bg-white">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/04333007-6586-4328-9846-6ef246276133/hero-dashboard-3f411556-1776353564268.webp" 
                  alt="CVForge AI Dashboard" 
                  className="w-full aspect-video object-cover"
                />
              </div>
              
              {/* Floating Element 1 */}
              <div className="absolute -left-4 md:-left-12 top-1/4 bg-white p-4 rounded-xl shadow-xl border border-border/40 hidden sm:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">ATS Score</div>
                    <div className="text-xl font-bold">92% Match</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Precision-Engineered Career Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to landing your dream role in a competitive market.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Search className="w-6 h-6" />,
                  title: "Job Listing Parser",
                  description: "Just paste a URL. Our AI extracts keywords, skills, and the specific 'vibe' the hiring manager is looking for."
                },
                {
                  icon: <FileText className="w-6 h-6" />,
                  title: "Smart CV Rewriting",
                  description: "Rewrite your bullet points to quantify achievements and align perfectly with job requirements."
                },
                {
                  icon: <Linkedin className="w-6 h-6" />,
                  title: "LinkedIn Synergy",
                  description: "Synchronize your professional brand across your CV and social profile with our LinkedIn optimizer."
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: "ATS Scoring",
                  description: "Get a real-time score of how well your CV will perform against industry-standard ATS filters."
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Instant Export",
                  description: "Download beautiful, ATS-friendly PDFs in seconds. No more formatting nightmares."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  title: "Version History",
                  description: "Keep track of every version for every application. Never lose a successful template."
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/60 hover:border-primary/20 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <Pricing />

      </main>

      <Footer />
    </div>
  );
}