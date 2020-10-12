import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Home from '@/pages/home';
import { AtButton, AtTabBar } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  render () {
    const { current } = this.state;
    return (
      <View className='index'>
        <Home />
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: 'Tab2', iconType: 'mail' },
            { title: 'Tab2', iconType: 'list' }
          ]}
          onClick={this.handleClick}
          current={current}
        />
      </View>
    )
  }
}
