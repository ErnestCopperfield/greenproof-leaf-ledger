"use client";

import { ShieldCheck, Clock, Lock, Unlock, Loader2, RefreshCw, Eye, EyeOff, Sparkles, CheckCircle2, Database, Cpu } from "lucide-react";
import { useFhevm } from "@/fhevm/useFhevm";
import { useInMemoryStorage } from "@/hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "@/hooks/metamask/useMetaMaskEthersSigner";
import { useFHECounter } from "@/hooks/useFHECounter";
import { useState } from "react";

const VerifyData = () => {
  const [showHandle, setShowHandle] = useState(false);
  
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const {
    provider,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
    initialMockChains,
  } = useMetaMaskEthersSigner();

  const { instance: fhevmInstance, status: fhevmStatus } = useFhevm({
    provider,
    chainId,
    initialMockChains,
    enabled: true,
  });

  const fheCounter = useFHECounter({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage,
    eip1193Provider: provider,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "text-green-500";
      case "loading":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <section id="verify" className="py-24 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-r from-green-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-emerald-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* 标题区域 */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-forest mb-4">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Secure Verification</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">Verification </span>
            <span className="text-gradient-forest">Dashboard</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Manage and verify your encrypted environmental impact records
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* 状态卡片 */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Chain ID */}
            <div className="card-eco group hover-lift">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Database className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chain ID</p>
                  <p className="text-3xl font-bold text-gradient-forest">{chainId ?? "N/A"}</p>
                </div>
              </div>
            </div>

            {/* FHEVM Status */}
            <div className="card-eco group hover-lift">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Cpu className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">FHEVM Status</p>
                  <p className={`text-2xl font-bold capitalize ${getStatusColor(fhevmStatus)}`}>
                    {fhevmStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Contract */}
            <div className="card-eco group hover-lift">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Lock className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contract</p>
                  <p className="text-lg font-bold text-foreground font-mono">
                    {fheCounter.contractAddress ? `${fheCounter.contractAddress.slice(0, 10)}...` : "Not deployed"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 加密计数器卡片 */}
          <div className="card-eco overflow-hidden">
            {/* 卡片头部 */}
            <div className="p-6 border-b border-green-500/10 flex items-center justify-between bg-gradient-to-r from-green-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Encrypted Counter</h3>
                  <p className="text-sm text-muted-foreground">FHE-protected environmental data</p>
                </div>
              </div>
              <button
                onClick={fheCounter.refreshCountHandle}
                disabled={!fheCounter.canGetCount}
                className="px-4 py-2 text-sm rounded-xl border-2 border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 font-medium"
              >
                <RefreshCw className={`h-4 w-4 ${fheCounter.isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Handle 显示 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Encrypted Handle</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowHandle(!showHandle)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      {showHandle ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <span className="badge-gold">
                      <Lock className="h-3 w-3" />
                      FHE Encrypted
                    </span>
                  </div>
                </div>
                {fheCounter.isRefreshing ? (
                  <div className="flex items-center gap-3 py-2">
                    <Loader2 className="h-5 w-5 animate-spin text-green-500" />
                    <span className="text-sm text-muted-foreground">Loading encrypted data...</span>
                  </div>
                ) : (
                  <p className="font-mono text-sm text-foreground break-all bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-600">
                    {showHandle 
                      ? (fheCounter.handle ?? "No data yet - record some environmental data first")
                      : (fheCounter.handle ? "••••••••••••••••••••••••••••••••" : "No data yet")
                    }
                  </p>
                )}
              </div>

              {/* 解密值显示 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">Decrypted Value</span>
                  {fheCounter.isDecrypted && (
                    <span className="badge-eco">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-4">
                  <p className="text-6xl font-bold text-gradient-forest">
                    {fheCounter.isDecrypted ? String(fheCounter.clear) : "???"}
                  </p>
                  {fheCounter.isDecrypted && (
                    <div className="pb-2">
                      <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                    </div>
                  )}
                </div>
                {fheCounter.isDecrypted && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Total environmental impact units recorded
                  </p>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <button
                  onClick={fheCounter.decryptCountHandle}
                  disabled={!fheCounter.canDecrypt}
                  className="flex-1 py-4 rounded-2xl font-semibold text-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-eco hover:shadow-glow"
                >
                  {fheCounter.isDecrypting ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Decrypting...
                    </>
                  ) : fheCounter.isDecrypted ? (
                    <>
                      <ShieldCheck className="h-6 w-6" />
                      Decrypted: {String(fheCounter.clear)}
                    </>
                  ) : (
                    <>
                      <Unlock className="h-6 w-6" />
                      Decrypt Counter
                    </>
                  )}
                </button>
              </div>

              {/* 状态消息 */}
              {fheCounter.message && (
                <div className="p-4 rounded-xl glass-forest flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground font-mono">
                    {fheCounter.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 帮助提示 */}
          <div className="card-eco p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">How Verification Works</h4>
              <p className="text-sm text-muted-foreground">
                Your environmental data is stored on-chain in encrypted form using Fully Homomorphic Encryption (FHE).
                The encrypted handle represents your data in a secure format. When you click &quot;Decrypt Counter&quot;,
                your wallet signs a request to reveal the actual value, ensuring only authorized users can access the data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyData;
