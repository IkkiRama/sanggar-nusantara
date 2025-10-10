<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompletedChallengeResource\Pages;
use App\Filament\Resources\CompletedChallengeResource\RelationManagers;
use App\Models\ChallengeParticipant;
use App\Models\CompletedChallenge;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CompletedChallengeResource extends Resource
{
    protected static ?string $model = ChallengeParticipant::class;

    protected static ?string $navigationIcon = 'heroicon-o-trophy';
    protected static ?string $navigationGroup = '🎯 Challenges';
    protected static ?string $navigationLabel = 'Completed Challenges';
    protected static ?int $navigationSort = 4;

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('User')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('challenge.title')
                    ->label('Challenge')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('challenge.nusantara_points')
                    ->label('Points')
                    ->badge()
                    ->color('success')
                    ->sortable(),

                TextColumn::make('updated_at')
                    ->label('Completed At')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('challenge_id')
                    ->relationship('challenge', 'title')
                    ->label('Challenge'),

                SelectFilter::make('user_id')
                    ->relationship('user', 'name')
                    ->label('User'),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->color("warning"),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCompletedChallenges::route('/'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        // hanya ambil challenge yang sudah selesai
        return parent::getEloquentQuery()
            ->where('status', 'completed')
            ->with(['user', 'challenge'])
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
