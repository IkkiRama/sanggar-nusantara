<?php

namespace App\Filament\Resources\LaguDaerahResource\Pages;

use App\Filament\Resources\LaguDaerahResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLaguDaerah extends EditRecord
{
    protected static string $resource = LaguDaerahResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
