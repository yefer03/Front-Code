import React from 'react';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

export const Auth = () => {
  return (
    <div className=' w-full overflow-x-auto'>
      <LoginPage />
      <RegisterPage />
    </div>
  );
};
