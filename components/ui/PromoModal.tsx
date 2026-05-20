import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PromoModal({ isOpen, onClose }: PromoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 9999,
            }}
          />

          {/* Bottom Sheet Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              margin: "0 auto",
              maxWidth: "450px",
              backgroundColor: "#fff",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              padding: "20px",
              paddingBottom: "40px",
              zIndex: 10000,
              boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "900", color: "#1A1716", margin: 0 }}>
                Horarios y Promociones
              </h2>
              <button 
                onClick={onClose}
                style={{ 
                  background: "none", 
                  border: "none", 
                  cursor: "pointer", 
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <X size={20} color="#1A1716" />
              </button>
            </div>

            {/* Promo Card */}
            <div style={{
              border: "1px solid #E9ECEF",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "#fff"
            }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#FFBF00", margin: "0 0 4px 0" }}>
                  After Office
                </h3>
                <p style={{ fontSize: "13px", color: "#6c757d", margin: 0 }}>
                  Tomate una cerveza después de trabajar!
                </p>
              </div>
              
              <div style={{ fontSize: "14px", fontWeight: "900", color: "#1A1716", margin: "4px 0" }}>
                30% OFF
              </div>

              <ul style={{ 
                listStyleType: "none", 
                padding: 0, 
                margin: 0, 
                display: "flex", 
                flexDirection: "column", 
                gap: "4px" 
              }}>
                {[
                  "Lunes de 18:00 a 21:00",
                  "Martes de 18:00 a 21:00",
                  "Miércoles de 18:00 a 21:00",
                  "Jueves de 18:00 a 21:00",
                  "Viernes de 18:00 a 21:00"
                ].map((item, idx) => (
                  <li key={idx} style={{ fontSize: "12px", color: "#8B8B8B", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "16px", lineHeight: "1" }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
