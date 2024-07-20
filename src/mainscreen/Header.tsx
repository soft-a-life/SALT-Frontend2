import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import Modal from "../kakaologin/Modal";
import KakaoLogin from "../kakaologin/KakaoLogin";
import { useAuth } from "../user/AuthContext";

const Header = () => {
    const { isLoggedIn, user, login, logout } = useAuth();
    const [loginOpen, setLoginOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setLoginOpen(true);
    };
    const closeModal = () => {
        setLoginOpen(false);
    };

    const handleLogin = (user: { nickname: string; email: string }) => {
        login(user);
        closeModal();
        navigate("/"); // 로그인 후 메인 페이지로 이동
    };

    useEffect(() => {
        // 사용자 정보가 업데이트되었는지 확인하기 위해 콘솔에 출력
        console.log("User updated:", user);
    }, [user]);

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <header className="header">
            <div className="contents">
                <div className="logoimage" onClick={handleLogoClick}></div>
                <nav className="navigation">
                    <ul>
                        <li>SAL</li>
                        <li>프로젝트</li>
                        <li>개발자들</li>
                    </ul>
                </nav>
                <div className="kakaologin">
                    {isLoggedIn ? (
                        <div className="logout">
                            <span>{user?.userUuid ? user.userUuid : user?.nickname}</span> {/* UUID가 있으면 UUID를, 없으면 닉네임을 표시 */}
                            <span onClick={logout}>로그아웃</span>
                            <Link to="/mypage">마이페이지</Link>
                        </div>
                    ) : (
                        <span onClick={openModal}>로그인</span>
                    )}
                </div>
            </div>
            <Modal show={loginOpen} onClose={closeModal}>
                <KakaoLogin onLogin={handleLogin} />
            </Modal>
        </header>
    );
}

export default Header;
