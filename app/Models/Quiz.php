<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory, SoftDeletes;

    protected $guarded = ["id"];

    protected $casts = [
        'is_premium' => 'boolean',
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    // public function quizQuestions()
    // {
    //     return $this->belongsToMany(
    //         \App\Models\QuizQuestion::class,
    //         'quiz_quiz_questions', // 👉 nama tabel pivot
    //         'quiz_id',
    //         'quiz_question_id'
    //     )->withTimestamps()
    //     ->withPivot('id');
    // }

    // Setiap kuis punya banyak pivot (QuizQuizQuestion)
    public function quizQuizQuestions()
    {
        return $this->hasMany(QuizQuizQuestion::class);
    }

    // Shortcut buat ambil langsung pertanyaannya
    public function quizQuestions()
    {
        return $this->hasManyThrough(
            QuizQuestion::class,
            QuizQuizQuestion::class,
            'quiz_id',            // Foreign key di pivot
            'id',                 // Foreign key di QuizQuestion
            'id',                 // Local key di Quiz
            'quiz_question_id'    // Local key di pivot
        );
    }

    /* Relasi ke attempt (hasil kuis user) */
    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function getQuizQuestionsCountAttribute()
    {
        return $this->quizQuestions()->count();
    }
}
