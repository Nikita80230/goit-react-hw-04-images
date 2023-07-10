
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photosArray, onOpenModal }) => {

    return (
        <ul className={css.ImageGallery}>
            {Array.isArray(photosArray) &&
                photosArray.map(({ id, webformatURL, largeImageURL }) => {
                    return (
                        <ImageGalleryItem
                            onOpenModal={onOpenModal}
                            key={id}
                            webformatURL={webformatURL}
                            largeImageURL={largeImageURL}
                        />
                    );
                })}
        </ul>
    );
}
