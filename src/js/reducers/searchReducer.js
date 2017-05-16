export default function reducer(state={
    results: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_ARTISTS": {
        return {...state, fetching: true}
      }
      case "FETCH_ARTISTS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_ARTISTS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          results: action.payload,
        }
      }
      case "FETCH_ALBUMS": {
        return {...state, fetching: true}
      }
      case "FETCH_ALBUMS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_ALBUMS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          results: action.payload,
        }
      }
      case "FETCH_MEDIA": {
        return {...state, fetching: true}
      }
      case "FETCH_MEDIA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_MEDIA_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          results: action.payload,
        }
      }
    }

    return state
}
