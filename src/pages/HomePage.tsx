import React from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { newsService } from '../services/newsService';
import { NewsItemList } from '../types/news';
import NewsCard from '../components/NewsCard';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const HomePage: React.FC = () => {
  // Lấy tin tức từ API thật
  const { 
    data: featuredNews = [], 
    isLoading: featuredLoading, 
    error: featuredError 
  } = useQuery(['featured-news'], () => newsService.getFeaturedNews(5), {
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000, // 2 phút
    cacheTime: 5 * 60 * 1000  // 5 phút
  });

  const { 
    data: latestNews = [], 
    isLoading: latestLoading, 
    error: latestError 
  } = useQuery(['latest-news'], () => newsService.getLatestNews(10), {
    refetchOnWindowFocus: false,
    staleTime: 1 * 60 * 1000, // 1 phút
    cacheTime: 3 * 60 * 1000  // 3 phút
  });

  const { 
    data: popularNews = [], 
    isLoading: popularLoading, 
    error: popularError 
  } = useQuery(['popular-news'], () => newsService.getPopularNews(5), {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 phút
    cacheTime: 10 * 60 * 1000 // 10 phút
  });

  // Debug: Log dữ liệu để kiểm tra
  React.useEffect(() => {
    console.log('🏠 HomePage - Featured News:', featuredNews);
    console.log('🏠 HomePage - Latest News:', latestNews);
    console.log('🏠 HomePage - Popular News:', popularNews);
    console.log('🏠 HomePage - Featured Loading:', featuredLoading);
    console.log('🏠 HomePage - Latest Loading:', latestLoading);
    console.log('🏠 HomePage - Popular Loading:', popularLoading);
    console.log('🏠 HomePage - Featured Error:', featuredError);
    console.log('🏠 HomePage - Latest Error:', latestError);
    console.log('🏠 HomePage - Popular Error:', popularError);
  }, [featuredNews, latestNews, popularNews, featuredLoading, latestLoading, popularLoading, featuredError, latestError, popularError]);

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

  // Loading state
  if (featuredLoading || latestLoading || popularLoading) {
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
  if (featuredError || latestError || popularError) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Có lỗi xảy ra</Alert.Heading>
          <p>Không thể tải tin tức. Vui lòng thử lại sau.</p>
          <p className="mb-0">
            <small>Chi tiết: {(featuredError as any)?.message || (latestError as any)?.message || (popularError as any)?.message}</small>
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Tin tức nổi bật */}
      {featuredNews && featuredNews.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-4 fw-bold text-primary">
            <i className="fas fa-star me-2"></i>
            Tin tức nổi bật
          </h2>
          <Row>
            {featuredNews.slice(0, 1).map((news) => (
              <Col lg={8} key={news.id}>
                <Card className="h-100 border-0 shadow-sm">
                  {news.image_url && (
                    <Card.Img
                      variant="top"
                      src={news.image_url}
                      alt={news.title}
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      <Badge 
                        bg="primary" 
                        style={{ backgroundColor: news.category.color }}
                        className="me-2"
                      >
                        {news.category.name}
                      </Badge>
                      <Badge bg="warning" text="dark">
                        Nổi bật
                      </Badge>
                    </div>
                    <Card.Title className="h3 fw-bold mb-3">
                      {news.title}
                    </Card.Title>
                    {news.summary && (
                      <Card.Text className="text-muted mb-3">
                        {news.summary}
                      </Card.Text>
                    )}
                    <div className="d-flex justify-content-between align-items-center text-muted">
                      <small>
                        {news.author && `Bởi ${news.author}`}
                      </small>
                      <small>
                        {formatDate(news.created_at)}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col lg={4}>
              <Row>
                {featuredNews.slice(1, 3).map((news) => (
                  <Col sm={6} lg={12} key={news.id} className="mb-3">
                    <NewsCard news={news} featured />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </section>
      )}

      {/* Tin tức mới nhất */}
      <section className="mb-5">
        <h2 className="mb-4 fw-bold text-success">
          <i className="fas fa-clock me-2"></i>
          Tin tức mới nhất
        </h2>
        <Row>
          {latestNews.map((news) => (
            <Col md={6} lg={4} key={news.id} className="mb-4">
              <NewsCard news={news} />
            </Col>
          ))}
        </Row>
      </section>

      {/* Tin tức phổ biến */}
      {popularNews && popularNews.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-4 fw-bold text-danger">
            <i className="fas fa-fire me-2"></i>
            Tin tức phổ biến
          </h2>
          <Row>
            {popularNews.map((news) => (
              <Col md={6} lg={4} key={news.id} className="mb-4">
                <NewsCard news={news} />
              </Col>
            ))}
          </Row>
        </section>
      )}

      {/* Thống kê */}
      <section className="bg-light p-4 rounded">
        <Row className="text-center">
          <Col md={3}>
            <h4 className="text-primary fw-bold">{latestNews.length}+</h4>
            <p className="text-muted mb-0">Tin tức mới</p>
          </Col>
          <Col md={3}>
            <h4 className="text-success fw-bold">{featuredNews.length}</h4>
            <p className="text-muted mb-0">Tin nổi bật</p>
          </Col>
          <Col md={3}>
            <h4 className="text-warning fw-bold">24/7</h4>
            <p className="text-muted mb-0">Cập nhật liên tục</p>
          </Col>
          <Col md={3}>
            <h4 className="text-danger fw-bold">100%</h4>
            <p className="text-muted mb-0">Tin chính xác</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default HomePage;
