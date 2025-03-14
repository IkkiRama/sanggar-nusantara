<?php

namespace App\Filament\Resources\BahasaDaerahResource\Pages;

use App\Filament\Resources\BahasaDaerahResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBahasaDaerah extends EditRecord
{
    protected static string $resource = BahasaDaerahResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
