import React from 'react';
import {useNavigate} from "react-router-dom";
import {ChevronLeftIcon} from "@heroicons/react/solid";

const BackButton = ({ children, label }) => {

    const navigate = useNavigate()

    /*в navigate указываем либо url либо на сколько страниц назад хотим вернуться*/
    const handleClick = () => navigate(-1)

    return (
       <button
           onClick={handleClick}
           className="group flex font-semibold text-sm leading-6 text-slate-600 hover:text-slate-400 trans transition-all duration-200">
           <ChevronLeftIcon className='h-6' />
           {children || label}
       </button>
    );
};

export default BackButton;