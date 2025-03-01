<?php

namespace App\Filament\Resources\PembelianEventResource\Pages;

use App\Filament\Resources\PembelianEventResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPembelianEvent extends EditRecord
{
    protected static string $resource = PembelianEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
