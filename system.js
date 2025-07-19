const form = document.querySelector("#search-form");
const listFilm = document.querySelector("#list-film");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  listFilm.innerHTML = "";
  await getFilm();
});

const getFilm = async () => {
  try {
    const keyword = form.elements.query.value;
    const config = {
      params: { q: keyword },
    };
    const req = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    console.log(req);
    getImage(req.data);
  } catch (error) {
    console.log(error);
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
