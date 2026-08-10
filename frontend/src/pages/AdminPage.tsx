import React, { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
}

interface ProductForm {
  name: string;
  price: string;
  description: string;
  category: string;
  imageUrl: string;
  stock: string;
}

const emptyForm: ProductForm = {
  name: '',
  price: '',
  description: '',
  category: 'bags',
  imageUrl: '',
  stock: '10',
};

export const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');

      if (!response.ok) {
        throw new Error('Failed to load products');
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setMessage('Failed to load products');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    const productData = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      category: form.category,
      imageUrl: form.imageUrl,
      stock: Number(form.stock),
    };

    try {
      const url = editingId
        ? `/api/products/${editingId}`
        : '/api/products';

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      setMessage(
        editingId
          ? 'Product updated successfully!'
          : 'Product added successfully!'
      );

      resetForm();
      await loadProducts();
    } catch (error) {
      console.error(error);
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
      stock: String(product.stock ?? 10),
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete product');
      }

      setMessage('Product deleted successfully!');

      if (editingId === id) {
        resetForm();
      }

      await loadProducts();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : 'Failed to delete product'
      );
    }
  };

  return (
    <div className="admin-page">

      <div className="admin-header">
        <div>
          <span className="admin-label">ADMIN DASHBOARD</span>
          <h1>Product Management</h1>
          <p>
            Add, edit, update prices, manage stock and remove products.
          </p>
        </div>

        <div className="admin-count">
          <strong>{products.length}</strong>
          <span>Products</span>
        </div>
      </div>


      {message && (
        <div className="admin-message">
          {message}
        </div>
      )}


      {/* PRODUCT FORM */}

      <div className="admin-form-card">

        <div className="admin-card-header">
          <div>
            <h2>
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>

            <p>
              {editingId
                ? 'Update the product information below.'
                : 'Enter the details of your new product.'}
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              className="admin-cancel"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>


        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-grid">

            <div className="admin-field">
              <label>Product Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Handcrafted Leather Tote"
                required
              />
            </div>


            <div className="admin-field">
              <label>Price (₹)</label>

              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="2499"
                required
              />
            </div>


            <div className="admin-field">
              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="bags">Handbags</option>
                <option value="cloth-storage">
                  Cloth Storage
                </option>
                <option value="equipment">
                  Other Equipment
                </option>
              </select>
            </div>


            <div className="admin-field">
              <label>Stock</label>

              <input
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>

          </div>


          <div className="admin-field">
            <label>Image URL</label>

            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="/images/bags/product.jpeg"
              required
            />

            <small>
              Example:
              /images/bags/product.jpeg
            </small>
          </div>


          <div className="admin-field">
            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter product description..."
              required
            />
          </div>


          <div className="admin-form-actions">

            <button
              type="submit"
              className="admin-save"
              disabled={loading}
            >
              {loading
                ? 'Saving...'
                : editingId
                  ? 'Update Product'
                  : 'Add Product'}
            </button>

            {editingId && (
              <button
                type="button"
                className="admin-secondary"
                onClick={resetForm}
              >
                Clear
              </button>
            )}

          </div>

        </form>
      </div>


      {/* PRODUCTS */}

      <div className="admin-products">

        <div className="admin-products-header">
          <div>
            <h2>All Products</h2>
            <p>
              Manage your current products.
            </p>
          </div>
        </div>


        {products.length === 0 ? (
          <div className="admin-empty">
            No products found.
          </div>
        ) : (

          <div className="admin-product-grid">

            {products.map((product) => (

              <div
                className="admin-product-card"
                key={product._id}
              >

                <div className="admin-product-image">

                  <img
                    src={product.imageUrl}
                    alt={product.name}
                  />

                  <span>
                    {product.category}
                  </span>

                </div>


                <div className="admin-product-content">

                  <h3>{product.name}</h3>

                  <p className="admin-product-description">
                    {product.description}
                  </p>


                  <div className="admin-product-details">

                    <strong>
                      ₹{product.price.toLocaleString('en-IN')}
                    </strong>

                    <span>
                      Stock: {product.stock}
                    </span>

                  </div>


                  <div className="admin-product-actions">

                    <button
                      type="button"
                      className="admin-edit"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-delete"
                      onClick={() =>
                        handleDelete(
                          product._id,
                          product.name
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminPage;
