// ===== IMPORTS - Import các thư viện và components cần thiết =====
import React from 'react';                                    // Thư viện React chính
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Routing system
import { QueryClient, QueryClientProvider } from 'react-query'; // State management cho API calls
import { Toaster } from 'react-hot-toast';                    // Hiển thị thông báo đẹp
import 'bootstrap/dist/css/bootstrap.min.css';               // CSS framework Bootstrap

// ===== COMPONENT IMPORTS - Import các components và pages =====
import Header from './components/Header';                     // Header chung cho tất cả trang
import Footer from './components/Footer';                     // Footer chung cho tất cả trang
import HomePage from './pages/HomePage';                      // Trang chủ hiển thị tin tức nổi bật
import NewsDetailPage from './pages/NewsDetailPage';          // Trang chi tiết tin tức
import CategoryPage from './pages/CategoryPage';              // Trang hiển thị tin theo danh mục
import SearchPage from './pages/SearchPage';                  // Trang tìm kiếm tin tức
import LoginPage from './pages/LoginPage';                    // Trang đăng nhập
import RegisterPage from './pages/RegisterPage';              // Trang đăng ký
import ProfilePage from './pages/ProfilePage';                // Trang thông tin cá nhân
import AdminPage from './pages/AdminPage';                    // Trang quản trị (admin)
import { AuthProvider } from './contexts/AuthContext';        // Context quản lý authentication

// ===== QUERY CLIENT - Khởi tạo React Query để quản lý API state =====
const queryClient = new QueryClient();

// ===== MAIN APP COMPONENT - Component chính của ứng dụng =====
function App() {
  return (
    // ===== PROVIDERS - Các context providers bao bọc toàn bộ app =====
    <QueryClientProvider client={queryClient}>                {/* Quản lý state cho API calls */}
      <AuthProvider>                                          {/* Quản lý authentication state */}
        <Router>                                              {/* Router để điều hướng giữa các trang */}
          
          {/* ===== APP STRUCTURE - Cấu trúc chính của ứng dụng ===== */}
          <div className="App">
            {/* ===== HEADER - Header cố định ở đầu trang ===== */}
            <Header />
            
            {/* ===== MAIN CONTENT - Nội dung chính của từng trang ===== */}
            <main className="min-vh-100">                     {/* min-vh-100 = chiều cao tối thiểu 100% viewport */}
              <Routes>                                        {/* Định nghĩa các routes (đường dẫn) */}
                
                {/* ===== ROUTE DEFINITIONS - Định nghĩa các trang ===== */}
                <Route path="/" element={<HomePage />} />      {/* Trang chủ - đường dẫn gốc */}
                <Route path="/news/:slug" element={<NewsDetailPage />} />      {/* Trang chi tiết tin tức - :slug là parameter động */}
                <Route path="/category/:category" element={<CategoryPage />} /> {/* Trang danh mục - :category là parameter động */}
                <Route path="/search" element={<SearchPage />} />              {/* Trang tìm kiếm */}
                <Route path="/login" element={<LoginPage />} />                {/* Trang đăng nhập */}
                <Route path="/register" element={<RegisterPage />} />          {/* Trang đăng ký */}
                <Route path="/profile" element={<ProfilePage />} />            {/* Trang profile */}
                <Route path="/admin" element={<AdminPage />} />                {/* Trang admin */}
                
              </Routes>
            </main>
            
            {/* ===== FOOTER - Footer cố định ở cuối trang ===== */}
            <Footer />
            
            {/* ===== TOASTER - Hiển thị thông báo popup ===== */}
            <Toaster position="top-right" />                  {/* Vị trí hiển thị thông báo: góc trên bên phải */}
          </div>
          
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// ===== EXPORT - Export component để sử dụng =====
export default App;
