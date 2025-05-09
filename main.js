let api = "https://restcountries.com/v3.1/all";
let cardContainer = document.querySelector(".card-container");
let input = document.querySelector("input");
let button = document.querySelector("#search-button");
let moon = document.querySelector("#moon");
let sun = document.querySelector("#sun");
let card = document.querySelector(".card");

async function fetchData() {
  cardContainer.innerHTML = '<div class="spinner"></div>';
  try {
    let response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    cards(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    cardContainer.innerHTML =
      "<p>Failed to load data. Please try again later.</p>";
  }
}

function cards(data) {
  if (!data || data.length === 0) {
    cardContainer.innerHTML = "<p>No countries found.</p>";
    return;
  }

  cardContainer.innerHTML = "";
  data.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${element.flags.png}" alt="flag" class="flag" />
      <p class="name">${element.name.common}</p>
    `;

    cardContainer.appendChild(card);
  });
}

function filtercards(query) {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    let name = card.querySelector(".name").textContent.toLowerCase();
    if (name.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

input.addEventListener("keyup", (e) => {
  let query = e.target.value.toLowerCase().trim();
  if (query) {
    filtercards(query);
  } else {
    filtercards("");
  }
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  let query = input.value.toLowerCase().trim();
  if (query) {
    filtercards(query);
  } else {
    alert("Please enter a search term.");
  }
});

sun.addEventListener("click", () => {
  document.querySelector("body").style.backgroundColor = "white";
  document.querySelector("body").style.color = "black";
  document.querySelector("body").style.transition = "1s;";
  document.querySelector("header").style.backgroundColor = "white";
  document.querySelector("input").style.backgroundColor = "#e0e0e0";
  document.querySelector("input").style.color = "black";
  document.querySelector(".card").style.backgroundColor = "#e0e0e0";

  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.backgroundColor = "#e0e0e0";
    card.style.transition = "1s;";
  });

  sun.style.display = "none";
  moon.style.display = "block";
});

moon.addEventListener("click", () => {
  document.querySelector("body").style.backgroundColor = "#202c36";
  document.querySelector("body").style.color = "white";
  document.querySelector("body").style.transition = "1s;";
  document.querySelector("header").style.backgroundColor = "#2b3844";
  document.querySelector("input").style.backgroundColor = "#2b3844";
  document.querySelector("input").style.color = "white";

  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.backgroundColor = "#2b3844";
  });

  sun.style.display = "block";
  moon.style.display = "none";
});

fetchData();
