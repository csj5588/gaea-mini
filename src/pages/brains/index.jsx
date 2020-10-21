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
const GROUP_NUM = 4;
const ADD_LEVEL_SCORE = 4;
const LEVEL_1 = 1;
const LEVEL_2 = 2;
const LEVEL_3 = 3;

let score = 0;
let downCountTimer;

export default class Brains extends Component {
  state = {
    picList: [],
    checkList: [], // 选中列表
    copyList: [],
    picGroup: [], // 本屏队列
    gameState: START, // start playing
    topPicUrl: [],
    downCount: DEFAULT_COUNT,
    level: LEVEL_1,
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
    const { level } = this.state;
    // 随机选取一张照片。
    this.setState({ topPicUrl: this.getMorePic(level) });
  }

  getOnePic = () => {
    const { picList } = this.state;
    const num = utils.randomNum(0, picList.length - 1);
    const target = picList.find((x, i) => i === num) || {}
    const _picList = picList.filter((x, i) => i !== num);
    this.setState({ picList: _picList });
    return target
  }

  getMorePic = (n) => new Array(+n).fill('').map(this.getOnePic);

  gameStateToPlaying = () => {
    this.setState({ gameState: PLAYING });
    // 下一轮方法
    this.nextRround()
  }

  nextRround = () => {
    const { topPicUrl, picList, level } = this.state;

    // goOn?
    if (_isEmpty(picList)) {
      // 挑战成功
      this.modalShowWithState('success')
      return false;
    }

    const prePicUrl = [...topPicUrl];
    // cancel picGroup
    this.setState({ picGroup: [] })
    // 更换头图
    // 随机一张 + prePicUrl = picGroup
    const picGroup = [...topPicUrl, ...this.getMorePic(GROUP_NUM - level)];
    const _picGroup = utils.shuffle(picGroup)
    // addScore
    score++
    // handle downCount
    this.handleDownCount();

    const _level = ADD_LEVEL_SCORE > score ? LEVEL_1 : ADD_LEVEL_SCORE * 2 > score ? LEVEL_2 : LEVEL_3

    this.setState({
      checkList: [],
      prePicUrl,
      topPicUrl: this.getMorePic(_level),
      picGroup: _picGroup,
      level: _level,
    });
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
    const { prePicUrl, checkList } = this.state;

    const _checkList = [...checkList];

    const isHaven = checkList.includes(x => x === url);
    const isRight = !isHaven && prePicUrl.some(x => x.image === url);
    isRight ? _checkList.push(url) : this.modalShowWithState('fail')

    const isSameLength = _checkList.length === prePicUrl.length;
    
    isSameLength ? this.nextRround() : this.setState({ checkList: _checkList })
  }

  modalShowWithState = type => {
    this.setState({
      picGroup: [], // 本屏队列
      gameState: START, // start playing
      topPicUrl: [],
    })
    clearInterval(downCountTimer)
    score = 0;
    this.getPicList();
    Taro.redirectTo({
      url: `/pages/result/index?type=${type}&score=${score}`
    })
  }

  getImage = (url) => {
    return (
      <View className="group-image-box">
        <Image
          onClick={() => this.canNextRound(url)}
          className="image"
          src={url}
        />
      </View>
    )
  }

  render () {
    const { gameState, topPicUrl, picGroup, downCount, level } = this.state;

    const isStart = gameState === START;
    const isPlaying = gameState === PLAYING;
    const bannerText = `记住下方图片${isPlaying ? `(倒计时：${downCount})` : ''}`

    return (
      <View className='brains'>
        <View className="banner">
          <Text className="text">{bannerText}</Text>
          <View className={`top-pic-${level}`}>
            {topPicUrl.map(item => this.getImage(item.image))}
          </View>
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
                <Text className="text">请选择前${level}张图片</Text>
              </View>
              <View className="pic-group">
                {
                  picGroup.map(item => this.getImage(item.image))
                }
              </View>
            </View>
          ) : null
        }
      </View>
    )
  }
}
