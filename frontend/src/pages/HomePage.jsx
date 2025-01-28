import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Categories from '../components/Categories.jsx';


const HomePage = () => {
    return (
        <div className="flex flex-col">
            <Navbar />

          
            <div className="mt-[64px]">
                <Hero />
            </div>

            
            <div className="mt-60">
                <Categories />
            </div>

            
        </div>
    );
};

export default HomePage;
