oS.Init({
  PName: [oPeashooter, oSunFlower, oWallNut, oPuffShroom, oFumeShroom, oScaredyShroom, oLotus, oBamboo, oCGTree, oCactus, oGloomShroom, oPrimnalPea, oPrimnalSun, oPrimnalNut, oColdnap, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan, oXiaoHuangTao, oempeach],
  ZName: [oHeadZombie, oDisco3000, oBackupDancer, oShield, oJetPack, oBossJetpack],
  PicArr: ["images/interface/Future_.png"],
  backgroundImage: "images/interface/Future_.png",
  CanSelectCard: 1,
  SunNum: 1500,
  LevelName: $__language_Array__["fd2c8958f10a83fb81d86875a0d800a4"],
  LF: [0, 0, 1, 1, 1, 0],
  LoadMusic: $__language_Array__["6fcf97e3fa41f725fa315819b4bb4c52"],
  StartGameMusic: $__language_Array__["84e75a223fa67f18cbda984e195dd5bf"],
  InitLawnMower: function () {},
  StartGame: function () {
    CustomSpecial(oKiller, 1, 1);
    CustomSpecial(oKiller, 5, 1);
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
  AZ: [[oHeadZombie, 1, 5], [oDisco3000, 3, 15], [oShield, 1, 10], [oJetPack, 2, 1], [oBossJetpack, 1, 9]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [3, 4, 3, 4, 5, 8, 9, 13]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    19: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/interface/trophy.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal("FK_1");
      }
    });
  }
});