// Tanzania DSTV Packages
export const DSTV_PACKAGES = [
  { value: "premium", label: "DStv Premium", price: 180000 },
  { value: "compact_plus", label: "DStv Compact Plus", price: 98000 },
  { value: "compact", label: "DStv Compact", price: 59000 },
  { value: "family", label: "DStv Family", price: 32000 },
  { value: "access", label: "DStv Access", price: 19000 },
  { value: "lite", label: "DStv Lite", price: 12000 },
  { value: "poa", label: "DStv Poa", price: 9000 },
  { value: "yanga", label: "DStv Yanga", price: 12000 },
  { value: "other", label: "Other", price: 0 },
] as const;

export type DstvPackage = typeof DSTV_PACKAGES[number]["value"];
