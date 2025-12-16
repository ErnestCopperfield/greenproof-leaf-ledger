"use client";

import { Leaf, Cloud, Droplet, Zap, Lock, Loader2, AlertCircle, CheckCircle, Sparkles, Info } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { useFhevm } from "@/fhevm/useFhevm";
import { useInMemoryStorage } from "@/hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "@/hooks/metamask/useMetaMaskEthersSigner";
import { useFHECounter } from "@/hooks/useFHECounter";

interface EnvironmentalDataType {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  unit: string;
  color: string;
  bgColor: string;
  textColor: string;
}

interface ValidationResult {
  isValid: boolean;
  value?: number;
  error?: string;
}

const dataTypes: EnvironmentalDataType[] = [
  { icon: Cloud, label: "CO₂ Reduction", unit: "tons", color: "from-emerald-500 to-green-600", bgColor: "bg-emerald-500/10", textColor: "text-emerald-600" },
  { icon: Zap, label: "Energy Saved", unit: "kWh", color: "from-yellow-500 to-orange-500", bgColor: "bg-yellow-500/10", textColor: "text-yellow-600" },
  { icon: Droplet, label: "Water Conserved", unit: "liters", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-500/10", textColor: "text-blue-600" },
  { icon: Leaf, label: "Waste Reduced", unit: "kg", color: "from-lime-500 to-green-500", bgColor: "bg-lime-500/10", textColor: "text-lime-600" },
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

    fheCounter.incOrDec(validation.value!);
    setSuccess("Data encryption and recording initiated successfully!");
  }, [isConnected, validateNumericInput, value, notes, sanitizeInput, fheCounter]);

  const availableDays = useMemo(() => {
    return Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);
  }, [selectedMonth, selectedYear, getDaysInMonth]);

  const availableYears = useMemo(() => {
    return [2024, 2025, 2026];
  }, []);

  const currentType = dataTypes[selectedType];

  return (
    <section id="record" className="py-24 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-green-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* 标题区域 */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-forest mb-4">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">FHE Encrypted Recording</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">Record Your </span>
            <span className="text-gradient-forest">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your verified environmental data to create an encrypted, blockchain-verified record
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-eco p-8 md:p-10">
            <div className="space-y-10">
              {/* 数据类型选择 */}
              <div>
                <label className="text-lg font-semibold mb-6 block flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">1</span>
                  Select Data Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {dataTypes.map((type, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedType(index)}
                      aria-pressed={selectedType === index}
                      aria-label={`Select ${type.label} data type`}
                      className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500/50 overflow-hidden ${
                        selectedType === index
                          ? "border-green-500 shadow-eco bg-white"
                          : "border-transparent bg-white/50 hover:border-green-500/30 hover:bg-white"
                      }`}
                    >
                      {/* 选中指示器 */}
                      {selectedType === index && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                      
                      <div className={`w-14 h-14 rounded-xl ${type.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <type.icon className={`h-7 w-7 ${type.textColor}`} />
                      </div>
                      <p className="text-sm font-semibold text-center text-foreground">
                        {type.label}
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        {type.unit}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 数值和日期输入 */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="value" className="text-lg font-semibold mb-4 block flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">2</span>
                    Value ({currentType.unit})
                  </label>
                  <div className="relative">
                    <input
                      id="value"
                      type="number"
                      placeholder="Enter amount..."
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="input-eco text-lg h-14 pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                      {currentType.unit}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-lg font-semibold mb-4 block flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">3</span>
                    Verification Date
                  </label>
                  <div className="flex gap-3">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      aria-label="Select month"
                      className="input-eco flex-1 h-14"
                    >
                      {months.map((month, index) => (
                        <option key={month} value={index + 1}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(Number(e.target.value))}
                      aria-label="Select day"
                      className="input-eco w-20 h-14"
                    >
                      {availableDays.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      aria-label="Select year"
                      className="input-eco w-28 h-14"
                    >
                      {availableYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 备注 */}
              <div>
                <label htmlFor="notes" className="text-lg font-semibold mb-4 block flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">4</span>
                  Verification Notes
                  <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional context or verification details..."
                  className="input-eco resize-none"
                />
              </div>

              {/* 加密提示 */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">🔐 FHE Encryption Active</h4>
                  <p className="text-sm text-muted-foreground">
                    Your data will be encrypted using Fully Homomorphic Encryption before storage. 
                    Only authorized auditors with verification keys can decrypt this information.
                  </p>
                </div>
              </div>

              {/* 提交按钮 */}
              <button 
                onClick={handleSubmit}
                disabled={!fheCounter.canIncOrDec || !isConnected}
                className="w-full py-4 rounded-2xl font-semibold text-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-eco hover:shadow-glow"
              >
                {fheCounter.isIncOrDec ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Encrypting & Recording...
                  </>
                ) : !isConnected ? (
                  <>
                    <AlertCircle className="h-6 w-6" />
                    Connect Wallet First
                  </>
                ) : (
                  <>
                    <Lock className="h-6 w-6" />
                    Encrypt & Record Data
                    <Sparkles className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* 错误消息 */}
              {error && (
                <div 
                  role="alert" 
                  aria-live="polite"
                  className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 animate-fadeIn"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* 成功消息 */}
              {success && (
                <div 
                  role="status" 
                  aria-live="polite"
                  className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3 animate-fadeIn"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-sm text-green-700 font-medium">{success}</p>
                </div>
              )}

              {/* 状态消息 */}
              {fheCounter.message && (
                <div className="p-4 rounded-xl glass-forest flex items-center gap-3">
                  <Info className="h-5 w-5 text-green-600 flex-shrink-0" />
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
