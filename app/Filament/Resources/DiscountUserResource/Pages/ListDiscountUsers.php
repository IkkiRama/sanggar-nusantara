<?php

namespace App\Filament\Resources\DiscountUserResource\Pages;

use App\Filament\Resources\DiscountUserResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListDiscountUsers extends ListRecords
{
    protected static string $resource = DiscountUserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
