import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.less'

export default class CMPSwipper extends Component {
  routeToCategory = (categoryId) => {
    if (!categoryId) return;
    const isRoute = categoryId.includes('/pages');
    if (isRoute) {
      Taro.navigateTo({
        url: '/pages/brains/index'
      })
    } else {
      Taro.navigateTo({
        url: `/pages/columns/index?categoryId=${categoryId}`
      }) 
    }
  }

  render () {
    const { data } = this.props;
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
          {
            data.map(item => {
              return (
                <SwiperItem>
                  <Image
                    onClick={() => this.routeToCategory(item.id)}
                    className="swipper-img"
                    src={item.url}
                  />
                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    )
  }
}
