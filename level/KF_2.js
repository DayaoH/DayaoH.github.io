oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "MaoXian_6_2.png", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png", a + "ChoseLevel_BG.png", a + "ChoseLevel_Common.png"];
  }(),
  LevelName: $__language_Array__["5e3003aca3e7bcbdbab41831f25e901f"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/MaoXian_6_2.png",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/Maoxian_Lv4.png", "left:102px;top:172px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Lv5.png", "left:272px;top:92px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Lv6.png", "left:627px;top:326px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Lv7.png", "left:832px;top:343px", EDAll, {});
    NewImg("1imgSF", "images/KungFu/Bamboo/0.gif", "left:445px;top:174px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_5.png", "left:548px;top:536px", EDAll, {});
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_1.png", "left:516px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(1);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_2.png", "left:580px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(2);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_3.png", "left:644px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(3);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_4.png", "left:708px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(73);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_5.png", "left:772px;top:0px", EDAll, {
      onclick: function () {
        SelectModal("FK_1");
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_6.png", "left:836px;top:0px", EDAll, {
      onclick: function () {
        SelectModal("KF_1");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_KungFu_1.png", "left:562px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("KF_1");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_KungFu_2.png", "left:629px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("KF_2");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_KungFu_3.png", "left:698px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("KF_3");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_KungFu_4.png", "left:766px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("KF_4");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_KungFu_5.png", "left:835px;top:537px", EDAll, {
      onclick: function () {
        SelectModal("KF_5");
      }
    });
  }
});