import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Breadcrumb, Spinner, Alert } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { newsService } from '../services/newsService';
import NewsCard from '../components/NewsCard';
import { Link } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  // Lấy dữ liệu từ API thật
  const { 
    data: news = [], 
    isLoading: newsLoading, 
    error: newsError 
  } = useQuery(
    ['category-news', category], 
    () => category ? newsService.getNewsByCategory(category, 20) : Promise.resolve([]),
    { 
      enabled: !!category,
      refetchOnWindowFocus: false,
      staleTime: 2 * 60 * 1000, // 2 phút
      cacheTime: 5 * 60 * 1000  // 5 phút
    }
  );

  const { 
    data: categories = [], 
    isLoading: categoriesLoading 
  } = useQuery(
    ['categories'], 
    () => newsService.getCategories(),
    {
      refetchOnWindowFocus: false,
      staleTime: 10 * 60 * 1000, // 10 phút
      cacheTime: 20 * 60 * 1000  // 20 phút
    }
  );

  const currentCategory = categories.find(cat => cat.slug === category);

  // Debug: Log dữ liệu để kiểm tra
  React.useEffect(() => {
    console.log('📁 CategoryPage - Category:', category);
    console.log('📁 CategoryPage - News:', news);
    console.log('📁 CategoryPage - Categories:', categories);
    console.log('📁 CategoryPage - Current Category:', currentCategory);
  }, [category, news, categories, currentCategory]);

  // Loading state
  if (newsLoading || categoriesLoading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
          <p className="mt-3 text-muted">Đang tải tin tức...</p>
        </div>
      </Container>
    );
  }

  // Error state
  if (newsError) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Có lỗi xảy ra</Alert.Heading>
          <p>Không thể tải tin tức. Vui lòng thử lại sau.</p>
          <p className="mb-0">
            <small>Chi tiết: {(newsError as any)?.message}</small>
          </p>
        </Alert>
      </Container>
    );
  }

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
