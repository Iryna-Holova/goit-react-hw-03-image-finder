import { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import Loading from "components/Loader/Loader";
import Button from "components/Button/Button";

const URL = 'https://pixabay.com/api/';
const API_KEY = '27839370-99dd6ddd44ecd058cc6f2562b';


export default class ImageGallery extends Component {
    state = {
        pictures: null,
        page: 1,
        status: 'idle'
    }

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const newQuery = this.props.searchQuery;
        const { page } = this.state;

        if (prevQuery !== newQuery) {
            this.setState({ status: 'pending' });

            fetch(`${URL}?q=${newQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => response.json())
                .then(({hits}) => {
                    if (hits.length) {
                        this.setState({ pictures: hits, status: 'resolved' })
                    } else this.setState({ status: 'rejected' }) 
                }
                )
                .catch(() => this.setState({ status: 'rejected' }))
        }
    }

    render() {
        const { pictures, status } = this.state

        if (status === 'idle') {
            return <div className="Message">Please enter search query</div>
        }

        if (status === 'pending') {
            return <Loading />
        }

        if (status === 'rejected') {
            return <div className="Message">Nothing found</div>
        }

        if (status === 'resolved') {
            return (
                <>
                    <ul className="ImageGallery">
                        <ImageGalleryItem pictures={pictures} />
                    </ul>
                    <Button />
                </>
            )
        }       
    }
}