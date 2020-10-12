import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Swipper from '@/components/swipper';
import Pole from '@/components/pole';
import ArtList from '@/components/artList';

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Index extends Component {
  render () {
    return (
      <View className='index'>
        <Swipper />
        <Pole title="CSS代码片段" more />
        <ArtList />
        <Pole title="JS代码片段" more />
        <ArtList />
      </View>
    )
  }
}
