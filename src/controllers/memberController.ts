import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();


                           // Function to create a new member
                        
export const createMember = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, membershipDate } = req.body;

    // Create a new member

    const newMember = await prisma.member.create({
      data: {
        name,
        email,
        phone,
        membershipDate: new Date(membershipDate),
      },
    });

    // Send response

    res.status(201).json({
      success: true,
      status: 201,
      message: "Member created successfully",
      data: newMember,
    });
  } catch (error:any) {
    console.error("Error creating member:", error);

    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      // P2002 is Prisma's unique constraint violation error
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to create member",
    });
  }
};


                          // Function to retrieve all members
export const getAllMembers = async (req: Request, res: Response) => {
    try {

                      // Retrieve all members

      const members = await prisma.member.findMany();
  
                     // Send response

      res.status(200).json({
        success: true,
        status: 200,
        message: "Members retrieved successfully",
        data: members,
      });
    } catch (error) {
      console.error("Error retrieving members:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to retrieve members",
      });
    }
  };
      
  
                           
                          // Function to retrieve a member by their ID

                          export const getMemberById = async (req: Request, res: Response) => {
    try {
      const { memberId } = req.params;
  
      // Retrieve the member by ID

      const member = await prisma.member.findUnique({
        where: { memberId },
      });
  
      // Check if member exists

      if (!member) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Member not found",
        });
      }
  
      // Send response

      res.status(200).json({
        success: true,
        status: 200,
        message: "Member retrieved successfully",
        data: member,
      });
    } catch (error) {
      console.error("Error retrieving member:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to retrieve member",
      });
    }
  };
  

                            // Function to update a member by their ID

export const updateMember = async (req: Request, res: Response) => {
    try {
      const { memberId } = req.params;
      const { name, email, phone } = req.body;
  
      // Update the member's details

      const updatedMember = await prisma.member.update({
        where: { memberId },
        data: {
          name,
          email,
          phone,
        },
      });
  
      // Send response

      res.status(200).json({
        success: true,
        status: 200,
        message: "Member updated successfully",
        data: updatedMember,
      });
    } catch (error:any) {
      console.error("Error updating member:", error);
  
      if (error.code === 'P2025') {

        // Prisma error code P2025 indicates that no record was found
        
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Member not found",
        });
      }
  
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        // P2002 is Prisma's unique constraint violation error
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Email already exists",
        });
      }
  
      res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to update member",
      });
    }
  };
  


                              // Function to delete a member by their ID

export const deleteMember = async (req: Request, res: Response) => {
    try {
      const { memberId } = req.params;
  
      // Delete the member by ID

      await prisma.member.delete({
        where: { memberId },
      });
  
      // Send response

      res.status(200).json({
        success: true,
        status: 200,
        message: "Member successfully deleted",
      });
    } catch (error:any) {
      console.error("Error deleting member:", error);
  
      if (error.code === 'P2025') {
        
        // Prisma error code P2025 indicates that no record was found
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Member not found",
        });
      }
  
      res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to delete member",
      });
    }
  };
  