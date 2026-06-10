import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
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
          <div className="table-responsive">
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
                {/* <tr>
                  <td>1</td>

                  <td>
                    <a href="view.html?id=1">
                      Getting Started with Bootstrap 5
                    </a>
                  </td>

                  <td>John Doe</td>
                  <td>web development</td>

                  <td>
                    <span className="badge bg-success">Published</span>
                  </td>

                  <td>2026-07-21</td>

                  <td className="action-btns">
                    <a
                      href="edit.html?id=1"
                      className="btn btn-sm btn-primary"
                    >
                      <i className="fas fa-edit"></i>
                    </a>

                    <button className="btn btn-sm btn-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
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