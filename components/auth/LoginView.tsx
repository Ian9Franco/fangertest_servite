import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "../layout/Header";
import WelcomeStep from "./WelcomeStep";
import EmailStep from "./EmailStep";
import ProfileStep from "./ProfileStep";

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
 * 3. profiles: Avatar selection and profile creation drawer.
 */
export default function LoginView({ onLogin, theme, toggleTheme, users, onAddUser }: LoginViewProps) {
  const [activeStep, setActiveStep] = useState<'welcome' | 'email' | 'profiles'>('welcome');

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
        <EmailStep theme={theme} onNext={() => setActiveStep('profiles')} />
      )}

      {/* STEP 3: PROFILES SELECTOR VIEW */}
      {activeStep === 'profiles' && (
        <ProfileStep onLogin={onLogin} users={users} onAddUser={onAddUser} theme={theme} />
      )}
    </div>
  );
}
