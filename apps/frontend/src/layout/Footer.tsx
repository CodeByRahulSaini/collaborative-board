import React from 'react';
import { FaGithub } from 'react-icons/fa';
import consts from '../consts';

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <a href={consts.githubUrl}>
                <FaGithub size={20} />
            </a>
        </div>
    );
};

export default Footer;
