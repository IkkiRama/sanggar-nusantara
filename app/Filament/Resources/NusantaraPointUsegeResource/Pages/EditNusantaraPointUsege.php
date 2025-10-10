<?php

namespace App\Filament\Resources\NusantaraPointUsegeResource\Pages;

use App\Filament\Resources\NusantaraPointUsegeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNusantaraPointUsege extends EditRecord
{
    protected static string $resource = NusantaraPointUsegeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
