import Image from "next/image";

interface Drink {
  id: number;
  name: string;
  tag: string;
}

interface TapsListProps {
  drinks: Drink[];
  selectedTap: number;
  onSelectTap: (id: number) => void;
}

/**
 * TapsList Component
 * Displays a horizontal list of available taps (squares).
 * Highlights the selected tap.
 */
export default function TapsList({ drinks, selectedTap, onSelectTap }: TapsListProps) {
  return (
    <>
      <div className="section-title">Canillas disponibles</div>
      
      <div className="taps-list">
        {drinks.map(drink => (
          <div 
            key={drink.id} 
            className={`tap-square ${selectedTap === drink.id ? 'active' : ''}`}
            onClick={() => onSelectTap(drink.id)}
          >
            {/* Servite Logo Icon */}
            <Image 
              src="/assets/assets/images/Isotipo_Negro.png" 
              alt="Logo" 
              width={36} 
              height={36}
              className="tap-icon"
              style={{ objectFit: "contain", marginBottom: "4px" }}
            />
            {/* Tap Tag (e.g., Canilla 1) */}
            <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{drink.tag}</span>
            {/* Drink Name */}
            <span style={{ fontSize: "12px", fontWeight: "bold" }}>{drink.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
