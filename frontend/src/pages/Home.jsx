import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import moment from 'moment';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get('/posts');
        setPosts(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4">Post Management System</h1>
          <p className="lead">Manage Your post efficiently</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Posts</h5>

          <Link to="/create-new-post" className="btn btn-primary">
            <i className="fas fa-plus"></i> Create Post
          </Link>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">Loading posts...</div>
          ) : error ? (
            <div className="text-danger text-center py-4">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-4">No posts found.</div>
          ) : (
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody id="post-table-body">
                {posts.map((post, index) => (
                  <tr key={post.id}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.category}</td>
                    <td>
                      <span className={
                        post.status === 'published'
                          ? 'badge bg-success'
                          :post.status === 'draft'

                          ? 'badge bg-danger'
                            : post.status === 'archived'
                            ? 'badge bg-warning text-dark'
                          : 'badge bg-secondary'
                          
                      }>
                        {post.status}
                      </span>
                    </td>
                    <td>{moment(post.created_at).format('MM/DD/YYYY  hh:mm A')}</td>
                    <td className="action-btns">
                      <a href={`edit.html?id=${post.id}`} className="btn btn-sm btn-primary">
                        <i className="fas fa-edit"></i> 
                      </a>
                      <button
                        className="btn btn-sm btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        data-post-id={post.id}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              Are you sure you want to delete this post?
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}