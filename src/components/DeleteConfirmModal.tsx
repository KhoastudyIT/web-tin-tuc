import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { NewsItem } from '../types/news';

interface DeleteConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => Promise<void>;
  news: NewsItem | null;
  isDeleting: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  show,
  onHide,
  onConfirm,
  news,
  isDeleting
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
          Xác nhận xóa
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="warning">
          <Alert.Heading>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Cảnh báo!
          </Alert.Heading>
          <p>
            Bạn có chắc chắn muốn xóa tin tức <strong>"{news?.title}"</strong> không?
          </p>
          <hr />
          <p className="mb-0">
            Hành động này không thể hoàn tác. Tin tức sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </p>
        </Alert>

        <div className="mt-3">
          <h6>Thông tin tin tức:</h6>
          <ul className="list-unstyled">
            <li><strong>Tiêu đề:</strong> {news?.title}</li>
            <li><strong>Danh mục:</strong> {news?.category?.name}</li>
            <li><strong>Tác giả:</strong> {news?.author || 'Không có'}</li>
            <li><strong>Ngày tạo:</strong> {news?.created_at ? new Date(news.created_at).toLocaleDateString('vi-VN') : 'Không có'}</li>
          </ul>
        </div>
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
              Xóa tin tức
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
