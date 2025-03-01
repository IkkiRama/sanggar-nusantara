<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MidtransLogResource\Pages;
use App\Filament\Resources\MidtransLogResource\RelationManagers;
use App\Models\MidtransLog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\Colors\Color;

class MidtransLogResource extends Resource
{
    protected static ?string $model = MidtransLog::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-magnifying-glass';

    protected static ?string $navigationGroup = 'Pembelian';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('transaction_id')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('order_id')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('status_code')
                    ->required()
                    ->numeric()
                    ->maxLength(10),
                Forms\Components\TextInput::make('gross_amount')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('payment_type')
                    ->required()
                    ->maxLength(50),
                Forms\Components\Select::make('transaction_status')
                    ->options([
                        "pending" => "Pending",
                        "settlement" => "Settlement",
                        "deny" => "Deny",
                        "expire" => "Expire",
                        "cancel" => "Cancel",
                        "refund" => "Refund",
                        "partial_refund" => "Partial Refund",
                        "chargeback" => "Chargeback",
                    ])
                    ->preload()
                    ->required(),
                Forms\Components\Select::make('fraud_status')
                    ->options([
                        "accept" => "Accept",
                        "deny" => "Deny",
                        "challenge" => "Challenge",
                    ])
                    ->preload()
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('midtrans_response')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('transaction_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('order_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status_code')
                    ->searchable(),
                Tables\Columns\TextColumn::make('gross_amount')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('payment_type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('transaction_status')
                    ->badge()
                    ->color(Color::Blue),
                Tables\Columns\TextColumn::make('fraud_status')
                    ->badge()
                    ->color(Color::Blue),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->color(Color::Amber),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMidtransLogs::route('/'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
