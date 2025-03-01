<?php

namespace App\Filament\Resources\MidtransLogResource\Pages;

use App\Filament\Resources\MidtransLogResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMidtransLogs extends ListRecords
{
    protected static string $resource = MidtransLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
