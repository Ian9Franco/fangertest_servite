"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import BarInfo from "@/components/ui/BarInfo";
import BalanceBox from "@/components/ui/BalanceBox";
import TapsList from "@/components/ui/TapsList";
import DrinkCard from "@/components/ui/DrinkCard";
import BottomNav from "@/components/layout/BottomNav";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import LoginView from "@/components/auth/LoginView";
import HomeTab from "@/components/tabs/HomeTab";
import WalletTab from "@/components/tabs/WalletTab";
import LocationTab from "@/components/tabs/LocationTab";
import ProfileTab from "@/components/tabs/ProfileTab";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { 
  drinksData, 
  initialBarsData, 
  usersData, 
  pageVariants, 
  staggerContainer, 
  listItemVariants 
} from "@/data/mockData";

/**
 * Main Home Entry Component
 * SERVITE FANGER Application Shell
 */
export default function Home() {
  const [currentUser, setCurrentUser] = useState<'sofia' | 'ian' | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncingType, setSyncingType] = useState<'login' | 'logout'>('login');

  const [tab, setTab] = useState<'home' | 'wallet' | 'location' | 'profile'>('home');
  const [selectedBarId, setSelectedBarId] = useState<number | null>(null);
  
  const [selectedTap, setSelectedTap] = useState(2);
  const [direction, setDirection] = useState(1);
  const [bars, setBars] = useState(initialBarsData);
  const [filter, setFilter] = useState<'cercanos' | 'favoritos' | 'saldo'>('cercanos');
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic user data and transaction states for real-time updates
  const [users, setUsers] = useState(usersData);
  const [transactions, setTransactions] = useState([
    { title: "Carga rápida", desc: "Crédito aprobado", amt: "+$1000", type: "in", date: "Hoy, 14:23" },
    { title: "Cervecería Blest", desc: "1 Pinta - Bambú Ipa", amt: "-$500", type: "out", date: "Ayer, 21:05" },
    { title: "La Choppería", desc: "1 Pinta - Pilsner", amt: "-$400", type: "out", date: "15 May, 19:40" },
  ]);

  // Payment methods state including a default linked Visa credit card
  const [paymentMethods, setPaymentMethods] = useState<any[]>([
    { id: "visa-default", type: "visa", name: "Visa Débito", details: "•••• 4291", isDefault: true }
  ]);

  // Sleek Dark/Light theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("servite_theme", nextTheme);
  };

  // Beer pouring animation states
  const [isServing, setIsServing] = useState(false);
  const [servingDrinkName, setServingDrinkName] = useState("");
  const [servingQuantity, setServingQuantity] = useState(1);
  const [servingProgress, setServingProgress] = useState(0);

  // Local storage mount-loading states
  const [isStateLoaded, setIsStateLoaded] = useState(false);

  // 1. Initial Mount Hook - Restore data from browser local storage
  useEffect(() => {
    try {
      const savedBars = localStorage.getItem("servite_bars");
      if (savedBars) {
        const parsed = JSON.parse(savedBars);
        // Robust Migration Check: If any bar is missing coordinates/taps or has 1 or fewer taps, force upgrade
        const needsUpgrade = parsed.some((b: any) => 
          !b.taps || 
          !Array.isArray(b.taps) || 
          b.taps.length <= 1 || 
          !b.lat || 
          !b.lng
        );
        if (needsUpgrade) {
          setBars(initialBarsData);
          localStorage.setItem("servite_bars", JSON.stringify(initialBarsData)); // Overwrite cache instantly
        } else {
          setBars(parsed);
        }
      } else {
        setBars(initialBarsData);
        localStorage.setItem("servite_bars", JSON.stringify(initialBarsData));
      }

      const savedUsers = localStorage.getItem("servite_users");
      if (savedUsers) setUsers(JSON.parse(savedUsers));

      const savedTransactions = localStorage.getItem("servite_transactions");
      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));

      const savedPaymentMethods = localStorage.getItem("servite_payment_methods");
      if (savedPaymentMethods) setPaymentMethods(JSON.parse(savedPaymentMethods));

      const savedTheme = localStorage.getItem("servite_theme") as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
    } catch (e) {
      console.error("Failed to load local storage values:", e);
    }
    setIsStateLoaded(true);
  }, []);

  // 2. State Change Hooks - Persist updates immediately into local storage
  useEffect(() => {
    if (!isStateLoaded) return;
    localStorage.setItem("servite_bars", JSON.stringify(bars));
  }, [bars, isStateLoaded]);

  useEffect(() => {
    if (!isStateLoaded) return;
    localStorage.setItem("servite_users", JSON.stringify(users));
  }, [users, isStateLoaded]);

  useEffect(() => {
    if (!isStateLoaded) return;
    localStorage.setItem("servite_transactions", JSON.stringify(transactions));
  }, [transactions, isStateLoaded]);

  useEffect(() => {
    if (!isStateLoaded) return;
    localStorage.setItem("servite_payment_methods", JSON.stringify(paymentMethods));
  }, [paymentMethods, isStateLoaded]);

  // 3. Select valid tap for active bar to prevent mismatched active taps or crashes
  useEffect(() => {
    if (selectedBarId) {
      const activeBar = bars.find(b => b.id === selectedBarId);
      if (activeBar && activeBar.taps && activeBar.taps.length > 0) {
        const tapExists = activeBar.taps.some(t => t.id === selectedTap);
        if (!tapExists) {
          setSelectedTap(activeBar.taps[0].id);
        }
      }
    }
  }, [selectedBarId, bars, selectedTap]);

  const handleLogin = (user: 'sofia' | 'ian') => {
    setSyncingType('login');
    setIsSyncing(true);
    setTimeout(() => {
      setCurrentUser(user);
      setIsSyncing(false);
      setTab('home');
    }, 1200);
  };

  const handleLogout = () => {
    setSyncingType('logout');
    setIsSyncing(true);
    setTimeout(() => {
      setCurrentUser(null);
      setIsSyncing(false);
      setSelectedBarId(null);
      setTab('home');
    }, 800);
  };

  const activeBar = bars.find(b => b.id === selectedBarId) || null;

  const handleSelectTap = (id: number) => {
    if (id !== selectedTap) {
      setDirection(id > selectedTap ? 1 : -1);
      setSelectedTap(id);
    }
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation click
    setBars((prevBars: any[]) => prevBars.map(b => b.id === id ? { ...b, isFavorite: !b.isFavorite } : b));
  };

  const handleBarClick = (barId: number) => {
    setSelectedBarId(barId);
  };

  const handleAddFunds = (amount: number) => {
    setBars((prevBars: any[]) => prevBars.map((b, idx) => {
      if (selectedBarId) {
        return b.id === selectedBarId ? { ...b, balance: b.balance + amount } : b;
      }
      return idx === 0 ? { ...b, balance: b.balance + amount } : b;
    }));

    // Record credit transaction
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setTransactions((prev: any[]) => [
      { title: "Carga de saldo", desc: "Crédito aprobado", amt: `+$${amount}`, type: "in", date: `Hoy, ${timeStr}` },
      ...prev
    ]);
  };

  const handleServe = (totalCost: number, quantity: number, drinkName: string) => {
    if (!currentUser || !selectedBarId || !activeBar) return;

    // 1. Deduct cost from active bar balance
    setBars((prevBars: any[]) => prevBars.map(b => b.id === selectedBarId ? { ...b, balance: Math.max(0, b.balance - totalCost) } : b));

    // 2. Add transaction to activity history
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setTransactions((prev: any[]) => [
      { title: activeBar.name, desc: `${quantity} Pinta${quantity > 1 ? 's' : ''} - ${drinkName}`, amt: `-$${totalCost}`, type: "out", date: `Hoy, ${timeStr}` },
      ...prev
    ]);

    // 3. Update served quantity metrics in users profile stats
    setUsers((prev: any) => ({
      ...prev,
      [currentUser]: {
        ...prev[currentUser],
        served: (parseFloat(prev[currentUser].served) + (quantity * 0.5)).toFixed(1) + " L"
      }
    }));

    // 4. Start the serving simulation animation
    setServingDrinkName(drinkName);
    setServingQuantity(quantity);
    setServingProgress(0);
    setIsServing(true);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setServingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsServing(false);
        }, 1500); // Let them enjoy the green checkmark for 1.5s
      }
    }, 120); // 120ms * 20 steps = 2.4s pour duration
  };

  const selectedDrink = (activeBar && activeBar.taps && activeBar.taps.find(d => d.id === selectedTap)) || (activeBar && activeBar.taps && activeBar.taps[0]) || drinksData[0];

  // Filtering bars list
  const filteredBars = bars.filter(bar => {
    const matchesSearch = bar.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bar.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filter === 'favoritos') return bar.isFavorite;
    if (filter === 'saldo') return bar.balance > 0;
    return true; // Default cercanos
  });

  const handleHeaderBack = () => {
    setSelectedBarId(null);
  };

  // Determine header context back arrow visibility
  const isHideBack = selectedBarId === null;

  // 1. Loader screen visible during transitions (login/logout)
  if (isSyncing) {
    return (
      <div className="app-container" style={{ minHeight: "100vh", backgroundColor: "var(--app-bg)" }}>
        <SkeletonLoader />
      </div>
    );
  }

  // 2. Auth selector visible if no active user is logged in
  if (!currentUser) {
    return <LoginView onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="app-container" style={{ paddingBottom: "90px" }}>
      <Header onBack={handleHeaderBack} hideBack={isHideBack} theme={theme} toggleTheme={toggleTheme} />

      <main className="content">
        <AnimatePresence mode="wait">
          {/* BAR DETAILS VIEW (DECOUPLED FROM HOME TAB) */}
          {selectedBarId !== null && activeBar ? (
            <motion.div
              key={`bar-detail-${activeBar.id}`}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              style={{ display: "flex", flexDirection: "column", gap: "var(--section-gap)" }}
            >
              {/* Fully coherent heart prop passed to BarInfo */}
              <BarInfo 
                name={activeBar.name} 
                address={activeBar.address} 
                isFavorite={activeBar.isFavorite}
                logo={activeBar.logo}
                onToggleFavorite={(e) => toggleFavorite(activeBar.id, e)}
              />
              
              <BalanceBox balance={activeBar.balance} onAddFunds={handleAddFunds} />
              
              <TapsList 
                drinks={activeBar.taps || []} 
                selectedTap={selectedTap} 
                onSelectTap={handleSelectTap} 
              />
              
              <div style={{ position: "relative", overflow: "hidden", minHeight: "160px" }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <DrinkCard 
                    key={selectedDrink.id} 
                    drink={selectedDrink} 
                    direction={direction} 
                    barBalance={activeBar.balance} 
                    onServe={handleServe} 
                    onAddFunds={handleAddFunds} 
                    multiplier={activeBar.tapValueMultiplier}
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            // MAIN TAB PANELS
            <>
              {tab === 'home' && (
                <HomeTab 
                  currentUser={currentUser}
                  users={users}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filter={filter}
                  setFilter={setFilter}
                  filteredBars={filteredBars}
                  onBarClick={handleBarClick}
                  onToggleFavorite={toggleFavorite}
                  pageVariants={pageVariants}
                  staggerContainer={staggerContainer}
                  listItemVariants={listItemVariants}
                />
              )}

              {tab === 'wallet' && (
                <WalletTab 
                  currentUser={currentUser}
                  users={users}
                  bars={bars}
                  transactions={transactions}
                  handleAddFunds={handleAddFunds}
                  pageVariants={pageVariants}
                  paymentMethods={paymentMethods}
                  setPaymentMethods={setPaymentMethods}
                />
              )}

              {tab === 'location' && (
                <LocationTab 
                  bars={bars}
                  setBars={setBars}
                  setSelectedBarId={setSelectedBarId}
                  setTab={setTab}
                  pageVariants={pageVariants}
                />
              )}

              {tab === 'profile' && (
                <ProfileTab 
                  currentUser={currentUser}
                  users={users}
                  bars={bars}
                  handleLogout={handleLogout}
                  pageVariants={pageVariants}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      <BottomNav 
        activeTab={tab} 
        setActiveTab={(newTab) => {
          setSelectedBarId(null);
          setTab(newTab);
        }} 
      />

      {/* Dynamic Beer Pouring Screen Overlay */}
      <AnimatePresence>
        {isServing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(26, 23, 22, 0.95)",
              backdropFilter: "blur(10px)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              padding: "24px",
              textAlign: "center"
            }}
          >
            {/* Inject self-contained premium css animations */}
            <style>{`
              @keyframes rise-bubble {
                0% {
                  transform: translateY(0) scale(0.7);
                  opacity: 0;
                }
                15% {
                  opacity: 0.75;
                }
                85% {
                  opacity: 0.75;
                }
                100% {
                  transform: translateY(-155px) scale(1.1);
                  opacity: 0;
                }
              }
              @keyframes slosh-liquid {
                0%, 100% { transform: rotate(0deg) scaleY(1); }
                25% { transform: rotate(-1deg) scaleY(1.01); }
                75% { transform: rotate(1deg) scaleY(0.99); }
              }
              @keyframes foam-wobble {
                0%, 100% { border-radius: 12px 12px 6px 6px; transform: scaleY(1); }
                50% { border-radius: 16px 14px 6px 6px; transform: scaleY(1.05); }
              }
              @keyframes stream-flow {
                0% { background-position: 0 0; }
                100% { background-position: 0 40px; }
              }
            `}</style>

            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "300px", width: "200px", marginBottom: "15px" }}>


              {/* Outline of Beer Glass */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                style={{
                  width: "100px",
                  height: "170px",
                  border: "4px solid rgba(255, 255, 255, 0.9)",
                  borderBottomWidth: "14px",
                  borderTopWidth: "2px",
                  borderRadius: "6px 6px 24px 24px",
                  position: "absolute",
                  bottom: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.65), inset 0 2px 10px rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.04)"
                }}
              >
                {/* Cold dew condensation droplets */}
                {servingProgress > 15 && (
                  <>
                    <div style={{ position: "absolute", top: "35px", left: "15px", width: "3px", height: "8px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)", zIndex: 4 }} />
                    <div style={{ position: "absolute", top: "85px", right: "20px", width: "4px", height: "12px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.25)", zIndex: 4 }} />
                    <div style={{ position: "absolute", top: "120px", left: "28px", width: "3px", height: "6px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.25)", zIndex: 4 }} />
                  </>
                )}

                {/* Glass reflection highlight */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "12px",
                  width: "8px",
                  height: "100%",
                  background: "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0))",
                  zIndex: 4,
                  pointerEvents: "none"
                }} />

                {/* Golden liquid height matching progress with slosh physics */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${servingProgress}%`,
                  background: "linear-gradient(to top, #FF6600 0%, #FFBF00 100%)",
                  transition: "height 0.1s linear",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  animation: servingProgress > 0 && servingProgress < 100 ? "slosh-liquid 1.8s infinite ease-in-out" : "none",
                  transformOrigin: "bottom center"
                }}>
                  {/* Ascending dynamic bubbles inside beer */}
                  {servingProgress > 0 && servingProgress < 100 && (
                    <>
                      {[...Array(12)].map((_, i) => {
                        const bubbleDelay = i * 0.18;
                        const leftPos = 12 + (i * 8.5) % 76;
                        const size = 3 + (i % 3);
                        return (
                          <div
                            key={i}
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: `${leftPos}%`,
                              width: `${size}px`,
                              height: `${size}px`,
                              borderRadius: "50%",
                              backgroundColor: "rgba(255, 255, 255, 0.7)",
                              boxShadow: "0 0 3px rgba(255, 255, 255, 0.4)",
                              animation: "rise-bubble 1.3s infinite linear",
                              animationDelay: `${bubbleDelay}s`,
                              zIndex: 1
                            }}
                          />
                        );
                      })}
                    </>
                  )}

                  {/* Thick creamy Foam head rising on top of the beer */}
                  <div style={{
                    height: servingProgress > 0 ? "24px" : "0",
                    backgroundColor: "#fff",
                    boxShadow: "0 -3px 12px rgba(255,255,255,0.9), inset 0 -3px 6px rgba(0,0,0,0.05)",
                    position: "absolute",
                    top: "-12px",
                    left: 0,
                    right: 0,
                    zIndex: 2,
                    animation: "foam-wobble 2s infinite ease-in-out",
                    transformOrigin: "bottom center",
                    transition: "height 0.2s"
                  }}>
                    {/* Tiny foam bubbles overlay */}
                    <div style={{
                      position: "absolute",
                      top: "2px",
                      left: "10%",
                      width: "80%",
                      height: "4px",
                      borderTop: "1.5px dotted rgba(0,0,0,0.08)",
                      opacity: 0.6
                    }} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Pouring status messages */}
            <h2 style={{ fontSize: "20px", fontWeight: "900", fontFamily: "var(--font-family-title)", letterSpacing: "0.5px" }}>
              {servingProgress < 100 ? (
                <>Sirviendo canilla... 🍺</>
              ) : (
                <>¡Pinta Servida! 🎉</>
              )}
            </h2>
            
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "8px", maxWidth: "250px", lineHeight: "1.5" }}>
              {servingProgress < 100 ? (
                <>Llenando {servingQuantity} pinta{servingQuantity > 1 ? "s" : ""} de <strong style={{ color: "#FFBF00" }}>{servingDrinkName}</strong>...</>
              ) : (
                <>Disfrutá tu pinta recién tirada. ¡Salud!</>
              )}
            </p>

            {/* Large glowing percentage / Check icon */}
            <div style={{ marginTop: "20px", fontSize: "28px", fontWeight: "900", color: "#FFBF00" }}>
              {servingProgress < 100 ? (
                <>{servingProgress}%</>
              ) : (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <CheckCircle2 size={48} color="#28a745" style={{ display: "inline" }} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
