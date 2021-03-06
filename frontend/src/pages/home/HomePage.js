/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import {
  Card, Select, Form, Button, Spin, Icon, notification,
} from 'antd';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import './HomePage.css';

const { Option } = Select;
const FormItem = Form.Item;

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dealsPage: false,
      endpoint: 'http://127.0.0.1:9000',
      values: {},
    };
  }

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
            const { endpoint } = this.state;
            const socket = socketIOClient(endpoint);

            this.setState({
              dealsPage: true,
              values,
            });

            socket.emit('search', { page: '/' });
          }
        });
      }
    });
  };

  openNotification = (message, description) => {
    notification.open({
      message,
      description,
      icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props.apiCallState;
    const { values } = this.state;
    if (loading) {
      return <Spin />;
    }

    if (this.state.dealsPage) {
      const to = {
        pathname: '/deals',
        state: { values },
      };
      return <Redirect to={to} push />;
    }

    return (
      <div className="app">
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
            <FormItem label="Model" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('model', { initialValue: 'any' })(
                <Select onChange={this.handleSelectChange}>
                  <Option value="any">any</Option>
                  <Option value="Ford">Ford</Option>
                  <Option value="Mercedes">Mercedes</Option>
                  <Option value="Porsche">Porsche</Option>
                  <Option value="Subaru">Subaru</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem label="Color" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('color', { initialValue: 'any' })(
                <Select onChange={this.handleSelectChange}>
                  <Option value="any">any</Option>
                  <Option value="green">green</Option>
                  <Option value="blue">blue</Option>
                  <Option value="black">black</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem label="Insurance" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('insurance', {
                rules: [{ required: true, message: 'Please select type of insurance!' }],
              })(
                <Select placeholder="Select type of insurance" onChange={this.handleSelectChange}>
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
