"use client";

import { ShieldCheck, Clock, Lock, Unlock, Loader2, RefreshCw } from "lucide-react";
import { useFhevm } from "@/fhevm/useFhevm";
import { useInMemoryStorage } from "@/hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "@/hooks/metamask/useMetaMaskEthersSigner";
import { useFHECounter } from "@/hooks/useFHECounter";

const VerifyData = () => {
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

  return (
    <section id="verify" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Verification Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Manage and verify your encrypted environmental impact records
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 shadow-card border border-border/50 bg-card rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-forest" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chain ID</p>
                  <p className="text-2xl font-bold text-foreground">{chainId ?? "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="p-6 shadow-card border border-border/50 bg-card rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">FHEVM Status</p>
                  <p className="text-2xl font-bold text-foreground">{fhevmStatus}</p>
                </div>
              </div>
            </div>

            <div className="p-6 shadow-card border border-border/50 bg-card rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-earth/10 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-earth" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contract</p>
                  <p className="text-sm font-bold text-foreground font-mono">
                    {fheCounter.contractAddress ? `${fheCounter.contractAddress.slice(0, 8)}...` : "Not deployed"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Encrypted Counter Card */}
          <div className="shadow-card border border-border/50 bg-card rounded-lg">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Encrypted Counter</h3>
              <button
                onClick={fheCounter.refreshCountHandle}
                disabled={!fheCounter.canGetCount}
                className="px-3 py-1.5 text-sm rounded-lg border border-forest/30 hover:border-forest hover:bg-forest/5 transition-smooth flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${fheCounter.isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Handle Display */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Encrypted Handle</span>
                  <span className="px-2 py-1 text-xs rounded-full border border-gold/20 text-gold flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    FHE Encrypted
                  </span>
                </div>
                {fheCounter.isRefreshing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Loading encrypted data...</span>
                  </div>
                ) : (
                  <p className="font-mono text-sm text-foreground break-all">
                    {fheCounter.handle ?? "No data yet"}
                  </p>
                )}
              </div>

              {/* Decrypted Value */}
              <div className="p-4 rounded-lg bg-forest/5 border border-forest/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Decrypted Value</span>
                  {fheCounter.isDecrypted && (
                    <span className="px-2 py-1 text-xs rounded-full bg-forest/10 text-forest border border-forest/20">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-4xl font-bold text-forest">
                  {fheCounter.isDecrypted ? String(fheCounter.clear) : "???"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={fheCounter.decryptCountHandle}
                  disabled={!fheCounter.canDecrypt}
                  className="flex-1 py-3 rounded-lg bg-forest hover:bg-forest-light text-primary-foreground transition-smooth shadow-eco disabled:opacity-50 font-medium flex items-center justify-center gap-2"
                >
                  {fheCounter.isDecrypting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Decrypting...
                    </>
                  ) : fheCounter.isDecrypted ? (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      Decrypted: {String(fheCounter.clear)}
                    </>
                  ) : (
                    <>
                      <Unlock className="h-5 w-5" />
                      Decrypt Counter
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
              {fheCounter.message && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border/30">
                  <p className="text-sm text-muted-foreground font-mono">
                    {fheCounter.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyData;
