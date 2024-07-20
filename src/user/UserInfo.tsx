import React from 'react';
import { useAuth } from './AuthContext';

const UserInfo: React.FC = () => {
    const { isLoggedIn, user, login, logout } = useAuth();

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Logged in as: {user?.nickname}</p>
                    <p>Email: {user?.email}</p>
                </div>
            ) : (
                <div>
                    <p>You are not logged in.</p>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
