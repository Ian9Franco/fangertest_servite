import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Plus, Trash2, Check, Sparkles, Beer, Lock, SquareDashedText } from "lucide-react";

import { Bar, Drink, initialBarsData } from "../../data/mockData";

interface LocationTabProps {
  currentUser: string | null;
  bars: Bar[];
  setBars: React.Dispatch<React.SetStateAction<Bar[]>>;
  setSelectedBarId: (id: number | null) => void;
  setTab: (tab: 'home' | 'wallet' | 'location' | 'profile') => void;
  pageVariants: any;
}

/**
 * LocationTab Component
 * Renders a real-world fully interactive Buenos Aires map,
 * complete with advanced drawers to manage both breweries and individual taps dynamically.
 */
export default function LocationTab({
  currentUser,
  bars,
  setBars,
  setSelectedBarId,
  setTab,
  pageVariants
}: LocationTabProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const isAdmin = currentUser === "sofia";

  // Form states for adding a new brewery
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newDistance, setNewDistance] = useState("300m");
  const [newLat, setNewLat] = useState("-34.5880");
  const [newLng, setNewLng] = useState("-58.4120");
  const [newMultiplier, setNewMultiplier] = useState("1.0");
  const [newLogo, setNewLogo] = useState("/assets/breweries/blest.png");
  
  // Form states for adding a new tap/canilla
  const [selectedAdminBarId, setSelectedAdminBarId] = useState<number>(bars[0]?.id || 1);
  const [newTapName, setNewTapName] = useState("");
  const [newTapPrice, setNewTapPrice] = useState("450");
  const [newTapType, setNewTapType] = useState("SESSION IPA");
  const [newTapAlc, setNewTapAlc] = useState("5.0%");
  const [newTapIbu, setNewTapIbu] = useState("25");
  const [newTapColor, setNewTapColor] = useState("#ff9800");

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Sync chosen admin bar when bars load
  useEffect(() => {
    if (bars.length > 0 && !bars.some(b => b.id === selectedAdminBarId)) {
      setSelectedAdminBarId(bars[0].id);
    }
  }, [bars, selectedAdminBarId]);

  useEffect(() => {
    // 1. Prevent running during Next.js server-side pre-render
    if (typeof window === "undefined") return;

    // 2. Inject Leaflet CDN CSS stylesheet if not present
    const cssId = "leaflet-cdn-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // 3. Dynamic initialization logic
    const scriptId = "leaflet-cdn-js";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initLeafletMap = () => {
      const L = (window as any).L;
      if (!L || !document.getElementById("map-element")) return;

      // Clean existing instance to avoid "Map container already initialized" errors
      if ((window as any).mapInstance) {
        (window as any).mapInstance.remove();
      }

      // Initial center centered on Buenos Aires, Argentina
      const map = L.map("map-element", {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true
      }).setView([-34.5780, -58.4200], 13);

      (window as any).mapInstance = map;

      // Inject beautiful warm cream tiles from CartoDB Voyager to match design
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19
      }).addTo(map);

      // Custom pulsing gold-orange marker icon
      const customIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;">
            <div style="position: absolute; width: 24px; height: 24px; background-color: rgba(255, 102, 0, 0.35); border-radius: 50%; animation: ping 1.5s infinite; top: 0; left: 0;"></div>
            <div style="width: 12px; height: 12px; background-color: #FF6600; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.25); z-index: 2;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      // Draw active bars coordinates dynamically on the map
      bars.forEach(bar => {
        if (!bar.lat || !bar.lng) return;

        const marker = L.marker([bar.lat, bar.lng], { icon: customIcon }).addTo(map);

        // Bind interactive stylized popup
        marker.bindPopup(`
          <div style="font-family: var(--font-family-title); font-size: 12px; color: #1A1716; font-weight: bold; text-align: center; padding: 2px;">
            ${bar.name}
            <div style="font-size: 9px; color: #FF6600; font-weight: normal; margin-top: 3px; font-family: var(--font-family-body);">Ver canillas disponibles →</div>
          </div>
        `);

        // Clicking marker selects the bar and takes user to canilla drawer
        marker.on("click", () => {
          setSelectedBarId(bar.id);
          setTab("home");
        });
      });
    };

    // 4. Inject Leaflet JS script and trigger load
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initLeafletMap;
      document.body.appendChild(script);
    } else {
      if ((window as any).L) {
        initLeafletMap();
      } else {
        script.addEventListener("load", initLeafletMap);
      }
    }
  }, [bars, setSelectedBarId, setTab]);

  // Focus and fly camera on bar card click
  const handleFocusBar = (bar: Bar) => {
    const map = (window as any).mapInstance;
    if (map && bar.lat && bar.lng) {
      map.flyTo([bar.lat, bar.lng], 15.5, {
        animate: true,
        duration: 1.2
      });
    }
  };

  // Add a new brewery
  const handleAddBar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    if (!newName.trim() || !newAddress.trim()) return;

    const nextId = bars.length > 0 ? Math.max(...bars.map(b => b.id)) + 1 : 1;
    const multiplier = parseFloat(newMultiplier) || 1.0;
    const latNum = parseFloat(newLat) || -34.5800;
    const lngNum = parseFloat(newLng) || -58.4200;

    const newBar: Bar = {
      id: nextId,
      name: newName,
      address: newAddress,
      isFavorite: false,
      balance: 0,
      logo: newLogo,
      distance: newDistance,
      lat: latNum,
      lng: lngNum,
      tapValueMultiplier: multiplier,
      taps: [
        {
          id: nextId * 100 + 1,
          name: "Bambú Ipa",
          price: "500",
          img: "/assets/drinks/bambu_ipa.png",
          tag: "Canilla 1",
          vol: "100ml",
          alc: "5%",
          ibu: "35",
          type: "SESSION IPA",
          color: "#ff9800"
        }
      ] // Give it at least 1 default tap to keep it fully operational!
    };

    setBars(prev => [...prev, newBar]);

    // Reset Form
    setNewName("");
    setNewAddress("");
    setNewDistance("300m");
    setNewMultiplier("1.0");

    // Show visual confirmation toast
    setToastMessage("¡Cervecería agregada con éxito!");
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);

    // Pan map to new brewery automatically
    setTimeout(() => {
      const map = (window as any).mapInstance;
      if (map) {
        map.flyTo([latNum, lngNum], 16, { animate: true, duration: 1.0 });
      }
    }, 200);
  };

  // Delete a brewery
  const handleDeleteBar = (id: number) => {
    if (!isAdmin) return;
    setBars(prev => prev.filter(b => b.id !== id));
    // If the active bar was deleted, reset selection
    setSelectedBarId(null);
  };

  // Add a new Tap/Canilla to the selected bar
  const handleAddTap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    if (!newTapName.trim()) return;

    // Find max id among all taps inside all bars to make a unique ID
    const allTaps = bars.flatMap(b => b.taps || []);
    const nextTapId = allTaps.length > 0 ? Math.max(...allTaps.map(t => t.id)) + 1 : 901;

    setBars(prev => prev.map(bar => {
      if (bar.id === selectedAdminBarId) {
        const currentTaps = bar.taps || [];
        const newTap: Drink = {
          id: nextTapId,
          name: newTapName,
          price: newTapPrice,
          img: newTapType.toLowerCase().includes("ipa") ? "/assets/drinks/bambu_ipa.png" : newTapType.toLowerCase().includes("pilsner") ? "/assets/drinks/bambu_pilsner.png" : "/assets/drinks/scottish_bambu.png",
          tag: `Canilla ${currentTaps.length + 1}`,
          vol: "100ml",
          alc: newTapAlc,
          ibu: newTapIbu,
          type: newTapType,
          color: newTapColor
        };
        return {
          ...bar,
          taps: [...currentTaps, newTap]
        };
      }
      return bar;
    }));

    setNewTapName("");
    setToastMessage("¡Canilla agregada con éxito!");
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  // Delete a Tap/Canilla and reindex tags sequentially
  const handleDeleteTap = (barId: number, tapId: number) => {
    if (!isAdmin) return;
    setBars(prev => prev.map(bar => {
      if (bar.id === barId) {
        const filtered = bar.taps.filter(t => t.id !== tapId);
        // Automatically reindex tag indexes sequentially so they read Canilla 1, Canilla 2, etc.
        const cleanTaps = filtered.map((t, idx) => ({
          ...t,
          tag: `Canilla ${idx + 1}`
        }));
        return {
          ...bar,
          taps: cleanTaps
        };
      }
      return bar;
    }));
  };

  // Pre-fill location presets for Buenos Aires neighborhood hubs
  const applyPresetLocation = (preset: 'palermo' | 'recoleta' | 'belgrano') => {
    if (preset === 'palermo') {
      setNewLat("-34.5855");
      setNewLng("-58.4290");
      setNewAddress("Honduras 4910, Palermo, Buenos Aires");
    } else if (preset === 'recoleta') {
      setNewLat("-34.5885");
      setNewLng("-58.3920");
      setNewAddress("Junín 1740, Recoleta, Buenos Aires");
    } else if (preset === 'belgrano') {
      setNewLat("-34.5620");
      setNewLng("-58.4560");
      setNewAddress("Juramento 2100, Belgrano, Buenos Aires");
    }
  };

  // Pre-fill tap presets
  const applyTapPreset = (preset: 'honey' | 'stout' | 'ipa') => {
    if (preset === 'honey') {
      setNewTapName("Honey Craft");
      setNewTapPrice("450");
      setNewTapType("HONEY ALE");
      setNewTapAlc("6.0%");
      setNewTapIbu("12");
      setNewTapColor("#ffc107");
    } else if (preset === 'stout') {
      setNewTapName("Cream Stout");
      setNewTapPrice("480");
      setNewTapType("DRY STOUT");
      setNewTapAlc("5.5%");
      setNewTapIbu("25");
      setNewTapColor("#212529");
    } else if (preset === 'ipa') {
      setNewTapName("Wolf Red IPA");
      setNewTapPrice("520");
      setNewTapType("RED IPA");
      setNewTapAlc("6.2%");
      setNewTapIbu("40");
      setNewTapColor("#dc3545");
    }
  };

  const currentAdminBar = bars.find(b => b.id === selectedAdminBarId);

  return (
    <motion.div
      key="tab-location"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ display: "flex", flexDirection: "column", gap: "var(--section-gap)" }}
    >
      <style>{`
        /* Overwrite Leaflet popup wrappers to fit theme */
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          background-color: var(--bg-color) !important;
          border: 1.5px solid var(--border-color) !important;
          box-shadow: 0 4px 15px rgba(26,23,22,0.15) !important;
          padding: 2px !important;
        }
        .leaflet-popup-tip {
          background-color: var(--bg-color) !important;
          border: 1.5px solid var(--border-color) !important;
          box-shadow: none !important;
        }
        .leaflet-popup-content {
          margin: 10px 14px !important;
          color: var(--text-primary) !important;
        }
      `}</style>

      {/* Floating Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "var(--success-color)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "30px",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12.5px",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(40,167,69,0.3)"
            }}
          >
            <Check size={16} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="section-title">Mapa de Canillas</h2>
        {isAdmin && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontWeight: "bold",
              color: isAdminOpen ? "#FF6600" : "var(--text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "8px",
              backgroundColor: isAdminOpen ? "rgba(255,102,0,0.08)" : "transparent",
              transition: "all 0.2s"
            }}
          >
            <SquareDashedText size={14} />
            {isAdminOpen ? "Cerrar Panel" : "Administrar Bares/Canillas"}
          </motion.button>
        )}
      </div>
      
      {/* Container holding the Leaflet Map Engine */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          height: "230px",
          backgroundColor: "#F2EFE9",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          border: "2.5px solid var(--border-color)",
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.04)",
          zIndex: 1,
          transition: "border-color 0.3s ease"
        }}
      >
        <div id="map-element" style={{ width: "100%", height: "100%" }} />
      </motion.div>

      {/* Admin Panel Drawer */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              backgroundColor: "var(--card-bg)",
              borderRadius: "20px",
              border: "1.5px solid var(--border-color)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
            }}
          >
            {/* SUB-SECTION 1: BREWERY MANAGER */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={16} color="#FF6600" />
                <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text-primary)", fontFamily: "var(--font-family-title)" }}>
                  Agregar Nueva Cervecería
                </h3>
              </div>

              <form onSubmit={handleAddBar} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Presets Location Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "4px", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text-secondary)" }}>Presets:</span>
                  <button type="button" onClick={() => applyPresetLocation('palermo')} className="preset-badge">Palermo</button>
                  <button type="button" onClick={() => applyPresetLocation('recoleta')} className="preset-badge">Recoleta</button>
                  <button type="button" onClick={() => applyPresetLocation('belgrano')} className="preset-badge">Belgrano</button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Nombre del Bar</label>
                    <input 
                      type="text" 
                      placeholder="Patagonia Craft"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      style={{ width: "100%", padding: "8px 12px", fontSize: "12px", borderRadius: "8px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--app-bg)", color: "var(--text-primary)" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Distancia</label>
                    <input 
                      type="text" 
                      placeholder="400m"
                      value={newDistance}
                      onChange={(e) => setNewDistance(e.target.value)}
                      required
                      style={{ width: "100%", padding: "8px 12px", fontSize: "12px", borderRadius: "8px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--app-bg)", color: "var(--text-primary)" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Dirección Postal</label>
                  <input 
                    type="text" 
                    placeholder="Honduras 4910, Buenos Aires"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    required
                    style={{ width: "100%", padding: "8px 12px", fontSize: "12px", borderRadius: "8px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--app-bg)", color: "var(--text-primary)" }}
                  />
                </div>

                <div className="admin-input-row-3">
                  <div>
                    <label style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Latitud</label>
                    <input 
                      type="text" 
                      value={newLat}
                      onChange={(e) => setNewLat(e.target.value)}
                      required
                      style={{ width: "100%", padding: "8px 12px", fontSize: "12px", borderRadius: "8px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--app-bg)", color: "var(--text-primary)" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Longitud</label>
                    <input 
                      type="text" 
                      value={newLng}
                      onChange={(e) => setNewLng(e.target.value)}
                      required
                      style={{ width: "100%", padding: "8px 12px", fontSize: "12px", borderRadius: "8px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--app-bg)", color: "var(--text-primary)" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Precio Canilla (x1.0)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0.5"
                      max="2.0"
                      value={newMultiplier}
                      onChange={(e) => setNewMultiplier(e.target.value)}
                      required
                      style={{ width: "100%", padding: "8px 12px", fontSize: "12px", borderRadius: "8px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--app-bg)", color: "var(--text-primary)" }}
                    />
                  </div>
                </div>

                {/* Logo presets selector */}
                <div>
                  <label style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Logo de la Cervecería</label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {[
                      { path: "/assets/breweries/blest.png", name: "Blest" },
                      { path: "/assets/breweries/temple.png", name: "Temple" },
                      { path: "/assets/breweries/choperia_palermo.jpg", name: "Palermo" },
                      { path: "/assets/brand/Isotipo_Negro.png", name: "Servite" }
                    ].map((logoPreset) => (
                      <button
                        key={logoPreset.path}
                        type="button"
                        onClick={() => setNewLogo(logoPreset.path)}
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "8px",
                          border: newLogo === logoPreset.path ? "2.5px solid #FF6600" : "1.5px solid var(--border-color)",
                          padding: logoPreset.path.toLowerCase().includes(".jpg") ? "0" : "2px",
                          cursor: "pointer",
                          overflow: "hidden",
                          backgroundColor: logoPreset.path.toLowerCase().includes("negro") ? "#fff" : "#1A1716",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "all 0.2s"
                        }}
                      >
                        <img src={logoPreset.path} alt={logoPreset.name} style={{ width: "100%", height: "100%", objectFit: logoPreset.path.toLowerCase().includes(".jpg") ? "cover" : "contain" }} />
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: "#FF6600",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <Plus size={16} />
                  Agregar Cervecería
                </motion.button>
              </form>
            </div>

            {/* SUB-SECTION 2: DYNAMIC TAP MANAGER */}
            <div style={{ borderTop: "1.5px solid var(--border-color)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Beer size={16} color="#FFBF00" />
                <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text-primary)", fontFamily: "var(--font-family-title)" }}>
                  Administrar Canillas del Bar
                </h3>
              </div>

              {/* Bar Selector Dropdown */}
              <div>
                <label style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Seleccionar Bar a Configurar:</label>
                <select
                  value={selectedAdminBarId}
                  onChange={(e) => setSelectedAdminBarId(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1.5px solid var(--border-color)",
                    backgroundColor: "var(--app-bg)",
                    color: "var(--text-primary)",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  {bars.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Add Faucet Form */}
              {currentAdminBar && (
                <form onSubmit={handleAddTap} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "12px", borderRadius: "12px", backgroundColor: "var(--app-bg)", border: "1.5px solid var(--border-color)" }}>
                  <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text-primary)" }}>Nueva Canilla para {currentAdminBar.name}:</span>

                  {/* Faucet Presets */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "10px", fontWeight: "bold", color: "var(--text-secondary)" }}>Presets Canilla:</span>
                    <button type="button" onClick={() => applyTapPreset('honey')} className="preset-badge" style={{ display: "flex", alignItems: "center", gap: "4px" }}><Beer size={10} /> Honey Ale</button>
                    <button type="button" onClick={() => applyTapPreset('stout')} className="preset-badge" style={{ display: "flex", alignItems: "center", gap: "4px" }}><Beer size={10} /> Dry Stout</button>
                    <button type="button" onClick={() => applyTapPreset('ipa')} className="preset-badge" style={{ display: "flex", alignItems: "center", gap: "4px" }}><Beer size={10} /> Red IPA</button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "8px" }}>
                    <div>
                      <label style={{ fontSize: "9px", color: "var(--text-secondary)" }}>Nombre Cerveza</label>
                      <input 
                        type="text" 
                        placeholder="Patagonia Honey"
                        value={newTapName}
                        onChange={(e) => setNewTapName(e.target.value)}
                        required
                        style={{ width: "100%", padding: "6px 8px", fontSize: "11px", borderRadius: "6px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--card-bg)", color: "var(--text-primary)" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "9px", color: "var(--text-secondary)" }}>Precio base ($)</label>
                      <input 
                        type="text" 
                        placeholder="450"
                        value={newTapPrice}
                        onChange={(e) => setNewTapPrice(e.target.value)}
                        required
                        style={{ width: "100%", padding: "6px 8px", fontSize: "11px", borderRadius: "6px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--card-bg)", color: "var(--text-primary)" }}
                      />
                    </div>
                  </div>

                  <div className="admin-input-row-taps">
                    <div>
                      <label style={{ fontSize: "9px", color: "var(--text-secondary)" }}>Estilo/Tipo</label>
                      <input 
                        type="text" 
                        placeholder="HONEY ALE"
                        value={newTapType}
                        onChange={(e) => setNewTapType(e.target.value)}
                        required
                        style={{ width: "100%", padding: "6px 8px", fontSize: "11px", borderRadius: "6px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--card-bg)", color: "var(--text-primary)" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "9px", color: "var(--text-secondary)" }}>Alcohol %</label>
                      <input 
                        type="text" 
                        placeholder="5.5%"
                        value={newTapAlc}
                        onChange={(e) => setNewTapAlc(e.target.value)}
                        required
                        style={{ width: "100%", padding: "6px 8px", fontSize: "11px", borderRadius: "6px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--card-bg)", color: "var(--text-primary)" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "9px", color: "var(--text-secondary)" }}>IBU</label>
                      <input 
                        type="text" 
                        placeholder="15"
                        value={newTapIbu}
                        onChange={(e) => setNewTapIbu(e.target.value)}
                        required
                        style={{ width: "100%", padding: "6px 8px", fontSize: "11px", borderRadius: "6px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--card-bg)", color: "var(--text-primary)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "8px" }}>
                    <div>
                      <label style={{ fontSize: "9px", color: "var(--text-secondary)" }}>Color Visual</label>
                      <input 
                        type="color" 
                        value={newTapColor}
                        onChange={(e) => setNewTapColor(e.target.value)}
                        style={{ width: "100%", height: "28px", padding: "2px", borderRadius: "6px", border: "1.5px solid var(--border-color)", backgroundColor: "var(--card-bg)", cursor: "pointer" }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      style={{
                        alignSelf: "flex-end",
                        backgroundColor: "#FFBF00",
                        color: "#1A1716",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: "bold",
                        fontSize: "11px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <Plus size={14} />
                      Agregar Canilla
                    </motion.button>
                  </div>
                </form>
              )}

              {/* List of current taps for active admin bar */}
              {currentAdminBar && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "bold", color: "var(--text-secondary)" }}>
                    Canillas Activas en {currentAdminBar.name} (Total: {currentAdminBar.taps?.length || 0}):
                  </span>
                  {(!currentAdminBar.taps || currentAdminBar.taps.length === 0) ? (
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontStyle: "italic", textAlign: "center", padding: "8px" }}>Sin canillas vinculadas.</span>
                  ) : (
                    currentAdminBar.taps.map((tap) => (
                      <div
                        key={tap.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "var(--card-bg)",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          border: "1px solid var(--border-color)"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "8px", height: "8px", backgroundColor: tap.color, borderRadius: "50%" }}></div>
                          <span style={{ fontSize: "11.5px", color: "var(--text-primary)", fontWeight: "bold" }}>
                            {tap.tag}: {tap.name}
                          </span>
                          <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>
                            (${Math.round(Number(tap.price) * currentAdminBar.tapValueMultiplier)})
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteTap(currentAdminBar.id, tap.id)}
                          style={{
                            border: "none",
                            background: "none",
                            color: "#DC3545",
                            cursor: "pointer",
                            padding: "2px",
                            display: "flex",
                            alignItems: "center"
                          }}
                          title="Eliminar Canilla"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* SUB-SECTION 3: DELETE BREWERY */}
            <div style={{ borderTop: "1.5px solid var(--border-color)", paddingTop: "12px", marginTop: "4px" }}>
              <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                Eliminar Cervecerías Existentes:
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {bars.map((bar) => (
                  <div
                    key={bar.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "var(--app-bg)",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      border: "1.5px solid var(--border-color)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "4px", overflow: "hidden", backgroundColor: bar.logo.toLowerCase().includes("negro") ? "#fff" : "#1A1716", border: bar.logo.toLowerCase().includes("negro") ? "1px solid var(--border-color)" : "1px solid #2A2625" }}>
                        <img src={bar.logo} alt="Bar Logo" style={{ width: "100%", height: "100%", objectFit: bar.logo.toLowerCase().includes(".jpg") ? "cover" : "contain", padding: bar.logo.toLowerCase().includes(".jpg") ? "0" : "2px" }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--text-primary)" }}>{bar.name}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteBar(bar.id)}
                      style={{
                        border: "none",
                        background: "none",
                        color: "#DC3545",
                        cursor: "pointer",
                        padding: "4px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center"
                      }}
                      disabled={bars.length <= 1} // Keep at least one brewery active
                      title={bars.length <= 1 ? "Debe quedar al menos una cervecería" : "Eliminar Bar"}
                    >
                      <Trash2 size={15} style={{ opacity: bars.length <= 1 ? 0.3 : 1 }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FACTORY RESET BUTTON */}
            <div style={{ borderTop: "1.5px solid var(--border-color)", paddingTop: "12px", marginTop: "4px" }}>
              <button
                type="button"
                onClick={() => {
                  if (!isAdmin) return;
                  setBars(initialBarsData);
                  localStorage.setItem("servite_bars", JSON.stringify(initialBarsData));
                  setToastMessage("¡Base de datos restaurada de fábrica! ⚡");
                  setShowSuccessToast(true);
                  setTimeout(() => setShowSuccessToast(false), 2000);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1.5px dashed #DC3545",
                  backgroundColor: "rgba(220, 53, 69, 0.05)",
                  color: "#DC3545",
                  fontWeight: "bold",
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                ⚠️ Restablecer Cervecerías de Fábrica
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Nearby Bar List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <span className="section-title">Bares Cercanos</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {bars.map(bar => (
            <motion.div 
              key={bar.id}
              whileHover={{ x: 2, borderColor: "#FF6600" }}
              onClick={() => handleFocusBar(bar)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "var(--bg-color)",
                border: "1.5px solid var(--border-color)",
                padding: "14px 18px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.01)",
                transition: "all 0.2s",
                gap: "10px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0, flex: 1 }}>
                {/* Logo badge in list */}
                <div style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "10px", 
                  overflow: "hidden", 
                  backgroundColor: bar.logo.toLowerCase().includes("negro") ? "#fff" : "#1A1716",
                  border: bar.logo.toLowerCase().includes("negro") ? "1.5px solid var(--border-color)" : "1.5px solid #2A2625",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <img src={bar.logo} alt="" style={{ width: "100%", height: "100%", objectFit: bar.logo.toLowerCase().includes(".jpg") ? "cover" : "contain", padding: bar.logo.toLowerCase().includes(".jpg") ? "0" : "3px" }} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: "14px", color: "var(--text-primary)", fontFamily: "var(--font-family-title)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{bar.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{bar.address}</div>
                </div>
              </div>
 
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                <span style={{ fontSize: "11px", color: "#FF6600", fontWeight: "800" }}>{bar.distance}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid double flyTo zoom trigger
                    setSelectedBarId(bar.id);
                    setTab('home');
                  }}
                  style={{ 
                    fontSize: "10px", 
                    color: "var(--text-secondary)", 
                    fontWeight: "bold",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    whiteSpace: "nowrap"
                  }}
                >
                  Ver canillas ({bar.taps?.length || 0}) →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
