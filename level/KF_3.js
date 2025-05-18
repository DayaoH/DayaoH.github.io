oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "MaoXian_6_3.png", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png", a + "ChoseLevel_BG.png", a + "ChoseLevel_Common.png"];
  }(),
  LevelName: $__language_Array__["8b8da24409a5b2d0fea4a16aa82fb99b"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/MaoXian_6_3.png",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/Maoxian_Lv8.png", "left:256px;top:245px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Lv9.png", "left:170px;top:299px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Lv10.png", "left:226px;top:370px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Lv11.png", "left:614px;top:326px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Lv12.png", "left:744px;top:219px", EDAll, {});
    NewImg("1imgSF", "images/KungFu/Durian/0.gif", "left:114px;top:178px", EDAll, {});
    NewImg("1imgSF", "images/KungFu/Pereira/0.gif", "left:396px;top:167px", EDAll, {});
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