import { useState } from "react";
import { Wallet, ChevronDown, ChevronUp, Send, SquareDashedText } from "lucide-react";
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

      {/* Action Button & Expandable quick loader */}
      {/* Action Button & Expandable quick loader */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        {onAddFunds && (
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-yellow"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "30px", // Rounded
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
        )}

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
                    onClick={() => onAddFunds && onAddFunds(amt)}
                    style={{
                      padding: "12px 6px",
                      backgroundColor: "var(--app-bg)",
                      border: "1.5px solid var(--border-color)",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      boxShadow: "none",
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

        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
          <motion.button 
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "30px", // Rounded
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
          
          <motion.button 
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "30px", // Rounded
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
