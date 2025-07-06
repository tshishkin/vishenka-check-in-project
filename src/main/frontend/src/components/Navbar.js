import { NavLink } from 'react-router-dom';

export const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
            <span className="navbar-brand">Check-In System</span>
            <div className="navbar-nav">
                <NavLink className="nav-link" to="/employees">Сотрудники</NavLink>
                <NavLink className="nav-link" to="/check-ins">Чекины</NavLink>
            </div>
        </div>
    </nav>
);