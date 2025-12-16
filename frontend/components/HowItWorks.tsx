"use client";

import { Database, Lock, Key, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Record Eco-Data",
    description: "Enter verified environmental metrics like CO₂ reduction, energy savings, or waste reduction directly into the platform.",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Lock,
    title: "Automatic Encryption",
    description: "Data is immediately encrypted using FHE technology, ensuring confidentiality while maintaining verifiability.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Key,
    title: "Blockchain Storage",
    description: "Encrypted data is stored on the blockchain with your wallet signature, creating an immutable and timestamped record.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: CheckCircle,
    title: "Audit Verification",
    description: "When needed, authorized auditors can decrypt and verify your environmental impact data using secure verification keys.",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* 标题区域 */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-forest mb-4">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">How It </span>
            <span className="text-gradient-forest">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A simple four-step process to prove your environmental impact while maintaining data security
          </p>
        </div>
        
        {/* 步骤卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* 连接线 - 仅在大屏幕显示 */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30" />
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-eco p-6 space-y-5 h-full relative overflow-hidden hover-lift">
                {/* 背景装饰 */}
                <div className={`absolute top-0 right-0 w-40 h-40 ${step.bgColor} rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-all duration-500`} />
                
                {/* 步骤编号 */}
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* 标题 */}
                <h3 className="text-xl font-bold text-foreground relative">
                  {step.title}
                </h3>
                
                {/* 描述 */}
                <p className="text-muted-foreground text-sm leading-relaxed relative">
                  {step.description}
                </p>

                {/* 箭头指示器 - 仅在非最后一个卡片显示 */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-24 w-6 h-6 rounded-full bg-white shadow-md items-center justify-center z-10">
                    <ArrowRight className="h-3 w-3 text-green-500" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 底部 CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl glass-forest">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Ready to start?</p>
              <p className="text-sm text-muted-foreground">Your data is protected by military-grade FHE encryption</p>
            </div>
            <a 
              href="#record"
              className="btn-forest flex items-center gap-2 ml-4"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
