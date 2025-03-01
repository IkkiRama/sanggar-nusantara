<?php

namespace App\Filament\Resources\DiscountEventResource\Pages;

use App\Filament\Resources\DiscountEventResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDiscountEvent extends EditRecord
{
    protected static string $resource = DiscountEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
