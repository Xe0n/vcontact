import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getTags } from '~/services/api';
import { CalendarIcon, ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
const Contact = () => {
    const { id } = useParams();
    const [people, setPeople] = React.useState();
    const [tags, setTages] = React.useState();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const getPeople = async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/peoples/${id}?populate=*`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_APITOKEN}` },
        });
        const data = await response.json();
        setPeople(data.data);
    };
    const getTagData = async () => {
        try {
            const response = await getTags();
            setTages(response);
        }
        catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };
    const onSubmit = async (data) => {
        const requestBody = {
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                tag: {
                    connect: [
                        {
                            id: parseInt(data.tag),
                        },
                    ],
                    disconnect: [
                        {
                            id: people?.attributes.tag.data.id,
                        },
                    ],
                },
            },
        };
        await fetch(`${import.meta.env.VITE_API}/peoples/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_APITOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        navigate('/');
    };
    React.useEffect(() => {
        getPeople();
        getTagData();
    }, []);
    if (!people || !tags) {
        return (<>
        <span className='loading loading-spinner text-success flex justify-center w-16 h-16 mt-16 mx-auto'></span>
      </>);
    }
    console.log(tags);
    return (<div className='min-h-full max-w-7xl m-auto pt-5 px-5 sm:px-0'>
      <div className='lg:flex lg:items-center lg:justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            {people.attributes.name}
          </h2>
          <div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
            <div className='mt-2 flex items-center text-sm text-gray-500'>
              <CalendarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true'/>
              {people.attributes.publishedAt}
            </div>
          </div>
        </div>
        <div className='mt-5 flex lg:ml-4 lg:mt-0'>
          <span className='sm:ml-3'>
            <Link to='/'>
              <button type='button' className='inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ml-3'>
                <ArrowUturnLeftIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true'/>
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
                <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
                  ФИО
                </label>
                <input className='input input-bordered w-full max-w-xs' defaultValue={people.attributes.name} placeholder='bill' {...register('name')}/>
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label htmlFor='Email' className='block text-sm font-medium leading-6 text-gray-900'>
                  Email
                </label>
                <input className='input input-bordered w-full max-w-xs' defaultValue={people.attributes.email} placeholder='bluebill1049@hotmail.com' type='email' {...register('email')}/>
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label htmlFor='Email' className='block text-sm font-medium leading-6 text-gray-900'>
                  Телефон
                </label>
                <input className='input input-bordered w-full max-w-xs' defaultValue={people.attributes.phone} placeholder='bluebill1049@hotmail.com' type='phone' {...register('phone')}/>
              </div>
            </div>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label htmlFor='Email' className='block text-sm font-medium leading-6 text-gray-900'>
                  Группа
                </label>
                <select className='select select-bordered w-full max-w-xs' {...register('tag')} defaultValue={people.attributes.tag?.data?.id}>
                  {tags?.map((item) => (<option value={item.id}>{item.attributes.tag}</option>))}
                </select>
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <input type='submit' className='rounded-md bg-indigo-600 px-3 cursor-pointer py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>);
};
export default Contact;
