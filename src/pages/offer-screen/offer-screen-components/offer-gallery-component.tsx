import {offers} from '../../../mocks/offers';

type OfferGalleryProps = {
  offerId: string;
}

function OfferGalleryComponent({offerId}: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {offers.map((offer) => (
          offer.images ?
            offer.images.map((image: string) => (
              <div className="offer__image-wrapper" key={offerId}>
                <img
                  className="offer__image"
                  src={image}
                  alt="Photo studio"
                />
              </div>
            ))
            : null
        ))}
      </div>
    </div>
  );
}

export default OfferGalleryComponent;
