<?php

namespace App\Filament\Widgets;

use App\Models\ChallengeParticipant;
use Filament\Widgets\PieChartWidget;

class ChallengeCompletionRateChart extends PieChartWidget
{
    protected static ?string $heading = '🏁 Challenge Completion Rate';
    protected static ?int $sort = 4;

    protected function getData(): array
    {
        $totalCompleted = ChallengeParticipant::where('status', 'completed')->count();
        $totalInProgress = ChallengeParticipant::where('status', 'in_progres')->count();

        $total = $totalCompleted + $totalInProgress;

        return [
            'datasets' => [
                [
                    'label' => 'Completion Rate',
                    'data' => [$totalCompleted, $totalInProgress],
                    'backgroundColor' => ['#22c55e', '#f97316'],
                ],
            ],
            'labels' => ['Completed', 'In Progress'],
        ];
    }
}
