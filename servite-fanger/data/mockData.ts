/**
 * Simulated Static Mock Data
 * SERVITE FANGER
 */

export interface Drink {
  id: number;
  name: string;
  price: string;
  img: string;
  tag: string;
  vol: string;
  alc: string;
  ibu: string;
  type: string;
  color: string;
}

export interface Bar {
  id: number;
  name: string;
  address: string;
  isFavorite: boolean;
  balance: number;
  logo: string;
  distance: string;
  lat: number;
  lng: number;
  tapValueMultiplier: number;
  taps: Drink[]; // Nested dynamic taps list!
}

export const drinksData: Drink[] = [
  {
    id: 1,
    name: "Bambú Ipa",
    price: "500",
    img: "/images/bambu_ipa.png",
    tag: "Canilla 1",
    vol: "100ml",
    alc: "5%",
    ibu: "35",
    type: "SESSION IPA",
    color: "#ff9800"
  },
  {
    id: 2,
    name: "Scottish BAMBU",
    price: "400",
    img: "/images/scottish_bambu.png",
    tag: "Canilla 2",
    vol: "100ml",
    alc: "5.5%",
    ibu: "9",
    type: "SCOTTISH EXPORT",
    color: "#795548"
  },
  {
    id: 3,
    name: "BAMBU Pilsner",
    price: "400",
    img: "/images/bambu_pilsner.png",
    tag: "Canilla 3",
    vol: "100ml",
    alc: "4.2%",
    ibu: "8",
    type: "CZECH PILSNER",
    color: "#ffeb3b"
  },
  {
    id: 4,
    name: "Gin Tónic",
    price: "500",
    img: "/images/gin_tonic.png",
    tag: "Canilla 4",
    vol: "100ml",
    alc: "9%",
    ibu: "Hierbas",
    type: "GIN",
    color: "#e0e0e0"
  }
];

import breweriesJson from "./breweries.json";
export const initialBarsData: Bar[] = breweriesJson as Bar[];

export const usersData: any = {
  sofia: {
    name: "Sofia",
    rank: "Miembro Gold • Desde 2025",
    served: "4.8 L",
    avatar: {
      head: "#FF6600",
      shoulders: "#1A1716",
      border: "#FFBF00"
    },
    achievements: [
      { icon: "🥇", name: "Pionera", desc: "Primer trago servido", color: "rgba(255, 191, 0, 0.12)" },
      { icon: "🍻", name: "Pinta Master", desc: "Serviste 10 pintas", color: "rgba(255, 102, 0, 0.1)" },
      { icon: "⚡", name: "Flash Flow", desc: "Serviste en 8s", color: "rgba(40, 167, 69, 0.08)" },
      { icon: "🦉", name: "Nocturna", desc: "Servido después de 12am", color: "rgba(111, 66, 193, 0.08)" }
    ]
  },
  ian: {
    name: "Ian Franco",
    rank: "Miembro Premium • Desde 2024",
    served: "8.2 L",
    avatar: {
      head: "#1A1716",
      shoulders: "#FF6600",
      border: "#FFBF00"
    },
    achievements: [
      { icon: "🥇", name: "Pionero", desc: "Primer trago servido", color: "rgba(255, 191, 0, 0.12)" },
      { icon: "🍻", name: "Barón del Chop", desc: "Serviste 25 pintas", color: "rgba(255, 102, 0, 0.1)" },
      { icon: "⚡", name: "Super Flow", desc: "Serviste en 5s", color: "rgba(40, 167, 69, 0.08)" },
      { icon: "👑", name: "Rey de Canillas", desc: "Visitaste 5 bares", color: "rgba(111, 66, 193, 0.08)" }
    ]
  }
};

// Page transition animations
export const pageVariants: any = {
  initial: { opacity: 0, y: 15 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.35, 
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.08
    }
  },
  exit: { 
    opacity: 0, 
    y: -15, 
    transition: { duration: 0.2 } 
  }
};

export const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const listItemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};
