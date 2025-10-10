<?php

namespace App\Filament\Resources\UserPointBalanceResource\Pages;

use App\Filament\Resources\UserPointBalanceResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListUserPointBalances extends ListRecords
{
    protected static string $resource = UserPointBalanceResource::class;

    protected function getHeaderActions(): array
    {
        return [
        ];
    }
}
