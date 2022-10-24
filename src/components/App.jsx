import { Component } from 'react';
import { fetchImages } from './Api/Api';
// import { TailSpin } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

const INITIAL_STATE = {
  images: [],
  error: null,
  isLoading: false,
  search: '',
  isModalOpen: false,
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

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      try {
        const fetch = await fetchImages(this.state.search, 1, 12);
        this.setState({ images: fetch.hits });
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log('ffffff');
      }
    }
  }

  async componentDidMount() {
    // console.log(this.state.images);
  }

  handleImageClick = imageID => {
    const element = this.state.images.filter(image => {
      return image.id === imageID;
    });
    this.setState({ isModalOpen: true });
    return element[0].largeImageURL;
  };

  render() {
    const { images } = this.state;
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
        <ImageGallery>
          <ImageGalleryItem images={images} onClick={this.handleImageClick} />
        </ImageGallery>
      </div>
    );
  }
}
