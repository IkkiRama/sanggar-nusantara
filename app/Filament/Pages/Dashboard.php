<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Pages\Dashboard\Concerns\HasFilters;
use App\Filament\Widgets\StatsOverviewWidget;
use App\Filament\Widgets\TopUsersWidget;
use App\Filament\Widgets\ChallengeParticipationChart;
use App\Filament\Widgets\LeaderboardWidget;
use App\Filament\Widgets\PointDistributionChart;
use App\Filament\Widgets\UserGrowthChart;

class Dashboard extends BaseDashboard
{
    use HasFilters;

    public function getWidgets(): array
    {
        return [
                StatsOverviewWidget::class,
                LeaderboardWidget::class,
                ChallengeParticipationChart::class,
                UserGrowthChart::class,
                PointDistributionChart::class,
        ];
    }

    public function getColumns(): int | array
    {
        return [
            'default' => 2,
            'xl' => 3,
        ];
    }

    public static function shouldRegisterNavigation(): bool
    {
        return true;
    }
}
