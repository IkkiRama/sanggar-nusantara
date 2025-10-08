<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SeniTariResource\Pages;
use App\Filament\Resources\SeniTariResource\RelationManagers;
use App\Models\SeniTari;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\Colors\Color;

class SeniTariResource extends Resource
{
    protected static ?string $model = SeniTari::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Ragam Indonesia';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('nama')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('pencipta')
                    ->maxLength(255),
                Forms\Components\TextInput::make('tahun_diciptakan')
                    ->numeric(),
                Forms\Components\TextInput::make('asal')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('kategori')
                    ->options([
                        "tradisional" => "Tradisional",
                        "modern" => "Modern",
                    ])
                    ->preload()
                    ->required(),
                Forms\Components\TextInput::make('video')
                    ->maxLength(255),
                Forms\Components\FileUpload::make('image')
                    ->image()
                    ->directory('Ragam Indonesia/Seni Tari')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('deskripsi')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('sejarah')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('lat')
                    ->required(),
                Forms\Components\TextInput::make('lng')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->square()
                    ->defaultImageUrl(url('/images/NO IMAGE AVAILABLE.jpg')),
                Tables\Columns\TextColumn::make('nama')
                    ->searchable(),
                Tables\Columns\TextColumn::make('kategori')
                    ->badge()
                    ->color(Color::Blue),
                Tables\Columns\TextColumn::make('pencipta')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tahun_diciptakan')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('asal')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
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
            'index' => Pages\ListSeniTaris::route('/'),
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
