import { NewsItem, NewsItemList, NewsCategory } from '../types/news';

// Mock data dựa trên 24h.com.vn
export const mockCategories: NewsCategory[] = [
  {
    id: 1,
    name: 'Bóng đá',
    slug: 'bong-da',
    description: 'Tin tức bóng đá Việt Nam và thế giới',
    color: '#dc3545',
    icon: '⚽',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Thể thao',
    slug: 'the-thao',
    description: 'Tin tức thể thao đa dạng',
    color: '#28a745',
    icon: '🏃',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Kinh doanh',
    slug: 'kinh-doanh',
    description: 'Tin tức kinh tế, tài chính',
    color: '#ffc107',
    icon: '💰',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Giải trí',
    slug: 'giai-tri',
    description: 'Tin tức giải trí, showbiz',
    color: '#e83e8c',
    icon: '🎭',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Sức khỏe',
    slug: 'suc-khoe',
    description: 'Tin tức sức khỏe, y tế',
    color: '#17a2b8',
    icon: '🏥',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'Công nghệ',
    slug: 'cong-nghe',
    description: 'Tin tức công nghệ, AI',
    color: '#6f42c1',
    icon: '💻',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    name: 'Thế giới',
    slug: 'the-gioi',
    description: 'Tin tức quốc tế',
    color: '#fd7e14',
    icon: '🌍',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 8,
    name: 'Giáo dục',
    slug: 'giao-duc',
    description: 'Tin tức giáo dục, tuyển sinh',
    color: '#20c997',
    icon: '📚',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const mockNews: NewsItem[] = [
  // Tin tức nổi bật - Bóng đá
  {
    id: 1,
    title: 'Thần đồng 16 tuổi Ngumoha phá kỷ lục ghi bàn ở Liverpool, Chelsea uất ức vì sao?',
    slug: 'than-dong-16-tuoi-ngumoha-pha-ky-luc-ghi-ban-o-liverpool',
    summary: 'Trực tiếp chuyển nhượng chiều 26/8: Man City không mặn mà với thủ môn Donnarumma',
    content: '<p>Thần đồng 16 tuổi Ngumoha đã phá kỷ lục ghi bàn ở Liverpool, khiến Chelsea cảm thấy uất ức. Cầu thủ trẻ này đã thể hiện tài năng xuất chúng trong trận đấu vừa qua.</p><p>Với bàn thắng này, Ngumoha đã lập kỷ lục mới về cầu thủ trẻ nhất ghi bàn cho Liverpool trong lịch sử Premier League.</p>',
    image_url: 'https://via.placeholder.com/800x400/dc3545/ffffff?text=Bóng+Đá',
    author: 'Tien Tai',
    source: 'Bóng Đá 24h',
    category_id: 1,
    category: mockCategories[0],
    is_featured: true,
    is_published: true,
    views_count: 15420,
    likes_count: 1250,
    created_at: '2024-08-26T10:30:00Z',
    updated_at: '2024-08-26T10:30:00Z'
  },
  {
    id: 2,
    title: 'Newcastle thua đau Liverpool, HLV Howe trả lời bất ngờ về tương lai Isak',
    slug: 'newcastle-thua-dau-liverpool-hlv-howe-tra-loi-bat-ngo',
    summary: 'Tương lai của tiền đạo Alexander Isak đã nhận được sự chú ý của người hâm mộ bóng đá Anh',
    content: '<p>Newcastle đã thua đau Liverpool trong trận đấu vừa qua. HLV Howe đã có những phát biểu bất ngờ về tương lai của tiền đạo Alexander Isak.</p><p>Isak đã thể hiện phong độ không tốt trong những trận đấu gần đây, khiến dư luận đặt câu hỏi về tương lai của anh tại Newcastle.</p>',
    image_url: 'https://via.placeholder.com/800x400/28a745/ffffff?text=Thể+Thao',
    author: 'Đoàn Linh',
    source: 'Thể Thao 24h',
    category_id: 2,
    category: mockCategories[1],
    is_featured: true,
    is_published: true,
    views_count: 12850,
    likes_count: 890,
    created_at: '2024-08-26T09:15:00Z',
    updated_at: '2024-08-26T09:15:00Z'
  },
  {
    id: 3,
    title: 'Warren Buffett hé lộ kế hoạch mới',
    slug: 'warren-buffett-he-lo-ke-hoach-moi',
    summary: 'Nhà đầu tư huyền thoại Warren Buffett vừa tiết lộ kế hoạch đầu tư mới trong năm 2024',
    content: '<p>Nhà đầu tư huyền thoại Warren Buffett vừa tiết lộ kế hoạch đầu tư mới trong năm 2024. Kế hoạch này được kỳ vọng sẽ mang lại những thay đổi lớn trong thị trường tài chính.</p><p>Buffett cho biết ông sẽ tập trung vào các lĩnh vực công nghệ và năng lượng tái tạo trong thời gian tới.</p>',
    image_url: 'https://via.placeholder.com/800x400/ffc107/000000?text=Kinh+Doanh',
    author: 'Minh Anh',
    source: 'Kinh Tế 24h',
    category_id: 3,
    category: mockCategories[2],
    is_featured: true,
    is_published: true,
    views_count: 9870,
    likes_count: 650,
    created_at: '2024-08-26T08:45:00Z',
    updated_at: '2024-08-26T08:45:00Z'
  },
  {
    id: 4,
    title: 'Concert quốc gia có Soobin, Hòa Minzy diễn tối nay 26/8 liệu có bị hoãn vì bão số 5?',
    slug: 'concert-quoc-gia-soobin-hoa-minzy-dien-toi-nay',
    summary: 'Concert quốc gia với sự tham gia của Soobin và Hòa Minzy dự kiến diễn ra tối nay',
    content: '<p>Concert quốc gia với sự tham gia của Soobin và Hòa Minzy dự kiến diễn ra tối nay. Tuy nhiên, thời tiết xấu do ảnh hưởng của bão số 5 có thể khiến sự kiện bị hoãn.</p><p>Ban tổ chức đang theo dõi sát sao tình hình thời tiết để đưa ra quyết định cuối cùng.</p>',
    image_url: 'https://via.placeholder.com/800x400/e83e8c/ffffff?text=Giải+Trí',
    author: 'Thu Hà',
    source: 'Giải Trí 24h',
    category_id: 4,
    category: mockCategories[3],
    is_featured: true,
    is_published: true,
    views_count: 11230,
    likes_count: 780,
    created_at: '2024-08-26T08:00:00Z',
    updated_at: '2024-08-26T08:00:00Z'
  },
  {
    id: 5,
    title: 'Israel lấy làm tiếc về vụ tấn công bệnh viện Dải Gaza',
    slug: 'israel-lay-lam-tiec-vu-tan-cong-benh-vien-gaza',
    summary: 'Chính phủ Israel bày tỏ sự tiếc nuối về vụ tấn công bệnh viện ở Dải Gaza',
    content: '<p>Chính phủ Israel đã bày tỏ sự tiếc nuối về vụ tấn công bệnh viện ở Dải Gaza. Sự việc này đã gây ra nhiều tranh cãi trong cộng đồng quốc tế.</p><p>Israel cho biết họ sẽ tiến hành điều tra kỹ lưỡng về vụ việc này.</p>',
    image_url: 'https://via.placeholder.com/800x400/fd7e14/ffffff?text=Thế+Giới',
    author: 'Quốc Hùng',
    source: 'Thế Giới 24h',
    category_id: 7,
    category: mockCategories[6],
    is_featured: true,
    is_published: true,
    views_count: 15670,
    likes_count: 450,
    created_at: '2024-08-26T07:30:00Z',
    updated_at: '2024-08-26T07:30:00Z'
  },
  
  // Tin tức mới nhất
  {
    id: 6,
    title: 'Người ngã, cây đổ, thuyền phao xuất hiện giữa phố ngập Hà Nội',
    slug: 'nguoi-nga-cay-do-thuyen-phao-xuat-hien-giua-pho-ngap-ha-noi',
    summary: 'Hơn 10 tiếng mưa lớn do bão Kajiki khiến nhiều tuyến phố Hà Nội thành sông',
    content: '<p>Hơn 10 tiếng mưa lớn do bão Kajiki khiến nhiều tuyến phố Hà Nội thành sông. Tình trạng ngập lụt nghiêm trọng đã gây ra nhiều khó khăn cho người dân.</p><p>Nhiều cây cối bị đổ, người dân phải di chuyển bằng thuyền phao.</p>',
    image_url: 'https://via.placeholder.com/600x300/17a2b8/ffffff?text=Sức+Khỏe',
    author: 'Minh Tuấn',
    source: 'Sức Khỏe 24h',
    category_id: 5,
    category: mockCategories[4],
    is_featured: false,
    is_published: true,
    views_count: 23450,
    likes_count: 320,
    created_at: '2024-08-26T06:45:00Z',
    updated_at: '2024-08-26T06:45:00Z'
  },
  {
    id: 7,
    title: 'Chung cư ở Hà Nội thành ốc đảo sau mưa lớn, loạt ô tô dưới hầm bị nước bủa vây',
    slug: 'chung-cu-ha-noi-thanh-oc-dao-sau-mua-lon',
    summary: 'Mưa lớn khiến nhiều khu vực ở Hà Nội bị ngập nặng, có chung cư bị nước cô lập',
    image_url: 'https://via.placeholder.com/600x300/6f42c1/ffffff?text=Công+Nghệ',
    author: 'Hà Linh',
    category: mockCategories[5],
    is_featured: false,
    is_published: true,
    views_count: 18920,
    created_at: '2024-08-26T06:00:00Z'
  },
  {
    id: 8,
    title: 'Thí sinh dở khóc dở cười với kết quả trúng tuyển đại học',
    slug: 'thi-sinh-do-khoc-do-cuoi-voi-ket-qua-trung-tuyen-dai-hoc',
    summary: 'Không ít thí sinh có điểm thi vượt mức điểm chuẩn nhưng lại không thể trúng tuyển đại học',
    image_url: 'https://via.placeholder.com/600x300/20c997/ffffff?text=Giáo+Dục',
    author: 'Minh Đức',
    category: mockCategories[7],
    is_featured: false,
    is_published: true,
    views_count: 14560,
    created_at: '2024-08-26T05:30:00Z'
  },
  {
    id: 9,
    title: 'Barcelona - Real sau 2 vòng đầu La Liga: Cỗ máy chưa hoàn hảo',
    slug: 'barcelona-real-sau-2-vong-dau-la-liga',
    summary: 'Phân tích tình hình của Barcelona và Real Madrid sau 2 vòng đầu La Liga',
    image_url: 'https://via.placeholder.com/600x300/dc3545/ffffff?text=Bóng+Đá',
    author: 'Văn Nam',
    category: mockCategories[0],
    is_featured: false,
    is_published: true,
    views_count: 9870,
    created_at: '2024-08-26T05:00:00Z'
  },
  {
    id: 10,
    title: 'Vang dội Thùy Linh hạ cựu số 1 ở giải cầu lông vô địch thế giới',
    slug: 'vang-doi-thuy-linh-ha-cuu-so-1-giai-cau-long',
    summary: 'Thùy Linh lập cột mốc lịch sử khi hạ cựu số 1 thế giới ở giải cầu lông',
    image_url: 'https://via.placeholder.com/600x300/28a745/ffffff?text=Thể+Thao',
    author: 'Thể Thao 24h',
    category: mockCategories[1],
    is_featured: false,
    is_published: true,
    views_count: 8760,
    created_at: '2024-08-26T04:30:00Z'
  },
  {
    id: 11,
    title: 'Hà Tĩnh thiệt hại nặng do bão số 5 gây ra',
    slug: 'ha-tinh-thiet-hai-nang-do-bao-so-5',
    summary: 'Bão số 5 đã gây thiệt hại nặng nề cho tỉnh Hà Tĩnh',
    image_url: 'https://via.placeholder.com/600x300/fd7e14/ffffff?text=Thế+Giới',
    author: 'Phương Anh',
    category: mockCategories[6],
    is_featured: false,
    is_published: true,
    views_count: 12340,
    created_at: '2024-08-26T04:00:00Z'
  },
  {
    id: 12,
    title: 'Ronaldo ghi bàn 939 lập kỷ tích mới, hành động lạ gây sốt',
    slug: 'ronaldo-ghi-ban-939-lap-ky-tich-moi',
    summary: 'Ronaldo lập kỷ tích mới với bàn thắng thứ 939 trong sự nghiệp',
    image_url: 'https://via.placeholder.com/600x300/dc3545/ffffff?text=Bóng+Đá',
    author: 'Bóng Đá 24h',
    category: mockCategories[0],
    is_featured: false,
    is_published: true,
    views_count: 19870,
    created_at: '2024-08-26T03:30:00Z'
  },
  {
    id: 13,
    title: 'Tranh cãi xung quanh tân Hoa hậu Hoàn vũ Thái Lan',
    slug: 'tranh-cai-xung-quanh-tan-hoa-hau-hoan-vu-thai-lan',
    summary: 'Dư luận đang tranh cãi về tân Hoa hậu Hoàn vũ Thái Lan',
    image_url: 'https://via.placeholder.com/600x300/e83e8c/ffffff?text=Giải+Trí',
    author: 'Giải Trí 24h',
    category: mockCategories[3],
    is_featured: false,
    is_published: true,
    views_count: 7650,
    created_at: '2024-08-26T03:00:00Z'
  },
  {
    id: 14,
    title: 'Xe thể thao Concept hoàn toàn mới của hãng Lexus lộ điện',
    slug: 'xe-the-thao-concept-lexus-lo-dien',
    summary: 'Hãng Lexus vừa hé lộ mẫu xe thể thao concept hoàn toàn mới',
    image_url: 'https://via.placeholder.com/600x300/6f42c1/ffffff?text=Công+Nghệ',
    author: 'Công Nghệ 24h',
    category: mockCategories[5],
    is_featured: false,
    is_published: true,
    views_count: 6540,
    created_at: '2024-08-26T02:30:00Z'
  },
  {
    id: 15,
    title: 'Điểm mặt những thiết bị điện gia dụng hữu ích cho các bà nội trợ',
    slug: 'thiet-bi-dien-gia-dung-huu-ich-ba-noi-tro',
    summary: 'Những thiết bị điện gia dụng hữu ích giúp các bà nội trợ tiết kiệm thời gian',
    image_url: 'https://via.placeholder.com/600x300/17a2b8/ffffff?text=Sức+Khỏe',
    author: 'Sức Khỏe 24h',
    category: mockCategories[4],
    is_featured: false,
    is_published: true,
    views_count: 5430,
    created_at: '2024-08-26T02:00:00Z'
  },
  {
    id: 16,
    title: 'Vẫn là cá rán nhưng làm cách này thơm ngon đến mức gây nghiện',
    slug: 'ca-ran-thom-ngon-gay-nghien',
    summary: 'Cách làm cá rán thơm ngon đến mức gây nghiện cho bữa cơm gia đình',
    image_url: 'https://via.placeholder.com/600x300/ffc107/000000?text=Kinh+Doanh',
    author: 'Ẩm Thực 24h',
    category: mockCategories[2],
    is_featured: false,
    is_published: true,
    views_count: 4320,
    created_at: '2024-08-26T01:30:00Z'
  },
  {
    id: 17,
    title: 'Bộ GD&ĐT nói gì về điểm chuẩn trúng tuyển đại học 30/30?',
    slug: 'bo-gd-dt-noi-gi-ve-diem-chuan-trung-tuyen-dai-hoc',
    summary: 'Bộ GD&ĐT lên tiếng về vấn đề điểm chuẩn trúng tuyển đại học 30/30',
    image_url: 'https://via.placeholder.com/600x300/20c997/ffffff?text=Giáo+Dục',
    author: 'Giáo Dục 24h',
    category: mockCategories[7],
    is_featured: false,
    is_published: true,
    views_count: 6780,
    created_at: '2024-08-26T01:00:00Z'
  },
  {
    id: 18,
    title: 'Hà Nội: Mưa ngập, học sinh không thể đến trường',
    slug: 'ha-noi-mua-ngap-hoc-sinh-khong-the-den-truong',
    summary: 'Mưa lớn khiến nhiều tuyến đường Hà Nội bị ngập, học sinh không thể đến trường',
    image_url: 'https://via.placeholder.com/600x300/20c997/ffffff?text=Giáo+Dục',
    author: 'Giáo Dục 24h',
    category: mockCategories[7],
    is_featured: false,
    is_published: true,
    views_count: 8900,
    created_at: '2024-08-26T00:30:00Z'
  },
  {
    id: 19,
    title: 'Có nên từ chối nhập học đại học để xét tuyển bổ sung?',
    slug: 'co-nen-tu-choi-nhap-hoc-dai-hoc-xet-tuyen-bo-sung',
    summary: 'Chuyên gia tư vấn về việc có nên từ chối nhập học để xét tuyển bổ sung',
    image_url: 'https://via.placeholder.com/600x300/20c997/ffffff?text=Giáo+Dục',
    author: 'Giáo Dục 24h',
    category: mockCategories[7],
    is_featured: false,
    is_published: true,
    views_count: 5670,
    created_at: '2024-08-26T00:00:00Z'
  },
  {
    id: 20,
    title: 'Cộng điểm IELTS trong tuyển sinh: Có nên không?',
    slug: 'cong-diem-ielts-trong-tuyen-sinh-co-nen-khong',
    summary: 'Bàn luận về việc có nên cộng điểm IELTS trong tuyển sinh đại học',
    image_url: 'https://via.placeholder.com/600x300/20c997/ffffff?text=Giáo+Dục',
    author: 'Giáo Dục 24h',
    category: mockCategories[7],
    is_featured: false,
    is_published: true,
    views_count: 4450,
    created_at: '2024-08-25T23:30:00Z'
  }
];

export const mockDataService = {
  // Lấy tất cả tin tức
  getAllNews: (): NewsItem[] => mockNews,
  
  // Lấy tin tức nổi bật
  getFeaturedNews: (limit: number = 5): NewsItem[] => 
    mockNews.filter(news => news.is_featured).slice(0, limit),
  
  // Lấy tin tức mới nhất
  getLatestNews: (limit: number = 10): NewsItem[] => 
    mockNews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, limit),
  
  // Lấy tin tức phổ biến (theo lượt xem)
  getPopularNews: (limit: number = 10): NewsItem[] => 
    mockNews.sort((a, b) => b.views_count - a.views_count).slice(0, limit),
  
  // Lấy tin tức theo danh mục
  getNewsByCategory: (categorySlug: string, limit: number = 20): NewsItem[] => {
    const category = mockCategories.find(cat => cat.slug === categorySlug);
    if (!category) return [];
    return mockNews.filter(news => news.category.slug === categorySlug).slice(0, limit);
  },
  
  // Lấy tất cả danh mục
  getAllCategories: (): NewsCategory[] => mockCategories,
  
  // Lấy tin tức theo ID
  getNewsById: (id: number): NewsItem | undefined => 
    mockNews.find(news => news.id === id),
  
  // Lấy tin tức theo slug
  getNewsBySlug: (slug: string): NewsItem | undefined => 
    mockNews.find(news => news.slug === slug),
  
  // Tìm kiếm tin tức
  searchNews: (query: string, limit: number = 20): NewsItem[] => {
    const searchTerm = query.toLowerCase();
    return mockNews.filter(news => 
      news.title.toLowerCase().includes(searchTerm) ||
      news.summary?.toLowerCase().includes(searchTerm) ||
      news.category.name.toLowerCase().includes(searchTerm)
    ).slice(0, limit);
  }
};
