import { BrowserRouter } from "react-router-dom";
import './App.css'
import AppRoutes from "./routes";

export function App() {
  return (
    <BrowserRouter>
          <AppRoutes />
    </BrowserRouter>
  );
}
