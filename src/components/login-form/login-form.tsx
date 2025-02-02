import { FormEvent, useState, ReactEventHandler } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>

function LoginForm(): JSX.Element {
  const [review, setReview] = useState({email: '', password: ''});

  const handleChange: ChangeHandler = (event) => {
    const {name, value} = event.currentTarget;
    setReview({...review, [name]: value});
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (review.email !== null && review.password !== null) {
      dispatch(loginAction({
        login: review.email,
        password: review.password
      }));
    }
  };

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
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
  );
}

export default LoginForm;
