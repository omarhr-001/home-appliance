import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

// Initialize API client with base URL
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
setBaseUrl(apiUrl);

createRoot(document.getElementById("root")!).render(<App />);
