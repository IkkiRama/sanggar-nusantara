<?php

namespace App\Filament\Resources\KategoriEventResource\Pages;

use App\Filament\Resources\KategoriEventResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKategoriEvent extends EditRecord
{
    protected static string $resource = KategoriEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
