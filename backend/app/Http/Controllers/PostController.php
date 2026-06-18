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

    public function getPost($id)
    {
        $post = Post::findOrFail($id);

        return response()->json(['data' => $post], 200);
    }

    public function deletePost(Request $request)
    {
        $request->validate([
            'deleteid' => 'required|integer|exists:posts,id',
        ]);

        Post::where('id', $request->deleteid)->delete();

        return response()->json(['message' => 'Post deleted successfully'], 200);
    }

    public function updatePost(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'status' => 'required|string|in:draft,published,archived',
            'content' => 'required|string',
        ]);

        $post = Post::findOrFail($id);
        $post->title = $validatedData['title'];
        $post->author = $validatedData['author'];
        $post->category = $validatedData['category'];
        $post->status = $validatedData['status'];
        $post->content = $validatedData['content'];
        $post->save();

        return response()->json(['message' => 'Post updated successfully', 'data' => $post], 200);
    }
}
