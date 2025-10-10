<?php

namespace App\Filament\Widgets;

use App\Models\User;
use App\Models\Challenge;
use App\Models\ChallengeParticipant;
use App\Models\NusantaraPoint;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $activeUsers = User::count();

        $ongoingChallenges = ChallengeParticipant::where('status', 'in_progres')->count();
        $completedChallenges = ChallengeParticipant::where('status', 'completed')->count();

        $totalPoints = NusantaraPoint::sum('amount');

        return [
            Stat::make('👥 Total Users', $activeUsers)
                ->description('Users terdaftar di platform')
                ->descriptionIcon('heroicon-o-user-group')
                ->color('info'),

            Stat::make('🧩 Challenges', "$ongoingChallenges berjalan / $completedChallenges selesai")
                ->description('Status tantangan aktif')
                ->descriptionIcon('heroicon-o-flag')
                ->color('warning'),

            Stat::make('💰 Total Poin Diberikan', number_format($totalPoints) . ' pts')
                ->description('Akumulasi seluruh poin yang diberikan')
                ->descriptionIcon('heroicon-o-gift')
                ->color('success'),
        ];
    }
}
