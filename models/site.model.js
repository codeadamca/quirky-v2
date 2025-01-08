const mongoose= require("mongoose");

const SiteSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        github: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false
        },
        approved: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

const Site = mongoose.model("Site", SiteSchema);

module.exports = Site;