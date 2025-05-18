oS.Init({
  PName: [oGloomShroom, oLongAn, oPumpkinHead, oNap, oTaro],
  ZName: [oFirstKing_1, oFirstKing_4, oFirstKing_5, oFirstKing_6, oFirstKing_7],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/background3.jpg"];
  }(),
  SunNum: 9900,
  CanSelectCard: 0,
  DKind: 0,
  LoadMusic: "Mus_Terracotta_Map_doma",
  StartGameMusic: "Mus_Terracotta_Battle_Tower",
  backgroundImage: "images/interface/background3.jpg",
  LevelName: $__language_Array__["41a66f8319337bf142f0cc5b0b972ebb"],
  LvlEName: 16,
  InitLawnMower: function () {},
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  StartGame: function () {
    CustomSpecial(oWallNut, 1, 1);
    CustomSpecial(oWallNut, 2, 1);
    CustomSpecial(oWallNut, 3, 1);
    CustomSpecial(oWallNut, 4, 1);
    CustomSpecial(oWallNut, 5, 1);
    CustomSpecial(oWallNut, 1, 2);
    CustomSpecial(oWallNut, 2, 2);
    CustomSpecial(oWallNut, 3, 2);
    CustomSpecial(oWallNut, 4, 2);
    CustomSpecial(oWallNut, 5, 2);
    CustomSpecial(oWallNut, 1, 3);
    CustomSpecial(oWallNut, 2, 3);
    CustomSpecial(oWallNut, 3, 3);
    CustomSpecial(oWallNut, 4, 3);
    CustomSpecial(oWallNut, 5, 3);
    CustomSpecial(oWallNut, 1, 4);
    CustomSpecial(oWallNut, 2, 4);
    CustomSpecial(oWallNut, 3, 4);
    CustomSpecial(oWallNut, 4, 4);
    CustomSpecial(oWallNut, 5, 4);
    CustomSpecial(oWallNut, 1, 5);
    CustomSpecial(oWallNut, 2, 5);
    CustomSpecial(oWallNut, 3, 5);
    CustomSpecial(oWallNut, 4, 5);
    CustomSpecial(oWallNut, 5, 5);
    CustomSpecial(oWallNut, 1, 6);
    CustomSpecial(oWallNut, 2, 6);
    CustomSpecial(oWallNut, 3, 6);
    CustomSpecial(oWallNut, 4, 6);
    CustomSpecial(oWallNut, 5, 6);
    CustomSpecial(oWallNut, 1, 7);
    CustomSpecial(oWallNut, 2, 7);
    CustomSpecial(oWallNut, 3, 7);
    CustomSpecial(oWallNut, 4, 7);
    CustomSpecial(oWallNut, 5, 7);
    CustomSpecial(oWallNut, 1, 8);
    CustomSpecial(oWallNut, 2, 8);
    CustomSpecial(oWallNut, 3, 8);
    CustomSpecial(oWallNut, 4, 8);
    CustomSpecial(oWallNut, 5, 8);
    CustomSpecial(oWallNut, 1, 9);
    CustomSpecial(oWallNut, 2, 9);
    CustomSpecial(oWallNut, 3, 9);
    CustomSpecial(oWallNut, 4, 9);
    CustomSpecial(oWallNut, 5, 9);
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
  }
}, {
  AZ: [[oFirstKing_1, 6, 1], [oFirstKing_4, 4, 1], [oFirstKing_5, 4, 1], [oFirstKing_6, 4, 1], [oFirstKing_7, 4, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [4, 4, 4, 4, 4, 4, 4, 10]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal("challenge");
      }
    });
  }
});