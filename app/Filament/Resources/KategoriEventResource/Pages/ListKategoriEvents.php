<?php

namespace App\Filament\Resources\KategoriEventResource\Pages;

use App\Filament\Resources\KategoriEventResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListKategoriEvents extends ListRecords
{
    protected static string $resource = KategoriEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
