"use client";

import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../../Layouts/mainLayout";
import LightNavbar from "../../layouts/lightNavbar";

interface QuizAnswer {
  id: number;
  answer_text: string;
  selected?: number;
}

interface QuizQuestion {
  id: number;
  question_text: string;
  answers: QuizAnswer[];
}

interface Quiz {
  uuid: string;
  title: string;
  duration_minutes: number;
  is_premium: boolean;
  questions: QuizQuestion[];
}

interface Attempt {
  id: number;
  started_at: string;
}

interface Props {
  quiz: Quiz;
  attempt: Attempt;
  user: any;
  cartCount:number;
}

const Mulai: React.FC<Props> = ({ quiz, attempt, user, cartCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

  const [timeLeft, setTimeLeft] = useState(() => {
    const startedAt = new Date(attempt.started_at).getTime();
    const durationMs = quiz.duration_minutes * 60 * 1000;
    const nowMs = new Date().getTime();
    return Math.max(Math.floor((startedAt + durationMs - nowMs) / 1000), 0);
  });

  const currentQuestion = quiz.questions[currentIndex];

  // Prefill jawaban sebelumnya
  useEffect(() => {
    const prefill: { [key: number]: number } = {};
    quiz.questions.forEach((q) => {
      q.answers.forEach((a) => {
        if (a.selected) prefill[q.id] = a.selected;
      });
    });
    setAnswers(prefill);
  }, [quiz]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!user) router.visit("/masuk");
  }, [user]);

  const handleAnswer = (questionId: number, answerId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = (auto = false) => {
    const unanswered = quiz.questions.length - Object.keys(answers).length;
    if (!auto && unanswered > 0) {
      if (!confirm(`Masih ada ${unanswered} soal belum dijawab. Kirim sekarang?`)) return;
    }

    router.post(`/kuis-nusantara/submit/${quiz.uuid}`, { answers });
  };

  const handleTimeUp = () => {
    alert("Waktu habis! Jawaban dikirim otomatis.");
    handleSubmit(true);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const progressPercent = Math.round(
    (Object.keys(answers).length / quiz.questions.length) * 100
  );

  return (
    <MainLayout title={`${quiz.title} | Sanggar Nusantara`}>
      <LightNavbar user={user} cartCount={cartCount} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 lg:py-0 py-20 px-4 lg:pt-30 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-2 md:mt-0">
              <Clock className="w-5 h-5" />
              <span className={`text-lg font-mono ${timeLeft <= 60 ? "text-red-500 animate-pulse" : ""}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-6">
            <motion.div
              className="h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
              style={{ width: `${progressPercent}%` }}
              layout
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Layout dua kolom */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Soal & jawaban kiri */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6"
                >
                  <h2 className="text-lg font-semibold mb-3">
                    Soal {currentIndex + 1} dari {quiz.questions.length}
                  </h2>
                  <p className="text-base mb-6 leading-relaxed">{currentQuestion.question_text}</p>

                  <div className="space-y-3">
                    {currentQuestion.answers.map((a) => (
                      <label
                        key={a.id}
                        className={`flex items-center gap-3 p-3 border rounded-lg transition
                          ${answers[currentQuestion.id] === a.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                            : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/40 cursor-pointer"
                          }`}
                      >
                        <input
                          type="radio"
                          name={`q-${currentQuestion.id}`}
                          checked={answers[currentQuestion.id] === a.id}
                          onChange={() => handleAnswer(currentQuestion.id, a.id)}
                          className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span>{a.answer_text}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((i) => i - 1)}
                      className="px-6 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold disabled:opacity-50 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                      Sebelumnya
                    </button>

                    {currentIndex === quiz.questions.length - 1 ? (
                      <button
                        onClick={() => handleSubmit()}
                        className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold cursor-pointer hover:bg-red-700"
                      >
                        Selesai & Kirim
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentIndex((i) => i + 1)}
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold cursor-pointer hover:bg-blue-700"
                      >
                        Selanjutnya
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nomor soal kanan */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Nomor Soal</h2>
                <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-3 gap-3">
                  {quiz.questions.map((q, idx) => {
                    const answered = answers[q.id] !== undefined;
                    const active = currentIndex === idx;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        title={answered ? `Sudah dijawab` : `Belum dijawab`}
                        className={`w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center transition cursor-pointer
                          ${active
                            ? "bg-blue-600 text-white"
                            : answered
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          } hover:scale-105`}
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

export default Mulai;
