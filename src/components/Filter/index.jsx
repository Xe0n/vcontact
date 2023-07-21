import React from 'react';
const Filter = ({ getSearch, tagSelected, tags }) => {
    return (<>
      <div className='form-control  flex-row items-center'>
        <select className='select select-bordered mr-3' onChange={(event) => tagSelected(event.target.value)}>
          <option selected value='0'>
            Все
          </option>
          {tags?.map((item) => (<option value={item.id}>{item.attributes.tag}</option>))}
        </select>

        <input type='text' placeholder='Поиск по ФИО / Телефону' className='input input-bordered w-full max-w-xs' onChange={(event) => getSearch(event.target.value)}/>
      </div>
    </>);
};
export default Filter;
