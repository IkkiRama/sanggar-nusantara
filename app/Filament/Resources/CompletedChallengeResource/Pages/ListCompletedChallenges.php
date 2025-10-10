<?php

namespace App\Filament\Resources\CompletedChallengeResource\Pages;

use App\Filament\Resources\CompletedChallengeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCompletedChallenges extends ListRecords
{
    protected static string $resource = CompletedChallengeResource::class;

    protected function getHeaderActions(): array
    {
        return [
        ];
    }
}
