import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Breadcrumb, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { newsService } from '../services/newsService';
import NewsCard from '../components/NewsCard';
import { NewsItemList } from '../types/news';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchParams.get('q') || '';

  // Sử dụng React Query để search
  const { 
    data: searchResults = [], 
    isLoading: isSearching, 
    error: searchError,
    refetch: refetchSearch
  } = useQuery(
    ['search-news', query], 
    () => query ? newsService.searchNews(query, 20) : Promise.resolve([]),
    { 
      enabled: !!query,
      refetchOnWindowFocus: false,
      staleTime: 1 * 60 * 1000, // 1 phút
      cacheTime: 5 * 60 * 1000  // 5 phút
    }
  );

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  // Debug: Log dữ liệu để kiểm tra
  React.useEffect(() => {
    console.log('🔍 SearchPage - Query:', query);
    console.log('🔍 SearchPage - Results:', searchResults);
    console.log('🔍 SearchPage - Loading:', isSearching);
    console.log('🔍 SearchPage - Error:', searchError);
  }, [query, searchResults, isSearching, searchError]);

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Tìm kiếm</Breadcrumb.Item>
      </Breadcrumb>

      {/* Search Form */}
      <div className="mb-5">
        <h1 className="h2 fw-bold mb-4">Tìm kiếm tin tức</h1>
        <Form onSubmit={handleSearch} className="mb-4">
          <Row className="g-2">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="lg"
              />
            </Col>
            <Col md={4}>
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-100"
                disabled={isSearching}
              >
                {isSearching ? 'Đang tìm...' : 'Tìm kiếm'}
              </Button>
            </Col>
          </Row>
        </Form>

        {query && (
          <div className="d-flex align-items-center">
            <Badge bg="info" className="me-2">
              Kết quả tìm kiếm
            </Badge>
            <span className="text-muted">
              Tìm thấy <strong>{searchResults.length}</strong> tin tức cho "{query}"
            </span>
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchError ? (
        <Alert variant="danger">
          <Alert.Heading>Có lỗi xảy ra khi tìm kiếm</Alert.Heading>
          <p>Không thể thực hiện tìm kiếm. Vui lòng thử lại sau.</p>
          <p className="mb-0">
            <small>Chi tiết: {(searchError as any)?.message}</small>
          </p>
        </Alert>
      ) : isSearching ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Đang tìm kiếm...</span>
          </Spinner>
          <p className="mt-3 text-muted">Đang tìm kiếm tin tức...</p>
        </div>
      ) : query ? (
        searchResults.length > 0 ? (
          <Row>
            {searchResults.map((news) => (
              <Col md={6} lg={4} key={news.id} className="mb-4">
                <NewsCard news={news} />
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="text-center py-5">
            <Card.Body>
              <h4 className="text-muted mb-3">Không tìm thấy kết quả</h4>
              <p className="text-muted mb-4">
                Không có tin tức nào phù hợp với từ khóa "{query}". 
                Hãy thử từ khóa khác.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <Button 
                  variant="outline-primary" 
                  onClick={() => setSearchQuery('')}
                >
                  Xóa tìm kiếm
                </Button>
                <Link to="/" className="btn btn-primary">
                  Về trang chủ
                </Link>
              </div>
            </Card.Body>
          </Card>
        )
      ) : (
        <Card className="text-center py-5">
          <Card.Body>
            <h4 className="text-muted mb-3">Bắt đầu tìm kiếm</h4>
            <p className="text-muted mb-4">
              Nhập từ khóa vào ô tìm kiếm để tìm tin tức bạn quan tâm.
            </p>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="d-grid gap-2">
                  <h6 className="text-muted mb-3">Gợi ý tìm kiếm:</h6>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {['bóng đá', 'thể thao', 'kinh doanh', 'giải trí', 'công nghệ'].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setSearchParams({ q: suggestion });
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default SearchPage;
