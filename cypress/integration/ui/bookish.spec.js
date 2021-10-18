/* eslint-disable no-undef */
describe('Bookish application', function(){
    it('visits the bookish', function(){
        cy.visit('http://localhost:3000/');
        cy.get('h2[data-test="heading"]').contains('Bookish')
    })
})