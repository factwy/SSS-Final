// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home as HomeIcon, BookOpen } from 'lucide-react';

// 페이지 컴포넌트 임포트
import Home from './pages/Home';
import QuizPage1 from './pages/QuizPage1';
import QuizPage2 from './pages/QuizPage2'; // 파일이 있다고 가정
import QuizPage3 from './pages/QuizPage3'; // 파일이 있다고 가정
import QuizPage4 from './pages/QuizPage4'; // 파일이 있다고 가정
import QuizPage5 from './pages/QuizPage5';
import QuizPage6 from './pages/QuizPage6';
import QuizPage7 from './pages/QuizPage7';
import QuizPage8 from './pages/QuizPage8';
import QuizPage9 from './pages/QuizPage9';
import QuizPage10 from './pages/QuizPage10';

import TestPage1 from './pages/TestPage1';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';
import TestPage4 from './pages/TestPage4';

function CG1() {
  return (
    <iframe 
      src="/CG1.html" // public 폴더 기준 경로
      style={{ width: '100%', height: '100vh', border: 'none' }} 
      title="CG1 Page"
    />
  );
}

function CG2() {
  return (
    <iframe 
      src="/CG2.html" // public 폴더 기준 경로
      style={{ width: '100%', height: '100vh', border: 'none' }} 
      title="CG2 Page"
    />
  );
}

function CG3() {
  return (
    <iframe 
      src="/CG3.html" // public 폴더 기준 경로
      style={{ width: '100%', height: '100vh', border: 'none' }} 
      title="CG3 Page"
    />
  );
}
function CG4() {
  return (
    <iframe 
      src="/CG4.html" // public 폴더 기준 경로
      style={{ width: '100%', height: '100vh', border: 'none' }} 
      title="CG4 Page"
    />
  );
}

// 공통 레이아웃 (상단 네비게이션 바)
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 font-sans">
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl hover:text-blue-700">
              <BookOpen size={24} />
              <span>CS Quiz Master</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              <HomeIcon size={18} />
              메인으로
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <main>
      {children}
    </main>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/1" element={<QuizPage1 />} />
          <Route path="/quiz/2" element={<QuizPage2 />} />
          <Route path="/quiz/3" element={<QuizPage3 />} />
          <Route path="/quiz/4" element={<QuizPage4 />} />
          <Route path="/quiz/5" element={<QuizPage5 />} />
          <Route path="/quiz/6" element={<QuizPage6 />} />
          <Route path="/quiz/7" element={<QuizPage7 />} />
          <Route path="/quiz/8" element={<QuizPage8 />} />
          <Route path="/quiz/9" element={<QuizPage9 />} />
          <Route path="/quiz/10" element={<QuizPage10 />} />
          <Route path="/test/1" element={<TestPage1 />} />
          <Route path="/test/2" element={<TestPage2 />} />
          <Route path="/test/3" element={<TestPage3 />} />
          <Route path="/test/4" element={<TestPage4 />} />
          <Route path="/cg/1" element={<CG1 />} />
          <Route path="/cg/2" element={<CG2 />} />
          <Route path="/cg/3" element={<CG3 />} />
          <Route path="/cg/4" element={<CG4 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}