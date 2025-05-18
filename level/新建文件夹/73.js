oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "ChoseLevel_BG.png", a + "ChoseLevel_Common.png", a + "MaoXian_4_1.jpg", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png"];
  }(),
  LevelName: $__language_Array__["67ca357a1b390f0f4bcb0ee645ade689"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/MaoXian_4_1.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/csd_0017_Layer-3.png", "left:5px;top:5px", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_1.png", "left:580px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(1);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_2.png", "left:644px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(2);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_3.png", "left:708px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(3);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_4.png", "left:772px;top:0px", EDAll, {
      onclick: function () {
        SelectModal(73);
      }
    });
    NewImg("imgSF", "images/interface/World_Panel_5.png", "left:836px;top:0px", EDAll, {
      onclick: function () {
        SelectModal("FK_1");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv1.png", "left:398px;top:192px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(41);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_4.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_1.png", "left:536px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_1.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_4.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_5.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_9.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(73);
          }
        });
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv2.png", "left:635px;top:321px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(42);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_4.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_2.png", "left:536px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_1.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_4.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_6.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_9.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(73);
          }
        });
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv3.png", "left:785px;top:253px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(43);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_4.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_3.png", "left:536px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_1.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_4.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_6.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_9.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(73);
          }
        });
      }
    });
    NewImg("1imgSF", "images/interface/Maoxian_4_Fire.gif", "left:600.5px;top:404.35px", EDAll, {});
    NewImg("1imgSF", "images/Plants/LaserPea/0.gif", "left:469px;top:212px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_4.png", "left:616px;top:536px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (1).png", "left:629px;top:537px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (2).png", "left:698px;top:537px", EDAll, {
      onclick: function () {
        SelectModal(74);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (3).png", "left:766px;top:537px", EDAll, {
      onclick: function () {
        SelectModal(75);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (4).png", "left:835px;top:537px", EDAll, {
      onclick: function () {
        SelectModal(76);
      }
    });
  }
});