import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import s from './BookDetails.module.css'

const BookDetails = () => {

    const {id} = useParams();
    const [bookId, setBookId] = useState(null);

    const navigate = useNavigate();

    console.log(id);


    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyAwktWtvmX4Vq55gqVsJL5T1aU9ZaQzzCg`)
            .then(res => res.json())
            .then(data => setBookId(data))
    }, [id]);


    if(bookId == null) return 'Loading...'
    let description = bookId.volumeInfo.description;
    let photobook = bookId.volumeInfo.imageLinks.smallThumbnail;
    let title = bookId.volumeInfo.title;
    let author = bookId.volumeInfo.authors;
    let publishedDate = bookId.volumeInfo.publishedDate;
    return (
        <div className={s.bookContainer}>
            <div className={s.headerDetailsBlock}>
                <img src={photobook} alt="" />
                <div className={s.headerDetailsBlockText}>
                    <h2>{title}</h2>
                    <p>Автор: {author}</p>
                    <span>Дата публикации: {publishedDate}</span>
                </div>

            </div>
            <div className={s.descriptionBlock}>
                <div>Описание:</div>
                <p>{description}</p>
            </div>
            <button onClick={() => navigate('/sectionbook')}>Back</button>
        </div>
    )
}


export default BookDetails;