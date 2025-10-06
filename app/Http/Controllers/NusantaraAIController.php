<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NusantaraAIController extends Controller
{

    public function ask(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string',
        ]);

        $prompt = $request->input('prompt');

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type' => 'application/json',
            ])->withOptions([
                'verify' => false, // Non-verify SSL
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ],
                'max_tokens' => 300,
            ]);

            $data = $response->json();

            return response()->json([
                'answer' => $data['choices'][0]['message']['content'] ?? 'AI tidak memberikan jawaban.',
            ]);

        } catch (\Exception $e) {
            dd($e);
            return response()->json(['answer' => '⚠️ Terjadi kesalahan.'], 500);
        }
    }


    // public function ask(Request $request)
    // {
    //     $prompt = $request->input('prompt', "Halo!");

    //     $client = new \GuzzleHttp\Client();

    //     try {
    //         $response = $client->request('POST', 'https://gemini-pro-ai.p.rapidapi.com/', [
    //             'body' => json_encode([
    //                 'contents' => [
    //                     ['role' => 'user', 'parts' => [['text' => $prompt]]]
    //                 ]
    //             ]),
    //             'headers' => [
    //                 'Content-Type' => 'application/json',
    //                 'x-rapidapi-host' => env('RAPIDAPI_HOST', 'gemini-pro-ai.p.rapidapi.com'),
    //                 'x-rapidapi-key'  => env('RAPIDAPI_KEY')
    //             ],
    //             'verify' => false,
    //         ]);

    //         $data = json_decode($response->getBody(), true);

    //         // Ambil teks dari model
    //         $text = $data['contents'][0]['parts'][0]['text'] ?? 'Tidak ada respon.';

    //         return response()->json(['answer' => $text]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'answer' => '⚠️ Terjadi kesalahan: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }
}
