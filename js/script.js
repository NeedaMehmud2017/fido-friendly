var apiKey = "2bc1604f";
var hostUrl = 'https://enigmatic-citadel-24557.herokuapp.com/';
var dddUrl = 'https://www.doesthedogdie.com/dddsearch?q=';

function getMovie(searchTerm) {
    return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`)
        .then(response => response.json());
};

function loadMovieDetails(data) {
    $("#movieTitle").empty().append(data.Title);
    $("#synopsis").empty().append(data.Plot);
    $("#rated").empty().append(data.Rated);
    $("#rating").empty().append(data.imdbRating);
    $("#poster").attr("src", data.Poster);
    $("#releaseDate").empty().append(data.Released);
    $("#genre").empty().append(data.Genre);
    $("#runtime").empty().append(data.Runtime);
    console.log(data);
}


$("#searchBtn").on("click", async function(e) {
    e.preventDefault();

    var searchTerm = $("#searchBox").val();
    var movie = await getMovie(searchTerm);
    var fidoSearch = encodeURI(searchTerm);

    loadMovieDetails(movie);
    fetchMovie(fidoSearch);

    $("#searchResults").removeClass("hidden");
});








function fetchMovie(titleEncoded){

    fetch(hostUrl + dddUrl + titleEncoded,{
    headers: {
        Accept: 'application/json',
        'X-API-KEY': '62c08a52331c1b494657c5fada8c179c',
            },
    })
        .then(function (res) {
        console.log(res);
        return res.json();
        })
        .then(function (data) {
        console.log(data);
        console.log (data.items[0].id)
        fetchDog(data.items[0].id)
    
    });
}

    
function fetchDog(id) {
    var mediaUrl = 'https://www.doesthedogdie.com/media/'
    
    fetch(hostUrl + mediaUrl + id, {
    headers: {
            Accept: 'application/json',
            'X-API-KEY': '62c08a52331c1b494657c5fada8c179c',
                    },
        })
    .then(function (res) {
    console.log(res);
    return res.json();
    })
    .then(function (data) {
    console.log(data); 
    doesDog(data)
    });
}

function doesDog(data) {
    var yes = data.topicItemStats[0].yesSum;
    var no = data.topicItemStats[0].noSum
    console.log(yes, no);

    if (yes == no) {
        console.log("Our all-knowing eye is on the fritz. We aren't sure about this one.");
    } else if (yes > no) {
        console.log("Unfortunately, Fido doesn't make it. Better avoid this one.");
    } else {
        console.log("Your pupper is safe! Watch freely.");
    };
}
    
// console.log(encodeURI("old yeller"));
    
// fetchMovie();