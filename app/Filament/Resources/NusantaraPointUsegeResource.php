<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NusantaraPointUsegeResource\Pages;
use App\Filament\Resources\NusantaraPointUsegeResource\RelationManagers;
use App\Models\NusantaraPointUsage;
use App\Models\NusantaraPointUsege;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NusantaraPointUsegeResource extends Resource
{
    protected static ?string $model = NusantaraPointUsage::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = '💰 Poin Management';
    protected static ?string $navigationLabel = 'Point yang Digunakan';
    protected static ?string $pluralLabel = 'Point yang Digunakan';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('User')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required(),

                Forms\Components\Select::make('order_id')
                    ->label('Order')
                    ->relationship('order', 'id')
                    ->searchable()
                    ->required(),

                Forms\Components\TextInput::make('points_used')
                    ->label('Poin Digunakan')
                    ->numeric()
                    ->minValue(1)
                    ->required()
                    ->suffix('pts'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('User')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('order.id')
                    ->label('Order ID')
                    ->sortable(),

                TextColumn::make('points_used')
                    ->label('Poin Digunakan')
                    ->badge()
                    ->color('danger')
                    ->suffix(' pts')
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Tanggal Penggunaan')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('user_id')
                    ->relationship('user', 'name')
                    ->label('User'),

                SelectFilter::make('order_id')
                    ->relationship('order', 'id')
                    ->label('Order'),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->color('warning'),
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
            'index' => Pages\ListNusantaraPointUseges::route('/'),
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
