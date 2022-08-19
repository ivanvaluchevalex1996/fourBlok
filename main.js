let input = document.querySelector(".input");
let menu = document.querySelector(".menu");
let list = document.querySelector(".list");

function searchUsers(name) {
  fetch(`https://api.github.com/search/repositories?q=${name}&per_page=5`).then(
    (res) => {
      res.json().then((res) => {
        res.items.map((elem) => {
          constructElem(
            `${elem.name}`,
            `${elem.owner.login}`,
            `${elem.stargazers_count}`
          );
        });
      });
    }
  );
}

const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

function constructElem(name, owner, star) {
  const item = document.createElement("p");
  item.classList.add("input__api-names");
  item.innerHTML = name.toUpperCase();
  menu.append(item);
  item.addEventListener("click", () => constructRepo(name, owner, star));
}

let timeOut = debounce(searchUsers, 1000);
let inputSearch = (event) => {
  input.value ? timeOut(event.target.value) : "";
  menu.innerHTML = "";
};
input.addEventListener("keyup", inputSearch);

function constructRepo(name, owner, star) {
  const item = document.createElement("p");
  item.classList.add("list__api-names");
  item.innerText = `Name: ${name}\n Owner: ${owner}\n Stars: ${star}`;
  list.append(item);
  closeItem(item);
  menu.innerHTML = "";
  input.value = "";
}

function closeItem(removeItem) {
  let closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  list.append(closeButton);
  closeButton.addEventListener("click", () => {
    closeButton.remove();
    removeItem.remove();
  });
}

const deleteElement = (el) => {
  el.parentNode.remove();
  el.onclick = null;
};
