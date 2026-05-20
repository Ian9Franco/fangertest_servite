import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface Transaction {
  title: string;
  desc: string;
  amt: string;
  type: "in" | "out";
  date: string;
}

interface ActivityTabProps {
  barName: string;
  transactions: Transaction[];
  pageVariants: any;
  onBack: () => void;
}

/**
 * ActivityTab Component
 * Shows the transaction history for the active bar.
 * Matches image 3: back arrow, title "Actividad en [Bar Name]", empty state or list.
 */
export default function ActivityTab({
  barName,
  transactions,
  pageVariants,
  onBack,
}: ActivityTabProps) {
  // Filter only bar-relevant transactions (all for now, could be filtered by bar)
  const barTransactions = transactions;

  return (
    <motion.div
      key="tab-activity"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ display: "flex", flexDirection: "column", gap: "0px", width: "100%", color: "#1A1716" }}
    >

      {/* Transactions list or empty state */}
      {barTransactions.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "340px",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              textAlign: "center",
              maxWidth: "240px",
              lineHeight: "1.5",
            }}
          >
            No hay transacciones registradas en este bar.
          </span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {barTransactions.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F5F5F5",
                borderRadius: "14px",
                padding: "14px 16px",
                gap: "12px",
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: tx.type === "in" ? "rgba(40,167,69,0.1)" : "rgba(255,102,0,0.1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Clock
                  size={18}
                  color={tx.type === "in" ? "#28a745" : "#FF6600"}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "14px", color: "#1A1716" }}>{tx.title}</div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>{tx.desc}</div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{tx.date}</div>
              </div>

              {/* Amount */}
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: tx.type === "in" ? "#28a745" : "#FF6600",
                  whiteSpace: "nowrap",
                }}
              >
                {tx.amt}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
