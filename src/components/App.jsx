import { Component } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    pictures: null
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  }

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} />
        {/* <ImageGalleryItem />
        <Loader />
        <Button />
        <Modal /> */}
    </div>      
    )
  }
}