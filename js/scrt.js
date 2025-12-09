// hero
const text = "Brewed in Balance.";
const speed = 90;

let i = 0;

function typeEffect() {
  if (i < text.length) {
    document.getElementById("typewriter").textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, speed);
  }
}

window.onload = typeEffect;

// Toggle class active humberger menu
const navbarNav = document.querySelector(".navbar-nav");
const hm = document.querySelector("#hamburger-menu");

// hamburger menu toggle
hm.addEventListener("click", function (e) {
  e.stopPropagation(); // <== SOLUSI
  navbarNav.classList.toggle("active");
});

// Toggle class active untuk search
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Klik di luar search form untuk menutup
document.addEventListener("click", function (e) {
  // kalau kliknya bukan di search form dan bukan di tombol search
  if (!searchForm.contains(e.target) && !e.target.closest("#search-button")) {
    searchForm.classList.remove("active");
  }
});

// Klik di luar sidebar untuk menutup nav
document.addEventListener("click", function (e) {
  if (!navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

/* DATA SEARCH */
const searchData = [
  // Halaman utama
  { keyword: "home", target: "#home" },
  { keyword: "menu", target: "#menu" },
  { keyword: "product", target: "#products" },
  { keyword: "gallery", target: "#gallery" },
  { keyword: "About us", target: "#about" },
  { keyword: "contact", target: "#contact" },

  // Menu dengan gambar
  { keyword: "kopi", target: "coffee.html", img: "menu/1.jpg" },
  { keyword: "coffee", target: "coffee.html", img: "menu/1.jpg" },

  { keyword: "non coffee", target: "noncoffee.html", img: "menu/m latte.jpeg" },
  { keyword: "non kopi", target: "noncoffee.html", img: "menu/m latte.jpeg" },

  { keyword: "snack", target: "snack.html", img: "menu/burnt chessecake.jpg" },
];

const suggestionBox = document.querySelector(".search-suggestions");

function highlight(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<b>$1</b>");
}

function showSuggestions(query) {
  const q = query.toLowerCase();
  const results = searchData.filter((item) =>
    item.keyword.toLowerCase().includes(q)
  );

  suggestionBox.innerHTML = "";

  if (results.length === 0) {
    suggestionBox.style.display = "block";
    suggestionBox.innerHTML = `<li class="no-result">Tidak ada hasil</li>`;
    return;
  }

  results.forEach((item) => {
    let li = document.createElement("li");

    li.innerHTML = `
        ${item.img ? `<img src="${item.img}"/>` : ""}
        <span>${highlight(item.keyword, q)}</span>
      `;

    li.onclick = () => {
      if (item.target.startsWith("#")) {
        document.querySelector(item.target).scrollIntoView({
          behavior: "smooth",
        });
      } else {
        window.location.href = item.target;
      }
    };

    suggestionBox.appendChild(li);
  });

  suggestionBox.style.display = "block";
}

searchBox.addEventListener("input", () => {
  const q = searchBox.value.trim();
  if (q === "") {
    suggestionBox.style.display = "none";
    return;
  }
  showSuggestions(q);
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchBox.value.toLowerCase().trim();
    const results = searchData.filter((item) =>
      item.keyword.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      const item = results[0];
      if (item.target.startsWith("#")) {
        document.querySelector(item.target).scrollIntoView({
          behavior: "smooth",
        });
      } else {
        window.location.href = item.target;
      }
    } else {
      alert("Tidak ada hasil untuk: " + query);
    }
  }
});

document.addEventListener("click", (e) => {
  if (!searchForm.contains(e.target)) {
    suggestionBox.style.display = "none";
  }
});

const detailButtons = document.querySelectorAll(".item-detail-button");

detailButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const targetModal = document.querySelector(`#${this.dataset.modal}`);
    if (targetModal) targetModal.style.display = "block";
  });
});

const closeIcons = document.querySelectorAll(".close-icon");
closeIcons.forEach((icon) => {
  icon.addEventListener("click", function (e) {
    e.preventDefault();
    this.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", function (e) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
