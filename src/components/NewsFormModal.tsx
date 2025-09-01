import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { NewsItem, NewsItemCreate, NewsItemUpdate, NewsCategory } from '../types/news';
import NewsPreview from './NewsPreview';

interface NewsFormModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (news: NewsItemCreate | NewsItemUpdate) => Promise<void>;
  news?: NewsItem | null;
  categories: NewsCategory[];
  isEditing: boolean;
}

const NewsFormModal: React.FC<NewsFormModalProps> = ({
  show,
  onHide,
  onSubmit,
  news,
  categories,
  isEditing
}) => {
  const [formData, setFormData] = useState<NewsItemCreate | NewsItemUpdate>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    image_url: '',
    author: '',
    source: '',
    category_id: 0,
    is_featured: false,
    is_published: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Khởi tạo form khi news thay đổi
  useEffect(() => {
    if (news && isEditing) {
      setFormData({
        title: news.title,
        slug: news.slug,
        summary: news.summary || '',
        content: news.content || '',
        image_url: news.image_url || '',
        author: news.author || '',
        source: news.source || '',
        category_id: news.category_id || 0,
        is_featured: news.is_featured,
        is_published: news.is_published
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        summary: '',
        content: '',
        image_url: '',
        author: '',
        source: '',
        category_id: categories.length > 0 ? categories[0].id : 0,
        is_featured: false,
        is_published: false
      });
    }
    setErrors({});
  }, [news, isEditing, categories]);

  // Tạo slug từ title
  const generateSlug = (title: string) => {
    return title
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Tự động tạo slug khi thay đổi title
      if (name === 'title' && !isEditing) {
        setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
      }
    }
    
    // Xóa lỗi khi user bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Tiêu đề không được để trống';
    }

    if (!formData.slug?.trim()) {
      newErrors.slug = 'Slug không được để trống';
    }

    if (!formData.content?.trim()) {
      newErrors.content = 'Nội dung không được để trống';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Vui lòng chọn danh mục';
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
      console.error('Lỗi khi lưu tin tức:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className={`fas fa-${isEditing ? 'edit' : 'plus'} me-2`}></i>
          {isEditing ? 'Sửa tin tức' : 'Thêm tin tức mới'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Tabs defaultActiveKey="form" className="mb-3">
            <Tab eventKey="form" title="Nhập liệu">
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      isInvalid={!!errors.title}
                      placeholder="Nhập tiêu đề tin tức"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
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
                      placeholder="tin-tuc-moi"
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
                    <Form.Label>Danh mục <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      isInvalid={!!errors.category_id}
                    >
                      <option value={0}>Chọn danh mục</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.category_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tác giả</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Tên tác giả"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nguồn</Form.Label>
                    <Form.Control
                      type="text"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      placeholder="Nguồn tin tức"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>URL hình ảnh</Form.Label>
                    <Form.Control
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Tóm tắt</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Tóm tắt ngắn gọn về tin tức"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  isInvalid={!!errors.content}
                  placeholder="Nhập nội dung chi tiết của tin tức"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      name="is_featured"
                      checked={formData.is_featured}
                      onChange={handleInputChange}
                      label="Tin nổi bật"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      name="is_published"
                      checked={formData.is_published}
                      onChange={handleInputChange}
                      label="Xuất bản ngay"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab>
            
            <Tab eventKey="preview" title="Xem trước">
              <NewsPreview formData={formData} categories={categories} />
            </Tab>
          </Tabs>
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

export default NewsFormModal;
