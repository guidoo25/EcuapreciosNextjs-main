"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const categoryOptions = [
    { value: 'computadoras', label: 'Computadoras' },
    { value: 'Celulares', label: 'Celulares' },
    { value: 'televisores', label: 'Televisores' },
    { value: 'aires-acondicionados', label: 'Aires ' },

    { value: 'hogar', label: 'Hogar' },
    { value: 'electrodomesticos', label: 'Electrodomésticos' },
    { value: 'relojes-smartwatchs-y-smartbands', label: 'Smartwatchs' },
    { value: 'bebes', label: 'Bebes' },
  ];

export const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
return (
    <nav className='bg-white text-black p-4'>
        <div className='flex justify-between items-center'>
            <div className='text-xl text-blue-500'>
            <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/assets/icons/logo.svg"
            width={29}
            height={29}
            alt="logo"
          />

          <p className="nav-logo">
            <span className='text-blue-500'>Ecua</span><span className='text-yellow-500'>precios</span>          </p>
        </Link>

            </div>
            <button 
                className='block md:hidden' 
                onClick={toggleMenu}
            >
                <svg 
                    className='w-6 h-6 text-red-500' 
                    fill='none' 
                    stroke='currentColor' 
                    viewBox='0 0 24 24' 
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path 
                        strokeLinecap='round' 
                        strokeLinejoin='round' 
                        strokeWidth='2' 
                        d='M4 6h16M4 12h16m-7 6h7'
                    />
                </svg>
            </button>
        </div>
               <ul className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
            {categoryOptions.map((option) => (
                <Link href={`/categoria/${option.value}`} key={option.value}>
                    <div className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:shadow-md hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out" role="menuitem">
                        {option.label}
                    </div>
                </Link>
            ))}
        </ul>
    </nav>
);
}
