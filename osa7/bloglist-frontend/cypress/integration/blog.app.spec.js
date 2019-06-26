/* eslint-disable no-undef */

function login() {
  cy.get('#username')
    .type('cyusername')
  cy.get('#password')
    .type('cypassword')
  cy.get('#login')
    .click()
  cy.contains('Cypress tester logged in')
}

function createBlog() {
  cy.get('#create-blog')
    .click()
  cy.get('#title')
    .type('testing blog')
  cy.get('#author')
    .type('william w. tester')
  cy.get('#url')
    .type('www.cytest.com')
  cy.get('#submit')
    .click()
  cy.contains('testing blog')
  cy.contains('william w. tester')
}

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
    login()
  })

  it('user can add new blog', function () {
    login()
    createBlog()
  })
})