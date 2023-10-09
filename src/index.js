// Your code here
let form = document.querySelector("form");
let title = document.querySelector("p#film-title");
let filmImg = document.querySelector("img#film-image");
let runTime = document.querySelector("p#runtime");
let showTime = document.querySelector("p#showtime");
let tickets = document.querySelector("p#tickets");
let btn = document.querySelector("button");
let tickoSpan = document.querySelector("#available-ticko");

btn.style.cursor = "pointer";

let filmsUl = document.querySelector("ul#films")

//console.log(btn);

//fetches film 1 details and shows them on the page once the page loads
function fetchFilm1() {
    fetch("http://localhost:3000/films/1")
    .then((res) => res.json())
    .then(function(data){
        title.innerHTML = `Title: ${data.title}`;
        filmImg.src = `${data.poster}`;
        runTime.innerHTML = `Runtime: ${data.runtime}`;
        showTime.innerHTML = `Showtime: ${data.showtime}`;
        tickoSpan.innerHTML = `${data.capacity - data.tickets_sold}`;

        //console.log(data)
    })
};
fetchFilm1();

//fetch 2 - lists all available movies on the left side of the page in ul#films
function fetchListOfFilms() {
    fetch("http://localhost:3000/films")
    .then((res) => res.json())
    .then(function(data){
        function handleLi() {
            data.forEach(function(movie){
                let list = document.createElement("li");
                list.innerHTML = movie.title;
                list.style.margin = "5px 5px";
                list.style.cursor = "pointer";
                list.style.height = "35px";
                list.style.display = "flex";
                list.style.alignItems = "center";

                list.addEventListener("mouseenter", function(){
                    list.style.backgroundColor = "rgb(0, 160, 222)";
                    list.style.color = "white";
                });
                list.addEventListener("mouseleave", function(){
                    list.style.backgroundColor = "rgba(100, 200, 255, 0)";
                    list.style.color = "navy";
                });

                list.addEventListener("click", function(){
                    title.innerHTML = `Title: ${movie.title}`;
                    filmImg.src = `${movie.poster}`;
                    runTime.innerHTML = `Runtime: ${movie.runtime}`;
                    showTime.innerHTML = `Showtime: ${movie.showtime}`;
                    tickoSpan.innerHTML = `${movie.capacity - movie.tickets_sold}`;
                    btn.innerHTML = "Buy Ticket";
                });
        
                filmsUl.appendChild(list);
            })
        };
        handleLi();
    })
};
fetchListOfFilms();

btn.addEventListener("click", function(){
    if (tickoSpan.innerHTML > 0){
        tickoSpan.innerHTML = `${(--tickoSpan.innerHTML)}`;
    } else {
        btn.innerHTML = "Sold Out";
        window.alert("All Tickets Have Been Sold Out!");
    };
});