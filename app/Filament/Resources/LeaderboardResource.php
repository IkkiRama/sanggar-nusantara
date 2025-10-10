<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeaderboardResource\Pages;
use App\Models\User;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

class LeaderboardResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationGroup = '💰 Poin Management';
    protected static ?string $navigationIcon = 'heroicon-o-trophy';
    protected static ?string $navigationLabel = 'Leaderboard';
    protected static ?string $pluralLabel = 'Leaderboard';
    protected static ?int $navigationSort = 4;

    public static function table(Table $table): Table
    {
        return $table
            ->query(static::getLeaderboardQuery())
            ->defaultSort('total_points', 'desc')
            ->columns([
                TextColumn::make('rank')
                    ->label('No')
                    ->state(static function ($record, $rowLoop) {
                        return $rowLoop->iteration;
                    })
                    ->alignCenter(),

                TextColumn::make('name')
                    ->label('User')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('earned_points')
                    ->label('Earned')
                    ->badge()
                    ->color('success')
                    ->suffix(' pts'),

                TextColumn::make('used_points')
                    ->label('Used')
                    ->badge()
                    ->color('danger')
                    ->suffix(' pts'),

                TextColumn::make('total_points')
                    ->label('Total')
                    ->badge()
                    ->color(fn ($record) => $record->total_points > 0 ? 'info' : 'gray')
                    ->suffix(' pts')
                    ->sortable(),
            ]);
    }

    protected static function getLeaderboardQuery(): Builder
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
                - COALESCE((SELECT SUM(points_used) FROM nusantara_point_usages WHERE user_id = users.id),0)) AS total_points');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLeaderboards::route('/'),
        ];
    }
}
