/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
describe('Bookish application', function(){
    const gotoApp = () => {
          cy.visit('http://localhost:3000/')
    }
    const checkAppTitle = () => {
          cy.get('h2[data-test="heading"]').contains('Bookish')
    }
    const checkBookListWith = (expectation = []) => {
          cy.get('div[data-test="book-list"]').should('exist');
          cy.get('div.book-item').should((books) => {
            expect(books).to.have.length(expectation.length);

            const titles = [...books].map(x => x.querySelector('h2').innerHTML);
            expect(titles).to.deep.equal(expectation)
          })
    }

    it('visits the bookish', function(){
        gotoApp();
        checkAppTitle();
    })

    it('Shows a book list', () => {
       checkBookListWith(['Refactoring', 'Domain-driven design', 'Building Microservices', 'Acceptance Test Driven Development with React']);
    })

    it('Goes to the detail page', () => {
        cy.visit('http://localhost:3000/')
        cy.get('div.book-item').contains('View Details').eq(0).click()
        cy.url().should('include', '/books/1')
        cy.get('h2.book-title').contains('Refactoring')
    });

     it('Searches for a title', () => {
            cy.visit('http://localhost:3000/')
            cy.get('div.book-item').should('have.length', 4)
            cy.get('[data-test="search"] input').type('design')
            cy.get('div.book-item').should('have.length', 1)
            cy.get('div.book-item').eq(0).contains('Domain-driven design')
    });
})

   
    // afterEach(() => {
    //     return axios
    //         .delete('http://localhost:8080/books?_cleanup=true')
    //         .catch(err => err)
    // })
    
    // beforeEach(() => {
    //     const books = [
    //         { 'name': 'Refactoring', 'id': 1},
    //         { 'name': 'Domain-driven design', 'id': 2},
    //         { 'name': 'Building Microservices', 'id': 3}
    //     ]

    //     return books.map(item =>
    //         axios.post('http://localhost:8080/books', item,
    //             { headers: { 'Content-Type': 'application/json' } }
    //         )
    //     )
    // })