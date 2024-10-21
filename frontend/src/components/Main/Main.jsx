import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import HomeUser from "../Home/HomeUser";
import HomeAdmin from "../Home/HomeAdmin";
import Login from "../Login/Login";

function parseJwt(token) {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenData = token ? parseJwt(token) : null;

        console.log('Token Data:', tokenData); // Log para verificar el contenido del token

        // Verificamos que el token sea válido y no haya expirado
        if (tokenData && tokenData.exp * 1000 > Date.now()) {
            setIsLoggedIn(true);
            setRole(tokenData.role);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogin = (userRole) => {
        setIsLoggedIn(true);
        setRole(userRole);
        console.log('Rol después de login:', userRole);

        // Redirigir según el rol
        if (userRole === 'administrador') {
            navigate('/admin');
        } else if (userRole === 'usuario') { // Asegúrate de que el rol coincida con lo que envías
            navigate('/user');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setRole(null);
        navigate('/login');
    };

    return (
        <>
            {isLoggedIn ? (
                role === 'administrador' ? <HomeAdmin onLogout={handleLogout} /> : <HomeUser onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </>
    );
};

export default Main;
