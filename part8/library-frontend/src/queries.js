import { gql } from "@apollo/client"

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
      author {
        name
      }
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
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