import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'success' | 'info';
  onDismiss: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'error',
  onDismiss,
  duration = 5000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  const bgColor = {
    error: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-500'
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center justify-between px-4 py-3 rounded-md shadow-lg text-white ${bgColor} min-w-[300px]`}
      role="alert"
    >
      <div className="mr-3">{message}</div>
      <button
        onClick={onDismiss}
        className="text-white hover:text-gray-200"
        aria-label="Close"
      >
        <span className="text-xl">&times;</span>
      </button>
    </div>
  );
};

export default Toast;
