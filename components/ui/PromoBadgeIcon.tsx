interface PromoBadgeIconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  percentColor?: string;
}

/**
 * PromoBadgeIcon
 * Icono de sello/badge con borde irregular (estilo "precio especial")
 * y símbolo de % adentro. Usado para indicar promociones activas.
 *
 * Props:
 *   fillColor   – color de relleno del badge (ej: "#FFBF00" activo, "transparent" outline)
 *   strokeColor – color del borde del badge (ej: "#1A1716")
 *   percentColor– color del símbolo % (ej: "#1A1716", "#FFBF00")
 */
export default function PromoBadgeIcon({
  size = 20,
  fillColor = "transparent",
  strokeColor = "#1A1716",
  percentColor = "#1A1716",
}: PromoBadgeIconProps) {
  // 10-spike seal shape, pre-computed (outer=10, inner=7.5, center=12,12)
  const points =
    "12,2 14.3,4.9 17.9,3.9 18.1,7.6 21.5,8.9 19.5,12 21.5,15.1 18.1,16.4 17.9,20.1 14.3,19.1 12,22 9.7,19.1 6.1,20.1 5.9,16.4 2.5,15.1 4.5,12 2.5,8.9 5.9,7.6 6.1,3.9 9.7,4.9";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      {/* Spiky seal / badge border */}
      <polygon
        points={points}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeColor === "none" ? 0 : 0.5}
        strokeLinejoin="round"
      />

      {/* % symbol – two dots + diagonal slash */}
      <circle cx="9.5" cy="9.5" r="1.5" fill={percentColor} />
      <circle cx="14.5" cy="14.5" r="1.5" fill={percentColor} />
      <line
        x1="8.5"
        y1="15.5"
        x2="15.5"
        y2="8.5"
        stroke={percentColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
