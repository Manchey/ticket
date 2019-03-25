// pages/ticket/ticket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticket_route: 'null',
    ticket_date: 'null',
    ticket_time: 'null',
    ticket_seat: 'null'
  },
  
  onLoad: function(){
    var app = getApp();
    this.setData({
      ticket_route: app.globalData.ticket_route,
      ticket_date: app.globalData.ticket_date,
      ticket_time: app.globalData.ticket_time,
      ticket_seat: app.globalData.ticket_seat
    })

  },
  toIndex: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
})