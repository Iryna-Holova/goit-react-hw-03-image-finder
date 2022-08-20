import PropTypes from "prop-types";

const ImageGalleryItem = ({ pictures, toggleModal}) => {
    return (
        <>
            {pictures.map(({ id, webformatURL, largeImageURL, tags }) => 
                <li key={id} className="ImageGalleryItem" onClick={() => toggleModal(largeImageURL)}>
                    <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
                </li>
            )}
        </>
    );
};
   
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleModal: PropTypes.func.isRequired,
};