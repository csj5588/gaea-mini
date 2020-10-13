import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Pole from '@/components/pole'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Columns extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Pole title="title" />
      </View>
    )
  }
}
