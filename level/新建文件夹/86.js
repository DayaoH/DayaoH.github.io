oS.Init({
  PicArr: function () {
    a = "images/interface/";
    return [ShadowPNG, a + "ChoseLevel_BG.png", a + "ChoseLevel_Common.png", a + "MaoXian_3_4.jpg", a + "Maoxian_Lv1.png", a + "Maoxian_Lv2.png", a + "Maoxian_Lv3.png"];
  }(),
  LevelName: "٪�޼�4",
  LevelEName: 1,
  ShowScroll: 1,
  backgroundImage: "images/interface/MaoXian_3_4.jpg",
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
    NewImg("imgSF", "images/interface/Maoxian_Lv8_.png", "left:100px;top:466px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(28);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_3.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_8.png", "left:536px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_1.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_9.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_1.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_2.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_3.png", "left:644px;top:313px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(86);
          }
        });
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv9.png", "left:457px;top:309px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(29);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_3.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_9.png", "left:536px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_1.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_9.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_1.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_2.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_3.png", "left:644px;top:313px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(86);
          }
        });
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Lv10_.png", "left:635px;top:227px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(30);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_3.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_1.png", "left:523px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_Num_0.png", "left:546px;top:8px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_1.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_9.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_1.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_2.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_3.png", "left:644px;top:313px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(86);
          }
        });
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_LvBoss_.png", "left:235px;top:196px", EDAll, {
      onclick: function () {
        NewImg("1imgSF", "images/interface/ChoseLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/ChoseLevel_Common.png", "left:464px;top:504px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(30);
          }
        });
        NewImg("imgSF", "images/interface/ChoseLevel_Hard_Easy.png", "left:111px;top:497px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_3.png", "left:265px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Title_World_BOSS.png", "left:477px;top:11px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/ChoseLevel_Condition_5.png", "left:335px;top:176px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/2_9.png", "left:338px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_1.png", "left:441px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_2.png", "left:543px;top:313px;z-index:555", EDAll, {});
        NewImg("1imgSF", "images/interface/Zombie/3_3.png", "left:644px;top:313px;z-index:555", EDAll, {});
        NewImg("imgSF", "images/interface/Act_Cl.png", "left:721px;top:27px;z-index:555", EDAll, {
          onclick: function () {
            SelectModal(86);
          }
        });
      }
    });
    NewImg("1imgSF", "images/Plants/PrimnalPotatoMine/0.gif", "left:295px;top:370px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_4.png", "left:616px;top:536px", EDAll, {});
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (10).png", "left:629px;top:537px", EDAll, {
      onclick: function () {
        SelectModal(3);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (9).png", "left:698px;top:537px", EDAll, {
      onclick: function () {
        SelectModal(84);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (11).png", "left:766px;top:537px", EDAll, {
      onclick: function () {
        SelectModal(85);
      }
    });
    NewImg("imgSF", "images/interface/Maoxian_Chose_ (12).png", "left:835px;top:537px", EDAll, {});
  }
});