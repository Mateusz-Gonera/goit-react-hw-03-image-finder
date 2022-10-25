import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ handleClick }) => {
  return (
    <button type="button" className={styles.btn} onClick={() => handleClick()}>
      Load more
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
