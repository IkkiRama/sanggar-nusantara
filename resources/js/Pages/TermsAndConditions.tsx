import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";

export default function TermsAndConditions({user, cartCount}) {
    return (
        <MainLayout title={`Syarat dan Ketentuan | Sanggar Nusantara`} >

            <LightNavbar user={user} cartCount={cartCount} />

            <div className="container mx-auto bg-gray-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Syarat & Ketentuan</h1>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Penerimaan Syarat</h2>
                    <p className="text-gray-600 leading-relaxed">
                    Dengan mengakses dan menggunakan platform ini, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan yang berlaku. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak melanjutkan penggunaan layanan kami.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">2. Penggunaan Layanan</h2>
                    <p className="text-gray-600 leading-relaxed">
                    Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku. Segala bentuk penyalahgunaan atau pelanggaran terhadap sistem, data, atau konten akan ditindak sesuai hukum.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Akun Pengguna</h2>
                    <p className="text-gray-600 leading-relaxed">
                    Anda bertanggung jawab atas keamanan akun Anda, termasuk menjaga kerahasiaan kata sandi. Segala aktivitas yang terjadi di dalam akun Anda menjadi tanggung jawab pribadi Anda.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Hak Cipta & Konten</h2>
                    <p className="text-gray-600 leading-relaxed">
                    Seluruh konten dalam platform ini termasuk teks, gambar, logo, dan elemen desain lainnya merupakan milik kami atau pihak ketiga yang bekerja sama dan dilindungi oleh undang-undang hak cipta. Dilarang keras menduplikasi atau mendistribusikan konten tanpa izin tertulis.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Perubahan Syarat & Ketentuan</h2>
                    <p className="text-gray-600 leading-relaxed">
                    Kami berhak untuk mengubah atau memperbarui syarat dan ketentuan ini kapan saja tanpa pemberitahuan terlebih dahulu. Disarankan untuk meninjau halaman ini secara berkala.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">6. Kontak</h2>
                    <p className="text-gray-600 leading-relaxed">
                    Jika Anda memiliki pertanyaan terkait syarat dan ketentuan ini, silakan hubungi kami melalui email di <a href="mailto:support@sanggarnusantara.com" className="text-blue-600 underline">support@sanggarnusantara.com</a>.
                    </p>
                </section>

                <p className="text-sm text-gray-500 mt-10 text-center">
                    Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                </div>
            </div>
        </MainLayout>
    );
  }
