import React, { useEffect } from 'react';
import { MdContentCopy } from 'react-icons/md';
import { RiAiGenerate } from 'react-icons/ri';

const Header: React.FC = () => {
    useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.href = generateNewUrl();
        }
    });

    const generateNewUrl = () => {
        const uniqueNumber = Date.now() + Math.floor(Math.random() * 100); // Generate a unique number
        const newUrl = `${window.location.origin}/${uniqueNumber}`; // Create the new URL
        return newUrl;
    };

    const openNewTab = () => {
        const newWindow = window.open(generateNewUrl(), '_blank');
        if (newWindow) {
            newWindow.focus();
        }
    };

    const copyCurrentAddress = () => {
        const currentAddress = window.location.href; // Get the current address
        navigator.clipboard.writeText(currentAddress); // Copy the current address to the clipboard
    };

    return (
        <div className="header">
            <button className="nav-button" onClick={openNewTab}>
                <RiAiGenerate size={20} />
            </button>
            <button className="nav-button" onClick={copyCurrentAddress}>
                <MdContentCopy size={20} />
            </button>
        </div>
    );
};

export default Header;
