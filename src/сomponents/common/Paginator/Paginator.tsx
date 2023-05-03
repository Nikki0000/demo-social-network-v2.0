import React, { useState, FC } from "react";
// import styles from './Paginator.module.css';
import styles from './Paginator.module.css';
import cn from 'classnames';
import { Button } from "antd";


type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: FC<PropsType>  = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10, ...props}) => {

    let pagesCount = Math.ceil (totalItemsCount / pageSize);

    let pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightProtionPageNumber = portionNumber * portionSize;



    return (
        <div className={styles.pages}>
        

        <div className={styles.pages}>
        { portionNumber > 1 && <Button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</Button> }
            {pages
            .filter(p => p >= leftPortionPageNumber && p<= rightProtionPageNumber)
            .map((p) => {
                return <Button className={ cn ({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                // {( currentPage === p && styles.selectedPage )} 
                 key={p} onClick={(e)=> {onPageChanged(p)}} >{p}</Button>
            })}
        {portionCount > portionNumber &&
        <Button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</Button>}
        </div>
        </div>
    )

}

export default Paginator;