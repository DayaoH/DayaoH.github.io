oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "KaiFaZhe.jpg", a + "KaiFaZhe_feel.jpg"];
  }(),
  LevelName: $__language_Array__["0a2dd2e3a5cf603ad2d2a354f2397236"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/KaiFaZhe_.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("imgSF", "images/interface/Image 54.jpg", "left:142px;top:91px", EDAll, {
      onclick: function () {
        SelectModal("KaiFaZhe_P");
      }
    });
    NewImg("imgSF", "images/interface/Image 54.jpg", "left:302px;top:91px", EDAll, {
      onclick: function () {
        SelectModal("KaiFaZhe_PLF");
      }
    });
    NewImg("imgSF", "images/interface/Image 54.jpg", "left:142px;top:213px", EDAll, {
      onclick: function () {
        SelectModal("KaiFaZhe_Z");
      }
    });
    NewImg("imgSF", "images/interface/Image 54.jpg", "left:500px;top:500px", EDAll, {
      onclick: function () {
        SelectModal(53);
      }
    });
    NewImg("imgSF", "images/interface/Image 54.jpg", "left:302px;top:213px", EDAll, {
      onclick: function () {
        SelectModal("KaiFaZhe_ZLF");
      }
    });
  }
});