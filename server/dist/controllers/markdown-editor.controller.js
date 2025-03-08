"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownEditorController = void 0;
const marked_1 = require("marked");
const zod_1 = require("zod");
// Input validation schema
const MarkdownInputSchema = zod_1.z.object({
    markdown: zod_1.z.string().min(1, { message: 'Markdown text cannot be empty' }),
});
class MarkdownEditorController {
    /**
     * Converts markdown text to HTML
     * @param markdown - Markdown text to convert
     * @returns Converted HTML string
     */
    convertMarkdownToHtml(markdown) {
        try {
            // Validate input
            const validatedInput = MarkdownInputSchema.parse({ markdown });
            // Convert markdown to HTML
            return marked_1.marked.parse(validatedInput.markdown);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                // Handle validation errors
                throw new Error(error.errors[0].message);
            }
            throw error;
        }
    }
}
exports.MarkdownEditorController = MarkdownEditorController;
