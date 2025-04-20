<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;
use Illuminate\Support\Facades\Cache;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function getSnapToken($order)
    {
        $cacheKey = 'snap_token_' . $order->order_id;

        // Cek apakah sudah ada token di cache
        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $transaction = [
            'transaction_details' => [
                'order_id' => $order->order_id,
                'gross_amount' => (int) $order->total_akhir,
            ],
            'customer_details' => [
                'first_name' => $order->user->name ?? 'Guest',
                'email' => $order->user->email ?? 'no-email@example.com',
            ],
            'callbacks' => [
                'finish' => url("/payment-status/{$order->order_id}"),
            ],
        ];

        // Ambil token dari Midtrans
        $snapToken = Snap::getSnapToken($transaction);

        // Simpan ke cache selama 5 menit
        Cache::put($cacheKey, $snapToken, now()->addMinutes(5));

        return $snapToken;
    }



    // Method untuk mengambil status transaksi dari Midtrans
    public function getTransactionStatus($orderId)
    {
        try {
            $paymentStatus = Transaction::status($orderId);

            return [
                'transaction_status' => $paymentStatus->transaction_status ?? null,
                'transaction_id' => $paymentStatus->transaction_id ?? null,
            ];
        } catch (\Exception $e) {
            throw new \Exception("Error fetching payment status: " . $e->getMessage());
        }
    }
}
