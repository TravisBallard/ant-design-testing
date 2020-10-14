describe('Country DB Tests', () => {

    it('loads a random country if one is not specified', () => {
        const localUrl = 'http://localhost:3000/'
        cy.visit(localUrl)
        cy.url()
            .should('not.equal', localUrl)
    })

    it('loads a specific country if one is provided', () => {
        cy.visit('http://localhost:3000/sweden/')
        cy.get('h1')
            .contains('Sweden')
        cy.get('.ant-statistic')
            .contains('Stockholm')
    })

    it('Random County button works as expected', () => {
        const localUrl = 'http://localhost:3000/sweden/'
        cy.visit(localUrl)
        cy.get('[data-random-country-btn]')
            .contains('Random Country')
            .click()
        cy.url().should('not.equal', localUrl)
    })

    it('Search works as expected', () => {
        cy.visit('http://localhost:3000/')
        cy.get('.ant-select-show-search')
            .click()
            .find('.ant-select-selection-search-input')
            .focus()
            .type('United States of America')
            .blur()
            .find('.ant-select-item-option-content')
    })

    it('Data is stored in localStorage', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-random-country-btn]')
            .should(() => {
                expect(localStorage.getItem('countryData')).to.exist
                expect(localStorage.getItem('exchange_rates_30_days_USD')).to.exist
            })
    })
})