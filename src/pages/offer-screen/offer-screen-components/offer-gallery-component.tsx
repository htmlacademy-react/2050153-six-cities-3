import {offer} from '../offer-screen-components/offer-data';

function OfferGalleryComponent(): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {offer.images ?
          offer.images.map((image: string) => (
          // eslint-disable-next-line react/jsx-key
            <div className="offer__image-wrapper">
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

export default OfferGalleryComponent;
