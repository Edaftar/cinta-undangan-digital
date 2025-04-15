
import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertBannerProps {
  type: AlertType;
  message: string;
  description?: string;
  className?: string;
  onClose?: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  message,
  description,
  className,
  onClose
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-300';
      case 'error':
        return 'text-red-800 dark:text-red-300';
      case 'warning':
        return 'text-amber-800 dark:text-amber-300';
      case 'info':
      default:
        return 'text-blue-800 dark:text-blue-300';
    }
  };

  return (
    <div
      className={cn(
        'flex items-start p-4 mb-4 rounded-lg border',
        getBgColor(),
        className
      )}
    >
      <div className="flex-shrink-0 mr-3 mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <h3 className={cn('text-sm font-medium', getTextColor())}>{message}</h3>
        {description && (
          <div className={cn('mt-1 text-sm opacity-90', getTextColor())}>
            {description}
          </div>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          className={cn('ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 focus:ring-gray-300', getTextColor())}
          onClick={onClose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
