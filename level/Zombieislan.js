oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "ZombieIsLand_BG.jpg", a + "ZombieIsLand_1.png", a + "ZombieIsLand_Shadow.png"];
  }(),
  LevelName: $__language_Array__["0256b2208cd5113ad67cb941d9e665cd"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/ZombieIsLand_BG.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal("Town");
      }
    });
    NewImg("imgSF", "images/interface/ZombieIsLand_1.png", "left:43px;top:152px", EDAll, {
      onclick: function () {
        SelectModal("Land1");
      }
    });
    NewImg("imgSF", "images/interface/ZombieIsLand_Shadow.png", "left:325px;top:147px", EDAll, {});
  }
});