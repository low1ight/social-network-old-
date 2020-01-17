import React, {useState} from 'react'
import style from './Paginator.module.css'
import previousArrow from '../../../assets/images/paginatorIcon/previous.png'
import previousArrowDisabled from '../../../assets/images/paginatorIcon/previous-disable.png'
import nextArrow from '../../../assets/images/paginatorIcon/next.png'
import nextArrowDisabled from '../../../assets/images/paginatorIcon/next-disable.png'
import cn from 'classnames'



function Paginator({userCount, maxUsersOnPage, currentPage, onPageChanged, portionSize}) {

    let [portionNumber, setPortionNumber] = useState(1);
    let pageCount = Math.ceil(userCount / maxUsersOnPage);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }


    let portions = Math.ceil(pageCount / portionSize);
    let firstPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let lastPortionPageNumber = portionNumber * portionSize;



    return (
        <div className={style.paginator}>
            <div>
                { portionNumber !== 1 ?
                    <img src={previousArrow} onClick={() => setPortionNumber(portionNumber - 1)}/>:
                    <img src={previousArrowDisabled}/> }
            </div>
            <div>
                {pages
                    .filter(p => firstPortionPageNumber <= p && p <= lastPortionPageNumber)
                    .map(u => <span key={u} className={ cn({[style.activePage]: u === currentPage}) }
                                    onClick={() => onPageChanged(u)}>{u}</span>)}
            </div>
            <div>
                {portionNumber !== portions ?
                    <img src={nextArrow} onClick={() => setPortionNumber(portionNumber + 1)}/> :
                    <img src={nextArrowDisabled}/>}
            </div>
        </div>
    )
}

export default Paginator