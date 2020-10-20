import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import Swipper from '@/components/swipper';
import Pole from '@/components/pole';
import ArtList from '@/components/artList';

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Index extends Component {
  state = {
    fields: {},
    data: {},
    banner: [],
  }

  componentDidMount() {
    // this.getData()
    Taro.navigateTo({
      url: `/pages/brains/index`
    })
  }

  getData = () => {
    const db = wx.cloud.database();
    const table = db.collection('home')
    table.doc('home').get({
      success: (res) => {
        const { fields, data, banner } = res.data;
        this.setState({ fields, data, banner });
      }
    });
  }

  toColumns = (categoryId) => {
    Taro.navigateTo({
      url: `/pages/columns/index?categoryId=${categoryId}`
    })
  }

  render() {
    const { fields, data, banner } = this.state;
    return (
      <View className='home'>
        <Swipper
          data={banner}
        />
        {
          Object.keys(fields).map(key => {
            return [
              <Pole title={fields[key]} more onClickMore={() => this.toColumns(key)} />,
              <ArtList sourceData={data[key] || []} sourceType={key} />
            ]
          })
        }
      </View>
    )
  }
}
