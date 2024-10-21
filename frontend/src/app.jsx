import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main.jsx';
import HomeUser from './components/Home/HomeUser.jsx';
import HomeAdmin from './components/Home/HomeAdmin.jsx';
import Auth from './path/to/Auth';
import Login from './components/Login/Login.jsx';


const App = () => {
return (
    <Router>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/user" element={<HomeUser />} />
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
);
};

export default App;
