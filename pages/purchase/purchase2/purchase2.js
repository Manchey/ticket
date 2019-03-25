// pages/purchase/purchase2/purchase2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '1A', value: '1A' },
      { name: '1B', value: '1B', checked: true },
      { name: '1D', value: '1D' },
      { name: '2A', value: '2A' },
      { name: '2B', value: '2B' },
      { name: '2D', value: '2D' },
      { name: '3A', value: '3A' },
      { name: '3B', value: '3B' }
    ],
    route: '路线',
    date: '日期',
    time: '班次',
    seat:'1B'
  },
  onLoad: function(options){
    console.log('接受数据', options.route,options.date,options.time)
    this.setData({
      route: options.route,
      date: options.date,
      time: options.time
    })
  },
  toIndex: function(){
    var that = this;
    wx.redirectTo({
      url: '/pages/purchase/purchase2/purchase3?route=' + that.data.route + '&date=' + that.data.date + '&time=' + that.data.time+'&seat='+that.data.seat
    })
  },

  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      seat: e.detail.value
    });
  },
})