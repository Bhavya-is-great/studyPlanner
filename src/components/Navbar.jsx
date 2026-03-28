import React, { useState } from 'react'

const Navbar = ({ activeView, setActiveView }) => {
    const [open, setOpen] = useState(false);

    const navItems = [
        { label: "Make Plan", value: "make-plan" },
        { label: "See plans", value: "see-plans" },
    ];

    return (
        <nav className='sticky top-0 flex justify-around bg-gray-50 py-3 text-black items-center z-50'>
            <h1 className='font-semibold text-xl'>Study<span className='text-blue-500 z-40'>Planner</span></h1>
            <ul className={`fixed top-0 -right-full h-screen bg-gray-50 w-screen flex flex-col justify-center items-center gap-3 ${open && "right-0"} transition-all ease-linear duration-300 sm:static sm:h-auto sm:flex-row sm:w-auto`}>
                {navItems.map((item) => (
                    <li key={item.value}>
                        <button
                            type="button"
                            onClick={() => {
                                setActiveView(item.value);
                                setOpen(false);
                            }}
                            className={`text-3xl m-2 px-3 py-2 rounded font-semibold sm:text-sm cursor-pointer ${activeView === item.value ? 'text-amber-50 bg-black' : 'text-amber-50 bg-black'} `}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
            <div onClick={() => setOpen(prev => !prev)} className='flex flex-col h-3 justify-between items-center relative z-50 sm:hidden'>
                <span className={`h-0.5 inline-block w-4 bg-black rounded ${open && "rotate-45 translate-y-1.5"} transition-all ease-linear duration-300`}></span>
                <span className={`h-0.5 inline-block w-4 bg-black rounded ${open && "opacity-0"} transition-all ease-linear duration-300`}></span>
                <span className={`h-0.5 inline-block w-4 bg-black rounded ${open && "-rotate-45 -translate-y-1"} transition-all ease-linear duration-300`}></span>
            </div>
        </nav>
    )
}

export default Navbar
