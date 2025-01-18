import LoginForm from '../../components/login-form/login-form';
import { MemoizedLoginLocation } from '../../components/login-location/login-location';


function LoginScreen(): JSX.Element {
  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm />
        </section>
        <MemoizedLoginLocation />
      </div>
    </main>
  );
}

export default LoginScreen;
