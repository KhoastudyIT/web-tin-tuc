import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Alert, Toast } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { newsService } from '../services/newsService';
import { NewsItem, NewsItemCreate, NewsItemUpdate, NewsCategory } from '../types/news';
import NewsFormModal from '../components/NewsFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import CategoryFormModal from '../components/CategoryFormModal';
import CategoryDeleteModal from '../components/CategoryDeleteModal';
import DebugPanel from '../components/DebugPanel';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // State cho các modal
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [deletingNews, setDeletingNews] = useState<NewsItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // State cho quản lý danh mục
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showCategoryDeleteModal, setShowCategoryDeleteModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<NewsCategory | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<NewsCategory | null>(null);
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // State cho thông báo
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');

  // Lấy danh sách tin tức
  const { data: news = [], isLoading: newsLoading, refetch: refetchNews } = useQuery(
    'admin-news',
    () => newsService.getNews(undefined, 50, 0),
    { 
      enabled: !!user?.is_admin,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 phút
      cacheTime: 10 * 60 * 1000 // 10 phút
    }
  );

  // Debug: Log khi news thay đổi
  React.useEffect(() => {
    console.log('News data updated:', news);
  }, [news]);

  // Lấy danh sách danh mục
  const { data: categories = [], isLoading: categoriesLoading } = useQuery(
    'admin-categories',
    () => newsService.getCategories(),
    { enabled: !!user?.is_admin }
  );

  // Mutation để tạo tin tức mới
  const createNewsMutation = useMutation({
    mutationFn: (newsData: NewsItemCreate) => newsService.createNews(newsData),
    onSuccess: (newNews) => {
      // Invalidate tất cả các query liên quan đến tin tức
      queryClient.invalidateQueries(['admin-news']);
      queryClient.invalidateQueries(['latest-news']);
      queryClient.invalidateQueries(['featured-news']);
      queryClient.invalidateQueries(['popular-news']);
      queryClient.invalidateQueries(['category-news']);
      queryClient.invalidateQueries(['search-news']);
      queryClient.invalidateQueries(['news-detail']);
      
      // Optimistic update - thêm tin tức mới vào cache ngay lập tức
      queryClient.setQueryData(['admin-news'], (oldData: any) => {
        if (oldData && Array.isArray(oldData)) {
          // Chuyển đổi NewsItem thành NewsItemList để phù hợp với cache
          const newsListItem = {
            id: newNews.id,
            title: newNews.title,
            slug: newNews.slug,
            summary: newNews.summary,
            image_url: newNews.image_url,
            author: newNews.author,
            category: categories.find(cat => cat.id === newNews.category_id) || categories[0],
            is_featured: newNews.is_featured,
            is_published: newNews.is_published,
            views_count: 0,
            created_at: new Date().toISOString()
          };
          return [newsListItem, ...oldData];
        }
        return oldData;
      });
      
      // Refetch để đảm bảo dữ liệu được cập nhật
      setTimeout(() => {
        refetchNews();
      }, 100);
      
      showNotification('Thêm tin tức thành công!', 'success');
    },
    onError: (error) => {
      console.error('Lỗi khi tạo tin tức:', error);
      showNotification('Có lỗi xảy ra khi tạo tin tức!', 'danger');
    }
  });

  // Mutation để cập nhật tin tức
  const updateNewsMutation = useMutation({
    mutationFn: ({ id, newsData }: { id: number; newsData: NewsItemUpdate }) => 
      newsService.updateNews(id, newsData),
    onSuccess: () => {
      // Invalidate tất cả các query liên quan đến tin tức
      queryClient.invalidateQueries(['admin-news']);
      queryClient.invalidateQueries(['latest-news']);
      queryClient.invalidateQueries(['featured-news']);
      queryClient.invalidateQueries(['popular-news']);
      queryClient.invalidateQueries(['category-news']);
      queryClient.invalidateQueries(['search-news']);
      queryClient.invalidateQueries(['news-detail']);
      
      // Refetch để đảm bảo dữ liệu được cập nhật
      setTimeout(() => {
        refetchNews();
      }, 100);
      
      showNotification('Cập nhật tin tức thành công!', 'success');
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật tin tức:', error);
      showNotification('Có lỗi xảy ra khi cập nhật tin tức!', 'danger');
    }
  });

  // Mutation để xóa tin tức
  const deleteNewsMutation = useMutation({
    mutationFn: (id: number) => newsService.deleteNews(id),
    onSuccess: () => {
      // Invalidate tất cả các query liên quan đến tin tức
      queryClient.invalidateQueries(['admin-news']);
      queryClient.invalidateQueries(['latest-news']);
      queryClient.invalidateQueries(['featured-news']);
      queryClient.invalidateQueries(['popular-news']);
      queryClient.invalidateQueries(['category-news']);
      queryClient.invalidateQueries(['search-news']);
      queryClient.invalidateQueries(['news-detail']);
      
      // Refetch để đảm bảo dữ liệu được cập nhật
      setTimeout(() => {
        refetchNews();
      }, 100);
      
      showNotification('Xóa tin tức thành công!', 'success');
    },
    onError: (error) => {
      console.error('Lỗi khi xóa tin tức:', error);
      showNotification('Có lỗi xảy ra khi xóa tin tức!', 'danger');
    }
  });

  // Hiển thị thông báo
  const showNotification = (message: string, variant: 'success' | 'danger') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  // Xử lý thêm tin tức mới
  const handleAddNews = () => {
    setIsEditing(false);
    setEditingNews(null);
    setShowNewsForm(true);
  };

  // Xử lý sửa tin tức
  const handleEditNews = (news: NewsItem) => {
    setIsEditing(true);
    setEditingNews(news);
    setShowNewsForm(true);
  };

  // Xử lý xóa tin tức
  const handleDeleteNews = (news: NewsItem) => {
    setDeletingNews(news);
    setShowDeleteModal(true);
  };

  // Xử lý submit form
  const handleSubmitNews = async (newsData: NewsItemCreate | NewsItemUpdate) => {
    try {
      if (isEditing && editingNews) {
        console.log('Cập nhật tin tức:', { id: editingNews.id, data: newsData });
        await updateNewsMutation.mutateAsync({ id: editingNews.id, newsData });
      } else {
        console.log('Tạo tin tức mới:', newsData);
        await createNewsMutation.mutateAsync(newsData as NewsItemCreate);
      }
    } catch (error) {
      console.error('Lỗi trong handleSubmitNews:', error);
      showNotification('Có lỗi xảy ra khi xử lý tin tức!', 'danger');
    }
  };

  // Xử lý xác nhận xóa
  const handleConfirmDelete = async () => {
    if (deletingNews) {
      await deleteNewsMutation.mutateAsync(deletingNews.id);
      setShowDeleteModal(false);
      setDeletingNews(null);
    }
  };

  // Xử lý thêm danh mục mới
  const handleAddCategory = () => {
    setIsEditingCategory(false);
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  // Xử lý sửa danh mục
  const handleEditCategory = (category: NewsCategory) => {
    setIsEditingCategory(true);
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  // Xử lý xóa danh mục
  const handleDeleteCategory = (category: NewsCategory) => {
    setDeletingCategory(category);
    setShowCategoryDeleteModal(true);
  };

  // Xử lý submit form danh mục
  const handleSubmitCategory = async (categoryData: Partial<NewsCategory>) => {
    // TODO: Implement category CRUD operations
    console.log('Category data:', categoryData);
    showNotification('Chức năng quản lý danh mục sẽ được phát triển sau!', 'success');
  };

  // Xử lý xác nhận xóa danh mục
  const handleConfirmDeleteCategory = async () => {
    if (deletingCategory) {
      // TODO: Implement category deletion
      console.log('Deleting category:', deletingCategory);
      showNotification('Chức năng xóa danh mục sẽ được phát triển sau!', 'success');
      setShowCategoryDeleteModal(false);
      setDeletingCategory(null);
    }
  };

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

      {/* Toast thông báo */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Header closeButton>
          <strong className="me-auto">
            {toastVariant === 'success' ? 'Thành công' : 'Lỗi'}
          </strong>
        </Toast.Header>
        <Toast.Body className={toastVariant === 'success' ? 'text-success' : 'text-danger'}>
          {toastMessage}
        </Toast.Body>
      </Toast>

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
                <Button variant="success" size="sm" onClick={handleAddNews}>
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
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleEditNews(item)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteNews(item)}
                          >
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
                <Button variant="success" size="sm" onClick={handleAddCategory}>
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
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-1"
                        onClick={() => handleEditCategory(category)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category)}
                      >
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
                    <li><strong>Frontend:</strong> React + TypeScript</li>
                    <li><strong>Backend:</strong> FastAPI + Python</li>
                    <li><strong>API Base:</strong> http://localhost:8000</li>
                    <li><strong>CORS Origins:</strong> localhost:3000, localhost:5173</li>
                    <li><strong>Thời gian hoạt động:</strong> 24/7</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal thêm/sửa tin tức */}
      <NewsFormModal
        show={showNewsForm}
        onHide={() => setShowNewsForm(false)}
        onSubmit={handleSubmitNews}
        news={editingNews}
        categories={categories}
        isEditing={isEditing}
      />

      {/* Modal xác nhận xóa */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        news={deletingNews}
        isDeleting={deleteNewsMutation.isLoading}
      />

      {/* Modal thêm/sửa danh mục */}
      <CategoryFormModal
        show={showCategoryForm}
        onHide={() => setShowCategoryForm(false)}
        onSubmit={handleSubmitCategory}
        category={editingCategory}
        isEditing={isEditingCategory}
      />

      {/* Modal xác nhận xóa danh mục */}
      <CategoryDeleteModal
        show={showCategoryDeleteModal}
        onHide={() => setShowCategoryDeleteModal(false)}
        onConfirm={handleConfirmDeleteCategory}
        category={deletingCategory}
        isDeleting={false}
        newsCount={news.filter(item => item.category.id === deletingCategory?.id).length}
      />

      {/* Debug Panel - chỉ hiển thị trong development */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </Container>
  );
};

export default AdminPage;
