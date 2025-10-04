<?php

namespace App\Services;

use GuzzleHttp\Client;

class GeminiService
{
    protected $http;
    protected $apiKey;

    public function __construct()
    {
        $this->http = new Client();
        $this->apiKey = env('GEMINI_API_KEY');
    }

    public function ask(string $question): string
    {
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

        $payload = [
            "contents" => [
                [
                    "parts" => [
                        ["text" => $question]
                    ]
                ]
            ]
        ];

        try {
            $response = $this->http->post($url, [
                "headers" => [
                    "Content-Type"  => "application/json",
                    "x-goog-api-key" => $this->apiKey,
                ],
                "json" => $payload,
            ]);

            $body = json_decode($response->getBody()->getContents(), true);

            if (isset($body['candidates'][0]['content']['parts'][0]['text'])) {
                return $body['candidates'][0]['content']['parts'][0]['text'];
            }

            return "⚠️ Tidak ada jawaban dari AI.";
        } catch (\Exception $e) {
            return "⚠️ Error: " . $e->getMessage();
        }
    }
}
