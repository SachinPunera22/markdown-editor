import React, { createContext, useState, useMemo } from 'react';
import { MarkdownContextType } from '../@types/socket';

export const MarkdownContext = createContext<MarkdownContextType>({
    markdown: '',
    html: '',
    setError: () => {},
    setHtml: () => {},
    error: null
});

export const MarkdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [markdown, setMarkdownState] = useState<string>('');
    const [html, setHtmlState] = useState<string>('');
    const [error, setErrorState] = useState<string | null>(null);

    const setError = (value: string) => {
        setErrorState(value);
        // You can add additional logic here if needed
    };

    const setHtml = (value: string) => {
        console.log('html',value);
        setHtmlState(value);
        // You can add additional logic here if needed
    };

    const contextValue = useMemo(() => ({
        markdown,
        html,
        setError,
        setHtml,
        error
    }), [markdown, html, error]);

    return (
        <MarkdownContext.Provider value={contextValue}>
            {children}
        </MarkdownContext.Provider>
    );
};