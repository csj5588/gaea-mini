import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui';
import './index.less'

export default class ArtList extends Component {
  handleClick = (id) => {
    console.log(id);
  }
  
  render () {
    const {
      sourceData = [],
    } = this.props;
    // save top three
    const _sourceData = sourceData.splice(0, 3);
    return (
      <View className="art-list">
        <AtList>
          {
            _sourceData.map(item => {
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
