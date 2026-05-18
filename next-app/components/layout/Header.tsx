import Image from "next/image";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  onBack?: () => void;
  hideBack?: boolean;
}

export default function Header({ onBack, hideBack = false }: HeaderProps) {
  return (
    <header className="header">
      {/* Back Button */}
      <div 
        style={{ cursor: "pointer", visibility: hideBack ? "hidden" : "visible" }}
        onClick={onBack}
      >
        <ChevronLeft size={24} color="#FF6600" />
      </div>
      
      {/* Centered Logo */}
      <div className="header-title">
        <Image 
          src="/assets/assets/images/Logotipo_Negro.png" 
          alt="SERVITE" 
          width={100} 
          height={30}
          style={{ objectFit: "contain" }}
        />
      </div>
      
      {/* Right Icons Spacer */}
      <div style={{ width: "24px" }}></div>
    </header>
  );
}
