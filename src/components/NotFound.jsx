import React from 'react';
import { BsFillEmojiFrownFill } from 'react-icons/bs';

export const NotFound = () => {
  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='animate__animated animate__bounceInDown txt-center text-9xl text-purple-700 align-text mb-10'>
          Oops!
        </h1>

        <p className='text-white text-6xl text-center uppercase mb-5 flex flex-row'>
          404 Error ━ page not found
        </p>

        <BsFillEmojiFrownFill className='text-white w-32 h-32' />
      </div>
    </>
  );
};
