import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Breadcrumb, Spinner, Alert } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { newsService } from '../services/newsService';
import { NewsItem } from '../types/news';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Lấy tin tức từ API thật
  const { 
    data: news, 
    isLoading, 
    error 
  } = useQuery(
    ['news-detail', slug], 
    () => slug ? newsService.getNewsBySlug(slug) : null,
    { 
      enabled: !!slug,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 phút
      cacheTime: 10 * 60 * 1000  // 10 phút
    }
  );

  // Debug: Log dữ liệu để kiểm tra - PHẢI ĐỂ TRƯỚC CÁC CONDITIONAL RETURN
  React.useEffect(() => {
    console.log('📰 NewsDetailPage - Slug:', slug);
    console.log('📰 NewsDetailPage - News:', news);
    console.log('📰 NewsDetailPage - Loading:', isLoading);
    console.log('📰 NewsDetailPage - Error:', error);
  }, [slug, news, isLoading, error]);

  // Loading state
  if (isLoading) {
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
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Có lỗi xảy ra</Alert.Heading>
          <p>Không thể tải tin tức. Vui lòng thử lại sau.</p>
          <p className="mb-0">
            <small>Chi tiết: {(error as any)?.message}</small>
          </p>
        </Alert>
      </Container>
    );
  }

  // Not found state
  if (!news) {
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
                 {news.likes_count && (
                   <span>❤️ {news.likes_count} lượt thích</span>
                 )}
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
             {news.content ? (
               <div className="news-content mb-4">
                 <div 
                   dangerouslySetInnerHTML={{ __html: news.content }}
                   className="lh-lg"
                 />
               </div>
             ) : (
               <div className="news-content mb-4">
                 <p className="lead">{news.summary}</p>
                 <p className="text-muted">Nội dung chi tiết đang được cập nhật...</p>
               </div>
             )}

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
