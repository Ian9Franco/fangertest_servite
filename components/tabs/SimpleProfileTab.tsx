import { motion } from "framer-motion";
import { ChevronLeft, User } from "lucide-react";

interface SimpleProfileTabProps {
  currentUser: string | null;
  users: any;
  handleLogout: () => void;
  setTab: (tab: string) => void;
  pageVariants: any;
}

export default function SimpleProfileTab({
  currentUser,
  users,
  handleLogout,
  setTab,
  pageVariants
}: SimpleProfileTabProps) {
  if (!currentUser || !users[currentUser]) return null;

  const user = users[currentUser];
  const email = user.email || "solosofi012@gmail.com";

  return (
    <motion.div
      key="tab-profile-simple"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", padding: "10px 0" }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          onClick={() => setTab("home")} 
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: "4px", zIndex: 2 }}
        >
          <ChevronLeft size={28} color="#4A4A4A" />
        </motion.button>
        <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0, color: "#1A1716", position: "absolute", left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
          Perfil
        </h2>
        <div style={{ width: "28px" }} />
      </div>

      {/* User Info */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#1A1716",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "4px",
          overflow: "hidden"
        }}>
          <User size={56} color="#FFFFFF" fill="#FFFFFF" style={{ transform: "translateY(8px)" }} strokeWidth={1} />
        </div>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#1A1716" }}>
          {user.name}
        </h3>
        <span style={{ fontSize: "13px", color: "#8B8B8B" }}>
          {email}
        </span>
      </div>

      <div style={{ height: "8px" }} />

      {/* Configuración de la cuenta */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4 style={{ margin: "0 0 10px 0", fontSize: "15px", fontWeight: "700", color: "#1A1716" }}>
          Configuración de la cuenta
        </h4>
        <div style={{ height: "1.5px", backgroundColor: "#e9ecef", marginBottom: "16px" }} />
        
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <span style={{ fontSize: "13px", color: "#4A4A4A", cursor: "pointer", fontWeight: "500" }}>Editar perfil</span>
          <span style={{ fontSize: "13px", color: "#4A4A4A", cursor: "pointer", fontWeight: "500" }}>Cambiar contraseña</span>
          <span style={{ fontSize: "13px", color: "#4A4A4A", cursor: "pointer", fontWeight: "500" }}>Ver historial</span>
        </div>
      </div>

      <div style={{ height: "8px" }} />

      {/* Soporte */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4 style={{ margin: "0 0 10px 0", fontSize: "15px", fontWeight: "700", color: "#1A1716" }}>
          Soporte
        </h4>
        <div style={{ height: "1.5px", backgroundColor: "#e9ecef", marginBottom: "16px" }} />
        
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <span style={{ fontSize: "13px", color: "#4A4A4A", cursor: "pointer", fontWeight: "500" }}>Ayuda y soporte</span>
          <span style={{ fontSize: "13px", color: "#4A4A4A", cursor: "pointer", fontWeight: "500" }} onClick={handleLogout}>Cerrar sesión</span>
        </div>
      </div>

    </motion.div>
  );
}
