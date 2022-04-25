let id = sessionStorage.getItem("id");
console.log(id);
const statsContainer = document.querySelector(".stats");
const year2021 = document.querySelector(".year2021");
const year2020 = document.querySelector(".year2020");
const year2019 = document.querySelector(".year2019");
const year2018 = document.querySelector(".year2018");
const year2017 = document.querySelector(".year2017");
const year2016 = document.querySelector(".year2016");
const year2015 = document.querySelector(".year2015");
const year2014 = document.querySelector(".year2014");
const year2013 = document.querySelector(".year2013");
const year2012 = document.querySelector(".year2012");
const nameHeader = document.querySelector(".nameHeader");
let year = "2021";

year2021.onclick = () => {
  year = "2021";
  fetchStats();
};
year2020.onclick = () => {
  year = "2020";
  fetchStats();
  console.log(year);
};
year2019.onclick = () => {
  year = "2019";
  fetchStats();
};
year2018.onclick = () => {
  year = "2018";
  fetchStats();
};
year2017.onclick = () => {
  year = "2017";
  fetchStats();
};
year2016.onclick = () => {
  year = "2016";
  fetchStats();
};
year2015.onclick = () => {
  year = "2015";
  fetchStats();
};
year2014.onclick = () => {
  year = "2014";
  fetchStats();
};
year2013.onclick = () => {
  year = "2013";
  fetchStats();
};
year2012.onclick = () => {
  year = "2012";
  fetchStats();
};

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
    console.log(results);
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
    if (stats == undefined) {
      alert("DID NOT PLAY THIS YEAR");
    } else {
      statsContainer.innerHTML = `<div class = "stat-player">
            <h2>${stats.season}</h2>
            <p>${stats.pts} Points Per Game</p>
            <p>${stats.reb} Rebounds Per Game</p>
            <p>${stats.ast} Assists Per Game</p>
            <p>${Math.floor((stats.fgm/stats.fga) * 1000)/10}% fg</p>
            </div>`;

      document.querySelector('.chart').innerHTML = `<canvas id="myChart"></canvas>` 

      const labels = ["PPG", "RPG", "APG"];

      const data = {
        labels: labels,
        datasets: [
          {
            label: "NBA Stats",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
            ],
            borderWidth: 1,
            data: [stats.pts, stats.reb, stats.ast],
          },
        ],
      };

      const config = {
        type: "bar",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };
      new Chart(document.getElementById("myChart"), config);
    }
    console.log(stats);
  } catch (error) {
    console.log(error);
  }
}
fetchPlayerName();
fetchStats();
