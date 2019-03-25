const app = getApp()
var QQMapWX = require('/qqmap/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  data: {
    longitude:0,
    latitude:0,
    controls:[
      {
        id: 1,
        iconPath: '/assets/images/focus.png',
        position: {
          left: 10,
          top: 450,
          width: 35,
          height: 35
        },
        clickable: true},
      
    ],
    start: '39.9761869497,116.3538730145',
    dest: '39.9049628889,116.4272689819',
    pl: null,
    markers: [{
      iconPath: "/assets/images/position.png",
      id: 0,
      latitude: 10,
      longitude: 10,
      width: 1,
      height: 1
    }]
  },

  //加载时显示用户位置
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: '464BZ-WJZ3U-RFAVT-4BOJI-FV773-TDBD4'
    });
    this.mapCtx = wx.createMapContext('myMap')
  },
  

  onShow: function(){
    var _this = this;
    if (app.globalData.ticket_route) {
      console.log('有ticket', app.globalData.strLatitude + ',' + app.globalData.strLongitude)
        _this.setData({
          start: app.globalData.strLatitude+','+app.globalData.strLongitude,
          dest: app.globalData.endLatitude+','+app.globalData.endLongitude
        })

      //调用距离计算接口
      qqmapsdk.direction({
        mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
        //from参数不填默认当前地址
        from: _this.data.start,
        to: _this.data.dest,
        success: function (res) {
          console.log(res);
          var ret = res;
          var coors = ret.result.routes[0].polyline, pl = [];
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          var kr = 1000000;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          //将解压后的坐标放入点串数组pl中
          for (var i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i + 1] })
          }
          console.log(pl)
          //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
          _this.setData({
            latitude: pl[0].latitude,
            longitude: pl[0].longitude,
            polyline: [{
              points: pl,
              color: '#0bb20cDD',
              width: 4
            }]
          })
        },
        fail: function (res) {
          console.log(res);
        }
      });
    };
    
  },

  onReady: function () {
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  },

  //获取用户地理信息
  toMy: function(){
    wx.navigateTo({
      url: '/pages/ticket/ticket'
    })
  },

  toPurchase: function(){
    wx.navigateTo({
      url: '/pages/purchase/purchase'
    })
  },
  
  controltap: function (e) {
    console.log(e.controlId);
    var _this = this;
    var pl = _this.data.pl;
    if(e.controlId==1){
      this.mapCtx.moveToLocation();
      };
    },
})