oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine, oStarfruit, oLongAn],
  ZName: [oFirstKing_2, oFirstKing_9],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/background6.jpg"];
  }(),
  SunNum: 800,
  CanSelectCard: 1,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  backgroundImage: "images/interface/background6.jpg",
  LevelName: $__language_Array__["cffd2a1cb37839565187c13d5226328c"],
  LvlEName: 16,
  LargeWaveFlag: {
    10: $("imgFlag1")
  },
  StartGame: function () {
    CustomSpecial(oPeashooter, 1, 1);
    CustomSpecial(oSunFlower, 2, 1);
    CustomSpecial(oSunFlower, 4, 1);
    CustomSpecial(oPeashooter, 5, 1);
    CustomSpecial(oWallNut, 1, 3);
    CustomSpecial(oWallNut, 2, 3);
    CustomSpecial(oWallNut, 3, 5);
    CustomSpecial(oWallNut, 4, 5);
    CustomSpecial(oWallNut, 5, 7);
    CustomSpecial(oMud, 3, 1);
    CustomSpecial(oMud, 3, 2);
    CustomSpecial(oMud, 3, 3);
    CustomSpecial(oMud, 4, 3);
    CustomSpecial(oMud, 5, 3);
    CustomSpecial(oMud, 5, 4);
    CustomSpecial(oMud, 5, 6);
    CustomSpecial(oMud, 4, 6);
    CustomSpecial(oMud, 3, 6);
    CustomSpecial(oMud, 3, 7);
    CustomSpecial(oMud, 3, 8);
    CustomSpecial(oMud, 3, 9);
    CustomSpecial(oMud, 5, 5);
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
  AZ: [[oFirstKing_2, 3, 1], [oFirstKing_9, 2, 3]],
  FlagNum: 10,
  FlagToSumNum: {
    a1: [1, 2, 3, 4, 5, 7, 9],
    a2: [1, 2, 2, 2, 3, 3, 5, 5]
  },
  FlagToMonitor: {
    9: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-Taro.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 142);
      }
    });
  }
});