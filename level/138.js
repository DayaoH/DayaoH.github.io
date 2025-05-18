oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oSnowPea, oTwinSunflower, oSpikerock, oCactus, oPrimnalPotatoMine, oStarfruit],
  ZName: [oDisco3000, oBackupDancer, oFirstKing_10],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/Future.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/Future.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["cb21314e2b361daa416f3f76eec905dc"],
  SunNum: 775,
  LvlEName: 2,
  LoadMusic: "TongtiantaBGMEM",
  StartGameMusic: "TongtiantaBGMEB",
  LargeWaveFlag: {
    9: $("imgFlag1")
  },
  StartGame: function () {
    CustomSpecial(oPeashooter, 1, 1);
    CustomSpecial(oSunFlower, 2, 1);
    CustomSpecial(oSunFlower, 4, 1);
    CustomSpecial(oPeashooter, 5, 1);
    CustomSpecial(oWallNut, 1, 5);
    CustomSpecial(oWallNut, 2, 5);
    CustomSpecial(oWallNut, 3, 5);
    CustomSpecial(oWallNut, 4, 5);
    CustomSpecial(oWallNut, 5, 5);
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
  AZ: [[oFirstKing_10, 10, 1], [oDisco3000, 1, 3]],
  FlagNum: 9,
  FlagToSumNum: {
    a1: [3, 5, 9],
    a2: [10, 8, 12, 14]
  },
  FlagToMonitor: {
    11: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/Card/Plants/A-LongAn.png", "left:243px;top:410px;clip:rect(auto,auto,121px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoi, 139);
      }
    });
  }
});