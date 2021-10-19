import React from 'react'
import { render } from '@testing-library/react'
import BookList from './BookList';

import {MemoryRouter as Router} from 'react-router-dom'
import BookDetail from '../BookDetail/BookDetail';

const renderWithRouter = (component) => {
    return{...render(
        <Router>
            {component}
        </Router>
    )}
}

describe('BookList', () => {
    it('loading', () => {
        const props = {
            loading: true
        }
        const { container } = renderWithRouter(<BookList {...props} />)
        const content = container.querySelector('p')
        expect(content.innerHTML).toContain('Loading')
    })

    it('error', () => {
        const props = {
            error: true
        };
        const { container } = renderWithRouter(<BookList {...props} />);
        const content = container.querySelector('p');
        expect(content.innerHTML).toContain('Error');
    })

    it('render books', () => {
        const props = {
            books: [
                { 'name': 'Refactoring', 'id': 1 },
                { 'name': 'Domain-driven design', 'id': 2 },
            ]
        };
        const { container } = renderWithRouter(<BookList {...props} />);

        const titles = [...container.querySelectorAll('h2')].map(x =>
            x.innerHTML)
        expect(titles).toEqual(['Refactoring','Domain-driven design']);
    })

    it('displays the book name when no description was given', () => {
        const props = {
            book: {
                name: 'Refactoring'
            }
        }
        const { container } = render(<BookDetail {...props} />)
    
        const description = container.querySelector('p.book-description')
        expect(description.innerHTML).toEqual(props.book.name)
    })
    
    // it('Shows *more* link when description is too long', () => {
    //     const props = {
    //         books: {
    //             name: 'Refactoring',
    //             description: 'The book about how to do refactoring...'
    //         }
    //     }
    //     const { container } = render(<BookDetail {...props} />)
    
    //     const link = container.querySelector('a.show-more')
    //         const title = container.querySelector('p.book-description')
    
    //         expect(link.innerHTML).toEqual('Show more')
    //         expect(title.innerHTML).toEqual('The book about how to do refactoring...')
    // })

    
})

