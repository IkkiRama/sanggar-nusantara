<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AlatMusikResource\Pages;
use App\Filament\Resources\AlatMusikResource\RelationManagers;
use App\Models\AlatMusik;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Support\Colors\Color;

class AlatMusikResource extends Resource
{
    protected static ?string $model = AlatMusik::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Ragam Indonesia';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('nama')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('asal')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('cara_main')
                    ->options([
                        "dipetik" => "Dipetik",
                        "ditiup" => "Ditiup",
                        "dipukul" => "Dipukul",
                        "digesek" => "Digesek",
                    ])
                    ->preload()
                    ->required(),
                Forms\Components\TextInput::make('video')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('lat')
                    ->required()
                    ->label("latitude"),
                Forms\Components\TextInput::make('lng')
                    ->required()
                    ->label("longitude"),
                Forms\Components\FileUpload::make('image')
                    ->disk('public')
                    ->image()
                    ->directory('Ragam Indonesia/Alat Musik')
                    ->required(),
                Forms\Components\FileUpload::make('audio')
                    ->disk('public')
                    ->directory('Ragam Indonesia/Alat Musik')
                    ->required()
                    ->acceptedFileTypes(['audio/mpeg', 'audio/wav', 'audio/ogg'])
                    ->maxSize(10240), // Contoh batasan ukuran maksimal 10MB
                Forms\Components\Textarea::make('excerpt')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('deskripsi')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('nama')
                    ->searchable(),
                Tables\Columns\TextColumn::make('cara_main')
                    ->badge()
                    ->color(Color::Blue),
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
            'index' => Pages\ListAlatMusiks::route('/'),
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
