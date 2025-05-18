oS.Init({
  PName: [oDurian, oSagesage, oPereira],
  ZName: [oKungFuZombie, oKungFuConeheadZombie, oKungFuBucketheadZombie, oMonkZombie, oMonkConeheadZombie, oMonkBucketheadZombie],
  PicArr: function () {
    var a = oSnowPea.prototype,
        b = a.PicArr;
    return ["images/KungFu/BG.jpg", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
  }(),
  backgroundImage: "images/KungFu/BG.jpg",
  CanSelectCard: 0,
  InitLawnMower: function () {},
  LevelName: $__language_Array__["7ceb387fdd010b860734722414b073a9"],
  SunNum: 100,
  LvlEName: 2,
  LoadMusic: "Dino1",
  StartGameMusic: "Dino2",
  LargeWaveFlag: {
    11: $("imgFlag1")
  }
}, {
  AZ: [[oKungFuZombie, 1, 1], [oKungFuConeheadZombie, 1, 1], [oKungFuBucketheadZombie, 1, 1], [oMonkZombie, 1, 1], [oMonkConeheadZombie, 1, 1], [oMonkBucketheadZombie, 1, 1]],
  FlagNum: 11,
  FlagToSumNum: {
    a1: [3, 5, 9, 10, 11, 12, 13],
    a2: [1, 2, 3, 5, 4, 5, 6, 8]
  },
  FlagToMonitor: {
    11: [ShowFinalWave, 0]
  },
  FlagToEnd: function () {
    NewImg("1imgSF", "images/interface/PassLevel_BG.png", "left:0px;top:0px;z-index:555", EDAll, {});
    NewImg("1imgSF", "images/Card/Plants/Shrubbery.png", "left:400px;top:300px;clip:rect(auto,auto,60px,auto);z-index:556", EDAll, {});
    NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
      onclick: function () {
        SelectModal(28);
      }
    });
  }
});