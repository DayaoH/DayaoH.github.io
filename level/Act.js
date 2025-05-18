oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "ACT_BG.jpg"];
  }(),
  LevelName: $__language_Array__["a2734dcc969ce41636923c895a351200"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/ACT_BG.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
  }
});