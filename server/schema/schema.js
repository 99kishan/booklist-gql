const graphql = require("graphql")
const Book = require('../models/book')
const Author = require('../models/author')


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } = graphql
/*
var books = [
    {name:'Sanghi Who Never Went To A Shakha',genre:'Politics' , id:1, authorId: '1'},
    {name:'The Man who knew Infinity',genre:'Biopic' , id:2, authorId: '2'},
    {name:'Popeye The Sailor Man',genre:'Children' , id:3, authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: 4, authorId: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: 5, authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: 6, authorId: '3'},
    {name: 'Name of the Wind', genre: 'Fantasy', id: 7, authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: 8, authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: 9, authorId: '3'},
]

var authors =  [
    {name: 'Rahul Roushan', age: 44, id:"1"},
    {name: 'Robert Kanigel', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"},
]
*/
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId:{ type: GraphQLID },
        author:{
            type: AuthorType,
            resolve(parent, args){
                //return authors.find(author => author.id === parent.authorId )
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return books.filter(book => book.authorId === parent.id )
               return Book.find({ authorId: parent.id })
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
               // return books.find(book => book.id == args.id)
               return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
               // return authors.find(author => author.id == args.id)
               return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return books
               return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
               // return authors
               return Author.find({})
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name:{ type: new GraphQLNonNull(GraphQLString) },
                age:{ type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        
        addBook:{
            type: BookType,
            args:{
                name:{ type: new GraphQLNonNull(GraphQLString) },
                genre:{ type: new GraphQLNonNull(GraphQLString) },
                authorId:{ type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})