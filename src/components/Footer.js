import React from 'react';
import { FiPhone, FiUser, FiSettings, FiVoicemail } from 'react-icons/fi';
import { MdDialpad } from 'react-icons/md';

const Footer = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center p-4 bg-white shadow-inner">
            <button className="relative text-gray-700">
                <FiPhone className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5">12</span>
            </button>
            <button className="text-gray-700">
                <FiUser className="w-6 h-6" />
            </button>
            <button className="bg-green-500 text-white p-4 rounded-full shadow-lg -mt-8">
                <MdDialpad className="w-6 h-6" />
            </button>
            <button className="text-gray-700">
                <FiSettings className="w-6 h-6" />
            </button>
            <button className="text-gray-700">
                <FiVoicemail className="w-6 h-6" />
            </button>
        </div>
    );
};

export default Footer;
