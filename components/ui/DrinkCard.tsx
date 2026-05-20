import Image from "next/image";
import { Percent, Leaf, Beer, Plus, Minus, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Drink {
  id: number;
  name: string;
  price: string;
  img: string;
  tag: string;
  alc: string;
  ibu: string;
  type: string;
  color: string;
  logo?: string;
}

interface DrinkCardProps {
  drink: Drink;
  direction?: number;
  barBalance: number;
  onServe: (totalCost: number, quantity: number, drinkName: string) => void;
  onAddFunds: (amount: number) => void;
  multiplier?: number; // Dynamic price multiplier prop
  isMinor?: boolean; // Underage blocker flag
  theme?: 'light' | 'dark';
}

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export default function DrinkCard({ drink, direction = 1, barBalance, onServe, onAddFunds, multiplier = 1.0, isMinor = false, theme = 'light' }: DrinkCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isShaking, setIsShaking] = useState(false);

  // Apply dynamic multiplier depending on which brewery is selected
  const basePrice = Number(drink.price);
  const priceNum = Math.round(basePrice * multiplier); // Round to clean integer
  const totalCost = priceNum * quantity;
  const isInsufficient = barBalance < totalCost;
  const missingAmount = totalCost - barBalance;

  if (isMinor) {
    return (
      <motion.div 
        className="drink-card selected"
        custom={direction}
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        style={{ 
          backgroundColor: "#E9ECEF", 
          padding: "18px", 
          borderRadius: "18px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "14px",
          position: "relative",
          boxShadow: "0 4px 15px rgba(0,0,0,0.01)",
          border: "1.5px solid #dc3545", // Red border warning for minor of age!
          transition: "background-color 0.3s ease, border-color 0.3s ease"
        }}
      >
        <div className="drink-main" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="drink-left" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div className="drink-img-container" style={{ position: "relative", width: "60px", height: "60px", backgroundColor: "var(--bg-color)", borderRadius: "50%", padding: "5px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", justifyContent: "center", alignItems: "center", transition: "background-color 0.3s ease" }}>
              <span style={{ fontSize: "28px" }}>🧃</span>
            </div>
            
            <div className="drink-info" style={{ display: "flex", flexDirection: "column" }}>
              <span className="drink-tag" style={{ fontSize: "11px", color: "#dc3545", fontWeight: "bold" }}>COMPRA RESTRINGIDA</span>
              <span style={{ fontSize: "15px", fontWeight: "bold", color: "var(--text-primary)" }}>{drink.name}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ fontSize: "16px", fontWeight: "800", color: "#dc3545" }}>MENOR</div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: "rgba(220, 53, 69, 0.05)",
          border: "1.5px dashed rgba(220, 53, 69, 0.3)",
          padding: "15px",
          borderRadius: "14px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center"
        }}>
          <AlertCircle size={22} color="#dc3545" />
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "#dc3545" }}>
            Acceso Denegado a Canilla
          </span>
          <span style={{ fontSize: "11.5px", color: "var(--text-secondary)", lineHeight: "1.4" }}>
            Bajo las leyes vigentes, los menores de edad no están autorizados a servirse ni consumir bebidas alcohólicas de las canillas de Servite. ¡Disfrutá de la música y el ambiente del bar!
          </span>
        </div>

        <button 
          disabled
          style={{ 
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "none",
            fontSize: "14px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e9ecef",
            color: "#6c757d",
            cursor: "not-allowed"
          }}
        >
          🚫 Venta prohibida a menores
        </button>
      </motion.div>
    );
  }

  const handleIncrement = () => {
    if (quantity < 10) setQuantity(q => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleServeClick = () => {
    if (isInsufficient) {
      triggerShake();
    } else {
      onServe(totalCost, quantity, drink.name);
    }
  };

  return (
    <motion.div 
      className="drink-card selected"
      custom={direction}
      variants={cardVariants}
      initial="enter"
      animate={isShaking ? { x: [0, -6, 6, -6, 6, -4, 4, 0] } : "center"}
      exit="exit"
      transition={isShaking 
        ? { x: { type: "keyframes", duration: 0.4 } } 
        : { x: { type: "spring", stiffness: 350, damping: 28 }, opacity: { duration: 0.2 } }
      }
      style={{ 
        backgroundColor: "#E9ECEF", 
        padding: "18px", 
        borderRadius: "18px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "18px",
        position: "relative",
        boxShadow: "none",
        border: "1.5px solid var(--border-color)",
        transition: "background-color 0.3s ease, border-color 0.3s ease"
      }}
    >
      <div className="drink-main" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        
        {/* Left: Image & Info */}
        <div style={{ display: "flex", gap: "15px" }}>
          {/* Glass Image */}
          <div style={{ position: "relative", width: "45px", height: "85px" }}>
            <Image src={drink.img} alt={drink.name} fill style={{ objectFit: "contain" }} />
          </div>

          {/* Texts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", color: "var(--text-secondary)", fontWeight: "bold" }}>Canilla {drink.id}</span>
            <span style={{ fontSize: "16px", fontWeight: "900", color: "var(--text-primary)" }}>{drink.name}</span>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>500ml</span>
            <span style={{ fontSize: "16px", fontWeight: "900", color: "var(--text-primary)", marginTop: "12px" }}>${priceNum}</span>
          </div>
        </div>

        {/* Right: Logo & Technical Info */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
          {/* Brand Logo */}
          <div style={{ 
            width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", position: "relative", 
            display: "flex", justifyContent: "center", alignItems: "center", 
            backgroundColor: drink.logo ? "transparent" : ((theme === 'dark' ? "Blanco" : "Negro").toLowerCase().includes("negro") ? "#fff" : "#1A1716"),
            border: drink.logo ? "none" : ((theme === 'dark' ? "Blanco" : "Negro").toLowerCase().includes("negro") ? "1px solid var(--border-color)" : "1px solid #2A2625")
          }}>
             <Image src={drink.logo || (theme === 'dark' ? "/assets/brand/Isotipo_Blanco.png" : "/assets/brand/Isotipo_Negro.png")} alt="Brand" fill style={{ objectFit: drink.logo ? "cover" : "contain", padding: drink.logo ? "0px" : "4px" }} />
          </div>
          
          {/* Tech Stats List */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: "9px", color: "var(--text-secondary)", gap: "4px", fontWeight: "bold" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Percent size={9} /> ALC {drink.alc}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Leaf size={9} /> IBU {drink.ibu === "Hierbas" ? "-" : drink.ibu}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <div style={{ width: "6px", height: "6px", backgroundColor: drink.color, borderRadius: "50%" }}></div>
              {drink.type}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Block */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Insufficient Funds Auto-Reload Callout */}
        <AnimatePresence>
          {isInsufficient && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "8px", 
                backgroundColor: "rgba(255, 102, 0, 0.06)", 
                border: "1.5px dashed rgba(255, 102, 0, 0.3)", 
                borderRadius: "12px", 
                padding: "10px 12px" 
              }}
            >
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <AlertCircle size={14} color="#FF6600" />
                <span style={{ fontSize: "11px", color: "#FF6600", fontWeight: "bold" }}>Faltan ${missingAmount} en tu saldo.</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddFunds(missingAmount)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  backgroundColor: "#FF6600",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "11.5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "none"
                }}
              >
                Cargar exacto (+${missingAmount}) ⚡
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary CTA Button */}
        <motion.button 
          whileTap={{ scale: isInsufficient ? 1 : 0.98 }}
          onClick={handleServeClick}
          style={{ 
            width: "100%",
            padding: "16px",
            borderRadius: "30px", // Fully rounded pill
            border: "none",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            backgroundColor: isInsufficient ? "#dc3545" : "var(--text-primary)",
            color: "var(--bg-color)",
            boxShadow: "none",
            transition: "background-color 0.2s, color 0.3s ease"
          }}
        >
          {isInsufficient ? (
            <>🚫 Saldo Insuficiente</>
          ) : (
            <>Seleccionar</>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
