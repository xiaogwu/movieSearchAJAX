"use strict";

// function movieLink(title, year, id) {
//   return $('<li class="result" data-id="' + id + '"><b>' + title + '</b> (<i>' + year + '</i>)</li>');
// }
function movieLi(moviesObject){
  return $('<li class="result" data-id="' + moviesObject.imdbID +
'"><strong>' + moviesObject.Title + '</strong><em> (' + moviesObject.Year + ')</em></li>');
}

function moviePoster(url){
	return $('<img src="' +url+ '" alt="Movie Poster" />');
}

function getMovieDetails(id){
	// alert(id);
	$.ajax({
			url: "http://www.omdbapi.com/",
			method: "get",
			data: {"i": id, "callback": "movies"},
			dataType: "jsonp",
			jsonpCallback: "movies",
			success: function(data) {
				// alert("Something happened");
				// console.log(data);
				var posterUrl = data.Poster;
				var moviePosterImg = moviePoster(posterUrl);
				$('.movie-detail').empty().append(moviePosterImg);
			}
		});
}

function getImdbID(){
	//alert("Movie Details");
	var imdbID = $(this).attr("data-id");
	// console.log(imdbID);
	getMovieDetails(imdbID);
}

// jQuery Main Function
$(function() {
	
	$(".results").on("click", "li", getImdbID); 

	$("form").on("submit", function(event) {
		event.preventDefault();
		// alert("Submit Clicked");
		var searchTerm = $("input").val()
			, i = 0
			, movieTitle
		;
		// console.log(searchTerm);
		$.ajax({
			url: "http://www.omdbapi.com/",
			method: "get",
			data: {"s": searchTerm, "callback": "movies"},
			dataType: "jsonp",
			jsonpCallback: "movies",
			success: function(data) {
				// alert("Something happened");
				console.log(data);
				var movies = data.Search;
				$(".results").empty();
				for (i = 0; i < movies.length; i++) {
					// console.log(movies[i].Title);
					movieTitle = movieLi(movies[i]);
					$(".results").append(movieTitle);
				}
			}
		});
	});
});

