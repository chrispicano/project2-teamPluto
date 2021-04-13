let api_key = "e71ebb6879724f28a83fc531982e1b06";
// console.log(process.env.API);
// require('dotenv').config();

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
console.log(name, email, password);
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

//Test api w searchbar 
const gamesList = document.getElementById('gamesList');
const searchBar = document.getElementById('searchBar');
let rawgGames = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log("searchString",searchString);

    const filteredGames = rawgGames.filter((game) => {
        return (
            game.name.toLowerCase().includes(searchString) ||
            game.genre.toLowerCase().includes(searchString)
        );
    });
    displayGames(filteredGames);
});

const loadGames = async () => {
  console.log("load games");
    try {
        const res = await fetch('https://api.rawg.io/api/games?key='+api_key+'&dates=2019-09-01,2019-09-30&platforms=18,1,7').then (res => {
          return res.json()
        }).then(data =>{
          console.log(data.results);
          displayGames(data.results);
        })

        // rawgGames = await res.json();
        // displayGames(rawgGames);
        // console.log(res);
    } catch (err) {
        console.error(err);
    }
};

const displayGames = (game) => {
    const htmlString = game
        .map((game) => {
            return `
            <li class="game">
                <h2>${game.name}</h2>
                <p>Genres: ${game.genres.map(g => g.name)}</p>
                <img src="${game.background_image}"></img>
            </li>
        `;
        console.log(game);
        })
        .join('');
    gamesList.innerHTML = htmlString;
};

document
.querySelector("#searchBar")
.addEventListener("submit", loadGames());

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
