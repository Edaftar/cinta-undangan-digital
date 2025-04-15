
import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import AlertBanner from '@/components/AlertBanner';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Alert {
  id: string;
  type: AlertType;
  message: string;
  description?: string;
  timeout?: number;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (type: AlertType, message: string, description?: string, timeout?: number) => string;
  hideAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = useCallback((type: AlertType, message: string, description?: string, timeout = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    const newAlert: Alert = {
      id,
      type,
      message,
      description,
      timeout,
    };
    
    setAlerts((prev) => [...prev, newAlert]);
    
    if (timeout > 0) {
      setTimeout(() => {
        hideAlert(id);
      }, timeout);
    }
    
    return id;
  }, []);

  const hideAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, hideAlert }}>
      {children}
      <div className="fixed top-4 right-4 z-50 w-full max-w-md space-y-2">
        {alerts.map((alert) => (
          <AlertBanner
            key={alert.id}
            type={alert.type}
            message={alert.message}
            description={alert.description}
            onClose={() => hideAlert(alert.id)}
            className="shadow-md"
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

export default useAlerts;
