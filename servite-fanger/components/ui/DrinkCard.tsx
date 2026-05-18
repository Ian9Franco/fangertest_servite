import Image from "next/image";
import { Percent, Leaf, Beer } from "lucide-react";
import { motion } from "framer-motion";

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
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

export default function DrinkCard({ drink, direction = 1 }: DrinkCardProps) {
  return (
    <motion.div 
      className="drink-card selected"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
      style={{ backgroundColor: "#e9ecef" }}
    >
      <div className="drink-main">
        <div className="drink-left">
          <div className="drink-img-container">
            <Image 
              src={drink.img} 
              alt={drink.name} 
              fill
              style={{ objectFit: "contain", borderRadius: "50%" }}
            />
          </div>
          
          <div className="drink-info">
            <span className="drink-tag">{drink.tag} {drink.name}</span>
            <div className="drink-stats" style={{ marginTop: "5px" }}>
              <span><Percent size={12} style={{ display: "inline", verticalAlign: "middle" }} /> ALC {drink.alc}</span>
              <span>
                {drink.id === 4 ? <Leaf size={12} style={{ display: "inline", verticalAlign: "middle" }} /> : <Beer size={12} style={{ display: "inline", verticalAlign: "middle" }} />}
                {drink.ibu === "Hierbas" ? " " : " IBU "}{drink.ibu}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}>
              <div style={{ width: "8px", height: "8px", backgroundColor: drink.color, borderRadius: "50%" }}></div>
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{drink.type}</span>
            </div>
          </div>
        </div>
        <div className="drink-price">${drink.price}</div>
      </div>
      <div className="btn-select" style={{ marginTop: "10px" }}>Servite</div>
    </motion.div>
  );
}
