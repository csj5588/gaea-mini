import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui';
import './index.less'

export default class ArtList extends Component {
  handleClick = (articleId) => {
    const { sourceType: categoryId } = this.props;
    Taro.navigateTo({
      url: `/pages/article/index?articleId=${articleId}&categoryId=${categoryId}`
    })
  }
  
  render () {
    const {
      sourceData = [],
    } = this.props;
    return (
      <View className="art-list">
        <AtList>
          {
            sourceData.map(item => {
              return (
                <AtListItem
                  onClick={() => this.handleClick(item.id)}
                  title={item.title}
                  thumb='https://s1.ax1x.com/2020/10/12/0R5ryn.png'
                />
              )
            })
          }
        </AtList>
      </View>
    )
  }
}
