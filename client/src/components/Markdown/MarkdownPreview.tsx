import React, { useContext } from 'react';
import { useMarkdown } from '../../hooks/useMarkdown';

const MarkdownPreview: React.FC = () => {
    const { html } = useMarkdown();

    return (
        <div className="card h-100">
            <div className="card-header">
                <h5 className="card-title">Preview</h5>
            </div>
            <div className="card-body overflow-auto">
                {html ? (
                    <div
                        className="preview-content"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                ) : (
                    <p className="text-muted text-center">
                        Your markdown preview will appear here
                    </p>
                )}
            </div>
        </div>
    );
};

export default MarkdownPreview;