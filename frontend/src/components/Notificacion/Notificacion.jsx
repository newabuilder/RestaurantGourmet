import { useEffect } from 'react'; 
import PropTypes from 'prop-types';
import './Notificacion.css';

const Notificacion = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Desaparece después de 3 segundos

        return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }, [onClose]);

    return (
        <div className={`notificacion ${type}`}>
            {message}
        </div>
    );
};

Notificacion.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Notificacion;
