/// <references types="Cypress"/>

describe('Realizando uma compra', () => {

    it('Compra de produtos ', () => {

       cy.login_teste('standard_user','secret_sauce')
        cy.get('.title').should('contain', 'Products')

        ///Ordenar produtos do menor para o maior valor

        cy.get('[data-test="product_sort_container"]').select('Price (low to high)')

        // Validando as ordens do produtos

        cy.get(':nth-child(1) > .inventory_item_description').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(2) > .inventory_item_description').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(3) > .inventory_item_description').should('contain','Sauce Labs Bolt T-Shirt')

        // Adicionando produtos ao carrinho
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        //Checando a quantidade do carrinho

        cy.get('.shopping_cart_link')
        .should('have.text','3')
        .click()

        // Checando o carrinho de compras
        
        cy.get('.shopping_cart_link').click()
        cy.verificaProdutos()

        //Checkout:

        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Nome teste')
        cy.get('[data-test="lastName"]').type('Sobrenome teste')
        cy.get('[data-test="postalCode"]').type('0101010')
        cy.get('[data-test="continue"]').click()

        // Verificando produtos no checkout

        cy.verificaProdutos()

        // Chegando o valor total

        cy.get('.summary_total_label').should('have.text','Total: $36.69')
        cy.get('[data-test="finish"]').click()
        cy.get('.complete-header').should('have.text','Thank you for your order!')
    });   
});