import { Component } from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import Loading from "components/Loader/Loader";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import RejectMessage from "components/RejectMessage/RejectMessage";

const URL = 'https://pixabay.com/api/';
const API_KEY = '27839370-99dd6ddd44ecd058cc6f2562b';


export default class ImageGallery extends Component {
    state = {
        pictures: [],
        status: 'idle',
        showModal: false,
        modalURL: ''
    }

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const prevPage = prevProps.page;
        const { page, searchQuery } = this.props;

        if (prevQuery !== searchQuery) {
            this.setState({
                pictures: [],
            });
        }

        if (prevQuery !== searchQuery || prevPage !== page) {
            this.fetchPictures();
        }
    }

    fetchPictures() {
        const { searchQuery, page } = this.props;

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
        const { pictures, status, showModal, modalURL } = this.state

        return (
            <>
                {(status === 'idle') && <div className="Message">Please enter search query</div>}
                <ul className="ImageGallery">
                    <ImageGalleryItem pictures={pictures} toggleModal={this.toggleModal} isModalOpen={showModal} />
                </ul>
                {(status === 'resolved') && <Button onLoadMore={this.props.onLoadMore} />}
                {(status === 'pending') && <Loading />}
                {(status === 'rejected') && <RejectMessage />}
                {(showModal && <Modal onClose={this.toggleModal}><img className="Modal-image" src={modalURL} alt=''/></Modal>)}
            </>
        )
    }
}

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired,
};