<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProgressVerificationResource\Pages;
use App\Filament\Resources\ProgressVerificationResource\RelationManagers;
use App\Models\ChallengeParticipant;
use App\Models\ChallengeProgres;
use App\Models\ProgressVerification;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProgressVerificationResource extends Resource
{
    protected static ?string $model = ChallengeProgres::class;

    protected static ?string $navigationIcon = 'heroicon-o-check-circle';
    protected static ?string $navigationGroup = '🎯 Challenges';
    protected static ?string $navigationLabel = 'Progres Verification';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('challenge_participant_id')
                    ->relationship('participant', 'id')
                    ->label('Participant')
                    ->options(ChallengeParticipant::all()->pluck('user.name', 'id'))
                    ->disabled(),

                Forms\Components\Select::make('challenge_participant_id')
                    ->relationship('participant', 'id')
                    ->label('Challenge')
                    ->options(ChallengeParticipant::all()->pluck('challenge.title', 'id'))
                    ->disabled(),

                Forms\Components\TextInput::make('day_number')
                    ->label('Day')
                    ->disabled(),

                Forms\Components\Select::make('status')
                    ->label('Verification Status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ])
                    ->required(),

                Forms\Components\FileUpload::make('image_bukti')
                    ->label('Gambar Bukti')
                    ->image()
                    ->disabled()
                    ->columnSpanFull(),

                Forms\Components\Textarea::make('admin_note')
                    ->label('Admin Note')
                    ->maxLength(255)
                    ->helperText('Optional note about verification result.')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('participant.user')
                    ->label('User')
                    ->formatStateUsing(fn ($record) => $record->participant?->user?->name)
                    ->sortable()
                    ->searchable(),

                TextColumn::make('participant.challenge.title')
                    ->label('Challenge')
                    ->formatStateUsing(fn ($record) => $record->participant?->challenge?->title)
                    ->sortable()
                    ->searchable(),

                TextColumn::make('day_number')
                    ->label('Day')
                    ->sortable(),

                ImageColumn::make('image_bukti')
                    ->label('Bukti')
                    ->square()
                    ->height(50),

                TextColumn::make('status')
                    ->badge()
                    ->label('Status')
                    ->colors([
                        'gray' => 'pending',
                        'success' => 'approved',
                        'danger' => 'rejected',
                    ])
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                ]),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\Action::make('verify')
                    ->label('Verify')
                    ->tooltip('Verify progress')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->requiresConfirmation()
                    ->action(fn ($record) => $record->update(['status' => 'approved'])),

                Tables\Actions\Action::make('reject')
                    ->label('Reject')
                    ->icon('heroicon-o-x-mark')
                    ->tooltip('Reject progress')
                    ->color('danger')
                    ->visible(fn ($record) => $record->status !== 'rejected')
                    ->requiresConfirmation()
                    ->action(fn ($record) => $record->update(['status' => 'rejected'])),

                Tables\Actions\EditAction::make()
                    ->color('warning'),
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
            'index' => Pages\ListProgressVerifications::route('/'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['participant.user', 'participant.challenge'])
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
