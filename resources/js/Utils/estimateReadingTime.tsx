export const estimateReadingTime = (content) => {
  const words = content.split(/\s+/).length; // Menghitung jumlah kata
  const readingSpeed = 200; // Kecepatan membaca rata-rata (kata per menit)
  const timeInMinutes = Math.ceil(words / readingSpeed); // Estimasi waktu baca
  return timeInMinutes;
};
