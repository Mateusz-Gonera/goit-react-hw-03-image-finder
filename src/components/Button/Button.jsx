import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = () => {
  return (
    <button type="button" className={styles.btn}>
      Load more
    </button>
  );
};
