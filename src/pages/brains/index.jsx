import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import utils from '@/utils';
import _isEmpty from 'lodash/isEmpty'
import { AtButton, AtToast } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

const START = 'start';
const PLAYING = 'playing';
const DEFAULT_COUNT = 3;

let score = 0;
let downCountTimer;

export default class Brains extends Component {
  state = {
    picList: [],
    copyList: [],
    picGroup: [], // 本屏队列
    gameState: START, // start playing
    topPicUrl: '',
    downCount: DEFAULT_COUNT,
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
      this.modalShowWithState('success')
      return false;
    }

    const prePicUrl = topPicUrl;
    // cancel picGroup
    this.setState({ picGroup: [] })
    // 更换头图
    const { image = '' } = this.getOnePic()
    // 随机一张 + prePicUrl = picGroup
    const { image: image2 } = this.getOnePic();
    const { image: image3 } = this.getOnePic();
    const { image: image4 } = this.getOnePic();

    const picGroup = [topPicUrl, image2, image3, image4];
    const _picGroup = utils.shuffle(picGroup)
    // addScore
    score++
    // handle downCount

    this.handleDownCount();

    this.setState({ topPicUrl: image, picGroup: _picGroup, prePicUrl });
  }

  handleDownCount = () => {
    // inital
    clearInterval(downCountTimer)
    this.setState({ downCount: DEFAULT_COUNT })

    const intervalDownCount = () => {
      downCountTimer = setInterval(() => {
        const { downCount } = this.state;
        if (downCount < 1) {
          // GameOver
          clearInterval(downCountTimer)
          this.modalShowWithState('fail');
          return false;
        }
        const nextDownCount = downCount - 1;
        this.setState({ downCount: nextDownCount })
      }, 1000)
    }

    intervalDownCount();
  }

  canNextRound = url => {
    const { prePicUrl } = this.state;
    const isRight = url === prePicUrl;
    
    isRight ? this.nextRround() : this.modalShowWithState('fail')
  }

  modalShowWithState = type => {
    this.setState({
      picGroup: [], // 本屏队列
      gameState: START, // start playing
      topPicUrl: '',
    })
    this.getPicList();
    Taro.redirectTo({
      url: `/pages/result/index?type=${type}&score=${score}`
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
    const { gameState, topPicUrl, picGroup, downCount } = this.state;

    const isStart = gameState === START;
    const isPlaying = gameState === PLAYING;
    const bannerText = `记住下方图片${isPlaying ? `(倒计时：${downCount})` : ''}`

    return (
      <View className='brains'>
        <View className="banner">
          <Text className="text">{bannerText}</Text>
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
      </View>
    )
  }
}
