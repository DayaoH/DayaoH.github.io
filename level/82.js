oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "ChoseLevel_BG.png", a + "ChoseLevel_Common.png", a + "MaoXian_2_2.jpg", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png"];
  }(),
  LevelName: $__language_Array__["49c1032937f6ada7b20cc76670e1ba63"],
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/MaoXian_2_2.jpg",
  LoadAccess: function (a) {
    NewImg("imgSF", "images/interface/World_Panel_6.png", "left:836px;top:0px", EDAll, {
      onclick: function () {
        SelectModal("KF_1");
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv3.png", "left:275px;top:231px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(13);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_2.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_3.png", "left:536px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_1.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/1_8.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/1_9.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_2.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_3.png", "left:644px;top:313px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(82);
          }
        });
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv4.png", "left:666px;top:430px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(14);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_2.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_4.png", "left:536px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_1.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/1_8.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/1_9.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_1.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_2.png", "left:644px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_3.png", "left:338px;top:396px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(82);
          }
        });
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv5.png", "left:876px;top:344px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(15);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_2.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_5.png", "left:536px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_1.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/1_8.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/1_9.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_1.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_2.png", "left:644px;top:313px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(82);
          }
        });
      }
    });
    NewImg("1imgSF", "images/Plants/CGTree/0.gif", "left:29.2px;top:-53px", EDAll, {});
    NewImg("1imgSF", "images/xiyoures/Plantern/1.gif", "left:452px;top:248px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_4.png", "left:616px;top:536px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (5).png", "left:629px;top:537px", EDAll, {
      onclick: function () {
        SelectModal(2);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (6).png", "left:698px;top:537px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (7).png", "left:766px;top:537px", EDAll, {
      onclick: function () {
        SelectModal(83);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (8).png", "left:835px;top:537px", EDAll, {
      onclick: function () {
        SelectModal(78);
      }
    });
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
  }
});