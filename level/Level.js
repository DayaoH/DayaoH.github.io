oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "Level_BG.png", a + "Level_ditu1.png", a + "Level_ditu2.png", a + "Level_ditu3.png"];
  }(),
  LevelName: $__language_Array__["8150177edd3e746dc8e79c7262d791a9"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/Level_BG.png",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("imgSF", "images/interface/Level_ditu1.png", "left:20px;top:80.55px", EDAll, {
      onclick: function () {
        SelectModal(1);
      }
    });
    NewImg("imgSF", "images/interface/Level_ditu2.png", "left:310px;top:87px", EDAll, {
      onclick: function () {
        SelectModal(2);
      }
    });
    NewImg("imgSF", "images/interface/Level_ditu3.png", "left:585px;top:88px", EDAll, {
      onclick: function () {
        SelectModal(3);
      }
    });
    NewImg("imgSF", "images/interface/jxcg_5.png", "left:872px;top:576px", EDAll, {
      onclick: function () {
        SelectModal("Level2");
      }
    });
  }
});