import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";

interface SimpleWalletTabProps {
  currentUser: string | null;
  users: any;
  handleAddFunds: (amount: number) => void;
  pageVariants: any;
  setTab?: (tab: 'home' | 'wallet' | 'location' | 'profile') => void;
}

/**
 * SimpleWalletTab Component
 * A simplified, high-fidelity replica of the "Recarga" screen.
 * Allows custom numeric input, one-tap suggested value pills,
 * payment method selection, and triggers a full-screen success receipt overlay.
 */
export default function SimpleWalletTab({
  currentUser,
  users,
  handleAddFunds,
  pageVariants,
  setTab
}: SimpleWalletTabProps) {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "mercadopago" | null>(null);
  
  // Recharge flow states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleConfirmRecharge = () => {
    const amountNum = Number(customAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMsg("Por favor, ingresá un monto válido para recargar.");
      return;
    }
    if (!selectedMethod) {
      setErrorMsg("Por favor, seleccioná un método de pago.");
      return;
    }

    setErrorMsg("");
    setIsProcessing(true);

    // Simulate secure transaction charging
    setTimeout(() => {
      handleAddFunds(amountNum);
      setIsProcessing(false);
      setIsSuccess(true);

      // Automatically return to home after success screen
      setTimeout(() => {
        setIsSuccess(false);
        setCustomAmount("");
        setSelectedMethod(null);
        if (setTab) {
          setTab('home');
        }
      }, 2000);
    }, 1500);
  };

  return (
    <motion.div
      key="tab-simple-wallet"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", color: "#1A1716" }}
    >
      {/* Title Header */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "900", fontFamily: "var(--font-family-title)", margin: 0 }}>
          Recarga
        </h2>
      </div>

      {/* Amount Input Capsule */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <style>{`
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}</style>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Indicar monto"
            value={customAmount}
            onChange={(e) => {
              setErrorMsg("");
              setCustomAmount(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "18px 24px",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#E9ECEF",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1A1716",
              outline: "none",
              fontFamily: "var(--font-family-body)"
            }}
          />
          {customAmount && (
            <span style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", fontWeight: "900", fontSize: "18px", color: "#1A1716" }}>
              $
            </span>
          )}
        </div>
      </div>

      {/* Suggested Values Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ fontSize: "14px", fontWeight: "800", color: "#1A1716" }}>
          Valores sugeridos
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {["5000", "10000", "15000", "20000"].map((val) => (
            <motion.button
              key={val}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setErrorMsg("");
                setCustomAmount(val);
              }}
              style={{
                backgroundColor: "#FFBF00",
                color: "#1A1716",
                border: "none",
                borderRadius: "30px",
                padding: "16px 12px",
                fontSize: "15px",
                fontWeight: "900",
                cursor: "pointer",
                boxShadow: "none"
              }}
            >
              ${Number(val).toLocaleString("es-AR")}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Payment Methods Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ fontSize: "14px", fontWeight: "800", color: "#1A1716" }}>
          Formas de pago
        </span>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {/* Card Option */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setErrorMsg("");
              setSelectedMethod("card");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              height: "60px",
              backgroundColor: "#E9ECEF",
              border: selectedMethod === "card" ? "2px solid #FFBF00" : "2px solid transparent",
              borderRadius: "16px",
              padding: "14px 10px",
              fontSize: "11px",
              fontWeight: "bold",
              color: "#1A1716",
              cursor: "pointer",
              transition: "border 0.15s ease"
            }}
          >
            <CreditCard size={15} color="#FF6600" />
            <span style={{ whiteSpace: "nowrap" }}>Tarjeta crédito / débito</span>
          </motion.button>

          {/* Mercado Pago Option */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setErrorMsg("");
              setSelectedMethod("mercadopago");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60px",
              backgroundColor: "#E9ECEF",
              border: selectedMethod === "mercadopago" ? "2px solid #FFBF00" : "2px solid transparent",
              borderRadius: "16px",
              padding: "4px 8px",
              cursor: "pointer",
              overflow: "hidden",
              transition: "border 0.15s ease"
            }}
          >
            <img
              src="/assets/payments/mercado_pago.png"
              alt="Mercado Pago"
              style={{ width: "100%", height: "100%", objectFit: "contain", transform: "scale(1.4)" }}
            />
          </motion.button>
        </div>
      </div>

      {/* Error Callout */}
      {errorMsg && (
        <div style={{ display: "flex", gap: "8px", alignItems: "center", backgroundColor: "rgba(220, 53, 69, 0.05)", border: "1px dashed rgba(220, 53, 69, 0.3)", padding: "10px 14px", borderRadius: "12px" }}>
          <AlertCircle size={16} color="#dc3545" />
          <span style={{ fontSize: "12px", color: "#dc3545", fontWeight: "bold" }}>{errorMsg}</span>
        </div>
      )}

      {/* Submit Action Button */}
      <motion.button
        whileTap={!customAmount || !selectedMethod ? {} : { scale: 0.98 }}
        onClick={handleConfirmRecharge}
        disabled={!customAmount || !selectedMethod}
        style={{
          width: "100%",
          backgroundColor: (!customAmount || !selectedMethod) ? "#f2f2f2" : "#FF6600",
          color: (!customAmount || !selectedMethod) ? "#b0b0b0" : "#fff",
          border: "none",
          borderRadius: "30px",
          padding: "16px",
          fontSize: "15px",
          fontWeight: "bold",
          cursor: (!customAmount || !selectedMethod) ? "not-allowed" : "pointer",
          marginTop: "16px",
          transition: "all 0.2s ease"
        }}
      >
        Confirmar Recarga
      </motion.button>

      {/* Transaction Loading & Success Receipt Screen Overlay */}
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
              textAlign: "center"
            }}
          >
            {isProcessing ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                {/* Custom premium spinning loader ring */}
                <div style={{
                  width: "48px",
                  height: "48px",
                  border: "4px solid rgba(255, 191, 0, 0.2)",
                  borderTop: "4px solid #FFBF00",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
                <h3 style={{ fontSize: "18px", fontWeight: "900" }}>Procesando transacción segura...</h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", maxWidth: "220px", lineHeight: "1.4" }}>
                  Por favor no salgas ni cierres la aplicación mientras procesamos tu recarga.
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
                <h3 style={{ fontSize: "22px", fontWeight: "900", color: "#FFF" }}>¡Recarga Exitosa!</h3>
                <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#FFBF00", margin: "10px 0" }}>
                  +${Number(customAmount).toLocaleString("es-AR")}
                </h1>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", maxWidth: "240px", lineHeight: "1.5" }}>
                  Tu saldo ha sido acreditado en tu cuenta de Servite. ¡A disfrutar!
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
