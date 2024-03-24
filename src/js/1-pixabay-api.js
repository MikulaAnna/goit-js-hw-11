import { showLoader, form } from '../main';

export function fetchImages() {
  const inputValue = form.elements.search.value.trim().split(',').join('+');
  const API_KEY = '42958097-9b7fc012df8e9620edb2fab69';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: [inputValue],
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  showLoader();
  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
