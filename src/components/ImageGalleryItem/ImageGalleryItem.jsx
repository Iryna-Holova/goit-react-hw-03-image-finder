import PropTypes from "prop-types";

const ImageGalleryItem = ({ pictures, onOpenModal}) => {
    return (
        <>
            {pictures.map(({ id, webformatURL, largeImageURL, tags }) => 
                <li key={id} className="ImageGalleryItem" onClick={() => onOpenModal(largeImageURL)}>
                    <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
                </li>
            )}
        </>
    );
};
   
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    pictures: PropTypes.array.isRequired,
    onOpenModal: PropTypes.func.isRequired,
};