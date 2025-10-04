import LightNavbar from "../../layouts/lightNavbar";
import MainLayout from "../../Layouts/mainLayout";

export default function TermsPage({ user, cartCount }) {
  return (
    <MainLayout title={`Syarat | Sanggar Nusantara`}>
      <LightNavbar user={user} cartCount={cartCount} />

      <div className="container mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen py-10 md:mt-20 mt-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Syarat
          </h1>

          {/* Section 1 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              1. Definisi
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Dalam dokumen ini, istilah "Platform" merujuk pada situs web,
              aplikasi, dan layanan digital Sanggar Nusantara. "Pengguna"
              berarti individu atau pihak yang mengakses atau menggunakan
              Platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              2. Persyaratan Umum
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Dengan menggunakan Platform, Pengguna menyatakan setuju untuk
              mematuhi seluruh aturan yang berlaku. Pengguna wajib berusia
              minimal 13 tahun atau mendapatkan izin dari orang tua/wali untuk
              menggunakan layanan ini.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              3. Pendaftaran & Akun
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Pengguna wajib memberikan informasi yang benar, akurat, dan
              terbaru saat mendaftar akun. Setiap aktivitas yang dilakukan
              melalui akun pengguna adalah tanggung jawab penuh dari pemilik
              akun.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              4. Kewajiban Pengguna
            </h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              <li>Tidak menyalahgunakan layanan untuk tujuan ilegal.</li>
              <li>
                Tidak mendistribusikan konten yang melanggar hukum atau hak
                cipta.
              </li>
              <li>
                Tidak melakukan peretasan, penyalahgunaan sistem, atau tindakan
                yang merugikan Platform.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              5. Hak & Tanggung Jawab Sanggar Nusantara
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Sanggar Nusantara berhak untuk menangguhkan atau menghentikan
              akses pengguna yang melanggar syarat. Kami juga dapat memperbarui,
              menambah, atau menghapus fitur dalam Platform tanpa pemberitahuan
              sebelumnya.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              6. Perubahan Syarat
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami berhak memperbarui syarat ini sewaktu-waktu. Perubahan akan
              diberitahukan melalui Platform, dan pengguna dianggap menyetujui
              jika tetap menggunakan layanan setelah perubahan berlaku.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              7. Hukum yang Berlaku
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Syarat ini diatur dan ditafsirkan sesuai hukum Republik Indonesia.
              Segala perselisihan akan diselesaikan melalui jalur hukum yang
              berlaku.
            </p>
          </section>

          {/* Footer */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-10 text-center">
            Terakhir diperbarui:{" "}
            {new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
