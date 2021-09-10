import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from '../Loader';
import Button from '../Button';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  DOWNLOAD: 'download',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    page: 1,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const PrevImages = prevProps.searchQuery;
    const nextImages = this.props.searchQuery;
    const API_KEY = '22499741-87b5d21a315c32b3b505be895';
    const BASE_URL = 'https://pixabay.com/api';

    if (PrevImages !== nextImages) {
      this.setState({ status: Status.PENDING, page: 1 });
      setTimeout(() => {
        fetch(
          `${BASE_URL}/?q=${nextImages}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
        )
          .then(response => response.json())
          .then(response => {
            if (response.hits.length === 0) {
              toast.error(`No image with name  ${nextImages}`);
              return Promise.reject(
                new Error(`Please try to enter something else`),
              );
            }
            this.setState({ images: response.hits, status: Status.RESOLVED });
          })
          .catch(error => this.setState({ error, status: Status.REJECTED }));
      }, 1000);
    }

    if (prevState.page !== this.state.page) {
      this.setState({ status: Status.DOWNLOAD });
      setTimeout(() => {
        fetch(
          `${BASE_URL}/?q=${nextImages}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
        )
          .then(response => response.json())
          .then(images => {
            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              status: Status.RESOLVED,
            }));
          })
          .finally(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          });
      }, 1000);
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, images, status } = this.state;

    if (status === 'idle') {
      return <div className="Text">Enter your query to start image search</div>;
    }

    if (status === 'pending') {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    if (status === 'download') {
      return (
        <div>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem
              images={images}
              onClickImage={this.props.onClickImage}
            />
          </ul>
          <Loader />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h2 className="ErrorMessage">{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem
              images={images}
              onClickImage={this.props.onClickImage}
            />
          </ul>

          {images.length > 0 && <Button handleLoadMore={this.handleLoadMore} />}
        </div>
      );
    }
  }
}
