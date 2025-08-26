import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Breadcrumb } from 'react-bootstrap';
import { mockDataService } from '../services/mockDataService';
import NewsCard from '../components/NewsCard';
import { Link } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  // Lấy dữ liệu từ mock data
  const news = category ? mockDataService.getNewsByCategory(category, 20) : [];
  const categories = mockDataService.getAllCategories();
  const currentCategory = categories.find(cat => cat.slug === category);

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {currentCategory?.name || 'Danh mục'}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Header */}
      <div className="mb-5">
        <h1 className="h2 fw-bold mb-3">
          {currentCategory?.name || 'Danh mục tin tức'}
        </h1>
        {currentCategory?.description && (
          <p className="text-muted lead">{currentCategory.description}</p>
        )}
        <div className="d-flex align-items-center">
          <Badge 
            bg="primary" 
            style={{ backgroundColor: currentCategory?.color || '#007bff' }}
            className="me-3"
          >
            {news.length} tin tức
          </Badge>
        </div>
      </div>

      {/* Danh sách tin tức */}
      {news.length > 0 ? (
        <Row>
          {news.map((item) => (
            <Col md={6} lg={4} key={item.id} className="mb-4">
              <NewsCard news={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="text-center py-5">
          <Card.Body>
            <h4 className="text-muted mb-3">Không có tin tức nào</h4>
            <p className="text-muted mb-4">
              Danh mục này chưa có tin tức nào. Vui lòng quay lại sau.
            </p>
            <Link to="/" className="btn btn-primary">
              Về trang chủ
            </Link>
          </Card.Body>
        </Card>
      )}

      {/* Phân trang */}
      {news.length > 0 && (
        <div className="d-flex justify-content-center mt-5">
          <nav aria-label="Phân trang">
            <ul className="pagination">
              <li className="page-item disabled">
                <span className="page-link">Trước</span>
              </li>
              <li className="page-item active">
                <span className="page-link">1</span>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Sau</span>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </Container>
  );
};

export default CategoryPage;
