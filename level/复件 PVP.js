oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "ComingSoon.png", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png"];
  }(),
  LevelName: $__language_Array__["a37e98fa9e651a1a852efbf274d3c003"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/ComingSoon.png",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal("HomeTown");
      }
    });
  }
});