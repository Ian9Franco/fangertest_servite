import Image from "next/image";
import { ChevronLeft, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  onBack?: () => void;
  onHome?: () => void;
  hideBack?: boolean;
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

/**
 * Header Component
 * Top bar with animated back arrow, centered branding logo, and premium theme selector.
 */
export default function Header({ onBack, onHome, hideBack = false, theme = 'light', toggleTheme }: HeaderProps) {
  return (
    <header className="header" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
      {/* Back Button */}
      <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!hideBack && (
          <motion.button 
            whileTap={{ scale: 0.8 }}
            whileHover={{ x: -2 }}
            style={{ 
              cursor: "pointer", 
              border: "none", 
              background: "transparent",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              padding: "4px"
            }}
            onClick={onBack}
          >
            <ChevronLeft size={24} color="#FF6600" />
          </motion.button>
        )}
      </div>
      
      {/* Centered Logo */}
      <div 
        className="header-title" 
        style={{ flex: 1, display: "flex", justifyContent: "center", padding: "4px 0", cursor: onHome ? "pointer" : "default" }}
        onClick={onHome}
      >
        <Image 
          src={theme === "dark" ? "/assets/brand/Logotipo_Blanco.png" : "/assets/brand/Logotipo_Negro.png"} 
          alt="SERVITE" 
          width={100} 
          height={30}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      
      {/* Right Icons / Theme Toggle */}
      <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {toggleTheme && (
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            style={{
              cursor: "pointer",
              border: "none",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              color: "#FF6600"
            }}
            onClick={toggleTheme}
            title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {theme === "dark" ? (
              <motion.div initial={{ rotate: -30 }} animate={{ rotate: 0 }} transition={{ type: "spring" }}>
                <Sun size={20} color="#FFBF00" fill="#FFBF00" style={{ display: "block" }} />
              </motion.div>
            ) : (
              <motion.div initial={{ rotate: 30 }} animate={{ rotate: 0 }} transition={{ type: "spring" }}>
                <Moon size={20} color="#FF6600" fill="#FF6600" style={{ display: "block" }} />
              </motion.div>
            )}
          </motion.button>
        )}
      </div>
    </header>
  );
}
