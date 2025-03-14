<?php

namespace App\Filament\Resources\SeniTariResource\Pages;

use App\Filament\Resources\SeniTariResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSeniTaris extends ListRecords
{
    protected static string $resource = SeniTariResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
