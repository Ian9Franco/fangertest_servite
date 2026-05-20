import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import PromoBadgeIcon from "./PromoBadgeIcon";

interface BarInfoProps {
  name: string;
  address: string;
  isFavorite: boolean;
  logo?: string;
  onToggleFavorite: (e: React.MouseEvent) => void;
  theme?: 'light' | 'dark';
  hasPromo?: boolean;
  promoText?: string;
  onEditPromo?: () => void;
}

/**
 * BarInfo Component
 * Displays the bar logo, name, address, and an animated favorite (heart) icon.
 *
 * ─── PARA AGREGAR / EDITAR PROMOCIONES ───────────────────────────────────────
 * Editá el archivo:  data/breweries.json
 *   → "hasPromo": true          (activa el banner y el ícono amarillo)
 *   → "promoText": "Tu texto"   (texto que aparece en el banner)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function BarInfo({ 
  name, 
  address, 
  isFavorite, 
  logo, 
  onToggleFavorite, 
  theme = 'light',
  hasPromo = false,
  promoText = "",
  onEditPromo
}: BarInfoProps) {
  const displayLogo = logo || (theme === "dark" ? "/assets/brand/Isotipo_Blanco.png" : "/assets/brand/Isotipo_Negro.png");
  
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

          {/* ── Botón Promo ─────────────────────────────────────────────────
              Amarillo cuando hay promo activa, gris cuando no hay.
              Al hacer click → abre el modal para editar la promo (onEditPromo).
              ──────────────────────────────────────────────────────────────── */}
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={onEditPromo}
            style={{ 
              cursor: "pointer", 
              display: "flex", 
              padding: "5px", 
              borderRadius: "50%", 
              border: hasPromo ? "none" : "1.5px solid var(--border-color)",
              backgroundColor: "transparent",
            }}
            title={hasPromo ? "Editar promoción" : "Agregar promoción"}
          >
            <PromoBadgeIcon
              size={22}
              fillColor={hasPromo ? "#FFBF00" : "transparent"}
              strokeColor={hasPromo ? "none" : "var(--border-color)"}
              percentColor={hasPromo ? "#1A1716" : "var(--text-secondary)"}
            />
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

      {/* ── Promo Banner ──────────────────────────────────────────────────────
          Se muestra automáticamente si hasPromo=true y promoText tiene texto.
          Editá breweries.json para activarlo/desactivarlo por bar.
          ──────────────────────────────────────────────────────────────────── */}
      {hasPromo && promoText && (
        <div style={{
          backgroundColor: "#FFBF00",
          padding: "10px 14px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <PromoBadgeIcon
            size={20}
            fillColor="transparent"
            strokeColor="#1A1716"
            percentColor="#1A1716"
          />
          <span style={{ fontSize: "12px", color: "#1A1716", lineHeight: 1.3 }}>
            <strong>Promo del día:</strong> {promoText}
          </span>
        </div>
      )}
    </div>
  );
}
