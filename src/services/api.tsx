export async function getTags() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/tags?populate=*`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_APITOKEN}` },
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    // Обработка ошибок или можно просто перевыбросить ошибку для обработки на компонентах
    throw error;
  }
}
