import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import LightNavbar from '../../layouts/lightNavbar';
import UserProfile from '../../Components/userProfile';
import ProfileLayout from '../../Layouts/profileLayout';

export default function EditProfile({ user, cartCount, role }) {
    const fileInputRef = useRef();
  const [nama, setNama] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [komen, setKomen] = useState(user.deskripsi || '');
  const [image, setImage] = useState(null);
  const [alamat, setAlamat] = useState(user.alamat?.alamat || '');
  const [kodepos, setKodepos] = useState(user.alamat?.kode_pos || '');
  const [loading, setLoading] = useState(false);

  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [desaList, setDesaList] = useState([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState('');
  const [selectedKabupaten, setSelectedKabupaten] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [selectedDesa, setSelectedDesa] = useState('');


  const [provinsiName, setProvinsiName] = useState('');
  const [kabupatenName, setKabupatenName] = useState('');
  const [kecamatanName, setKecamatanName] = useState('');
  const [desaName, setDesaName] = useState('');


  useEffect(() => {
    if (user.alamat) {
      setSelectedProvinsi(user.alamat.provinsi || '');
      setSelectedKabupaten(user.alamat.kabupaten || '');
      setSelectedKecamatan(user.alamat.kecamatan || '');
      setSelectedDesa(user.alamat.desa || '');
    }
  }, [user]);

  useEffect(() => {
    if (user.alamat && provinsiList.length > 0) {
      const prov = provinsiList.find(p => p.id === user.alamat.provinsi || p.name === user.alamat.provinsi);
      setSelectedProvinsi(prov?.id || '');
    }
  }, [user, provinsiList]);

  useEffect(() => {
    if (selectedProvinsi && kabupatenList.length > 0) {
      const kab = kabupatenList.find(k => k.id === user.alamat.kabupaten || k.name === user.alamat.kabupaten);
      setSelectedKabupaten(kab?.id || '');
    }
  }, [kabupatenList]);

  useEffect(() => {
    if (selectedKabupaten && kecamatanList.length > 0) {
      const kec = kecamatanList.find(k => k.id === user.alamat.kecamatan || k.name === user.alamat.kecamatan);
      setSelectedKecamatan(kec?.id || '');
    }
  }, [kecamatanList]);

  useEffect(() => {
    if (selectedKecamatan && desaList.length > 0) {
      const des = desaList.find(k => k.id === user.alamat.desa || k.name === user.alamat.desa);
      setSelectedDesa(des?.id || '');
    }
  }, [desaList]);

  useEffect(() => {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(res => res.json())
      .then(data => setProvinsiList(data));
  }, []);

  useEffect(() => {
    if (selectedProvinsi) {
      const selected = provinsiList.find(p => p.id === selectedProvinsi);
      setProvinsiName(selected?.name || '');
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsi}.json`)
        .then(res => res.json())
        .then(data => setKabupatenList(data));
    }
  }, [selectedProvinsi]);

  useEffect(() => {
    if (selectedKabupaten) {
      const selected = kabupatenList.find(k => k.id === selectedKabupaten);
      setKabupatenName(selected?.name || '');
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKabupaten}.json`)
        .then(res => res.json())
        .then(data => setKecamatanList(data));
    }
  }, [selectedKabupaten]);

  useEffect(() => {
    if (selectedKecamatan) {
      const selected = kecamatanList.find(k => k.id === selectedKecamatan);
      setKecamatanName(selected?.name || '');
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedKecamatan}.json`) // Fetch untuk desa
        .then(res => res.json())
        .then(data => setDesaList(data));
    }
  }, [selectedKecamatan]);

  useEffect(() => {
    const selected = desaList.find(d => d.id === selectedDesa);
    setDesaName(selected?.name || '');
  }, [selectedDesa]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', nama);
    formData.append('email', email);
    formData.append('deskripsi', komen);
    formData.append('alamat', alamat);
    formData.append('provinsi', provinsiName);
    formData.append('kabupaten', kabupatenName);
    formData.append('kecamatan', kecamatanName);
    formData.append('desa', desaName);
    formData.append('kode_pos', kodepos);
    if (image) formData.append('image', image);

    router.post('/api/profile/update', formData, {
        forceFormData: true,
        onFinish: () => setLoading(false),
        onSuccess: () => router.visit('/profile/edit')
    });
  };

  return (
    <ProfileLayout title={`Edit Profile ${user.name} | Sanggar Nusantara`}>
      <LightNavbar user={user} cartCount={cartCount} />
      <div className="bg-blue-500 h-[30vh]"></div>

      <div className="lg:-mt-[10vh] -mt-[30vh] pb-20 px-4 min-h-screen">
        <div className="flex flex-wrap gap-5 lg:flex-nowrap container mx-auto">
          <UserProfile isActive="edit" user={user} role={role} />

          <div className="p-5 md:mt-0 mt-40 relative overflow-x-auto bg-white shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-xl w-full lg:w-[75%]">
            <form
              className="bg-white/70 dark:bg-gray-800 p-5 rounded-lg"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* Preview & Upload Image */}
              <div className="w-full flex items-center mb-6">
                <div className="w-full flex items-center gap-6">
                    {/* Gambar Profil */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                        Foto Profil <span className="text-red-600" >*</span>
                        </label>
                        <img
                          src={image ? URL.createObjectURL(image) : `/storage/${user.image}`}
                          alt="User Profile"
                          className="w-32 h-32 object-cover rounded-full"
                          onError={e => (e.currentTarget.src = "/images/NO IMAGE AVAILABLE.jpg")}
                        />
                    </div>

                    {/* Tombol untuk unggah foto */}
                    <div className="mt-6">
                        <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        >
                        Unggah Foto
                        </button>
                        <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="hidden"
                        />
                    </div>
                </div>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Nama */}
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama <span className="text-red-600" >*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    readOnly
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email Anda"
                    className="w-full p-3 border rounded-lg border-gray-300 bg-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Provinsi */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                  <select
                    className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    value={selectedProvinsi}
                    onChange={(e) => {
                      setSelectedProvinsi(e.target.value);
                      setKabupatenList([]);
                      setKecamatanList([]);
                      setSelectedKabupaten('');
                      setSelectedKecamatan('');
                    }}
                  >
                    <option value="">-- Pilih Provinsi --</option>
                    {provinsiList.map((prov) => (
                      <option key={prov.id} value={prov.id}>{prov.name}</option>
                    ))}
                  </select>
                </div>

                {/* Kabupaten */}
                {kabupatenList.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kabupaten</label>
                    <select
                      className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      value={selectedKabupaten}
                      onChange={(e) => {
                        setSelectedKabupaten(e.target.value);
                        setKecamatanList([]);
                        setSelectedKecamatan('');
                      }}
                    >
                      <option value="">-- Pilih Kabupaten --</option>
                      {kabupatenList.map((kab) => (
                        <option key={kab.id} value={kab.id}>{kab.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Kecamatan */}
                {kecamatanList.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
                    <select
                      className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      value={selectedKecamatan}
                      onChange={(e) => setSelectedKecamatan(e.target.value)}
                    >
                      <option value="">-- Pilih Kecamatan --</option>
                      {kecamatanList.map((kec) => (
                        <option key={kec.id} value={kec.id}>{kec.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Desa */}
                {desaList.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Desa</label>
                    <select
                      className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      value={selectedDesa}
                      onChange={(e) => setSelectedDesa(e.target.value)}
                    >
                      <option value="">-- Pilih Desa --</option>
                      {desaList.map((desa) => (
                        <option key={desa.id} value={desa.id}>{desa.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Alamat */}
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
                  <input
                    type="number"
                    id="kodepos"
                    value={kodepos}
                    onChange={(e) => setKodepos(e.target.value)}
                    placeholder="53371"
                    className="w-full p-3 border rounded-lg border-gray-300"
                  />
                </div>

                {/* Alamat */}
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                  <input
                    type="text"
                    id="alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    placeholder="Jl. Raya Kenanga No 1"
                    className="w-full p-3 border rounded-lg border-gray-300"
                  />
                </div>
              </div>

              {/* Deskripsi */}
              <div className="mb-4">
                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  value={komen}
                  onChange={(e) => setKomen(e.target.value)}
                  rows={4}
                  placeholder="Tulis sesuatu tentang Anda..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                {loading ? 'Menyimpan...' : 'Simpan Profil'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
