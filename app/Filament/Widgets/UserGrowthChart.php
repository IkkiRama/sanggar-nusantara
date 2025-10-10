<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\LineChartWidget;

class UserGrowthChart extends LineChartWidget
{
    protected static ?string $heading = '👥 User Growth';
    protected static ?int $sort = 3;

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
                $count = User::whereYear('created_at', $targetYear)->count();

                return [
                    'period' => $targetYear,
                    'count' => $count,
                ];
            })->reverse();

            return [
                'datasets' => [
                    [
                        'label' => 'User Baru per Tahun',
                        'data' => $years->pluck('count'),
                        'borderColor' => '#9333ea',
                        'backgroundColor' => 'rgba(147,51,234,0.2)',
                    ],
                ],
                'labels' => $years->pluck('period'),
            ];
        }

        if ($filter === 'monthly') {
            $months = collect(range(0, 5))->map(function ($month) {
                $start = Carbon::now()->subMonths($month)->startOfMonth();
                $end = Carbon::now()->subMonths($month)->endOfMonth();
                $count = User::whereBetween('created_at', [$start, $end])->count();

                return [
                    'period' => $start->format('M Y'),
                    'count' => $count,
                ];
            })->reverse();

            return [
                'datasets' => [
                    [
                        'label' => 'User Baru per Bulan',
                        'data' => $months->pluck('count'),
                        'borderColor' => '#8b5cf6',
                        'backgroundColor' => 'rgba(139,92,246,0.2)',
                    ],
                ],
                'labels' => $months->pluck('period'),
            ];
        }

        // Default: Weekly
        $weeks = collect(range(0, 6))->map(function ($week) {
            $start = Carbon::now()->subWeeks($week)->startOfWeek();
            $end = Carbon::now()->subWeeks($week)->endOfWeek();
            $count = User::whereBetween('created_at', [$start, $end])->count();

            return [
                'period' => $start->format('d M'),
                'count' => $count,
            ];
        })->reverse();

        return [
            'datasets' => [
                [
                    'label' => 'User Baru per Minggu',
                    'data' => $weeks->pluck('count'),
                    'borderColor' => '#f59e0b',
                    'backgroundColor' => 'rgba(245,158,11,0.2)',
                ],
            ],
            'labels' => $weeks->pluck('period'),
        ];
    }
}
