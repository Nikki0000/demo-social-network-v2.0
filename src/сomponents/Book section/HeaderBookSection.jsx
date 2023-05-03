import React, { useState } from "react";
import axios from "axios";
import s from './BookSection.module.css'

const HeaderBookSection = ({search, searchBook, searchBookEnter, setSearch}) => {

    return (
        <>
            <div className={s.header}>
                    <div className={s.search}>
                        <p>Find your book:</p>
                        <input type="text" placeholder="Enter your book name"
                        value={search} onChange={e => setSearch(e.target.value)}
                        onKeyPress={searchBookEnter}/>
                        <button onClick={searchBook}>Search</button>
                    </div>
            </div>
        </>
    )
}

export default HeaderBookSection;