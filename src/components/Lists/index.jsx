import React from 'react';
import { Link } from 'react-router-dom';
//Рендер списка контактов
const Lists = ({ people, onDel, currentPage, handlePageChange }) => {
    const itemsPerPage = 5;
    // Вычисление индексов элементов для текущей страницы
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = people.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(people.length / itemsPerPage);
    return (<>
      <ul role='list' className='divide-y divide-gray-100'>
        {currentItems?.map((person) => (<li key={person.id} className='grid grid-cols-1 sm:grid-cols-3 gap-4 justify-between gap-x-6 py-5'>
            <div className=''>
              <Link to={`contact${person.id}`}>
                <span className='rounded-full bg-blue-400 w-10 h-10 block p-2 text-white text-center font-bold'>
                  {person.attributes.name.substring(0, 1)}
                </span>
              </Link>

              <div className='min-w-0 flex-auto'>
                <Link to={`contact/${person.id}`}>
                  <p className='text-sm font-semibold leading-6 text-gray-900'>
                    {person.attributes.name}
                  </p>
                  <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                    {person.attributes.email}
                  </p>
                  <p className='font-bold text-md'>{person.attributes.phone}</p>
                </Link>
              </div>
            </div>
            <div className='flex justify-start items-start'>
              <span className='cursor-pointer hover:bg-black hover:text-white sm:ml-3 ml-1 first:ml-0 whitespace-nowrap rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold leading-6 text-slate-700 lg:block'>
                {person.attributes.tag?.data?.attributes.tag}
              </span>
            </div>
            <div className='flex sm:flex-col justify-between items-center sm:items-end'>
              <Link to={`/contact/${person.id}`} className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                {' '}
                Редактировать{' '}
              </Link>
              <span onClick={() => onDel(person.id)} className='rounded-md bg-red-600 cursor-pointer px-9 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                {' '}
                Удалить{' '}
              </span>
            </div>
          </li>))}
      </ul>
      <div className='mt-4'>
        {Array.from({ length: totalPages }).map((_, index) => (<button key={index} className={`${index + 1 === currentPage
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-200 text-indigo-800'} px-3 py-2 mx-1 rounded-md focus:outline-none`} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>))}
      </div>
    </>);
};
export default Lists;
