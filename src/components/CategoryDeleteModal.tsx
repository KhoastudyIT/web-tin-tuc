import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
}

interface CategoryDeleteModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => Promise<void>;
  category: NewsCategory | null;
  isDeleting: boolean;
  newsCount?: number;
}

const CategoryDeleteModal: React.FC<CategoryDeleteModalProps> = ({
  show,
  onHide,
  onConfirm,
  category,
  isDeleting,
  newsCount = 0
}) => {
  const handleClose = () => {
    if (!isDeleting) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Xác nhận xóa danh mục
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="warning">
          <Alert.Heading>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Cảnh báo!
          </Alert.Heading>
          <p>
            Bạn có chắc chắn muốn xóa danh mục <strong>"{category?.name}"</strong> không?
          </p>
          <hr />
          <p className="mb-0">
            Hành động này không thể hoàn tác. Danh mục sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </p>
        </Alert>

        <div className="mt-3">
          <h6>Thông tin danh mục:</h6>
          <ul className="list-unstyled">
            <li><strong>Tên:</strong> {category?.name}</li>
            <li><strong>Slug:</strong> {category?.slug}</li>
            <li><strong>Màu sắc:</strong> 
              <div 
                className="d-inline-block ms-2 rounded"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: category?.color
                }}
              />
              {category?.color}
            </li>
            {category?.description && (
              <li><strong>Mô tả:</strong> {category.description}</li>
            )}
          </ul>
        </div>

        {newsCount > 0 && (
          <Alert variant="danger" className="mt-3">
            <Alert.Heading>
              <i className="fas fa-exclamation-triangle me-2"></i>
              Chú ý quan trọng!
            </Alert.Heading>
            <p>
              Danh mục này hiện có <strong>{newsCount} tin tức</strong>. 
              Nếu bạn xóa danh mục, tất cả tin tức thuộc danh mục này sẽ bị ảnh hưởng.
            </p>
            <p className="mb-0">
              <strong>Khuyến nghị:</strong> Hãy di chuyển hoặc xóa tất cả tin tức thuộc danh mục này trước khi xóa danh mục.
            </p>
          </Alert>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
          Hủy
        </Button>
        <Button 
          variant="danger" 
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Đang xóa...
            </>
          ) : (
            <>
              <i className="fas fa-trash me-2"></i>
              Xóa danh mục
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryDeleteModal;
