<?php

namespace App\Filament\Resources\DiscountUserResource\Pages;

use App\Filament\Resources\DiscountUserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDiscountUser extends EditRecord
{
    protected static string $resource = DiscountUserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
