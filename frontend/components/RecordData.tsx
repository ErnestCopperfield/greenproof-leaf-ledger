"use client";

import { Leaf, Cloud, Droplet, Zap, Lock, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { useFhevm } from "@/fhevm/useFhevm";
import { useInMemoryStorage } from "@/hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "@/hooks/metamask/useMetaMaskEthersSigner";
import { useFHECounter } from "@/hooks/useFHECounter";
import type { EnvironmentalDataType, ValidationResult, FormData, ComponentState } from "@/types";

const dataTypes: EnvironmentalDataType[] = [
  { icon: Cloud, label: "CO₂ Reduction", unit: "tons", color: "text-forest" },
  { icon: Zap, label: "Energy Saved", unit: "kWh", color: "text-gold" },
  { icon: Droplet, label: "Water Conserved", unit: "liters", color: "text-blue-500" },
  { icon: Leaf, label: "Waste Reduced", unit: "kg", color: "text-earth" },
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const RecordData = () => {
  const [selectedType, setSelectedType] = useState(0);
  const [value, setValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [selectedDay, setSelectedDay] = useState(7);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getDaysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  }, []);

  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const {
    provider,
    chainId,
    isConnected,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
    initialMockChains,
  } = useMetaMaskEthersSigner();

  const { instance: fhevmInstance } = useFhevm({
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

  const sanitizeInput = useCallback((input: string): string => {
    return input.trim().replace(/[<>\"'&]/g, '');
  }, []);

  const validateNumericInput = useCallback((input: string): ValidationResult => {
    const sanitized = sanitizeInput(input);
    
    if (!sanitized) {
      return { isValid: false, error: "Please enter a value" };
    }

    const numValue = parseFloat(sanitized);
    
    if (isNaN(numValue)) {
      return { isValid: false, error: "Please enter a valid number" };
    }

    if (numValue <= 0) {
      return { isValid: false, error: "Value must be greater than zero" };
    }

    if (numValue > 1000000) {
      return { isValid: false, error: "Value too large. Maximum allowed is 1,000,000" };
    }

    if (numValue !== Math.floor(numValue)) {
      return { isValid: false, error: "Please enter a whole number" };
    }

    return { isValid: true, value: Math.floor(numValue) };
  }, [sanitizeInput]);

  const handleSubmit = useCallback(() => {
    setError(null);
    setSuccess(null);

    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    const validation = validateNumericInput(value);
    if (!validation.isValid) {
      setError(validation.error || "Invalid input");
      return;
    }

    const sanitizedNotes = sanitizeInput(notes);
    if (sanitizedNotes.length > 500) {
      setError("Notes must be less than 500 characters");
      return;
    }

    // Use FHE encryption to increment counter
    fheCounter.incOrDec(validation.value!);
    setSuccess("Data encryption and recording initiated successfully!");
  }, [isConnected, validateNumericInput, value, notes, sanitizeInput, fheCounter]);

  const availableDays = useMemo(() => {
    return Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);
  }, [selectedMonth, selectedYear, getDaysInMonth]);

  const availableYears = useMemo(() => {
    return [2024, 2025, 2026];
  }, []);

  return (
    <section id="record" className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Record Your Impact
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your verified environmental data to create an encrypted, blockchain-verified record
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="p-8 shadow-card border border-border/50 bg-card rounded-lg">
            <div className="space-y-8">
              <div>
                <label className="text-base font-semibold mb-4 block">
                  Select Data Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {dataTypes.map((type, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedType(index)}
                      className={`p-4 rounded-lg border-2 transition-smooth hover:scale-105 ${
                        selectedType === index
                          ? "border-forest bg-forest/5 shadow-eco"
                          : "border-border hover:border-forest/30"
                      }`}
                    >
                      <type.icon className={`h-8 w-8 mx-auto mb-2 ${type.color}`} />
                      <p className="text-sm font-medium text-center">
                        {type.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="value" className="text-base font-semibold mb-2 block">
                    Value ({dataTypes[selectedType].unit})
                  </label>
                  <input
                    id="value"
                    type="number"
                    placeholder="0.00"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-12 px-4 text-lg border border-border/50 rounded-lg focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 bg-background"
                  />
                </div>

                <div>
                  <label className="text-base font-semibold mb-2 block">
                    Verification Date
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      className="flex-1 h-12 px-3 text-base border border-border/50 rounded-lg focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 bg-background"
                    >
                      {months.map((month, index) => (
                        <option key={month} value={index + 1}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(Number(e.target.value))}
                      className="w-20 h-12 px-3 text-base border border-border/50 rounded-lg focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 bg-background"
                    >
                      {availableDays.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="w-24 h-12 px-3 text-base border border-border/50 rounded-lg focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 bg-background"
                    >
                      {availableYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="text-base font-semibold mb-2 block">
                  Verification Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional context or verification details..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-smooth bg-background"
                />
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/30">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-forest" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Your data will be encrypted before storage. Only authorized auditors with verification keys can decrypt this information.
                </p>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!fheCounter.canIncOrDec || !isConnected}
                className="w-full py-3 rounded-lg bg-forest hover:bg-forest-light text-primary-foreground transition-smooth shadow-eco disabled:opacity-50 font-medium flex items-center justify-center gap-2"
              >
                {fheCounter.isIncOrDec ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Encrypting & Recording...
                  </>
                ) : !isConnected ? (
                  <>
                    <AlertCircle className="h-5 w-5" />
                    Connect Wallet First
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Encrypt & Record Data
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              )}

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

export default RecordData;
