import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UserPlus, Sparkles, Check, AlertCircle } from "lucide-react";

interface ProfileStepProps {
  onLogin: (user: string) => void;
  users: any;
  onAddUser: (id: string, name: string, isMinor: boolean, headColor: string) => void;
  theme?: 'light' | 'dark';
}

export default function ProfileStep({ onLogin, users, onAddUser, theme = 'light' }: ProfileStepProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [newName, setNewName] = useState("");
  const [isMinor, setIsMinor] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#FF6600");
  const [errorMsg, setErrorMsg] = useState("");

  const colorPresets = [
    { name: "Naranja", value: "#FF6600" },
    { name: "Verde", value: "#4CAF50" },
    { name: "Azul", value: "#2196F3" },
    { name: "Negro", value: "#1A1716" }
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setErrorMsg("Por favor, ingresá un nombre.");
      return;
    }
    
    // Generate a unique clean slug ID
    const userId = newName.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
    
    if (users[userId]) {
      setErrorMsg("Este usuario ya existe.");
      return;
    }

    onAddUser(userId, newName.trim(), isMinor, selectedColor);
    setNewName("");
    setIsMinor(false);
    setSelectedColor("#FF6600");
    setErrorMsg("");
    setIsRegistering(false); // Close registration form drawer
  };

  return (
    <main className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "25px", padding: "30px 24px", flex: 1 }}>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
      >
        <h1 style={{ fontSize: "22px", fontWeight: "800", fontFamily: "var(--font-family-title)", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Elegí tu Perfil
        </h1>
        <p style={{ fontSize: "12px", color: theme === 'dark' ? "#A09E9D" : "var(--text-secondary)", maxWidth: "290px", lineHeight: "1.4" }}>
          Ingresá con tu perfil para cargar saldo unificado y servirte canillas al instante.
        </p>
      </motion.div>

      {/* User selector list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "340px", margin: "0 auto" }}>
        {Object.keys(users).map((userId) => {
          const user = users[userId];
          const isUserMinor = user.isMinor;
          
          return (
            <motion.div
              key={userId}
              whileHover={{ scale: 1.02, borderColor: "#FF6600", boxShadow: "0 6px 16px rgba(0,0,0,0.03)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onLogin(userId)}
              style={{
                backgroundColor: theme === 'dark' ? "#242221" : "var(--bg-color)",
                borderRadius: "16px",
                border: isUserMinor 
                  ? "2px solid rgba(76, 175, 80, 0.4)" 
                  : (theme === 'dark' ? "2px solid rgba(255,255,255,0.08)" : "2px solid var(--border-color)"),
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                position: "relative",
                transition: "border-color 0.2s, background-color 0.3s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ 
                  width: "44px", 
                  height: "44px", 
                  borderRadius: "50%", 
                  border: `2.5px solid ${user.avatar.border}`,
                  padding: "2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme === 'dark' ? "#242221" : "var(--bg-color)"
                }}>
                  <div style={{ 
                    width: "100%", 
                    height: "100%", 
                    backgroundColor: "var(--border-color)", 
                    borderRadius: "50%", 
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <div style={{ width: "14px", height: "14px", backgroundColor: user.avatar.head, borderRadius: "50%", transform: "translateY(-2px)" }}></div>
                    <div style={{ width: "26px", height: "12px", backgroundColor: "var(--text-primary)", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", position: "absolute", bottom: "0" }}></div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: "14.5px", fontWeight: "bold", color: "var(--text-primary)", fontFamily: "var(--font-family-title)" }}>
                    {user.name}
                  </h3>
                  <span style={{ fontSize: "10.5px", color: isUserMinor ? "#4CAF50" : (theme === 'dark' ? "#A09E9D" : "var(--text-secondary)"), fontWeight: "bold" }}>
                    {user.rank}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {isUserMinor && (
                  <span style={{ fontSize: "10px", backgroundColor: "rgba(76, 175, 80, 0.12)", color: "#2E7D32", padding: "3px 8px", borderRadius: "10px", fontWeight: "bold" }}>
                    Menor
                  </span>
                )}
                <span style={{ fontSize: "16px", color: "var(--text-primary)", fontWeight: "bold" }}>→</span>
              </div>
            </motion.div>
          );
        })}
        
        {/* Add profile trigger */}
        {!isRegistering && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsRegistering(true)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: theme === 'dark' ? "1.5px dashed rgba(255, 102, 0, 0.4)" : "1.5px dashed var(--border-color)",
              backgroundColor: theme === 'dark' ? "rgba(255, 102, 0, 0.1)" : "rgba(255, 102, 0, 0.02)",
              color: "#FF6600",
              fontSize: "12.5px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginTop: "6px"
            }}
          >
            <UserPlus size={16} />
            Crear Nuevo Usuario
          </motion.button>
        )}

        {/* Slide-down Register Form Drawer */}
        <AnimatePresence>
          {isRegistering && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleRegisterSubmit}
              style={{
                backgroundColor: "var(--bg-color)",
                border: "1.5px solid var(--border-color)",
                borderRadius: "18px",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginTop: "6px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13.5px", fontWeight: "bold", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={14} color="#FF6600" /> Nuevo Perfil
                </span>
                <button
                  type="button"
                  onClick={() => { setIsRegistering(false); setErrorMsg(""); }}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}
                >
                  Cancelar
                </button>
              </div>

              {/* Name Input */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text-secondary)" }}>Nombre Completo:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: Gustavo Fanger"
                  maxLength={30}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--border-color)",
                    backgroundColor: "var(--app-bg)",
                    color: "var(--text-primary)",
                    fontSize: "12.5px",
                    fontWeight: "bold",
                    outline: "none"
                  }}
                />
              </div>

              {/* Color presets */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text-secondary)" }}>Color del Avatar:</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setSelectedColor(preset.value)}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: preset.value,
                        border: selectedColor === preset.value ? "2.5px solid #FF6600" : "1.5px solid rgba(0,0,0,0.15)",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0
                      }}
                      title={preset.name}
                    >
                      {selectedColor === preset.value && <Check size={12} color="#fff" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Underage checkbox */}
              <div 
                onClick={() => setIsMinor(!isMinor)}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  backgroundColor: isMinor ? "rgba(76, 175, 80, 0.06)" : "var(--app-bg)",
                  border: isMinor ? "1.5px dashed rgba(76, 175, 80, 0.3)" : "1.5px solid var(--border-color)",
                  padding: "10px 12px", 
                  borderRadius: "10px", 
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--text-primary)" }}>¿Es menor de edad?</span>
                  <span style={{ fontSize: "9.5px", color: "var(--text-secondary)" }}>Bloquea la compra de cervezas</span>
                </div>
                <div style={{ 
                  width: "40px", 
                  height: "22px", 
                  borderRadius: "11px", 
                  backgroundColor: isMinor ? "#4CAF50" : "#d1d1d1", 
                  position: "relative",
                  transition: "background-color 0.2s"
                }}>
                  <div style={{ 
                    width: "16px", 
                    height: "16px", 
                    borderRadius: "50%", 
                    backgroundColor: "#fff", 
                    position: "absolute", 
                    top: "3px", 
                    left: isMinor ? "21px" : "3px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    transition: "left 0.2s"
                  }}></div>
                </div>
              </div>

              {errorMsg && (
                <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "#DC3545", fontSize: "11px", fontWeight: "bold" }}>
                  <AlertCircle size={12} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "var(--text-primary)",
                  color: "var(--bg-color)",
                  fontSize: "12.5px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Registrar Perfil 🚀
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
