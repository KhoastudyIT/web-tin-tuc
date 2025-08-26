import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { toast } from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: user?.username || '',
    full_name: user?.full_name || '',
    avatar_url: user?.avatar_url || ''
  });

  if (!user) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h3>Vui lòng đăng nhập</h3>
          <p className="text-muted">Bạn cần đăng nhập để xem hồ sơ.</p>
        </div>
      </Container>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authService.updateUser(user.id, formData);
      toast.success('Cập nhật hồ sơ thành công!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Cập nhật thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Hồ sơ người dùng</h3>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Row>
                <Col md={4} className="text-center mb-4">
                  <div className="mb-3">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt="Avatar"
                        className="rounded-circle"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto"
                        style={{ width: '120px', height: '120px' }}
                      >
                        <i className="fas fa-user fa-3x text-white"></i>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <Badge bg={user.is_active ? 'success' : 'danger'} className="me-2">
                      {user.is_active ? 'Hoạt động' : 'Không hoạt động'}
                    </Badge>
                    {user.is_admin && (
                      <Badge bg="warning" text="dark">
                        Admin
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                    className="w-100"
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Đăng xuất
                  </Button>
                </Col>

                <Col md={8}>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={user.email}
                            disabled
                            className="bg-light"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tên đăng nhập</Form.Label>
                          <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Nhập họ và tên đầy đủ"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>URL Avatar</Form.Label>
                      <Form.Control
                        type="url"
                        name="avatar_url"
                        value={formData.avatar_url}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </Form.Group>

                    <div className="mb-3">
                      <Form.Label>Thông tin khác</Form.Label>
                      <div className="bg-light p-3 rounded">
                        <p className="mb-1">
                          <strong>Ngày tạo:</strong> {new Date(user.created_at).toLocaleDateString('vi-VN')}
                        </p>
                        {user.last_login && (
                          <p className="mb-0">
                            <strong>Lần đăng nhập cuối:</strong> {new Date(user.last_login).toLocaleString('vi-VN')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      {isEditing ? (
                        <>
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                              setIsEditing(false);
                              setFormData({
                                username: user.username,
                                full_name: user.full_name || '',
                                avatar_url: user.avatar_url || ''
                              });
                            }}
                          >
                            Hủy
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          variant="primary"
                          onClick={() => setIsEditing(true)}
                        >
                          <i className="fas fa-edit me-2"></i>
                          Chỉnh sửa hồ sơ
                        </Button>
                      )}
                    </div>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
