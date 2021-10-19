import React, { useEffect, useState } from 'react'
import BookList from './BookList'
import { useRemoteService } from '../hooks';
import SearchBox from './SearchBox';

const BookListContainer = () => {
    const { data, loading, error, setUrl } = useRemoteService('http://localhost:8080/books',[]);  
    const [term, setTerm] = useState('')

    useEffect(() => {
        setUrl(`http://localhost:8080/books?q=${term}`)
    }, [term])

    const onSearch = (event) => setTerm(event.target.value)

    return (
    <>
        <SearchBox term={term} onSearch={onSearch} />
        <BookList books={data} loading={loading} error={error} />
    </>
    )
    
}

export default BookListContainer