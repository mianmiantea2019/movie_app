//when I search the movie name, click enter, I will see the movive names and images
//use input tag

const search = document.getElementById("search"); //this is target the input tag, so that later you can get the value from input tag
const form = document.getElementById("form");
const main = document.getElementById("main");
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const log = console.log.bind(document)

form.addEventListener("submit", (e) => {
    // console.log(e.target) this will give you the whole form tag
    // console.log(e.target.search)  this will return the whole input tag
    // console.log(e.target.search.value) // this will return the input tag value
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) { //if searchTerm has value;
        showMovies(SEARCHAPI + searchTerm);
        search.value = " "; //this is important, so you can keep search for new movie name
    }
})

function showMovies(url) {
    fetch(url).then(res => res.json())
        .then((data) => {
            main.innerHTML = ''
            log(data) //fancy way to shorten the console.log()
            data.results.forEach(e => {
                log(e) //fancy way to shorten the console.log()
                if(e.poster_path) { //this is to filter out all those null images
                    const divEl = document.createElement('div');
                    const image = document.createElement('img');
                    const text = document.createElement('h2');
    
                    text.innerHTML = `${e.title}`;
                    image.src = IMGPATH + e.poster_path;
                    divEl.appendChild(image);
                    divEl.appendChild(text);
                    main.appendChild(divEl);
                }
            })
        })
}