import React, { useState } from 'react';

import { countries } from 'countries-list';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';

import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { AiOutlineArrowDown } from 'react-icons/ai';

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <AiOutlineArrowDown
          className={`ml-auto transition-transform duration-500 ease-out  ${
            isEnter && 'rotate-180'
          }`}
        />
      </>
    )}
    className='border-b'
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left hover:bg-purple-800 ${
          isEnter && 'bg-neutral-700 '
        }`,
    }}
    contentProps={{
      className: 'transition-height duration-500 ease-out',
    }}
    panelProps={{ className: 'p-4' }}
  />
);

export const ConfigurationProfile = () => {
  const { updateUser, errorMessage } = useAuthStore();

  const [selectedCountry, setSelectedCountry] = useState('');
  const countryOptions = Object.keys(countries).map((code) => ({
    value: code,
    label: countries[code].name ? countries[code].name : '',
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

    const res = updateUser(data);

    if (res) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se ha actualizado correctamente',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  });

  return (
    <div className='flex flex-col items-end'>
      <div className='w-full flex justify-center items-center mb-4'>
        <h2 className='text-2xl font-black'>Configuracion</h2>
      </div>
      <div className='w-full flex justify-start items-center'>
        <form className='mx-2 my-4 border bg-neutral-800 rounded-lg w-full'>
          <Accordion className='font-black' transition transitionTimeout={500}>
            <AccordionItem header=' Cambiar Nombre'>
              <div className='my-5 grid'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Nuevo Nombre
                </label>
                <input
                  type='text'
                  id='name'
                  className='w-full bg-neutral-800 text-white p-2.5 rounded-lg border border-neutral-500'
                  {...register('name')}
                />
              </div>
            </AccordionItem>

            <AccordionItem header='Cambiar Apellidos'>
              <div className='my-5 grid'>
                <label
                  htmlFor='lastName'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Apellidos
                </label>
                <input
                  type='text'
                  id='LastName'
                  className='w-full bg-neutral-800 text-white p-2.5 rounded-lg border border-neutral-500'
                  {...register('lastName')}
                />
              </div>
            </AccordionItem>

            <AccordionItem header='Cambiar Numero de Telefono'>
              <div className='my-5 grid'>
                <label
                  htmlFor='phone'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Numero de telefono
                </label>
                <input
                  type='tel'
                  id='phone'
                  className='bg-neutral-800 text-white p-2.5 rounded-lg border border-neutral-500 w-full'
                  placeholder='000-000-0000'
                  pattern='\d{3}-\d{3}-\d{4}'
                  {...register('phoneNumber')}
                />
              </div>
            </AccordionItem>

            <AccordionItem header=' Cambiar Pais'>
              <div className='my-5 grid text-neutral-900'>
                <label
                  htmlFor='pais'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Pais
                </label>
                <Select
                  {...register('country')}
                  value={selectedCountry}
                  onChange={handleChange}
                  options={countryOptions}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: '#262626',
                      color: '#000',
                      borderColor: '#737373',
                      padding: '4px',
                      borderRadius: '7px',
                      width: '100%',
                    }),
                  }}
                />
              </div>
            </AccordionItem>

            <AccordionItem header='Cambiar Password'>
              <div className='my-5 grid'>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  placeholder='•••••••••'
                  id='password'
                  className='w-full bg-neutral-800 text-white p-2.5 rounded-lg border border-neutral-500'
                  {...register('password', {
                    minLength: {
                      value: 8,
                      message: 'Minimo 8 caracteres',
                    },
                  })}
                />
              </div>
              <div className='my-5 grid'>
                <label
                  htmlFor='confirmPassword'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Confirmar Password
                </label>
                <input
                  type='password'
                  id='confirm_password'
                  className='w-full bg-neutral-800 text-white p-2.5 rounded-lg border border-neutral-500'
                  placeholder='•••••••••'
                  {...register('password_confirm', {
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
            </AccordionItem>

            <AccordionItem header='Agregar Github'>
              <div className='my-5 grid'>
                <label
                  htmlFor='github'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  URL github
                </label>
                <input
                  type='text'
                  id='github'
                  className='w-full bg-neutral-800 text-white p-2.5 rounded-lg border border-neutral-500'
                  {...register('github')}
                />
              </div>
            </AccordionItem>
          </Accordion>

          {errorMessage ? (
            <p className='text-xl text-red-600 font-semibold uppercase text-center mt-5'>
              {errorMessage}
            </p>
          ) : (
            ''
          )}
        </form>
      </div>
      <button
        onClick={onSubmit}
        className='mt-4 bg-purple-700 text-white text-sm font-black px-5 py-3 rounded-lg  hover:bg-purple-950 transition-colors duration-300 mr-2'
      >
        Guardar
      </button>
    </div>
  );
};
