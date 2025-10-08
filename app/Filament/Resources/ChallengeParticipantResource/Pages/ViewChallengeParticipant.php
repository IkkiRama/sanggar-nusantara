<?php

namespace App\Filament\Resources\ChallengeParticipantResource\Pages;

use App\Filament\Resources\ChallengeParticipantResource;
use App\Models\ChallengeProgres;
use Filament\Resources\Pages\ViewRecord;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class ViewChallengeParticipant extends ViewRecord
{
    protected static string $resource = ChallengeParticipantResource::class;

    protected function getHeaderWidgets(): array
    {
        return [];
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(
                ChallengeProgres::query()
                    ->where('participant_id', $this->record->id)
            )
            ->columns([
                TextColumn::make('day')
                    ->label('Day')
                    ->sortable(),

                ImageColumn::make('image_bukti')
                    ->label('Image Bukti')
                    ->square()
                    ->height(60),

                TextColumn::make('status')
                    ->badge()
                    ->colors([
                        'gray' => 'pending',
                        'success' => 'approved',
                        'danger' => 'rejected',
                    ])
                    ->label('Status'),

                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime('d M Y H:i'),
            ])
            ->defaultSort('day');
    }

    protected function getHeaderActions(): array
    {
        return [];
    }

    public function getBreadcrumbs(): array
    {
        return [
            route('filament.admin.resources.participants.index') => 'Participants',
            route('filament.admin.resources.participants.view', $this->record) => $this->record->user->name,
        ];
    }
}
