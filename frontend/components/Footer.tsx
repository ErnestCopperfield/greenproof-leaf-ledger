"use client";

import { Leaf, Github, Twitter, Globe, Heart, Shield, Lock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-green-500/10">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient-forest">GreenProof</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              Privacy-preserving environmental impact tracking powered by Fully Homomorphic Encryption. 
              Prove your green impact without exposing sensitive data.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-lg hover:bg-green-500/10 transition-colors text-muted-foreground hover:text-green-500">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-green-500/10 transition-colors text-muted-foreground hover:text-green-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-green-500/10 transition-colors text-muted-foreground hover:text-green-500">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-green-500 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#record" className="text-sm text-muted-foreground hover:text-green-500 transition-colors">
                  Record Data
                </a>
              </li>
              <li>
                <a href="#verify" className="text-sm text-muted-foreground hover:text-green-500 transition-colors">
                  Verify Records
                </a>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Technology</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                <span>FHEVM by Zama</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 text-green-500" />
                <span>End-to-End Encryption</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="h-4 w-4 text-green-500" />
                <span>Blockchain Verified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-green-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 GreenProof Leaf Ledger. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> for a sustainable future 🌍
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
