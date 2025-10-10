<?php

namespace App\Filament\Widgets;

use App\Models\NusantaraPoint;
use App\Models\NusantaraPointUsage;
use Filament\Widgets\PieChartWidget;

class PointDistributionChart extends PieChartWidget
{
    protected static ?string $heading = '💸 Point Distribution (Earned vs Used)';
    protected static ?int $sort = 4;

    protected function getData(): array
    {
        $earned = NusantaraPoint::sum('amount');
        $used = NusantaraPointUsage::sum('points_used');
        $available = max($earned - $used, 0);

        return [
            'datasets' => [
                [
                    'label' => 'Point Status',
                    'data' => [$earned, $used, $available],
                    'backgroundColor' => [
                        '#22c55e', // Earned - green
                        '#ef4444', // Used - red
                        '#3b82f6', // Available - blue
                    ],
                ],
            ],
            'labels' => ['Earned', 'Used', 'Remaining'],
        ];
    }
}
