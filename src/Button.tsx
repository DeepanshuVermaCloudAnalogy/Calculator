import React from 'react'
import './Button.css'

interface ButtonProps{
    value : string;
    onClick: (value: string) => void;
}
const Button: React.FC<ButtonProps> = ({value , onClick }) => {
    return (
        <button className ="button-cal" onClick = {()=> onClick(value)} data-key={value}>{value}</button>
    );
};
export default Button;