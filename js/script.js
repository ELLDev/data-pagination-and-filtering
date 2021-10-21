const linkList = document.querySelector("ul.link-list");
const header = document.querySelector("header");
let dataCopy = data;
let lastPage = 0;
header.innerHTML = "";
header.innerHTML += `
<h2>Cheeses</h2>
<label for="search" class="cheese-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`;

showPage = (list, page) => {
  const cheeseList = document.querySelector("ul.cheese-list");
  let startIndex = page * 9;
  let endIndex = page * 9 + 8;
  if (endIndex >= list.length) endIndex = list.length - 1;
  if (list.length < 9) {
    startIndex = 0;
    endIndex = list.length - 1;
  }
  if (page === 0 && list.length >= 9) {
    startIndex = 0;
    endIndex = 8;
  }
  cheeseList.innerHTML = "";

  for (let index = startIndex; index <= endIndex; index++) {
    cheeseList.innerHTML += `
      <li class="cheese-item">
      <div class="cheese-details">
      <img class="avatar" src="${list[index].picture.large}" alt="Cheese Picture">
        <h3>${list[index].name.first} ${list[index].name.last}</h3>
        <span class="type">${list[index].type}</span>
      </div>
      <div class="origin-details">
        <span class="origin">Origin: ${list[index].origin.country}</span>
      </div>
    </li>
    `;
  }
  if (list.length === 0) {
    cheeseList.innerHTML = '<h3 class="warning-message">No results found</h3>';
  }
};

/**
 * Add pagination buttons according to the number of displayed items.
 */

addPagination = (list) => {
  const numberOfPages = Math.ceil(list.length / 9);
  linkList.innerHTML = "";

  for (let index = 1; index <= numberOfPages; index++) {
    linkList.insertAdjacentHTML(
      "beforeend",
      `<li><button type="button">${index}</button></li>`
    );
    linkList.getElementsByTagName("button")[0].className = "active";
  }
};

searchCheese = (list, name) => {
  let regex = new RegExp(name, "i");
  let newList = [];

  for (let index = 0; index < list.length; index++) {
    let fullName = list[index].name.first + " " + list[index].name.last;
    if (
      regex.test(list[index].name.first) ||
      regex.test(list[index].name.last) ||
      regex.test(fullName)
    ) {
      newList.push(list[index]);
    }
  }
  dataCopy = newList;
  showPage(newList, 0);
  addPagination(newList);
};

linkList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    linkList.getElementsByTagName("button")[lastPage].className = "";
    e.target.className = "active";
    lastPage = parseInt(e.target.textContent) - 1;
    showPage(dataCopy, lastPage);
  }
});

showPage(data, 0);
addPagination(data);

const searchBar = document.querySelector("#search");
const searchButton = document.querySelector("label button");
searchBar.addEventListener("keyup", () => {
  searchCheese(data, searchBar.value);
});
searchButton.addEventListener("click", () => {
  searchCheese(data, searchBar.value);
});
