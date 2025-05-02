import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";

export default function SubscriptionPlans({plans,user}) {
    const [tabActive, setTabActive] = useState("Bulanan");
    const tabs = ["Bulanan", "Triwulanan", "Tahunan"];

  return (
    <MainLayout title="Pilih Paket Langganan Sanggar Nusantara | Sanggar Nusantara">
        <LightNavbar user={user} />

        <div className="bg-white py-20 px-4 lg:px-20 lg:pt-28 lg:pb-20">
            <h2 className="text-3xl font-bold text-center mb-7 md:mb-4 text-gray-800">
                Pilih Paket Langganan Sanggar Nusantara
            </h2>

            {/* Mobile Tabs */}
            <div className="md:hidden flex justify-around w-full border-b border-gray-300 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setTabActive(tab)}
                        className={` font-semibold cursor-pointer px-4 py-2 ${tabActive === tab ? "text-blue-600" : "text-gray-500" }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="hidden md:flex justify-start md:justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setTabActive(tab)}
                        className={`cursor-pointer px-4 py-2 mx-2 rounded-lg ${tabActive === tab ? "bg-indigo-600 text-white" : "active:bg-gray-300 bg-gray-200 hover:bg-gray-300"}`}
                    >
                        <span className="font-semibold">{tab}</span>
                    </button>
                ))}
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:mt-10 mt-5">
                {plans.filter((plan) => plan.durasi === tabActive ).map((plan, index) => (
                    <div
                        key={index}
                        className={`border rounded-2xl p-6 shadow-md transition-transform transform lg:hover:scale-105 ${
                        plan.highlight
                            ? "border-yellow-500 bg-yellow-50 lg:scale-105"
                            : "border-gray-200 bg-white"
                        }`}
                    >
                        {plan.specialTag && (
                            <div className="mb-5 md:mb-3 text-sm font-medium text-white bg-indigo-400 inline-block px-3 py-1 rounded-full">
                                {plan.specialTag}
                            </div>
                        )}
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {plan.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                        {plan.specialNote && (
                            <p className="text-xs text-gray-500 italic mb-2">{plan.specialNote}</p>
                        )}
                        {/* Harga */}
                        {plan.price === 0 ? (
                            <p className="text-2xl font-bold text-indigo-700 mb-1">Gratis</p>
                        ) :  (
                            <>
                                <div className="text-2xl font-bold text-indigo-700 mb-3">
                                    Rp{plan.price.toLocaleString()}/{plan.durasi}
                                </div>

                                <div className="flex gap-5 mb-5 items-center">
                                    {plan.price < plan.originalPrice && (
                                        <div className="text-sm text-gray-500 line-through">
                                            Rp{plan.originalPrice.toLocaleString()}/{plan.durasi}
                                        </div>
                                    )}
                                    <p className="text-sm font-medium text-white bg-emerald-600 inline-block px-3 py-1 rounded-full">
                                        Hemat {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                                    </p>
                                </div>
                            </>
                        )}

                        <button
                            className={`w-full cursor-pointer font-semibold py-2 rounded-lg transition mb-4
                                ${plan.highlight
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                }`}
                        >
                            {plan.highlight ? "Pilih Paket Favorit" : "Langganan Sekarang"}
                        </button>
                        <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            {feature}
                            </li>
                        ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </MainLayout>
  );
}
