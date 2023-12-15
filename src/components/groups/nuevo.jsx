import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import io from 'socket.io-client';
import { useGroupsStore } from '../../hooks/useGroupsStore';
import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import hljs from 'highlight.js';
import Swal from 'sweetalert2';
import { SocketContext } from '../../context/SocketContext';
import { useContext } from 'react';

let socket;


export const AddPublication = ({ setAddPublication }) => {

  const { addNewPublication } = useGroupsStore();
  const { user } = useSelector((state) => state.auth);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const { id } = useParams();

  const { socket } = useContext( SocketContext )

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      file: '',
      code: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    data = { ...data, group: id };
  
    const formData = new FormData();
  
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('code', data.code);
    formData.append('group', data.group);
    formData.append('file', data.file);
  
    const resp = addNewPublication(formData);
  
    if (resp) {
      setAddPublication(false);
  
      socket.emit('nueva-publicacion', (data) =>{
        console.log(data)
      })
  
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se ha creado una nueva publicacion',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  
    // Detectar el lenguaje del código
    const codeLanguage = hljs.highlightAuto(code).language;
    setLanguage(codeLanguage);
  });

  return (
    <div className='w-full xl:w-11/12 mx-auto mt-5 mb-10 px-2 '>
      <form
        className='grid gap-5 w-full  justify-center items-center'
        onSubmit={onSubmit}
        encType='multipart/form-data'
      >
        <div>
          <input
            {...register('title', {
              required: {
                value: true,
                message: 'El titulo es requerido',
              },
              minLength: 2,
            })}
            type='text'
            placeholder='Title'
            className='p-3 rounded-lg bg-neutral-800 focus:outline-none focus:ring-0 w-full'
          />
          {errors.title && (
            <span className='text-sm text-red-700 '>
              {errors.title.message}
            </span>
          )}
          <textarea
            {...register('description', {
              required: {
                value: true,
                message: 'La descripcion es requerida',
              },
              minLength: 2,
            })}
            className='resize-none rounded-lg bg-neutral-800 p-5 mt-4 w-full focus:outline-none focus:ring-0'
            placeholder='Escribe una descripción'
            // value={code}
            // onChange={(e) => {
            //   setCode(e.target.value);
            // }}
          ></textarea>
          {errors.description && (
            <span className='text-sm text-red-700 '>
              {errors.description.message}
            </span>
          )}

          <textarea
            {...register('code', {
              required: {
                value: false,
              },
              minLength: 2,
            })}
            className='resize-none rounded-lg bg-neutral-800 p-5 mt-4 w-full focus:outline-none focus:ring-0'
            placeholder='Si necesitas escribir codigo puedos hacerlo aqui!'
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></textarea>
          {errors.code && (
            <span className='text-sm text-red-700 '>{errors.code.message}</span>
          )}
        </div>
        <div className='flex justify-between items-center '>
          <div>
            <input
              className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-600 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-800 dark:file:text-neutral-100 dark:focus:border-primary'
              type='file'
              onChange={(e) => {
                setValue('file', e.target.files[0]);
              }}
              name='file'
            />
            {errors.archivo && <span>{errors.archivo.message}</span>}
          </div>

          <div>
            <button
              type='submit'
              className='bg-purple-700 text-white text-sm font-black px-5 py-3 rounded-lg   hover:bg-purple-950 transition-colors duration-300'
            >
              Publicar
            </button>
          </div>
        </div>
      </form>

      {/* Resaltado de sintaxis */}
      {code && (
        <SyntaxHighlighter
          language={language}
          style={materialDark}
          className='rounded-lg'
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
};