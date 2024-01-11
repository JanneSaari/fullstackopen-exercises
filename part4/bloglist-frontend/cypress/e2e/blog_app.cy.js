describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Root User",
      username: "root",
      password: "sekret",
    };
    const testuser = {
      name: "Test User",
      username: "testUser",
      password: "testPW",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.request("POST", "http://localhost:3001/api/users/", testuser);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown by default", function () {
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("sekret");
      cy.get("#login-btn").click();
      cy.contains("root has logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("qewqw");
      cy.get("#password").type("fdfsfd");
      cy.get("#login-btn").click();
      cy.contains("wrong credentials");
      cy.should("not.contain", "root has logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      const response = cy
        .request("POST", "http://localhost:3001/api/login", {
          username: "root",
          password: "sekret",
        })
        .then((response) => {
          localStorage.setItem("loggedAppUser", JSON.stringify(response.body));

          let testBlog = {
            title: "testTitle",
            author: "testAuthor",
            url: "some/test/url",
            likes: 0,
          };
          const token = JSON.parse(localStorage.getItem("loggedAppUser")).token;
          console.log("token: ", token);
          //Read about cypress auth option in request https://docs.cypress.io/api/commands/request
          cy.request({
            method: "POST",
            url: "http://localhost:3001/api/blogs",
            body: testBlog,
            auth: {
              bearer: token,
            },
          });
          cy.visit("http://localhost:5173");
        });
    });

    it("Blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title-field").type("newBlog");
      cy.get("#author-field").type("newAuthor");
      cy.get("#url-field").type("newURL");
      cy.get("#add-blog-btn").click();

      cy.contains('"newBlog" by newAuthor');
    });

    it("Blog can be liked", function () {
      cy.get(".blog-element")
        .as("blog")
        .contains('"testTitle" by testAuthor')
        .click();

      cy.get("@blog").get(".likes-element").should("contain", "Likes: 0");
      cy.get("@blog").get(".like-blog-btn").click();
      cy.get("@blog").get(".likes-element").should("contain", "Likes: 1");
      cy.get("@blog").get(".like-blog-btn").click();
      cy.get("@blog").get(".likes-element").should("contain", "Likes: 2");
    });

    it("User can delete blogs they have added", function () {
      cy.get(".blog-element")
        .as("blog")
        .contains('"testTitle" by testAuthor')
        .click();
      cy.get("@blog").contains("Delete blog").click();

      cy.get("@blog").should("not.exist");
    });

    describe("With multiple users", function () {
      it("User only sees delete button on blogs they have added", function () {
        localStorage.clear();

        cy.request("POST", "http://localhost:3001/api/login", {
          username: "testUser",
          password: "testPW",
        }).then((response) => {
          localStorage.setItem("loggedAppUser", JSON.stringify(response.body));
          cy.visit("http://localhost:5173");
        });

        cy.get(".blog-element")
          .as("blog")
          .contains('"testTitle" by testAuthor')
          .click();
        cy.get("@blog").should("not.contain", "Delete blog");
      });
    });

    describe("With multiple blogs already added", function () {
      beforeEach(function () {
        const token = JSON.parse(localStorage.getItem("loggedAppUser")).token;

        //Read about cypress auth option in request https://docs.cypress.io/api/commands/request
        let testBlog1 = {
          title: "ShouldBeFirst",
          author: "testAuthor",
          url: "some/test/url",
          likes: 10,
        };
        cy.request({
          method: "POST",
          url: "http://localhost:3001/api/blogs",
          body: testBlog1,
          auth: {
            bearer: token,
          },
        });

        let testBlog3 = {
          title: "ShouldBeThird",
          author: "testAuthor",
          url: "some/test/url",
          likes: 2,
        };
        cy.request({
          method: "POST",
          url: "http://localhost:3001/api/blogs",
          body: testBlog3,
          auth: {
            bearer: token,
          },
        });

        let testBlog2 = {
          title: "ShouldBeSecond",
          author: "testAuthor",
          url: "some/test/url",
          likes: 5,
        };
        cy.request({
          method: "POST",
          url: "http://localhost:3001/api/blogs",
          body: testBlog2,
          auth: {
            bearer: token,
          },
        });

        cy.visit("http://localhost:5173");
      });

      it("Blogs are sorted by most likes", function () {
        cy.get(".blog-element").eq(0).should("contain", "ShouldBeFirst");
        cy.get(".blog-element").eq(1).should("contain", "ShouldBeSecond");
        cy.get(".blog-element").eq(2).should("contain", "ShouldBeThird");
        cy.get(".blog-element").eq(3).should("contain", "testTitle");
      });
    });
  });
});
