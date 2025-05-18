oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "MaoXian_5.jpg", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png", a + "Maoxian_Lv4.png", a + "Maoxian_Lv5.png", a + "Maoxian_Lv6.png", a + "Maoxian_Lv7.png", a + "Maoxian_Lv8.png", a + "Maoxian_Lv9.png", a + "Maoxian_Lv10.png"];
  }(),
  LevelName: $__language_Array__["d424a85cabb67a963d6081ad37d562e2"],
  LevelEName: 1,
  ShowScroll: 1,
  //LoadMusic: "Lg_Map",
  //StartGameMusic: "Lg_Map",
  //AudioArr: ["Lg_Map"],
  backgroundImage: "images/interface/MaoXian_5.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:0px;top:0px", EDAll, {
      onclick: function () {
        SelectModal("Level2");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv1.png", "left:57px;top:514px", EDAll, {
      onclick: function () {
        SelectModal(41);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv2.png", "left:162px;top:427px", EDAll, {
      onclick: function () {
        SelectModal(42);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv3.png", "left:174px;top:323px", EDAll, {
      onclick: function () {
        SelectModal(43);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv4.png", "left:186px;top:210px", EDAll, {
      onclick: function () {
        SelectModal(44);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv5.png", "left:247px;top:177px", EDAll, {
      onclick: function () {
        SelectModal(45);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv6.png", "left:318px;top:230px", EDAll, {
      onclick: function () {
        SelectModal(46);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv7.png", "left:486px;top:274px", EDAll, {
      onclick: function () {
        SelectModal(47);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv8.png", "left:507px;top:368px", EDAll, {
      onclick: function () {
        SelectModal(48);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv9.png", "left:647px;top:383px", EDAll, {
      onclick: function () {
        SelectModal(49);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv10.png", "left:687px;top:174px", EDAll, {
      onclick: function () {
        SelectModal(50);
      }
    });
  }
});