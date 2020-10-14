import React, { Component } from 'react'
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
    this.getData()
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

  render() {
    const { fields, data, banner } = this.state;
    return (
      <View className='index'>
        <Swipper
          data={banner}
        />
        {
          Object.keys(fields).map(key => {
            return [
              <Pole title={fields[key]} more />,
              <ArtList sourceData={data[key] || []} />
            ]
          })
        }
      </View>
    )
  }
}
