import React, { Component } from 'react'
import { View, Text, SwiperItem, Image } from '@tarojs/components'
import './index.less'

export default class NoData extends Component {
  render () {
    return (
      <View className="no-data">
        <Image className="image" src="https://s1.ax1x.com/2020/10/13/0h9AaT.png" />
        <Text className="text">暂无数据</Text>
      </View>
    )
  }
}
