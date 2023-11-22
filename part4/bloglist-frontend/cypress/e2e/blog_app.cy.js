describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-btn').click()
      cy.contains('root has logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('qewqw')
      cy.get('#password').type('fdfsfd')
      cy.get('#login-btn').click()
      cy.contains('wrong credentials')
      cy.should('not.contain', 'root has logged in')
    })
  })
})