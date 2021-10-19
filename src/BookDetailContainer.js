import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BookDetailContainer = ({ match }) => {
    const [id, _] = useState(match.params.id)

    const [book, setBook] = useState({})

    useEffect(() => {
        const fetchBook = async () => {
            const book = await axios.get(`http://localhost:8080/books/${id}`)
            setBook(book.data)
        }

        fetchBook()
    }, [id])

    return (
        <h2 className='book-title'>{book.name}</h2>
    )
}

export default BookDetailContainer