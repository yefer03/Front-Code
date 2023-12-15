import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarComponent } from '../components/NavbarComponent';
export const LayoutHome = () => {
  return (
    <section className="h-screen w-full overflow-x-hidden ">
      <div className="container mx-auto w-full  sm:w-3/4  xl:w-4/6   rounded-lg  ">
        <section className="container   w-full h-full mt-2 text-white   rounded-lg ">
          <div className="xl:grid">
            <NavbarComponent />
            <Outlet />
          </div>
        </section>
      </div>
    </section>
  );
};
