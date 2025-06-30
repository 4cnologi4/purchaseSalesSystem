import { BrowserRouter } from "react-router-dom";
import './App.css'
import AppRoutes from "./routes";
import { useState, useEffect } from "react";
import { SessionExpiredModal } from "@/components/modals/SessionExpiredModal";

export function App() {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    const handleSessionExpired = () => {
      setIsSessionExpired(true);
    };

    window.addEventListener("session-expired", handleSessionExpired);
    return () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
      {isSessionExpired && (
        <SessionExpiredModal 
          onClose={() => setIsSessionExpired(false)} 
        />
      )}
    </BrowserRouter>
  );
}
