/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import './Login.css';
import Home from '../Home/Home';
//  import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const Login = () => {
    
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loginSuccesful, setLoginSuccesful] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        };

        
        fetch('http://localhost:3000/login', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
            .then(response => response.json()) 
            .then(result => {

                console.log(result.token)

                if (result.token){
                    
                    localStorage.setItem('token', result.token)
                    setLoginSuccesful(true);   


                } else{
                    setLoginSuccesful(false);
                }

        })
            .catch((error) => {
                console.log("Error en el login:", error);
        });
    };


    return (
        <>
            {loginSuccesful ? <Home /> : 
                <div className="custom-form">
                    <div className="container">
                        <div className="logreg-box">
                            <div className="form-box login">
                                <form id="loginForm" onSubmit={handleLogin}>
                                    <h2>Iniciar Sesión</h2>
    
                                    <div className="input-box">
                                        <span className="icon"> <i className='bx bxs-envelope'></i> </span>
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
                                        <span className="icon"> <i className='bx bxs-lock-alt'></i> </span>
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
                </div>
            }
        </>
    );
}    