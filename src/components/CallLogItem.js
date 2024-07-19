import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { FiPhoneIncoming, FiPhoneOutgoing, FiPhoneMissed, FiVoicemail, FiArchive, FiInbox } from 'react-icons/fi';
import axios from 'axios';

const CallLogItem = ({ activity, setActivities }) => {
    const { direction, from, to, call_type, created_at, id, is_archived } = activity;
    const [isSwiped, setIsSwiped] = React.useState(false);

    const getIcon = () => {
        const iconClass = 'w-8 h-8';
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

    const toggleArchive = async () => {
        try {
            await axios.patch(`https://aircall-backend.onrender.com/activities/${id}`, {
                is_archived: !is_archived,
            });
            setActivities(prevActivities =>
                prevActivities.filter(activity => activity.id !== id)
            );
        } catch (error) {
            console.error('Error updating archive status:', error);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => setIsSwiped(true),
        onSwipedRight: () => setIsSwiped(false),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div className="relative" {...handlers} style={{ userSelect: 'none' }}>
            <div className={`absolute right-0 top-0 bottom-0 flex items-center p-4 bg-blue-100 rounded-lg ${isSwiped ? 'block' : 'hidden'}`}>
                <button
                    onClick={toggleArchive}
                    className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full"
                >
                    {is_archived ? <FiInbox className="w-6 h-6" /> : <FiArchive className="w-6 h-6" />}
                </button>
            </div>
            <div
                className={`relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 ${isSwiped ? 'translate-x-[-100px]' : 'translate-x-0'}`}
            >
                <div className="flex items-center justify-between">
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
            </div>
        </div>
    );
};

export default CallLogItem;