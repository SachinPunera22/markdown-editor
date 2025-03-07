import React from 'react';
import Navbar from '../Navbar';
import MarkdownEditor from '../Markdown/MarkdownEditor';
import MarkdownPreview from '../Markdown/MarkdownPreview';
import { MarkdownProvider } from '../../context/MarkdownContext';

const Dashboard: React.FC = () => {
    return (
        <MarkdownProvider>
            <div className="d-flex flex-column vh-100">
                <Navbar />
                <div className="container-fluid flex-grow-1 mt-3">
                    <div className="row h-100">
                        <div className="col-md-6 h-100">
                            <MarkdownEditor />
                        </div>
                        <div className="col-md-6 h-100">
                            <MarkdownPreview />
                        </div>
                    </div>
                </div>
            </div>
        </MarkdownProvider>
    );
};

export default Dashboard;