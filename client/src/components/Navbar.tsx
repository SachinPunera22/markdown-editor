import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-light bg-secondary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 text-white">Markdown Editor</span>
            </div>
        </nav>
    );
};

export default Navbar;