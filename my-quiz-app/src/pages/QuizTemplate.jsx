import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle, XCircle, AlertCircle, 
  RefreshCw, Award, ChevronRight, ChevronLeft, 
  RotateCcw, Eye, EyeOff 
} from 'lucide-react';

export default function QuizTemplate({ quizData, title, subtitle }) {
  const [mode, setMode] = useState('landing'); // landing, practice, exam
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(null);

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setShowExplanation(false);
    setScore(null);
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    resetQuiz();
  };

  const handleAnswerSelect = (qId, optionIdx) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quizData.forEach(q => {
      if (userAnswers[q.id] === q.answer) correctCount++;
    });
    setScore(correctCount);
  };

  // 데이터가 없을 경우 에러 방지
  if (!quizData || quizData.length === 0) {
    return <div className="p-10 text-center text-gray-800 bg-white">데이터를 불러오는 중이거나 데이터가 없습니다.</div>;
  }

  return (
    // [수정됨] 다크모드 방지: text-gray-900 및 bg-gray-100을 강제 적용하여 부모 테마 무시
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-900 antialiased">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden min-h-[600px] flex flex-col border border-gray-200">
        
        {/* Header */}
        <header className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen size={28} />
              {title || "Quiz Application"}
            </h1>
            <p className="text-blue-100 text-sm mt-1">{subtitle || "지식을 테스트해보세요."}</p>
          </div>
          {mode !== 'landing' && (
            <button 
              onClick={() => setMode('landing')}
              className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded flex items-center gap-1 transition text-white"
            >
              <RotateCcw size={16} /> 홈으로
            </button>
          )}
        </header>

        {/* Content Body */}
        {/* [수정됨] bg-white 강제 적용 */}
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          {mode === 'landing' && (
            <div className="flex flex-col items-center justify-center h-full gap-8 py-10">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">모드를 선택하세요</h2>
                <p className="text-gray-500">총 {quizData.length}문항의 문제를 풀어보세요.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
                <button 
                  onClick={() => handleModeSelect('practice')}
                  className="flex flex-col items-center p-6 border-2 border-blue-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group bg-white"
                >
                  <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200">
                    <BookOpen className="text-blue-600" size={32} />
                  </div>
                  <span className="font-bold text-lg text-gray-700">연습 모드</span>
                  <span className="text-sm text-gray-500 text-center mt-2">한 문제씩 풀고 바로 정답과 해설을 확인합니다.</span>
                </button>

                <button 
                  onClick={() => handleModeSelect('exam')}
                  className="flex flex-col items-center p-6 border-2 border-green-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition group bg-white"
                >
                  <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:bg-green-200">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <span className="font-bold text-lg text-gray-700">시험 모드</span>
                  <span className="text-sm text-gray-500 text-center mt-2">모든 문제를 풀고 마지막에 점수를 확인합니다.</span>
                </button>
              </div>
            </div>
          )}

          {mode === 'practice' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Question {currentQuestionIdx + 1} of {quizData.length}</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{quizData[currentQuestionIdx].category}</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold leading-relaxed text-gray-900">{quizData[currentQuestionIdx].question}</h3>
                
                <div className="space-y-3">
                  {quizData[currentQuestionIdx].options.map((option, idx) => {
                    const isSelected = userAnswers[quizData[currentQuestionIdx].id] === idx;
                    const isCorrect = quizData[currentQuestionIdx].answer === idx;
                    
                    let btnClass = "w-full text-left p-4 rounded-lg border-2 transition relative ";
                    if (showExplanation) {
                       if (isCorrect) btnClass += "border-green-500 bg-green-50 text-green-800";
                       else if (isSelected && !isCorrect) btnClass += "border-red-500 bg-red-50 text-red-800";
                       else btnClass += "border-gray-200 bg-white text-gray-400"; // 오답 처리 후 나머지 보기
                    } else {
                       if (isSelected) btnClass += "border-blue-500 bg-blue-50 text-blue-800";
                       else btnClass += "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-gray-50";
                    }

                    return (
                      <button 
                        key={idx}
                        onClick={() => {
                            // [수정됨] 연습모드 로직 변경: 선택 시 즉시 해설 보기 활성화
                            if (!showExplanation) {
                                handleAnswerSelect(quizData[currentQuestionIdx].id, idx);
                                setShowExplanation(true); // 즉시 정답 확인
                            }
                        }}
                        disabled={showExplanation} // 해설이 보이면 버튼 비활성화 (답 변경 불가)
                        className={btnClass}
                      >
                        {option}
                        {showExplanation && isCorrect && <CheckCircle className="absolute right-4 top-4 text-green-600" size={20} />}
                        {/* 틀린 답을 골랐을 때 X 아이콘 표시 추가 */}
                        {showExplanation && isSelected && !isCorrect && <XCircle className="absolute right-4 top-4 text-red-500" size={20} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
                <button 
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded hover:bg-blue-50 transition"
                >
                  {showExplanation ? <><EyeOff size={18} /> 해설 숨기기</> : <><Eye size={18} /> 정답 및 해설 보기</>}
                </button>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (currentQuestionIdx > 0) {
                        setCurrentQuestionIdx(curr => curr - 1);
                        setShowExplanation(false);
                      }
                    }}
                    disabled={currentQuestionIdx === 0}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-600"
                  >
                    <ChevronLeft />
                  </button>
                  <button 
                    onClick={() => {
                      if (currentQuestionIdx < quizData.length - 1) {
                        setCurrentQuestionIdx(curr => curr + 1);
                        setShowExplanation(false);
                      }
                    }}
                    disabled={currentQuestionIdx === quizData.length - 1}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-600"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>

              {showExplanation && (
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mt-4 animate-fadeIn">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <AlertCircle size={18} /> 해설
                  </h4>
                  <p className="text-blue-900 leading-relaxed">
                    {quizData[currentQuestionIdx].explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {mode === 'exam' && (
            <div className="space-y-8">
              {score === null ? (
                // Exam Taking View
                <>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                    <h3 className="font-bold text-yellow-800 mb-1">시험 모드 안내</h3>
                    <p className="text-yellow-700 text-sm">총 {quizData.length}문제입니다. 모든 문제를 풀고 하단의 '제출하기' 버튼을 눌러주세요.</p>
                  </div>

                  {quizData.map((q, index) => (
                    <div key={q.id} className="border-b border-gray-100 pb-6 last:border-0">
                      <h3 className="font-medium text-lg mb-4 flex gap-2 text-gray-900">
                        <span className="text-gray-400 font-bold w-8 shrink-0">{index + 1}.</span>
                        {q.question}
                      </h3>
                      <div className="space-y-2 pl-10">
                        {q.options.map((option, oIdx) => (
                          <label key={oIdx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition">
                            <input 
                              type="radio" 
                              name={`q-${q.id}`} 
                              checked={userAnswers[q.id] === oIdx}
                              onChange={() => handleAnswerSelect(q.id, oIdx)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center pt-8 pb-10">
                    <button 
                      onClick={calculateScore}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 shadow-lg transition transform hover:-translate-y-1"
                    >
                      제출하고 결과 확인하기
                    </button>
                  </div>
                </>
              ) : (
                // Score View
                <div className="animate-fadeIn">
                  <div className="bg-white border-2 border-blue-100 rounded-xl p-8 text-center mb-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">시험 결과</h2>
                    <div className="text-5xl font-extrabold text-blue-600 mb-2">
                      {score} <span className="text-2xl text-gray-400 font-normal">/ {quizData.length}</span>
                    </div>
                    <p className="text-gray-500">
                      {score >= (quizData.length * 0.8) ? '훌륭합니다! 대부분의 내용을 이해하고 계시네요.' : 
                       score >= (quizData.length * 0.5) ? '고생하셨습니다. 틀린 문제를 다시 확인해보세요.' : 
                       '조금 더 학습이 필요해 보입니다. 연습 모드를 활용해보세요!'}
                    </p>
                    <button 
                      onClick={resetQuiz}
                      className="mt-6 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      다시 응시하기
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-6 px-2">상세 오답 노트</h3>
                  
                  <div className="space-y-6">
                    {quizData.map((q, index) => {
                        const isCorrect = userAnswers[q.id] === q.answer;
                        const userPick = userAnswers[q.id];
                        
                        return (
                          <div key={q.id} className={`p-6 rounded-lg border ${isCorrect ? 'border-gray-200 bg-white opacity-90' : 'border-red-200 bg-red-50'}`}>
                            <div className="flex gap-2 items-start mb-3">
                              {isCorrect ? <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} /> : <AlertCircle className="text-red-500 shrink-0 mt-1" size={20} />}
                              <h4 className="font-bold text-gray-800">{index + 1}. {q.question}</h4>
                            </div>
                            
                            <div className="ml-8 space-y-1 text-sm">
                              <div className="flex gap-2">
                                <span className="font-semibold w-16 text-gray-500">내가 쓴 답:</span>
                                <span className={`${isCorrect ? 'text-green-700' : 'text-red-600 line-through'}`}>
                                  {userPick !== undefined ? q.options[userPick] : '(미응답)'}
                                </span>
                              </div>
                              {!isCorrect && (
                                <div className="flex gap-2">
                                  <span className="font-semibold w-16 text-gray-500">정답:</span>
                                  <span className="text-green-700 font-medium">{q.options[q.answer]}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="ml-8 mt-4 bg-white/60 p-3 rounded text-sm text-gray-700 border border-gray-100/50">
                              <span className="font-bold text-gray-900 mr-2">[해설]</span>
                              {q.explanation}
                            </div>
                          </div>
                        );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}