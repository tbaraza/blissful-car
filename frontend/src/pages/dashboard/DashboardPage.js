import React, { Component } from 'react';
import { Card, Icon, List } from 'antd';
import socketIOClient from 'socket.io-client';
import './DashboardPage.css';

const { Meta } = Card;

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: 'http://127.0.0.1:9000',
      pages: {},
      referrers: 0,
      activeUsers: 0,
      searches: 0,
      visits: 0,
    };
  }

  getPageStats = (visitorData) => {
    const { pages, referrers, activeUsers } = visitorData;

    this.setState({
      activeUsers,
      referrers: Object.keys(referrers).length,
      pages,
      visits: Object.keys(pages).length,
    });
  };

  getSearchStats = (searchData) => {
    const { searches } = searchData;
    this.setState({
      searches,
    });
  };

  render() {
    const {
      pages, activeUsers, endpoint, searches, visits,
    } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('updated-stats', (data) => {
      this.getPageStats(data);
    });

    socket.on('search-stats', (data) => {
      this.getSearchStats(data);
    });

    const data = [
      {
        page: '/',
        stats: pages['/'] ? pages['/'] : 0,
      },
      {
        page: '/deals',
        stats: pages['/deals'] ? pages['/deals'] : 0,
      },
      {
        page: '/dashboard',
        stats: pages['/dashboard'] ? pages['/dashboard'] : 0,
      },
    ];

    return (
      <div className="dashboard-container">
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
            <Meta title="Site Visits" description={`${visits}`} />
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
            <Meta title="Active Users" description={`${activeUsers}`} />
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
            <Meta title="Searches" description={`${searches}`} />
          </Card>
        </div>

        <h2 style={{ color: 'gray' }}>Page stats</h2>

        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card title={item.page}>{`${item.stats}`}</Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default DashboardPage;
