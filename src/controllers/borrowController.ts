import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();

// Function to borrow a book
export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, memberId } = req.body;

    // Step 1: Check if the book exists and if there are available copies
    const book = await prisma.book.findUnique({
      where: { bookId },
    });

    if (!book) {
      return next({
        status: 404,
        message: 'Book not found',
      });
    }

    if (book.availableCopies <= 0) {
      return next({
        status: 400,
        message: 'No available copies for borrowing',
      });
    }

    // Step 2: Create a borrow record

    const borrowRecord = await prisma.borrowRecord.create({
      data: {
        bookId,
        memberId,
        borrowDate: new Date(),
      },
    });

    // Step 3: Update the availableCopies of the book

    await prisma.book.update({
      where: { bookId },
      data: {
        availableCopies: book.availableCopies - 1,
      },
    });

    // Step 4: Send success response

    res.status(200).json({
      success: true,
      status: 200,
      message: "Book borrowed successfully",
      data: {
        borrowId: borrowRecord.borrowId,
        bookId: borrowRecord.bookId,
        memberId: borrowRecord.memberId,
        borrowDate: borrowRecord.borrowDate,
      },
    });
  } catch (error) {
    next(error);

    // console.error("Error borrowing book:", error);
    // res.status(500).json({
    //   success: false,
    //   status: 500,
    //   message: "Failed to borrow book",
    // });


  }
};


                                        // Function to return a book

export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { borrowId } = req.body;
  
      // Step 1: Find the borrow record

      const borrowRecord = await prisma.borrowRecord.findUnique({
        where: { borrowId },
        include: {
          Book: true, // Include book details to update available copies
        },
      });
  
      if (!borrowRecord) {
        return next({
          status: 404,
          message: 'Borrow record not found',
        });
      }
  
      // Step 2: Update the borrow record's returnDate
      await prisma.borrowRecord.update({
        where: { borrowId },
        data: {
          returnDate: new Date(),
        },
      });
  
      // Step 3: Update the book's availableCopies
      await prisma.book.update({
        where: { bookId: borrowRecord.bookId },
        data: {
          availableCopies: borrowRecord.Book.availableCopies + 1,
        },
      });
  
      // Step 4: Send success response
      res.status(200).json({
        success: true,
        status: 200,
        message: "Book returned successfully",
      });
    } catch (error) {

      next(error);

      // console.error("Error returning book:", error);
      // res.status(500).json({
      //   success: false,
      //   status: 500,
      //   message: "Failed to return book",
      // });


    }
  };



  export const getOverdueBorrowList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the current date
      const currentDate = new Date();
  
      // Fetch borrow records where returnDate is null and borrowDate + 14 days is before the current date
      const overdueBooks = await prisma.borrowRecord.findMany({
        where: {
          returnDate: null,
          borrowDate: {
            lt: new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
          },
        },
        include: {
          Book: true, // Include book details
          Member: true, // Include member details
        },
      });
  
      if (overdueBooks.length > 0) {
        // Map the overdue books to the required response format
        const overdueList = overdueBooks.map((borrowRecord) => ({
          borrowId: borrowRecord.borrowId,
          bookTitle: borrowRecord.Book.title,
          borrowerName: borrowRecord.Member.name,
          overdueDays: Math.floor(
            (currentDate.getTime() - new Date(borrowRecord.borrowDate).getTime()) / (1000 * 3600 * 24) - 14
          ), // Calculate overdue days
        }));
  
        // Return the overdue books
        res.status(200).json({
          success: true,
          status: 200,
          message: 'Overdue borrow list fetched',
          data: overdueList,
        });
      } else {
        // No overdue books
        res.status(200).json({
          success: true,
          status: 200,
          message: 'No overdue books',
          data: [],
        });
      }
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  };
  
