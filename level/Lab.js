oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "Level_BG.png", a + "Level_ditu1.png", a + "Level_ditu2.png", a + "Level_ditu3.png"];
  }(),
  LevelName: $__language_Array__["bf2bb7dacce06f5ca4fc561633a40da5"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/ScienceLab_BG.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal("HomeTown");
      }
    });
    NewImg("imgSF", "images/Plants/Lab/0.gif", "left:104px;top:404px", EDAll, {
      onclick: function () {
        SelectModal("Lab_Clivia");
      }
    });
    NewImg("imgSF", "images/Plants/Lab/0.png", "left:126px;top:390px", EDAll, {
      onclick: function () {
        SelectModal("Lab_Clivia");
      }
    });
    NewImg("imgSF", "images/Plants/Lab/1.gif", "left:243px;top:408px", EDAll, {
      onclick: function () {
        SelectModal("Lab_FirePea");
      }
    });
    NewImg("imgSF", "images/Plants/Lab/1.png", "left:203px;top:390px", EDAll, {
      onclick: function () {
        SelectModal("Lab_FirePea");
      }
    });
    NewImg("imgSF", "images/Plants/RelicFern/0.gif", "left:428px;top:418px", EDAll, {
      onclick: function () {
        SelectModal("Lab_RelicFern");
      }
    });
    NewImg("imgSF", "images/Plants/RelicFern/1.png", "left:444px;top:390px", EDAll, {
      onclick: function () {
        SelectModal("Lab_RelicFern");
      }
    });
    NewImg("1imgSF", "images/Plants/Lab/No.png", "left:549px;top:415px", EDAll, {});
    NewImg("1imgSF", "images/Plants/Lab/No.png", "left:647px;top:411px", EDAll, {});
    NewImg("1imgSF", "images/Plants/Lab/No.png", "left:745px;top:409px", EDAll, {});
    NewImg("imgSF", "images/Plants/Lab/3.png", "left:330px;top:390px", EDAll, {
      onclick: function () {
        SelectModal("Lab_Peper");
      }
    });
    NewImg("imgSF", "images/Plants/Pepper/0.gif", "left:335px;top:400px", EDAll, {
      onclick: function () {
        SelectModal("Lab_Peper");
      }
    });
  }
});