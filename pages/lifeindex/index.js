var app = getApp();
Page
  ({
      data: {},
      onLoad: function(options) {

        onLoad
        wx.setNavigationBarTitle({

          title: '生活指数'
        })
        let
          lifeindex = wx.getStorageSync('life');

        this
          .setData({
            lifeindex: lifeindex
          })
      },
      onShareAppMessage: function () {
      }
  })