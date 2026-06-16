<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function createNewPost(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'status' => 'required|string|in:draft,published,archived',
            'content' => 'required|string',
        ]);

        $model = new Post();
        $model->title = $validatedData['title'];
        $model->author = $validatedData['author'];
        $model->category = $validatedData['category'];
        $model->status = $validatedData['status'];
        $model->content = $validatedData['content'];
        $model->save();

        return response()->json(['message' => 'Post created successfully', 'data' => $validatedData], 201);
    }

    public function index()
    {
        $posts = Post::latest()->get();

        return response()->json(['data' => $posts], 200);
    }
}
