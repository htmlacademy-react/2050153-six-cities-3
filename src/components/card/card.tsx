import { Link } from 'react-router-dom';
import { CardProps } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { memo, useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addFavoriteOffer } from '../../store/api-actions';
import MemoizedButtonFavorite from '../button-favorite/button-favorite';
import { refreshedOfferFavorite } from '../../store/offers/offers';

type OfferCardProps = {
  offer: CardProps;
  cardClassName: string;
  onCardHover?: (offerId: CardProps['id'] | null) => void;
  authorizationStatus: AuthorizationStatus;
};

function OfferCard({offer, onCardHover, cardClassName, authorizationStatus}: OfferCardProps): JSX.Element {
  const {id, title, type, price, isPremium, isFavorite, rating, previewImage} = offer;
  const favoritesInfoClassName = 'favorites__card-info';
  const dispatch = useAppDispatch();
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);

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

  // useEffect(() => {
  //   setFavoriteStatus(!favoriteStatus);
  // },[favoriteStatus]);

  const onActiveButtonClick = useCallback(() => {
    setFavoriteStatus(!favoriteStatus);
    console.log(favoriteStatus);
    dispatch(addFavoriteOffer({id: id, isFavorite: !favoriteStatus}));
    dispatch(refreshedOfferFavorite({offerId: id, favoriteStatus: !favoriteStatus}));
  },[dispatch, favoriteStatus, id]);

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
          <MemoizedButtonFavorite isFavorite={favoriteStatus} buttonClassName='place-card' onButtonClick={onActiveButtonClick} authorizationStatus={authorizationStatus} />
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

const MemoizedOfferCard = memo(OfferCard);

export default MemoizedOfferCard;
