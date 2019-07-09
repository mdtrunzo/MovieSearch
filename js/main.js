// Get Movie Page 1
$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val()
    getMovies(searchText)
    e.preventDefault()
  })
})

function getMovies(searchText) {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=' + searchText)
    .then((response) => {

      console.log(response)
      let movies = response.data.results
      let output = ''
      $.each(movies, (index, movie) => {
        output += ` 
        <div class="col-md-3">
        <div class="card text-white bg-dark" style="height:480px; margin-bottom:20px;" >
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h5 class="card-title">${movie.title}</h5>
        <a onclick="movieSelected('${movie.id}')" class="btn btn-danger" href="#">Movie Details</a>
        </div>
        </div>
        `
      })
      $('#showMore').css('display', 'block')
      $('#movies').html(output)
    })
    .catch((err) => {
      console.log(err)
    })
}

// Get Movie Page 2
$(document).ready(() => {
  $('#showMore').on('click', (e) => {
    let searchText = $('#searchText').val()
    getMovies2(searchText)
    e.preventDefault()
  })
})

function getMovies2(searchText) {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=' + searchText + '&page=2')
    .then((response) => {
      console.log(response)
      let movies = response.data.results
      let output = ''
      $.each(movies, (index, movie) => {
        output += ` 
        <div class="col-md-3">
        <div class="card text-white bg-dark" style="height:480px; margin-bottom:20px;" >
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h5 class="card-title">${movie.title}</h5>
        <a onclick="movieSelected('${movie.id}')" class="btn btn-danger" href="#">Movie Details</a>
        </div>
        </div>
        `
      })
      $('#showMore').css('display', 'none')
      $('#showMore2').css('display', 'block')
      $('#movies2').html(output)
    })
    .catch((err) => {
      console.log(err)
    })
}

// Get Movie Page 3
$(document).ready(() => {
  $('#showMore2').on('click', (e) => {
    let searchText = $('#searchText').val()
    getMovies3(searchText)
    e.preventDefault()
  })
})

function getMovies3(searchText) {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=' + searchText + '&page=3')
    .then((response) => {
      console.log(response)
      let movies = response.data.results
      let output = ''
      $.each(movies, (index, movie) => {
        output += ` 
        <div class="col-md-3">
        <div class="card text-white bg-dark" style="height:480px; margin-bottom:20px;" >
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h5 class="card-title">${movie.title}</h5>
        <a onclick="movieSelected('${movie.id}')" class="btn btn-danger" href="#">Movie Details</a>
        </div>
        </div>
        `
      })
      $('#showMore2').css('display', 'none')
      $('#movies3').html(output)
    })
    .catch((err) => {
      console.log(err)
    })
}



//Save movie to SessionStorage (By Id)
function movieSelected(id) {
  sessionStorage.setItem('movieId', id)
  window.location = 'movie.html'
  return false
}
//Get movie from SessionStorage and show it on movie.html
function getMovie() {
  let movieId = sessionStorage.getItem('movieId')

  axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=98325a9d3ed3ec225e41ccc4d360c817')
    .then((response) => {
      console.log(response)
      let movie = response.data
      let output = `  
      <div class="row tarjeta-grande">
      <div class="col-md-4 tarjeta">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
      </div>
      <div class="col-md-8">
      <h2 style="text-align:center">${movie.title}</h2>
      <ul class="card bg-dark details" >
      <li><strong>Genre:</strong> ${movie.genres[0].name}</li>
      <li><strong>Released:</strong> ${movie.release_date}</li>
      <li><strong>Rated:</strong>${movie.vote_average}</li>
      <li><strong>Runtime:</strong> ${movie.runtime} min.</li>
      <li><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</li>
      </ul>
      </div>
      </div>
      <div class="card bg-dark" style="padding:50px; font-size:14px; background:black !important">
      <div class="card bg-dark"  style="text-align:center; padding:20px">
        <h3>Plot</h3>
        ${movie.overview}
        <hr style="background:white">
        <div class="botones">
        <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="index.html"  class="btn btn-primary">Go Back To Search</a>
        </div>
      </div>
    </div>
      `

      $('#movie').html(output)

    })
    .catch((err) => {
      $('#movie').html(`
      <p style="text-align:center; color:white">There's no data for the selected movie</p>
      <div class="botones">
      <a href="index.html"  class="btn btn-primary">Go Back To Search</a>
      </div>  
      
      `)
    })
}

