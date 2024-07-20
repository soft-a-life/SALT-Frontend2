import React from 'react';
import './Left_Sidebar.css';
import BoardList from './BoardList';
import CustomerService from './CustomerService';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <BoardList />
            <CustomerService />
        </div>
    );
}

export default Sidebar;
