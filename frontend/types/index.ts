// Environmental data types
export interface EnvironmentalDataType {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  unit: string;
  color: string;
}

export interface ValidationResult {
  isValid: boolean;
  value?: number;
  error?: string;
}

export interface FormData {
  selectedType: number;
  value: string;
  selectedMonth: number;
  selectedDay: number;
  selectedYear: number;
  notes: string;
}

// Component state types
export interface ComponentState {
  error: string | null;
  success: string | null;
  isLoading: boolean;
}

// FHE Counter types
export interface FHECounterState {
  contractAddress?: string;
  canDecrypt: boolean;
  canGetCount: boolean;
  canIncOrDec: boolean;
  isDecrypted: boolean;
  message: string;
  clear?: string | bigint | boolean;
  handle?: string;
  isDecrypting: boolean;
  isRefreshing: boolean;
  isIncOrDec: boolean;
  isDeployed?: boolean;
}

// Network and chain types
export interface NetworkConfig {
  chainId: number;
  chainName: string;
  rpcUrl?: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorWithSeverity extends AppError {
  severity: ErrorSeverity;
  timestamp: number;
}
