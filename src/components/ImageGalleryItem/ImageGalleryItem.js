import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ images, onClickImage }) {
  return images.map(image => (
    <li key={image.id} className={s.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={s.ImageGalleryItemImage}
        onClick={() => onClickImage(image)}
      />
    </li>
  ));
}
