<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ChallengeParticipantResource\Pages;
use App\Filament\Resources\ChallengeParticipantResource\RelationManagers;
use App\Models\ChallengeParticipant;
use App\Models\ChallengeProgres;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ChallengeParticipantResource extends Resource
{
    protected static ?string $model = ChallengeParticipant::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = '🎯 Challenges';
    protected static ?string $navigationLabel = 'Participants';
    protected static ?string $slug = 'participants';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('challenge_id')
                    ->label('Challenge')
                    ->relationship('challenge', 'title')
                    ->required()
                    ->searchable(),

                Forms\Components\Select::make('user_id')
                    ->label('User')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable(),

                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'in_progres' => 'In Progres',
                        'completed' => 'Completed',
                    ])
                    ->default('in_progres')
                    ->required(),

                 Forms\Components\DateTimePicker::make('started_at')
                    ->label('Started At')
                    ->default(now()) // otomatis isi dengan waktu saat ini
                    ->readOnly()
                    ->nullable(),

                Forms\Components\DateTimePicker::make('completed_at')
                    ->label('Completed At')
                    ->nullable()
                    ->visible(fn ($get) => $get('status') === 'completed'),
            ]);
    }

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

                TextColumn::make('status')
                    ->badge()
                    ->label('Status')
                    ->colors([
                        'warning' => 'in_progres',
                        'success' => 'completed',
                    ])
                    ->icons([
                        'heroicon-o-clock' => 'in_progres',
                        'heroicon-o-check-circle' => 'completed',
                    ])
                    ->sortable(),

                TextColumn::make('progres_count')
                    ->label('Progres')
                    ->getStateUsing(fn ($record) => $record->progres()->count())
                    ->sortable(),

                IconColumn::make('is_completed')
                    ->label('Verified')
                    ->boolean()
                    ->getStateUsing(fn ($record) => $record->is_completed),

                TextColumn::make('created_at')
                    ->label('Joined At')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                SelectFilter::make('status')
                    ->options([
                        'in_progres' => 'In Progres',
                        'completed' => 'Completed',
                    ]),
            ])
            ->actions([
                Tables\Actions\Action::make('view')
                    ->label('View Detail')
                     ->color('info')
                    ->icon('heroicon-o-eye')
                    ->modalHeading('Challenge Progress')
                    ->modalWidth('4xl')
                    ->requiresConfirmation(false)
                    ->modalSubmitAction(false)
                    ->modalCancelAction(false)
                    ->modalContent(function ($record) {
                        $progres = ChallengeProgres::where('challenge_participant_id', $record->id)->get();

                        return view('filament.participants.view-progres', [
                            'record' => $record,
                            'progres' => $progres,
                        ]);
                }),
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
            ])
            ->defaultSort('created_at', 'desc');
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
            'index' => Pages\ListChallengeParticipants::route('/'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
