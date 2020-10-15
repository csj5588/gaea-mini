import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import utils from '@/utils';
import _isEmpty from 'lodash/isEmpty'
import { AtButton, AtToast } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

const START = 'start';
const PLAYING = 'playing';

export default class Brains extends Component {
  state = {
    picList: [],
    copyList: [],
    picGroup: [], // 本屏队列
    gameState: START, // start playing
    topPicUrl: '',
    endStatus: false,
    successStatus: false,
  }

  componentDidMount() {
    this.getPicList()
  }

  getPicList = () => {
    const db = wx.cloud.database();
    const table = db.collection('pic')
    table.doc('pic').get({
      success: (res) => {
        const { data = [] } = res.data;
        this.setState({ picList: data, copyList: data }, () => {
          this.init()
        });
      }
    });
  }

  init = () => {
    const { image = '' } = this.getOnePic()
    // 随机选取一张照片。
    this.setState({ topPicUrl: image });
  }

  getOnePic = () => {
    const { picList } = this.state;
    const num = utils.randomNum(0, picList.length - 1);
    const target = picList.find((x, i) => i === num) || {}
    const _picList = picList.filter((x, i) => i !== num);
    this.setState({ picList: _picList });
    return target
  }

  gameStateToPlaying = () => {
    this.setState({ gameState: PLAYING });
    // 下一轮方法
    this.nextRround()
  }

  nextRround = () => {
    const { topPicUrl, picList } = this.state;

    // goOn?
    if (_isEmpty(picList)) {
      // 挑战成功
      this.modalShowWithState('successStatus')
      return false;
    }

    const prePicUrl = topPicUrl;
    // cancel picGroup
    this.setState({ picGroup: [] })
    // 更换头图
    const { image = '' } = this.getOnePic()
    // 随机一张 + prePicUrl = picGroup
    const { image: image2 } = this.getOnePic()
    const picGroup = [topPicUrl, image2];
    this.setState({ topPicUrl: image, picGroup, prePicUrl });
  }

  canNextRound = url => {
    const { prePicUrl } = this.state;
    const isRight = url === prePicUrl;
    
    isRight ? this.nextRround() : this.modalShowWithState('endStatus')
  }

  modalShowWithState = state => {
    this.setState({ [state]: true }, () => {
      setTimeout(() => {
        this.setState({
          endStatus: false,
          picGroup: [], // 本屏队列
          gameState: START, // start playing
          [state]: false,
        });
        this.getPicList();
      }, 2000)
    })
  }

  getImage = (url) => {
    return (
      <Image
        onClick={() => this.canNextRound(url)}
        className="image"
        src={url}
      />
    )
  }

  render () {
    const { gameState, topPicUrl, picGroup, endStatus, successStatus } = this.state;

    const isStart = gameState === START;
    const isPlaying = gameState === PLAYING;

    return (
      <View className='brains'>
        <View className="banner">
          <Text className="text">记住下方图片</Text>
          {this.getImage(topPicUrl)}
        </View>
        {
          isStart ? (
            <View className="start-button">
              <AtButton
                type='primary'
                onClick={this.gameStateToPlaying}
              >
                开始吧
              </AtButton>
            </View>
          ) : isPlaying ? (
            <View className="playing">
              <View className="flex-center">
                <Text className="text">请选择前一张图片</Text>
              </View>
              <View className="pic-group">
                {
                  picGroup.map(url => {
                    return this.getImage(url)
                  })
                }
              </View>
            </View>
          ) : null
        }
        <AtToast
          isOpened={endStatus}
          text="失败了，您的分数为10"
          image="https://img.ikstatic.cn/MTYwMjc3NTMzMTU3MSM3MTQjcG5n.png"
        />
        <AtToast
          isOpened={successStatus}
          text="挑战成功，你的记忆里太棒了！"
          image="https://img.ikstatic.cn/MTYwMjc3NTg2MTk3MiM0MjIjcG5n.png"
        />
      </View>
    )
  }
}
