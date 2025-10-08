<?php

namespace App\Filament\Resources\LaguDaerahResource\Pages;

use App\Filament\Resources\LaguDaerahResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLaguDaerahs extends ListRecords
{
    protected static string $resource = LaguDaerahResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->icon('heroicon-o-plus'),
        ];
    }
}
