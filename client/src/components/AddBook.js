import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


function DisplayAuthors(){
    const { loading, error, data } = useQuery(getAuthorsQuery);
    if(loading){
        return( <option disabled>Loading authors</option> );
    } 
    else if(error){
        return <li>There's an error mate..!!</li>
    }
    else {
        return data.authors.map(author => {
            return( <option key={ author.id } value={ author.id }>{ author.name }</option> );
        });
    }    
}

function AddBook() {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const { loading, data } = useQuery(getAuthorsQuery);
    const [ addBookMut ] = useMutation(addBookMutation);
  
    const handleSubmit = (e) =>{
        e.preventDefault();
        const newObj = {name , genre,authorId}
        console.log(newObj);
        addBookMut({
            variables: {
              name: name,
              genre: genre,
              authorId: authorId
            },
            refetchQueries:[{query: getBooksQuery}]
          });
    }
    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className="field">
                <label className='bname'>Book name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="field">
                <label className='genre'>Genre:</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}  />
            </div>
            
            <div className="field">
                <label className='author'>Author:</label>
                <select className='dropdown' value={authorId} onChange={(e) => setAuthorId(e.target.value)} >
                    <option className='dropbtn' >Select author</option>                       
                    { DisplayAuthors(loading, data) }
                </select>
            </div>
            <button className='button'>Add Book</button>
        </form>
    )      
}
export default AddBook;