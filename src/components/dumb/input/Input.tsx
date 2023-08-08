import { InputProps } from "@/model"
import React from "react"
import style from './Input.module.css'

export default function  Input({ 
    inputId, 
    label, 
    type = 'text', 
    inputTestId,
    children,
    isInvalid = false }: InputProps){
    
    return <div data-testid={inputTestId} className={style.mrBoxInput}>
        <label htmlFor={inputId} className={style.mrLabel}>{label}</label>
        <input id={inputId} 
            className={`${style.mrInput} ${isInvalid ? style.mrInvalid: ''}`} 
            type={type}/>
        {isInvalid ? <span className={style.mrError}>{children}</span> : null}
    </div> 
}