import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { NewsItemList } from '../types/news';

interface NewsCardProps {
  news: NewsItemList;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, featured = false }) => {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: vi
      });
    } catch {
      return 'Vừa xong';
    }
  };

  return (
    <Card className={`h-100 ${featured ? 'featured-news' : ''}`}>
      {news.image_url && (
        <Card.Img
          variant="top"
          src={news.image_url}
          alt={news.title}
          className="news-image"
          style={{ height: featured ? '200px' : '150px', objectFit: 'cover' }}
        />
      )}
      
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge 
            bg="primary" 
            style={{ backgroundColor: news.category.color }}
            className="mb-2"
          >
            {news.category.name}
          </Badge>
          
          {featured && (
            <Badge bg="warning" text="dark" className="ms-2">
              Nổi bật
            </Badge>
          )}
        </div>

        <Card.Title 
          as={Link} 
          to={`/news/${news.slug}`}
          className="text-decoration-none text-dark fw-bold"
          style={{ 
            fontSize: featured ? '1.25rem' : '1rem',
            lineHeight: '1.4',
            display: '-webkit-box' as const,
            WebkitLineClamp: featured ? 2 : 3,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden'
          }}
        >
          {news.title}
        </Card.Title>

        {news.summary && (
          <Card.Text 
            className="text-muted mt-2"
            style={{
              display: '-webkit-box' as const,
              WebkitLineClamp: featured ? 3 : 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
              lineHeight: '1.5'
            }}
          >
            {news.summary}
          </Card.Text>
        )}

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center text-muted small">
            <span>
              {news.author && `Bởi ${news.author}`}
            </span>
            <span>
              {formatDate(news.created_at)}
            </span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted">
              👁️ {news.views_count} lượt xem
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
