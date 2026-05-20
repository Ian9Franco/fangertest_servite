import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "../layout/Header";
import WelcomeStep from "./WelcomeStep";
import EmailStep from "./EmailStep";
import ProfileStep from "./ProfileStep";

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 FEATURE FLAG — Cambiar aquí para alternar entre modos de login
//
//   true  → Modo simplificado (para el cliente):
//            Cualquier email entra directo como "Sofia" (usuario normal, sin admin).
//            No se muestra el selector de perfiles ni la opción de crear usuario.
//
//   false → Modo completo (para desarrollo / demo interna):
//            Muestra el selector de perfiles con todos los usuarios y botón de
//            "Crear nuevo usuario".
// ─────────────────────────────────────────────────────────────────────────────
const SIMPLE_LOGIN_MODE = true;

interface LoginViewProps {
  onLogin: (user: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  users: any;
  onAddUser: (id: string, name: string, isMinor: boolean, headColor: string) => void;
}

/**
 * LoginView Component
 * Renders the multi-step premium entry flow:
 * 1. welcome: Black onboarding landing screen.
 * 2. email: Email sign-in / registrarse credential form with social oauth circular inputs.
 * 3. profiles: Avatar selection and profile creation drawer (solo si SIMPLE_LOGIN_MODE = false).
 */
export default function LoginView({ onLogin, theme, toggleTheme, users, onAddUser }: LoginViewProps) {
  const [activeStep, setActiveStep] = useState<'welcome' | 'email' | 'profiles'>('welcome');

  // En modo simple, al confirmar el email se loguea directo como Sofia.
  // En modo completo, avanza al paso de selección de perfiles.
  const handleEmailNext = SIMPLE_LOGIN_MODE
    ? () => onLogin('sofia')
    : () => setActiveStep('profiles');

  return (
    <div className="app-container" style={{ minHeight: "100vh", backgroundColor: "var(--app-bg)", display: "flex", flexDirection: "column", paddingBottom: "40px", transition: "background-color 0.3s ease", position: "relative" }}>
      
      {/* STEP 1: WELCOME ONBOARDING COVER OVERLAY (BLACK BG) */}
      <AnimatePresence>
        {activeStep === 'welcome' && (
          <WelcomeStep onNext={() => setActiveStep('email')} />
        )}
      </AnimatePresence>

      {/* HEADER FOR STEPS 2 & 3 */}
      {activeStep !== 'welcome' && (
        <Header 
          onBack={() => {
            if (activeStep === 'profiles') {
              setActiveStep('email');
            } else if (activeStep === 'email') {
              setActiveStep('welcome');
            }
          }} 
          hideBack={false} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      )}

      {/* STEP 2: EMAIL LOGIN VIEW */}
      {activeStep === 'email' && (
        <EmailStep theme={theme} onNext={handleEmailNext} />
      )}

      {/* STEP 3: PROFILES SELECTOR VIEW (solo visible si SIMPLE_LOGIN_MODE = false) */}
      {!SIMPLE_LOGIN_MODE && activeStep === 'profiles' && (
        <ProfileStep onLogin={onLogin} users={users} onAddUser={onAddUser} theme={theme} />
      )}
    </div>
  );
}
