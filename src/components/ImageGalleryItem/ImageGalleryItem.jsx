import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(image => (
    <li
      onClick={() => onClick(image.id)}
      key={image.id}
      className={styles.item}
    >
      <img className={styles.image} src={image.webformatURL} alt={image.tags} />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
