import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
}

interface CategoryFormModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (category: Partial<NewsCategory>) => Promise<void>;
  category?: NewsCategory | null;
  isEditing: boolean;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  show,
  onHide,
  onSubmit,
  category,
  isEditing
}) => {
  const [formData, setFormData] = useState<Partial<NewsCategory>>({
    name: '',
    slug: '',
    description: '',
    color: '#007bff',
    icon: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Khởi tạo form khi category thay đổi
  useEffect(() => {
    if (category && isEditing) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        color: category.color,
        icon: category.icon || ''
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
        color: '#007bff',
        icon: ''
      });
    }
    setErrors({});
  }, [category, isEditing]);

  // Tạo slug từ name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[đĐ]/g, 'd')
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Tự động tạo slug khi thay đổi name
    if (name === 'name' && !isEditing) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
    
    // Xóa lỗi khi user bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Tên danh mục không được để trống';
    }

    if (!formData.slug?.trim()) {
      newErrors.slug = 'Slug không được để trống';
    }

    if (!formData.color?.trim()) {
      newErrors.color = 'Màu sắc không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onHide();
    } catch (error) {
      console.error('Lỗi khi lưu danh mục:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onHide();
    }
  };

  // Danh sách màu sắc mẫu
  const colorOptions = [
    '#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1',
    '#fd7e14', '#20c997', '#e83e8c', '#6c757d', '#17a2b8'
  ];

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className={`fas fa-${isEditing ? 'edit' : 'plus'} me-2`}></i>
          {isEditing ? 'Sửa danh mục' : 'Thêm danh mục mới'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Tên danh mục <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  isInvalid={!!errors.name}
                  placeholder="Nhập tên danh mục"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Slug <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  isInvalid={!!errors.slug}
                  placeholder="danh-muc-moi"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.slug}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Màu sắc <span className="text-danger">*</span></Form.Label>
                <div className="d-flex gap-2 align-items-center">
                  <Form.Control
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    isInvalid={!!errors.color}
                    style={{ width: '60px', height: '38px' }}
                  />
                  <Form.Control
                    type="text"
                    value={formData.color}
                    onChange={handleInputChange}
                    name="color"
                    isInvalid={!!errors.color}
                    placeholder="#007bff"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.color}
                </Form.Control.Feedback>
                
                {/* Màu sắc mẫu */}
                <div className="mt-2">
                  <small className="text-muted">Màu sắc mẫu:</small>
                  <div className="d-flex gap-1 mt-1">
                    {colorOptions.map((color) => (
                      <div
                        key={color}
                        className="rounded"
                        style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: color,
                          cursor: 'pointer',
                          border: formData.color === color ? '2px solid #000' : '1px solid #ddd'
                        }}
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Icon (FontAwesome)</Form.Label>
                <Form.Control
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="fas fa-folder"
                />
                <Form.Text className="text-muted">
                  Ví dụ: fas fa-folder, fas fa-newspaper, fas fa-globe
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Mô tả ngắn gọn về danh mục"
            />
          </Form.Group>

          {/* Preview */}
          {formData.name && (
            <div className="mt-3 p-3 bg-light rounded">
              <h6 className="text-muted mb-2">Xem trước:</h6>
              <div className="d-flex align-items-center">
                <div
                  className="me-2 rounded"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: formData.color
                  }}
                />
                <span className="fw-bold">{formData.name}</span>
                {formData.icon && (
                  <i className={`${formData.icon} ms-2 text-muted`}></i>
                )}
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Đang lưu...
              </>
            ) : (
              <>
                <i className={`fas fa-${isEditing ? 'save' : 'plus'} me-2`}></i>
                {isEditing ? 'Cập nhật' : 'Thêm mới'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryFormModal;
