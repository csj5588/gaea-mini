import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Home from '@/pages/home';
import Category from '@/pages/category';
import { AtTabBar } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

const TabList = [
  { title: '首页', iconType: 'home' },
  { title: '分类', iconType: 'mail' },
]

export default class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
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
  }

  render () {
    const { current } = this.state;
    return (
      <View className='index'>
        {this.pageMuster[current]}
        <AtTabBar
          fixed
          tabList={TabList}
          onClick={this.handleClick}
          current={current}
        />
      </View>
    )
  }
}
