var app = getApp()
var day = ["今天 ", "明天 ", " 后天 "];
Page({
  data: {
    day: day,
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    that.getLocation();
  },
  //获取经纬度方法
  getLocation: function() {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);
        that.getCity(latitude, longitude);
      }
    })
  },
  //获取城市信息
  getCity: function(latitude, longitude) {
    var that = this;
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "KyNSKS68VCAjE7ceugXqnIClYQwcpLmg",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function(res) {
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({
          city: city,
          district: district,
          street: street,
        })
        var descCity = city.substring(0, city.length - 1);
        that.getWeahter(descCity);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取天气信息
  getWeahter: function(city) {
    var that = this
    var url = "https://free-api.heweather.com/s6/weather"
    var url2 = "https://free-api.heweather.com/s6/air"
    var parameters = {
      location:city,
      key:"HE1901191226161385"
    }
    wx.request({
      url: url,
      data: parameters,
      success: function(res) {
        console.log(res.data.HeWeather6[0]);
        var tmp = res.data.HeWeather6[0].now.tmp;
        var txt = res.data.HeWeather6[0].now.cond_txt;
        var code = res.data.HeWeather6[0].now.cond_code;
        var dir = res.data.HeWeather6[0].now.wind_dir;
        var sc = res.data.HeWeather6[0].now.wind_sc;
        var hum = res.data.HeWeather6[0].now.hum;
        var fl = res.data.HeWeather6[0].now.fl;
        var daily_forecast = res.data.HeWeather6[0].daily_forecast;
        that.setData({
          tmp: tmp,
          txt: txt,
          code: code,
          dir: dir,
          sc: sc,
          hum: hum,
          fl: fl,
          daily_forecast: daily_forecast
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.request({
      url: url2,
      data: parameters,
      success: function(res) {
        var qlty = res.data.HeWeather6[0].air_now_city.qlty;
        var pm25 = res.data.HeWeather6[0].air_now_city.pm25;
        // var air_forecast = res.data.HeWeather6[0].air_forecast;
        that.setData({
          qlty: qlty,
          pm25: pm25
          // air_forecast: air_forecast
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onShareAppMessage: function() {
    return {
      path: "/pages/weather/weather",
      success: function() {
        wx.showToast({
          title: '分享成功',
          icon: "success",
          duration: 2000
        })
      }
    }
  }
})


