import {OfferProps} from '../../../types/offer';

type OfferComponentProps = {
  offer: OfferProps;
  offerClassName: string;
}

function OfferComponent ({offer, offerClassName}: OfferComponentProps): JSX.Element {
  const {id, title, type, price, isPremium, rating, description, bedrooms, goods, host, maxAdults} = offer;

  return (
    <>
      {isPremium ?
        (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
        : null}
      <div className={`${offerClassName}__name-wrapper`}>
        <h1 className={`${offerClassName}__name`}>
          {title}
        </h1>
        <button className={`${offerClassName}__bookmark-button button`} type="button">
          <svg className={`${offerClassName}__bookmark-icon`} width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className={`${offerClassName}__rating rating`}>
        <div className={`${offerClassName}__stars rating__stars`}>
          <span
            style={{
              width: `${rating / 5 * 100}%`
            }}
          >
          </span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className={`${offerClassName}__rating-value rating__value`}>{rating}</span>
      </div>
      <ul className={`${offerClassName}__features`}>
        <li className={`${offerClassName}__feature ${offerClassName}__feature--entire`}>
          {type}
        </li>
        <li className={`${offerClassName}__feature ${offerClassName}__feature--bedrooms`}>
          {bedrooms} Bedrooms
        </li>
        <li className={`${offerClassName}__feature ${offerClassName}__feature--adults`}>
          Max {maxAdults} adults
        </li>
      </ul>
      <div className={`${offerClassName}__price`}>
        <b className={`${offerClassName}__price-value`}>&euro;{price}</b>
        <span className={`${offerClassName}__price-text`}>&nbsp;night</span>
      </div>
      <div className={`${offerClassName}__inside`}>
        <h2 className={`${offerClassName}__inside-title`}>What&apos;s inside</h2>
        <ul className={`${offerClassName}__inside-list`}>
          {goods ?
            (
              goods.map((feature: string) => (
                <li className={`${offerClassName}__inside-item`} key={id}>
                  {feature}
                </li>
              ))
            )
            : null}
        </ul>
      </div>
      <div className={`${offerClassName}__host`}>
        <h2 className={`${offerClassName}__host-title`}>Meet the host</h2>
        <div className={`${offerClassName}_host-user user`}>
          <div className={`${offerClassName}__avatar-wrapper ${offerClassName}__avatar-wrapper--pro user__avatar-wrapper`}>
            <img className={`${offerClassName}__avatar user__avatar`} src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
          </div>
          <span className={`${offerClassName}__user-name`}>
            {host.name}
          </span>
          {host.isPro ?
            (
              <span className={`${offerClassName}__user-status`}>
                Pro
              </span>
            )
            : null}
        </div>
        <div className={`${offerClassName}__description`}>
          {description ?
            description.map((str) => (
              <p className={`${offerClassName}__text`} key={id}>
                {str}
              </p>
            ))
            : null}
        </div>
      </div>
    </>
  );
}

export default OfferComponent;
