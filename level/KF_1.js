oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "MaoXian_6_1.png", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png", a + "ChoseLevel_BG.png", a + "ChoseLevel_Common.png"];
  }(),
  LevelName: $__language_Array__["4c7aee982c88bc44e84f1c416805d3ad"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/MaoXian_6_1.png",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/Maoxian_Lv1.png", "left:221px;top:265px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Lv2.png", "left:351px;top:332px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Lv3.png", "left:665px;top:343px", EDAll, {});
    NewImg("1imgSF", "images/KungFu/LawnMower.png", "left:458px;top:225px", EDAll, {});
    NewImg("1imgSF", "images/KungFu/Peach/0.gif", "left:830px;top:252px", EDAll, {});
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