import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "../../global/Css/style.css"; 
import Notificacion from '../Notificacion/Notificacion.jsx';

// Función para decodificar el token JWT
function parseJwt(token) {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
}

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email, password };
    
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', result.token);
                setNotification({ message: 'Inicio de sesión exitoso', type: 'success' });
    
                // Extraer el rol del token
                const tokenData = parseJwt(result.token);
                const userRole = tokenData.role; // Obtener el rol del token
    
                // Llamar a la función onLogin con el rol
                onLogin(userRole); // Asegúrate de que onLogin reciba el rol correctamente
            } else {
                setNotification({ message: result.message || 'Credenciales inválidas', type: 'error' });
            }
        } catch (error) {
            console.log('Error en el login:', error);
            setNotification({ message: 'Error en la conexión', type: 'error' });
        }
    };
    

    const handleNotificationClose = () => {
        setNotification({ message: '', type: '' });
    };

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                handleNotificationClose();
            }, 3000); // 3000 ms = 3 segundos
            return () => clearTimeout(timer); // Limpiar el timer al desmontar
        }
    }, [notification]);

    return (
        <>
            <div className="background"> 
                <div className="custom-form">
                    <div className="container">
                        <div className="logreg-box">
                            <div className="form-box login">
                                <form id="loginForm" onSubmit={handleLogin}>
                                    <h2>Iniciar Sesión</h2>
                                    <div className="input-box">
                                        <span className="icon"><i className='bx bxs-envelope'></i></span>
                                        <input
                                            onChange={(event) => setEmail(event.target.value)}
                                            type="email"
                                            id="loginEmail"
                                            name="email"
                                            required
                                        />
                                        <label>Email</label>
                                    </div>
                                    <div className="input-box">
                                        <span className="icon"><i className='bx bxs-lock-alt'></i></span>
                                        <input
                                            onChange={(event) => setPassword(event.target.value)}
                                            type="password"
                                            id="loginPassword"
                                            name="password"
                                            required
                                        />
                                        <label>Password</label>
                                    </div>
                                    <div className="remember-forgot">
                                        <label><input type="checkbox" /> Recuérdame</label>
                                        <a href="#">¿Olvidaste tu contraseña?</a>
                                    </div>
                                    <button type="submit" className="btn">Iniciar sesión</button>
                                    <div className="login-registrer">
                                        <p>¿Aún no tienes una cuenta?
                                            <a href="register.html" className="register-link"> Regístrate aquí </a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {notification.message && (
                    <Notificacion message={notification.message} type={notification.type} onClose={handleNotificationClose} />
                )}
            </div>
        </>
    );
};

// Agregar validación de props
Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;
