const contestant = document.getElementById("contestants");
const nganyaImage = document.getElementById("nganya-image");
const category = document.getElementById("matwana");
const votes = document.getElementById("kura-button");
const nganyaVotes = document.getElementById("nganya-votes");
const rudiaKura = document.getElementById("reset-button");
const jina = document.getElementById("street_name");
const mtaa = document.getElementById("hood");
const kuhusu = document.getElementById("about");
const driver = document.getElementById("pilot-name");
const driverVotes = document.getElementById("pilot-votes");
const kuraButton = document.getElementById("huan");

let selectedNganya = null;
let nganyas = [];

fetch("http://localhost:3000/nganya")
  .then((response) => response.json())
  .then((data) => {
    nganyas = data;
    displaycontestant(nganyas);

    if (nganyas.length > 0) {
      showContestant(nganyas[1]);
    }
  });

function displaycontestant(nganya) {
  nganyas.forEach((nganya) => {
    const li = document.createElement("li");
    li.textContent = nganya.title;
    li.addEventListener("click", () => showContestant(nganya));
    contestant.appendChild(li);
  });
}

function showContestant(nganya) {
  selectedNganya = nganya;
  nganyaImage.src = nganya.image;
  nganyaImage.alt = nganya.title;
  category.textContent = "category:" + "" + nganya.category;
  jina.textContent = "street-name:" + "" + nganya.street_name;
  mtaa.textContent = "hood:" + "" + nganya.hood;
  kuhusu.textContent = "about:" + "" + nganya.description;
  nganyaVotes.textContent = nganya.votes;
  driver.textContent = nganya.driver;
  driverVotes.textContent = nganya.driverVotes;
}

votes.addEventListener("click", () => {
  if (selectedNganya) {
    selectedNganya.votes++;
    nganyaVotes.textContent = selectedNganya.votes;

    fetch(`http://localhost:3000/nganya/${selectedNganya.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ votes: selectedNganya.votes }),
    })
      .then((res) => res.json())
      .then((newNganya) => {
        console.log("voteMpya:", newNganya);
        alert(`You have voted for ${newNganya.title}`);
      });
  }
});
rudiaKura.addEventListener("click", () => {
  if (selectedNganya) {
    selectedNganya.votes--;
    nganyaVotes.textContent = selectedNganya.votes;

    fetch(`http://localhost:3000/nganya/${selectedNganya.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ votes: selectedNganya.votes }),
    })
      .then((res) => res.json())
      .then((newNganya) => {
        console.log("voteMpya:", newNganya);
        alert(`You have canceled your vote for ${newNganya.title}`);
      });
  }
});

kuraButton.addEventListener("click", () => {
  if (selectedNganya) {
    let count = 0;
    do {
      selectedNganya.driverVotes++;
      count++;
    } while (count < 1);
    nganyaVotes.textContent = selectedNganya.votes;

    fetch(`http://localhost:3000/nganya/${selectedNganya.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driverVotes: selectedNganya.driverVotes }),
    })
      .then((res) => res.json())
      .then((newNganya) => {
        console.log("voteMpya:", newNganya);
        alert(`You have voted for ${newNganya.driver}`);
      });
  }
});
