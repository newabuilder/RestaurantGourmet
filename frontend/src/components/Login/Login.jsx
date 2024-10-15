import './Login.css';


const Login = () => {
    return (
        <div className="container">
            <div className="logreg-box">
                <div className="form-box login">
                    <form id="loginForm" action="/login" method="POST">
                        <h2>Iniciar Sesión</h2>

                        <div className="input-box">
                            <span className="icon"> <i className='bx bxs-envelope'></i> </span>
                            <input type="email" id="loginEmail" name="email" required />
                            <label>Email</label>
                        </div>

                        <div className="input-box">
                            <span className="icon"> <i className='bx bxs-lock-alt'></i> </span>
                            <input type="password" id="loginPassword" name="password" required />
                            <label>Password</label>
                        </div>

                        <div className="remember-forgot">
                            <label> <input type="checkbox" /> Recuérdame </label>
                            <a href="#">¿Olvidaste tu contraseña?</a>
                        </div>

                        <button type="submit" className="btn"> Iniciar sesión </button>

                        <div className="login-registrer">
                            <p>¿Aún no tienes una cuenta?
                                <a href="register.html" className="register-link"> Regístrate aquí </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
