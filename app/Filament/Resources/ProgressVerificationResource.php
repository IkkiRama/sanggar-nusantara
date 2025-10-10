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
                    ->options(ChallengeParticipant::all()->pluck('user.name', 'id')),

                Forms\Components\Select::make('challenge_participant_id')
                    ->relationship('participant', 'id')
                    ->label('Challenge')
                    ->options(ChallengeParticipant::all()->pluck('challenge.title', 'id')),

                Forms\Components\TextInput::make('day_number')
                    ->label('Day'),

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
                    ->height(50)
                    ->defaultImageUrl(url('/images/NO IMAGE AVAILABLE.jpg')),

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
                    ->icon('heroicon-o-check-circle')
                    ->color(fn ($record) => match ($record->status) {
                        'approved' => 'success',
                        'rejected' => 'danger',
                        'pending' => 'gray',
                        default => 'gray',
                    })
                    ->form(function ($record) {
                        return [
                            Forms\Components\ViewField::make('image_bukti')
                                ->view('filament.forms.components.image-preview')
                                ->label('Bukti Gambar')
                                ->columnSpanFull(),

                            Forms\Components\Select::make('status')
                                ->label('Verification Status')
                                ->options([
                                    'approved' => 'Approved',
                                    'pending' => 'Pending',
                                    'rejected' => 'Rejected',
                                ])
                                ->default($record->status)
                                ->required(),

                            Forms\Components\Textarea::make('admin_note')
                                ->label('Admin Note')
                                ->default($record->admin_note)
                                ->maxLength(255)
                                ->placeholder('Optional note about verification result.'),
                        ];
                    })
                    ->modalHeading('Verify Progress')
                    ->modalSubmitActionLabel('Save Verification')
                    ->modalWidth('lg')
                    ->requiresConfirmation(false)
                    ->action(function ($record, array $data): void {
                        $record->update([
                            'status' => $data['status'],
                            'admin_note' => $data['admin_note'] ?? null,
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
