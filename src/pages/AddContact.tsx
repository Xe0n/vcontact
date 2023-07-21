import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { getTags } from '~/services/api';
import { TagsType } from '../types/types';
const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    tag: yup.string().required()
  }).required();
type FormType = yup.InferType<typeof schema>;


const AddContact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormType>({
    resolver: yupResolver(schema)
  });
  const [defTag, setDefTag] = useState('7')
  const [tags, setTages] = React.useState<TagsType[]>()
  const navigate = useNavigate()
  const getTagData = async () => {
    try {
      const response = await getTags(); 
      setTages(response);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const onSubmit: SubmitHandler<FormType> = async (data:FormType) => {
    console.log(data)
    const requestBody = {
        data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                tag: {
                    disconnect: [],
                    connect: [{
                        id: parseInt(data.tag),
                        position: {end: true}
                    }]
                }
        },
      };
    await fetch(`${import.meta.env.VITE_API}/peoples/`, {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${import.meta.env.VITE_APITOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody) 
    })
    navigate('/')
  };

  React.useEffect(() => {
    getTagData();
  }, [])
  React.useEffect(() => {
    reset()
  }, [tags])
  return (
    <div className='min-h-full max-w-7xl m-auto pt-5 px-5 sm:px-0'>
      <div className='lg:flex lg:items-center lg:justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            Добавить контакт
          </h2>
        </div>
        <div className='mt-5 flex lg:ml-4 lg:mt-0'>
          <span className='sm:ml-3'>
            <Link to="/">
            <button
              type='button'
              className='inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ml-3'
              
            >
              <ArrowUturnLeftIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
              Назад
            </button>
            </Link>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ФИО
                </label>
                <input
                  className='input input-bordered w-full max-w-xs'
                  placeholder='bill'
                  {...register('name')}
                />
                  <p className='text-red-500'>{errors.name?.message}</p>
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='Email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email
                </label>
                <input
                  className='input input-bordered w-full max-w-xs'
                  placeholder='bluebill1049@hotmail.com'
                  type='email'
                  {...register('email')}
                />
                <p className='text-red-500'>{errors.email?.message}</p>
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='Email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Телефон
                </label>
                <input
                  className='input input-bordered w-full max-w-xs'
                  placeholder='+998900610897'
                  type='text'
                  {...register('phone')}
                />
                <p className='text-red-500'>{errors.phone?.message}</p>
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='Email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Группа
                </label>
                <select 
                    className="select select-bordered w-full max-w-xs" 
                    {...register('tag')} 
                    value={defTag}
                    onChange={(e) => setDefTag(e.target.value)}
                >
                    {tags?.map(item => (
                       <option key={item.id} value={item.id}>{item.attributes.tag}</option>  
                    ))}
                </select>
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <input
                  type='submit'
                  className='rounded-md bg-indigo-600 px-3 cursor-pointer py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddContact;
