const API_KEY = '28235798-10089aa8a519f6d1c62a23eff';
async function fetchIMG(query, page) {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}`
  ).then(res => res.json());
}

export default fetchIMG;
