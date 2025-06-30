import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface SessionExpiredModalProps {
  onClose: () => void;
}

export function SessionExpiredModal({ onClose }: SessionExpiredModalProps) {
  const navigate = useNavigate();

  const handleOkClick = () => {
    onClose(); // Cierra el modal
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Sesión caducada</h2>
        <p className="mb-4">Tu sesión ha caducado. Por favor inicia sesión nuevamente.</p>
        <div className="flex justify-end">
          <Button 
            onClick={handleOkClick}
            className="cursor-pointer"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
} 