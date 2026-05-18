"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import BarInfo from "@/components/ui/BarInfo";
import BalanceBox from "@/components/ui/BalanceBox";
import TapsList from "@/components/ui/TapsList";
import DrinkCard from "@/components/ui/DrinkCard";
import BottomNav from "@/components/layout/BottomNav";
import { AnimatePresence, motion } from "framer-motion";

// Data for the drinks/taps
const drinksData = [
  {
    id: 1,
    name: "Bambú Ipa",
    price: "500",
    img: "/images/bambu_ipa.png",
    tag: "Canilla 1",
    vol: "100ml",
    alc: "5%",
    ibu: "35",
    type: "SESSION IPA",
    color: "#ff9800"
  },
  {
    id: 2,
    name: "Scottish BAMBU",
    price: "400",
    img: "/images/scottish_bambu.png",
    tag: "Canilla 2",
    vol: "100ml",
    alc: "5.5%",
    ibu: "9",
    type: "SCOTTISH EXPORT",
    color: "#795548"
  },
  {
    id: 3,
    name: "BAMBU Pilsner",
    price: "400",
    img: "/images/bambu_pilsner.png",
    tag: "Canilla 3",
    vol: "100ml",
    alc: "4.2%",
    ibu: "8",
    type: "CZECH PILSNER",
    color: "#ffeb3b"
  },
  {
    id: 4,
    name: "Gin Tónic",
    price: "500",
    img: "/images/gin_tonic.png",
    tag: "Canilla 4",
    vol: "100ml",
    alc: "9%",
    ibu: "Hierbas",
    type: "GIN",
    color: "#e0e0e0"
  }
];

export default function Home() {
  const [selectedTap, setSelectedTap] = useState(2);
  const [direction, setDirection] = useState(1);
  const [view, setView] = useState<'home' | 'bar'>('bar');
  
  const handleSelectTap = (id: number) => {
    if (id !== selectedTap) {
      setDirection(id > selectedTap ? 1 : -1);
      setSelectedTap(id);
    }
  };

  const selectedDrink = drinksData.find(d => d.id === selectedTap) || drinksData[1];

  if (view === 'home') {
    return (
      <div className="app-container" style={{ paddingBottom: "80px" }}>
        <Header onBack={() => {}} hideBack={true} />
        <main className="content">
          <h2 className="section-title" style={{ marginTop: "20px" }}>Bares (Perfil de Usuario)</h2>
          <div 
            onClick={() => setView('bar')}
            style={{ 
              backgroundColor: "#fff", 
              padding: "20px", 
              borderRadius: "15px", 
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              border: "1px solid var(--border-color)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img src="/assets/assets/images/Isotipo_Negro.png" width={40} height={40} alt="Logo" style={{ borderRadius: "10px", backgroundColor: "#f8f9fa", objectFit: "contain" }} />
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "16px" }}>Servite Central</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Agrelo 3040, Buenos Aires</div>
                </div>
              </div>
              <div style={{ color: "#FF6600", fontWeight: "bold", fontSize: "14px" }}>Saldo: $0</div>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="app-container" style={{ paddingBottom: "80px" }}>
      <Header onBack={() => setView('home')} hideBack={false} />

      <main className="content">
        <BarInfo name="Servite Central" address="Agrelo 3040, Buenos Aires" />
        <BalanceBox amount="$0" />
        <TapsList 
          drinks={drinksData} 
          selectedTap={selectedTap} 
          onSelectTap={handleSelectTap} 
        />
        <div style={{ position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <DrinkCard key={selectedDrink.id} drink={selectedDrink} direction={direction} />
          </AnimatePresence>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
