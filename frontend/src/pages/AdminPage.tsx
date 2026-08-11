import React, {
  useEffect,
  useState,
} from 'react';

import { ImageDropzone } from '../components/ImageDropzone';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
}

interface FormData {
  name: string;
  price: string;
  description: string;
  category: string;
  stock: string;
  image: File | null;
  imageUrl: string;
}

const emptyForm: FormData = {
  name: '',
  price: '',
  description: '',
  category: 'bags',
  stock: '10',
  image: null,
  imageUrl: '',
};

export const AdminPage: React.FC = () => {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [formData, setFormData] =
    useState<FormData>(emptyForm);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [error, setError] =
    useState('');

  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      setError('');

      const response =
        await fetch('/api/products');

      if (!response.ok) {
        throw new Error(
          'Failed to load products'
        );
      }

      const data =
        await response.json();

      setProducts(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {
      console.error(err);

      setError(
        'Unable to load products'
      );

    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =====================================================
  // UPDATE FORM FIELD
  // =====================================================

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =====================================================
  // UPLOAD IMAGE
  // =====================================================

  const uploadImage = async (
    file: File
  ): Promise<string> => {
    const imageData = new FormData();

    imageData.append(
      'image',
      file
    );

    const response = await fetch(
      '/api/products/upload',
      {
        method: 'POST',
        body: imageData,
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
        'Image upload failed'
      );
    }

    return result.imageUrl;
  };

  // =====================================================
  // SAVE PRODUCT
  // =====================================================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      let imageUrl =
        formData.imageUrl;

      // Upload new image
      if (formData.image) {
        imageUrl =
          await uploadImage(
            formData.image
          );
      }

      // Product JSON
      const productData = {
        name: formData.name.trim(),

        price: Number(
          formData.price
        ),

        description:
          formData.description.trim(),

        category:
          formData.category,

        stock: Number(
          formData.stock
        ),

        imageUrl,
      };

      // Validate
      if (!productData.name) {
        throw new Error(
          'Product name is required'
        );
      }

      if (
        Number.isNaN(
          productData.price
        )
      ) {
        throw new Error(
          'Enter a valid price'
        );
      }

      if (
        Number.isNaN(
          productData.stock
        )
      ) {
        throw new Error(
          'Enter a valid stock quantity'
        );
      }

      if (
        !editingId &&
        !imageUrl
      ) {
        throw new Error(
          'Please upload a product image'
        );
      }

      const url = editingId
        ? `/api/products/${editingId}`
        : '/api/products';

      const method = editingId
        ? 'PUT'
        : 'POST';

      const response =
        await fetch(
          url,
          {
            method,

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify(
              productData
            ),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          'Failed to save product'
        );
      }

      alert(
        editingId
          ? 'Product updated successfully!'
          : 'Product added successfully!'
      );

      resetForm();

      await loadProducts();

    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to save product'
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // EDIT PRODUCT
  // =====================================================

  const handleEdit = (
    product: Product
  ) => {
    setEditingId(
      product._id
    );

    setFormData({
      name: product.name,

      price:
        String(product.price),

      description:
        product.description,

      category:
        product.category,

      stock:
        String(product.stock),

      image: null,

      imageUrl:
        product.imageUrl || '',
    });

    setError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        'Are you sure you want to delete this product?'
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/products/${id}`,
          {
            method: 'DELETE',
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          'Delete failed'
        );
      }

      if (editingId === id) {
        resetForm();
      }

      await loadProducts();

      alert(
        'Product deleted successfully!'
      );

    } catch (err) {
      console.error(err);

      alert(
        err instanceof Error
          ? err.message
          : 'Delete failed'
      );
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    setFormData({
      ...emptyForm,
    });

    setEditingId(null);
    setError('');
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="admin-page">

      <div className="admin-container">

        {/* HEADER */}

        <div className="admin-header">

          <div>

            <p className="admin-eyebrow">
              STORE MANAGEMENT
            </p>

            <h1>
              Product Admin
            </h1>

            <p>
              Manage products, prices,
              stock and images.
            </p>

          </div>

          <div className="admin-count">

            <strong>
              {products.length}
            </strong>

            <span>
              Products
            </span>

          </div>

        </div>


        {/* ERROR */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}


        {/* PRODUCT FORM */}

        <div className="admin-form-card">

          <div className="section-heading">

            <div>

              <h2>
                {editingId
                  ? 'Edit Product'
                  : 'Add New Product'}
              </h2>

              <p>
                Add product information
                and upload an image.
              </p>

            </div>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}

          </div>


          <form
            onSubmit={handleSubmit}
            className="admin-form"
          >

            {/* BASIC INFORMATION */}

            <div className="form-grid">

              <div className="form-field">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  value={
                    formData.name
                  }
                  onChange={(e) =>
                    updateField(
                      'name',
                      e.target.value
                    )
                  }
                  placeholder="Example: Handmade Leather Bag"
                  required
                />

              </div>


              <div className="form-field">

                <label>
                  Price (₹)
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    formData.price
                  }
                  onChange={(e) =>
                    updateField(
                      'price',
                      e.target.value
                    )
                  }
                  placeholder="2499"
                  required
                />

              </div>


              <div className="form-field">

                <label>
                  Category
                </label>

                <select
                  value={
                    formData.category
                  }
                  onChange={(e) =>
                    updateField(
                      'category',
                      e.target.value
                    )
                  }
                >

                  <option value="bags">
                    Handbags
                  </option>

                  <option value="cloth-storage">
                    Cloth Storage
                  </option>

                  <option value="equipment">
                    Other Equipment
                  </option>

                </select>

              </div>


              <div className="form-field">

                <label>
                  Stock
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    formData.stock
                  }
                  onChange={(e) =>
                    updateField(
                      'stock',
                      e.target.value
                    )
                  }
                  placeholder="10"
                  required
                />

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="form-field">

              <label>
                Description
              </label>

              <textarea
                rows={5}
                value={
                  formData.description
                }
                onChange={(e) =>
                  updateField(
                    'description',
                    e.target.value
                  )
                }
                placeholder="Describe the product..."
                required
              />

            </div>


            {/* IMAGE */}

            <div className="form-field">

              <label>
                Product Image
              </label>

              <ImageDropzone
                value={
                  formData.imageUrl
                }
                onChange={(file) =>
                  setFormData(
                    (previous) => ({
                      ...previous,
                      image: file,
                    })
                  )
                }
              />

              <p className="upload-help">
                Drag and drop an image
                or click to browse.
                JPG, PNG or WEBP.
                Maximum 2 MB.
              </p>

            </div>


            {/* ACTIONS */}

            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >
                {loading
                  ? 'Saving...'
                  : editingId
                  ? 'Save Changes'
                  : 'Add Product'}
              </button>


              {editingId && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Clear
                </button>
              )}

            </div>

          </form>

        </div>


        {/* PRODUCT LIST */}

        <div className="admin-products">

          <div className="section-heading">

            <div>

              <h2>
                All Products
              </h2>

              <p>
                Edit or remove products
                from your store.
              </p>

            </div>

          </div>


          {loadingProducts ? (

            <div className="admin-loading">
              Loading products...
            </div>

          ) : products.length === 0 ? (

            <div className="empty-products">
              No products found.
            </div>

          ) : (

            <div className="admin-product-grid">

              {products.map(
                (product) => (

                  <div
                    className="admin-product-card"
                    key={product._id}
                  >

                    {/* IMAGE */}

                    <div className="admin-product-image">

                      {product.imageUrl ? (

                        <img
                          src={
                            product.imageUrl
                          }
                          alt={
                            product.name
                          }
                        />

                      ) : (

                        <div className="no-image">
                          📷
                        </div>

                      )}

                    </div>


                    {/* CONTENT */}

                    <div className="admin-product-content">

                      <span className="category-badge">
                        {product.category}
                      </span>


                      <h3>
                        {product.name}
                      </h3>


                      <p className="admin-description">
                        {
                          product.description
                        }
                      </p>


                      <div className="admin-product-meta">

                        <strong>
                          ₹
                          {product.price.toLocaleString(
                            'en-IN'
                          )}
                        </strong>

                        <span>
                          Stock:{' '}
                          {product.stock}
                        </span>

                      </div>


                      <div className="admin-card-actions">

                        <button
                          type="button"
                          className="edit-button"
                          onClick={() =>
                            handleEdit(
                              product
                            )
                          }
                        >
                          ✏️ Edit
                        </button>


                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            handleDelete(
                              product._id
                            )
                          }
                        >
                          🗑️ Delete
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default AdminPage;
