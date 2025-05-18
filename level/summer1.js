oS.Init({
  PName: [oPuffShroom, oPuffShroom1, oSunFlower, oPeashooter],
  ZName: [oBeachZombie, oLostCityZombie, oTouZombie, oBiluZZ, oJaneZombie],
  PicArr: ["images/interface/summer.jpg"],
  backgroundImage: "images/interface/summer.jpg",
  CanSelectCard: 0,
  DKind: 0,
  SunNum: 50,
  LevelName: $__language_Array__["38091aa3a7f56297d79560de68cd83f7"],
  LvlEName: 11,
  LargeWaveFlag: {
    10: $("imgFlag3"),
    20: $("imgFlag1")
  },
  UserDefinedFlagFunc: function (a) {
    oP.FlagNum == oP.FlagZombies && oP.SetTimeoutTomZombie([oZombie, oConeheadZombie, oBucketheadZombie]);
  },
  StartGameMusic: "Ultimate battle"
}, {
  AZ: [[oBeachZombie, 2, 1], [oLostCityZombie, 1, 1], [oTouZombie, 1, 1], [oBiluZZ, 1, 1], [oJaneZombie, 1, 1]],
  FlagNum: 20,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19, 26],
    a2: [1, 2, 3, 10, 4, 5, 6, 20, 27]
  },
  FlagToMonitor: {
    13: [ShowLargeWave, 0],
    26: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oCoin, 0);
      }
    });
    NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
  }
});