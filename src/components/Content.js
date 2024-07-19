import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ActivityFeed from './ActivityFeed';

const Content = () => {
    return (
        <div className="h-full overflow-y-auto">
            <Routes>
                <Route path="/archived" element={<ActivityFeed showArchived={true} />} />
                <Route path="/" element={<ActivityFeed showArchived={false} />} />
            </Routes>
        </div>
    );
};

export default Content;
