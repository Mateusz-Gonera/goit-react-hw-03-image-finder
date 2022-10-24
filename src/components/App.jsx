import { Component } from 'react';
import { fetchImages } from './Api/Api';
// import { TailSpin } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';

const INITIAL_STATE = {
  images: [],
  error: null,
  isLoading: false,
  search: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const input = form.elements.input.value;
    this.setState({ search: input });
    form.reset();
  };

  async componentDidUpdate() {
    try {
      const fetch = await fetchImages(this.state.search, 1, 12);
      console.log(fetch.hits);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log('ffffff');
    }
  }

  async componentDidMount() {}

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
