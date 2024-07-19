import React, { useState, useEffect } from 'react';
import CallLogItem from './CallLogItem';
import axios from 'axios';
import { ImSpinner2 } from 'react-icons/im';

const ActivityFeed = ({ showArchived }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const dummyData = [
        {
            id: 1,
            call_type: 'missed',
            direction: 'inbound',
            from: '+1231231231',
            to: '+1231231231',
            via: '+1231231231',
            duration: '30s',
            created_at: '2021-09-01T09:00:00.000Z',
            is_archived: false,
        },
    ];

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('https://aircall-backend.onrender.com/activities');
                const filteredActivities = response.data
                    .filter(activity => activity.is_archived === showArchived)
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setActivities(filteredActivities);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching activities:', error);
                setLoading(false);
            }
        };

        // const fetchActivities = async () => {
        //     try {
        //         const filteredActivities = dummyData
        //             .filter(activity => activity.is_archived === showArchived)
        //             .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        //         setActivities(filteredActivities);
        //         setLoading(false);
        //     } catch (error) {
        //         console.error('Error fetching activities:', error);
        //         setLoading(false);
        //     }
        // };

        fetchActivities();
    }, [showArchived]);

    const groupByDate = (activities) => {
        return activities.reduce((groups, activity) => {
            const date = new Date(activity.created_at).toLocaleDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(activity);
            return groups;
        }, {});
    };

    const groupedActivities = groupByDate(activities);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const toggleArchiveAll = async () => {
        try {
            const updatedActivities = await Promise.all(
                activities.map(async (activity) => {
                    await axios.patch(`https://aircall-backend.onrender.com/activities/${activity.id}`, {
                        is_archived: !activity.is_archived,
                    });
                    return { ...activity, is_archived: !activity.is_archived };
                })
            );
            setActivities(updatedActivities.filter(activity => activity.is_archived === showArchived));
        } catch (error) {
            console.error('Error updating archive status:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center mt-8">
            <ImSpinner2 className="animate-spin text-primary-500 text-2xl" />
        </div>
    }

    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-end mb-4">
                <button
                    onClick={toggleArchiveAll}
                    className="text-primary-500 hover:text-primary-700"
                >
                    {showArchived ? 'Unarchive All' : 'Archive All'}
                </button>
            </div>
            {Object.keys(groupedActivities).map(date => (
                <div key={date}>
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300" />
                        <span className="mx-4 text-gray-500 text-sm font-bold">
                            {formatDate(date)}
                        </span>
                        <div className="flex-grow border-t border-gray-300" />
                    </div>
                    <div className="space-y-4">
                        {groupedActivities[date].map(activity => (
                            <CallLogItem
                                key={activity.id}
                                activity={activity}
                                showArchived={showArchived}
                                setActivities={setActivities}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ActivityFeed;