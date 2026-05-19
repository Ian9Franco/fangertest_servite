import { motion } from "framer-motion";
import { Search, MapPin, Heart, Wallet } from "lucide-react";
import Image from "next/image";

interface Bar {
  id: number;
  name: string;
  address: string;
  logo: string;
  isFavorite: boolean;
  balance: number;
  distance: string;
}

interface HomeTabProps {
  currentUser: string | null;
  users: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: 'cercanos' | 'favoritos' | 'saldo';
  setFilter: (filter: 'cercanos' | 'favoritos' | 'saldo') => void;
  filteredBars: Bar[];
  onBarClick: (id: number) => void;
  onToggleFavorite: (id: number, e: React.MouseEvent) => void;
  pageVariants: any;
  staggerContainer: any;
  listItemVariants: any;
}

/**
 * HomeTab Component
 * Renders the main brewery list with greetings, search inputs, and filters.
 */
export default function HomeTab({
  currentUser,
  users,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  filteredBars,
  onBarClick,
  onToggleFavorite,
  pageVariants,
  staggerContainer,
  listItemVariants
}: HomeTabProps) {
  return (
    <motion.div
      key="tab-home"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ display: "flex", flexDirection: "column", gap: "var(--section-gap)" }}
    >
      {/* User Profile Greeting Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div style={{ position: "relative" }}>
          {/* Outer container with yellow border */}
          <div style={{ 
            width: "55px", 
            height: "55px", 
            borderRadius: "50%", 
            border: `2px solid ${currentUser ? users[currentUser].avatar.border : '#FFBF00'}`,
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            backgroundColor: "#FFF"
          }}>
            {/* Inner container with overflow: hidden */}
            <div style={{ 
              width: "100%", 
              height: "100%", 
              borderRadius: "50%", 
              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {/* CSS Avatar Shape */}
              <div style={{ width: "22px", height: "22px", backgroundColor: currentUser ? users[currentUser].avatar.head : '#FF6600', borderRadius: "50%", transform: "translateY(-4px)" }}></div>
              <div style={{ width: "36px", height: "18px", backgroundColor: currentUser ? users[currentUser].avatar.shoulders : '#1A1716', borderTopLeftRadius: "18px", borderTopRightRadius: "18px", position: "absolute", bottom: "0" }}></div>
            </div>
          </div>
          {/* Active green status indicator */}
          <span style={{ position: "absolute", bottom: "2px", right: "2px", width: "12px", height: "12px", backgroundColor: "#28a745", border: "2px solid #fff", borderRadius: "50%" }}></span>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "500" }}>¡Hola, qué bueno verte!</span>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", fontFamily: "var(--font-family-title)" }}>{currentUser ? users[currentUser].name : 'Sofia'}</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ display: "flex", alignItems: "center", backgroundColor: "#e9ecef", padding: "12px 18px", borderRadius: "20px", gap: "12px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.02)" }}>
        <Search size={18} color="#6c757d" />
        <input 
          type="text" 
          placeholder="Buscá tu bar favorito..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ border: "none", backgroundColor: "transparent", outline: "none", fontSize: "14px", width: "100%", fontWeight: "bold", color: "#1A1716" }} 
        />
      </div>

      <h2 className="section-title">Bares</h2>

      {/* Filter Chips */}
      <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
        {/* Cercanos Filter */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('cercanos')}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "6px", 
            backgroundColor: filter === 'cercanos' ? "#1A1716" : "#fff", 
            color: filter === 'cercanos' ? "#fff" : "#1A1716", 
            padding: "10px 18px", 
            borderRadius: "20px", 
            fontWeight: "bold", 
            fontSize: "13px", 
            flexShrink: 0,
            border: filter === 'cercanos' ? "none" : "2px solid #e9ecef",
            cursor: "pointer",
            boxShadow: filter === 'cercanos' ? "0 4px 10px rgba(26,23,22,0.15)" : "none"
          }}
        >
          <MapPin size={15} />
          Cercanos
        </motion.button>
        
        {/* Favoritos Filter */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('favoritos')}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "6px", 
            backgroundColor: filter === 'favoritos' ? "#FF6600" : "#fff", 
            color: filter === 'favoritos' ? "#fff" : "#1A1716", 
            padding: "10px 18px", 
            borderRadius: "20px", 
            fontWeight: "bold", 
            fontSize: "13px", 
            flexShrink: 0,
            border: filter === 'favoritos' ? "none" : "2px solid #e9ecef",
            cursor: "pointer",
            boxShadow: filter === 'favoritos' ? "0 4px 10px rgba(255,102,0,0.15)" : "none"
          }}
        >
          <Heart size={15} fill={filter === 'favoritos' ? "#fff" : "none"} />
          Favoritos
        </motion.button>
        
        {/* Saldo Filter */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('saldo')}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "6px", 
            backgroundColor: filter === 'saldo' ? "#FFBF00" : "#fff", 
            color: filter === 'saldo' ? "#1A1716" : "#1A1716", 
            padding: "10px 18px", 
            borderRadius: "20px", 
            fontWeight: "bold", 
            fontSize: "13px", 
            flexShrink: 0,
            border: filter === 'saldo' ? "none" : "2px solid #e9ecef",
            cursor: "pointer",
            boxShadow: filter === 'saldo' ? "0 4px 10px rgba(255,191,0,0.15)" : "none"
          }}
        >
          <Wallet size={15} />
          Con Saldo
        </motion.button>
      </div>

      {/* Bars Cards List */}
      <motion.div 
        className="bars-list"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {filteredBars.length > 0 ? (
          filteredBars.map((bar) => (
            <motion.div 
              key={bar.id}
              variants={listItemVariants}
              onClick={() => onBarClick(bar.id)}
              className="bar-card"
              style={{ display: "flex", gap: "16px", cursor: "pointer", position: "relative" }}
            >
              {/* Coherent Favorites Heart Icon */}
              <div 
                onClick={(e) => onToggleFavorite(bar.id, e)}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  zIndex: 2,
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.85)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  border: bar.isFavorite ? "1px solid rgba(255,102,0,0.2)" : "1px solid rgba(0,0,0,0.05)"
                }}
              >
                <Heart 
                  size={15} 
                  fill={bar.isFavorite ? "#FF6600" : "none"} 
                  color={bar.isFavorite ? "#FF6600" : "#6c757d"} 
                  style={{ transition: "transform 0.15s" }}
                />
              </div>

              {/* Logo Area */}
              <div 
                className="bar-logo-container" 
                style={{ 
                  backgroundColor: (bar.id === 1 || bar.id === 2) ? "#1A1716" : "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70px",
                  height: "70px",
                  borderRadius: "15px",
                  overflow: "hidden",
                  border: "1.5px solid #e9ecef"
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image 
                    src={bar.logo} 
                    alt={bar.name} 
                    fill 
                    style={{ 
                      objectFit: (bar.id === 1 || bar.id === 2) ? "contain" : "cover",
                      padding: (bar.id === 1 || bar.id === 2) ? "5px" : "0"
                    }} 
                  />
                </div>
              </div>
              
              {/* Bar Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: "16px", color: "#1A1716", fontFamily: "var(--font-family-title)" }}>{bar.name}</div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "230px" }}>{bar.address}</div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "6px" }}>
                  <div style={{ color: "#FF6600", fontWeight: "800", fontSize: "13px" }}>Saldo: ${bar.balance}</div>
                  <span style={{ color: "#d1d1d1", fontSize: "10px" }}>•</span>
                  <div style={{ color: "var(--text-secondary)", fontSize: "11px", display: "flex", alignItems: "center", gap: "3px" }}>
                    <MapPin size={11} /> {bar.distance}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-secondary)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
          >
            <i className="fas fa-search" style={{ fontSize: "28px", color: "#d1d1d1" }}></i>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>No se encontraron bares</span>
            <span style={{ fontSize: "12px" }}>Probá modificando los filtros de búsqueda.</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
