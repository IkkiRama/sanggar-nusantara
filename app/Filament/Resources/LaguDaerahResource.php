<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LaguDaerahResource\Pages;
use App\Filament\Resources\LaguDaerahResource\RelationManagers;
use App\Models\LaguDaerah;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\Colors\Color;

class LaguDaerahResource extends Resource
{
    protected static ?string $model = LaguDaerah::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Ragam Indonesia';

    protected static ?int $navigationSort = 2;

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
                Forms\Components\Select::make('kategori')
                    ->options([
                        "tradisional" => "Tradisional",
                        "modern" => "Modern",
                    ])
                    ->preload()
                    ->required(),
                Forms\Components\FileUpload::make('image')
                    ->disk('public')
                    ->image()
                    ->directory('Ragam Indonesia/Lagu Daerah')
                    ->required(),
                Forms\Components\FileUpload::make('audio')
                    ->disk('public')
                    ->directory('Ragam Indonesia/Lagu Daerah')
                    ->required()
                    ->acceptedFileTypes(['audio/mpeg', 'audio/wav', 'audio/ogg'])
                    ->maxSize(10240), // Contoh batasan ukuran maksimal 10MB,
                Forms\Components\TextInput::make('video')
                    ->maxLength(255),
                Forms\Components\TextInput::make('asal')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('lat')
                    ->required(),
                Forms\Components\TextInput::make('lng')
                    ->required(),
                Forms\Components\Textarea::make('lirik')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('sejarah')
                    ->columnSpanFull(),
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
            'index' => Pages\ListLaguDaerahs::route('/'),
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
