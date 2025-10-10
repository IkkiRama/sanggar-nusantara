<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

class LeaderboardWidget extends BaseWidget
{
    protected static ?int $sort = 5;
    protected int|string|array $columnSpan = 'full';
    protected static ?string $heading = '🏆 Top 10 Leaderboard';

    protected function getTableQuery(): Builder
    {
        return User::query()
            ->select('users.*')
            ->selectSub(function ($query) {
                $query->from('nusantara_points')
                    ->selectRaw('COALESCE(SUM(amount), 0)')
                    ->whereColumn('user_id', 'users.id');
            }, 'earned_points')
            ->selectSub(function ($query) {
                $query->from('nusantara_point_usages')
                    ->selectRaw('COALESCE(SUM(points_used), 0)')
                    ->whereColumn('user_id', 'users.id');
            }, 'used_points')
            ->selectRaw('(COALESCE((SELECT SUM(amount) FROM nusantara_points WHERE user_id = users.id),0)
                - COALESCE((SELECT SUM(points_used) FROM nusantara_point_usages WHERE user_id = users.id),0)) AS total_points')
            ->orderByDesc('total_points')
            ->limit(10);
    }

    protected function getTableColumns(): array
    {
        return [
            TextColumn::make('rank')
                ->label('No')
                ->state(fn ($record, $rowLoop) => $rowLoop->iteration)
                ->alignCenter(),

            TextColumn::make('name')
                ->label('User')
                ->weight('bold'),

            TextColumn::make('total_points')
                ->label('Total Points')
                ->badge()
                ->color('info')
                ->suffix(' pts')
                ->sortable(),
        ];
    }
}
