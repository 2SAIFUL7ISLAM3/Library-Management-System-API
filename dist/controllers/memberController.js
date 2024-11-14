"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.getMemberById = exports.getAllMembers = exports.createMember = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Function to create a new member
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, email, phone, membershipDate } = req.body;
        // Create a new member
        const newMember = yield prisma.member.create({
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
    }
    catch (error) {
        console.error("Error creating member:", error);
        if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('email'))) {
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
});
exports.createMember = createMember;
// Function to retrieve all members
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all members
        const members = yield prisma.member.findMany();
        // Send response
        res.status(200).json({
            success: true,
            status: 200,
            message: "Members retrieved successfully",
            data: members,
        });
    }
    catch (error) {
        console.error("Error retrieving members:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Failed to retrieve members",
        });
    }
});
exports.getAllMembers = getAllMembers;
// Function to retrieve a member by their ID
const getMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        // Retrieve the member by ID
        const member = yield prisma.member.findUnique({
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
    }
    catch (error) {
        console.error("Error retrieving member:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Failed to retrieve member",
        });
    }
});
exports.getMemberById = getMemberById;
// Function to update a member by their ID
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { memberId } = req.params;
        const { name, email, phone } = req.body;
        // Update the member's details
        const updatedMember = yield prisma.member.update({
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
    }
    catch (error) {
        console.error("Error updating member:", error);
        if (error.code === 'P2025') {
            // Prisma error code P2025 indicates that no record was found
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Member not found",
            });
        }
        if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('email'))) {
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
});
exports.updateMember = updateMember;
// Function to delete a member by their ID
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        // Delete the member by ID
        yield prisma.member.delete({
            where: { memberId },
        });
        // Send response
        res.status(200).json({
            success: true,
            status: 200,
            message: "Member successfully deleted",
        });
    }
    catch (error) {
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
});
exports.deleteMember = deleteMember;
