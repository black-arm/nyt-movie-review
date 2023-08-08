import { ButtonProps } from "@/model/button-props"
import React from "react"
import style from './Button.module.css'

export default function Button({ buttonTestId, children, color = 'blue', buttonClick }: ButtonProps) {

    return <button data-testid={buttonTestId} 
        className={`${style.mrGeneralButton} ${color === 'blue' ? style.mrBlueButton : style.mrBlackButton }`}
        onClick={(e) => {
            e.stopPropagation()
            if(buttonClick){
                buttonClick()
            }
        }}>{ children }</button>
}