<?php

namespace App\Filament\Resources\MidtransLogResource\Pages;

use App\Filament\Resources\MidtransLogResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMidtransLog extends EditRecord
{
    protected static string $resource = MidtransLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
