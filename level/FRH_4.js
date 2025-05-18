oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oHatSnowPea, oFumeShroom, oStallia, oScaredyShroom, oFumeShroomSong, oTwinSunflower, oPuffShroom, oFD, oBB, oBamboo, oCGTree, oLotus, oCactus, oGloomShroom, oGarlic, oSpikerock, oPrimnalPea, oPrimnalNut, oColdnap, oShrubbery, oPrimnalSun, oLongAn, oNap, oTaro, oStarfruit, oStarfruit_T],
  ZName: [oDinoZombie1, oDinoConeheadZombie1, oDinoBucketheadZombie1, oDinoTombZombie1, oDinoCamelZombie, oDinoBossImp],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/Dino_FuBen.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  LF: [0, 1, 1, 1, 1, 1],
  backgroundImage: "images/interface/Dino_FuBen.png",
  CanSelectCard: 1,
  LevelName: $__language_Array__["883f547bc982a90e19022a683839db05"],
  SunNum: 350,
  LvlEName: 3,
  LoadMusic: "Adverse Reactions",
  StartGameMusic: "Evolution",
  LoadAccess: function (a) {
    NewImg("1imgSF", "images/interface/Dino_FuBen_1.png", "left:1021px;top:187px;z-index:7", EDAll, {});
    NewEle("DivTeach", "div", 0, 0, EDAll);

    (function (d) {
      var b = arguments.callee,
          c = $("DivTeach");

      switch (d) {
        case 0:
          ClearChild($("DivTeach"));
          oSym.addTask(200, function () {
            ClearChild($("dDave"));
            a(0);
          }, []);
      }
    })(0);
  },
  StartGame: function () {
    CustomSpecial(oFireHill, 1, 5);
    CustomSpecial(oFireHill, 2, 5);
    CustomSpecial(oFireHill, 3, 5);
    CustomSpecial(oFireHill, 4, 5);
    CustomSpecial(oFireHill, 5, 5); //CustomSpecial(oMud, 1, 6);
    //CustomSpecial(oMud, 1, 7);
    //CustomSpecial(oMud, 1, 8);
    //CustomSpecial(oMud, 1, 9);
    //CustomSpecial(oMud, 2, 6);
    //CustomSpecial(oMud, 2, 7);
    //CustomSpecial(oMud, 2, 8);
    //CustomSpecial(oMud, 2, 9);
    //CustomSpecial(oMud, 3, 6);
    //CustomSpecial(oMud, 3, 7);
    //CustomSpecial(oMud, 3, 8);
    //CustomSpecial(oMud, 3, 9);
    //CustomSpecial(oMud, 4, 6);
    //CustomSpecial(oMud, 4, 7);
    //CustomSpecial(oMud, 4, 8);
    //CustomSpecial(oMud, 4, 9);
    //CustomSpecial(oMud, 5, 6);
    //CustomSpecial(oMud, 5, 7);
    //CustomSpecial(oMud, 5, 8);
    //CustomSpecial(oMud, 5, 9);

    StopMusic();
    PlayMusic(oS.LoadMusic = oS.StartGameMusic);
    NewMusic(oS.LoadMusic = oS.StartGameMusic);
    SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
    oS.InitLawnMower();
    PrepareGrowPlants(function () {
      oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
      BeginCool();
      oS.DKind && AutoProduceSun(50);
      oSym.addTask(1500, function () {
        oP.AddZombiesFlag();
        SetVisible($("dFlagMeterContent"));
      }, []);
    });
  },
  InitLawnMower: function () {},
  LargeWaveFlag: {
    9: $("imgFlag1"),
    15: $("imgFlag2")
  }
}, {
  AZ: [[oDinoCamelZombie, 4, 5, [5]], [oDinoZombie1, 6, 2], [oDinoConeheadZombie1, 8, 3], [oDinoBucketheadZombie1, 2, 5], [oDinoTombZombie1, 5, 9], [oDinoBossImp, 1, [1]]],
  FlagNum: 15,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15],
    a2: [1, 3, 5, 7, 5, 7, 10]
  },
  FlagToMonitor: {
    15: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG_Challenge.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:360px;top:540px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal("FRH_5");
      }
    });
  }
});