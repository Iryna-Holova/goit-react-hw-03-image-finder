// import PropTypes from "prop-types";

const ImageGalleryItem = ({ pictures }) => {
    return (
        <>
            {pictures.map(({ id, webformatURL, largeImageURL }) => 
                <li key={id} className="ImageGalleryItem">
                    <img className="ImageGalleryItem-image" src={webformatURL} alt="" />
                </li>
            )}
        </>
    );
};
   
export default ImageGalleryItem;

// FeedbackOptions.propTypes = {
//     options: PropTypes.arrayOf(PropTypes.string).isRequired,
//     onLeaveFeedback: PropTypes.func.isRequired,
// };