<?php

namespace App\Filament\Resources\NusantaraPointResource\Pages;

use App\Filament\Resources\NusantaraPointResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNusantaraPoint extends EditRecord
{
    protected static string $resource = NusantaraPointResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
