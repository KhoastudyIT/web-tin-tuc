import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Breadcrumb } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { newsService } from '../services/newsService';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: news, isLoading, error } = useQuery(
    ['news', slug],
    () => newsService.getNewsBySlug(slug!),
    {
      enabled: !!slug,
    }
  );

  if (isLoading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (error || !news) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h3>Không tìm thấy tin tức</h3>
          <p className="text-muted">Tin tức bạn đang tìm kiếm không tồn tại.</p>
          <Link to="/" className="btn btn-primary">
            Về trang chủ
          </Link>
        </div>
      </Container>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: vi
      });
    } catch {
      return 'Vừa xong';
    }
  };

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/category/${news.category.slug}` }}>
          {news.category.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{news.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col lg={8}>
          {/* Tin tức chính */}
          <article>
            <header className="mb-4">
              <div className="mb-3">
                <Badge 
                  bg="primary" 
                  style={{ backgroundColor: news.category.color }}
                  className="me-2"
                >
                  {news.category.name}
                </Badge>
                {news.is_featured && (
                  <Badge bg="warning" text="dark">
                    Nổi bật
                  </Badge>
                )}
              </div>
              
              <h1 className="h2 fw-bold mb-3">{news.title}</h1>
              
              {news.summary && (
                <p className="lead text-muted mb-3">{news.summary}</p>
              )}
              
              <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                <span>
                  {news.author && `Bởi ${news.author}`}
                </span>
                <span>
                  {formatDate(news.created_at)}
                </span>
              </div>
              
              <div className="d-flex justify-content-between align-items-center text-muted small">
                <span>👁️ {news.views_count} lượt xem</span>
                <span>❤️ {news.likes_count} lượt thích</span>
              </div>
            </header>

            {/* Hình ảnh */}
            {news.image_url && (
              <div className="mb-4">
                <img
                  src={news.image_url}
                  alt={news.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Nội dung */}
            <div className="news-content mb-4">
              <div 
                dangerouslySetInnerHTML={{ __html: news.content }}
                className="lh-lg"
              />
            </div>

            {/* Nguồn */}
            {news.source && (
              <div className="text-muted small mb-4">
                <strong>Nguồn:</strong> {news.source}
              </div>
            )}
          </article>
        </Col>

        <Col lg={4}>
          {/* Sidebar */}
          <div className="sticky-top" style={{ top: '2rem' }}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Tin liên quan</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted">Tính năng đang phát triển...</p>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h5 className="mb-0">Danh mục</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Link 
                    to={`/category/${news.category.slug}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    {news.category.name}
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetailPage;
