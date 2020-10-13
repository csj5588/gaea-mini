import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import CardLine from '@/components/cardLine';
import MenuCard from '@/components/menuCard';

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Category extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const db = wx.cloud.database();
    const table = db.collection('category')
    table.doc('category').get({
      success: (res) => {
        const { data } = res.data;
        this.setState({ data });
      }
    });
  }

  routeTo = () => {
    Taro.navigateTo({
      url: '/pages/columns/index'
    })
  }

  render () {
    const { data } = this.state;
    return (
      <View className='category'>
        {
          data.map(item => {
            return (
              <View className='card' onClick={this.routeTo}>
                <MenuCard
                  title={item.title}
                />
              </View>
            )
          })
        }
        <CardLine />
        <CardLine />
      </View>
    )
  }
}
