import React, { useState } from 'react';
import ProfileLayout from '../../Layouts/profileLayout';
import LightNavbar from '../../layouts/lightNavbar';
import UserProfile from '../../Components/userProfile';
import axios from 'axios';

const UbahPassword = ({ user, cartCount, role }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/updatePassword', {
                new_password: newPassword,
                confirm_password: confirmPassword,
            });
            setSuccess(response.data.message);
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                window.location.href = '/admin/login';
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Terjadi kesalahan');
        }
    };

    return (
        <ProfileLayout>
            <LightNavbar user={user} cartCount={cartCount} />

            <div className="bg-blue-500 h-[30vh]"></div>

            <div className="flex flex-wrap lg:flex-nowrap lg:-mt-[10vh] -mt-[30vh] gap-5 pb-20 px-4 min-h-screen">
                <UserProfile isActive="ubahPasword" user={user} role={role} />

                <div className="p-5 mt-40 md:mt-0 relative overflow-x-auto bg-white shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-xl w-full lg:w-[75%] table-scroll">
                    <h2 className="text-xl font-semibold mb-4">Ubah Password</h2>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4 mt-7">
                        <div>
                            <label className="block text-sm font-medium mb-1">Password Baru</label>
                            <input
                                type="password"
                                className="w-full border-gray-400 border-2 focus:outline-2 focus:outline-blue-500 p-2 rounded focus:ring focus:ring-blue-200"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border-gray-400 border-2 focus:outline-2 focus:outline-blue-500 rounded focus:ring focus:ring-blue-200"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Simpan Password
                        </button>
                    </form>
                </div>
            </div>

        </ProfileLayout>
    );
};

export default UbahPassword;
