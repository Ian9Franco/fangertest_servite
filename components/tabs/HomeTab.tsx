import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Heart, Wallet, MoreVertical, Tag, User, Map as MapIcon } from "lucide-react";
import Image from "next/image";
import PromoBadgeIcon from "../ui/PromoBadgeIcon";

interface Bar {
  id: number;
  name: string;
  address: string;
  logo: string;
  isFavorite: boolean;
  balance: number;
  distance: string;
  hasPromo?: boolean;  // ← configurar en data/breweries.json
  promoText?: string;  // ← configurar en data/breweries.json
}

interface HomeTabProps {
  currentUser: string | null;
  users: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: 'cercanos' | 'favoritos' | 'saldo' | 'promociones';
  setFilter: (filter: 'cercanos' | 'favoritos' | 'saldo' | 'promociones') => void;
  filteredBars: Bar[];
  onBarClick: (id: number) => void;
  onToggleFavorite: (id: number, e: React.MouseEvent) => void;
  pageVariants: any;
  staggerContainer: any;
  listItemVariants: any;
  setTab: (tab: 'home' | 'wallet' | 'location' | 'profile') => void;
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
  listItemVariants,
  setTab
}: HomeTabProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div style={{ position: "relative" }}>
        <div
          onClick={() => setTab('profile')}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
        >
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
              <span style={{ fontSize: "12px", color: "var(--text-primary)", fontWeight: "500" }}>Hola!</span>
              <h2 style={{ fontSize: "22px", fontWeight: "bold", fontFamily: "var(--font-family-title)" }}>{currentUser ? users[currentUser].name : 'Sofia'}</h2>
            </div>
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            style={{ padding: "8px", zIndex: 10 }}
          >
            <MoreVertical size={24} color="var(--text-primary)" />
          </div>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              style={{
                position: "absolute",
                top: "60px",
                right: "0px",
                backgroundColor: "var(--card-bg)",
                border: "1.5px solid var(--border-color)",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                minWidth: "160px"
              }}
            >
              <button onClick={() => setTab('profile')} style={{ padding: "12px 16px", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid var(--border-color)", cursor: "pointer", color: "var(--text-primary)", fontWeight: "bold", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}><User size={14} /> Mi Perfil</button>
              <button onClick={() => setTab('wallet')} style={{ padding: "12px 16px", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid var(--border-color)", cursor: "pointer", color: "var(--text-primary)", fontWeight: "bold", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}><Wallet size={14} /> Mi Billetera</button>
              <button onClick={() => setTab('location')} style={{ padding: "12px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)", fontWeight: "bold", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}><MapIcon size={14} /> Mapa de Bares</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Bar */}
      <div style={{ display: "flex", alignItems: "center", backgroundColor: "#e9ecef", padding: "12px 18px", borderRadius: "24px", gap: "12px" }}>
        <Search size={18} color="#9ca3af" />
        <input
          type="text"
          placeholder="Buscar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ border: "none", backgroundColor: "transparent", outline: "none", fontSize: "14px", width: "100%", fontWeight: "600", color: "#1A1716" }}
        />
      </div>

      {/* Main Section Toggle */}
      <div style={{ display: "flex", width: "calc(100% + 48px)", margin: "0 -24px", overflow: "hidden" }}>
        <button style={{ flex: 1, backgroundColor: "#FFBF00", padding: "10px", fontWeight: "bold", fontSize: "15px", border: "none", color: "#1A1716", cursor: "pointer" }}>Bares</button>
        <button style={{ flex: 1, backgroundColor: "#E9ECEF", padding: "10px", fontWeight: "bold", fontSize: "15px", border: "none", color: "#6c757d", cursor: "pointer" }}>Eventos</button>
      </div>

      {/* Filter Chips */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none", marginTop: "4px", justifyContent: "space-between" }}>
        {/* Cercanos */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('cercanos')}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            backgroundColor: filter === 'cercanos' ? "#1A1716" : "#E9ECEF",
            color: filter === 'cercanos' ? "#fff" : "#1A1716",
            padding: "6px 10px", borderRadius: "16px", fontWeight: "bold", fontSize: "10.5px", flexShrink: 0, border: "none", cursor: "pointer"
          }}
        >
          <MapPin size={12} /> Cercanos
        </motion.button>

        {/* Favoritos */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('favoritos')}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            backgroundColor: filter === 'favoritos' ? "#FF6600" : "#E9ECEF",
            color: filter === 'favoritos' ? "#fff" : "#1A1716",
            padding: "6px 10px", borderRadius: "16px", fontWeight: "bold", fontSize: "10.5px", flexShrink: 0, border: "none", cursor: "pointer"
          }}
        >
          <Heart size={12} fill={filter === 'favoritos' ? "#fff" : "none"} /> Favoritos
        </motion.button>

        {/* Saldo */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('saldo')}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            backgroundColor: filter === 'saldo' ? "#FFBF00" : "#E9ECEF",
            color: filter === 'saldo' ? "#1A1716" : "#1A1716",
            padding: "6px 10px", borderRadius: "16px", fontWeight: "bold", fontSize: "10.5px", flexShrink: 0, border: "none", cursor: "pointer"
          }}
        >
          <Wallet size={12} /> Saldo
        </motion.button>

        {/* Promociones */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('promociones')}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            backgroundColor: filter === 'promociones' ? "#FFBF00" : "#E9ECEF",
            color: filter === 'promociones' ? "#1A1716" : "#1A1716",
            padding: "6px 10px", borderRadius: "16px", fontWeight: "bold", fontSize: "10.5px", flexShrink: 0, border: "none", cursor: "pointer"
          }}
        >
          <Tag size={12} fill={filter === 'promociones' ? "#fff" : "none"} /> Promociones
        </motion.button>
      </div>

      {/* Bars Cards List */}
      <motion.div
        className="bars-list"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {filteredBars.length > 0 ? (
          filteredBars.map((bar) => (
            <motion.div
              key={bar.id}
              variants={listItemVariants}
              onClick={() => onBarClick(bar.id)}
              className="bar-card"
              style={{ display: "flex", gap: "16px", cursor: "pointer", position: "relative", backgroundColor: "#E9ECEF", padding: "12px", borderRadius: "12px" }}
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Heart
                  size={18}
                  fill={bar.isFavorite ? "#FF6600" : "none"}
                  color={bar.isFavorite ? "#FF6600" : "#6c757d"}
                  style={{ transition: "transform 0.15s" }}
                />
              </div>

              <div
                className="bar-logo-container"
                style={{
                  backgroundColor: bar.logo.toLowerCase().includes("negro") ? "#fff" : "#1A1716",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "60px",
                  height: "60px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `1.5px solid ${bar.logo.toLowerCase().includes("negro") ? "var(--border-color)" : "#2A2625"}`
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image
                    src={bar.logo}
                    alt={bar.name}
                    fill
                    style={{
                      objectFit: bar.logo.toLowerCase().includes(".jpg") ? "cover" : "contain",
                      padding: bar.logo.toLowerCase().includes(".jpg") ? "0" : "5px"
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

                {/* Indicador de promo activa — viene de breweries.json */}
                {/* bar.hasPromo && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                    <PromoBadgeIcon size={11} fillColor="transparent" strokeColor="#1A1716" percentColor="#1A1716" />
                    <span style={{ fontSize: "10px", color: "#9B7400", fontWeight: "700", letterSpacing: "0.2px" }}>Promo activa</span>
                  </div>
                ) */}
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
