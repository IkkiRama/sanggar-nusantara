<?php

namespace App\Filament\Resources\ProgressVerificationResource\Pages;

use App\Filament\Resources\ProgressVerificationResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProgressVerifications extends ListRecords
{
    protected static string $resource = ProgressVerificationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->icon('heroicon-o-plus'),
        ];
    }
}
