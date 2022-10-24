// import { TailSpin } from 'react-loader-spinner';
import { fetchImages } from './Api/Api';
import { Component } from 'react';

const INITIAL_STATE = {
  images: [],
  error: null,
  isLoading: false,
  search: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  async componentDidMount() {
    try {
      const fetch = await fetchImages('cat', 1, 12);
      console.log(fetch.hits);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log('ffffff');
    }
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      ></div>
    );
  }
}
