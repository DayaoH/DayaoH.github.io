oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "ZombieIsLand_BG_1.jpg", a + "adventure_Land.png"];
  }(),
  LevelName: $__language_Array__["2756207349d5c22ac06d89c836df131d"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/ZombieIsLand_BG_1.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal("Town");
      }
    });
    NewImg("1imgSF", "images/interface/adventure_Land.png", "left:207px;top:0px", EDAll, {});
    NewImg("imgSF", "images/interface/Image 6.jpg", "left:306px;top:171px", EDAll, {
      onclick: function () {
        SelectModal(61);
      }
    });
    NewImg("imgSF", "images/interface/Image 6.jpg", "left:418px;top:171px", EDAll, {});
    NewImg("imgSF", "images/interface/Image 6.jpg", "left:531px;top:171px", EDAll, {});
    NewImg("imgSF", "images/interface/Image 6.jpg", "left:306px;top:295px", EDAll, {});
    NewImg("imgSF", "images/interface/Image 6.jpg", "left:418px;top:295px", EDAll, {});
    NewImg("imgSF", "images/interface/Image 6.jpg", "left:531px;top:295px", EDAll, {});
  }
});