import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface BarInfoProps {
  name: string;
  address: string;
  isFavorite: boolean;
  logo?: string;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

/**
 * BarInfo Component
 * Displays the bar logo, name, address, and an animated favorite (heart) icon.
 */
export default function BarInfo({ name, address, isFavorite, logo, onToggleFavorite }: BarInfoProps) {
  const displayLogo = logo || "/assets/images/Isotipo_Negro.png";
  const isDarkBg = displayLogo.includes("Blest") || displayLogo.includes("temple");

  return (
    <div className="bar-card">
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* Bar Logo / Isotype */}
        <div className="bar-logo" style={{ 
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          overflow: "hidden",
          backgroundColor: isDarkBg ? "#1A1716" : "var(--bg-color)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          border: isDarkBg ? "1.5px solid #2A2625" : "1.5px solid var(--border-color)"
        }}>
          <img 
            src={displayLogo} 
            alt="Bar Logo" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: isDarkBg ? "contain" : "cover",
              padding: isDarkBg ? "4px" : "0"
            }}
          />
        </div>
        
        {/* Bar Details */}
        <div className="bar-details">
          <span className="bar-name">{name}</span>
          <span className="bar-address">{address}</span>
        </div>
      </div>
      
      {/* Animated Favorite Icon */}
      <motion.div
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.15 }}
        onClick={onToggleFavorite}
        style={{ cursor: "pointer", display: "flex", padding: "8px", borderRadius: "50%", backgroundColor: "rgba(255, 102, 0, 0.05)" }}
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
  );
}
