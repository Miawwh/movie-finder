const form = document.querySelector("#search-form");
const listFilm = document.querySelector("#list-film");
const input = document.querySelector("input");
const childListFilm = listFilm.children;

const getFilm = async () => {
  try {
    const keyword = form.elements.query.value;
    const config = {
      params: { q: keyword },
    };
    const req = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    getImage(req.data);
  } catch (error) {
    listFilm.querySelector("h2").remove();
    const textError = document.createElement("h3");
    textError.classList.add("text-white", "py-2");
    textError.innerText = `Maaf, kami tidak dapat mengambil data film saat ini. Coba lagi nanti ya!`;
    listFilm.append(textError);
  }
};

const getImage = (shows) => {
  for (let result of shows) {
    if (
      result.show.image &&
      result.show.url &&
      result.show.name &&
      result.show.rating.average
    ) {
      const img = document.createElement("img");
      img.src = result.show.image.medium;
      img.classList.add("card-img-top", "rounded");
      const linkFilm = document.createElement("a");
      linkFilm.href = result.show.url;
      linkFilm.target = " _blank";
      linkFilm.appendChild(img);
      const wrapFilm = document.createElement("div");
      wrapFilm.classList.add("col-lg-3", "col-md-6", "mt-2");
      const addCard = document.createElement("div");
      addCard.classList.add("card", "h-100");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const h4 = document.createElement("h4");
      h4.classList.add("card-title");
      h4.innerText = result.show.name;
      cardBody.append(h4);
      const rating = document.createElement("p");
      rating.classList.add("text-muted");
      const iconStar = document.createElement("i");
      iconStar.classList.add("bi", "bi-star-fill", "me-1");
      rating.append(iconStar);
      rating.append(`${result.show.rating.average} / 10`);
      addCard.append(linkFilm);
      addCard.append(cardBody);
      addCard.append(rating);

      listFilm.append(wrapFilm);
      wrapFilm.append(addCard);
    }
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (input.value === "") {
    return;
  }

  listFilm.innerHTML = "";

  const resultInput = document.createElement("h2");
  resultInput.classList.add("text-white");
  resultInput.innerText = `Hasil pencarian untuk: "${input.value.trim()}"`;
  listFilm.append(resultInput);

  await getFilm();

  if (childListFilm.length === 1 && childListFilm[0].tagName === "H2") {
    const textNoFoundFilm = document.createElement("h3");
    textNoFoundFilm.classList.add("text-warning", "py-2");
    textNoFoundFilm.innerText = `Hasil untuk "${input.value.trim()}" tidak ditemukan. Coba kata kunci lain ya!`;
    listFilm.querySelector("h2").remove();
    listFilm.append(textNoFoundFilm);
  }
});
