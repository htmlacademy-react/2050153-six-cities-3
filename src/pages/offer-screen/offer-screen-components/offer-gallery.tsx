import { memo } from 'react';
import { OfferImagesProps } from '../../../types/offer';

function OfferGallery({images}: OfferImagesProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images ?
          images.map((image: string) => (
            <div className="offer__image-wrapper" key={image}>
              <img
                className="offer__image"
                src={image}
                alt="Photo studio"
              />
            </div>
          ))
          : null}
      </div>
    </div>
  );
}

const MemoizedOfferGallery = memo(OfferGallery);

export default MemoizedOfferGallery;
