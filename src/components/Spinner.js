import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center mt-4">
            <div className="w-8 h-8 border-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;
