/**
 * Memformat angka menjadi string format Rupiah.
 * Contoh: 3000 -> Rp 3.000
 */
export default function formatRupiah(angka) {
    if (typeof angka !== 'number') return angka;

    const str = angka.toString();
    let hasil = '';
    let counter = 0;

    // Loop dari belakang
    for (let i = str.length - 1; i >= 0; i--) {
      hasil = str[i] + hasil;
      counter++;

      // Tambahkan titik setiap 3 digit, kecuali jika di awal
      if (counter % 3 === 0 && i !== 0) {
        hasil = '.' + hasil;
      }
    }

    return `Rp ${hasil}`;
  }
