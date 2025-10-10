<?php

namespace App\Filament\Resources\CompletedChallengeResource\Pages;

use App\Filament\Resources\CompletedChallengeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCompletedChallenge extends EditRecord
{
    protected static string $resource = CompletedChallengeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
