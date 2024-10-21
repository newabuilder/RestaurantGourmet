import { useState } from 'react';
import PropTypes from 'prop-types';
import "../../global/Css/style.css";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = { name, email, password };

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setNotification({ message: 'Registro exitoso', type: 'success' });
            } else {
                setNotification({ message: result.message || 'Error en el registro', type: 'error' });
            }
        } catch (error) {
            console.log('Error en el registro:', error);
            setNotification({ message: 'Error en la conexión', type: 'error' });
        }
    };

    return (
        <div className="form-box register">
            <form id="registerForm" onSubmit={handleRegister}>
                <h2>Registrarse</h2>
                <div className="input-box">
                    <span className="icon"><i className='bx bxs-user'></i></span>
                    <input
                        type="text"
                        id="registerName"
                        name="name"
                        required
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label>Nombre</label>
                </div>
                <div className="input-box">
                    <span className="icon"><i className='bx bxs-envelope'></i></span>
                    <input
                        type="email"
                        id="registerEmail"
                        name="email"
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label>Email</label>
                </div>
                <div className="input-box">
                    <span className="icon"><i className='bx bxs-lock-alt'></i></span>
                    <input
                        type="password"
                        id="registerPassword"
                        name="password"
                        required
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <label>Password</label>
                </div>
                <button type="submit" className="btn">Registrarse</button>
            </form>
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

Register.propTypes = {
    onRegister: PropTypes.func.isRequired,
};

export default Register;
