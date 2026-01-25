const API = "http://localhost:3000/api/movies"

fetch(API)
  .then(res => res.json())
  .then(data => {
    const movies = data.movies
    init(movies)
  })
  .catch(err => {
    console.log("API lỗi, dùng local data")
    init(localMovies)   // 👈 dùng movies.js
  })

function init(movies){
  // HERO
  document.getElementById("hero-title").innerText = movies[0].title
  document.getElementById("hero-desc").innerText = movies[0].description

  // TRENDING = top 5
  const trending = movies.slice(0,5)

  // ACTION = phim hành động nhưng KHÔNG trùng trending
  const action = movies
    .filter(m => m.genres && m.genres.includes("Hành động"))
    .filter(m => !trending.some(t => t.id === m.id))

  renderTrending(trending)
  renderAction(action)
}


function renderTrending(list){
  const box = document.getElementById("trending")
  box.innerHTML = list.map((m,i)=>`
    <div class="top-item"
         style="background-image:url('${m.poster}')"
         onclick="openMovie(${m.id})">
      <span class="rank">${i+1}</span>
    </div>
  `).join("")
}

function renderAction(list){
  const box = document.getElementById("action")
  box.innerHTML = list.map(m=>`
    <div class="movie"
         style="background-image:url('${m.poster}')"
         onclick="openMovie(${m.id})">
    </div>
  `).join("")
}

function openMovie(id){
  window.location.href = "detail.html?id=" + id
}
