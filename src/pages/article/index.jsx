import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import utils from '@/utils'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Article extends Component {
  state = {
    articleId: '',
    info: {
      content: [],
    }
  }

  componentDidMount() {
    this.getArticle()
  }

  getArticle = () => {
    const { articleId } = getCurrentInstance().router.params
    if (!articleId) return;

    const db = wx.cloud.database();
    const table = db.collection('article')
    table.doc('article/css').get({
      success: (res) => {
        const { data = [] } = res.data;
        const _info = data.find(x => x.id === articleId) || {};
        this.setState({ info: _info });
      }
    });
  }

  contrast = {
    h2: (val) => (<View className='at-article__h2'>{val}</View>),
    h3: (val) => (<View className='at-article__h3'>{val}</View>),
    p: (val) => (<View className='at-article__p'>{val}</View>),
    image: (val) => (<Image className='at-article__img' src={val} mode='widthFix' />),
  }

  getView = line => {
    const { type } = line;
    const val = line[type];
    return this.contrast[type](val)
  }

  render() {
    const { info } = this.state;
    // const time = info.time ? new Date(info.time) : '--'
    return (
      <View className="article">
        <View className='at-article'>
          <View className='at-article__h1'>
            {info.title}
          </View>
          <View className='at-article__info'>
            {utils.GMTToStr(info.time)}
          </View>
          <View className='at-article__content'>
            <View className='at-article__section'>
              {info.content.map(item => this.getView(item))}
            </View>
          </View>
        </View>
      </View>
    )
  }
}
