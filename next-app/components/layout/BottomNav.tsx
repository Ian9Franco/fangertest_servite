import { Home as HomeIcon, Wallet, MapPin, User } from "lucide-react";

/**
 * BottomNav Component
 * Fixed bottom navigation bar with icons.
 */
export default function BottomNav() {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", zIndex: 10, maxWidth: "450px", margin: "0 auto", borderTop: "1px solid var(--border-color)" }}>
      <nav style={{ display: "flex", justifyContent: "space-around", padding: "15px 0" }}>
        {/* Home */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
          <HomeIcon size={24} color="#1A1716" />
        </div>
        
        {/* Wallet */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
          <Wallet size={24} color="#6c757d" />
        </div>
        
        {/* Location */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
          <MapPin size={24} color="#6c757d" />
        </div>
        
        {/* Profile */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
          <User size={24} color="#6c757d" />
        </div>
      </nav>
      {/* iOS Home Indicator */}
      <div style={{ width: "134px", height: "5px", backgroundColor: "#000", borderRadius: "100px", margin: "0 auto 8px" }} />
    </div>
  );
}
