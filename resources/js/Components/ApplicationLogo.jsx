import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <img 
            {...props}
            src="/images/logos/logob.png" 
            alt="Glam Grandeur Logo" 
            
            className={`h-12 w-auto object-contain ${props.className || ''}`} 
        />
    );
}