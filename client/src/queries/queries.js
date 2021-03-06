import { gql } from "@apollo/client";

const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;


const addBookMutation = gql`
    mutation AddBook( $name: String!, $genre: String!, $authorId: ID! ) {
      addBook(name: $name, genre: $genre, authorId: $authorId){
          name
          id
       }
}
`;

    

export { getBooksQuery, getAuthorsQuery, addBookMutation }