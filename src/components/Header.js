import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiSettingsKnobs } from 'react-icons/gi';

const Header = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-700">Aircall</h1>
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
