import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Home from '@/pages/home';
import Category from '@/pages/category';
import { AtButton, AtTabBar } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 1
    }
  }

  pageMuster = [
    <Home />,
    <Category />,
  ]

  handleClick = (value) => {
    this.setState({
      current: value
    })
    // wx.redirectTo({ url: '/pages/category/index' });
    // Taro.navigateTo({
    //   url: '/pages/category/index'
    // })
  }

  render () {
    const { current } = this.state;
    return (
      <View className='index'>
        {this.pageMuster[current]}
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '类目', iconType: 'mail' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClick}
          current={current}
        />
      </View>
    )
  }
}
