import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
    {
        // page name — shown in dashboard
        name: {
            type: String,
            required: true,
            default: "Untitled Page",
        },

        // GrapesJS project data (components, styles, assets)
        projectData: {
            type: Object,
            required: true,
            default: {},
        },

        // page slug for URL
        slug: {
            type: String,
            unique: true,
        },

        // is page published?
        published: {
            type: Boolean,
            default: false,
        },

    },
    {
        // automatically adds createdAt and updatedAt
        timestamps: true,
    }
);

const Page = mongoose.model("Page", pageSchema);

export default Page;