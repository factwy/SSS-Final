import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle, XCircle, AlertCircle, 
  ChevronRight, ChevronLeft, RotateCcw, 
  Award, FileText, Filter
} from 'lucide-react';

export default function MockExamTemplate({ quizData, title, subtitle }) {
  const [mode, setMode] = useState('landing'); // landing, exam, result
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showOnlyWrong, setShowOnlyWrong] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setScore(null);
    setShowOnlyWrong(false);
    setReviewIdx(0);
  };

  const startExam = () => {
    resetQuiz();
    setMode('exam');
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
    setMode('result');
  };

  const goToNextQuestion = () => {
    if (currentQuestionIdx < quizData.length - 1) {
      setCurrentQuestionIdx(curr => curr + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(curr => curr - 1);
    }
  };

  // 틀린 문제 목록
  const getWrongQuestions = () => {
    return quizData.filter(q => userAnswers[q.id] !== q.answer);
  };

  // 리뷰할 문제 목록 (전체 또는 틀린 문제만)
  const getReviewQuestions = () => {
    return showOnlyWrong ? getWrongQuestions() : quizData;
  };

  // 데이터가 없을 경우 에러 방지
  if (!quizData || quizData.length === 0) {
    return <div className="p-10 text-center text-gray-800 bg-white">데이터를 불러오는 중이거나 데이터가 없습니다.</div>;
  }

  const currentQuestion = quizData[currentQuestionIdx];
  const answeredCount = Object.keys(userAnswers).length;
  const wrongCount = getWrongQuestions().length;
  const reviewQuestions = getReviewQuestions();

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-900 antialiased">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden min-h-[600px] flex flex-col border border-gray-200">
        
        {/* Header */}
        <header className="bg-emerald-600 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText size={28} />
              {title || "모의고사"}
            </h1>
            <p className="text-emerald-100 text-sm mt-1">{subtitle || "실전처럼 문제를 풀어보세요."}</p>
          </div>
          {mode !== 'landing' && (
            <button 
              onClick={() => setMode('landing')}
              className="text-sm bg-emerald-700 hover:bg-emerald-800 px-3 py-1 rounded flex items-center gap-1 transition text-white"
            >
              <RotateCcw size={16} /> 처음으로
            </button>
          )}
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          
          {/* Landing Page */}
          {mode === 'landing' && (
            <div className="flex flex-col items-center justify-center h-full gap-8 py-10">
              <div className="text-center space-y-2">
                <div className="bg-emerald-100 p-6 rounded-full mb-4 inline-block">
                  <Award className="text-emerald-600" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">모의고사</h2>
                <p className="text-gray-500">총 {quizData.length}문항</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl max-w-md w-full space-y-4">
                <h3 className="font-bold text-gray-700 text-center">시험 안내</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>한 문제씩 순서대로 풀어갑니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>이전/다음 버튼으로 문제를 이동할 수 있습니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>모든 문제를 푼 후 제출하면 점수를 확인할 수 있습니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>결과 화면에서 틀린 문제만 따로 확인할 수 있습니다.</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={startExam}
                className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg transition transform hover:-translate-y-1"
              >
                시험 시작하기
              </button>
            </div>
          )}

          {/* Exam Mode - One question at a time */}
          {mode === 'exam' && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>문제 {currentQuestionIdx + 1} / {quizData.length}</span>
                  <span>응답: {answeredCount} / {quizData.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / quizData.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Number Indicators */}
              <div className="flex flex-wrap gap-2 mb-6">
                {quizData.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentQuestionIdx;
                  
                  let btnClass = "w-8 h-8 rounded-full text-xs font-bold transition ";
                  if (isCurrent) {
                    btnClass += "bg-emerald-600 text-white ring-2 ring-emerald-300";
                  } else if (isAnswered) {
                    btnClass += "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
                  } else {
                    btnClass += "bg-gray-100 text-gray-500 hover:bg-gray-200";
                  }
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={btnClass}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Category Tag */}
              {currentQuestion.category && (
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm text-gray-600">
                  {currentQuestion.category}
                </span>
              )}

              {/* Question */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold leading-relaxed text-black">
                  {currentQuestionIdx + 1}. {currentQuestion.question}
                </h3>
                
                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = userAnswers[currentQuestion.id] === idx;
                    
                    let btnClass = "w-full text-left p-4 rounded-lg border-2 transition font-medium ";
                    if (isSelected) {
                      btnClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
                    } else {
                      btnClass += "border-gray-200 bg-gray-50 text-black hover:bg-gray-100 hover:border-gray-300";
                    }

                    return (
                      <button 
                        key={idx}
                        onClick={() => handleAnswerSelect(currentQuestion.id, idx)}
                        className={btnClass}
                      >
                        <span className="font-bold text-gray-400 mr-3">{String.fromCharCode(65 + idx)}.</span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
                <button 
                  onClick={goToPrevQuestion}
                  disabled={currentQuestionIdx === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 font-medium transition"
                >
                  <ChevronLeft size={20} /> 이전
                </button>

                {currentQuestionIdx === quizData.length - 1 ? (
                  <button 
                    onClick={calculateScore}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 shadow transition"
                  >
                    제출하기
                  </button>
                ) : (
                  <button 
                    onClick={goToNextQuestion}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                  >
                    다음 <ChevronRight size={20} />
                  </button>
                )}
              </div>

              {/* Unanswered Warning */}
              {currentQuestionIdx === quizData.length - 1 && answeredCount < quizData.length && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4">
                  <p className="text-yellow-800 text-sm flex items-center gap-2">
                    <AlertCircle size={18} />
                    아직 {quizData.length - answeredCount}문제를 풀지 않았습니다. 위의 번호를 클릭하여 이동할 수 있습니다.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Result Mode */}
          {mode === 'result' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Score Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-100 rounded-xl p-8 text-center shadow-sm">
                <div className="bg-emerald-100 p-4 rounded-full inline-block mb-4">
                  <Award className="text-emerald-600" size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">시험 결과</h2>
                <div className="text-5xl font-extrabold text-emerald-600 mb-2">
                  {score} <span className="text-2xl text-gray-400 font-normal">/ {quizData.length}</span>
                </div>
                <div className="text-3xl font-bold text-gray-700 mb-4">
                  {Math.round((score / quizData.length) * 100)}점
                </div>
                <p className="text-gray-500">
                  {score === quizData.length ? '🎉 만점입니다! 완벽해요!' : 
                   score >= (quizData.length * 0.8) ? '훌륭합니다! 대부분의 내용을 이해하고 계시네요.' : 
                   score >= (quizData.length * 0.5) ? '고생하셨습니다. 틀린 문제를 다시 확인해보세요.' : 
                   '조금 더 학습이 필요해 보입니다. 복습 후 다시 도전해보세요!'}
                </p>
                
                <div className="flex justify-center gap-4 mt-6">
                  <button 
                    onClick={startExam}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
                  >
                    다시 응시하기
                  </button>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-100">
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-green-700">맞은 문제</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center border border-red-100">
                  <div className="text-2xl font-bold text-red-600">{wrongCount}</div>
                  <div className="text-sm text-red-700">틀린 문제</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
                  <div className="text-2xl font-bold text-gray-600">{quizData.length - answeredCount}</div>
                  <div className="text-sm text-gray-700">미응답</div>
                </div>
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <span className="font-medium text-gray-700">문제 리뷰</span>
                <button
                  onClick={() => {
                    setShowOnlyWrong(!showOnlyWrong);
                    setReviewIdx(0);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    showOnlyWrong 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Filter size={16} />
                  {showOnlyWrong ? `틀린 문제만 (${wrongCount})` : '전체 문제'}
                </button>
              </div>

              {/* Review Questions */}
              {reviewQuestions.length > 0 ? (
                <div className="space-y-4">
                  {/* Review Navigation */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {reviewIdx + 1} / {reviewQuestions.length}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setReviewIdx(Math.max(0, reviewIdx - 1))}
                        disabled={reviewIdx === 0}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-600"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        onClick={() => setReviewIdx(Math.min(reviewQuestions.length - 1, reviewIdx + 1))}
                        disabled={reviewIdx === reviewQuestions.length - 1}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-600"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>

                  {/* Current Review Question */}
                  {(() => {
                    const q = reviewQuestions[reviewIdx];
                    const isCorrect = userAnswers[q.id] === q.answer;
                    const userPick = userAnswers[q.id];
                    const originalIdx = quizData.findIndex(orig => orig.id === q.id);

                    return (
                      <div className={`p-6 rounded-lg border-2 ${isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
                        {/* Question Header */}
                        <div className="flex items-start gap-3 mb-4">
                          {isCorrect ? (
                            <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
                          ) : (
                            <XCircle className="text-red-500 shrink-0 mt-1" size={24} />
                          )}
                          <div>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {isCorrect ? '정답' : '오답'}
                            </span>
                            {q.category && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded ml-2">
                                {q.category}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question Text */}
                        <h4 className="font-bold text-black text-lg mb-4">
                          {originalIdx + 1}. {q.question}
                        </h4>

                        {/* Options with Results */}
                        <div className="space-y-2 mb-6">
                          {q.options.map((option, idx) => {
                            const isThisCorrect = q.answer === idx;
                            const isThisSelected = userPick === idx;
                            
                            let optClass = "w-full text-left p-3 rounded-lg border transition text-sm ";
                            if (isThisCorrect) {
                              optClass += "border-green-500 bg-green-50 text-green-900";
                            } else if (isThisSelected && !isThisCorrect) {
                              optClass += "border-red-500 bg-red-50 text-red-900 line-through";
                            } else {
                              optClass += "border-gray-200 bg-white text-gray-500";
                            }

                            return (
                              <div key={idx} className={optClass}>
                                <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                                {option}
                                {isThisCorrect && <CheckCircle className="inline ml-2 text-green-600" size={16} />}
                                {isThisSelected && !isThisCorrect && <XCircle className="inline ml-2 text-red-500" size={16} />}
                              </div>
                            );
                          })}
                        </div>

                        {/* Answer Summary */}
                        <div className="bg-white/80 p-4 rounded-lg border border-gray-200 mb-4 space-y-2 text-sm">
                          <div className="flex gap-2">
                            <span className="font-semibold w-20 text-gray-500">내 답:</span>
                            <span className={isCorrect ? 'text-green-700 font-medium' : 'text-red-600'}>
                              {userPick !== undefined ? `${String.fromCharCode(65 + userPick)}. ${q.options[userPick]}` : '(미응답)'}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="flex gap-2">
                              <span className="font-semibold w-20 text-gray-500">정답:</span>
                              <span className="text-green-700 font-medium">
                                {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Explanation */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h5 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                            <AlertCircle size={16} /> 해설
                          </h5>
                          <p className="text-blue-900 text-sm leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Quick Jump to Questions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500 mr-2 py-1">바로가기:</span>
                    {reviewQuestions.map((q, idx) => {
                      const isCorrect = userAnswers[q.id] === q.answer;
                      const isCurrent = idx === reviewIdx;
                      
                      return (
                        <button
                          key={q.id}
                          onClick={() => setReviewIdx(idx)}
                          className={`w-8 h-8 rounded-full text-xs font-bold transition ${
                            isCurrent 
                              ? 'ring-2 ring-offset-1 ' + (isCorrect ? 'bg-green-500 text-white ring-green-300' : 'bg-red-500 text-white ring-red-300')
                              : isCorrect 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {quizData.findIndex(orig => orig.id === q.id) + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
                  <p className="text-lg font-medium text-green-700">모든 문제를 맞혔습니다!</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}