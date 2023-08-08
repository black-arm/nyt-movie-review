export interface ButtonProps {
    buttonTestId?: string;
    children?: any;
    color?: 'blue'| 'black',
    buttonClick?: () =>{},
    type?: 'button'| 'submit'| 'reset'| undefined
}