import { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import "../../global/Css/style.css"; // Asegúrate de que esta ruta sea correcta

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true); // Estado para determinar si mostrar el login o el registro

    const toggleForm = () => {
        setIsLogin(prev => !prev); // Cambia entre login y registro
    };

    return (
        <div className="container">
            <div className="logreg-box">
                {isLogin ? (
                    <Login onLogin={(role) => console.log(role)} />
                ) : (
                    <Register />
                )}
                
                <div className="form-toggle">
                    <p>
                        {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
                        <span onClick={toggleForm} className="toggle-link">
                            {isLogin ? " Regístrate aquí" : " Inicia sesión"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
