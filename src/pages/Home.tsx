import React from 'react';
//** Component */
import Lists from '../components/Lists';
import Filter from '~/components/Filter';
import { getTags } from '~/services/api';
import { Person, TagsType } from '../types/types';

const Home: React.FC = () => {
  const [search, setSearch] = React.useState<string>();
  const [people, setPeople] = React.useState<Person[]>([]);
  const [peopleFiltred, setPeopleFiltred] = React.useState<Person[]>([]);
  const [tags, setTags] = React.useState<TagsType[]>();
  const [currentTag, setCurrentTag] = React.useState<string>('0');
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  console.log(currentTag);
  const getSearch = (value: string) => {
    setSearch(value);
  };
  const tagSelected = (value: string) => {
    setCurrentTag(value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPeoples = async (): Promise<void> => {
    const response = await fetch(
      `${import.meta.env.VITE_API}/peoples?populate=*&sort=publishedAt:desc`,
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_APITOKEN}` },
      },
    );
    const data = await response.json();
    setPeople(data.data);
  };

  const getTagData = async () => {
    try {
      const response = await getTags();
      setTags(response);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const onDel = async (id: string): Promise<void> => {
    const response = await fetch(`${import.meta.env.VITE_API}/peoples/${id}`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_APITOKEN}` },
      method: 'DELETE',
    });
    await response.json();
    getPeoples();
  };

  React.useEffect(() => {
    getPeoples();
    getTagData();
  }, []);

  //Фильтрация
  React.useEffect(() => {
    if (search?.length) {
      const searchResults = people?.filter((item) => {
        const startsWith =
          item.attributes.name.toLowerCase().startsWith(search.toLowerCase()) ||
          item.attributes.email.toLowerCase().startsWith(search.toLowerCase()) ||
          item.attributes.phone.toLowerCase().startsWith(search.toLowerCase());

        const includes =
          item.attributes.name.toLowerCase().includes(search.toLowerCase()) ||
          item.attributes.email.toLowerCase().includes(search.toLowerCase()) ||
          item.attributes.phone.toLowerCase().includes(search.toLowerCase());

        if (currentTag !== '0') {
          const tagFilter = item.attributes.tag.data.id === parseInt(currentTag);
          return (startsWith || includes) && tagFilter;
        } else {
          return startsWith || includes;
        }
      });

      setPeopleFiltred(searchResults);
      setCurrentPage(1);
    } else {
      if (currentTag !== '0') {
        const tagResults = people?.filter(
          (item) => item.attributes.tag.data.id === parseInt(currentTag),
        );
        setPeopleFiltred(tagResults);
        setCurrentPage(1);
      } else {
        setPeopleFiltred(people);
        setCurrentPage(1);
      }
    }
  }, [search, currentTag, people]);

  if (!tags || !people) {
    return (
      <>
        <span className='loading loading-spinner text-success flex justify-center w-16 h-16 mt-16 mx-auto'></span>
      </>
    );
  }

  return (
    <>
      <div className='min-h-full'>
        <header className='bg-white shadow'>
          <div className=' max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mx-auto '>
            <div className='sm:flex flex-col justify-between items-end mb-10'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Ваши контакты</h1>
              <Filter getSearch={getSearch} tags={tags} tagSelected={tagSelected} />
            </div>
            {peopleFiltred.length ? (
              <Lists
                people={peopleFiltred}
                onDel={onDel}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            ) : (
              'Такая запись не найдена =('
            )}
          </div>
        </header>
        <main>
          <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>@artrsv</div>
        </main>
      </div>
    </>
  );
};
export default Home;
