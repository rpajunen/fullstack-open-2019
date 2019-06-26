/* eslint-disable no-undef */


describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cypress tester',
      username: 'cyusername',
      password: 'cypassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login page renders', function () {
    cy.contains('Log-in to your account')
  })

  it('user can register', function () {
    cy.get('#register')
      .click()
    cy.contains('Register')
    cy.get('#name')
      .type('cypress testaaja')
    cy.get('#username')
      .type('cytest')
    cy.get('#password')
      .type('cypassword')
    cy.get('#registerButton')
      .click()
    cy.contains('Log-in to your account')
  })

  it('user can login', function () {
    cy.get('#username')
      .type('cyusername')
    cy.get('#password')
      .type('cypassword')
    cy.get('#login')
      .click()
    cy.contains('Cypress tester logged in')
  })

})