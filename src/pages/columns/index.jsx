import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import CardLine from '@/components/cardLine';

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Columns extends Component {
  state = {
    categoryId: '',
    data: [],
    value: '', // search
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
        this.setState({
          data: _list,
          all: _list,
        });
      }
    });
  }

  routeTo = (articleId) => {
    const { categoryId } = this.state;
    Taro.navigateTo({
      url: `/pages/article/index?articleId=${articleId}&categoryId=${categoryId}`
    })
  }

  onChange = (value) => {
    const { all } = this.state;
    let _data = all;
    if (value) {
      _data = all.filter(x => x.title.includes(value));
    }
    this.setState({ data: _data, value });
  }

  render () {
    const { data, value } = this.state;
    return (
      <View className="columns-root">
        <AtSearchBar
          value={value}
          onChange={this.onChange}
        />
        <View className='columns-list'>
          {
            data.map(item => {
              return (
                <CardLine
                  onClick={() => this.routeTo(item.id)}
                  title={item.title}
                  describe={item.describe}
                />
              )
            })
          }
        </View>
      </View>
    )
  }
}
