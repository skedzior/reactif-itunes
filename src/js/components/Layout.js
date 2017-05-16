import React from 'react';
import { connect } from 'react-redux';

import { debounce } from 'throttle-debounce';
import $ from 'jquery';
import { FormControl, Nav, Navbar, NavDropdown, MenuItem, Jumbotron } from 'react-bootstrap';
import { fetchMedia } from '../actions/searchActions';
import { mediaTypes } from '../../constants';

class Layout extends React.Component {
  constructor(){
    super();
    this.state = {
      mediaType: mediaTypes[0],
      searchStr: null,
      hasSearched: false    
    };
    this.fetchMedia = debounce(650, this.fetchMedia);
  }

  updateSearchStr(e){
    this.setState({searchStr: e.target.value});
    this.fetchMedia(e.target.value);
  }

  updateMediaType(mediaType){
    this.setState({mediaType});   
    this.props.dispatch(fetchMedia(this.state.searchStr, mediaType.value));
  }

  fetchMedia(searchStr) {
    this.setState({hasSearched: true});
    $('#navSearch').val(this.state.searchStr);
    $('#navSearch').focus();
    this.props.dispatch(fetchMedia(searchStr, this.state.mediaType.value));
  }

  render() {
    const { results } = this.props;
    const mappedResults = [];

    const mediaTypesDropdown = (mediaTypes.map((type, i) => 
      <MenuItem key={i} onClick={this.updateMediaType.bind(this, type)}>{type.label}</MenuItem>
    ));

    const navbar = (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Reactif-iTunes</a>
          </Navbar.Brand>
          <Nav>
            <input className="form-control" id="navSearch" onKeyUp={this.updateSearchStr.bind(this)} placeholder="Search..." type="text" />              
          </Nav>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={3} title={this.state.mediaType.label} id="basic-nav-dropdown">
              {mediaTypesDropdown}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const jumbotron = (
      <Jumbotron>
        <div className="container">        
          <h1>Reactif-iTunes</h1>
          <p>Search the iTunes Library</p>           
          <FormControl onKeyUp={this.updateSearchStr.bind(this)} placeholder={"Search Artists..."} type="text" />
        </div>
      </Jumbotron>
    );

    const noResults = (
      <div className="no-results">
        <h3>No Results for "{this.state.searchStr}" found...</h3>
      </div>
    );

    if(results && results.length > 0){
      for(let i = 0; i < results.length; i++){
        let result = results[i];
        mappedResults.push(
          <div className="row" key={i}>
            <div className="col-md-12">
              <div className="search-res well">
                {result.artworkUrl60 ? <div className="image-container">
                  <img src={result.artworkUrl60}/>
                </div> : null}
                
                {result.collectionName && this.state.mediaType.value === "albums" ? <div>
                  <h4>
                    <a>{result.collectionName}</a>
                  </h4>
                  <strong>Artist: </strong>
                  <span>{result.artistName}</span>
                </div> : 
                <h4>
                  <a>{result.artistName}</a>
                </h4>}

                {result.primaryGenreName ? <div className={result.artworkUrl60 ? "description" : null}>
                  <strong>Genre: </strong>
                  <span>{result.primaryGenreName}</span>
                </div> : null}

                {result.shortDescription ? <div className={result.artworkUrl60 ? "description" : null}>
                  <strong>Description: </strong>
                  <span>{result.shortDescription}</span>
                </div> : null}

              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        {this.state.hasSearched ? navbar : jumbotron}
        {this.props.results.length > 0 ? <div className="container">
          {mappedResults}
        </div> : this.state.hasSearched ? noResults : null}
      </div>
    )
  }
}

function mapStateToProps(store) {
  console.log(store)
  return {
    results: store.artists.results
  };
}

export default connect(mapStateToProps)(Layout);