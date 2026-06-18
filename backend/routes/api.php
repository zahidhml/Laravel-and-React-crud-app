<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/create-new-post', [PostController::class, 'createNewPost']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'getPost']);
Route::get('/get-all-posts', [PostController::class, 'getAllPosts']);
Route::post('/delete-post', [PostController::class, 'deletePost']);
Route::post('/update-post/{id}', [PostController::class, 'updatePost']);
