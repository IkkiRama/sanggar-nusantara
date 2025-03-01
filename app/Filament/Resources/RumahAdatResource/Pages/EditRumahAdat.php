<?php

namespace App\Filament\Resources\RumahAdatResource\Pages;

use App\Filament\Resources\RumahAdatResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditRumahAdat extends EditRecord
{
    protected static string $resource = RumahAdatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
