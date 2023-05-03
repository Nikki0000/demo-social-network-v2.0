import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from './BookSection.module.css'

const BookList = ({book}) => {

    




    const navigate = useNavigate();
    //console.log(book);

    return (
        <div className={s.container}>
            {
                book.map((item) => {
                    // console.log(item.id);
                    let bookid = item.id;
                    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let title = item.volumeInfo.title;
                    let author = item.volumeInfo.authors;
                    let categories = item.volumeInfo.categories;
                    if(thumbnail !== undefined && title !== undefined && author != undefined && categories !== undefined) {
                        return (
                            <>
                            <div className={s.card} key={item.id}>
                            
                                <img src={thumbnail} alt="" 
                                onClick={() => navigate(`${bookid}`, {state: bookid})}
                                />
                                <div className={s.bottom}>
                                    <p className={s.categories}>{categories}</p>
                                    <h3 className={s.title}>{title}</h3>
                                    <p className={s.author}>{author}</p>
                                </div>
                            </div>
                            </>
                        )
                    }
                    
                })
            }
            
        </div>
    )
}

export default BookList;