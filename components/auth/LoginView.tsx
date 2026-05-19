import { motion } from "framer-motion";
import Header from "../layout/Header";

interface LoginViewProps {
  onLogin: (user: 'sofia' | 'ian') => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

/**
 * LoginView Component
 * Renders the premium branded welcome selector for Ian Franco and Sofia.
 */
export default function LoginView({ onLogin, theme, toggleTheme }: LoginViewProps) {
  return (
    <div className="app-container" style={{ minHeight: "100vh", backgroundColor: "var(--app-bg)", display: "flex", flexDirection: "column", paddingBottom: "30px", transition: "background-color 0.3s ease" }}>
      <Header onBack={() => {}} hideBack={true} theme={theme} toggleTheme={toggleTheme} />
      
      <main className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "30px", padding: "40px 24px", flex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
        >
          {/* Elegant high-res Logotipo logo */}
          <img 
            src="/assets/images/Logotipo_Negro.png" 
            alt="SERVITE" 
            style={{ height: "42px", objectFit: "contain", marginBottom: "5px", filter: theme === "dark" ? "invert(1) brightness(2)" : "none", transition: "filter 0.3s ease" }} 
          />
          <h1 style={{ fontSize: "26px", fontWeight: "800", fontFamily: "var(--font-family-title)", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "1px", transition: "color 0.3s ease" }}>
            ¡Te damos la bienvenida!
          </h1>
          <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", maxWidth: "280px", lineHeight: "1.5" }}>
            Ingresá con tu perfil para cargar saldo unificado y servirte canillas al instante.
          </p>
        </motion.div>

        {/* User selector cards side-by-side */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", maxWidth: "320px" }}>
          {[
            { id: 'sofia', name: "Sofia", rank: "Miembro Gold", headColor: "#FF6600", borderColor: "#FFBF00" },
            { id: 'ian', name: "Ian Franco", rank: "Miembro Premium", headColor: theme === "dark" ? "#F9F4E8" : "#1A1716", borderColor: "#FF6600" }
          ].map((userCard) => (
            <motion.div
              key={userCard.id}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(26,23,22,0.06)", borderColor: "#FF6600" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onLogin(userCard.id as any)}
              style={{
                backgroundColor: "var(--bg-color)",
                borderRadius: "20px",
                border: `2px solid var(--border-color)`,
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                transition: "border-color 0.3s, background-color 0.3s, box-shadow 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {/* Styled Avatar */}
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "50%", 
                  border: `2.5px solid ${userCard.borderColor}`,
                  padding: "2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "var(--bg-color)",
                  transition: "background-color 0.3s ease"
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
                    alignItems: "center",
                    transition: "background-color 0.3s ease"
                  }}>
                    <div style={{ width: "16px", height: "16px", backgroundColor: userCard.headColor, borderRadius: "50%", transform: "translateY(-2px)" }}></div>
                    <div style={{ width: "30px", height: "14px", backgroundColor: "var(--text-primary)", borderTopLeftRadius: "14px", borderTopRightRadius: "14px", position: "absolute", bottom: "0", transition: "background-color 0.3s ease" }}></div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text-primary)", fontFamily: "var(--font-family-title)", transition: "color 0.3s ease" }}>
                    {userCard.name}
                  </h3>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: "bold" }}>
                    {userCard.rank}
                  </span>
                </div>
              </div>

              <span style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: "bold", transition: "color 0.3s ease" }}>→</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
