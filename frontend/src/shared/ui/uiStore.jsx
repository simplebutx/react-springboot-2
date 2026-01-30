import { createContext, useContext, useRef, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const toastApi = (message, duration = 2000) => {
    setToast(message);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setToast(null);
      timerRef.current = null;
    }, duration);
  };

  return (
    <UIContext.Provider value={{ toast: toastApi, _toast: toast }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
