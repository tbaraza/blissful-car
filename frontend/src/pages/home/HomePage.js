import React, { Component } from 'react';
import {
  Tabs, Card, Select, Form, Button, Spin,
} from 'antd';
import logo from './logo.svg';
// import './App.css';

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;

class App extends Component {
  handleSelectChange = (value) => {
    console.log(value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.props.fetchSearchResults(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props.apiCallState;
    if (loading) {
      return <Spin />;
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

export default Form.create()(App);
