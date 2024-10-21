
import PropTypes from 'prop-types';
import './HomeUser.css';

const Home = ({ onLogout }) => {
  return (
    <div className="home-container">
      <h1>Bienvenido a Mesa Máster</h1>
      <p>Realiza tus reservas, pedidos y más con facilidad.</p>
      <button className="btn logout-btn" onClick={onLogout}>Cerrar sesión</button>
      {/* Agrega aquí más contenido como la lista de restaurantes */}
    </div>
  );
};

Home.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Home;
