import { useState, useEffect } from 'react';

export const Toast = ({ message, type = 'success' }) => {
  if (!message) return null;
  
  const alertClass = type === 'error' ? 'alert alert-error' : 'alert alert-success';
  
  return (
    <div className="toast toast-top toast-center z-[100]">
      <div className={`alert ${alertClass}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export const useToast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast?.message) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showSuccess = (message) => {
    if (message) setToast({ message, type: 'success' });
  };

  const showError = (message) => {
    if (message) setToast({ message, type: 'error' });
  };

  return { toast, showSuccess, showError };
};

