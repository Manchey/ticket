// pages/destination/destination.js

const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: '464BZ-WJZ3U-RFAVT-4BOJI-FV773-TDBD4'
});

Page({
  data: {
    value: '',
    address: []
  },

  searchInputend(e) {

    var that = this;
    var value = e.detail.value
    var address = that.address;

    qqmapsdk.getSuggestion({
      keyword: value,
      success: function (res) {
        let data = res.data
        that.setData({
          address: data,
          value
        })
      }
    })
  },

  toIndex(e) {
    const destination = e.currentTarget.dataset.destination;
    const endAddress = e.currentTarget.dataset.end;
    qqmapsdk.geocoder({
      address: endAddress,
      success: function (res) {
        app.globalData.endLatitude = res.result.location.lat;
        app.globalData.endLongitude = res.result.location.lng;
      }
    })
    app.globalData.destination = destination,
      wx.redirectTo({
        url: "/pages/purchase/purchase",
      })
  },
})