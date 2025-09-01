import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { NewsItemCreate, NewsItemUpdate, NewsCategory } from '../types/news';

interface NewsPreviewProps {
  formData: NewsItemCreate | NewsItemUpdate;
  categories: NewsCategory[];
}

const NewsPreview: React.FC<NewsPreviewProps> = ({ formData, categories }) => {
  const getCategoryName = (categoryId: number | undefined) => {
    if (!categoryId) return 'Chưa chọn';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Không xác định';
  };

  const getCategoryColor = (categoryId: number | undefined) => {
    if (!categoryId) return '#6c757d';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#6c757d';
  };

  return (
    <div className="news-preview">
      <h6 className="text-muted mb-3">
        <i className="fas fa-eye me-2"></i>
        Xem trước
      </h6>
      
      <Card className="border">
        {formData.image_url && (
          <Card.Img 
            variant="top" 
            src={formData.image_url} 
            alt="Preview"
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
        
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Badge 
              bg="primary" 
              style={{ backgroundColor: getCategoryColor(formData.category_id) }}
            >
              {getCategoryName(formData.category_id)}
            </Badge>
            
            <div className="d-flex gap-1">
              {formData.is_featured && (
                <Badge bg="warning" text="dark">
                  <i className="fas fa-star me-1"></i>
                  Nổi bật
                </Badge>
              )}
              {formData.is_published ? (
                <Badge bg="success">
                  <i className="fas fa-check me-1"></i>
                  Đã xuất bản
                </Badge>
              ) : (
                <Badge bg="secondary">
                  <i className="fas fa-edit me-1"></i>
                  Bản nháp
                </Badge>
              )}
            </div>
          </div>

          <Card.Title className="h5 mb-2">
            {formData.title || 'Tiêu đề tin tức'}
          </Card.Title>

          {formData.summary && (
            <Card.Text className="text-muted mb-3">
              {formData.summary}
            </Card.Text>
          )}

          {formData.content && (
            <div className="mb-3">
              <small className="text-muted">Nội dung:</small>
              <div 
                className="mt-1 p-2 bg-light rounded"
                style={{ 
                  maxHeight: '150px', 
                  overflow: 'hidden',
                  fontSize: '0.875rem',
                  lineHeight: '1.4'
                }}
              >
                {formData.content.length > 300 
                  ? `${formData.content.substring(0, 300)}...` 
                  : formData.content
                }
              </div>
            </div>
          )}

          <Row className="text-muted small">
            {formData.author && (
              <Col md={6}>
                <i className="fas fa-user me-1"></i>
                Tác giả: {formData.author}
              </Col>
            )}
            {formData.source && (
              <Col md={6}>
                <i className="fas fa-link me-1"></i>
                Nguồn: {formData.source}
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsPreview;
