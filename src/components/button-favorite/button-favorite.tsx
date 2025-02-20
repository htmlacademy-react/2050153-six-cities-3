import { memo } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { OffersProps } from '../../types/offer';
import { useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/action';

type FavoriteButtonProps = {
  isFavorite: OffersProps['isFavorite'];
  buttonClassName: string;
  onButtonClick: () => void;
  authorizationStatus: AuthorizationStatus;
};

function ButtonFavorite({isFavorite, buttonClassName, onButtonClick, authorizationStatus}: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFavoriteButtonClick = () => {
    onButtonClick();
  };

  return (
    authorizationStatus === AuthorizationStatus.Auth ?
      <button
        className={`${buttonClassName}__bookmark-button ${isFavorite ? `${buttonClassName}__bookmark-button--active` : ''} button`}
        onClick={handleFavoriteButtonClick}
        type="button"
      >
        <svg
          className={`${buttonClassName}__bookmark-icon`}
          width="18"
          height="19"
        >
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
      :
      <button
        className={`${buttonClassName}__bookmark-button button`}
        onClick = {(evt) => {
          evt.preventDefault();
          dispatch(redirectToRoute(AppRoute.Login));
        }}
        type="button"
      >
        <svg
          className={`${buttonClassName}__bookmark-icon`}
          width="18"
          height="19"
        >
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
  );
}

const MemoizedButtonFavorite = memo(ButtonFavorite);

export default MemoizedButtonFavorite;
