/// <references types="Cypress"/>

describe('Teste de login', () => {

    it('Deve realizar o login', () => {  
        cy.login_teste('standard_user','secret_sauce')
        cy.get('.title').should('contain', 'Products')
    });

    it('Validando o login incorreto', () => {
       cy.login_teste('incorreto','secret_sauce')
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')
    });

    it('Validar a senha incorreta', () => {
        cy.login_teste('standard_user','incorreta')
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')
        
    });
    
});