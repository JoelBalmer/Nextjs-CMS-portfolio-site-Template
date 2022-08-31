import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import styles from './Gallery.module.scss';
import { GraphQlImage } from "../../api/contentful/dtos/graphql-image";

interface Props {
  images: GraphQlImage[];
}

export default function Gallery({ images }: Props) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mainImgIndex, setMainImgIndex] = useState(0);

  const normalize = (index: number): number => {
    const forcePositiveIndex = index + images.length;
    return forcePositiveIndex % images.length;
  };

  const sendImageToLightbox = (imgIndex: number): void => {
    setMainImgIndex(imgIndex);
    setIsLightboxOpen(!isLightboxOpen);
  };

  return (
    <section>
      <div className={styles.gallery}>
        {images.map((img, index) => (
          <div key={img.sys.id} onClick={() => sendImageToLightbox(index)}>
            <figure className="hover-scale">
              <img className="img-thumbnail" alt={img.description} src={img.url} />
              <figcaption className={styles.figcaption}>{img.title}</figcaption>
            </figure>
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <Lightbox
          mainSrc={images[normalize(mainImgIndex)].url}
          nextSrc={images[normalize(mainImgIndex + 1)].url}
          prevSrc={images[normalize(mainImgIndex - 1)].url}
          onMoveNextRequest={() => setMainImgIndex(normalize(mainImgIndex + 1))}
          onMovePrevRequest={() => setMainImgIndex(normalize(mainImgIndex - 1))}
          imageTitle={images[normalize(mainImgIndex)].title}
          imageCaption={images[normalize(mainImgIndex)].description}
          onCloseRequest={() => setIsLightboxOpen(false)}
          reactModalStyle={{content: { 'background-color': 'rgba(0, 0, 0, 1)' }}} />
      )}
    </section>
  );
}