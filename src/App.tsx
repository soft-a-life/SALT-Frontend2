import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import MainScreen from './mainscreen/MainScreen';
import SuccessPage from './mainscreen/SuccessPage';
import MyPage from './user/MyPage';
import MainBoardList from './board/MainBoardList'
import WritePost from './board/WritePost';
import PostDetail from './board/PostDetail';
import { AuthProvider } from './user/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout><MainBoardList/></Layout>} />
                    <Route path="/write" element={<Layout><WritePost /></Layout>} />
                    <Route path="/posts/:id" element={<Layout><PostDetail /></Layout>} />
                    <Route path="/login/success" element={<Layout><SuccessPage /></Layout>} />
                    <Route path="/mypage" element={<Layout><MyPage /></Layout>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './Layout/Layout';
// import MainScreen from './mainscreen/MainScreen';
// import SuccessPage from './mainscreen/SuccessPage';
// //import MyPage from './mypage/MyPage';
// //<Route path="/mypage" element={<MyPage />} />
// import { AuthProvider } from './user/AuthContext';
// //import UserInfo from './user/UserInfo';
// //<UserInfo />

// function App() {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Layout>
                    
//                     <Routes>
//                         <Route path="/" element={<MainScreen />} />
//                         <Route path="/login/success" element={<SuccessPage />} />
                        
//                     </Routes>
//                 </Layout>
//             </Router>
//         </AuthProvider>
//     );
// }

// export default App;
