import React from 'react';
import ProfilePage from './ProfilePage';
import ProfilePageMobile from './ProfilePageMobile';

export default function ProfilePageWrapper() {
  const isMobile = window.innerWidth <= 768; // можно подкорректировать порог

  return isMobile ? <ProfilePageMobile /> : <ProfilePage />;
}