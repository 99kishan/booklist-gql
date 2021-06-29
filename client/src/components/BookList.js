import React from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

function BookList() {
	const {loading, error, data} = useQuery(getBooksQuery)
	if (data) {
		console.log("data: ", data);
	}
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Something went wrong breh</p>;
	return (
		<ul>
			{data.books.map(book => (<p className='books' key={book.id}> {book.name} </p>))}
		</ul>
	);
	
}

export default BookList;