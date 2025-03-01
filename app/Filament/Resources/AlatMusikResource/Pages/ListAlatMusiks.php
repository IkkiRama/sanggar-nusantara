<?php

namespace App\Filament\Resources\AlatMusikResource\Pages;

use App\Filament\Resources\AlatMusikResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAlatMusiks extends ListRecords
{
    protected static string $resource = AlatMusikResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
