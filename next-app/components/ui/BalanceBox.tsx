import { Wallet } from "lucide-react";

interface BalanceBoxProps {
  amount: string;
}

/**
 * BalanceBox Component
 * Displays the available balance and a button to add funds.
 */
export default function BalanceBox({ amount }: BalanceBoxProps) {
  return (
    <>
      {/* Balance Display */}
      <div className="balance-box">
        <span className="balance-label">Saldo disponible</span>
        <span className="balance-amount">{amount}</span>
      </div>

      {/* Action Button */}
      <button className="btn btn-yellow">
        <Wallet size={18} /> Cargar saldo
      </button>
    </>
  );
}
