import React, { useEffect, useState } from 'react';
import { ImLocation2 } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { AiFillPhone, AiFillGithub } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { AddDescription } from '../../components/profile/AddDescription';
import { UserImage } from '../../components/profile/UserImage';
import { UserBanner } from '../../components/profile/UserBanner';
import { PublicationProfile } from '../../components/profile/PublicationProfile';
export const UserPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <header className='w-full bg-neutral-800  rounded-lg hover:bg-purple-900/30 transition-colors'>
        <div className=' w-full h-72 relative  '>
          <UserBanner />
          <UserImage />
        </div>

        <div className='  rounded-lg mt-20'>
          <div className=' p-3 rounded-lg '>
            <div className='w-full xl:w-11/12 mx-auto '>
              <h3 className='text-xl font-semibold capitalize'>
                {user.name} {user.lastName}
              </h3>

              <AddDescription />
              <div className='mt-5 '>
                <ul className='flex  flex-col lg:flex-row justify-between space-y-5 lg:space-y-0 lg:items-center'>
                  <li className='flex items-center font-light '>
                    {' '}
                    <ImLocation2 className='w-6 h-6 mr-2   text-neutral-400' />
                    {user.country}
                  </li>
                  <li className='flex items-center font-light'>
                    <MdEmail className='w-6 h-6 mr-2 text-neutral-400' />
                    {user.email}
                  </li>
                  <li className='flex items-center font-light'>
                    <AiFillPhone className='w-6 h-6 mr-2 text-neutral-400' />
                    {user.phoneNumber}
                  </li>
                  <li className='flex items-center font-light'>
                    <AiFillGithub
                      onClick={() => window.open(user.github, '_blank')}
                      className='w-6 h-6 mr-2 text-neutral-400 cursor-pointer'
                    />
                    {user.github?.split('/')[3]}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <PublicationProfile />
    </>
  );
};
