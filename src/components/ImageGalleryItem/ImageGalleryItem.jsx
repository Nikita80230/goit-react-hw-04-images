
import css from "./ImageGalleryItem.module.css"

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onOpenModal }) => {

    return (
        <li>
            <img className={css.galleryItemImg} onClick={() => { onOpenModal(largeImageURL) }} src={webformatURL} alt={largeImageURL} />
        </li>
    );
}
