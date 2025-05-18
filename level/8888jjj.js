oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine, oStarfruit, oLongAn, oTaro, oDurian, oSagesage, oPereira, oPeach, oAloe, oBamboo_1, oPlantBreak],
  ZName: [oKungFuDrum],
  //, oForest_Ninja],
  PicArr: function () {
    var a = oThreepeater.prototype,
        b = a.PicArr;
    return ["images/interface/Forest.jpg"];
  }(),
  SunNum: 800,
  CanSelectCard: 1,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  backgroundImage: "images/interface/Forest.jpg",
  LevelName: $__language_Array__["27a3b3405d980a4b068bebd97727368a"],
  LvlEName: 16,
  LargeWaveFlag: {
    10: $("imgFlag1")
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
  AZ: [[oKungFuDrum, 5, 1]],
  //, [oForest_Ninja, 5, 1]],
  FlagNum: 10,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 16, 19],
    a2: [3, 3, 3, 3, 5, 6, 7, 12]
  },
  FlagToMonitor: {
    9: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-akee.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        SelectModal(0);
        SetBlock($('dSurface'), $('iSurfaceBackground'));
      }
    });
  }
});