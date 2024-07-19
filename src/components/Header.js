import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiSettingsKnobs } from 'react-icons/gi';
import logo from '../assets/images/logo.svg';

const Header = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-24 h-10 mr-2" />
            </div>
            <div className="flex items-center space-x-4">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary-700'
                            : 'text-gray-700'
                    }
                >
                    Call Logs
                </NavLink>
                <NavLink
                    to="/archived"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary-700'
                            : 'text-gray-700'
                    }
                >
                    Archived
                </NavLink>
                <GiSettingsKnobs />
            </div>
        </div>
    );
};

export default Header;
