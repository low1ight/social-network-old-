import React from 'react';
import LoadingSpinnerSVG from '../../../assets/images/LoadingSpinnerSVG.svg'
import style from './LoadingSpinner.module.css'

function LoadingSpinner() {
    return (
        <div className={style.wrapper}>
            <img alt='preloader' className={style.spinner} src={LoadingSpinnerSVG}/>
        </div>
    )
}


export default LoadingSpinner