import PropTypes from "prop-types";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({pictures, onOpenModal}) => {
    return (
        <ul className="ImageGallery">
            <ImageGalleryItem pictures={pictures} onOpenModal={onOpenModal} />
        </ul>
    )
}

export default ImageGallery;

ImageGalleryItem.propTypes = {
    pictures: PropTypes.array.isRequired,
    onOpenModal: PropTypes.func.isRequired,
};