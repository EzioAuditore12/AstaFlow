import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

function Categories() {
    const [selectedCategories, setSelectedCategories] = React.useState([]);

    const categories = [
        "Action",
        "Drama",
        "Comedy",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Fantasy",
        "Adventure"
    ];

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category)
                ? prev.filter(item => item !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {categories.map((category) => (
                <label 
                    key={category}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                </label>
            ))}
        </div>
    );
}

function Top5List() {
    const topShows = [
        { id: 1, title: "Attack on Titan", views: "1.2M" },
        { id: 2, title: "Demon Slayer", views: "1.1M" },
        { id: 3, title: "Jujutsu Kaisen", views: "980K" },
        { id: 4, title: "One Piece", views: "950K" },
        { id: 5, title: "Solo Leveling", views: "920K" }
    ];

    return (
        <div className="p-4">
            <h2 className="font-semibold mb-4">Top 5 Most Viewed</h2>
            <div className="space-y-3">
                {topShows.map((show) => (
                    <div key={show.id} className="flex justify-between text-sm">
                        <span>{show.title}</span>
                        <span className="text-gray-500">{show.views}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FilterBar({ isOpen, closeFilterBar }) {
    if (!isOpen) return null;
    
    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={closeFilterBar}
            />
            
            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-screen w-[300px] bg-white shadow-xl z-50 
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className='sticky top-0 bg-white p-4 border-b flex justify-between items-center'>
                    <h2 className='font-semibold text-xl'>Filters</h2>
                    <IoCloseOutline 
                        className='w-6 h-6 cursor-pointer' 
                        onClick={closeFilterBar}
                    />
                </div>
                
                <div className='p-4'>
                    <Categories />
                    <Top5List />
                </div>
            </div>
        </>
    )
}

export default FilterBar