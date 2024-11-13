import { OfferImagesProps } from '../../../types/offer';

function OfferGallery({images, id}: OfferImagesProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images ?
          images.map((image: string) => (
            <div className="offer__image-wrapper" key={id}>
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

export default OfferGallery;
