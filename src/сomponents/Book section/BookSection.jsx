import React, {useState} from "react";
import s from './BookSection.module.css'
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import HeaderBookSection from "./HeaderBookSection";
import BookList from "./BookList";
import BookDetails from "./BookDetails";
import { compose } from "redux";
import { withAuthRedirect } from "../../api/hoc/withAuthRedirect";

const BookSection = (props) => {

    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);

    const searchBookEnter = (evt) => {
        if (evt.key === "Enter"){
            axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyAwktWtvmX4Vq55gqVsJL5T1aU9ZaQzzCg'+'&maxResults=30')
            .then(res=> setData(res.data.items))
            .catch()
        }
    }

    const searchBook = (evt) => {
        if(evt.key === "Enter" || true)
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyAwktWtvmX4Vq55gqVsJL5T1aU9ZaQzzCg'+'&maxResults=30')
            .then(res=> setData(res.data.items))
            .catch()
    }


    
    return (
        <div className={s.booksection}>
            <HeaderBookSection search={search} searchBook={searchBook} searchBookEnter={searchBookEnter} setSearch={setSearch}/>
            <Routes>
                <Route path="/" element={<BookList book={bookData}/>} />
                <Route path="/:id" element={<BookDetails />} />
            </Routes>
        </div>
    )
}

export default compose(withAuthRedirect)(BookSection);