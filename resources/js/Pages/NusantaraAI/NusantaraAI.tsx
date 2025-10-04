import React, { useState, useRef, useEffect } from "react";
import MainLayout from "../../Layouts/mainLayout";
import LightNavbar from "../../layouts/lightNavbar";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { marked } from "marked";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface NusantaraAIProps {
  user: any;
  cartCount: number;
}

const NusantaraAI: React.FC<NusantaraAIProps> = ({ user, cartCount }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const isLongInput = inputValue.length >= 60;

  // Scroll ke bawah otomatis saat ada pesan baru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Resize textarea otomatis
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "40px";
      if (inputValue.trim().length > 0) {
        inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      }
    }
  }, [inputValue]);

  // Request ke RapidAPI GPT
  const askAI = async (question: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-key": import.meta.env.VITE_RAPID_API_GPT_KEY,
            "x-rapidapi-host": import.meta.env.VITE_RAPID_API_GPT_HOST,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: question }],
            web_access: false,
          }),
        }
      );
      const data = await response.json();

      const answer = data.result || "⚠️ Terjadi kesalahan dalam mengambil jawaban.";

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: answer },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Terjadi kesalahan." },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    const handleSubmit = async () => {
        if (!inputValue.trim()) return;

        if (!hasAsked) setHasAsked(true);

        const question = inputValue;
        setMessages((prev) => [...prev, { role: "user", text: question }]);
        setInputValue("");

        let detailPercakapan: string;

        if (messages.length === 0) {
                // Pertanyaan pertama, tidak ada konteks sebelumnya
                detailPercakapan = `
                    Kamu adalah ahli sejarah dan budaya Nusantara.
                    Jawab pertanyaan berikut dengan lengkap dan berbobot, menggunakan bahasa yang mudah dipahami:

                    User: ${question}
                    AI:
                `;
        } else {
            // Ada percakapan sebelumnya, sertakan konteks
            const conversationContext = messages
            .map((msg) => {
                const roleLabel = msg.role === "user" ? "User" : "AI";
                return `${roleLabel}: ${msg.text}`;
            })
            .join("\n");

            detailPercakapan = `
                Kamu adalah ahli sejarah dan budaya Nusantara.
                Jawab pertanyaan berikut dengan lengkap dan berbobot, menggunakan bahasa yang mudah dipahami.
                Gunakan konteks percakapan sebelumnya jika relevan:

                ${conversationContext}
                User: ${question}
                AI:
            `;
        }

        await askAI(detailPercakapan);
    };



  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const suggestions = [
    { title: "Eksplorasi Tradisi", desc: "Pelajari berbagai tradisi dari seluruh nusantara.", question: "Apa saja tradisi yang ada di Nusantara?" },
    { title: "Seni & Budaya", desc: "Kenali ragam seni, tari, dan musik daerah.", question: "Apa contoh seni budaya khas Jawa Barat?" },
    { title: "Kuliner Nusantara", desc: "Jelajahi kekayaan kuliner Indonesia.", question: "Apa makanan tradisional khas Sumatera Barat?" },
  ];

  // ----- Jika user belum login -----
  if (!user) {
    return (
      <MainLayout title="Login Diperlukan | Sanggar Nusantara">
        <LightNavbar user={user} cartCount={cartCount} />
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Login Diperlukan</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Untuk mengakses halaman ini, Anda perlu masuk terlebih dahulu.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/" className="px-4 py-2 border border-gray-300 text-gray-500 font-semibold dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Kembali ke Beranda</Link>
              <Link href="/masuk" className="px-4 py-2 bg-red-500 font-semibold text-white rounded-md hover:bg-red-600">Login Sekarang</Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ----- Render UI -----
  return (
    <MainLayout title={`Nusantara AI | Sanggar Nusantara`}>
      <LightNavbar user={user} cartCount={cartCount} />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen md:mt-30 mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl font-bold text-gray-800 dark:text-white">Nusantara AI</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-2 text-gray-600 dark:text-gray-300">
              Jelajahi budaya Indonesia melalui kecerdasan buatan.
            </motion.p>
          </div>

          {/* Cards */}
          {!hasAsked && (
            <div className="grid md:grid-cols-3 gap-6 pb-[100vh]">
              {suggestions.map((item, i) => (
                <motion.button key={i} whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }} whileTap={{ scale: 0.95 }} onClick={() => handleSuggestionClick(item.question)} className="text-left bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </motion.button>
              ))}
            </div>
          )}

          {/* Chat Bubbles */}
          <div className="space-y-4 mb-20">
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: "easeOut" }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-lg max-w-[75%] shadow ${msg.role === "user" ? "bg-red-500 text-white rounded-br-none" : "bg-gray-200 dark:bg-gray-700 dark:text-white rounded-bl-none"}`}>
                  {msg.role === "ai" ? (
                        <div
                            className="prose max-w-full dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: marked(msg.text) }}
                        />
                  ) : (
                    msg.text
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">Mengetik...</div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Sticky Input */}
          <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-3 mt-10">
            <div className="relative max-w-3xl mx-auto" style={{ paddingBottom: isLongInput ? "60px" : "0px" }}>
              <textarea ref={inputRef} value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Tanya tentang kebudayaan Nusantara..." rows={1} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-red-400 focus:outline-none resize-none rounded-md transition-all duration-300 ease-in-out overflow-hidden" style={{ minHeight: "40px", maxHeight: "160px" }} />

              <motion.button key={isLongInput ? "long" : "short"} onClick={handleSubmit} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="absolute bg-red-500 text-white font-semibold px-4 py-2 hover:bg-red-600 rounded-md shadow-md flex items-center justify-center" style={{ top: isLongInput ? "auto" : "3px", right: isLongInput ? "auto" : "8px", left: isLongInput ? "8px" : "auto", bottom: isLongInput ? "0" : "10px" }}>Kirim</motion.button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NusantaraAI;
