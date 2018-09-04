/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import {
  Tabs, Card, Select, Form, Button, Spin, Icon, notification,
} from 'antd';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;
const { Option } = Select;
const FormItem = Form.Item;

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dealsPage: false,
    };
  }

  handleSelectChange = (value) => {
    console.log(value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.fetchSearchResults(values).then(() => {
          const { apiCallState } = this.props;

          if (apiCallState.error) {
            this.openNotification('Error', 'Please check if you are connected to the internet.');
          }

          if (apiCallState.success) {
            this.setState({
              dealsPage: true,
            });
          }
        });
      }
    });
  };

  openNotification = (message, description) => {
    notification.open({
      message,
      description,
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props.apiCallState;
    if (loading) {
      return <Spin />;
    }

    if (this.state.dealsPage) {
      return <Redirect to="/deals" push />;
    }

    return (
      <div className="App">
        <h2>Hello there</h2>
        <Tabs onChange={this.callback} type="card">
          <TabPane tab="Tab 1" key="1">
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <FormItem label="Passengers" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                  {getFieldDecorator('passengers', {
                    rules: [{ required: true, message: 'Please select number of passengers!' }],
                  })(
                    <Select
                      placeholder="Select number of passengers"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                    </Select>,
                  )}
                </FormItem>
                <FormItem label="Insurance" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                  {getFieldDecorator('insurance', {
                    rules: [{ required: true, message: 'Please select type of insurance!' }],
                  })(
                    <Select
                      placeholder="Select type of insurance"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="good">good</Option>
                      <Option value="basic">basic</Option>
                      <Option value="premium">premium</Option>
                    </Select>,
                  )}
                </FormItem>
                <FormItem label="Fuel" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                  {getFieldDecorator('bestFuel', {
                    rules: [{ required: true, message: 'Please select fuel option!' }],
                  })(
                    <Select
                      placeholder="Do you want the best fuel option?"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="yes">yes</Option>
                      <Option value="no">no</Option>
                    </Select>,
                  )}
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 5 }}>
                  <Button type="primary" htmlType="submit">
                    Find Deals
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

HomePage.propTypes = {
  fetchSearchResults: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
  apiCallState: PropTypes.shape({
    success: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.bool,
  }).isRequired,
};

export default Form.create()(HomePage);
