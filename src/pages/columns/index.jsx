import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import CardLine from '@/components/cardLine';

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Columns extends Component {
  state = {
    categoryId: '',
    data: [],
  }

  componentWillMount () {
    const { categoryId } = getCurrentInstance().router.params
    this.setState({ categoryId });
  }

  componentDidMount () {
    this.getCategoryList()
  }
  
  getCategoryList = () => {
    const { categoryId } = this.state;

    const db = wx.cloud.database();
    const table = db.collection('snippet')
    table.doc('snippet').get({
      success: (res) => {
        const { data = {} } = res.data;
        const _list = data[categoryId] || [];
        console.log(_list)
        this.setState({ data: _list });
      }
    });
  }

  render () {
    const { data } = this.state;
    console.log(data)
    return (
      <View className='columns-root'>
        {
          data.map(item => {
            return (
              <CardLine
                onClick={() => {}}
                title={item.title}
                describe={item.describe}
              />
            )
          })
        }
      </View>
    )
  }
}
