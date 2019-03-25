// pages/purchase/purchase2/purchase3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    route: '路线',
    date: '日期',
    time: '班次',
    seat: '座位'
  },
  
  onLoad: function (options) {
    console.log('接受数据', options.route, options.date, options.time,options.seat)
    this.setData({
      route: options.route,
      date: options.date,
      time: options.time,
      seat: options.seat
    });
    getApp().globalData.ticket_route = this.data.route;
    getApp().globalData.ticket_date = options.date;
    getApp().globalData.ticket_time = options.time;
    getApp().globalData.ticket_seat = options.seat
  },
  toIndex: function(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  toTicket: function(){
    wx.reLaunch({
      url: '/pages/ticket/ticket'
    })
  }
})