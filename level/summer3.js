oS.Init({
  PName: [oStallia, oLavaGrava, oSunFlower],
  ZName: [oBeachZombie, oPZombie, oCowBoy],
  PicArr: ["images/interface/summer.jpg"],
  backgroundImage: "images/interface/summer.jpg",
  CanSelectCard: 0,
  DKind: 0,
  SunNum: 300,
  LevelName: $__language_Array__["14f6b7c86005dd2ad00310b036da9b8b"],
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
  AZ: [[oBeachZombie, 2, 1], [oPZombie, 1, 1], [oCowBoy, 3, 1]],
  FlagNum: 10,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13],
    a2: [1, 2, 3, 10, 4, 5]
  },
  FlagToMonitor: {
    9: [ShowLargeWave, 0],
    13: [ShowFinalWave, 0]
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