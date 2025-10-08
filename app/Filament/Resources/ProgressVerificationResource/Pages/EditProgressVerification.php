<?php

namespace App\Filament\Resources\ProgressVerificationResource\Pages;

use App\Filament\Resources\ProgressVerificationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProgressVerification extends EditRecord
{
    protected static string $resource = ProgressVerificationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
