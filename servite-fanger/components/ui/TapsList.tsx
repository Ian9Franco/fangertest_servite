import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
 * Highlights the selected tap, auto-scrolls to it, and supports drag-to-scroll.
 */
export default function TapsList({ drinks, selectedTap, onSelectTap }: TapsListProps) {
  const selectedRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll to selected tap
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ 
        behavior: "smooth", 
        inline: "center", 
        block: "nearest" 
      });
    }
  }, [selectedTap]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <div className="section-title">Canillas disponibles</div>
      
      <div 
        className="taps-list"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {drinks.map(drink => (
          <div 
            key={drink.id} 
            ref={selectedTap === drink.id ? selectedRef : null}
            className={`tap-square ${selectedTap === drink.id ? 'active' : ''}`}
            onClick={() => {
              if (!isDragging) {
                onSelectTap(drink.id);
              }
            }}
          >
            {/* Servite Logo Icon - Increased size to 48 */}
            <Image 
              src="/assets/images/Isotipo_Negro.png" 
              alt="Logo" 
              width={48} 
              height={48}
              className="tap-icon"
              style={{ objectFit: "contain", marginBottom: "4px" }}
              draggable={false} // Prevent image dragging from interfering with scroll
            />
            {/* Tap Tag (e.g., Canilla 1) */}
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", userSelect: "none" }}>{drink.tag}</span>
            {/* Drink Name */}
            <span style={{ fontSize: "12px", fontWeight: "bold", userSelect: "none" }}>{drink.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
