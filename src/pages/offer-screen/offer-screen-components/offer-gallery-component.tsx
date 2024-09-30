import {offer} from '../offer-data';

function OfferGalleryComponent(): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {offer.images.map((image: string) => (
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src={image}
              alt="Photo studio"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGalleryComponent;
