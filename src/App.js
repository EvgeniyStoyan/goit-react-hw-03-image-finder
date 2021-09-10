import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    imageInModal: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  openModal = imageInModal => {
    this.setState({
      showModal: true,
      imageInModal,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { searchQuery, showModal, imageInModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer
          autoClose={5000}
          position="top-center"
          theme="colored"
        />
        <ImageGallery searchQuery={searchQuery} onClickImage={this.openModal} />
        {showModal && (
          <Modal imageInModal={imageInModal} onCloseModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
