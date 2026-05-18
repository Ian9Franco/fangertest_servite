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

// Initial data for bars
const initialBarsData = [
  { 
    id: 1, 
    name: "Cervecería Blest", 
    address: "Pres. Roberto M. Ortiz 1827, Buenos Aires", 
    isFavorite: false
  },
  { 
    id: 2, 
    name: "Temple Bar", 
    address: "Echeverría 1664, Cdad. Autónoma de Buenos Aires", 
    isFavorite: false
  },
  { 
    id: 3, 
    name: "La Choppería de Palermo", 
    address: "El Salvador 4804, Cdad. Autónoma de Buenos Aires", 
    isFavorite: false
  },
];

export default function Home() {
  const [selectedTap, setSelectedTap] = useState(2);
  const [direction, setDirection] = useState(1);
  const [view, setView] = useState<'home' | 'bar'>('home'); // Default to home view
  const [bars, setBars] = useState(initialBarsData);
  const [selectedBar, setSelectedBar] = useState(initialBarsData[0]);
  
  const handleSelectTap = (id: number) => {
    if (id !== selectedTap) {
      setDirection(id > selectedTap ? 1 : -1);
      setSelectedTap(id);
    }
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to the bar
    setBars(bars.map(b => b.id === id ? { ...b, isFavorite: !b.isFavorite } : b));
  };

  const handleBarClick = (bar: typeof initialBarsData[0]) => {
    setSelectedBar(bar);
    setView('bar');
  };

  const selectedDrink = drinksData.find(d => d.id === selectedTap) || drinksData[1];

  if (view === 'home') {
    return (
      <div className="app-container" style={{ paddingBottom: "80px" }}>
        <Header onBack={() => {}} hideBack={true} />
        <main className="content">
          
          {/* User Profile Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ width: "60px", height: "60px", backgroundColor: "#1A1716", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ width: "24px", height: "24px", backgroundColor: "#fff", borderRadius: "50%", transform: "translateY(-5px)" }}></div>
              <div style={{ width: "40px", height: "20px", backgroundColor: "#fff", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", position: "absolute", transform: "translateY(15px)" }}></div>
            </div>
            <div>
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Hola!</div>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>Sofia</div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ display: "flex", alignItems: "center", backgroundColor: "#e9ecef", padding: "12px 15px", borderRadius: "20px", gap: "10px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscá tu bar" style={{ border: "none", backgroundColor: "transparent", outline: "none", fontSize: "14px", width: "100%", fontWeight: "bold" }} />
          </div>

          <h2 className="section-title">Bares</h2>

          {/* Filter Chips */}
          <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "5px", scrollbarWidth: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#1A1716", color: "#fff", padding: "10px 15px", borderRadius: "20px", fontWeight: "bold", fontSize: "14px", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Cercanos
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#FF6600", color: "#fff", padding: "10px 15px", borderRadius: "20px", fontWeight: "bold", fontSize: "14px", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              Favoritos
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#FFBF00", color: "#1A1716", padding: "10px 15px", borderRadius: "20px", fontWeight: "bold", fontSize: "14px", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg>
              Saldo
            </div>
          </div>

          {/* Bar List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {bars.map(bar => (
              <div 
                key={bar.id}
                onClick={() => handleBarClick(bar)} // Set selected bar and navigate
                style={{ backgroundColor: "#e9ecef", padding: "15px", borderRadius: "15px", cursor: "pointer", position: "relative" }}
              >
                {/* Favorite Heart Icon */}
                <div 
                  style={{ position: "absolute", top: "15px", right: "15px", cursor: "pointer" }}
                  onClick={(e) => toggleFavorite(bar.id, e)}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill={bar.isFavorite ? "#FF6600" : "none"} 
                    stroke="#FF6600" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  {/* Bar Logo Mockup */}
                  <div style={{ width: "50px", height: "50px", borderRadius: "10px", overflow: "hidden" }}>
                    <img src="/images/bar_logo_mockup.png" width="50" height="50" alt="Logo" style={{ objectFit: "cover" }} />
                  </div>
                  
                  {/* Bar Info */}
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>{bar.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{bar.address}</div>
                    <div style={{ color: "#FF6600", fontWeight: "bold", fontSize: "13px", marginTop: "5px" }}>Saldo: $0</div>
                  </div>
                </div>
              </div>
            ))}
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
        {/* Pass dynamic name and address from selectedBar */}
        <BarInfo name={selectedBar.name} address={selectedBar.address} />
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
