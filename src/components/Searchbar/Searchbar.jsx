import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ handleSubmit }) => {
  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.btnLabel}>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
