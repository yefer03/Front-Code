import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../hooks/useAuthStore';
import { scrollForId } from '../../hooks/scrollForId';
import { BiLogIn } from 'react-icons/bi';

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    startLogin(data);
  });

  return (
    <section className='h-screen flex justify-center items-center ' id='login'>
      <div className='bg-neutral-700/25  rounded-lg w-full sm:w-3/5 xl:w-1/4 border border-neutral-500 '>
        <div className='w-full flex  items-start justify-start  border-b border-neutral-500 p-5'>
          <h1 className='text-lg text-white font-black '>
            Entra en{' '}
            <span className='text-xl'>
              <TypeAnimation
                sequence={[
                  'Code',
                  2000,
                  'Code Connect.',
                  2000,
                  'Conectando Desarrolladores.',
                  2000,
                ]}
                speed={50}
                className='text-accent text-purple-700'
                wrapper='span'
                repeat={Infinity}
              />
            </span>
          </h1>
        </div>
        <form onSubmit={onSubmit} className='p-5'>
          <div className='grid gap-6 items-center justify-center mt-4  '>
            <div className='mb-2 flex items-center'>
              <label
                htmlFor='email'
                className='block mr-2 text-md font-medium text-neutral-400'
              >
                "Email":
              </label>
              <input
                type='email'
                id='email'
                className='form-control '
                autoComplete='off'
                placeholder='{ email }'
                {...register('email', {
                  required: {
                    value: true,
                    message: 'El email es requerido',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                    message: 'El email no es valido',
                  },
                })}
              />
              {errors.email && (
                <span className='text-sm text-red-700 '>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='mb-6 flex items-center'>
              <label
                htmlFor='password'
                className='block mr-2 text-md font-medium text-neutral-400'
              >
                "Password":
              </label>
              <input
                type='password'
                id='password'
                className='form-control'
                placeholder='{ password }'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'El password es rquerido',
                  },
                  minLength: {
                    value: 8,
                    message: 'Minimo 8 caracteres',
                  },
                })}
              />
              {errors.password && (
                <span className='text-sm text-red-700 '>
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className='flex w-full justify-end'>
            <button
              type='submit'
              className='flex justify-center items-center  bg-purple-700 w-1/3  text-white  text-md font-black py-2 rounded-lg  hover:bg-purple-950 transition-colors duration-300'
            >
              Login
            </button>
            {errorMessage ? (
              <p className='text-xl text-red-600 font-semibold uppercase text-center mt-5'>
                {errorMessage}
              </p>
            ) : (
              ''
            )}
          </div>
        </form>
        <div className='w-full flex justify-end'>
          <button
            className='text-md font-medium  text-neutral-100 mr-5   hover:text-neutral-400 transition-colors'
            onClick={() => scrollForId('register')}
          >
            Registrate{' '}
          </button>
        </div>
      </div>
    </section>
  );
};
