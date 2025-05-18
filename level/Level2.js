oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "Level_BG.png", a + "Level_ditu1.png", a + "Level_ditu2.png", a + "Level_ditu3.png"];
  }(),
  LevelName: $__language_Array__["307afe5c121f78d867f22ae5f6f4035a"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/Level_BG.png",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal("Level");
      }
    });
    NewImg("1imgSF", "images/interface/Level_ditu0.png", "left:310px;top:87px", EDAll, {});
    NewImg("imgSF", "images/interface/Level_ditu5.png", "left:20px;top:80.55px", EDAll, {
      onclick: function () {
        SelectModal("73");
      }
    });
  }
});