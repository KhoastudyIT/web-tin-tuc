import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="mb-3">Tin Tức 24h</h5>
            <p className="text-muted">
              Website tin tức hàng đầu Việt Nam, cập nhật tin tức mới nhất, 
              nhanh nhất và chính xác nhất về mọi lĩnh vực trong cuộc sống.
            </p>
          </Col>
          
          <Col md={4} className="mb-4">
            <h5 className="mb-3">Danh mục</h5>
            <ul className="list-unstyled">
              <li><a href="/category/the-thao" className="text-muted text-decoration-none">Thể thao</a></li>
              <li><a href="/category/kinh-te" className="text-muted text-decoration-none">Kinh tế</a></li>
              <li><a href="/category/giai-tri" className="text-muted text-decoration-none">Giải trí</a></li>
              <li><a href="/category/suc-khoe" className="text-muted text-decoration-none">Sức khỏe</a></li>
              <li><a href="/category/cong-nghe" className="text-muted text-decoration-none">Công nghệ</a></li>
            </ul>
          </Col>
          
          <Col md={4} className="mb-4">
            <h5 className="mb-3">Liên hệ</h5>
            <ul className="list-unstyled text-muted">
              <li>📧 Email: contact@tintuc24h.com</li>
              <li>📞 Hotline: 1900-xxxx</li>
              <li>🏢 Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
            
            <div className="mt-3">
              <a href="#" className="text-muted me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-muted me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-muted me-3">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              © 2024 Tin Tức 24h. Tất cả quyền được bảo lưu.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
