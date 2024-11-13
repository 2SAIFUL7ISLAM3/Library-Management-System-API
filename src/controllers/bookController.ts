import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

                         // Controller function to create a new book
                    
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;

                        // Create a new book record in the database

    const newBook = await prisma.book.create({
      data: {
        title,
        genre,
        publishedYear,
        totalCopies,
        availableCopies,
      },
    });

    // Send response
    res.status(201).json({
      success: true,
      status: 201,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to create book",
    });
  }
};


                                              // Function to retrieve all books

export const getAllBooks = async (req: Request, res: Response) => {
    try {
      const books = await prisma.book.findMany();
  
      // Send response
      res.status(200).json({
        success: true,
        status: 200,
        message: "Books retrieved successfully",
        data: books,
      });
    } catch (error) {
      console.error("Error retrieving books:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to retrieve books",
      });
    }
  };
  

                                         // Function to retrieve a book by its ID


export const getBookById = async (req: Request, res: Response): Promise<Response | undefined>  => {
    try {
      const { bookId } = req.params;
  
      // Find book by ID

      const book = await prisma.book.findUnique({
        where: { bookId },
      });
  
      // Check if the book exists

      if (!book) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Book not found",
        });
      }
  
      // Send response

      res.status(200).json({
        success: true,
        status: 200,
        message: "Book retrieved successfully",
        data: book,
      });
    
    } catch (error) {
      console.error("Error retrieving book:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to retrieve book",
      });
    }
  };
  

                            // Function to update a book by its ID

export const updateBook = async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
      const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;
  
      // Update book by ID

      const updatedBook = await prisma.book.update({
        where: { bookId },
        data: {
          title,
          genre,
          publishedYear,
          totalCopies,
          availableCopies,
        },
      });
  
      // Send response

      res.status(200).json({
        success: true,
        status: 200,
        message: "Book updated successfully",
        data: updatedBook,
      });
    } catch (error:any) {

      console.error("Error updating book:", error);
  
      if (error.code === "P2025") {

        // Prisma error code P2025 indicates that no record was found

        return res.status(404).json({
          success: false,
          status: 404,
          message: "Book not found",
        });
      }
  
      res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to update book",
      });
    }
  };
  

  // Function to delete a book by its ID
export const deleteBook = async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
  
      // Delete book by ID
      await prisma.book.delete({
        where: { bookId },
      });
  
      // Send response
      res.status(200).json({
        success: true,
        status: 200,
        message: "Book successfully deleted",
      });
    } catch (error:any) {
      console.error("Error deleting book:", error);
  
      if (error.code === "P2025") {
        // Prisma error code P2025 indicates that no record was found
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Book not found",
        });
      }
  
      res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to delete book",
      });
    }
  };
  