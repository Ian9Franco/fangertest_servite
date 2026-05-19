import { useState } from "react";
import { Wallet, ChevronDown, ChevronUp } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { motion, AnimatePresence } from "framer-motion";

interface BalanceBoxProps {
  balance: number;
  onAddFunds?: (amount: number) => void;
}

/**
 * BalanceBox Component
 * Displays the available balance with smooth numbers roll-up and expandable loading options.
 */
export default function BalanceBox({ balance, onAddFunds }: BalanceBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      {/* Balance Display */}
      <div className="balance-box" style={{ 
        backgroundColor: "#e9ecef", 
        padding: "20px", 
        borderRadius: "15px", 
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.01)"
      }}>
        <span className="balance-label" style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Saldo disponible</span>
        <span className="balance-amount" style={{ fontSize: "40px", fontWeight: "bold", color: "var(--text-primary)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <AnimatedCounter value={balance} />
        </span>
      </div>

      {/* Action Button & Expandable quick loader */}
      {onAddFunds && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-yellow"
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "none",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "var(--accent-color)",
              color: "var(--text-primary)",
              boxShadow: "0 4px 12px rgba(255, 191, 0, 0.15)"
            }}
          >
            <Wallet size={18} /> 
            <span>Cargar saldo</span>
            {isExpanded ? <ChevronUp size={16} style={{ marginLeft: "auto" }} /> : <ChevronDown size={16} style={{ marginLeft: "auto" }} />}
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: -4 }}
                animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                exit={{ opacity: 0, height: 0, marginTop: -4 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", width: "100%" }}>
                  {[500, 1000, 2000].map((amt) => (
                    <motion.button
                      key={amt}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02, borderColor: "#FF6600", color: "#FF6600" }}
                      onClick={() => onAddFunds(amt)}
                      style={{
                        padding: "12px 6px",
                        backgroundColor: "#fff",
                        border: "1.5px solid #e9ecef",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: "800",
                        color: "#1A1716",
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                        transition: "border-color 0.15s, color 0.15s"
                      }}
                    >
                      +${amt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
