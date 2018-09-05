import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import './DashboardPage.css';

const { Meta } = Card;

class DashboardPage extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            hoverable
            style={{ width: 240, marginRight: '1rem' }}
            cover={(
              <div className="eye-icon-container">
                <Icon type="eye" style={{ fontSize: '10rem', color: '#fff' }} />
              </div>
            )}
          >
            <Meta title="Site Visits" description="34" />
          </Card>

          <Card
            hoverable
            style={{ width: 240, marginRight: '1rem' }}
            cover={(
              <div className="user-icon-container">
                <Icon type="user" style={{ fontSize: '10rem', color: '#fff' }} />
              </div>
            )}
          >
            <Meta title="Active Users" description="34" />
          </Card>

          <Card
            hoverable
            style={{ width: 240, marginRight: '1rem' }}
            cover={(
              <div className="search-icon-container">
                <Icon type="search" style={{ fontSize: '10rem', color: '#fff' }} />
              </div>
            )}
          >
            <Meta title="Searches" description="34" />
          </Card>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
