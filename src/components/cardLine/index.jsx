import React, { Component } from 'react'
import { View, Text, SwiperItem, Image } from '@tarojs/components'
import './index.less'

export default class CardLine extends Component {
  render () {
    const {
      title = 'Title',
      describe = '',
      onClick = () => {},
    } = this.props;

    return (
      <View className="card-line" onClick={onClick}>
        <View className="card-body">
          <View className="main">
            <Text className="title">{title}</Text>
            <Text className="describe">{describe}</Text>
          </View>
          <View className="more" />
        </View>
      </View>
    )
  }
}
