import React from 'react';

const Header: React.FC = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Red Cross Lottery Admin</h1>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#f8f9fa',
        padding: '10px 20px',
        borderBottom: '1px solid #dee2e6',
    },
    title: {
        margin: 0,
        fontSize: '24px',
        color: '#343a40',
    },
};

export default Header; 