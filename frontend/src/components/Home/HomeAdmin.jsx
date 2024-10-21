import PropTypes from 'prop-types';
import './HomeAdmin.css';

const HomeAdmin = ({ onLogout }) => {
  return (
    <div className="home-container">
      <h1>Bienvenido Administrador</h1>
      <p>Gestiona las operaciones del restaurante con facilidad.</p>
      <button className="btn logout-btn" onClick={onLogout}>Cerrar sesión</button>
      {/* Agrega contenido específico para administradores aquí */}
    </div>
  );
};

HomeAdmin.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default HomeAdmin;
