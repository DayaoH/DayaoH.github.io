oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "Town.jpg", a + "tongtian.png", a + "jiangshidao.png"];
  }(),
  LevelName: $__language_Array__["22daa037cbb7a905935606efc8da224f"],
  LevelEName: 1,
  ShowScroll: 1,
  LoadMusic: "PVZOL_City_Music_10",
  backgroundImage: "images/interface/Town.jpg",
  LoadAccess: function (a) {
    NewImg("1imgSF", "images/interface/Town_Flag.gif", "left:493px;top:123px", EDAll, {});
    NewImg("imgSF", "images/interface/TongtianTa.png", "left:426px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(99);
      }
    });
    NewImg("imgSF", "images/interface/Town_Zombie.png", "left:0px;top:0px", EDAll, {
      onclick: function () {
        SelectModal("Lab");
      }
    });
    NewImg("imgSF", "images/interface/Town_MyHome.png", "left:339px;top:248px", EDAll, {
      onclick: function () {
        SelectModal("MyHome");
      }
    });
    NewImg("1imgSF", "images/interface/Town_Grass.png", "left:792px;top:185px", EDAll, {});
    NewImg("1imgSF", "images/interface/Town_Dog.gif", "left:809px;top:180px", EDAll, {});
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
  }
});