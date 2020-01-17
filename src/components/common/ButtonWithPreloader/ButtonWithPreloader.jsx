import React from 'react'
import preloader from '../../../assets/images/horizontalLoader.svg'
import cn from 'classnames'
import style from './ButtonWithPreloader.module.css'

function ButtonWithPreloader({isFetching, name,...func}) {

    return (
        <button onClick={func.func} className={cn('buttonStyle', style.button)} disabled={isFetching}>
            {isFetching ? <img src={preloader} alt=""/> : <p>{name}</p> }
        </button>
    )
}

export default ButtonWithPreloader