import { Link } from 'react-router-dom';
import { CardProps } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';

type OfferCardProps = {
  offer: CardProps;
  cardClassName: string;
  onCardHover?: (offerId: CardProps['id'] | null) => void;
  authorizationStatus: AuthorizationStatus;
};

function OfferCard({offer, onCardHover, cardClassName, authorizationStatus}: OfferCardProps): JSX.Element {
  const {id, title, type, price, isPremium, isFavorite, rating, previewImage} = offer;
  const favoriteClassName = 'place-card__bookmark-button--active';
  const favoritesInfoClassName = 'favorites__card-info';

  const handleHoverOverCard = () => {
    if (onCardHover) {
      onCardHover(offer.id);
    }
  };

  const handleAwayFromCard = () => {
    if (onCardHover) {
      onCardHover(null);
    }
  };

  return (
    <article
      className={`${cardClassName}__card place-card`}
      onMouseEnter={handleHoverOverCard}
      onMouseLeave={handleAwayFromCard}
    >
      {isPremium ?
        (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
        : null}
      <div className={`${cardClassName}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardClassName === 'favorites' ? favoritesInfoClassName : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {
            authorizationStatus === AuthorizationStatus.Auth ?
              <button className={`place-card__bookmark-button ${isFavorite ? favoriteClassName : ''} button`} type="button">
                <svg
                  className="place-card__bookmark-icon"
                  width="18"
                  height="19"
                >
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
              : null
          }
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: `${rating / 5 * 100}%`
            }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
