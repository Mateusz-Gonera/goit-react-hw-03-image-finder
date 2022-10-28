import styles from './Loader.module.css';
import { TailSpin } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <TailSpin
        height="80"
        width="80"
        color="#346341"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
