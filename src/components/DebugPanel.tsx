import React, { useState } from 'react';
import { Card, Button, Badge, Accordion } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { debugAPI, testAPIEndpoints, checkBackendStatus } from '../utils/debugUtils';

const DebugPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [backendStatus, setBackendStatus] = useState<boolean | null>(null);
  const queryClient = useQueryClient();

  const handleTestAPI = async () => {
    await testAPIEndpoints();
  };

  const handleCheckBackend = async () => {
    const status = await checkBackendStatus();
    setBackendStatus(status);
  };

  const getCacheInfo = () => {
    const queries = queryClient.getQueryCache().getAll();
    const mutations = queryClient.getMutationCache().getAll();
    
    return {
      queries: queries.length,
      mutations: mutations.length,
      queryData: queries.map(q => ({
        key: q.queryKey,
        data: q.state.data,
        status: q.state.status,
        updatedAt: q.state.dataUpdatedAt
      }))
    };
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}
      >
        🐛 Debug
      </Button>
    );
  }

  const cacheInfo = getCacheInfo();

  return (
    <Card
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        maxHeight: '600px',
        zIndex: 1000,
        overflow: 'auto'
      }}
    >
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>🐛 Debug Panel</span>
        <Button variant="outline-danger" size="sm" onClick={() => setIsVisible(false)}>
          ✕
        </Button>
      </Card.Header>
      
      <Card.Body>
        <div className="mb-3">
          <h6>Backend Status</h6>
          <div className="d-flex gap-2 mb-2">
            <Button size="sm" onClick={handleCheckBackend}>
              Check Backend
            </Button>
            <Button size="sm" onClick={handleTestAPI}>
              Test API
            </Button>
          </div>
          {backendStatus !== null && (
            <Badge bg={backendStatus ? 'success' : 'danger'}>
              {backendStatus ? 'Online' : 'Offline'}
            </Badge>
          )}
        </div>

        <div className="mb-3">
          <h6>Cache Info</h6>
          <div className="d-flex gap-2 mb-2">
            <Badge bg="info">Queries: {cacheInfo.queries}</Badge>
            <Badge bg="warning">Mutations: {cacheInfo.mutations}</Badge>
          </div>
        </div>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Query Cache Details</Accordion.Header>
            <Accordion.Body>
              <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                {cacheInfo.queryData.map((query, index) => (
                  <div key={index} className="mb-2 p-2 border rounded">
                    <small className="text-muted">Key: {JSON.stringify(query.key)}</small>
                    <br />
                    <small>Status: {query.status}</small>
                    <br />
                    <small>Updated: {new Date(query.updatedAt).toLocaleTimeString()}</small>
                    <br />
                    <small>Data: {JSON.stringify(query.data).substring(0, 100)}...</small>
                  </div>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="mt-3">
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => {
              queryClient.clear();
              debugAPI.logCache('clear', 'all');
            }}
            className="me-2"
          >
            Clear Cache
          </Button>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => {
              queryClient.invalidateQueries();
              debugAPI.logCache('invalidate', 'all');
            }}
          >
            Invalidate All
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DebugPanel;
