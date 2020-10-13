import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import MenuCard from '@/components/menuCard';

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Category extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='at-row category'>
        <View className='at-col card'>
          <MenuCard />
        </View>
        <View className='at-col card'>
          <MenuCard />
        </View> 
      </View>
    )
  }
}
