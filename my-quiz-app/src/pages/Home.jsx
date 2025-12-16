// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Database, Globe, Cpu, ChevronRight } from 'lucide-react';

const QuizCard = ({ title, desc, icon: Icon, path, color }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(path)}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
    >
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white shadow-sm`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 text-sm mb-4 h-10">
        {desc}
      </p>
      <div className="flex items-center text-blue-600 text-sm font-medium">
        퀴즈 시작하기 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          CS 지식 마스터하기
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          컴퓨터 과학 핵심 분야별 퀴즈를 통해 당신의 실력을 점검해보세요.
          각 분야별 50문항이 준비되어 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 퀴즈 1: 시스템 보안 (제공해주신 코드) */}
        <QuizCard 
          title="Kernel"
          icon={Shield}
          path="/quiz/1"
          color="bg-blue-600"
        />

        {/* 퀴즈 2: 예시 (네트워크) */}
        <QuizCard 
          title="Software Defense"
          icon={Globe}
          path="/quiz/2"
          color="bg-green-600"
        />

        {/* 퀴즈 3: 예시 (데이터베이스) */}
        <QuizCard 
          title="HW Security TEE"
          icon={Database}
          path="/quiz/3"
          color="bg-purple-600"
        />

        {/* 퀴즈 4: 예시 (운영체제) */}
        <QuizCard 
          title="Cache Attack"
          icon={Cpu}
          path="/quiz/4"
          color="bg-orange-600"
        />

        <QuizCard 
          title="Kerenl & Defense"
          icon={Cpu}
          path="/quiz/5"
          color="bg-orange-600"
        />

        <QuizCard 
          title="Total Quiz 1"
          icon={Cpu}
          path="/quiz/6"
          color="bg-orange-600"
        />

        <QuizCard 
          title="Total Quiz 2"
          icon={Cpu}
          path="/quiz/7"
          color="bg-orange-600"
        />

        <QuizCard 
          title="Memory Attack"
          icon={Cpu}
          path="/quiz/8"
          color="bg-orange-600"
        />

        <QuizCard 
          title="고급 공격 기법"
          icon={Cpu}
          path="/quiz/9"
          color="bg-orange-600"
        />
        
        <QuizCard 
          title="어플리케이션 취약점"
          icon={Cpu}
          path="/quiz/10"
          color="bg-orange-600"
        />
      </div>
    </div>
  );
}