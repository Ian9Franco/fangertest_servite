import { motion } from "framer-motion";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#1A1716",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "calc(80px + env(safe-area-inset-top)) 28px calc(140px + env(safe-area-inset-bottom))",
        zIndex: 1000,
        textAlign: "center",
        overflow: "hidden"
      }}
    >
      {/* Subtle Giant Background Watermark Isotype */}
      <img 
        src="/assets/brand/Isotipo_Negro.png" 
        alt="Watermark" 
        style={{
          position: "absolute",
          right: "-700px", // Movido a la derecha 100px
          top: "calc(50% - 50px)", // Subido 50px
          width: "1400px", // Alejado 100px (menor tamaño)
          height: "1400px",
          objectFit: "contain",
          opacity: 0.04, // Un poco más claro/visible
          filter: "brightness(0) invert(1)",
          transform: "translateY(-50%)", 
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      <div /> {/* Spacer */}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", width: "100%", maxWidth: "340px", zIndex: 10, position: "relative" }}>
        {/* Native White/Yellow Logotipo */}
        <div style={{ position: "relative", width: "310px" }}>
          <img 
            src="/assets/brand/Logotipo_Blanco.png" 
            alt="SERVITE" 
            style={{ 
              width: "100%", 
              height: "auto", 
              display: "block"
            }} 
          />
        </div>

        <p style={{ 
          fontSize: "13.5px", 
          color: "rgba(255, 255, 255, 0.8)", 
          lineHeight: "1.6", 
          fontWeight: "400",
          textAlign: "center" 
        }}>
          Cargá plata en la aplicación, seleccioná<br />la canilla que desees, y servite tu birra.
        </p>
      </div>

      {/* Pushed up Ingresar Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        style={{
          width: "100%",
          maxWidth: "340px",
          height: "48px", // Menos alto según referencia
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px", // Smooth rounded edges
          border: "none",
          backgroundColor: "#FFBF00",
          color: "#1A1716",
          fontSize: "15px",
          fontWeight: "600", // Semibold
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(255, 191, 0, 0.15)",
          zIndex: 10,
          position: "relative"
        }}
      >
        Ingresar
      </motion.button>
    </motion.div>
  );
}
