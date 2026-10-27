import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Upload, Link as LinkIcon, Sparkles, Check, ArrowRight, Loader2, FileText, Download, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

type Step = "upload" | "analyze" | "optimize" | "result";

export default function JobTargeting() {
  const [step, setStep] = useState<Step>("upload");
  const [progress, setProgress] = useState(0);
  const [jobUrl, setJobUrl] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const startAnalysis = () => {
    if (!cvFile) return toast.error("Please upload a CV first");
    setStep("analyze");
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep("optimize");
        startOptimization();
      }
    }, 100);
  };

  const startOptimization = () => {
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep("result");
      }
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">AI CV Optimization Flow</h2>
        <p className="text-muted-foreground">Precision-tailor your CV for your next big role.</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        {[
          { id: "upload", label: "Upload" },
          { id: "analyze", label: "Analyze" },
          { id: "optimize", label: "Optimize" },
          { id: "result", label: "Success" }
        ].map((s, i) => (
          <div key={s.id} className="flex items-center gap-4 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
              step === s.id ? "border-primary bg-primary text-white" : 
              i < ["upload", "analyze", "optimize", "result"].indexOf(step) ? "border-green-500 bg-green-500 text-white" : 
              "border-slate-200 text-slate-400"
            }`}>
              {i < ["upload", "analyze", "optimize", "result"].indexOf(step) ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            {i < 3 && <div className={`flex-1 h-0.5 ${i < ["upload", "analyze", "optimize", "result"].indexOf(step) ? "bg-green-500" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      {step === "upload" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>1. Base CV</CardTitle>
              <CardDescription>Upload your most recent CV (PDF/DOCX)</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div 
                className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-colors ${
                  cvFile ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files[0]) setCvFile(e.dataTransfer.files[0]);
                }}
              >
                {cvFile ? (
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="font-medium">{cvFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <Button variant="ghost" size="sm" className="mt-4" onClick={() => setCvFile(null)}>Remove</Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="font-medium">Drop your CV here</p>
                    <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      id="cv-upload" 
                      accept=".pdf,.docx" 
                      onChange={(e) => e.target.files && setCvFile(e.target.files[0])}
                    />
                    <Button variant="secondary" size="sm" className="mt-4" onClick={() => document.getElementById('cv-upload')?.click()}>
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Target Job</CardTitle>
              <CardDescription>Where are you applying?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-url">Job Listing URL</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="job-url" 
                    placeholder="https://linkedin.com/jobs/..." 
                    className="pl-9"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-muted-foreground">or</span></div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jd">Paste Job Description</Label>
                <Textarea id="jd" placeholder="Copy-paste the job description text here..." className="min-h-[150px]" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2" onClick={startAnalysis}>
                Analyze & Optimize <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {(step === "analyze" || step === "optimize") && (
        <Card className="p-12 text-center animate-in zoom-in-95 duration-500">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 animate-pulse">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {step === "analyze" ? "Analyzing Job Requirements..." : "Synthesizing Optimized CV..."}
            </h3>
            <p className="text-muted-foreground">Our AI is extracting key skills and mapping your experience.</p>
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>{step === "analyze" ? "PARSING_JD" : "REWRITING_BULLETS"}</span>
              <span>{progress}%</span>
            </div>
          </div>
        </Card>
      )}

      {step === "result" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Optimization Result</CardTitle>
                  <CardDescription>Your CV is now tailored for this role</CardDescription>
                </div>
                <Button className="gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border bg-slate-50 p-8 h-[500px] overflow-auto">
                   <div className="max-w-2xl mx-auto bg-white shadow-sm p-10 min-h-full border border-border/40">
                      <h1 className="text-2xl font-bold text-center mb-1">ALEX JOHNSON</h1>
                      <p className="text-xs text-center text-muted-foreground mb-6 uppercase tracking-widest border-b pb-4">Senior Frontend Architect</p>
                      
                      <div className="space-y-6">
                        <section>
                          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 border-b-2 border-primary/20">Summary</h2>
                          <p className="text-xs leading-relaxed text-slate-700">
                             <span className="bg-yellow-100 px-1">Dedicated Frontend Architect with specialized expertise in React 19</span> and large-scale SaaS systems. Proven track record of delivering performance-optimized UI/UX solutions that align with business objectives.
                          </p>
                        </section>
                        
                        <section>
                          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 border-b-2 border-primary/20">Experience</h2>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between font-bold text-xs">
                                <span>Lead Software Engineer</span>
                                <span>2020 — Present</span>
                              </div>
                              <p className="text-xs italic text-muted-foreground mb-1">Global Tech Solutions</p>
                              <ul className="text-xs space-y-1 list-disc pl-4 text-slate-700">
                                <li>Led the migration of 4 core products to <span className="bg-yellow-100 px-1">React 19, improving render performance by 35%</span>.</li>
                                <li>Architected a shared component library used by 50+ developers, reducing time-to-market for new features by 40%.</li>
                                <li>Implemented advanced <span className="bg-yellow-100 px-1">ATS-friendly semantic HTML patterns</span> across all enterprise portals.</li>
                              </ul>
                            </div>
                          </div>
                        </section>
                      </div>
                   </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-primary text-primary-foreground border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wider font-bold">New ATS Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-black">94%</div>
                    <div className="flex flex-col">
                      <span className="text-xs text-primary-foreground/70 font-medium">Was 68%</span>
                      <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full mt-1">+26% Increase</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Key Improvements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Added missing 'System Design' keyword",
                    "Quantified performance metrics in 3 bullets",
                    "Tone adjusted to 'Leadership'",
                    "Normalized formatting for ATS parsers"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-slate-600 leading-tight">{item}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                   <Button variant="outline" className="w-full gap-2" onClick={() => setStep("upload")}>
                     <ChevronLeft className="w-4 h-4" /> Optimize Another
                   </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}