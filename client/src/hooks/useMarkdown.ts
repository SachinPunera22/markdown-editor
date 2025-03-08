import { useContext } from 'react';
import { MarkdownContext } from '../context/MarkdownContext';

export const useMarkdown = () => {
    const context = useContext(MarkdownContext);

    if (context === undefined) {
        throw new Error('useMarkdown must be used within a MarkdownProvider');
    }

    return context;
};