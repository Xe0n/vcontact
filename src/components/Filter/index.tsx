import React from 'react';
import { TagsType } from '~/types/types';
interface FilterProps {
  getSearch: (search: string) => void;
  tagSelected: (val: string) => void;
  tags: TagsType[]
}
const Filter: React.FC<FilterProps> = ({ getSearch, tagSelected, tags }) => {
  return (
    <>
    <div className="form-control  flex-row items-center">

      <select 
        className="select select-bordered mr-3" 
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => tagSelected(event.target.value)}
      >
        <option selected value="0">Все</option>
        {tags?.map(item => (
          <option value={item.id}>{item.attributes.tag}</option>
        ))}
      </select>
    
      <input
          type='text'
          placeholder='Поиск по ФИО / Телефону / Группе'
          className='input input-bordered w-full max-w-xs'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => getSearch(event.target.value)}
        />
      </div>
    </>
  );
};
export default Filter;
