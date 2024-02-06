import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query getBooks($author: String, $genre: String){
    allBooks (
      author: $author,
      genre: $genre
    ){
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const UPDATE_BIRTHYEAR = gql`
  mutation updateBirthyear($author: String!, $birthyear: Int!) {
    editAuthor(
      name: $author,
      setBornTo: $birthyear
    ) {
      name
      born
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me{
      username
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
    }
  }
`