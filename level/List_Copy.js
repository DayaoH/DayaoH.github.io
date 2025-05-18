oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "ZombieIsLand_BG_1.jpg", a + "Level_ditu1.png", a + "Level_ditu2.png", a + "Level_ditu3.png"];
  }(),
  LevelName: $__language_Array__["a542a2314852ba38c80e0af9faca1083"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/ZombieIsLand_BG_1.jpg",
  LoadAccess: function (a) {
    NewImg("1imgSF", "images/interface/List.png", "left:0px;top:0px", EDAll, {});
    NewImg("1imgSF", "images/interface/imcreater.png", "left:761px;top:557px", EDAll, {
      onclick: function () {
        SelectModal("KaiFaZhe");
      }
    });
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
  }
});