import Image from "next/image";
import { Heart, Percent } from "lucide-react";
import { motion } from "framer-motion";

interface BarInfoProps {
  name: string;
  address: string;
  isFavorite: boolean;
  logo?: string;
  onToggleFavorite: (e: React.MouseEvent) => void;
  theme?: 'light' | 'dark';
}

/**
 * BarInfo Component
 * Displays the bar logo, name, address, and an animated favorite (heart) icon.
 */
export default function BarInfo({ name, address, isFavorite, logo, onToggleFavorite, theme = 'light' }: BarInfoProps) {
  const displayLogo = logo || (theme === "dark" ? "/assets/brand/Isotipo_Blanco.png" : "/assets/brand/Isotipo_Negro.png");
  
  // All icons get a black background unless they explicitly contain black text
  const isBlackText = displayLogo.toLowerCase().includes("negro");
  const bgColor = isBlackText ? "#fff" : "#1A1716";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div className="bar-card" style={{ padding: 0, backgroundColor: "transparent", border: "none", boxShadow: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Bar Logo / Isotype */}
          <div className="bar-logo" style={{ 
            overflow: "hidden",
            backgroundColor: bgColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "65px",
            height: "65px",
            flexShrink: 0,
            borderRadius: "12px",
            border: isBlackText ? "1.5px solid var(--border-color)" : "1.5px solid #2A2625"
          }}>
            <img 
              src={displayLogo} 
              alt="Bar Logo" 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: displayLogo.toLowerCase().includes(".jpg") ? "cover" : "contain",
                padding: displayLogo.toLowerCase().includes(".jpg") ? "0" : "8px"
              }}
            />
          </div>
          
          {/* Bar Details */}
          <div className="bar-details">
            <span className="bar-name">{name}</span>
            <span className="bar-address">{address}</span>
          </div>
        </div>
        
        {/* Action Icons */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <motion.div
            whileTap={{ scale: 0.8 }}
            style={{ cursor: "pointer", display: "flex", padding: "6px", borderRadius: "50%", border: "1.5px solid var(--border-color)" }}
          >
            <Percent size={18} color="var(--text-primary)" strokeWidth={2} />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={onToggleFavorite}
            style={{ cursor: "pointer", display: "flex", padding: "6px", borderRadius: "50%" }}
          >
            <Heart 
              size={22} 
              color="#FF6600" 
              fill={isFavorite ? "#FF6600" : "none"} 
              style={{ 
                transition: "fill 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), stroke-width 0.2s",
                strokeWidth: isFavorite ? "1.5px" : "2px"
              }} 
            />
          </motion.div>
        </div>
      </div>

      {/* Promo Banner */}
      <div style={{ backgroundColor: "#FFBF00", padding: "8px 12px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <Percent size={14} color="#1A1716" />
        <span style={{ fontSize: "11px", fontWeight: "bold", color: "#1A1716" }}>Promo del día: Todos los jueves 50% OFF en mesa de mujeres</span>
      </div>
    </div>
  );
}
