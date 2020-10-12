import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui';
import './index.less'

export default class ArtList extends Component {
  render () {
    return (
      <View className="art-list">
        <AtList>
          <AtListItem title='标题文字' />
          <AtListItem title='标题文字' />
          <AtListItem title='标题文字' />
          <AtListItem title='标题文字' />
        </AtList>
      </View>
    )
  }
}
