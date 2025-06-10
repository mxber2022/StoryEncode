import React, { useEffect } from 'react';

interface ChatNotificationProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const ChatNotification: React.FC<ChatNotificationProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-xl shadow-xl border text-base font-medium transition-all duration-300
        ${type === 'success'
          ? 'bg-green-700/90 border-green-400/50 text-white'
          : 'bg-red-700/90 border-red-400/50 text-white'}
      `}
      role="alert"
    >
      {message}
    </div>
  );
};

export default ChatNotification; 