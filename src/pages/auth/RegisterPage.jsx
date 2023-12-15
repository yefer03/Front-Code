import React, { useState } from 'react';
import Select from 'react-select';
import { countries } from 'countries-list';
import { TypeAnimation } from 'react-type-animation';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../hooks/useAuthStore';
import { scrollForId } from '../../hooks/scrollForId';

export const RegisterPage = () => {
  const { startRegister, errorMessage } = useAuthStore();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const countryOptions = Object.keys(countries).map((code) => ({
    value: code,
    label: countries[code].name,
  }));

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    data = { ...data, country: selectedCountry.label };
    startRegister(data);
  });

  return (
    <section
      className='sm:h-screen flex justify-center items-center'
      id='register'
    >
      <div className='bg-neutral-700/25  rounded-lg w-full sm:w-10/12 xl:w-2/5 border border-neutral-400'>
        <div className='w-full flex  items-start justify-start  p-5 border-b border-neutral-400'>
          <h1 className='text-lg text-white font-black '>
            Registrate en{' '}
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
        <form onSubmit={onSubmit} className='p-5 '>
          <div className='grid gap-6 items-center mb-6 md:grid-cols-2 '>
            <div className='flex items-center'>
              <label
                htmlFor='first_name'
                className='block mr-2 text-md font-medium text-neutral-400'
              >
                "Name":
              </label>
              <input
                type='text'
                id='first_name'
                className='form-control'
                placeholder='{ name }'
                autoComplete='off'
                {...register('name', {
                  required: {
                    value: true,
                    message: 'El nombre es requerido',
                  },
                  minLength: {
                    value: 2,
                    message: 'El nombre debe tener al menos dos caracteres',
                  },
                  maxLength: {
                    value: 20,
                    message:
                      'EL nombre debe de tener un maximo de 20 caracteres ',
                  },
                })}
              />
              {errors.name && (
                <span className='text-sm text-red-700 '>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className='flex items-center'>
              <label
                htmlFor='last_name'
                className='block mr-2 text-md font-medium text-neutral-400'
              >
                "Last_name":
              </label>
              <input
                {...register('lastName', {
                  required: {
                    value: true,
                    message: 'EL apellido es requerido',
                  },
                  minLength: {
                    value: 2,
                    message: 'El apellido debe tener al menos dos caracteres',
                  },
                  maxLength: {
                    value: 20,
                    message:
                      'EL apellido debe de tener un maximo de 20 caracteres ',
                  },
                })}
                type='text'
                id='last_name'
                className='form-control'
                placeholder='{ lastName } '
                autoComplete='off'
              />
              {errors.lastName === 'required' && (
                <span className='text-sm text-red-700 '>
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div className='flex items-center '>
              <label
                htmlFor='pais'
                className='block mr-2 text-md font-medium text-neutral-400'
              >
                "Country":
              </label>
              <Select
                {...register('country')}
                value={selectedCountry}
                onChange={handleChange}
                options={countryOptions}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: 'none',
                    padding: '4px',
                    width: '200px',
                    outline: 'none',
                  }),
                }}
              />
            </div>
            <div className='flex '>
              <label
                htmlFor='phone'
                className='block mr-2 text-md font-medium text-neutral-400'
              >
                "Phone_number":
              </label>
              <input
                type='tel'
                id='phone'
                className='form-control'
                placeholder='000-000-0000'
                autoComplete='off'
                pattern='\d{3}-\d{3}-\d{4}'
                {...register('phoneNumber', {
                  required: true,
                })}
              />
              {errors.phone && (
                <span className='text-sm text-red-700 '>
                  El telefono es requerido
                </span>
              )}
            </div>
          </div>
          <div className='mb-6 flex items-center'>
            <label
              htmlFor='email'
              className='block mr-2 text-md font-medium text-neutral-400'
            >
              "Email":
            </label>
            <input
              type='email'
              id='email'
              className='form-control'
              placeholder='{ email }'
              autoComplete='off'
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
          <div className='flex items-center mb-5'>
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
                  message: 'El password es requerido',
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
          <div className='flex items-center mb-5'>
            <label
              htmlFor='confirm_password'
              className='block mr-2 text-md font-medium text-neutral-400'
            >
              "Confirm_password":
            </label>
            <input
              type='password'
              id='confirm_password'
              className='form-control'
              placeholder='{ Confirm_password }'
              {...register('password_confirm', {
                required: {
                  value: true,
                  message: 'La confirmacion del password es requerida',
                },
                validate: (value) => {
                  if (value === watch('password')) {
                    return true;
                  } else {
                    return 'EL password no coincide';
                  }
                },
              })}
            />
            {errors.password_confirm && (
              <span className='text-sm text-red-700 '>
                {errors.password_confirm.message}
              </span>
            )}
          </div>
          <div className='flex w-full justify-end '>
            <button
              type='submit'
              className='bg-purple-700 w-1/3  text-white text-lg font-black px-5 py-3 rounded-lg hover:bg-purple-950 transition-colors duration-300'
            >
              Register
            </button>
          </div>
          {errorMessage ? (
            <p className='text-xl text-red-600 font-semibold uppercase text-center sm:text-left'>
              {errorMessage}
            </p>
          ) : (
            ''
          )}
        </form>
        {/* <pre className={`p-5 sm:flex justify-center items-center hidden `}>
          {JSON.stringify(watch(), null, 2)}
        </pre> */}
        <div className='w-full flex justify-end'>
          <button
            className='text-md font-medium  text-neutral-100 mr-5   hover:text-neutral-400 transition-colors'
            onClick={() => scrollForId('login')}
          >
            Iniciar Sesion{' '}
          </button>
        </div>
      </div>
    </section>
  );
};
