import { Searchbar } from 'components/Searchbar/Searchbar';
import css from './App.module.css';
import { useEffect, useState } from 'react';
import { getData } from '../../services/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [photosArray, setPhotosArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ isOpen: false, modalPhoto: '' });

  const onSubmit = inputValue => {
    setSearchTerm(inputValue);
    setCurrentPage(1);
    setPhotosArray(prevPhotosArray =>
      searchTerm === inputValue ? prevPhotosArray : []
    );
  };

  const onLoadMoreClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const onOpenModal = img => {
    setModal({
      isOpen: true,
      modalPhoto: img,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      modalPhoto: null,
    });
  };

  useEffect(
    (prevCurrentPage, prevSearchTerm) => {
      const fetchData = async () => {
        if (prevCurrentPage !== currentPage || prevSearchTerm !== searchTerm) {
          setIsLoading(true);

          try {
            const response = await getData(searchTerm, currentPage);
            setPhotosArray(prevPhotosArray =>
              currentPage === 1
                ? response.data.hits
                : [...prevPhotosArray, ...response.data.hits]
            );
          } catch (error) {
            setError(error);
          } finally {
            setIsLoading(false);
          }
        }
      };
      fetchData();
    },
    [searchTerm, currentPage]
  );

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery photosArray={photosArray} onOpenModal={onOpenModal} />
      {isLoading && <Loader />}
      {photosArray.length !== 0 && <Button onLoadMoreClick={onLoadMoreClick} />}
      {modal.isOpen && (
        <Modal modalPhoto={modal.modalPhoto} onCloseModal={onCloseModal} />
      )}
    </div>
  );
};



// this.setState(prevState => ({
    //   searchTerm: inputValue,
    //   photosArray:
    //     prevState.searchTerm === inputValue ? prevState.photosArray : [],
    //   currentPage: 1,
    // }));
// ============================================================
//prevProps, prevState
      // if (
      //   prevCurrentPage !== currentPage ||
      //   prevSearchTerm !== searchTerm
      // ) {
      //   setIsLoading(true);

      //   try {
      //     const response = await getData(
      //       searchTerm,
      //       currentPage
      //     );
      //     setPhotosArray(prevPhotosArray =>
      //       currentPage === 1
      //         ? response.data.hits
      //         : [...prevPhotosArray, ...response.data.hits],
      //     );
      //   } catch (error) {
      //     setError(error);
      //   } finally {
      //     setIsLoading(false);
      //   }
      // }

      // ===========================================================
// async componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.currentPage !== this.state.currentPage ||
  //     prevState.searchTerm !== this.state.searchTerm
  //   ) {
  //     this.setState({ isLoading: true });

  //     try {
  //       const response = await getData(
  //         this.state.searchTerm,
  //         this.state.currentPage
  //       );
  //       this.setState(prevState => ({
  //         photosArray:
  //           this.state.currentPage === 1
  //             ? response.data.hits
  //             : [...prevState.photosArray, ...response.data.hits],
  //       }));
  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  // async componentDidMount() { }

  // render() {
  // const { photosArray, isLoading, modal } = this.state;
  // console.log(this.state.photosArray)
  // const instance = basicLightbox.create(`<div>
  //             <div>

  //                 img src="${this.state.modal.modalPhoto}" width="800" height="600">
  //             </div>
  //         </div>`);