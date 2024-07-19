import React from 'react';
import { FiPhoneIncoming, FiPhoneOutgoing, FiPhoneMissed, FiVoicemail } from 'react-icons/fi';

const CallLogItem = ({ direction, from, to, call_type, created_at }) => {
    const getIcon = () => {
        const iconClass = 'w-6 h-6 mr-1';
        switch (call_type) {
            case 'missed':
                return <FiPhoneMissed className={`text-red-500 ${iconClass}`} />;
            case 'answered':
                return direction === 'inbound' ? (
                    <FiPhoneIncoming className={`text-green-500 ${iconClass}`} />
                ) : (
                    <FiPhoneOutgoing className={`text-blue-500 ${iconClass}`} />
                );
            case 'voicemail':
                return <FiVoicemail className={`text-purple-500 ${iconClass}`} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-4">
                {getIcon()}
                <div>
                    <p className="font-semibold text-gray-900">{from}</p>
                    <p className="text-gray-500 text-sm">tried to call on {to}</p>
                </div>
            </div>
            <div className="text-gray-500 whitespace-nowrap">
                <p>{new Date(created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
        </div>
    );
};

export default CallLogItem;