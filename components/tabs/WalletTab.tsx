import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, CreditCard, Check, X, Lock, CheckCircle2 } from "lucide-react";
import AnimatedCounter from "../ui/AnimatedCounter";

interface Bar {
  id: number;
  balance: number;
}

interface Transaction {
  title: string;
  desc: string;
  amt: string;
  type: string;
  date: string;
}

interface PaymentMethod {
  id: string | number;
  type: "visa" | "mastercard" | "mercadopago";
  name: string;
  details: string;
  logoUrl?: string;
  isDefault?: boolean;
}

interface WalletTabProps {
  currentUser: 'sofia' | 'ian' | null;
  users: any;
  bars: Bar[];
  transactions: Transaction[];
  handleAddFunds: (amount: number) => void;
  pageVariants: any;
  paymentMethods: PaymentMethod[];
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
}

/**
 * WalletTab Component
 * Renders the premium unified balance card, rapid load actions, payment method management, and transaction history.
 */
export default function WalletTab({
  currentUser,
  users,
  bars,
  transactions,
  handleAddFunds,
  pageVariants,
  paymentMethods,
  setPaymentMethods
}: WalletTabProps) {
  const totalBalance = bars.reduce((sum, b) => sum + b.balance, 0);
  const currentUserName = currentUser && users[currentUser] ? users[currentUser].name : "Sofia";
  const currentUserEmail = currentUser === "ian" ? "ian.franco@servite.com" : "sofia.r@servite.com";

  // Modal & Add Payment states
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<"mercadopago" | "card">("mercadopago");
  
  // Mercado Pago Link Form
  const [mpEmail, setMpEmail] = useState(currentUserEmail);
  
  // Card Link Form
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState(currentUserName.toUpperCase());
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardType, setCardType] = useState<"visa" | "mastercard">("visa");

  // Linking flow animations states
  const [isLinking, setIsLinking] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);

  // Sync holder name when user changes
  useEffect(() => {
    setCardHolder(currentUserName.toUpperCase());
    setMpEmail(currentUserEmail);
  }, [currentUser, currentUserName, currentUserEmail]);

  // Card formatting utility
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted.slice(0, 19)); // Cap at 16 digits + 3 spaces

    // Auto detect card type (simple check: starts with 4 = visa, starts with 5 = mastercard)
    if (formatted.startsWith("4")) {
      setCardType("visa");
    } else if (formatted.startsWith("5")) {
      setCardType("mastercard");
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let clean = e.target.value.replace(/[^0-9]/g, "");
    if (clean.length > 2) {
      clean = clean.substring(0, 2) + "/" + clean.substring(2, 4);
    }
    setCardExpiry(clean.slice(0, 5));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/[^0-9]/g, "");
    setCardCvv(clean.slice(0, 4));
  };

  // Submit payment method linking
  const handleLinkMethod = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLinking(true);

    setTimeout(() => {
      let newMethod: PaymentMethod;

      if (activeFormTab === "mercadopago") {
        newMethod = {
          id: `mp-${Date.now()}`,
          type: "mercadopago",
          name: "Mercado Pago",
          details: mpEmail.length > 22 ? mpEmail.substring(0, 20) + "..." : mpEmail,
          logoUrl: "/images/mercado-pago.png"
        };
      } else {
        const lastFour = cardNumber.slice(-4) || "4321";
        newMethod = {
          id: `card-${Date.now()}`,
          type: cardType,
          name: cardType === "visa" ? "Visa Crédito" : "Mastercard",
          details: `•••• ${lastFour}`
        };
      }

      setLinkSuccess(true);

      setTimeout(() => {
        // Add new method and set as default automatically
        setPaymentMethods((prev: PaymentMethod[]) => {
          const updated = prev.map(m => ({ ...m, isDefault: false }));
          return [...updated, { ...newMethod, isDefault: true }];
        });

        // Reset states and close modal
        setIsLinking(false);
        setLinkSuccess(false);
        setShowAddModal(false);
        
        // Reset card fields
        setCardNumber("");
        setCardExpiry("");
        setCardCvv("");
      }, 1200);

    }, 1500); // 1.5s simulated secure link
  };

  const handleToggleDefault = (id: string | number) => {
    setPaymentMethods((prev: PaymentMethod[]) => 
      prev.map(m => m.id === id ? { ...m, isDefault: true } : { ...m, isDefault: false })
    );
  };

  const handleDeleteMethod = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering default toggle
    if (paymentMethods.length <= 1) return; // Prevent deleting the last card
    
    setPaymentMethods((prev: PaymentMethod[]) => {
      const filtered = prev.filter(m => m.id !== id);
      // If deleted card was default, make the first remaining card default
      if (prev.find(m => m.id === id)?.isDefault) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const selectedDefaultMethod = paymentMethods.find(m => m.isDefault) || paymentMethods[0];

  return (
    <motion.div
      key="tab-wallet"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ display: "flex", flexDirection: "column", gap: "var(--section-gap)" }}
    >
      <h2 className="section-title">Billetera</h2>
      
      {/* Premium credit card mockup branded as SERVITE CARD */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "linear-gradient(135deg, #1A1716 0%, #3a3230 100%)",
          borderRadius: "20px",
          padding: "25px",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(26, 23, 22, 0.15)",
          height: "190px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 191, 0, 0.18) 0%, rgba(255, 191, 0, 0) 70%)"
        }} />
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1 }}>
          <div>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Tarjeta de Saldo Unificado</span>
            <h1 style={{ fontSize: "32px", fontWeight: "800", fontFamily: "var(--font-family-title)", color: "#FFBF00", marginTop: "3px" }}>
              <AnimatedCounter value={totalBalance} />
            </h1>
          </div>
          <div style={{ backgroundColor: "#fff", borderRadius: "50%", padding: "5px", display: "flex", justifyContent: "center", alignItems: "center", width: "32px", height: "32px" }}>
            <img src="/assets/images/Isotipo_Negro.png" width="20" height="20" alt="Logo" />
          </div>
        </div>
        
        <div style={{ zIndex: 1 }}>
          <div style={{ fontSize: "14px", letterSpacing: "2.5px", color: "rgba(255,255,255,0.75)", fontFamily: "monospace" }}>•••• •••• •••• 4291</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Titular</div>
              <div style={{ fontSize: "12px", fontWeight: "bold", fontFamily: "var(--font-family-title)" }}>{currentUserName}</div>
            </div>
            <div>
              <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Vence</div>
              <div style={{ fontSize: "12px", fontWeight: "bold" }}>12/29</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Deposit Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="section-title">Cargar Saldo Rápido</span>
          <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
            Cobrar de: <strong style={{ color: "#FF6600" }}>{selectedDefaultMethod.name}</strong>
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {[500, 1000, 2000].map((amount) => (
            <motion.button
              key={amount}
              whileTap={{ scale: 0.95 }}
              whileHover={{ borderColor: "#FFBF00", color: "#FF6600", y: -1 }}
              onClick={() => handleAddFunds(amount)}
              style={{
                padding: "14px 10px",
                borderRadius: "12px",
                border: "2px solid #e9ecef",
                backgroundColor: "#fff",
                fontWeight: "800",
                fontSize: "14px",
                color: "#1A1716",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              +${amount}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mis Medios de Pago section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <span className="section-title">Mis Medios de Pago</span>
        <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
          {paymentMethods.map((method) => {
            const isMP = method.type === "mercadopago";
            return (
              <motion.div
                key={method.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleToggleDefault(method.id)}
                style={{
                  flexShrink: 0,
                  width: "165px",
                  height: "85px",
                  backgroundColor: method.isDefault ? "#1A1716" : "#fff",
                  color: method.isDefault ? "#fff" : "#1A1716",
                  border: method.isDefault ? "2px solid #FFBF00" : "2px solid #e9ecef",
                  borderRadius: "14px",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  position: "relative",
                  boxShadow: method.isDefault ? "0 4px 12px rgba(26,23,22,0.12)" : "none",
                  transition: "all 0.2s"
                }}
              >
                {/* Delete button (only if more than 1 linked method) */}
                {paymentMethods.length > 1 && (
                  <button
                    onClick={(e) => handleDeleteMethod(method.id, e)}
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "6px",
                      background: "none",
                      border: "none",
                      color: method.isDefault ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
                      cursor: "pointer",
                      padding: "4px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <X size={12} />
                  </button>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {isMP ? (
                    <div style={{
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      padding: "3px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "38px",
                      height: "24px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                    }}>
                      <img src={method.logoUrl || "/images/mercado-pago.png"} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="MP" />
                    </div>
                  ) : (
                    <CreditCard size={18} color={method.isDefault ? "#FFBF00" : "#FF6600"} />
                  )}
                  
                  {method.isDefault && (
                    <span style={{
                      fontSize: "8px",
                      backgroundColor: "#FF6600",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      textTransform: "uppercase"
                    }}>
                      Activo
                    </span>
                  )}
                </div>

                <div>
                  <div style={{ fontSize: "12px", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "120px" }}>{method.name}</div>
                  <div style={{ fontSize: "10px", color: method.isDefault ? "rgba(255,255,255,0.6)" : "var(--text-secondary)", marginTop: "2px" }}>{method.details}</div>
                </div>
              </motion.div>
            );
          })}

          {/* Dash Card "+ Agregar" */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            style={{
              flexShrink: 0,
              width: "140px",
              height: "85px",
              border: "2px dashed #c3c3c3",
              backgroundColor: "rgba(0,0,0,0.01)",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              gap: "6px",
              color: "var(--text-secondary)",
              transition: "all 0.2s"
            }}
            whileHover={{ borderColor: "#FF6600", color: "#FF6600", backgroundColor: "#fff" }}
          >
            <Plus size={18} />
            <span style={{ fontSize: "11px", fontWeight: "bold" }}>Agregar método</span>
          </motion.div>
        </div>
      </div>

      {/* Transaction History */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <span className="section-title">Actividad Reciente</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {transactions.map((t, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8f9fa", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e9ecef" }}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "#1A1716" }}>{t.title}</div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{t.desc} • {t.date}</div>
              </div>
              <div style={{ fontWeight: "800", fontSize: "14px", color: t.type === "in" ? "#28a745" : "#1A1716", display: "flex", alignItems: "center", gap: "3px" }}>
                {t.type === "in" ? <ArrowUpRight size={14} /> : null}
                {t.amt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Bottom Sheet Drawer (Add Payment Method) */}
      <AnimatePresence>
        {showAddModal && (
          <>
            {/* Sheet Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isLinking) setShowAddModal(false); }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(26, 23, 22, 0.6)",
                backdropFilter: "blur(4px)",
                zIndex: 99999
              }}
            />

            {/* Bottom Sheet sliding panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: "92%",
                backgroundColor: "#F9F4E8",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
                padding: "24px",
                boxShadow: "0 -8px 30px rgba(0,0,0,0.15)",
                zIndex: 100000,
                color: "#1A1716",
                overflowY: "auto"
              }}
            >
              {/* Linking shimmer skeleton view */}
              {isLinking ? (
                <div style={{ minHeight: "350px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px", textAlign: "center" }}>
                  {linkSuccess ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <CheckCircle2 size={64} color="#28a745" style={{ display: "inline" }} />
                      <h2 style={{ fontSize: "20px", fontWeight: "900", marginTop: "14px" }}>¡Vinculado con éxito!</h2>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "6px" }}>Se estableció como método de cobro activo.</p>
                    </motion.div>
                  ) : (
                    <>
                      <div className="skeleton-shimmer" style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "#e4d7c5"
                      }} />
                      <h2 style={{ fontSize: "18px", fontWeight: "800" }}>Estableciendo conexión segura...</h2>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", maxWidth: "240px", lineHeight: "1.4" }}>
                        Estamos vinculando tu medio de pago seleccionado bajo encriptación SSL de 256 bits.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Lock size={16} color="#FF6600" />
                      <h3 style={{ fontSize: "18px", fontWeight: "900", fontFamily: "var(--font-family-title)" }}>Agregar medio de pago</h3>
                    </div>
                    <button
                      onClick={() => setShowAddModal(false)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", color: "#1A1716" }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Tab Selector pills */}
                  <div style={{ display: "flex", backgroundColor: "#e9ecef", borderRadius: "12px", padding: "4px", marginBottom: "22px" }}>
                    <button
                      onClick={() => setActiveFormTab("mercadopago")}
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: activeFormTab === "mercadopago" ? "#1A1716" : "transparent",
                        color: activeFormTab === "mercadopago" ? "#fff" : "#1A1716",
                        fontWeight: "bold",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Mercado Pago
                    </button>
                    <button
                      onClick={() => setActiveFormTab("card")}
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: activeFormTab === "card" ? "#1A1716" : "transparent",
                        color: activeFormTab === "card" ? "#fff" : "#1A1716",
                        fontWeight: "bold",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Tarjeta Bancaria
                    </button>
                  </div>

                  {/* FORM Tab: MERCADO PAGO */}
                  {activeFormTab === "mercadopago" && (
                    <form onSubmit={handleLinkMethod} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", backgroundColor: "#fff", padding: "20px", borderRadius: "16px", border: "1.5px solid #e9ecef", textAlign: "center" }}>
                        <div style={{
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          padding: "6px 12px",
                          border: "1.5px solid #e9ecef",
                          width: "90px",
                          height: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}>
                          <img src="/images/mercado-pago.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="MP Logo" />
                        </div>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5", maxWidth: "260px" }}>
                          Conectá tu saldo de Mercado Pago para realizar recargas inmediatas con un solo toque sin ingresar datos de tarjeta.
                        </p>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-secondary)" }}>Email / Usuario de Mercado Pago</label>
                        <input
                          type="email"
                          required
                          value={mpEmail}
                          onChange={(e) => setMpEmail(e.target.value)}
                          placeholder="usuario@gmail.com"
                          style={{
                            padding: "14px 16px",
                            borderRadius: "12px",
                            border: "1.5px solid #e9ecef",
                            backgroundColor: "#fff",
                            fontSize: "14px",
                            color: "#1A1716",
                            outline: "none",
                            transition: "all 0.2s"
                          }}
                          onFocus={(e) => e.target.style.borderColor = "#FF6600"}
                          onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
                        />
                      </div>

                      <button
                        type="submit"
                        style={{
                          backgroundColor: "#FF6600",
                          color: "#fff",
                          border: "none",
                          borderRadius: "12px",
                          padding: "14px",
                          fontWeight: "bold",
                          fontSize: "14px",
                          cursor: "pointer",
                          marginTop: "10px",
                          boxShadow: "0 4px 12px rgba(255,102,0,0.2)"
                        }}
                      >
                        Vincular Cuenta
                      </button>
                    </form>
                  )}

                  {/* FORM Tab: CREDIT CARD WITH REAL-TIME PREVIEW */}
                  {activeFormTab === "card" && (
                    <form onSubmit={handleLinkMethod} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      
                      {/* Interactive Credit Card Live Preview */}
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>
                        <motion.div
                          layout
                          style={{
                            width: "270px",
                            height: "155px",
                            background: "linear-gradient(135deg, #1A1716 0%, #443c39 100%)",
                            borderRadius: "16px",
                            padding: "20px",
                            color: "#fff",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                            position: "relative",
                            border: "1.5px solid #FFBF00"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{ width: "35px", height: "26px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "4px" }} />
                            <span style={{ fontSize: "14px", fontWeight: "900", fontStyle: "italic", letterSpacing: "1px", color: "#FFBF00" }}>
                              {cardType === "visa" ? "VISA" : "MC"}
                            </span>
                          </div>

                          <div style={{ fontSize: "16px", letterSpacing: "2px", fontFamily: "monospace", margin: "14px 0 8px 0" }}>
                            {cardNumber || "•••• •••• •••• ••••"}
                          </div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                            <div>
                              <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Titular</div>
                              <div style={{ fontSize: "11px", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>
                                {cardHolder || "NOMBRE APELLIDO"}
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: "15px" }}>
                              <div>
                                <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Vence</div>
                                <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cardExpiry || "MM/AA"}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>CVV</div>
                                <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cardCvv || "•••"}</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Inputs Grid */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <label style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-secondary)" }}>Número de Tarjeta</label>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="4000 1234 5678 9010"
                            style={{
                              padding: "12px 14px",
                              borderRadius: "10px",
                              border: "1.5px solid #e9ecef",
                              backgroundColor: "#fff",
                              fontSize: "13px",
                              color: "#1A1716",
                              outline: "none"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#FF6600"}
                            onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
                          />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <label style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-secondary)" }}>Nombre del Titular</label>
                          <input
                            type="text"
                            required
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                            placeholder="MARIA SOFIA RODRIGUEZ"
                            style={{
                              padding: "12px 14px",
                              borderRadius: "10px",
                              border: "1.5px solid #e9ecef",
                              backgroundColor: "#fff",
                              fontSize: "13px",
                              color: "#1A1716",
                              outline: "none"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#FF6600"}
                            onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
                          />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <label style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-secondary)" }}>Vence (MM/AA)</label>
                            <input
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              placeholder="12/29"
                              style={{
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: "1.5px solid #e9ecef",
                                backgroundColor: "#fff",
                                fontSize: "13px",
                                color: "#1A1716",
                                outline: "none"
                              }}
                              onFocus={(e) => e.target.style.borderColor = "#FF6600"}
                              onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
                            />
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <label style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-secondary)" }}>CVV</label>
                            <input
                              type="password"
                              required
                              value={cardCvv}
                              onChange={handleCvvChange}
                              placeholder="•••"
                              style={{
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: "1.5px solid #e9ecef",
                                backgroundColor: "#fff",
                                fontSize: "13px",
                                color: "#1A1716",
                                outline: "none"
                              }}
                              onFocus={(e) => e.target.style.borderColor = "#FF6600"}
                              onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        style={{
                          backgroundColor: "#FF6600",
                          color: "#fff",
                          border: "none",
                          borderRadius: "12px",
                          padding: "14px",
                          fontWeight: "bold",
                          fontSize: "14px",
                          cursor: "pointer",
                          marginTop: "8px",
                          boxShadow: "0 4px 12px rgba(255,102,0,0.2)"
                        }}
                      >
                        Vincular Tarjeta
                      </button>
                    </form>
                  )}
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
