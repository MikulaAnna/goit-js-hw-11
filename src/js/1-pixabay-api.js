import axios from 'axios';

export async function getImages(searchQuery, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';

  const params = {
    key: '42958097-9b7fc012df8e9620edb2fab69',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  };

  const res = await axios.get(BASE_URL, { params });
  return res.data;
}