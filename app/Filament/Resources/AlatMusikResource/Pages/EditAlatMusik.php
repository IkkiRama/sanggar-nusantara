<?php

namespace App\Filament\Resources\AlatMusikResource\Pages;

use App\Filament\Resources\AlatMusikResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAlatMusik extends EditRecord
{
    protected static string $resource = AlatMusikResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
