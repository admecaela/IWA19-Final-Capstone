//imports books from data file.
import { authors, genres, books } from "./data.js";

const matches = books;
let page = 1;

//Gives errors when contexts is not found.
if (!books && !Array.isArray(books)) {
  throw new Error('Source required');
}
if (!page && page.length < 2) {
  throw new Error('Range must be an array with two numbers');
}

//Adds the booklist that is stored in the data file (data.js).
const bookList = document.querySelector('[data-list-items]');
const fragment = document.createDocumentFragment();
let startIndex = 0;
let endIndex = 36;

const extracted = books.slice(startIndex, endIndex);

//function dynamically creates HTML elements for each book and displays them in a container with the id "book-previews".
for (let i = 0; i < extracted.length; i++) {
  const sneakPeak = document.createElement('dl');
  sneakPeak.className = 'preview';
  sneakPeak.dataset.id = books[i].id;
  sneakPeak.dataset.title = books[i].title;
  sneakPeak.dataset.image = books[i].image;
  sneakPeak.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`;
  sneakPeak.dataset.description = books[i].description;
  sneakPeak.dataset.genre = books[i].genres;

  sneakPeak.innerHTML = /*html*/`
    <div>
      <image class='preview__image' src="${books[i].image}" alt="no picture available" />
    </div>
    <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}</dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
    </div>`;

  fragment.appendChild(sneakPeak);
}

bookList.appendChild(fragment);

//Code to display settings for the website ( to filter page or change the settings from 'day' or 'night').
const search = document.querySelector("[data-header-search]");
search.addEventListener('click', (event) => {
  event.preventDefault()
  document.querySelector("[data-search-overlay]").style.display = "block";
});

const searchCancelButton = document.querySelector("[data-search-cancel]");
searchCancelButton.addEventListener('click', (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});



const Settings = document.querySelector("[data-header-settings]");
Settings.addEventListener('click', (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
});

const settingsCancel = document.querySelector('[data-settings-cancel]');
settingsCancel.addEventListener('click', (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
});

//The searchBooks function takes a phrase and searches for books whose titles or authors contain the given phrase.
//It returns an array of matching books.
document.querySelector('[data-header-search]').addEventListener('click', (event) => {
  if (event.target.getAttribute('data-close-button')) {
    document.querySelector('[data-search-overlay]').hideModel();
  }
});

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').close();
});

//Theme 
const themeSelect = document.querySelector('[data-settings-theme]');

// Define the color values for the day and night themes.
const themeMode = {
  day: {
    dark: '10, 10, 20',
    light: '255, 255, 255',
  },
  night: {
    dark: '255, 255, 255',
    light: '10, 10, 20',
  }
}
const form = document.getElementById('settings');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const theme = themeSelect.value;
  document.documentElement.style.setProperty('--color-dark', themeMode[theme].dark);
  document.documentElement.style.setProperty('--color-light', themeMode[theme].light);
});

// Initialize theme based on user's OS theme preference.
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = prefersDarkMode ? 'night' : 'day';
document.documentElement.style.setProperty('--color-dark', themeMode[initialTheme].dark);
document.documentElement.style.setProperty('--color-light', themeMode[initialTheme].light)

//Code that shows books title, book summary, image and year it came out.
const detailsToggle = (event) => {
  const overlay1 = document.querySelector('[data-list-active]');
  const title = document.querySelector('[data-list-title]');
  const subtitle = document.querySelector('[data-list-subtitle]');
  const description = document.querySelector('[data-list-description]');
  const image1 = document.querySelector('[data-list-image]');
  const imageblur = document.querySelector('[data-list-blur]');

  if (event.target.dataset.id) {
    overlay1.style.display = "block";
  }
  if (event.target.dataset.description) {
    description.innerHTML = event.target.dataset.description;
  }
  if (event.target.dataset.subtitle) {
    subtitle.innerHTML = event.target.dataset.subtitle;
  }
  if (event.target.dataset.title) {
    title.innerHTML = event.target.dataset.title;
  }
  if (event.target.dataset.image) {
    image1.setAttribute('src', event.target.dataset.image);
    imageblur.setAttribute('src', event.target.dataset.image);
  }
};

//Function to click on the books.
const detailsClose = document.querySelector('[data-list-close]');
detailsClose.addEventListener('click', () => {
  document.querySelector("[data-list-active]").style.display = "none";
});

bookList.addEventListener('click', detailsToggle);

const showMoreButton = document.querySelector('[data-list-button]');

//The button at the bottom of page to show more books that is on website.
const handleShowMore = () => {
  const fragment = document.createDocumentFragment();
  startIndex += 36;
  endIndex += 36;
  const startIndex2 = startIndex;
  const endIndex2 = endIndex;
  const extracted = books.slice(startIndex2, endIndex2);

  for (const { author, image, title, id, description, published } of extracted) {
    const preview = document.createElement('dl');
    preview.className = 'preview';
    preview.dataset.id = id;
    preview.dataset.title = title;
    preview.dataset.image = image;
    preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`;
    preview.dataset.description = description;

    preview.innerHTML = /*html*/ `
      <div>
        <image class='preview__image' src="${image}" alt="book pic" />
      </div>
      <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
      </div>`;

    fragment.appendChild(preview);
  }

  const bookList2 = document.querySelector('[data-list-items]');
  bookList2.appendChild(fragment);

  //The button function for it to work
  const numItemsToShow = Math.min(books.length - endIndex,);
  showMoreButton.innerHTML = `Show More <span>(${numItemsToShow})</span>`;
};

showMoreButton.addEventListener('click', handleShowMore);