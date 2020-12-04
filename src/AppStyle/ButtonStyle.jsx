import React from 'react'; 

const ButtonStyle = ({onClick,className = '', children}) =>  {
    return (<button 
        type='button'
        onClick={onClick}
        className={className}
        >
        {children}
    </button>)
}

export default ButtonStyle;
