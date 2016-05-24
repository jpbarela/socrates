function bindResultClick() {
  $('a.result-link').click(function(event){
    event.preventDefault();
    var link = $(this);
    // Toggle the detailed information if the link is clicked
    if(link.data('expanded')){
      $('div[data-detailed-result]').remove();
      // Set the new link status
      link.data('expanded', false);
    } else
    {
      var id = link.data('id');
      $.ajax({
        type: 'GET',
        url: 'http://www.omdbapi.com/?i='+id,
        dataType: 'json'
      }).then(function(data){
        createDetailedResult(link, data);
        // Set the new link status
        link.data('expanded', true);
      }, function(){
        $('#searchError').show().html('<p>There was an error retreiving the search results.</p>')
      });
    }
  });

  $('a.favorite-link').click(function(event){
    event.preventDefault();
    var link = $(this);
    var title = link.data('title')
    $.ajax({
      type: 'POST',
      url: '/favorites',
      dataType: 'json',
      data: {Title: title, imdbID: link.data('id')}
    }).then(function(data){
        alert('Added ' + title + ' to your favorites list.');
      }, function(){
        $('#searchError').show().html(
          '<p>There was an error saving to your favorite movie list.</p>')
      });
  });
}

function createDetailedResult(location, movie){
  location.parents('div[data-search-result]').append(
    '<div data-detailed-result>' +
      '<div class="row"><div class="small-12 columns"><strong>Basic Information</strong></div>' +
      '</div>' +
      '<div class="row">' +
        '<div class="small-6 columns" data-movie-year> Released: ' + movie.Released + '</div>' +
        '<div class="small-6 columns" data-movie-rating> Rating: ' + movie.Rated + '</div>' +
      '</div>' +
      '<div class="row">' +
        '<div class="small-6 columns" data-movie-runtime> Runtime: ' + movie.Runtime + '</div>' +
        '<div class="small-6 columns" data-movie-genre> Genre: ' +  movie.Genre + '</div>' +
      '</div>' +
      '<div class="row"><div class="small-12 columns"><strong>Cast and Crew</strong></div></div>' +
      '<div class="row">' +
        '<div class="small-12 columns" data-movie-cast> Cast: ' + movie.Actors + '</div>' +
      '</div>' +
      '<div class="row">' +
        '<div class="small-6 columns" data-movie-director> Director: ' + movie.Director + '</div>' +
        '<div class="small-6 columns" data-movie-writer> Writer: '+ movie.Writer + '</div>' +
      '</div>'+
      '<div class="row"><div class="small-12 columns"><strong>Awards</strong></div></div>' +
      '<div class="row">' +
        '<div class="small-12 columns" data-movie-awards> Awards: ' + movie.Awards + '</div>' +
      '</div>' +
    '</div>'
  )
}

function createResult(location, title, id, includeFavorite){
  var searchResult =
    '<div class="row">' +
      '<div class="small-12 columns" data-search-result>' +
        '<div class="row">' +
          '<div class="small-9 columns">'+
            '<a id="movie-'+ id +'" class="result-link" href="#" data-id="'+ id + '" >' +
              title +
            '</a>' +
          '</div>';
  if(includeFavorite){
    searchResult +=
      '<div class="small-3 columns text-right">' +
        '<a href="#" class="favorite-link" data-id="'+ id +'" data-title="'+ title + '">' +
          'Add to favorites' +
        '</a>'+
      '</div>'
  }
  searchResult +=
        '</div>' +
      '</div>' +
    '</div>';
  location.append(searchResult);
}

$(document).ready(function() {
  // These jQuery nodes are used in both the searchLink and favoritesLink forms so defining them
  // here helps show the parallel structure
  var favorites = $('#favoritesSection');
  var favoritesLink = $('#favorites');
  var searchForm = $('#searchForm');
  var searchLink = $('#search');

  // Bind to the submit event to enable HTML 5 validations
  $('form').submit(function(event){
    event.preventDefault();
    searchResults = $('#searchResults');
    searchResults.children().remove();
    searchQuery = $('input[name=search]').val();
    $.ajax({
      type        : 'GET',
      url         : 'http://www.omdbapi.com/?s='+searchQuery,
      dataType    : 'json'
    }).then(function(data){
      $.each(data.Search, function(index, result){
        createResult(searchResults, result.Title, result.imdbID, true);
      });
      bindResultClick();
    }, function(){
      $('#searchError').show().html('<p>There was an error retreiving the search results.</p>')
    }
    );
  });

  favoritesLink.click(function(event){
    event.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/favorites',
      dataType: 'json'
    }).then(function(data){
      favorites.show();
      searchForm.hide();
      favoritesLink.parent().addClass('active');
      searchLink.parent().removeClass('active');
      var favoritesList = $('#favoritesList');
      favoritesList.children().remove();
      $.each(data, function(index, result){
        createResult(favoritesList, result.Title, result.imdbID, false);
      });
    }, function(){
      $('#favoriteError').show().html('<p>There was an error getting your favorites.</p>')
    });
  });

  searchLink.click(function(event){
    event.preventDefault();
    searchForm.show();
    favorites.hide();
    searchLink.parent().addClass('active');
    favoritesLink.parent().removeClass('active');
  });
});
