import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Result extends Component {
  routeTo = () => {
    Taro.redirectTo({
      url: '/pages/brains/index'
    })
  }

  render () {
    const { type, score } = getCurrentInstance().router.params;
    const isSuccess = type === 'success';
    const isFail = type === 'fail';
    return (
      <View className='result'>
        {
          isSuccess ? [
            <Image
              className="image"
              src="https://img.ikstatic.cn/MTYwMjc3NTg2MTk3MiM0MjIjcG5n.png"
            />,
            <Text className="text">挑战成功，你的记忆里太棒了！</Text>
          ] : isFail ? [
            <Image
              className="image"
              src="https://img.ikstatic.cn/MTYwMjc3NTMzMTU3MSM3MTQjcG5n.png"
            />,
            <Text className="text">失败了，您的分数为{score}分</Text>
          ] : null
        }
        <View className="restart-button">
          <AtButton
            type='primary'
            onClick={this.routeTo}
          >
            再次挑战
          </AtButton>
        </View>
      </View>
    )
  }
}
