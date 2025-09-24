import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';

const About = () => {
    return (
        <div>
            This is about page
            <Link to={'/'}><Button>Go Home</Button></Link>
        </div>
    );
};

export default About;