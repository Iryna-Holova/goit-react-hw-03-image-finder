import { Component } from "react";
import { animateScroll as scroll } from 'react-scroll'

import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loading from "components/Loader/Loader";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import RejectMessage from "./RejectMessage/RejectMessage";

const URL = 'https://pixabay.com/api/';
const API_KEY = '27839370-99dd6ddd44ecd058cc6f2562b';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    pictures: [],
    status: 'idle',
    showModal: false,
    modalURL: ''
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const prevPage = prevState.page;
    const { page, searchQuery } = this.state;


    if (prevQuery !== searchQuery || prevPage !== page) {
      this.fetchPictures();
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      pictures: []
    });
  }

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
    scroll.scrollMore(277);
  }

  fetchPictures() {
    const { searchQuery, page } = this.state;

    this.setState({ status: 'pending' });

    fetch(`${URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => response.json())
      .then(({ hits }) => {
        if (hits.length) {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...hits],
            status: 'resolved'
          }))
        } else this.setState({ status: 'rejected' })
      })
      .catch(() => this.setState({ status: 'rejected' }))
  }

  toggleModal = (url) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalURL: url
    }));
  }

  render() {
    const { pictures, status, showModal, modalURL } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictures={pictures} onOpenModal={this.toggleModal}/>
        {(status === 'idle') && <div className="Message">Please enter search query</div>}
        {(status === 'resolved') && <Button onLoadMore={this.incrementPage} />}
        {(status === 'pending') && <Loading />}
        {(status === 'rejected') && <RejectMessage />}
        {(showModal && <Modal onClose={this.toggleModal}><img className="Modal-image" src={modalURL} alt=''/></Modal>)}
    </div>      
    )
  }
}