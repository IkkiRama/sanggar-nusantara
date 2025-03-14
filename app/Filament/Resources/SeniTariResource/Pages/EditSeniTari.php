<?php

namespace App\Filament\Resources\SeniTariResource\Pages;

use App\Filament\Resources\SeniTariResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSeniTari extends EditRecord
{
    protected static string $resource = SeniTariResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
