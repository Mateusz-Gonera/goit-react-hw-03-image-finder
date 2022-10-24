import { Component } from 'react';
import { fetchImages } from './Api/Api';
// import { TailSpin } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';

const INITIAL_STATE = {
  images: [],
  error: null,
  isLoading: false,
  search: '',
  isModalOpen: false,
  largeImage: '',
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
        document.addEventListener('keyup', e => {
          if (e.key === 'Escape') {
            this.closeModal();
          }
        });
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
    const clickImg = element[0];
    this.setState({ isModalOpen: true, largeImage: clickImg });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { images, largeImage, isModalOpen } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {isModalOpen ? (
          <Modal clickImage={largeImage} handleClose={this.closeModal} />
        ) : null}
        <Searchbar handleSubmit={this.handleSubmit} />

        <ImageGallery>
          <ImageGalleryItem images={images} onClick={this.handleImageClick} />
        </ImageGallery>
      </div>
    );
  }
}
