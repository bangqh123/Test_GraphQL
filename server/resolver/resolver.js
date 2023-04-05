const {books, authors} = require('../db/static')
const Author = require('../models/Author')
const Book = require('../models/Book')

const resolver = {
    Query: {
        books: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks(),
		book: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getBookById(id),

		authors: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllAuthors(),
		author: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorById(id)
    },

    Book: {
		author: async ({ authorId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorById(authorId)
	},

	Author: {
		books: async ({ id }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks({ authorId: id })
	},

    Mutation: {
        createAuthor: async(parent, args) => {
            const newAuthor = new Author(args)
            return await newAuthor.save()
        },
        createBook: async(parent, args) => {
            const newBook = new Book(args)
            return await newBook.save()
        }
    }
}

module.exports = resolver