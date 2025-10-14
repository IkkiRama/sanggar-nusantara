"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../../Layouts/mainLayout";
import LightNavbar from "../../layouts/lightNavbar";

interface QuizAnswer {
  id: number;
  answer_text: string;
  is_correct: boolean;
  selected_by_user?: boolean;
  answer_explanation?: string;
}

interface QuizQuestion {
  id: number;
  question_text: string;
  answers: QuizAnswer[];
  explanation_correct?: string;
}

interface Quiz {
  uuid: string;
  title: string;
  duration_minutes: number;
  questions: QuizQuestion[];
}

interface Attempt {
  id: number;
  started_at: string;
  finished_at: string;
  score?: number;
  recomendation?: string;
}

interface Props {
  quiz: Quiz;
  attempt: Attempt;
  user: any;
}

const LihatAttempt: React.FC<Props> = ({ quiz, attempt, user }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quiz.questions[currentIndex];

  const totalQuestions = quiz.questions.length;

  const progressPercent = Math.round(
    (quiz.questions.filter((q) => q.answers.some((a) => a.selected_by_user)).length /
      totalQuestions) *
      100
  );

  const renderAnswer = (a: QuizAnswer) => {
    const selected = a.selected_by_user;
    const correct = a.is_correct;

    let bgClass = "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    let borderClass = "border-gray-300 dark:border-gray-700";

    // if (selected && correct) {
    //   bgClass = "bg-green-500 text-white";
    //   borderClass = "border-green-700";
    // } else if (selected && !correct) {
    //   bgClass = "bg-red-500 text-white";
    //   borderClass = "border-red-700";
    // }



    if (selected && correct) {
      bgClass = "bg-green-500 text-white";
      borderClass = "border-green-700";
    } else if (selected && !correct) {
      bgClass = "bg-red-500 text-white";
      borderClass = "border-red-700";
    } else if (!selected && correct) {
      bgClass = "bg-green-500 text-white";
      borderClass = "border-green-700";
    }

    return (
      <div
        key={a.id}
        className={`p-3 rounded-lg border ${borderClass} ${bgClass} mb-2 relative`}
      >
        {a.answer_text}
        {selected && <span className="absolute top-1 right-2 text-xs font-semibold">Pilihanmu</span>}

        {/* Penjelasan */}
        {selected && a.answer_explanation && (
          <p className="mt-2 text-sm text-white">
            Penjelasan jawabanmu: {a.answer_explanation}
          </p>
        )}

        {!selected && correct && !selected && (
          <p className="mt-2 text-sm text-white">Jawaban benar: {a.answer_explanation}</p>
        )}
      </div>
    );
  };

  return (
    <MainLayout title={`Lihat Attempt | ${quiz.title}`}>
      <LightNavbar user={user} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header: Judul, Score, Recommendation */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
            <div>
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Score: <span className="font-semibold">{attempt.score ?? 0}%</span>
              </p>
              {attempt.recomendation && (
                <p className="mt-1 italic text-sm text-gray-800 dark:text-gray-200">
                  Rekomendasi: {attempt.recomendation}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Mulai: {attempt.started_at} | Selesai: {attempt.finished_at}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-6">
            <motion.div
              className="h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
              style={{ width: `${progressPercent}%` }}
              layout
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Soal & jawaban */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-3">
                  Soal {currentIndex + 1} dari {totalQuestions}
                </h2>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-base mb-6 leading-relaxed">{currentQuestion.question_text}</p>
                    <div className="space-y-3">
                      {currentQuestion.answers.map(renderAnswer)}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((i) => i - 1)}
                    className="px-6 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold disabled:opacity-50 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    Sebelumnya
                  </button>
                  <button
                    disabled={currentIndex === totalQuestions - 1}
                    onClick={() => setCurrentIndex((i) => i + 1)}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold cursor-pointer hover:bg-blue-700"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>

            {/* Nomor soal kanan */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Nomor Soal</h2>
                <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-3 gap-3">
                  {quiz.questions.map((q, idx) => {
                    const userAnswered = q.answers.some((a) => a.selected_by_user);
                    const correctAnswered = q.answers.some(
                      (a) => a.selected_by_user && a.is_correct
                    );
                    const active = currentIndex === idx;

                    let bgClass =
                      "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
                    if (active) bgClass = "bg-blue-600 text-white";
                    else if (correctAnswered) bgClass = "bg-green-500 text-white";
                    else if (userAnswered && !correctAnswered) bgClass = "bg-red-500 text-white";

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        title={
                          userAnswered
                            ? correctAnswered
                              ? "Jawaban benar"
                              : "Jawaban salah"
                            : "Belum dijawab"
                        }
                        className={`w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center transition cursor-pointer hover:scale-105 ${bgClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LihatAttempt;
