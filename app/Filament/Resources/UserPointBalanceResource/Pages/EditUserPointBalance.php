<?php

namespace App\Filament\Resources\UserPointBalanceResource\Pages;

use App\Filament\Resources\UserPointBalanceResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUserPointBalance extends EditRecord
{
    protected static string $resource = UserPointBalanceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
