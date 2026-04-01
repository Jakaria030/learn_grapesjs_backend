import express from "express";
import Page from "../models/Page.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ------------------------------------------------
// GET /api/pages — Get all pages
// ------------------------------------------------
const getAllPages = async (req, res) => {
    try {
        const pages = await Page.find({ user: req.user._id }).select("-projectData").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: pages.length,
            data: pages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ------------------------------------------------
// GET /api/pages/:id — Get single page
// ------------------------------------------------
const getPage = async (req, res) => {
    try {
        const page = await Page.findById({ _id: req.params.id, user: req.user._id });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found",
            });
        }

        res.status(200).json({
            success: true,
            data: page,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ------------------------------------------------
// POST /api/pages — Create new page
// ------------------------------------------------
const createPage = async (req, res) => {
    try {

        const { name, projectData } = req.body;

        // generate slug from name
        const slug = name
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^a-z0-9-]/g, "");

        const page = await Page.create({
            name,
            projectData,
            slug,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            data: page,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ------------------------------------------------
// PUT /api/pages/:id — Update page
// ------------------------------------------------
const updatePage = async (req, res) => {
    try {

        const { name, projectData, published } = req.body;

        const page = await Page.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { name, projectData, published },
            // return updated document
            { new: true }
        );

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found",
            });
        }

        res.status(200).json({
            success: true,
            data: page,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ------------------------------------------------
// DELETE /api/pages/:id — Delete page
// ------------------------------------------------
const deletePage = async (req, res) => {
    try {

        const page = await Page.findByIdAndDelete({ _id: req.params.id, user: req.user._id });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Page deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ------------------------------------------------
// Register routes
// ------------------------------------------------
router.use(protect);

router.get("/", getAllPages);
router.get("/:id", getPage);
router.post("/", createPage);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);

export default router;