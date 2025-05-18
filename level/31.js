oS.Init({
  PName: [oPeashooter, oSunFlower, oPrimnalPea, oPrimnalNutBowling, oPrimnalNut, oShrubbery, oColdnap, oXiaoLaserBean, oPrimnalSun],
  ZName: [oDinoZombie, oDinoConeheadZombie, oDinoBucketheadZombie, oDinoTombZombie],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/interface/DINO.png", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/interface/DINO.png",
  CanSelectCard: 0,
  LevelName: $__language_Array__["f99ded6fbb71ae0f74655be54ceda7a9"],
  SunNum: 100,
  LvlEName: 2,
  LoadMusic: "winmusic",
  StartGameMusic: "winmusic",
  InitLawnMower: function () {
    CustomSpecial(oDinoCleaner, 1, -1);
    CustomSpecial(oDinoCleaner, 2, -1);
    CustomSpecial(oDinoCleaner, 3, -1);
    CustomSpecial(oDinoCleaner, 4, -1);
    CustomSpecial(oDinoCleaner, 5, -1);
  },
  LargeWaveFlag: {
    9: $("imgFlag1")
  }
}, {
  AZ: [[oDinoZombie, 4, 1], [oDinoConeheadZombie, 3, 1], [oDinoBucketheadZombie, 2, 1], [oDinoTombZombie, 1, 1]],
  FlagNum: 10,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 13, 15, 19],
    a2: [1, 2, 3, 10, 4, 5, 6, 20]
  },
  FlagToMonitor: {
    11: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("imgSF", "images/LG_NEWIMG/Card/BagOfCoin.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
      onclick: function () {
        GetNewCard(this, oShuilei, 3);
      }
    });
    NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
  }
});