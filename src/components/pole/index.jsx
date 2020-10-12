import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui';
import './index.less'

export default class Pole extends Component {
  handleMore = () => {
    const { onClickMore = () => {} } = this.props;
    onClickMore();
  }

  render () {
    const {
      title = 'Title',
      more = false,
    } = this.props;
    return (
      <View className="pole-root">
        <View className="col-gutter">
          <Text className="title">{title}</Text>
          {
            more ? (
              <View className="more" onClick={this.handleMore}>
                <Text className="more-text">More</Text>
                <AtIcon value='chevron-right' size='14' className="icon" />
              </View>
            ) : null
          }
        </View>
      </View>
    )
  }
}
