// pages/purchase.js
const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: '464BZ-WJZ3U-RFAVT-4BOJI-FV773-TDBD4'
});

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    list: [
      {
        id: 'Route1',
        name: '路线一',
        open: false,
        start: '北京站',
        end: '唯实大厦',
        stations: ['Beijing Station','Xizhimen','Hirain']
      },
      {
        id: 'Route2',
        name: '路线二',
        open: false,
        start: '唯实大厦',
        end: '北京站',
        stations: ['Hirain', 'Xizhimen', 'Beijing Station']
      },
      {
        id: 'Route3',
        name: '路线三',
        open: false,
        start: '唯实大厦',
        end: '北京南站',
        stations: ['Hirain', 'Xizhimen', 'Beijing South Station']
      }
    ],
    route: '路线',
    date: '日期',
    time: '班次',
    timeList: ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
    destination: '',
    bluraddress: ''
  },

  onShow: function(){
    this.setData({
      address: app.globalData.bluraddress,
      destination: app.globalData.destination
    })
  },

  bindPickerChange: function (e) {
    console.log('route发送选择改变，携带值为', e.detail.value)
    this.setData({
      route: this.data.routeList[parseInt(e.detail.value)]
    })
  },
  bindDateChange: function (e) {
    console.log('date发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('time发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: this.data.timeList[parseInt(e.detail.value)]
    })
  },

  toPurchase2: function () {
    var that = this;
    if (that.data.destination != ''){
      this.setData({
        route: that.data.address + '-' + that.data.destination
      })
    }
    if (that.data.route == '路线' || that.data.time == '班次' || that.data.date == '日期'){
      this.setData({
        showTopTips: true
      })
    }if(!this.data.showTopTips){
      wx.navigateTo({
        url: '/pages/purchase/purchase2/purchase2?route=' + that.data.route + '&date=' + that.data.date + '&time=' + that.data.time,
      })
      console.log('传输数据', that.data.route, that.data.time)
    }else if(that.data.route!='路线'&&that.data.time!='班次'&&that.data.date!='日期'){
      this.setData({
        showTopTips: false
      })
    }
  }
})

