describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Root User',
      username: 'root',
      password: 'sekret'
    }
    const testuser = {
      name: 'Test User',
      username: 'testUser',
      password: 'testPW'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', testuser)
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

    const addTestBlog = () => {
      cy.contains('new blog').click()

      cy.get('#title-field').type('testTitle')
      cy.get('#author-field').type('testAuthor')
      cy.get('#url-field').type('testURL')
      cy.get('#add-blog-btn').click()

      cy.contains('"testTitle" by testAuthor')
    }

    it('Blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title-field').type('testTitle')
      cy.get('#author-field').type('testAuthor')
      cy.get('#url-field').type('testURL')
      cy.get('#add-blog-btn').click()

      cy.contains('"testTitle" by testAuthor')
    })

    it('Blog can be liked', function() {
      addTestBlog()

      cy.get('.blog-element').as('blog').contains('"testTitle" by testAuthor').click()

      cy.get('@blog').get('.likes-element').should('contain', 'Likes: 0')
      cy.get('@blog').get('.like-blog-btn').click()
      cy.get('@blog').get('.likes-element').should('contain', 'Likes: 1')
      cy.get('@blog').get('.like-blog-btn').click()
      cy.get('@blog').get('.likes-element').should('contain', 'Likes: 2')
    })

    it('User can delete blogs they have added', function() {
      addTestBlog()

      cy.get('.blog-element').as('blog').contains('"testTitle" by testAuthor').click()
      cy.get('@blog').contains('Delete blog').click()

      cy.get('@blog').should('not.exist')
    })

    describe('With multiple users', function() {
      it('User only sees delete button on blogs they have added', function() {
        addTestBlog()
        localStorage.clear()

        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'testUser',
          password: 'testPW'
        })
          .then(response => {
            localStorage.setItem('loggedAppUser',
              JSON.stringify(response.body))
            cy.visit('http://localhost:5173')
          })

        cy.get('.blog-element').as('blog').contains('"testTitle" by testAuthor').click()
        cy.get('@blog').should('not.contain', 'Delete blog')
      })
    })
  })
})