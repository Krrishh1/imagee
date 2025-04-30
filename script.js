const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
const h4El = document.querySelector("h4");

let inputData = "";
let page = 1;

async function searchImages(initialTerm = null) {
  inputData = initialTerm || searchInputEl.value.trim();
  if (!inputData) {
    alert("Please enter a search term");
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}&per_page=30`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    const data = await response.json();

    if (page === 1) searchResultsEl.innerHTML = "";

    const results = data.results;
    if (results.length === 0) {
      searchResultsEl.innerHTML = "<p><b>Sorry , Try a valid search term !!</b></p>";
      showMoreButtonEl.style.display = "none";
      return;
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const imgContainer = document.createElement("div");
      imgContainer.classList.add("img-wrapper");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || "Unsplash image";
      image.loading = "lazy";

      imgContainer.appendChild(image);
      imageWrapper.appendChild(imgContainer);

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.rel = "noopener noreferrer";
      imageLink.textContent = result.alt_description || "View image";

      imageWrapper.appendChild(imageLink);
      searchResultsEl.appendChild(imageWrapper);
    });

    page++;
    showMoreButtonEl.style.display = "block";

  } catch (error) {
    console.error("Error:", error);
    searchResultsEl.innerHTML = `<p>Error loading images: ${error.message}</p>`;
    showMoreButtonEl.style.display = "none";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
  h4El.classList.add("invisible");
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

window.onload = () => {
  page = 1;
  searchImages("random");
};

// Dark mode toggle
const toggleBtn = document.getElementById('toggle-dark');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? "Light Mode" : "Dark Mode";
});

