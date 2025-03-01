<?php

namespace App\Filament\Resources\MakananKhasResource\Pages;

use App\Filament\Resources\MakananKhasResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMakananKhas extends EditRecord
{
    protected static string $resource = MakananKhasResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
