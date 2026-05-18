import Image from "next/image";
import { Heart } from "lucide-react";

interface BarInfoProps {
  name: string;
  address: string;
}

/**
 * BarInfo Component
 * Displays the bar logo, name, address, and a favorite (heart) icon.
 */
export default function BarInfo({ name, address }: BarInfoProps) {
  return (
    <div className="bar-card">
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* Bar Logo / Isotype */}
        <div className="bar-logo">
          <Image 
            src="/assets/assets/images/Isotipo_Negro.png" 
            alt="Bar Logo" 
            width={40} 
            height={40}
            style={{ objectFit: "contain" }}
          />
        </div>
        
        {/* Bar Details */}
        <div className="bar-details">
          <span className="bar-name">{name}</span>
          <span className="bar-address">{address}</span>
        </div>
      </div>
      
      {/* Favorite Icon */}
      <Heart size={24} color="#FF6600" style={{ cursor: "pointer" }} />
    </div>
  );
}
