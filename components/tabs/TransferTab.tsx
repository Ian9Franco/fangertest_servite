import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, AlertCircle } from "lucide-react";

interface TransferTabProps {
  currentUser: string | null;
  users: any;
  bars: any[];
  selectedBarId: number | null;
  handleAddFunds: (amount: number) => void;
  pageVariants: any;
  onBack: () => void;
}

/**
 * TransferTab Component
 * Allows the user to transfer balance to another user by email.
 */
export default function TransferTab({
  currentUser,
  users,
  bars,
  selectedBarId,
  handleAddFunds,
  pageVariants,
  onBack,
}: TransferTabProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [foundUser, setFoundUser] = useState<string | null>(null);
  const [searchError, setSearchError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const activeBar = bars.find((b) => b.id === selectedBarId);
  const barBalance = activeBar?.balance ?? 0;
  const barName = activeBar?.name ?? "Bar";

  const handleSearch = () => {
    setSearchError("");
    setFoundUser(null);
    const trimmed = recipient.trim().toLowerCase();
    if (!trimmed) {
      setSearchError("Ingresá el email del destinatario.");
      return;
    }
    // Search in users object by key (email)
    const match = Object.keys(users).find((k) => k.toLowerCase() === trimmed);
    if (match && match !== currentUser) {
      setFoundUser(match);
    } else if (match === currentUser) {
      setSearchError("No podés transferirte saldo a vos mismo.");
    } else {
      setSearchError("Usuario no encontrado. Verificá el email.");
    }
  };

  const handleConfirm = () => {
    const amountNum = Number(amount);
    if (!foundUser) {
      setErrorMsg("Buscá un destinatario primero.");
      return;
    }
    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMsg("Ingresá un monto válido.");
      return;
    }
    if (amountNum > barBalance) {
      setErrorMsg("Saldo insuficiente en este bar.");
      return;
    }

    setErrorMsg("");
    setIsProcessing(true);

    setTimeout(() => {
      // Deduct from sender's bar balance (negative addFunds)
      handleAddFunds(-amountNum);
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setRecipient("");
        setAmount("");
        setFoundUser(null);
        onBack();
      }, 2200);
    }, 1500);
  };

  return (
    <motion.div
      key="tab-transfer"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ display: "flex", flexDirection: "column", gap: "0px", width: "100%", color: "#1A1716", paddingTop: "12px" }}
    >
      {/* SE ELIMINÓ EL BLOQUE SUB-HEADER REDUNDANTE */}

      {/* Balance Display */}
      <div
        style={{
          backgroundColor: "#E9ECEF",
          borderRadius: "16px",
          padding: "20px",
          textAlign: "center",
          marginBottom: "28px",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          Tu saldo disponible en {barName}
        </span>
        <div style={{ fontSize: "38px", fontWeight: "900", color: "#1A1716", marginTop: "4px" }}>
          ${barBalance.toLocaleString("es-AR")}
        </div>
      </div>

      {/* Recipient Field */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
        <span style={{ fontSize: "15px", fontWeight: "800", color: "#1A1716" }}>Destinatario</span>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="email"
            placeholder="Email del usuario"
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              setFoundUser(null);
              setSearchError("");
            }}
            style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: "14px",
              border: "1.5px solid #E0E0E0",
              fontSize: "14px",
              color: "#1A1716",
              outline: "none",
              fontFamily: "var(--font-family-body)",
              backgroundColor: "#fff",
            }}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            style={{
              padding: "14px 20px",
              backgroundColor: "#FFBF00",
              color: "#1A1716",
              border: "none",
              borderRadius: "14px",
              fontWeight: "900",
              fontSize: "14px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Buscar
          </motion.button>
        </div>

        {/* Search feedback */}
        {foundUser && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(40, 167, 69, 0.08)",
              border: "1px dashed rgba(40,167,69,0.4)",
              padding: "10px 14px",
              borderRadius: "12px",
            }}
          >
            <CheckCircle2 size={16} color="#28a745" />
            <span style={{ fontSize: "13px", color: "#28a745", fontWeight: "700" }}>
              {users[foundUser]?.name ?? foundUser}
            </span>
          </div>
        )}
        {searchError && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(220, 53, 69, 0.05)",
              border: "1px dashed rgba(220,53,69,0.3)",
              padding: "10px 14px",
              borderRadius: "12px",
            }}
          >
            <AlertCircle size={16} color="#dc3545" />
            <span style={{ fontSize: "12px", color: "#dc3545", fontWeight: "700" }}>{searchError}</span>
          </div>
        )}
      </div>

      {/* Amount Field */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
        <span style={{ fontSize: "15px", fontWeight: "800", color: "#1A1716" }}>Monto a transferir</span>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setErrorMsg("");
          }}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "14px",
            border: "1.5px solid #E0E0E0",
            fontSize: "18px",
            fontWeight: "700",
            color: "#1A1716",
            outline: "none",
            fontFamily: "var(--font-family-body)",
            backgroundColor: "#fff",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Error Callout */}
      {errorMsg && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            backgroundColor: "rgba(220, 53, 69, 0.05)",
            border: "1px dashed rgba(220, 53, 69, 0.3)",
            padding: "10px 14px",
            borderRadius: "12px",
            marginBottom: "16px",
          }}
        >
          <AlertCircle size={16} color="#dc3545" />
          <span style={{ fontSize: "12px", color: "#dc3545", fontWeight: "bold" }}>{errorMsg}</span>
        </div>
      )}

      {/* Confirm Button */}
      <motion.button
        whileTap={!foundUser || !amount ? {} : { scale: 0.98 }}
        onClick={handleConfirm}
        style={{
          width: "100%",
          backgroundColor: !foundUser || !amount ? "#E9ECEF" : "#FFBF00",
          color: !foundUser || !amount ? "#b0b0b0" : "#1A1716",
          border: "none",
          borderRadius: "30px",
          padding: "16px",
          fontSize: "15px",
          fontWeight: "900",
          cursor: !foundUser || !amount ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
        }}
      >
        Confirmar Transferencia
      </motion.button>

      {/* Processing / Success Overlay */}
      <AnimatePresence>
        {(isProcessing || isSuccess) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(26, 23, 22, 0.96)",
              backdropFilter: "blur(8px)",
              zIndex: 99999,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              padding: "24px",
              textAlign: "center",
            }}
          >
            {isProcessing ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "4px solid rgba(255, 191, 0, 0.2)",
                    borderTop: "4px solid #FFBF00",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <style>{`@keyframes spin { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }`}</style>
                <h3 style={{ fontSize: "18px", fontWeight: "900" }}>Procesando transferencia...</h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", maxWidth: "220px", lineHeight: "1.4" }}>
                  Por favor no salgas mientras procesamos tu transferencia.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <CheckCircle2 size={64} color="#28a745" style={{ marginBottom: "16px" }} />
                <h3 style={{ fontSize: "22px", fontWeight: "900", color: "#FFF" }}>¡Transferencia Exitosa!</h3>
                <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#FFBF00", margin: "10px 0" }}>
                  -${Number(amount).toLocaleString("es-AR")}
                </h1>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", maxWidth: "240px", lineHeight: "1.5" }}>
                  Tu saldo fue transferido a{" "}
                  <strong style={{ color: "#FFBF00" }}>{users[foundUser!]?.name ?? foundUser}</strong> exitosamente.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}