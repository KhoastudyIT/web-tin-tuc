-- =====================================================
-- SETUP DATABASE NEWS WEBSITE
-- Chạy file này trong phpMyAdmin để tạo database
-- =====================================================

-- Tạo database (nếu chưa có)
-- CREATE DATABASE IF NOT EXISTS news_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE news_website;

-- =====================================================
-- 1. TẠO BẢNG USERS
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. TẠO BẢNG NEWS_CATEGORIES
-- =====================================================
CREATE TABLE IF NOT EXISTS news_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#007bff',
    icon VARCHAR(50) DEFAULT '📰',
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- 3. TẠO BẢNG NEWS_ITEMS
-- =====================================================
CREATE TABLE IF NOT EXISTS news_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    summary TEXT,
    content LONGTEXT,
    image_url VARCHAR(500),
    author VARCHAR(100),
    source VARCHAR(200),
    category_id INT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES news_categories(id) ON DELETE SET NULL
);

-- =====================================================
-- 4. THÊM DỮ LIỆU MẪU
-- =====================================================

-- Thêm admin user (password: admin123)
INSERT INTO users (email, username, full_name, hashed_password, is_admin) VALUES 
('admin@news.com', 'admin', 'Administrator', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.i8mG', TRUE);

-- Thêm danh mục tin tức
INSERT INTO news_categories (name, slug, color, icon, description) VALUES 
('Bóng đá', 'bong-da', '#dc3545', '⚽', 'Tin tức bóng đá Việt Nam và thế giới'),
('Thể thao', 'the-thao', '#28a745', '🏃', 'Tin tức thể thao đa dạng'),
('Kinh doanh', 'kinh-doanh', '#ffc107', '💰', 'Tin tức kinh tế, tài chính'),
('Giải trí', 'giai-tri', '#e83e8c', '🎭', 'Tin tức giải trí, showbiz'),
('Sức khỏe', 'suc-khoe', '#17a2b8', '🏥', 'Tin tức sức khỏe, y tế'),
('Công nghệ', 'cong-nghe', '#6f42c1', '💻', 'Tin tức công nghệ, AI'),
('Thế giới', 'the-gioi', '#fd7e14', '🌍', 'Tin tức quốc tế'),
('Giáo dục', 'giao-duc', '#20c997', '📚', 'Tin tức giáo dục, tuyển sinh');

-- Thêm tin tức mẫu
INSERT INTO news_items (title, slug, summary, content, image_url, author, source, category_id, is_featured, is_published, views_count, likes_count) VALUES 
('Thần đồng 16 tuổi Ngumoha phá kỷ lục ghi bàn ở Liverpool', 'than-dong-16-tuoi-ngumoha-pha-ky-luc-ghi-ban-o-liverpool', 'Trực tiếp chuyển nhượng chiều 26/8: Man City không mặn mà với thủ môn Donnarumma', '<p>Thần đồng 16 tuổi Ngumoha đã phá kỷ lục ghi bàn ở Liverpool, khiến Chelsea cảm thấy tiếc nuối vì đã bỏ lỡ cơ hội sở hữu tài năng trẻ này.</p><p>Ngumoha đã ghi bàn trong trận đấu gần đây nhất của Liverpool, trở thành cầu thủ trẻ nhất ghi bàn trong lịch sử câu lạc bộ. Tài năng trẻ này đang thu hút sự chú ý của nhiều đội bóng lớn trên thế giới.</p>', 'https://via.placeholder.com/800x400/dc3545/ffffff?text=Bóng+Đá', 'Tien Tai', 'Bóng Đá 24h', 1, TRUE, TRUE, 15420, 1250),

('Newcastle thua đau Liverpool, HLV Howe trả lời bất ngờ về tương lai Isak', 'newcastle-thua-dau-liverpool-hlv-howe-tra-loi-bat-ngo', 'Tương lai của tiền đạo Alexander Isak đã nhận được sự chú ý của người hâm mộ bóng đá Anh', '<p>Newcastle đã thua đau Liverpool trong trận đấu vừa qua. HLV Howe đã có những phát biểu bất ngờ về tương lai của tiền đạo Alexander Isak.</p><p>Trong cuộc phỏng vấn sau trận đấu, HLV Howe cho biết: "Isak là một cầu thủ xuất sắc và chúng tôi rất hài lòng với những gì anh ấy đã thể hiện. Tuy nhiên, trong bóng đá hiện đại, mọi thứ đều có thể xảy ra."</p>', 'https://via.placeholder.com/800x400/28a745/ffffff?text=Thể+Thao', 'Đoàn Linh', 'Thể Thao 247', 2, TRUE, TRUE, 12850, 980),

('Warren Buffett hé lộ kế hoạch mới', 'warren-buffett-he-lo-ke-hoach-moi', 'Nhà đầu tư huyền thoại Warren Buffett vừa tiết lộ kế hoạch đầu tư mới trong năm 2024', '<p>Nhà đầu tư huyền thoại Warren Buffett vừa tiết lộ kế hoạch đầu tư mới trong năm 2024. Kế hoạch này được kỳ vọng sẽ mang lại những thay đổi lớn trong thị trường tài chính.</p><p>Trong bức thư gửi cổ đông Berkshire Hathaway, Buffett cho biết ông đang tập trung vào các lĩnh vực công nghệ xanh và năng lượng tái tạo. "Chúng ta đang ở trong một thời kỳ chuyển đổi quan trọng," Buffett viết.</p>', 'https://via.placeholder.com/800x400/ffc107/000000?text=Kinh+Doanh', 'Minh Anh', 'Kinh Tế & Đầu Tư', 3, TRUE, TRUE, 9870, 750),

('AI ChatGPT-5 sẽ thay đổi thế giới như thế nào?', 'ai-chatgpt-5-se-thay-doi-the-gioi-nhu-the-nao', 'OpenAI chuẩn bị ra mắt ChatGPT-5 với khả năng vượt trội so với phiên bản hiện tại', '<p>OpenAI đang chuẩn bị ra mắt ChatGPT-5, phiên bản mới nhất với những cải tiến đột phá về khả năng hiểu và xử lý ngôn ngữ tự nhiên.</p><p>Theo các chuyên gia, ChatGPT-5 sẽ có khả năng hiểu ngữ cảnh tốt hơn, xử lý đa ngôn ngữ hiệu quả hơn và có thể thực hiện các tác vụ phức tạp mà trước đây chỉ con người mới làm được.</p>', 'https://via.placeholder.com/800x400/6f42c1/ffffff?text=Công+Nghệ', 'Hoàng Nam', 'Công Nghệ 24h', 6, TRUE, TRUE, 15680, 2100),

('Việt Nam đứng đầu ASEAN về tốc độ tăng trưởng kinh tế', 'viet-nam-dung-dau-asean-ve-toc-do-tang-truong-kinh-te', 'Báo cáo mới nhất cho thấy Việt Nam đang dẫn đầu khu vực ASEAN về tốc độ phục hồi và tăng trưởng kinh tế', '<p>Báo cáo mới nhất của Ngân hàng Phát triển châu Á (ADB) cho thấy Việt Nam đang dẫn đầu khu vực ASEAN về tốc độ phục hồi và tăng trưởng kinh tế sau đại dịch Covid-19.</p><p>Với tốc độ tăng trưởng GDP dự kiến đạt 6.5% trong năm 2024, Việt Nam đang thể hiện sức mạnh của một nền kinh tế năng động và có khả năng thích ứng cao.</p>', 'https://via.placeholder.com/800x400/20c997/ffffff?text=Thế+Giới', 'Thu Hà', 'Thế Giới & Việt Nam', 7, TRUE, TRUE, 11200, 890);

-- =====================================================
-- 5. TẠO INDEXES ĐỂ TĂNG HIỆU SUẤT
-- =====================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_news_categories_slug ON news_categories(slug);
CREATE INDEX idx_news_items_slug ON news_items(slug);
CREATE INDEX idx_news_items_category ON news_items(category_id);
CREATE INDEX idx_news_items_featured ON news_items(is_featured);
CREATE INDEX idx_news_items_published ON news_items(is_published);

-- =====================================================
-- THÔNG TIN ĐĂNG NHẬP ADMIN
-- =====================================================
-- Email: admin@news.com
-- Username: admin  
-- Password: admin123
-- =====================================================
