<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserPointBalanceResource\Pages;
use App\Models\User;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class UserPointBalanceResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-scale';
    protected static ?string $navigationGroup = '💰 Poin Management';
    protected static ?string $navigationLabel = 'Saldo Poin Pengguna';
    protected static ?string $pluralLabel = 'Saldo Poin Pengguna';
    // protected static ?string $modelLabel = 'Saldo Poin Pengguna';
    protected static ?int $navigationSort = 3;

    public static function table(Table $table): Table
    {
        return $table
            ->query(static::getPointBalancesQuery())
            ->columns([
                TextColumn::make('name')
                    ->label('User')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('earned_points')
                    ->label('Poin Diperoleh')
                    ->badge()
                    ->color('success')
                    ->suffix(' pts'),

                TextColumn::make('used_points')
                    ->label('Poin Digunakan')
                    ->badge()
                    ->color('danger')
                    ->suffix(' pts'),

                TextColumn::make('balance')
                    ->label('Sisa Poin')
                    ->badge()
                    ->color(fn ($record) => $record->balance > 0 ? 'info' : 'gray')
                    ->suffix(' pts')
                    ->sortable(),
            ])
            ->filters([
                Filter::make('positive_balance')
                    ->label('Saldo > 0')
                    ->query(fn (Builder $query) => $query->having('balance', '>', 0)),

                Filter::make('zero_balance')
                    ->label('Saldo 0')
                    ->query(fn (Builder $query) => $query->having('balance', '=', 0)),
            ])
            ->actions([]);
    }

    protected static function getPointBalancesQuery(): Builder
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
                - COALESCE((SELECT SUM(points_used) FROM nusantara_point_usages WHERE user_id = users.id),0)) AS balance');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUserPointBalances::route('/'),
        ];
    }
}
