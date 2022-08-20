import { Component } from "react";
import { animateScroll as scroll } from 'react-scroll'

import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1
  }

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
    scroll.scrollMore(277);
  }

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      page: 1
    });
  }

  render() {
    const { searchQuery, page } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} page={page} onLoadMore={this.incrementPage} />
    </div>      
    )
  }
}