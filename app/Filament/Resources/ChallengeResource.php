<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ChallengeResource\Pages;
use App\Filament\Resources\ChallengeResource\RelationManagers;
use App\Models\Challenge;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Set;
use Illuminate\Support\Str;

class ChallengeResource extends Resource
{
    protected static ?string $model = Challenge::class;

    protected static ?string $navigationIcon = 'heroicon-o-flag';
    protected static ?string $navigationGroup = '🎯 Challenges';
    protected static ?string $navigationLabel = 'Challenge List';
    protected static ?string $slug = 'challenges';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Challenge Title')
                    ->required()
                    ->unique()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),

                Forms\Components\TextInput::make('slug')
                    ->helperText('Slug will be generated automatically from the title.')
                    ->readOnly()
                    ->required()
                    ->maxLength(255)
                    ->unique(),

                Forms\Components\TextInput::make('nusantara_points')
                    ->label('Reward Points')
                    ->numeric()
                    ->required()
                    ->helperText('Poin yang akan diterima user setelah menyelesaikan challenge ini.'),

                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'premium' => 'Premium',
                        'gratis'  => 'Gratis',
                    ])
                    ->default('gratis')
                    ->required()
                    ->helperText('Tentukan apakah challenge ini berbayar (premium) atau gratis.'),

                Forms\Components\FileUpload::make('image')
                    ->label('Challenge Image')
                    ->image()
                    ->directory('challenges')
                    ->columnSpanFull()
                    ->nullable(),

                Forms\Components\Textarea::make('description')
                    ->label('Description')
                    ->rows(4)
                    ->columnSpanFull()
                    ->required(),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Image')
                    ->square()
                    ->defaultImageUrl(url('/images/NO IMAGE AVAILABLE.jpg')),

                TextColumn::make('title')
                    ->label('Title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('nusantara_points')
                    ->label('Points')
                    ->sortable()
                    ->badge()
                    ->color('success'),

                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                Tables\Filters\Filter::make('high_points')
                    ->label('Reward > 100 Points')
                    ->query(fn ($query) => $query->where('nusantara_points', '>', 100)),
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
            'index' => Pages\ListChallenges::route('/'),
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
