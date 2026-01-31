import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const AdminSessionHandler = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevPathRef.current;

    // Logic: If we were on /admin and are now on a different route, logout.
    if (prevPath === '/admin' && currentPath !== '/admin') {
       const API_URL = (import.meta as any).env?.VITE_BACKEND_URL 
        ? (import.meta as any).env.VITE_BACKEND_URL
        : 'http://localhost:4000/api';
        
       // Use sendBeacon if available for more reliable delivery on unload/navigation, 
       // but for SPA navigation fetch is usually fine. 
       // We use fetch here with credentials.
       fetch(`${API_URL}/admin/logout`, { 
         method: 'POST', 
         credentials: 'include' 
       }).catch(err => console.error("Auto-logout failed", err));
       
       console.log("Admin session auto-terminated due to navigation.");
    }

    prevPathRef.current = currentPath;
  }, [location]);

  return null;
};
