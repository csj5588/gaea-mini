import React, { Component } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.less'

export default class CMPSwipper extends Component {
  render () {
    return (
      <View className="cmp-swipper">
        <Swiper
          className='cmp-swipper-container'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image
              className="swipper-img"
              src='https://s1.ax1x.com/2020/10/12/0RKcp6.jpg'
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              className="swipper-img"
              src='https://s1.ax1x.com/2020/10/12/0RMphq.jpg'
            />
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}
