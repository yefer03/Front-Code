import React, { useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { MdGroups } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { PiNutFill } from 'react-icons/pi';
import { BiLogOut } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { useAuthStore } from '../hooks/useAuthStore';
import { NotificationsComponents } from './home/NotificationsComponents';

export const NavbarComponent = () => {
  const { startLogout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Tu saldras de Code Connect!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, quiero salir!',
    });

    if (isConfirmed) {
      startLogout();
    }
  };

  return (
    <nav className="w-full rounded-lg  p-5 text-white mt-5 bg-neutral-800 mb-5">
      <div className="container mx-auto flex flex-col  2xl:flex-row justify-center lg:justify-between items- lg:items-center">
        <div className="flex justify-between items-center mb-2 2xl:mb-0">
          <NavLink to="/home">
            <h1 className="text-2xl 2xl:text-4xl font-extrabold text-purple-600">
              Code Connect
            </h1>
          </NavLink>
          <button
            className="lg:hidden block text-3xl text-white focus:outline-none"
            onClick={toggleNavbar}
          >
            &#8801;
          </button>
        </div>
        <ul
          className={`lg:flex lg:space-x-4 space-y-4 lg:space-y-0 mt-4 lg:mt-0 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <NavLink
              to="/home"
              className="block text-sm xl:text-lg font-black px-4 py-3 rounded-lg hover:bg-purple-800/50 transition-colors"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsOpenNotification(false);
              }}
            >
              <AiFillHome className="w-6 h-6" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/groups"
              // activeClassName='text-blue-500'
              className="block text-sm xl:text-lg font-black px-4 py-3 rounded-lg hover:bg-purple-800/50 transition-colors"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsOpenNotification(false);
              }}
            >
              <MdGroups className="w-6 h-6" />
            </NavLink>
          </li>
          <li>
            <div className="relative">
              <div
                // to="/notificaciones"
                // activeClassName='text-blue-500'
                className="block text-sm xl:text-lg font-black px-4 py-3 rounded-lg hover:bg-purple-800/50 transition-colors cursor-pointer"
                onClick={() => setIsOpenNotification(!isOpenNotification)}
              >
                <span>
                  <IoMdNotifications className="w-6 h-6" />
                </span>
                {isOpenNotification && (
                  <div className="absolute right-0 mt-10 ">
                    <NotificationsComponents />
                  </div>
                )}
              </div>
            </div>
          </li>
          <li>
            <NavLink
              to="/profile"
              // activeClassName='text-blue-500'
              className="block text-sm xl:text-lg font-black px-4 py-3 rounded-lg hover:bg-purple-800/50 transition-colors"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsOpenNotification(false);
              }}
            >
              <CgProfile className="w-6 h-6" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/configuration"
              // activeClassName='text-blue-500'
              className="block text-sm xl:text-lg font-black px-4 py-3 rounded-lg hover:bg-purple-800/50 transition-colors"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsOpenNotification(false);
              }}
            >
              <PiNutFill className="w-6 h-6" />
            </NavLink>
          </li>
          <li
            onClick={logout}
            // activeClassName='text-blue-500'
            className="block text-sm xl:text-lg
            font-black px-4 py-3 rounded-lg hover:bg-purple-800/50
            transition-colors"
          >
            <BiLogOut className="w-6 h-6" />
          </li>
        </ul>
      </div>
    </nav>
  );
};
