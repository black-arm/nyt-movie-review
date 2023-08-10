import React from 'react';
import style from './Spinner.module.css'; // Assicurati di avere uno stile CSS per il tuo spinner

const Spinner = ({visible}: {visible: boolean}) => {

    if(!visible){
        return null;
    }

  return (
    <div data-testid="spinner" className={style.spinnerContainer}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default Spinner;
