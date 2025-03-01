<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Discount;
use App\Models\Order;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\Colors\Color;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-m-shopping-bag';

    protected static ?string $navigationGroup = 'Pembelian';

    protected static ?string $navigationLabel = 'Pembelian';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'id')
                    ->options(User::all()->pluck('name', 'id'))
                    ->searchable()
                    ->required(),
                Forms\Components\Select::make('discount_id')
                    ->label('Discount')
                    ->options(Discount::pluck('name', 'id'))
                    ->searchable()
                    ->nullable(),
                Forms\Components\TextInput::make('total_pembelian')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('discount_amount')
                    ->label('Discount Amount')
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('total_akhir')
                    ->required()
                    ->numeric()
                    ->columnSpanFull(),
                Forms\Components\Select::make('status_pembelian')
                    ->options([
                        "pending" => "Pending",
                        "sudah dibayar" => "Sudah Dibayar",
                        "kadaluarsa" => "Kadaluarsa",
                        "gagal" => "Gagal",
                        "dibatalkan" => "Dibatalkan",
                        "dikembalikan" => "Dikembalikan",
                    ])
                    ->preload()
                    ->required(),
                Forms\Components\Select::make('metode_pembayaran')
                    ->options([
                        "midtrans" => "Midtrans",
                        "qris" => "QRIS",
                        "ewallet" => "E-wallet",
                        "manual_transfer" => "Manual Transfer",
                    ])
                    ->preload()
                    ->required(),
                Forms\Components\TextInput::make('order_id')
                    ->required()
                    ->label("Order id (Id dari Midtrans)")
                    ->maxLength(255),
                Forms\Components\TextInput::make('transaction_id')
                    ->maxLength(255),
                Forms\Components\Textarea::make('payment_url')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('midtrans_response')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_pembelian')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status_pembelian')
                    ->badge()
                    ->color(Color::Blue),
                Tables\Columns\TextColumn::make('order_id')
                    ->label("Order Id(Id dari Midtrans)")
                    ->searchable(),
                Tables\Columns\TextColumn::make('metode_pembayaran'),
                Tables\Columns\TextColumn::make('transaction_id')
                    ->searchable(),
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
            'index' => Pages\ListOrders::route('/'),
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
