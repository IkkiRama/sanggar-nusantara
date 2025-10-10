<?php

namespace App\Filament\Resources\NusantaraPointUsegeResource\Pages;

use App\Filament\Resources\NusantaraPointUsegeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListNusantaraPointUseges extends ListRecords
{
    protected static string $resource = NusantaraPointUsegeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->icon('heroicon-o-plus'),
        ];
    }
}
