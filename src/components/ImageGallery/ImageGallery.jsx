import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ children }) => {
  return <ul className={styles.gallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
