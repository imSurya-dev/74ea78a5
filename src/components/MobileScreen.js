import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const MobileScreen = () => {
    return (
        <div className="w-[375px] h-[667px] bg-white rounded-lg shadow-lg overflow-hidden relative">
            <Header />
            <div className="absolute top-[65px] bottom-[65px] w-full overflow-y-auto">
                <Content />
            </div>
            <Footer />
        </div>
    );
};

export default MobileScreen;