import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { mockDataService } from '../services/mockDataService';
import { NewsCategory } from '../types/news';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Lấy danh mục tin tức từ mock data
  const categories = mockDataService.getAllCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <img 
            src="/logo.png" 
            alt="Logo" 
            height="30" 
            className="d-inline-block align-top me-2"
          />
          Tin Tức 24h
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            
            <NavDropdown title="Danh mục" id="categories-dropdown">
              {categories.map((category: NewsCategory) => (
                <NavDropdown.Item 
                  key={category.id} 
                  as={Link} 
                  to={`/category/${category.slug}`}
                >
                  {category.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            
            <Nav.Link as={Link} to="/category/the-thao">Thể thao</Nav.Link>
            <Nav.Link as={Link} to="/category/kinh-te">Kinh tế</Nav.Link>
            <Nav.Link as={Link} to="/category/giai-tri">Giải trí</Nav.Link>
            <Nav.Link as={Link} to="/category/suc-khoe">Sức khỏe</Nav.Link>
          </Nav>

          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Tìm kiếm tin tức..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              Tìm
            </Button>
          </Form>

          <Nav>
            {user ? (
              <>
                {user.is_admin && (
                  <Nav.Link as={Link} to="/admin" className="text-warning">
                    Quản trị
                  </Nav.Link>
                )}
                <NavDropdown title={user.username} id="user-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">
                    Hồ sơ
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                <Nav.Link as={Link} to="/register">Đăng ký</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
