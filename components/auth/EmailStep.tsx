import { motion } from "framer-motion";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

interface EmailStepProps {
  onNext: () => void;
  theme: 'light' | 'dark';
}

export default function EmailStep({ onNext, theme }: EmailStepProps) {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Por favor, ingresá un correo electrónico válido.");
      return;
    }
    setErrorMsg("");
    onNext();
  };

  return (
    <main className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "30px", padding: "40px 24px", flex: 1 }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}
      >
        {/* Centered Large Tap Icon matching block text width */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <img 
            src={theme === 'dark' ? "/assets/brand/Isotipo_Blanco.png" : "/assets/brand/Isotipo_Negro.png"}
            alt="Logo" 
            style={{ 
              height: "90px", 
              objectFit: "contain"
            }} 
          />
        </div>

        <h1 style={{ fontSize: "21px", fontWeight: "600", fontFamily: "var(--font-family-title)", color: "var(--text-primary)", textAlign: "center" }}>
          Iniciar sesión / Registrarse
        </h1>

        {/* Email Form */}
        <form onSubmit={handleEmailSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "16px 20px",
              borderRadius: "24px",
              border: "none",
              backgroundColor: theme === "dark" ? "#242221" : "#E8E8E8",
              color: "var(--text-primary)",
              fontSize: "14px",
              outline: "none",
              transition: "background-color 0.3s ease, box-shadow 0.2s"
            }}
          />

          {errorMsg && (
            <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "#DC3545", fontSize: "11.5px", fontWeight: "bold", paddingLeft: "10px" }}>
              <AlertCircle size={13} />
              <span>{errorMsg}</span>
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{
              width: "100%",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#FFBF00",
              color: "#1A1716",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(255, 191, 0, 0.15)",
              marginTop: "6px"
            }}
          >
            Continuar
          </motion.button>
        </form>

        {/* Circular Social Login Divider */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", margin: "8px 0" }}>
          <div style={{ flex: 1, height: "1.5px", backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)" }} />
          <span style={{ fontSize: "12px", color: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.4)", margin: "0 14px", fontWeight: "600" }}>o</span>
          <div style={{ flex: 1, height: "1.5px", backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)" }} />
        </div>

        {/* Premium Circular Social Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onNext}
            style={{ width: "52px", height: "52px", borderRadius: "16px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--bg-color)", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            <svg width="22" height="22" viewBox="0 0 48 48">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107" />
              <path d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z" fill="#FF3D00" />
              <path d="M24 46c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.6C29.9 36.6 27.1 37 24 37c-5.9 0-10.7-3.1-11.8-8.5H4.6C8 40.3 15.4 46 24 46z" fill="#4CAF50" />
              <path d="M44.5 20H24v8.5h11.8c-.6 2.9-2.3 5.3-4.8 7l6.6 5.6C41.6 37.3 45 31.1 45 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2" />
            </svg>
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onNext}
            style={{ width: "52px", height: "52px", borderRadius: "16px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--bg-color)", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "var(--text-primary)", transition: "background-color 0.3s" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.12.09 2.27-.58 2.94-1.39z" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
