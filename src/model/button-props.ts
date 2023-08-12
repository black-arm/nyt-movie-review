export interface ButtonProps {
    buttonTestId?: string;
    children?: any;
    color?: 'blue'| 'black',
    buttonClick?(): void,
    type?: 'button'| 'submit'| 'reset'| undefined
}