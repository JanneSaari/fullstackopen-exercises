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

  it('Login form is shown by default', function() {
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

  describe('When logged in', function() {
    beforeEach( function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'root',
        password: 'sekret'
      })
        .then(response => {
          localStorage.setItem('loggedAppUser',
            JSON.stringify(response.body))
          cy.visit('http://localhost:5173')
        })
    })

    it('Blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title-field').type('testTitle')
      cy.get('#author-field').type('testAuthor')
      cy.get('#url-field').type('testURL')
      cy.get('#add-blog-btn').click()

      cy.contains('"testTitle" by testAuthor')
    })

    it('Blog can be liked', function() {
      cy.contains('new blog').click()

      cy.get('#title-field').type('testTitle')
      cy.get('#author-field').type('testAuthor')
      cy.get('#url-field').type('testURL')
      cy.get('#add-blog-btn').click()

      cy.get('.blog-element').as('blog').contains('"testTitle" by testAuthor').click()

      cy.get('@blog').get('.likes-element').should('contain', 'Likes: 0')
      cy.get('@blog').get('.like-blog-btn').click()
      cy.get('@blog').get('.likes-element').should('contain', 'Likes: 1')
      cy.get('@blog').get('.like-blog-btn').click()
      cy.get('@blog').get('.likes-element').should('contain', 'Likes: 2')
    })
  })
})