import { Component } from 'react';
import { fetchImages } from './Api/Api';
import { TailSpin } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

const INITIAL_STATE = {
  images: [],
  error: null,
  isLoading: false,
  search: '',
  isModalOpen: false,
  largeImage: '',
  page: 1,
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
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.setState({ isLoading: true });
      try {
        const fetch = await fetchImages(this.state.search, this.state.page, 12);
        console.log(this.state.images);
        this.setState(({ images }) => ({ images: [...images, ...fetch.hits] }));
        document.addEventListener('keyup', e => {
          if (e.key === 'Escape') {
            this.closeModal();
          }
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  async componentDidMount() {
    this.setState({ images: [], page: 1 });
    // console.log(this.state.images);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', e => {});
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

  loadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { images, largeImage, isModalOpen, isLoading } = this.state;
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
          {isLoading ? (
            <TailSpin
              height="80"
              width="80"
              color="#346341"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{
                position: 'absolute',
                right: '50%',
                top: '50%',
                zIndex: '1100',
              }}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <ImageGalleryItem images={images} onClick={this.handleImageClick} />
          )}
        </ImageGallery>

        {images.length === 0 ? null : (
          <Button handleClick={this.loadMoreClick} />
        )}
      </div>
    );
  }
}
