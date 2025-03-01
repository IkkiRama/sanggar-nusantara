<?php

namespace App\Filament\Resources\DiscountEventResource\Pages;

use App\Filament\Resources\DiscountEventResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListDiscountEvents extends ListRecords
{
    protected static string $resource = DiscountEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
