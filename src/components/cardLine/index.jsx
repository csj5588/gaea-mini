import React, { Component } from 'react'
import { View, Text, SwiperItem, Image } from '@tarojs/components'
import './index.less'

export default class CardLine extends Component {
  render () {
    return (
      <View className="card-line">
        <View className="card-body">
          <View className="main">
            <Text className="title">title</Text>
            <Text className="describe">describe</Text>
          </View>
          <View className="more" />
        </View>
      </View>
    )
  }
}
