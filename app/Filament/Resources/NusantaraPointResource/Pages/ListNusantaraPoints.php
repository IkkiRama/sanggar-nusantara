<?php

namespace App\Filament\Resources\NusantaraPointResource\Pages;

use App\Filament\Resources\NusantaraPointResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListNusantaraPoints extends ListRecords
{
    protected static string $resource = NusantaraPointResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->icon('heroicon-o-plus'),
        ];
    }
}
