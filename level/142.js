oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine, oStarfruit, oLongAn],
  ZName: [oFirstKing_6, oFirstKing_7, oFirstKing_10],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/background5.jpg"];
  }(),
  SunNum: 800,
  CanSelectCard: 1,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  backgroundImage: "images/interface/background5.jpg",
  LevelName: $__language_Array__["69e6e0ebbc31c3a806c0fa950da109ba"],
  LvlEName: 16,
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  StartGame: function () {
    CustomSpecial(oWallNut, 1, 5);
    CustomSpecial(oWallNut, 2, 5);
    CustomSpecial(oWallNut, 4, 5);
    CustomSpecial(oWallNut, 5, 5);
    CustomSpecial(oMud, 1, 1);
    CustomSpecial(oMud, 1, 2);
    CustomSpecial(oMud, 1, 3);
    CustomSpecial(oMud, 2, 3);
    CustomSpecial(oMud, 3, 3);
    CustomSpecial(oMud, 3, 4);
    CustomSpecial(oMud, 3, 5);
    CustomSpecial(oMud, 3, 6);
    CustomSpecial(oMud, 3, 7);
    CustomSpecial(oMud, 3, 8);
    CustomSpecial(oMud, 3, 9);
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
  AZ: [[oFirstKing_6, 3, 1], [oFirstKing_7, 2, 5], [oFirstKing_10, 2, 7]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [2, 2, 3, 3, 3, 5, 6, 6]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-Taro.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 143);
      }
    });
  }
});