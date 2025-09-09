import React, { useState, useEffect } from 'react';
import ProfilePage from './ProfilePage';
import ProfilePageMobile from './ProfilePageMobile';

export default function ProfilePageWrapper() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <ProfilePageMobile /> : <ProfilePage />;
}
