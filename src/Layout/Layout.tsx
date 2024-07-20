import React from "react";
import Header from "../mainscreen/Header";
import Footer from "../mainscreen/Footer";
import Sidebar from "../mainscreen/left_components/Left_Sidebar";
import MainImage from "../mainscreen/MainImage";
import "./Layout.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <MainImage />
            <div className="main-container">
                <Sidebar />
                <main className="main-content">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
