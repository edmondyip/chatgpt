import ledger from "../../data/financial-summary.json";

export interface Period {
  period: string;
  label: string;
  scope: string;
  verification: string;
  grossCents: number | null;
  platformFeesCents: number | null;
  paymentFeesCents: number | null;
  refundsCents: number | null;
  expensesCents: number | null;
  withdrawableCents: number | null;
  receivedCents: number | null;
}

export const periods: Period[] = ledger.periods;
const selected = periods.find((p) => p.period === ledger.currentPeriod);
if (!selected) throw new Error("Missing current accounting period");
export const current: Period = selected;
export const target = ledger.monthlyTargetCents;
export const dollars = (cents: number | null) =>
  cents === null
    ? "Awaiting verification"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: ledger.currency,
      }).format(cents / 100);

export function proceeds(p: Period) {
  const {
    grossCents,
    platformFeesCents,
    paymentFeesCents,
    refundsCents,
    expensesCents,
  } = p;
  if (
    grossCents === null ||
    platformFeesCents === null ||
    paymentFeesCents === null ||
    refundsCents === null ||
    expensesCents === null
  )
    return null;
  return (
    grossCents -
    platformFeesCents -
    paymentFeesCents -
    refundsCents -
    expensesCents
  );
}

// Available balance excludes completed payouts. Attribute both to the earning period.
export function coverage(p: Period) {
  const net = proceeds(p);
  if (
    net === null ||
    p.withdrawableCents === null ||
    p.receivedCents === null ||
    p.expensesCents === null
  )
    return null;
  const eligible = Math.min(
    net,
    p.withdrawableCents + p.receivedCents - p.expensesCents,
  );
  return Math.max(0, eligible) / target;
}
export const percent = (fraction: number | null) =>
  fraction === null
    ? "Awaiting verification"
    : new Intl.NumberFormat("en-US", {
        style: "percent",
        maximumFractionDigits: 1,
      }).format(fraction);
