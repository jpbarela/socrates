

$(document).ready(function() {
  // Bind to the submit event to enable HTML 5 validations
  $('form').submit(function(event){
    event.preventDefault();
    searchQuery = $('input[name=search]').val();
    console.log('http://www.omdbapi.com/?'+searchQuery);
    $.ajax({
      type        : 'GET',
      url         : 'http://www.omdbapi.com/?s='+searchQuery,
      dataType    : 'json'
    }).then(function(data){
      searchResults = $('#searchResults');
      console.log(JSON.stringify(data.Search));
      $.each(data.Search, function(index, result){
        console.log(JSON.stringify(result));
        searchResults.append('<div class="row">' +
          '<div class="small-12 columns" data-search-result>'+result.Title+'</div></div>')
      });
      console.log(JSON.stringify(data))
    }, function(){
      $('#searchError').show().html('<p>There was an error retreiving the search results.</p>')
    }
    );
  });
});
