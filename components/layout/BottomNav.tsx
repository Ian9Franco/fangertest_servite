import { Home as HomeIcon, Wallet, MapPin, User, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: 'home' | 'wallet' | 'promotions' | 'profile';
  setActiveTab: (tab: 'home' | 'wallet' | 'promotions' | 'profile') => void;
}

/**
 * BottomNav Component
 * Fixed bottom navigation bar with fluid active-tab animations.
 */
export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Inicio', color: 'green', bg: 'rgba(0, 128, 0, 0.08)' },
    { id: 'wallet', icon: Wallet, label: 'Billetera', color: 'red', bg: 'rgba(255, 0, 0, 0.08)' },
    { id: 'promotions', icon: Tag, label: 'Promociones', color: 'blue', bg: 'rgba(0, 0, 255, 0.08)' },
    { id: 'profile', icon: User, label: 'Perfil', color: 'purple', bg: 'rgba(128, 0, 128, 0.08)' },
  ] as const;

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", zIndex: 10, maxWidth: "450px", margin: "0 auto", borderTop: "1px solid var(--border-color)" }}>
      <nav style={{ display: "flex", justifyContent: "space-around", padding: "10px 5px", position: "relative" }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "none",
                background: "transparent",
                position: "relative",
                padding: "8px 12px",
                width: "75px",
                borderRadius: "16px",
                outline: "none",
                gap: "4px",
                transition: "color 0.2s ease",
                userSelect: "none"
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: tab.bg,
                    borderRadius: "16px",
                    zIndex: 0
                  }}
                />
              )}
              
              <Icon 
                size={22} 
                color={isActive ? tab.color : "#6c757d"} 
                style={{ 
                  transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isActive ? "scale(1.12) translateY(-1px)" : "scale(1)",
                  zIndex: 1
                }} 
              />
              <span style={{ 
                fontSize: "10px", 
                fontWeight: "bold", 
                color: isActive ? tab.color : "#6c757d",
                fontFamily: "var(--font-family-body)",
                zIndex: 1,
                letterSpacing: "0.2px"
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
      {/* iOS Home Indicator */}
      <div style={{ width: "134px", height: "5px", backgroundColor: "#000", borderRadius: "100px", margin: "0 auto 8px" }} />
    </div>
  );
}
