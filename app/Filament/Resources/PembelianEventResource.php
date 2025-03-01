<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PembelianEventResource\Pages;
use App\Filament\Resources\PembelianEventResource\RelationManagers;
use App\Models\Event;
use App\Models\Order;
use App\Models\PembelianEvent;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\Colors\Color;

class PembelianEventResource extends Resource
{
    protected static ?string $model = PembelianEvent::class;

    protected static ?string $navigationIcon = 'heroicon-m-shopping-bag';

    protected static ?string $navigationGroup = 'Event';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('event_id')
                    ->relationship('event', 'id')
                    ->options(Event::all()->pluck('nama', 'id'))
                    ->required()
                    ->label("Event ID")
                    ->searchable(),
                Forms\Components\Select::make('nama')
                    ->relationship('event', 'nama')
                    ->options(Event::all()->pluck('nama', 'id'))
                    ->required()
                    ->label("Nama Event")
                    ->searchable(),
                Forms\Components\Select::make('order_id')
                    ->relationship('order', 'order_id')
                    ->options(Order::all()->pluck('order_id', 'id'))
                    ->required()
                    ->label("Orders ID")
                    ->searchable(),
                Forms\Components\TextInput::make('jumlah_tiket')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('harga')
                    ->label("Harga Event")
                    ->required(),
                Forms\Components\TextInput::make('total_harga')
                    ->label("Total Harga")
                    ->required(),
                Forms\Components\Select::make('jenis_tiket')
                    ->options([
                        "umum" => "Umum",
                        "vip" => "VIP",
                        "vvip" => "VVIP",
                        "beasiswa" => "Beasiswa",
                    ])
                    ->preload()
                    ->required(),
                Forms\Components\DatePicker::make('tanggal')
                    ->label("Tanggal Pembelian")
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('event.nama')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('jumlah_tiket')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('jenis_tiket')
                    ->searchable(),
                Tables\Columns\TextColumn::make('nama')
                    ->searchable(),
                Tables\Columns\TextColumn::make('harga')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('tanggal')
                    ->date()
                    ->sortable(),
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
            'index' => Pages\ListPembelianEvents::route('/'),
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
