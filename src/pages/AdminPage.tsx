import React from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from 'react-query';
import { newsService } from '../services/newsService';


const AdminPage: React.FC = () => {
  const { user } = useAuth();

  // Lấy danh sách tin tức
  const { data: news = [], isLoading: newsLoading } = useQuery(
    'admin-news',
    () => newsService.getNews(undefined, 50, 0),
    { enabled: !!user?.is_admin }
  );

  // Lấy danh sách danh mục
  const { data: categories = [], isLoading: categoriesLoading } = useQuery(
    'admin-categories',
    () => newsService.getCategories(),
    { enabled: !!user?.is_admin }
  );

  // Kiểm tra quyền admin
  if (!user || !user.is_admin) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Không có quyền truy cập</Alert.Heading>
          <p>Bạn cần quyền admin để truy cập trang này.</p>
        </Alert>
      </Container>
    );
  }

  if (newsLoading || categoriesLoading) {
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

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-primary mb-2">
          <i className="fas fa-cogs me-2"></i>
          Trang quản trị
        </h1>
        <p className="text-muted">Quản lý website tin tức</p>
      </div>

      <Row>
        {/* Thống kê tổng quan */}
        <Col lg={3} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <div className="text-primary mb-2">
                <i className="fas fa-newspaper fa-2x"></i>
              </div>
              <h4 className="fw-bold">{news.length}</h4>
              <p className="text-muted mb-0">Tin tức</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <div className="text-success mb-2">
                <i className="fas fa-folder fa-2x"></i>
              </div>
              <h4 className="fw-bold">{categories.length}</h4>
              <p className="text-muted mb-0">Danh mục</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <div className="text-warning mb-2">
                <i className="fas fa-star fa-2x"></i>
              </div>
              <h4 className="fw-bold">
                {news.filter(item => item.is_featured).length}
              </h4>
              <p className="text-muted mb-0">Tin nổi bật</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <div className="text-info mb-2">
                <i className="fas fa-eye fa-2x"></i>
              </div>
              <h4 className="fw-bold">
                {news.reduce((total, item) => total + item.views_count, 0)}
              </h4>
              <p className="text-muted mb-0">Lượt xem</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Quản lý tin tức */}
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-newspaper me-2"></i>
                Quản lý tin tức
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">
                  Hiển thị {news.length} tin tức gần nhất
                </span>
                <Button variant="success" size="sm">
                  <i className="fas fa-plus me-2"></i>
                  Thêm tin tức
                </Button>
              </div>

              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Tiêu đề</th>
                      <th>Danh mục</th>
                      <th>Trạng thái</th>
                      <th>Lượt xem</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {news.slice(0, 10).map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="fw-bold" style={{ maxWidth: '200px' }}>
                            {item.title}
                          </div>
                        </td>
                        <td>
                          <Badge 
                            bg="primary" 
                            style={{ backgroundColor: item.category.color }}
                          >
                            {item.category.name}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={item.is_published ? 'success' : 'secondary'}>
                            {item.is_published ? 'Đã xuất bản' : 'Bản nháp'}
                          </Badge>
                        </td>
                        <td>{item.views_count}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-1">
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Quản lý danh mục */}
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">
                <i className="fas fa-folder me-2"></i>
                Quản lý danh mục
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">
                  {categories.length} danh mục
                </span>
                <Button variant="success" size="sm">
                  <i className="fas fa-plus me-2"></i>
                  Thêm danh mục
                </Button>
              </div>

              <div className="d-grid gap-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="d-flex justify-content-between align-items-center p-2 border rounded"
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="me-2 rounded"
                        style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: category.color
                        }}
                      ></div>
                      <span className="fw-bold">{category.name}</span>
                    </div>
                    <div>
                      <Button variant="outline-primary" size="sm" className="me-1">
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Thông tin hệ thống */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Thông tin hệ thống
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Thông tin người dùng</h6>
                  <ul className="list-unstyled">
                    <li><strong>Email:</strong> {user.email}</li>
                    <li><strong>Tên đăng nhập:</strong> {user.username}</li>
                    <li><strong>Vai trò:</strong> Quản trị viên</li>
                    <li><strong>Trạng thái:</strong> 
                      <Badge bg={user.is_active ? 'success' : 'danger'} className="ms-2">
                        {user.is_active ? 'Hoạt động' : 'Không hoạt động'}
                      </Badge>
                    </li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>Thông tin hệ thống</h6>
                  <ul className="list-unstyled">
                    <li><strong>Phiên bản:</strong> 1.0.0</li>
                    <li><strong>Framework:</strong> React + FastAPI</li>
                    <li><strong>Database:</strong> SQLite</li>
                    <li><strong>Thời gian hoạt động:</strong> 24/7</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
