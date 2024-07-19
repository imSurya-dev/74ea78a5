import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CallLogItem from './CallLogItem';

const ActivityFeed = ({ showArchived }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('https://aircall-backend.onrender.com/activities');
                // Filter and sort activities by created_at date in descending order
                const filteredActivities = response.data
                    .filter(activity => activity.is_archived === showArchived)
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setActivities(filteredActivities);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

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

    return (
        <div className="px-4 pb-4 space-y-8">
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
                                direction={activity.direction}
                                from={activity.from}
                                to={activity.to}
                                call_type={activity.call_type}
                                created_at={activity.created_at}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ActivityFeed;