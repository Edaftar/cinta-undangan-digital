
import { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    // Apply smooth scrolling to the html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Reset scroll behavior when component unmounts
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
