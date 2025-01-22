import React from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data'
const Categories = () => {
    console.log(categories)
    return (
        <div className='py-12 px-16 sm:px-5 flex flex-col items-center text-center bg-gray-300'>
            <h1 className='text-slate-700 text-4xl font-extrabold mb-4'>Categories</h1>
            
            <div className='flex flex-wrap py-12 justify-center gap-5'>
                {categories?.slice(1,7).map((category,index)=>(
                    <Link key={index} to={`/listings/category/${category.label}`}>
                        <div className='relative flex justify-center items-center w-[200px] h-[150px] curson-pointer'>
                            <img className='absolute w-full h-full object-cover' src={category.img} alt={category.label}/>{category.label}
                            <div className='absolute w-full h-full bg-black bg-opacity-30'>
                                <div className='text-5xl'>{category.icon}</div>
                                <p className='font-semibold'>{category.label}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default Categories