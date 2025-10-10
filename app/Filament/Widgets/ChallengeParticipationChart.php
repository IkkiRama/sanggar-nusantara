<?php

namespace App\Filament\Widgets;

use App\Models\ChallengeParticipant;
use Carbon\Carbon;
use Filament\Widgets\LineChartWidget;

class ChallengeParticipationChart extends LineChartWidget
{
    protected static ?string $heading = '📈 Challenge Participation';
    protected static ?int $sort = 2;

    protected function getFilters(): ?array
    {
        return [
            'weekly' => 'Weekly',
            'monthly' => 'Monthly',
            'yearly' => 'Yearly',
        ];
    }

    protected function getData(): array
    {
        $filter = $this->filter ?? 'weekly';

        if ($filter === 'yearly') {
            $years = collect(range(0, 4))->map(function ($year) {
                $targetYear = Carbon::now()->subYears($year)->year;
                $count = ChallengeParticipant::whereYear('created_at', $targetYear)->count();

                return [
                    'period' => $targetYear,
                    'count' => $count,
                ];
            })->reverse();

            return [
                'datasets' => [
                    [
                        'label' => 'Partisipasi Challenge per Tahun',
                        'data' => $years->pluck('count'),
                        'borderColor' => '#2563eb',
                        'backgroundColor' => 'rgba(37,99,235,0.2)',
                    ],
                ],
                'labels' => $years->pluck('period'),
            ];
        }

        if ($filter === 'monthly') {
            $months = collect(range(0, 5))->map(function ($month) {
                $start = Carbon::now()->subMonths($month)->startOfMonth();
                $end = Carbon::now()->subMonths($month)->endOfMonth();
                $count = ChallengeParticipant::whereBetween('created_at', [$start, $end])->count();

                return [
                    'period' => $start->format('M Y'),
                    'count' => $count,
                ];
            })->reverse();

            return [
                'datasets' => [
                    [
                        'label' => 'Partisipasi Challenge per Bulan',
                        'data' => $months->pluck('count'),
                        'borderColor' => '#22c55e',
                        'backgroundColor' => 'rgba(34,197,94,0.2)',
                    ],
                ],
                'labels' => $months->pluck('period'),
            ];
        }

        // Default: Weekly
        $weeks = collect(range(0, 6))->map(function ($week) {
            $start = Carbon::now()->subWeeks($week)->startOfWeek();
            $end = Carbon::now()->subWeeks($week)->endOfWeek();
            $count = ChallengeParticipant::whereBetween('created_at', [$start, $end])->count();

            return [
                'period' => $start->format('d M'),
                'count' => $count,
            ];
        })->reverse();

        return [
            'datasets' => [
                [
                    'label' => 'Partisipasi Challenge per Minggu',
                    'data' => $weeks->pluck('count'),
                    'borderColor' => '#3b82f6',
                    'backgroundColor' => 'rgba(59,130,246,0.2)',
                ],
            ],
            'labels' => $weeks->pluck('period'),
        ];
    }
}
