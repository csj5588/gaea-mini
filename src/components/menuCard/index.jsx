import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.less'

export default class MenuCard extends Component {
  render () {
    return (
      <View className="menu-card">
        <View className="icon">
          <Image className="image-icon" src="https://s1.ax1x.com/2020/10/12/0WD7fP.png" />
        </View>
        <Text className="title">
          JavaScript
        </Text>
      </View>
    )
  }
}
