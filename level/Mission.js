oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "TA.png", a + "TAUI1.png", a + "TAUIPLAY.png", a + "TA10.png", a + "TA20.png", a + "TA30.png", a + "TA40.png", a + "TA50.png", a + "TA60.png"];
  }(),
  LevelName: $__language_Array__["30fc69a9879f73c2d936b806f11199c9"],
  LevelEName: 150,
  ShowScroll: 1,
  LoadMusic: "PVZOL_City_Music_10",
  backgroundImage: "images/interface/Mission_Back.png",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/TAUI1.png", "left:830px;top:71px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("imgSF", "images/interface/Mission_Mission.png", "left:21px;top:129px", EDAll, {
      onclick: function () {}
    });
    NewImg("imgSF", "images/interface/Mission_Mission.png", "left:21px;top:198px", EDAll, {
      onclick: function () {}
    });
    NewImg("imgSF", "images/interface/Mission_Mission.png", "left:21px;top:267px", EDAll, {
      onclick: function () {}
    });
    NewImg("imgSF", "images/interface/Mission_Mission.png", "left:21px;top:336px", EDAll, {
      onclick: function () {}
    });
    NewImg("imgSF", "images/interface/Mission_Mission.png", "left:21px;top:403px", EDAll, {
      onclick: function () {}
    });
    NewImg("imgSF", "images/interface/Mission_Mission.png", "left:21px;top:472px", EDAll, {
      onclick: function () {}
    });
  }
});