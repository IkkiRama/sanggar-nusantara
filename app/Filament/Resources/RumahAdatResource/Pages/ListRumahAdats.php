<?php

namespace App\Filament\Resources\RumahAdatResource\Pages;

use App\Filament\Resources\RumahAdatResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListRumahAdats extends ListRecords
{
    protected static string $resource = RumahAdatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
