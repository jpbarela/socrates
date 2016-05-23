function bindResultClick() {
  $('a[data-id]').click(function(event){
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
        type        : 'GET',
        url         : 'http://www.omdbapi.com/?i='+id,
        dataType    : 'json'
      }).then(function(data){
        createDetailedResult(link, data);
        // Set the new link status
        link.data('expanded', true);
      }, function(){
        $('#searchError').show().html('<p>There was an error retreiving the search results.</p>')
      });
    }
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

function createResult(location, title, id){
  location.append(
    '<div class="row">' +
      '<div class="small-12 columns" data-search-result>' +
        '<div class="row">' +
          '<div class="small-12 columns">'+
            '<a id="movie-'+ id +'" data-id="'+ id + '" href="#">' + title + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>');
}

$(document).ready(function() {
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
        createResult(searchResults, result.Title, result.imdbID);
      });
      bindResultClick();
    }, function(){
      $('#searchError').show().html('<p>There was an error retreiving the search results.</p>')
    }
    );
  });
});
