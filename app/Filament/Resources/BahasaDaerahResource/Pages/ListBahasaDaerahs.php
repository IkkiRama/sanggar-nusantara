<?php

namespace App\Filament\Resources\BahasaDaerahResource\Pages;

use App\Filament\Resources\BahasaDaerahResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBahasaDaerahs extends ListRecords
{
    protected static string $resource = BahasaDaerahResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->icon('heroicon-o-plus'),
        ];
    }
}
