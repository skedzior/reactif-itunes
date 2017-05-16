import $ from 'jquery';

export function fetchMedia(searchStr, mediaType) {
  if(mediaType === "artists"){
    return function(dispatch) {   
      dispatch({type: "FETCH_ARTISTS"});
      $.ajax("https://itunes.apple.com/search?term=" + searchStr + "&limit=25&entity=allArtist", {
        dataType: "jsonp",
      }).then((response) => {
        dispatch({type: "FETCH_ARTISTS_FULFILLED", payload: response.results})
      }).catch((err) => {
        dispatch({type: "FETCH_ARTISTS_REJECTED", payload: err})
      })
    }
  } else if(mediaType === "albums"){
    return function(dispatch) {   
      dispatch({type: "FETCH_ALBUMS"});
      $.ajax("https://itunes.apple.com/search?term=" + searchStr + "&limit=25&entity=album", {
        dataType: "jsonp",
      }).then((response) => {     
        dispatch({type: "FETCH_ALBUMS_FULFILLED", payload: response.results})
      }).catch((err) => {
        dispatch({type: "FETCH_ALBUMS_REJECTED", payload: err})
      })
    }
  } else {
    return function(dispatch) {
      dispatch({type: "FETCH_MEDIA"});
      $.ajax("https://itunes.apple.com/search?term=" + searchStr + "&limit=25&media=" + mediaType, {
        dataType: "jsonp",
      }).then((response) => {
        dispatch({type: "FETCH_MEDIA_FULFILLED", payload: response.results})
      }).catch((err) => {
        dispatch({type: "FETCH_MEDIA_REJECTED", payload: err})
      })
    }
  }
}


