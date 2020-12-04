import React from 'react'; 

const ButtonStateLess = ({onClick,className = '', children}) =>  {
    <button 
        type='button'
        onClick={onClick}
        className={className}
        >
        {children}
    </button>
}

export default ButtonStateLess;
