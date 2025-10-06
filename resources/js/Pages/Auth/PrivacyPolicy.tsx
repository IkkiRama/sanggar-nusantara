import LightNavbar from "../../layouts/lightNavbar";
import MainLayout from "../../Layouts/mainLayout";

export default function PrivacyPolicy({ user, cartCount }) {
  return (
    <MainLayout title={`Kebijakan Privasi | Sanggar Nusantara`}>
      <LightNavbar user={user} cartCount={cartCount} />

      <div className="container mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen py-10 md:mt-20 mt-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Kebijakan Privasi
          </h1>

          {/* Section 1 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami dapat mengumpulkan informasi pribadi seperti nama, alamat
              email, nomor telepon, serta data aktivitas penggunaan platform
              untuk meningkatkan layanan Sanggar Nusantara.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              2. Penggunaan Informasi
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Informasi yang dikumpulkan digunakan untuk:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              <li>Menyediakan layanan dan fitur sesuai kebutuhan pengguna.</li>
              <li>
                Mengirimkan informasi terkait event, promosi, atau pembaruan.
              </li>
              <li>Meningkatkan keamanan dan kenyamanan penggunaan platform.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              3. Perlindungan Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami menerapkan langkah-langkah keamanan yang wajar untuk
              melindungi data pengguna dari akses, perubahan, atau pengungkapan
              yang tidak sah. Namun, kami tidak dapat menjamin keamanan absolut
              di internet.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              4. Berbagi Informasi
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami tidak akan menjual atau menyewakan data pribadi pengguna.
              Informasi dapat dibagikan hanya kepada pihak ketiga terpercaya
              untuk keperluan operasional layanan atau jika diwajibkan oleh
              hukum.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              5. Hak Pengguna
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Pengguna memiliki hak untuk mengakses, memperbarui, atau meminta
              penghapusan data pribadi mereka. Permintaan dapat diajukan melalui
              kontak resmi Sanggar Nusantara.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              6. Perubahan Kebijakan Privasi
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.
              Perubahan akan diumumkan melalui Platform, dan berlaku segera
              setelah dipublikasikan.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              7. Kontak
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini,
              silakan hubungi kami melalui email di{" "}
              <a
                href="mailto:support@sanggarnusantara.com"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                support@sanggarnusantara.com
              </a>
              .
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
