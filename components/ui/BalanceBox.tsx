import { Wallet, Send, SquareDashedText } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { motion } from "framer-motion";

interface BalanceBoxProps {
  balance: number;
  onAddFunds?: (amount: number) => void;
  onLoadFunds?: () => void;
  onTransfer?: () => void;
  onActivity?: () => void;
}

/**
 * BalanceBox Component
 * Displays the available balance with smooth numbers roll-up and expandable loading options.
 */
export default function BalanceBox({ balance, onAddFunds, onLoadFunds, onTransfer, onActivity }: BalanceBoxProps) {

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      {/* Balance Display */}
      <div className="balance-box" style={{ 
        backgroundColor: "#E9ECEF", 
        padding: "20px", 
        borderRadius: "15px", 
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        boxShadow: "none"
      }}>
        <span className="balance-label" style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Saldo disponible</span>
        <span className="balance-amount" style={{ fontSize: "40px", fontWeight: "bold", color: "var(--text-primary)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <AnimatedCounter value={balance} />
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        {/* Cargar saldo → navega a SimpleWalletTab */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onLoadFunds?.()}
          className="btn btn-yellow"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "30px",
            border: "none",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#FFBF00",
            color: "#1A1716",
            boxShadow: "none"
          }}
        >
          <Wallet size={18} />
          <span>Cargar saldo</span>
        </motion.button>

        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
          {/* Transferir → abre TransferTab */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onTransfer?.()}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "30px",
              border: "none",
              fontSize: "13px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#FFBF00",
              color: "#1A1716",
              boxShadow: "none"
            }}
          >
            <Send size={16} />
            <span>Transferir</span>
          </motion.button>

          {/* Actividad → abre ActivityTab */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onActivity?.()}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "30px",
              border: "none",
              fontSize: "13px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#FFBF00",
              color: "#1A1716",
              boxShadow: "none"
            }}
          >
            <SquareDashedText size={16} />
            <span>Actividad</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
