<?php

namespace App\Filament\Resources\PembelianEventResource\Pages;

use App\Filament\Resources\PembelianEventResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPembelianEvents extends ListRecords
{
    protected static string $resource = PembelianEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
