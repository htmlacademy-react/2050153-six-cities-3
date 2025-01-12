import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useRef, FormEvent, useState, ReactEventHandler } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [review, setReview] = useState({email: '', password: ''});

  const handleChange: ChangeHandler = (event) => {
    const {name, value} = event.currentTarget;
    setReview({...review, [name]: value});
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                ref={loginRef}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={passwordRef}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                defaultValue={''}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={review.password.length < 2 && !review.password.match(/(?=.*[A-Za-z]){1,}(?=.*\d){1,}/g)}
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={`${AppRoute.Main}`}>
              <span>Amsterdam</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
