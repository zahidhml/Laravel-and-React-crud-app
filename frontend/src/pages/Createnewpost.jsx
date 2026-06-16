import React from "react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import api from "../api/api";

export default function Createnewpost() {
   const [IsSubmiting,setIsSubmiting] = useState(false);
   const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    status: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };
  const handleSubmit =  async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmiting(true);

    try {
      const response = await api.post('/create-new-post', formData);
      console.log(response.data);
      alert(response.data.message || 'Post created successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error .response .status === 422 && error.response.data.errors) {
        setError(error.response.data.message || 'Validation error. Please check your input.');
        // const messages = Object.values(error.response.data.errors)
        //   .flat()
        //   .join('\n');   
        setError(messages);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmiting(false);
    }
  };

 
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <Link to="/" className="btn btn-secondary mb-3">← Back</Link>
          <h1 className="display-4">Create New Post</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Create New Post</li>
            </ol>
          </nav>
        </div>
      </div>
      {error && 
      <div className="alert alert-danger">{error}</div>
      }
      
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Post Details</h5>
        </div>
        <div className="card-body">
          <form id="post-form" onSubmit={handleSubmit}>
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
            <div className="mb-3">
        <div className="col-md-6">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" name='title' value={formData.title} onChange={handleChange} className="form-control" id="title" placeholder="Enter post title" />
            </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="author" className="form-label">Author</label>
              <input type="text" name='author' value={formData.author} onChange={handleChange} className="form-control" id="author" placeholder="Enter author name" />
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="category-select" className="form-label">Category</label>
                  
                  <select className="form-select"  id="category-select" name="category" value={formData.category} onChange={handleChange}>
                    
                    <option value="">Select a category </option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="design">Design</option>
                  </select>
                </div>
            </div>

            <div className="col-md-6 ">
              <label htmlFor="status-select" className="form-label">Status</label>
              <select className="form-select" id="status-select" name="status" value={formData.status} onChange={handleChange}>
                <option value="">Select a status</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea className="form-control" id="content" rows="8" placeholder="Enter post content" name="content" value={formData.content} onChange={handleChange}></textarea>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              {IsSubmiting ? (
                <button type="button" className="btn btn-primary">Saving....</button>
              ) : (
                <button type="submit" className="btn btn-primary">Create Post</button>
              )}
              
              <Link to="/" className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
