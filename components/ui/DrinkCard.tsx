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
}

interface DrinkCardProps {
  drink: Drink;
  direction?: number;
  barBalance: number;
  onServe: (totalCost: number, quantity: number, drinkName: string) => void;
  onAddFunds: (amount: number) => void;
  multiplier?: number; // Dynamic price multiplier prop
  isMinor?: boolean; // Underage blocker flag
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

export default function DrinkCard({ drink, direction = 1, barBalance, onServe, onAddFunds, multiplier = 1.0, isMinor = false }: DrinkCardProps) {
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
          backgroundColor: "var(--app-bg)", 
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
        backgroundColor: "var(--app-bg)", 
        padding: "18px", 
        borderRadius: "18px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "14px",
        position: "relative",
        boxShadow: "0 4px 15px rgba(0,0,0,0.01)",
        border: "1.5px solid var(--border-color)",
        transition: "background-color 0.3s ease, border-color 0.3s ease"
      }}
    >
      <div className="drink-main" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="drink-left" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <div className="drink-img-container" style={{ position: "relative", width: "60px", height: "60px", backgroundColor: "var(--bg-color)", borderRadius: "50%", padding: "5px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "background-color 0.3s ease" }}>
            <Image 
              src={drink.img} 
              alt={drink.name} 
              fill
              style={{ objectFit: "contain", borderRadius: "50%" }}
            />
          </div>
          
          <div className="drink-info" style={{ display: "flex", flexDirection: "column" }}>
            <span className="drink-tag" style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: "bold" }}>{drink.tag} • {drink.name}</span>
            <div className="drink-stats" style={{ marginTop: "4px", display: "flex", gap: "10px", fontSize: "11px", color: "var(--text-secondary)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "2px" }}><Percent size={11} /> ALC {drink.alc}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                {drink.id === 4 ? <Leaf size={11} /> : <Beer size={11} />}
                {drink.ibu === "Hierbas" ? " " : " IBU "}{drink.ibu}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "4px" }}>
              <div style={{ width: "8px", height: "8px", backgroundColor: drink.color, borderRadius: "50%" }}></div>
              <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: "bold" }}>{drink.type}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div className="drink-price" style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-primary)", transition: "color 0.3s ease" }}>${priceNum}</div>
          <span style={{ fontSize: "9px", color: "var(--text-secondary)", fontWeight: "bold", textTransform: "uppercase" }}>Por Pinta</span>
        </div>
      </div>

      {/* Dynamic Quantity Selector Block */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        backgroundColor: "var(--bg-color)", 
        padding: "10px 14px", 
        borderRadius: "14px",
        border: "1.5px solid var(--border-color)",
        transition: "background-color 0.3s ease, border-color 0.3s ease"
      }}>
        <span style={{ fontSize: "12.5px", fontWeight: "bold", color: "var(--text-primary)", transition: "color 0.3s ease" }}>Cantidad a servir:</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleDecrement}
            style={{ 
              width: "28px", 
              height: "28px", 
              borderRadius: "50%", 
              border: "1.5px solid var(--border-color)", 
              backgroundColor: "var(--app-bg)", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              cursor: "pointer",
              transition: "background-color 0.3s ease, border-color 0.3s ease"
            }}
          >
            <Minus size={14} color="var(--text-primary)" style={{ transition: "color 0.3s ease" }} />
          </motion.button>
          
          <span style={{ fontSize: "15px", fontWeight: "800", color: "#FF6600", minWidth: "20px", textAlign: "center" }}>
            {quantity}
          </span>

          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleIncrement}
            style={{ 
              width: "28px", 
              height: "28px", 
              borderRadius: "50%", 
              border: "1.5px solid var(--border-color)", 
              backgroundColor: "var(--app-bg)", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              cursor: "pointer",
              transition: "background-color 0.3s ease, border-color 0.3s ease"
            }}
          >
            <Plus size={14} color="var(--text-primary)" style={{ transition: "color 0.3s ease" }} />
          </motion.button>
        </div>
      </div>

      {/* Cost and CTA Block */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
        {/* Total Cost Calculation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "bold" }}>Total a descontar:</span>
          <span style={{ fontSize: "16px", fontWeight: "900", color: "var(--text-primary)", transition: "color 0.3s ease" }}>${totalCost}</span>
        </div>

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
                  boxShadow: "0 2px 8px rgba(255, 102, 0, 0.15)"
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
            padding: "15px",
            borderRadius: "12px",
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
            boxShadow: isInsufficient ? "0 4px 12px rgba(220, 53, 69, 0.15)" : "0 4px 12px rgba(26,23,22,0.12)",
            transition: "background-color 0.2s, color 0.3s ease"
          }}
        >
          {isInsufficient ? (
            <>🚫 Saldo Insuficiente</>
          ) : (
            <>🍺 Servir {quantity} Pinta{quantity > 1 ? "s" : ""}</>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
