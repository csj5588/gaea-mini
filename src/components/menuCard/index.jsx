import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.less'

const DEFAULT_ICON_SRC = 'https://s1.ax1x.com/2020/10/12/0WD7fP.png'

export default class MenuCard extends Component {
  render () {
    const {
      title = '',
      iconSrc = DEFAULT_ICON_SRC,
    } = this.props;
    return (
      <View className="menu-card">
        <View className="icon">
          <Image className="image-icon" src={iconSrc} />
        </View>
        <Text className="title">
          {title}
        </Text>
      </View>
    )
  }
}
