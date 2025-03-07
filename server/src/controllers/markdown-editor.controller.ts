import { marked } from 'marked';
import { z } from 'zod';

// Input validation schema
const MarkdownInputSchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown text cannot be empty' }),
});

export class MarkdownEditorController {
  /**
   * Converts markdown text to HTML
   * @param markdown - Markdown text to convert
   * @returns Converted HTML string
   */
  convertMarkdownToHtml(markdown: string): string {
    try {
      // Validate input
      const validatedInput = MarkdownInputSchema.parse({ markdown });

      // Convert markdown to HTML
      return marked.parse(validatedInput.markdown);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        throw new Error(error.errors[0].message);
      }
      throw error;
    }
  }
}
