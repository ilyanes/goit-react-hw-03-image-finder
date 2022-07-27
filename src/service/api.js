const API_KEY = `23049135-63d939595882c9f020474dd76`;
const BASE_URL = `https://pixabay.com/api/`;

const fetchImages = (searchQuery, page = 1, perPage = 12) => {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  return fetch(url)
    .then(response => {
      // console.log(searchQuery);
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(
          `no results were found for your search ${this.state.searchQuery}`,
        ),
      ); // если 404
    })
    .then(images => images.hits);
};
export default fetchImages;
