"use client";

import { Shield, Lock, CheckCircle2, Leaf, Sparkles, ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* 装饰元素 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 浮动叶子 */}
        <div className="absolute top-20 left-[10%] animate-float delay-100">
          <Leaf className="h-8 w-8 text-green-500/30" />
        </div>
        <div className="absolute top-40 right-[15%] animate-float delay-300">
          <Leaf className="h-6 w-6 text-emerald-500/25" />
        </div>
        <div className="absolute bottom-32 left-[20%] animate-float delay-500">
          <Leaf className="h-10 w-10 text-lime-500/20" />
        </div>
        <div className="absolute top-1/2 right-[8%] animate-float-slow">
          <Sparkles className="h-6 w-6 text-yellow-500/30" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* 徽章 */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-green-500/20 animate-fadeIn">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-foreground">Blockchain-Verified Environmental Impact</span>
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </div>
          
          {/* 主标题 */}
          <div className="space-y-4 animate-fadeInUp delay-100">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Prove Impact</span>
              <br />
              <span className="text-foreground">Without </span>
              <span className="text-gradient-forest relative">
                Exposure
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#22c55e"/>
                      <stop offset="1" stopColor="#84cc16"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
          </div>
          
          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fadeInUp delay-200">
            Record verified eco-data in <span className="text-green-600 font-semibold">encrypted form</span>. 
            Decrypt only when needed for audit verification.
          </p>
          
          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fadeInUp delay-300">
            <button 
              onClick={() => scrollToSection('record')}
              className="group btn-forest flex items-center gap-2 text-lg"
            >
              <Leaf className="h-5 w-5" />
              Start Recording Data
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="btn-outline-forest flex items-center gap-2 text-lg"
            >
              <Zap className="h-5 w-5" />
              Learn More
            </button>
          </div>
          
          {/* 特性标签 */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-10 animate-fadeInUp delay-400">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-forest">
              <Lock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-forest">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Audit-Ready</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-forest">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Blockchain-Verified</span>
            </div>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto animate-fadeInUp delay-500">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-forest">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Privacy Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-forest">FHE</div>
              <div className="text-sm text-muted-foreground mt-1">Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-forest">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">On-Chain</div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
