let id = sessionStorage.getItem("id");
console.log(id);
const statsContainer = document.querySelector(".stats");
const year2021 = document.querySelector(".year2021");
const year2020 = document.querySelector(".year2020");
const year2019 = document.querySelector(".year2019");
const nameHeader = document.querySelector('.nameHeader')
let year = "2021";

year2021.onclick = () => {
    year = '2021'
    fetchStats()
}
year2020.onclick = () => {
    year = '2020'
    fetchStats();
    console.log(year);
}
year2019.onclick = () => {
    year = '2019'
    fetchStats()
}

async function fetchPlayerName() {
  let url = `https://www.balldontlie.io/api/v1/players/${id}`;
  let results = null;
  let name = [];

  try {
    results = await axios(url, {
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {}

  name = results.data;

  nameHeader.innerHTML = `<h1>${name.first_name} ${name.last_name}</h1>`;
}

async function fetchStats() {
  let url = `https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id}`;
  let results = null;
  let stats = [];

  try {
    results = await axios(url, {
      headers: {
        Accept: "application/json",
      },
    });

    stats = results.data.data[0];
    console.log(stats);

    statsContainer.innerHTML = `<div class = "stat-player">
        <h2>${stats.season}</h2>
        <p>${stats.pts} Points Per Game</p>
        <p>${stats.reb} Rebounds Per Game</p>
        <p>${stats.ast} Assists Per Game</p>
        </div>`;
  } catch (error) {
    console.log(error);
  }
}
fetchPlayerName();
fetchStats();

