oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "Time_BG.jpg"];
  }(),
  LevelName: $__language_Array__["d9b014387e79056b8f9eadfc563b8f9a"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/Time_BG.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("1imgSF", "images/interface/list.png", "left:73px;top:63px", EDAll, {}); //ClearChild(images/interface/list.png),
  }
});