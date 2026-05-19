import { motion } from "framer-motion";

interface Bar {
  id: number;
  isFavorite: boolean;
  balance: number;
}

interface ProfileTabProps {
  currentUser: string | null;
  users: any;
  bars: Bar[];
  handleLogout: () => void;
  pageVariants: any;
}

/**
 * ProfileTab Component
 * Renders user rank details, total active balances, symmetrical achievement cards,
 * interactive settings list, and safe visual logout CTAs.
 */
export default function ProfileTab({
  currentUser,
  users,
  bars,
  handleLogout,
  pageVariants
}: ProfileTabProps) {
  if (!currentUser || !users[currentUser]) return null;

  const user = users[currentUser];
  const totalBalance = bars.reduce((sum, b) => sum + b.balance, 0);
  const totalFavorites = bars.filter(b => b.isFavorite).length;

  return (
    <motion.div
      key="tab-profile"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ display: "flex", flexDirection: "column", gap: "var(--section-gap)", alignItems: "center", width: "100%" }}
    >
      {/* User Profile Avatar Section */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
        <div style={{ 
          width: "85px", 
          height: "85px", 
          borderRadius: "50%", 
          border: `3px solid ${user.avatar.border}`,
          padding: "3px",
          boxShadow: "0 4px 15px rgba(255, 191, 0, 0.15)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF"
        }}>
          <div style={{ 
            width: "100%", 
            height: "100%", 
            backgroundColor: "#e9ecef", 
            borderRadius: "50%", 
            position: "relative",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div style={{ width: "26px", height: "26px", backgroundColor: user.avatar.head, borderRadius: "50%", transform: "translateY(-4px)" }}></div>
            <div style={{ width: "46px", height: "24px", backgroundColor: user.avatar.shoulders, borderTopLeftRadius: "23px", borderTopRightRadius: "23px", position: "absolute", bottom: "0" }}></div>
          </div>
        </div>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "12px", fontFamily: "var(--font-family-title)" }}>{user.name}</h2>
        <span style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px", fontWeight: "bold" }}>{user.rank}</span>
      </div>

      {/* Profile Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", width: "100%" }}>
        {[
          { value: `$${totalBalance}`, label: "Saldo" },
          { value: totalFavorites.toString(), label: "Favoritos" },
          { value: user.served, label: "Servido" },
        ].map((stat, idx) => (
          <div key={idx} style={{ 
            backgroundColor: "#fff", 
            borderRadius: "15px", 
            padding: "14px 8px", 
            textAlign: "center",
            border: "1.5px solid #e9ecef"
          }}>
            <div style={{ fontSize: "16px", fontWeight: "800", color: "#FF6600" }}>{stat.value}</div>
            <div style={{ fontSize: "9px", color: "var(--text-secondary)", marginTop: "4px", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "0.2px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements Stagger Stickers Section */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
        <span className="section-title">Logros Obtenidos</span>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: "8px", 
          width: "100%",
          padding: "4px 0"
        }}>
          {user.achievements.map((badge: any, idx: number) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -4, scale: 1.02, borderColor: "#FFBF00", boxShadow: "0 8px 16px rgba(255, 191, 0, 0.12)" }}
              style={{ 
                backgroundColor: "#fff", 
                borderRadius: "14px", 
                border: "1.5px solid #e9ecef",
                padding: "10px 4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
              }}
            >
              <div style={{ 
                width: "36px", 
                height: "36px", 
                borderRadius: "50%", 
                backgroundColor: badge.color, 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                fontSize: "18px",
                marginBottom: "4px"
              }}>
                {badge.icon}
              </div>
              <div style={{ fontSize: "10px", fontWeight: "bold", color: "#1A1716", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>{badge.name}</div>
              <div style={{ fontSize: "7.5px", color: "var(--text-secondary)", marginTop: "3px", lineHeight: "1.2" }}>{badge.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Config settings list */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
        <span className="section-title">Configuración</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "#fff", padding: "8px 16px", borderRadius: "20px", border: "1.5px solid #e9ecef" }}>
          {[
            { icon: "🔔", title: "Notificaciones", desc: "Alertas de saldo y canillas cercanas", action: "Configurado" },
            { icon: "🎨", title: "Tema Visual", desc: "Claro / Oscuro automático", action: "Claro" },
            { icon: "💬", title: "Soporte Técnico", desc: "Preguntas y reclamos inmediatos", action: "Chat" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 2 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: idx < 2 ? "1.5px solid #f8f9fa" : "none",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "13px", color: "#1A1716" }}>{item.title}</div>
                  <div style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "1px" }}>{item.desc}</div>
                </div>
              </div>
              <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text-secondary)", backgroundColor: "#f8f9fa", padding: "4px 8px", borderRadius: "8px" }}>{item.action}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Secure simulated logout action button */}
      <div style={{ width: "100%", marginTop: "10px" }}>
        <motion.div
          whileTap={{ scale: 0.98 }}
          whileHover={{ borderColor: "#FF6600", y: -1 }}
          onClick={handleLogout}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderRadius: "18px",
            backgroundColor: "#fff",
            border: "1.5px solid #e9ecef",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
            marginTop: "12px",
            transition: "all 0.2s"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "15px" }}>🚪</span>
            <span style={{ fontSize: "13px", fontWeight: "bold", color: "#FF6600" }}>Cerrar Sesión</span>
          </div>
          <span style={{ color: "#FF6600", fontSize: "12px", fontWeight: "bold" }}>→</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
