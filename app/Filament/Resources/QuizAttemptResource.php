<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuizAttemptResource\Pages;
use App\Filament\Resources\QuizAttemptResource\RelationManagers;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class QuizAttemptResource extends Resource
{
    protected static ?string $model = QuizAttempt::class;

    protected static ?string $navigationIcon = 'heroicon-s-clipboard-document-list';
    protected static ?string $navigationLabel = 'Pengerjaan Kuis';
    protected static ?string $pluralLabel = 'Pengerjaan Kuis';
    protected static ?string $modelLabel = 'Pengerjaan Kuis';
    protected static ?string $navigationGroup = '🧠 Kuis Nusantara';
    protected static ?string $pluralModelLabel = 'Daftar Pengerjaan Kuis';
    protected static ?string $slug = 'pengerjaan-kuis';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('User')
                    ->options(User::all()->pluck('name', 'id')->toArray()) // key=id, value=name
                    ->required()
                    ->searchable(),

                Select::make('quiz_id')
                    ->label('Kuis')
                    ->options(Quiz::all()->pluck('title', 'id')->toArray())
                    ->required()
                    ->searchable(),
                DateTimePicker::make('started_at')
                    ->label('Mulai')
                    ->required()
                    ->required(),
                DateTimePicker::make('finished_at')
                    ->label('Selesai')
                    ->required(),
                TextInput::make('score')
                    ->label('Skor')
                    ->numeric()
                    ->default(0)
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('recomendation')
                    ->label('Rekomendasi')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
             ->columns([
                TextColumn::make('user.name')->label('User'),
                TextColumn::make('quiz.title')->label('Kuis'),
                TextColumn::make('score')->label('Skor'),
                TextColumn::make('recomendation')->label('Rekomendasi')->limit(50),
                TextColumn::make('started_at')->label('Mulai')->dateTime('d M Y H:i'),
                TextColumn::make('finished_at')->label('Selesai')->dateTime('d M Y H:i'),
            ])
            ->defaultSort('started_at', 'desc')
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->color("info"),
                Tables\Actions\EditAction::make()
                    ->color("warning"),
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
            'index' => Pages\ListQuizAttempts::route('/'),
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
