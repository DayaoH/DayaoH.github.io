var _InheritO, _InheritO2;

var CPlants = NewO({
  name: "Plants",
  HP: 300,
  PKind: 1,
  beAttackedPointL: 20,
  CardGif: 0,
  StaticGif: 1,
  Range: NaN,
  NormalGif: 2,
  BookHandBack: 0,
  canEat: 1,
  zIndex: 0,
  AudioArr: [],
  coolTime: 7.5,
  CanSelect: 1,
  canShovel: true,
  canTrigger: 1,
  Stature: 0,
  Sleep: 0,
  CanGrow: function CanGrow(c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1];
  },
  getHurt: function getHurt(e, c, b) {
    var d = this,
        a = d.id;
    !(c % 3) ? (d.HP -= b) < 1 && d.Die() : d.Die();
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -21 : -15;
  },
  GetDX: function GetDX() {
    return -Math.floor(this.width * 0.5);
  },
  GetDBottom: function GetDBottom() {
    return this.height;
  },
  Birth: function Birth(d, c, h, a, m, n) {
    var e = this,
        k = d + e.GetDX(),
        i = c + e.GetDY(h, a, m),
        l = e.prototype,
        g = i - e.height,
        b = e.id = "P_" + Math.random(),
        j = e.zIndex += 3 * h,
        f = NewEle(0, "div", "position:absolute");

    if ($User.HTML5) {
      e.PicArr = e.PicArr.slice(); //复制一份数组，避免中途更改PicArr
      //初始化随机化图片

      for (var index in e.PicArr) {
        if (e.PicArr[index] && !/base64/.test(e.PicArr[index])) {
          e.PicArr[index] = RandomPic(e.PicArr[index], false, true);
        }
      }

      f.addEventListener("DOMNodeRemoved", function fun(event) {
        if (event.target !== f) {
          return;
        }

        e.RemoveRandomPic();
        f.removeEventListener("DOMNodeRemoved", fun);
      });
    }

    NewImg(0, ShadowPNG, e.getShadow(e), f);
    NewImg(0, e.PicArr[e.NormalGif], "", f);
    e.pixelLeft = k;
    e.pixelRight = k + e.width;
    e.pixelTop = g;
    e.pixelBottom = g + e.GetDBottom();
    e.opacity = 1;
    e.InitTrigger(e, b, e.R = h, e.C = a, e.AttackedLX = k + e.beAttackedPointL, e.AttackedRX = k + e.beAttackedPointR);
    $P[b] = e;
    $P.length += 1;
    e.BirthStyle(e, b, f, {
      left: k + "px",
      top: g + "px",
      zIndex: j
    }, n);
    oGd.add(e, h + "_" + a + "_" + e.PKind);
    e.PrivateBirth(e, n);
  },
  RemoveRandomPic: function RemoveRandomPic() {
    let self = this;

    for (let index in self.PicArr) {
      try {
        oSym.addTask(6000, () => {
          URL.revokeObjectURL(self.PicArr[index]);
        });
        delete oImage["garbage"][self.PicArr[index]];
      } catch (_unused) {}
    }
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - 48) + "px;top:" + (a.height - 22) + "px";
  },
  BirthStyle: function BirthStyle(c, d, b, a) {
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  PrivateBirth: function PrivateBirth(a) {},
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, oS.W, 0]];
  },
  getTriggerR: function getTriggerR(a) {
    return [a, a];
  },
  InitTrigger: function InitTrigger(c, b, f, a, h, g) {
    var j = {},
        i = c.getTriggerR(f),
        e = i[0],
        d = i[1];

    do {
      oT.add(e, j[e] = c.getTriggerRange(e, h, g), b);
    } while (e++ != d);

    c.oTrigger = j;
  },
  TriggerCheck: function TriggerCheck(b, a) {
    this.AttackCheck2(b) && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(140, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function AttackCheck1(g, f) {
    var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

    if (a && a.PZ && (h = c[a.R])) {
      k = a.ZX;
      e = h.length;

      while (e--) {
        j = h[e];

        if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {
          b.CheckLoop(g, j[2]);
          return;
        }
      }
    }

    b.canTrigger = 1;
  },
  AttackCheck2: function AttackCheck2(a) {
    return a.Altitude > 0;
  },
  PrivateDie: function PrivateDie(a) {},
  BoomDie: function BoomDie() {
    var a = this,
        b = a.id;
    a.oTrigger && oT.delP(a);
    a.HP = 0;
    delete $P[b];
    delete oGd.$[a.R + "_" + a.C + "_" + a.PKind];
    $P.length -= 1;
    ClearChild($(b));
    a.PrivateDie(a);
  },
  Die: function Die(a) {
    var b = this,
        c = b.id;
    b.oTrigger && oT.delP(b);
    b.HP = 0;
    delete $P[c];
    delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
    $P.length -= 1;
    !a && ClearChild($(c));
    b.PrivateDie(b);
  }
}),
    oLawnCleaner = InheritO(CPlants, {
  EName: "oLawnCleaner",
  CName: $__language_Array__["21de47c62e232016374cf21e558c4062"],
  width: 71,
  height: 57,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/interface/LawnCleaner.png"],
  AudioArr: ["Lawnmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function TriggerCheck(b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  BoomDie: function BoomDie() {},
  Tooltip: $__language_Array__["2f887606e2edd1ee3b2ceb4b32d3ed33"],
  NormalAttack: function NormalAttack(a) {
    PlayAudio(a.AudioArr[0]);

    (function (b, c, k, j, e, g) {
      var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

      while (f--) {
        (h = d[f]).getCrushed(b) && h.CrushDie();
      }

      k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
    })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
  }
}),
    oPoolCleaner = InheritO(oLawnCleaner, {
  EName: "oPoolCleaner",
  CName: $__language_Array__["6c5de94d553b68a041030a39fe93eed8"],
  width: 71,
  height: 57,
  beAttackedPointL: 0,
  beAttackedPointR: 47,
  SunNum: 0,
  PicArr: ["images/interface/LawnCleaner.png"],
  Tooltip: $__language_Array__["6c5de94d553b68a041030a39fe93eed8"],
  AudioArr: ["pool_cleaner"]
}),
    oSeaCleaner = InheritO(CPlants, {
  EName: "oSeaCleaner",
  CName: $__language_Array__["f611a23c8190ad34e46fe136eb0ab0fa"],
  width: 71,
  height: 48,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/LG_NEWIMG/SeaCleaner.png"],
  AudioArr: ["Lawnmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function TriggerCheck(b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  BoomDie: function BoomDie() {},
  Tooltip: $__language_Array__["fbb674c45dc8f8e7fac1f3c41144507d"],
  NormalAttack: function NormalAttack(a) {
    PlayAudio(a.AudioArr[0]);

    (function (b, c, k, j, e, g) {
      var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

      while (f--) {
        (h = d[f]).getCrushed(b) && h.CrushDie();
      }

      k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
    })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
  }
}),
    oFK = InheritO(CPlants, {
  EName: "oFK",
  CName: $__language_Array__["62e56d39985660a876e3476121fb7134"],
  width: 71,
  height: 48,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/interface/Mower_qin.png"],
  AudioArr: ["Lwanmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  GetDX: function GetDX() {
    return -68;
  },
  TriggerCheck: function TriggerCheck(b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  BoomDie: function BoomDie() {},
  NormalAttack: function NormalAttack(a) {
    PlayAudio(a.AudioArr[0]);

    (function (b, c, k, j, e, g) {
      var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

      while (f--) {
        (h = d[f]).getCrushed(b) && h.CrushDie();
      }

      k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
    })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
  }
}),
    oBrains = InheritO(CPlants, {
  EName: "oBrains",
  CName: $__language_Array__["43e9fff32f7e4e2292da32a638be1e83"],
  width: 32,
  height: 31,
  beAttackedPointL: 0,
  beAttackedPointR: 32,
  SunNum: 0,
  PicArr: ["images/interface/brain.png"],
  Tooltip: $__language_Array__["ac55ed7eba3098b3951ac13242f15b75"],
  NormalGif: 0,
  InitTrigger: function InitTrigger() {},
  PrivateBirth: function PrivateBirth(a) {
    a.PrivateDie = oS.BrainsNum ? (a.DieStep = Math.floor(150 / oS.BrainsNum), function (d) {
      var c, b;
      AppearSun(Math.floor(GetX(d.C) - 40 + Math.random() * 41), GetY(d.R), 50, 0);
      (b = --oS.BrainsNum) ? (c = b * d.DieStep, $("imgFlagHead").style.left = c - 11 + "px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + c + "px)") : ($("imgFlagHead").style.left = "-1px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)", oP.FlagToEnd());
    }) : function (b) {
      GameOver();
    };
  },
  GetDX: function GetDX() {
    return -40;
  }
}),
    oPeashooter = InheritO(CPlants, {
  EName: "oPeashooter",
  CName: $__language_Array__["21d80a8ab1a20128fd445576b159f706"],
  width: 71,
  height: 67,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 51,
  SunNum: 100,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Peashooter/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
  Tooltip: $__language_Array__["0534d04bb916bbaa4a997d10162bd925"],
  Produce: $__language_Array__["ebedf772b350ed47d5ff16a33c2b951c"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    oSym.addTask(15, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/PB" + m + c + ".gif");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/Plants/PeaBulletHit.gif", oSym.addTask(30, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oSnowPea = InheritO(oPeashooter, {
  EName: "oSnowPea",
  CName: $__language_Array__["e69f9309605de80897c6da6953b97221"],
  width: 78,
  height: 67,
  SunNum: 175,
  BKind: -1,
  PicArr: ["images/Card/Plants/SnowPea.png", "images/Plants/SnowPea/0.gif", "images/Plants/SnowPea/SnowPea.gif", "images/Plants/PBSnow.png", "images/Plants/PeaSBulletHit.gif"],
  AudioArr: ["frozen", "SnowPeaHit1", "SnowPeaHit2", "SnowPeaHit3", "shieldhit", "shieldhit2", "plastichit"],
  Tooltip: $__language_Array__["722d1e2bf745e05d5516aa58d015f765"],
  Produce: $__language_Array__["6a7ad7530d73b44001755d944dfaae9a"],
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["793afbd92b846646c6efa0022ca937f6"]);
    var a = this,
        b = "PB" + Math.random();
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    oSym.addTask(15, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m < 1 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), ++m && (h = 40), k = e, j.src = "images/Plants/PBSnow.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/Plants/PeaSBulletHit.gif", oSym.addTask(55, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 20, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oHatSnowPea = InheritO(oPeashooter, {
  EName: "oHatSnowPea",
  CName: $__language_Array__["ca6849cd796d517ea63eac2a4f03674d"],
  width: 78,
  height: 85,
  SunNum: 175,
  BKind: -1,
  PicArr: ["images/Card/Plants/SnowPea.png", "images/Plants/SnowPea/1.gif", "images/Plants/SnowPea/1.gif", "images/Plants/IceBomb.png", "images/Plants/PeaSBulletHit.gif"],
  AudioArr: ["frozen", "SnowPeaHit1", "SnowPeaHit2", "SnowPeaHit3", "shieldhit", "shieldhit2", "plastichit"],
  Tooltip: $__language_Array__["722d1e2bf745e05d5516aa58d015f765"],
  Produce: $__language_Array__["46c5adc5ebb13dcb2cf018cc32be612b"],
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["793afbd92b846646c6efa0022ca937f6"]);
    var a = this,
        b = "PB" + Math.random();
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    oSym.addTask(15, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m < 1 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), ++m && (h = 40), k = e, j.src = "images/Plants/IceBomb.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/Plants/PeaSBulletHit.gif", oSym.addTask(55, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 50, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oRepeater = InheritO(oPeashooter, {
  EName: "oRepeater",
  CName: $__language_Array__["eece5406046345c0cb7cf1f6c154cc3c"],
  width: 73,
  height: 71,
  beAttackedPointR: 53,
  SunNum: 200,
  PicArr: ["images/Card/Plants/Repeater.png", "images/Plants/Repeater/0.gif", "images/Plants/Repeater/Repeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["4bbc8b7d5cdbf10b586326a219994567"],
  Produce: $__language_Array__["6f4ac3181eca892a6a16fe5180e04b3d"],
  NormalAttack1: oPeashooter.prototype.NormalAttack,
  NormalAttack: function NormalAttack(a) {
    this.NormalAttack1();
    oSym.addTask(15, function (c) {
      var b = $P[c];
      b && b.NormalAttack1();
    }, [this.id]);
  }
}),
    oThreepeater = InheritO(oPeashooter, {
  EName: "oThreepeater",
  CName: $__language_Array__["0e6a94a5c78599d5e140bd464be72dd6"],
  width: 73,
  height: 80,
  beAttackedPointR: 53,
  SunNum: 325,
  PicArr: ["images/Card/Plants/Threepeater.png", "images/Plants/Threepeater/0.gif", "images/Plants/Threepeater/Threepeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["6efed7f2dae2f5a41ab5bb3e352701ab"],
  Produce: $__language_Array__["cd812a1992cfca1aec856beed242c301"],
  getTriggerR: function getTriggerR(R) {
    return [R > 2 ? R - 1 : 1, R < oS.R ? Number(R) + 1 : R];
  },
  //传递行返回触发器行上下限,返回格式是[下限，上限]
  PrivateBirth: function PrivateBirth(o) {
    //oP.PBirthPrgs(o); //出生时建立一个子弹图片，射击直接使用cloneNode//创建一个子弹对象，射击直接继承该对象
    var LX = o.AttackedLX,
        pixelLeft = LX - 40,
        pixelTop,
        oT = o.oTrigger,
        R;
    o.BulletClass = [];
    o.BulletEle = [];

    for (R in oT) {
      o.BulletClass.push(NewO({
        X: LX,
        R: R,
        D: 0,
        Attack: 20,
        Kind: 0,
        ChangeC: 0,
        pixelLeft: pixelLeft,
        F: oGd.MB1
      }));
      o.BulletEle.push(NewImg(0, "images/Plants/PB00.gif", "left:" + pixelLeft + "px;top:" + (GetY(R) - 50) + "px;visibility:hidden;z-index:" + (3 * R + 2)));
    }
  },
  PrivateDie: function PrivateDie(o) {
    oP.PDiePrgs(o);
    o.BulletEle.length = 0;
  },
  NormalAttack: function NormalAttack() {
    var v,
        o = this,
        id,
        i = 0;

    for (v in o.oTrigger) {
      EditEle(o.BulletEle[i++].cloneNode(false), {
        id: id = "PB" + Math.random()
      }, 0, EDPZ);
      oSym.addTask(15, function (id) {
        var o = $(id);
        o && SetVisible(o);
      }, [id]);
      oSym.addTask(1, function (id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T) {
        //移动豌豆类子弹
        var side,
            C = GetC(OX),
            Z = oZ["getZ" + D](OX, R);
        Kind == 0 && T[R + "_" + C] && ChangeC != C && (PlayAudio("firepea"), Kind = 1, Attack = 40, ChangeC = C, img.src = "images/Plants/PB" + Kind + D + ".gif");
        Z && Z.Altitude == 1 ? (Z[{
          "-1": "getSnowPea",
          0: "getPea",
          1: "getFirePea"
        }[Kind]](Z, Attack, D), SetStyle(img, {
          left: pixelLeft + 28 + "px",
          width: "52px",
          height: "46px"
        }).src = "images/Plants/PeaBulletHit.gif", oSym.addTask(30, ClearChild, [img])) : (OX += side = !D ? 5 : -5) < oS.W && OX > 100 ? (img.style.left = (pixelLeft += side) + "px", oSym.addTask(1, arguments.callee, [id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T])) : ClearChild(img);
      }, [id, $(id), 20, 0, o.AttackedLX, v, 0, 0, o.AttackedLX - 40, oGd.$Torch]);
    }
  }
}),
    oSplitPea = InheritO(oPeashooter, {
  EName: "oSplitPea",
  CName: $__language_Array__["498fd6bb963123dd39ea3e8628397e7d"],
  width: 92,
  height: 72,
  beAttackedPointR: 72,
  SunNum: 125,
  PicArr: ["images/Card/Plants/SplitPea.png", "images/Plants/SplitPea/0.gif", "images/Plants/SplitPea/SplitPea.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PeaBulletHit.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["e26292afc235664121018cee93363dbb"],
  Produce: $__language_Array__["3b98dc5b78c1a081f7c644834fbefc4c"],
  GetDX: function GetDX() {
    return -55;
  },
  getShadow: function getShadow(a) {
    return "left:5px;top:" + (a.height - 22) + "px";
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[100, b + 25, 1], [b + 26, oS.W, 0]];
  },
  PrivateBirth: function PrivateBirth(c) {
    var b = c.PicArr,
        a = "px;top:" + (c.pixelTop + 3) + "px;visibility:hidden;z-index:" + (c.zIndex + 2);
    c.BulletEle = [NewImg(0, b[3], "left:" + (c.AttackedLX - 40) + a), NewImg(0, b[4], "left:" + (c.AttackedRX - 16) + a)], c.aTri = [0, 0];
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle.length = 0;
  },
  TriggerCheck: function TriggerCheck(b, a) {
    if (this.aTri[a]) {
      return;
    }

    if (this.AttackCheck2(b)) {
      ++this.aTri[a];
      this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
      this.CheckLoop(b.id, a);
    }
  },
  AttackCheck1: function AttackCheck1(b, f) {
    var e = this,
        c = $Z[b],
        a;

    if (c && c.PZ && c.R == e.R) {
      a = c.ZX > e.AttackedLX + 25 ? 0 : 1;
      f == a ? e.AttackCheck2(c) ? e.CheckLoop(b, f) : --e.aTri[f] : (++e.aTri[a], --e.aTri[f]);
    } else {
      --e.aTri[f];
    }

    e.canTrigger = e.aTri[0] && e.aTri[1] ? 0 : 1;
  },
  CheckLoop: function CheckLoop(a, b) {
    this.NormalAttack(b);
    oSym.addTask(140, function (c, e, g) {
      var f;
      (f = $P[c]) && f.AttackCheck1(e, g);
    }, [this.id, a, b]);
  },
  NormalAttack: function NormalAttack(c) {
    var d = this,
        e,
        a = c ? (oSym.addTask(15, function (f) {
      $P[f] && b(1);
    }, [d.id]), d.AttackedRX - 16) : d.AttackedLX - 40,
        b = function b() {
      EditEle(d.BulletEle[c].cloneNode(false), {
        id: e = "PB" + Math.random()
      }, 0, EDPZ);
      oSym.addTask(15, function (g) {
        var f = $(g);
        f && SetVisible(f);
      }, [e]);
      oSym.addTask(1, function (i, m, k, f, q, l, p, n, r, j) {
        var o,
            h = GetC(q),
            g = oZ["getZ" + f](q, l);
        p == 0 && j[l + "_" + h] && n != h && (PlayAudio("firepea"), p = 1, k = 40, n = h, m.src = "images/Plants/PB" + p + f + ".gif");
        g && g.Altitude == 1 ? (g[{
          "-1": "getSnowPea",
          0: "getPea",
          1: "getFirePea"
        }[p]](g, k, f), SetStyle(m, {
          left: r + 28 + "px"
        }).src = "images/Plants/PeaBulletHit.gif", oSym.addTask(10, ClearChild, [m])) : (q += o = !f ? 5 : -5) < oS.W && q > 100 ? (m.style.left = (r += o) + "px", oSym.addTask(1, arguments.callee, [i, m, k, f, q, l, p, n, r, j])) : ClearChild(m);
      }, [e, $(e), 20, c, d.AttackedLX, d.R, 0, 0, a, oGd.$Torch]);
    };

    b();
  }
}),
    oCoin = InheritO(CPlants, {
  EName: "oCoin",
  CName: $__language_Array__["be8638e99c2d24f0d6ce72d2ab82b8ac"],
  width: 86,
  height: 71,
  beAttackedPointR: 51,
  SunNum: 200,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/LG_NEWIMG/Card/BagOfCoin.png", "images/ENDLESSPLANTIMG/Coins/0.png", "images/ENDLESSPLANTIMG/Coins/Peashooter.png"],
  Tooltip: $__language_Array__["0d7c4c66e5e3c1c441c3fa4e4f5b4b82"],
  Produce: $__language_Array__["0d7c4c66e5e3c1c441c3fa4e4f5b4b82"]
}),
    oCoi = InheritO(CPlants, {
  EName: "oCoi",
  CName: $__language_Array__["d03c442221b7914631735603dcb94e9a"],
  width: 86,
  height: 71,
  beAttackedPointR: 51,
  SunNum: 0,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/LG_NEWIMG/Card/BagOfCoin.png", "images/ENDLESSPLANTIMG/Coi/0.png", "images/ENDLESSPLANTIMG/Coi/Peashooter.png"],
  Tooltip: $__language_Array__["d50a3855e8ef112f584a229aa6435977"],
  Produce: $__language_Array__["d50a3855e8ef112f584a229aa6435977"]
}),
    oNurse = InheritO(CPlants, {
  EName: "oNurse",
  CName: $__language_Array__["8d74c55d0fee3bf32e1826c2b79cf0fc"],
  width: 73,
  height: 68,
  beAttackedPointR: 53,
  SunNum: 50,
  PicArr: ["images/Card/Plants/SunFlower.png", "images/Plants/SunFlower/0.gif", "", "images/Plants/SunFlower/SunFlower.gif"],
  Tooltip: $__language_Array__["57d225d6970722e3a08262aa377f1eb0"],
  Produce: $__language_Array__["85569103fc8d0b046ee9ad46f9361674"],
  BirthStyle: function BirthStyle(c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/SunFlower/SunFlower.gif";
    d.style.clip = "rect(0,auto,74px,0)";
    d.style.height = "148px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  ChangePosition: function ChangePosition(c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(74px,auto,auto,auto)",
      top: "-74px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,74px,auto)",
      top: 0
    });
  },
  PrivateBirth: function PrivateBirth(a) {
    oS.ProduceSun ? oSym.addTask(500, function (d, c, b) {
      $P[d] && (a.ChangePosition($(d), 1), oSym.addTask(100, function (h, g, f, e) {
        $P[h] && (AppearSun(Math.floor(g + Math.random() * 41), f, 50, 0), oSym.addTask(100, function (i) {
          $P[i] && a.ChangePosition($(i), 0);
        }, [h]), oSym.addTask(3200, e, [h, g, f]));
      }, [d, c, b, arguments.callee]));
    }, [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function (f, c, b) {
      var e = this;

      switch (c) {
        case 0:
          var d = e.HP -= b;
          !(d % 100) && (AppearSun(Math.floor(GetX(e.C) - 40 + Math.random() * 41), GetY(e.R), 25, 0), oSym.addTask(50, function (h, g) {
            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0);
          }, [e.C, e.R]), d < 1 ? e.Die() : oSym.addTask(50, function (h, g) {
            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0);
          }, [e.C, e.R]));
          break;

        case 3:
          (e.HP -= b) < 1 && e.Die();
          break;

        default:
          e.Die(1);
      }
    };
  },
  InitTrigger: function InitTrigger() {}
}),
    oSunFlower = InheritO(CPlants, {
  EName: "oSunFlower",
  CName: $__language_Array__["8d74c55d0fee3bf32e1826c2b79cf0fc"],
  width: 73,
  height: 68,
  beAttackedPointR: 53,
  SunNum: 50,
  PicArr: ["images/Card/Plants/SunFlower.png", "images/Plants/Nurse/0.gif", "", "images/Plants/Nurse/SunFlower.gif"],
  Tooltip: $__language_Array__["57d225d6970722e3a08262aa377f1eb0"],
  Produce: $__language_Array__["a4f22cf5bae5fa97f04ad75b25e0975c"],
  BirthStyle: function BirthStyle(c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/Nurse/SunFlower.gif";
    d.style.clip = "rect(0,auto,74px,0)";
    d.style.height = "148px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  ChangePosition: function ChangePosition(c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(74px,auto,auto,auto)",
      top: "-74px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,74px,auto)",
      top: 0
    });
  },
  PrivateBirth: function PrivateBirth(a) {
    oS.ProduceSun ? oSym.addTask(500, function (d, c, b) {
      $P[d] && (a.ChangePosition($(d), 1), oSym.addTask(100, function (h, g, f, e) {
        $P[h] && (AppearSun(Math.floor(g + Math.random() * 41), f, 60, 0), oSym.addTask(100, function (i) {
          $P[i] && a.ChangePosition($(i), 0);
        }, [h]), oSym.addTask(3200, e, [h, g, f]));
      }, [d, c, b, arguments.callee]));
    }, [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function (f, c, b) {
      var e = this;

      switch (c) {
        case 0:
          var d = e.HP -= b;
          !(d % 100) && (AppearSun(Math.floor(GetX(e.C) - 40 + Math.random() * 41), GetY(e.R), 25, 0), oSym.addTask(50, function (h, g) {
            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0);
          }, [e.C, e.R]), d < 1 ? e.Die() : oSym.addTask(50, function (h, g) {
            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0);
          }, [e.C, e.R]));
          break;

        case 3:
          (e.HP -= b) < 1 && e.Die();
          break;

        default:
          e.Die(1);
      }
    };
  },
  InitTrigger: function InitTrigger() {}
}),
    oTwinSunflower = InheritO(oSunFlower, {
  EName: "oTwinSunflower",
  CName: $__language_Array__["f174dc48ba6db64bcc0d5096210e3b87"],
  width: 83,
  height: 84,
  beAttackedPointR: 63,
  SunNum: 150,
  coolTime: 30,
  PicArr: ["images/Card/Plants/TwinSunflower.png", "images/Plants/TwinSunflower/0.gif", "images/Plants/TwinSunflower/TwinSunflower1.gif", "images/Plants/TwinSunflower/TwinSunflower.gif"],
  Tooltip: $__language_Array__["fe9465e04934817847a334335c81a01e"],
  Produce: $__language_Array__["b6a97b186fdf85521f9b95ea59107158"],
  CanGrow: function CanGrow(b, a, d) {
    var c = b[1];
    return c && c.EName == "oSunFlower";
  },
  BirthStyle: function BirthStyle(c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/TwinSunflower/TwinSunflower.gif";
    d.style.clip = "rect(0,auto,84px,0)";
    d.style.height = "168px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  ChangePosition: function ChangePosition(c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(84px,auto,auto,auto)",
      top: "-84px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,84px,auto)",
      top: 0
    });
  },
  PrivateBirth: function PrivateBirth(a) {
    var b = GetX(a.C);
    oSym.addTask(240, function (f, d, c, e) {
      $P[f] && (a.ChangePosition($(f), 1), oSym.addTask(100, function (k, h, g, j, i) {
        AppearSun(Math.floor(h + Math.random() * 21), j, 50, 0), AppearSun(Math.floor(g + Math.random() * 21), j, 50, 0), oSym.addTask(100, function (l) {
          $P[l] && a.ChangePosition($(l), 0);
        }, [k]), oSym.addTask(3200, i, [k, h, g, j]);
      }, [f, d, c, e, arguments.callee]));
    }, [a.id, b - 40, b - 20, GetY(a.R)]);
  }
}),
    oFlowerPot = InheritO(CPlants, {
  EName: "oFlowerPot",
  CName: $__language_Array__["1832fbb5a78c43f4c1e1a31fec96b056"],
  width: 72,
  height: 68,
  beAttackedPointR: 52,
  SunNum: 25,
  canEat: 0,
  BookHandBack: 5,
  PicArr: ["images/Card/Plants/FlowerPot.png", "images/Plants/FlowerPot/0.gif", "images/Plants/FlowerPot/FlowerPot.gif"],
  PKind: 0,
  Stature: -1,
  GetDY: function GetDY(b, c, a) {
    return -15;
  },
  getShadow: function getShadow(a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  Tooltip: $__language_Array__["10320b1ec56a09f9ba25343ce3a96c20"],
  Produce: $__language_Array__["51b539cdfaf459ac15f2b856d840c393"],
  InitTrigger: function InitTrigger() {}
}),
    oLilyPad = InheritO(oFlowerPot, {
  BookHandBack: 4,
  Stature: -1,
  EName: "oLilyPad",
  CName: $__language_Array__["8f25c01c81f797f21e1652d90b49120f"],
  width: 79,
  height: 40,
  beAttackedPointR: 59,
  PicArr: ["images/Card/Plants/LilyPad.png", "images/Plants/LilyPad/0.png", "images/Plants/LilyPad/LilyPad.png"],
  getShadow: function getShadow(a) {
    return "display:none";
  },
  CanGrow: function CanGrow(c, b, d) {
    var a = b + "_" + d;
    return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a]);
  },
  Tooltip: $__language_Array__["1a922563c1859a5c007ca952c08b78cd"],
  Produce: $__language_Array__["72ca296819bad26c3c3224899fee460a"]
}),
    oMud = InheritO(CPlants, {
  EName: "oMud",
  CName: $__language_Array__["ab77cb1c0bc32d453d3db1dcfe171eeb"],
  width: 155,
  height: 130,
  canShovel: false,
  beAttackedPointR: 52,
  SunNum: 0,
  canEat: 0,
  BookHandBack: 5,
  PicArr: ["images/Card/Plants/Path.png", "images/Zombies/PZombie/ZombieHead.gif", "images/Zombies/PZombie/ZombieHead.gif"],
  Stature: -1,
  GetDY: function GetDY(b, c, a) {
    return -15;
  },
  getShadow: function getShadow(a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  Tooltip: $__language_Array__["10320b1ec56a09f9ba25343ce3a96c20"],
  Produce: $__language_Array__["51b539cdfaf459ac15f2b856d840c393"],
  InitTrigger: function InitTrigger() {}
}),
    oPotatoMine = InheritO(CPlants, {
  EName: "oPotatoMine",
  CName: $__language_Array__["b578086bc0abf2e4c0406e800f45ebc7"],
  width: 75,
  height: 55,
  Range: $__language_Array__["d2b3ae4cf44e49fef219c45fc551d508"],
  beAttackedPointR: 55,
  SunNum: 25,
  coolTime: 30,
  Stature: -1,
  CanGrow: function CanGrow(d, c, f) {
    var b = c + "_" + f,
        a = oGd.$LF[c],
        e = oS.ArP;

    if (e) {
      switch (a) {
        case (0, 3):
          return false;

        case 1:
          return f > 0 && f < e.ArC[1] && !(d[1] || oGd.$Crater[b] || oGd.$Tombstones[b]);

        case 2:
          return f > 0 && f < e.ArC[1] && d[0] && !d[1];
      }
    } else {
      switch (a) {
        case (0, 3):
          return false;

        case 1:
          return !(f < 1 || f > 9 || d[1] || oGd.$Crater[b] || oGd.$Tombstones[b]);

        case 2:
          return d[0] && !d[1];
      }
    }
  },
  PicArr: ["images/Card/Plants/PotatoMine.png", "images/Plants/PotatoMine/0.gif", "images/Plants/PotatoMine/PotatoMine.gif", "images/Plants/PotatoMine/PotatoMineNotReady.gif", "images/Plants/PotatoMine/PotatoMine_mashed.gif", "images/Plants/PotatoMine/ExplosionSpudow.gif"],
  Tooltip: $__language_Array__["1f9194ecd38b1312db4d891654a18c2e"],
  Produce: $__language_Array__["2e8b0436cc49c418852afe1b63d0323b"],
  Status: 0,
  AudioArr: [$__language_Array__["7d8d010d68202cc78e990cc3eff231ef"]],
  canTrigger: 0,
  BirthStyle: function BirthStyle(d, e, c, b, a) {
    c.childNodes[1].src = !a ? "images/Plants/PotatoMine/PotatoMineNotReady.gif" : (~function () {
      d.Status = 1;
      d.canTrigger = 1;
      d.getHurt = d.getHurt2;
    }(), "images/Plants/PotatoMine/PotatoMine.gif");
    EditEle(c, {
      id: e
    }, b, EDPZ);
  },
  getHurt2: function getHurt2(d, b, a) {
    var c = this;
    b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
  },
  PrivateBirth: function PrivateBirth(b, a) {
    !a && oSym.addTask(1500, function (d) {
      var c = $P[d];
      c && ($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif", c.Status = 1, c.canTrigger = 1, c.getHurt = c.getHurt2);
    }, [b.id]);
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function TriggerCheck(e, c) {
    var a = this.R,
        b = this.C;
    e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
  },
  NormalAttack: function NormalAttack(j, h, e) {
    var g = this,
        b = g.id,
        d = $(b),
        c = oZ.getArZ(j, h, e),
        f = c.length,
        a;

    while (f--) {
      (a = c[f]).Altitude < 2 && a.getThump();
    }

    g.Die(1);
    PlayAudio($__language_Array__["7d8d010d68202cc78e990cc3eff231ef"]);
    EditEle(d.childNodes[1], {
      src: "images/Plants/PotatoMine/PotatoMine_mashed.gif"
    }, {
      width: "132px",
      height: "93px",
      left: "-40px",
      top: "-20px"
    });
    NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
    oSym.addTask(200, function (i) {
      ClearChild(i.lastChild);
      oSym.addTask(100, ClearChild, [i]);
    }, [d]);
  }
}),
    oTorchwood = InheritO(CPlants, {
  EName: "oTorchwood",
  CName: $__language_Array__["41e778dd5f5ce200f4d27a290b1ada1b"],
  width: 73,
  height: 83,
  beAttackedPointR: 53,
  SunNum: 175,
  PicArr: ["images/Card/Plants/Torchwood.png", "images/Plants/Torchwood/0.gif", "images/Plants/Torchwood/Torchwood.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PB10.gif", "images/Plants/PB11.gif", "images/Plants/Torchwood/SputteringFire.gif"],
  AudioArr: ["firepea", "ignite", "ignite2"],
  Tooltip: $__language_Array__["25783f1f6492ead5f3848a65c34278ac"],
  Produce: $__language_Array__["c43edd44443d19b7eea7826fb1092d0f"],
  PrivateBirth: function PrivateBirth(c) {
    var a = c.R,
        b = c.C;
    oGd.$Torch[a + "_" + b] = c.id;
    oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0);
  },
  InitTrigger: function InitTrigger() {},
  PrivateDie: function PrivateDie(c) {
    var a = c.R,
        b = c.C;
    delete oGd.$Torch[a + "_" + b];
    oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1);
  }
}),
    oWallNut = InheritO(CPlants, {
  EName: "oWallNut",
  CName: $__language_Array__["f9f285b87bebf1ac622ddb94e332a5b1"],
  width: 65,
  height: 65,
  beAttackedPointR: 45,
  SunNum: 50,
  HP: 4000,
  coolTime: 30,
  PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/0.gif"],
  Tooltip: $__language_Array__["57196dcaf2f48a1d8dbf35b327c971d8"],
  Produce: $__language_Array__["fa996ba783d5f9766766f7a1830eb67f"],
  CanGrow: function CanGrow(c, b, f) {
    var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
    return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oWallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d;
  },
  InitTrigger: function InitTrigger() {},
  HurtStatus: 0,
  getHurt: function getHurt(e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/WallNut/0.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/WallNut/0.gif") : c.Die(1);
  }
}),
    oNutBowling = InheritO(CPlants, {
  EName: "oNutBowling",
  CName: $__language_Array__["efac77748849811bef390f464807d360"],
  width: 71,
  height: 71,
  beAttackedPointL: 10,
  beAttackedPointR: 61,
  SunNum: 0,
  HP: 4000,
  coolTime: 0,
  canEat: 0,
  Tooltip: "",
  PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/WallNutRoll.gif"],
  AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
  Produce: "",
  CanAttack: 1,
  InitTrigger: function InitTrigger() {},
  getHurt: function getHurt() {},
  CanGrow: function CanGrow(d, e, f) {
    return true;
  },
  NormalAttack: null,
  PrivateBirth: function PrivateBirth(c) {
    var d = $(c.id);
    PlayAudio("bowling");

    (function (z, y, q, r, p, x, e, g, b) {
      var a = z.R,
          l = z.C,
          A,
          u,
          s,
          v = 0,
          w,
          i,
          t = false;

      if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
        u = A.id;
        PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);

        switch (A.Ornaments) {
          case 0:
            A.NormalDie();
            break;

          case 1:
            A.getHit0(A, Math.min(A.OrnHP, 900), 0);
            break;

          default:
            z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0);
        }

        z.CanAttack = 0;

        switch (a) {
          case oS.R:
            e = -1;
            break;

          case 1:
            e = 1;
            break;

          default:
            switch (e) {
              case 1:
                e = -1;
                break;

              case -1:
                e = 1;
                break;

              default:
                e = Math.random() > 0.5 ? 1 : -1;
            }

        }

        oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b]);
      } else {
        switch (e) {
          case 1:
            z.pixelBottom + 2 > b && (e = -1);
            break;

          case -1:
            z.pixelBottom - 2 < g && (e = 1);
            break;
        }

        q > y ? z.Die() : (i = GetC(z.pixelRight += 2), z.AttackedLX = q += 2, z.AttackedRX = r += 2, w = GetR(z.pixelBottom += e * 2), SetStyle(x, {
          left: (z.pixelLeft = p += 2) + "px",
          top: (z.pixelTop += e * 2) + "px"
        }), w != a && (z.R = w, t = true, !z.CanAttack && (z.CanAttack = 1)), i != l && (z.C = i, t = true), t && (oGd.del({
          R: a,
          C: l,
          PKind: 1
        }), oGd.add(z, w + "_" + i + "_1")), oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]));
      }
    })(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600);
  }
}),
    oHugeNutBowling = InheritO(oNutBowling, {
  EName: "oHugeNutBowling",
  CName: $__language_Array__["44ca770272f9353f9339b22946529aca"],
  width: 142,
  height: 142,
  beAttackedPointL: 5,
  beAttackedPointR: 137,
  HP: 8000,
  Stature: 1,
  PicArr: ["images/Card/Plants/HugeWallNut.png", "images/Plants/WallNut/2.gif", "images/Plants/WallNut/HugeWallNutRoll.gif"],
  PrivateBirth: function PrivateBirth(a) {
    PlayAudio("bowling");

    (function (b, c, n, m, e, g) {
      var d = oZ.getArZ(n, m, e),
          f = d.length,
          k,
          j,
          l = b.R,
          h = b.C;

      while (f--) {
        (k = d[f]).getCrushed(b) && k.CrushDie();
      }

      n > c ? b.Die() : (j = GetC(b.pixelRight += 2), b.AttackedLX = n += 2, b.AttackedRX = m += 2, g.style.left = (b.pixelLeft += 2) + "px", j != h && (b.C = j, oGd.del({
        R: l,
        C: h,
        PKind: 1
      }), oGd.add(b, l + "_" + j + "_1")), oSym.addTask(1, arguments.callee, [b, c, n, m, e, g]));
    })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
  }
}),
    oBoomNutBowling = InheritO(oNutBowling, {
  EName: "oBoomNutBowling",
  CName: $__language_Array__["fdab1f356fa020a49b9a8958b8729c55"],
  PicArr: ["images/Card/Plants/BoomWallNut.png", "images/Plants/WallNut/1.gif", "images/Plants/WallNut/BoomWallNutRoll.gif", "images/Plants/CherryBomb/Boomnut.gif"],
  AudioArr: ["cherrybomb", "bowling"],
  PrivateBirth: function PrivateBirth(a) {
    PlayAudio("bowling");

    (function (s, q, b, c, m) {
      var v = s.R,
          p = s.C,
          t,
          l;

      if ((t = oZ.getZ0(c, v)) && t.getCrushed(s)) {
        var j = v > 2 ? v - 1 : 1,
            g = v < oS.R ? v + 1 : oS.R,
            u = s.pixelLeft - 80,
            r = s.pixelLeft + 160,
            e,
            k;
        PlayAudio("cherrybomb");

        do {
          k = (e = oZ.getArZ(u, r, j)).length;

          while (k--) {
            e[k].ExplosionDie();
          }
        } while (j++ < g);

        s.Die(1);
        EditEle(m.childNodes[1], {
          src: "images/Plants/CherryBomb/Boom.gif"
        }, {
          width: "213px",
          height: "160px",
          left: "-50px",
          top: "-30px"
        });
        oSym.addTask(65, ClearChild, [m]);
      } else {
        b > q ? s.Die() : (l = GetC(s.pixelRight += 2), s.AttackedLX = b += 2, s.AttackedRX = c += 2, SetStyle(m, {
          left: (s.pixelLeft += 2) + "px"
        }), l != p && (s.C = l, oGd.del({
          R: v,
          C: p,
          PKind: 1
        }), oGd.add(s, v + "_" + l + "_1")), oSym.addTask(1, arguments.callee, [s, q, s.AttackedLX, s.AttackedRX, m]));
      }
    })(a, oS.W, a.AttackedLX, a.AttackedRX, $(a.id));
  }
}),
    oTallNut = InheritO(oWallNut, {
  EName: "oTallNut",
  CName: $__language_Array__["a9f40b54d65a2e1094b3b9c1f802b6ec"],
  width: 83,
  height: 119,
  beAttackedPointR: 63,
  SunNum: 125,
  HP: 8000,
  PicArr: ["images/Card/Plants/TallNut.png", "images/Plants/TallNut/0.gif", "images/Plants/TallNut/TallNut.gif", "images/Plants/TallNut/TallnutCracked1.gif", "images/Plants/TallNut/TallnutCracked2.gif"],
  Tooltip: $__language_Array__["fbc3801ab0d27f4bfa7850f559ab01ef"],
  Produce: $__language_Array__["cb48af7ce37bce3eacad94a79f497c13"],
  CanGrow: function CanGrow(c, b, f) {
    var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
    return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oTallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d;
  },
  Stature: 1,
  getHurt: function getHurt(e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 2667 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/TallNut/TallnutCracked2.gif") : c.HP < 5333 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/TallNut/TallnutCracked1.gif") : c.Die(1);
  }
}),
    oCherryBomb = InheritO(CPlants, {
  EName: "oCherryBomb",
  CName: $__language_Array__["508f283c511dd5c6d921a9b3b8cd0d08"],
  width: 112,
  height: 81,
  beAttackedPointR: 92,
  SunNum: 150,
  coolTime: 35,
  PicArr: ["images/Card/Plants/ch.png", "images/Plants/CherryBomb/0.gif", "images/Plants/CherryBomb/CherryBomb.gif", "images/Plants/CherryBomb/Boomnut.gif" + $Random],
  AudioArr: ["cherrybomb"],
  Tooltip: $__language_Array__["6608308219b3bf874dabeb49574c8990"],
  Produce: $__language_Array__["fbcf84860bd83168c92f93fe102c1a12"],
  InitTrigger: function InitTrigger() {},
  getHurt: function getHurt() {},
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(63, function (b) {
      var c = $P[b];

      if (c) {
        PlayAudio("cherrybomb");
        var f = $(b),
            j = c.R,
            g = j > 2 ? j - 1 : 1,
            e = j < oS.R ? j + 1 : oS.R,
            l = c.pixelLeft - 80,
            k = c.pixelLeft + 160,
            d,
            h;

        do {
          h = (d = oZ.getArZ(l, k, g)).length;

          while (h--) {
            d[h].getExplosion();
          }
        } while (g++ < e);

        c.Die(1);
        EditEle(f.childNodes[1], {
          src: c.PicArr[3]
        }, {
          width: "213px",
          height: "196px",
          left: "-50px",
          top: "-37px"
        });
        oSym.addTask(120, ClearChild, [f]);
      }
    }, [a.id]);
  }
}),
    oJalapeno = InheritO(oCherryBomb, {
  EName: "oJalapeno",
  CName: $__language_Array__["bec78669f09fdd9783d30716db17e9f5"],
  width: 68,
  height: 89,
  coolTime: 30,
  SunNum: 125,
  beAttackedPointR: 48,
  PicArr: ["images/Card/Plants/Jalapeno.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
  AudioArr: ["jalapeno"],
  Tooltip: $__language_Array__["ddc8fdf7abaf45d2dc8ffab946e7e7ea"],
  Produce: $__language_Array__["dc3ad9100c62c6eb4f4f59815e545118"],
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(72, function (j) {
      var h = $P[j];

      if (h) {
        PlayAudio("jalapeno");
        var b = $(j),
            f = h.R,
            c = oZ.getArZ(100, oS.W, f),
            e = c.length,
            g = oGd.$Ice[f],
            d = oGd.$Crater;

        while (e--) {
          c[e].getExplosion();
        }

        h.Die(1);
        EditEle(b.childNodes[1], {
          src: "images/Plants/Jalapeno/JalapenoAttack.gif"
        }, {
          width: "755px",
          height: "131px",
          left: 120 - h.pixelLeft + "px",
          top: "-42px"
        });
        oSym.addTask(135, ClearChild, [b]);
        ClearChild($("dIceCar" + f));

        if (g) {
          for (e = g[1]; e < 11; e++) {
            delete d[f + "_" + e];
          }
        }
      }
    }, [a.id]);
  }
}),
    oSpikeweed = InheritO(CPlants, {
  EName: "oSpikeweed",
  CName: $__language_Array__["580490fbd1bfbf722d034f9832e25d0d"],
  width: 85,
  height: 35,
  beAttackedPointL: 10,
  beAttackedPointR: 75,
  SunNum: 100,
  Stature: -1,
  canEat: 0,
  PicArr: ["images/Card/Plants/Spikeweed.png", "images/Plants/Spikeweed/0.gif", "images/Plants/Spikeweed/Spikeweed.gif"],
  Attack: 20,
  ArZ: {},
  Tooltip: $__language_Array__["588d205f1531c10ea59b6b738876cbd0"],
  Produce: $__language_Array__["27594f37995d0867776767f3f9e4fb53"],
  CanGrow: function CanGrow(c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0]) : !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a]);
  },
  getHurt: function getHurt(d, b, a) {
    var c = this;

    switch (b) {
      case 2:
        d.flatTire();
        c.Die();
        break;

      case 1:
        d.getHit2(d, 10, 0);
        c.Die();
        break;

      default:
        (c.HP -= a) < 1 && c.Die();
    }
  },
  NormalAttack: function NormalAttack(b, a) {
    var c = $Z[b];
    c.getHit2(c, this.Attack, 0);
  },
  GetDY: function GetDY(b, c, a) {
    return -2;
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
  },
  TriggerCheck: function TriggerCheck(i, h) {
    var c = i.id,
        g = this.ArZ,
        a,
        b,
        e,
        f;
    i.PZ && !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(0.5, function (d, j) {
      var k = $P[d];
      k && delete k.ArZ[j];
    }, [this.id, c]));
  },
  AttackCheck2: function AttackCheck2(a) {
    return a.Altitude == 1 && a.beAttacked;
  }
}),
    oSpikerock = InheritO(oSpikeweed, {
  EName: "oSpikerock",
  CName: $__language_Array__["ed8ec317d5612cb2517c75c3c39e6859"],
  width: 70,
  SunNum: 250,
  Range: $__language_Array__["d2b3ae4cf44e49fef219c45fc551d508"],
  coolTime: 25,
  height: 30,
  beAttackedPointL: 10,
  beAttackedPointR: 74,
  PicArr: ["images/Card/Plants/Spikerock.png", "images/Plants/Spikerock/0.gif", "images/Plants/Spikerock/Spikerock.gif", "images/Plants/Spikerock/2.gif", "images/Plants/Spikerock/3.gif"],
  Tooltip: $__language_Array__["05de1804d43235dbbb4e00d66fd95244"],
  Produce: $__language_Array__["91c2c750cdc58a398cef784a3ed53aab"],
  Attack: 20,
  canEat: 0,
  GetDY: function GetDY(b, c, a) {
    return 0;
  },
  GetDX: function GetDX() {
    return -45;
  },
  NormalAttack: function NormalAttack(b, a) {
    var c = $Z[b];
    PlayAudio($__language_Array__["19ce1ab22c7f61adf77e9c6574636a81"]);
    c.getPea(c, this.Attack, 0);
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
  },
  TriggerCheck: function TriggerCheck(i, h) {
    var c = i.id,
        g = this.ArZ,
        a,
        b,
        e,
        f;
    i.PZ && !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(100, function (d, j) {
      var k = $P[d];
      k && delete k.ArZ[j];
    }, [this.id, c]));
  },
  AttackCheck2: function AttackCheck2(a) {
    return a.Altitude == 1 && a.beAttacked;
  },
  getHurt: function getHurt(f, c, b) {
    var e = this,
        d,
        a = $(e.id).childNodes[1];

    switch (c) {
      case 2:
        f.flatTire();
        break;

      case 1:
        f.getHit2(f, 30, 0);
    }

    switch (true) {
      case (d = e.HP -= b) < 1:
        e.Die();
        break;

      case d < 101:
        a.src = "images/Plants/Spikerock/3.gif";
        break;

      case d < 201:
        a.src = "images/Plants/Spikerock/2.gif";
    }
  }
}),
    oSquash = InheritO(CPlants, {
  EName: "oSquash",
  CName: $__language_Array__["3108b60e184bface2a2295e0ae7a7199"],
  width: 100,
  height: 226,
  beAttackedPointR: 67,
  SunNum: 50,
  coolTime: 22.5,
  PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
  AudioArr: ["squash_hmm", "gargantuar_thump"],
  Tooltip: $__language_Array__["4bff1fe3daf54f22fe32d325f47f89a9"],
  Produce: $__language_Array__["52758ad48b6566c689c174533c337ecc"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -21 : -10;
  },
  getHurt: function getHurt(d, b, a) {
    var c = this;
    b != 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die();
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b - 50, c + 80, 0]];
  },
  TriggerCheck: function TriggerCheck(h, g, e) {
    var c = h.ZX,
        b = this.id,
        a = $(b).childNodes[1],
        f = h.isAttacking;
    h.beAttacked && h.Altitude > -1 && h.Altitude < 2 && (f || !f && c - this.AttackedRX < 71) && (PlayAudio("squash_hmm"), oT.$[this.R].splice(e, 1), a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png", oSym.addTask(100, function (d, j, i) {
      var k = $P[d];
      k && k.NormalAttack(k, h.id, i);
    }, [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]));
  },
  NormalAttack: function NormalAttack(d, c, b) {
    var a = $(d.id),
        e = $Z[c];
    e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
    a.childNodes[1].src = RandomPic("images/Plants/Squash/SquashAttack.gif", a);
    SetStyle(a, {
      left: b + "px"
    });
    d.Die(1);
    oSym.addTask(45, function (f, l, j) {
      PlayAudio("gargantuar_thump");
      var g = oZ.getArZ(l, l + 100, j),
          h = g.length,
          k;

      while (h--) {
        (k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump();
      }

      oSym.addTask(185, ClearChild, [f]);
    }, [a, b, d.R]);
  }
}),
    oChomper = InheritO(CPlants, {
  EName: "oChomper",
  CName: $__language_Array__["8f500b16f4e33909c507e55a6d97de1d"],
  width: 130,
  height: 135,
  Range: $__language_Array__["04184077426fbdf4295b173e8a3ab6d5"],
  beAttackedPointR: 70,
  SunNum: 150,
  coolTime: 5,
  PicArr: ["images/Card/Plants/Chomper.png", "images/Plants/Chomper/0.gif", "images/Plants/Chomper/Chomper.gif", "images/Plants/Chomper/ChomperAttack.gif", "images/Plants/Chomper/ChomperDigest.gif"],
  Tooltip: $__language_Array__["0a802f0d272b81a9e3b22ea17b276ef6"],
  Produce: $__language_Array__["0eeebaffd4468e786ae3fa58aeddea81"],
  GetDX: function GetDX() {
    return -68;
  },
  getShadow: function getShadow(a) {
    return "top:" + (a.height - 22) + "px";
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[this.pixelLeft, c + 80, 0]];
  },
  TriggerCheck: function TriggerCheck(a) {
    this.AttackCheck2(a) && (this.canTrigger = 0, this.NormalAttack(this.id, a.id));
  },
  AttackCheck2: function AttackCheck2(a) {
    return a.Altitude == 1 && a.beAttacked;
  },
  NormalAttack: function NormalAttack(a, b) {
    PlayAudio($__language_Array__["6f78662bf716a74a78530f04a22f9a56"]);
    $(a).childNodes[1].src = RandomPic("images/Plants/Chomper/ChomperAttack.gif", $(a));
    oSym.addTask(60, function (c, d) {
      $P[c] && oSym.addTask(18, function (e, f) {
        var g = $P[e],
            h;
        g && ((h = $Z[f]) && h.beAttacked && h.PZ ? $(e).childNodes[1].src = h.getRaven(e) ? (oSym.addTask(3000, function (i) {
          var j = $P[i];
          j && (j.canTrigger = 1, $(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif");
        }, [e]), "images/Plants/Chomper/ChomperDigest.gif") : (g.canTrigger = 1, "images/Plants/Chomper/Chomper.gif") : oSym.addTask(18, function (i) {
          var j = $P[i];
          j && (j.canTrigger = 1, $(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif");
        }, [e]));
      }, [c, d]);
    }, [a, b]);
  }
}),
    oFumeShroom = InheritO(CPlants, {
  EName: "oFumeShroom",
  CName: $__language_Array__["3e5ce86fc3d99fd04613a9dbfbdc6cd0"],
  width: 100,
  height: 88,
  Range: $__language_Array__["4ec807fdcde64102beb7b4767b7117d4"],
  beAttackedPointR: 80,
  SunNum: 175,
  BookHandBack: 2,
  SleepGif: 3,
  coolTime: 12.5,
  PicArr: ["images/Card/Plants/akee.png", "images/Plants/FumeShroom/0.gif", "images/Plants/FumeShroom/FumeShroom.gif", "images/Plants/FumeShroom/FumeShroomSleep.gif", "images/Plants/FumeShroom/FumeShroomAttack.gif", "images/Plants/FumeShroom/FumeShroomBullet.gif"],
  AudioArr: ["AKEE"],
  Tooltip: $__language_Array__["51692a9cf63cd94348c56d19f026a9b6"],
  Produce: $__language_Array__["44c2dd224223c2800292f0f0d638fae4"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -60;
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(260, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 330, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("AKEE");
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 55);
    }

    b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif", SetHidden($(i)));
    });
  }
}),
    oFumeShroomSong = InheritO(CPlants, {
  EName: "oFumeShroomSong",
  CName: $__language_Array__["67dc9b7555bb9955e0fe0bfcd21f588f"],
  width: 100,
  height: 83,
  beAttackedPointR: 80,
  SunNum: 125,
  Range: $__language_Array__["4ec807fdcde64102beb7b4767b7117d4"],
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/shuzi.png", "images/Plants/Shizuki/0.gif", "images/Plants/Shizuki/FumeShroom.gif", "images/Plants/Shizuki/FumeShroomSleep.gif", "images/Plants/Shizuki/FumeShroomAttack.gif", "images/Plants/Shizuki/FumeShroomBullet.gif"],
  AudioArr: ["fumeattack"],
  Tooltip: $__language_Array__["ba4458acf2a57381738437384686cac1"],
  Produce: $__language_Array__["5e97dd1b6f7ccb99fd724fea48344c46"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(290, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  GetDX: function GetDX() {
    return -60;
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/Shizuki/FumeShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 406, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("fumeattack");
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 406, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 40);
    }

    b.childNodes[1].src = "images/Plants/Shizuki/FumeShroomAttack.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 9, 1], ["0 -48px", 9, 2], ["0 -96px", 9, 3], ["0 -144px", 9, 4], ["0 -192px", 9, 5], ["0 -240px", 2, 6], ["0 -288px", 2, 7], ["0 -336px", 2, 8], ["0 -384px", 2, 9], ["0 -432px", 2, 10], ["0 -480px", 2, 11], ["0 -528px", 2, 12], ["0 -576px", 2, 13], ["0 -624px", 2, 14], ["0 -672px", 2, 15], ["0 -720px", 2, 16], ["0 -768px", 2, 17], ["0 -816px", 2, 18], ["0 -864px", 2, 19], ["0 -911px", 2, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/Plants/Shizuki/FumeShroom.gif", SetHidden($(i)));
    });
  }
}),
    oCoffeeBean = InheritO(CPlants, {
  EName: "oCoffeeBean",
  CName: $__language_Array__["3070520dac027c6f40b718f319d0b9c8"],
  width: 39,
  height: 97,
  beAttackedPointL: 10,
  beAttackedPointR: 29,
  SunNum: 10,
  PKind: 3,
  canEat: 0,
  PicArr: ["images/Card/Plants/A-BAG.png", "images/LG_NEWIMG/PlantIce/0.gif", "images/LG_NEWIMG/PlantIce/IceIdle.png", "images/LG_NEWIMG/PlantIce/IceAttack.gif" + $Random],
  AudioArr: ["coffee", "wakeup"],
  Tooltip: $__language_Array__["7f8ca547fc6d4c4403baa291fcf77c7b"],
  Produce: $__language_Array__["7f8ca547fc6d4c4403baa291fcf77c7b"],
  InitTrigger: function InitTrigger() {},
  GetDBottom: function GetDBottom() {
    return 49;
  },
  GetDY: function GetDY() {
    return -30;
  },
  CanGrow: function CanGrow(a, b) {
    return (b = a[1]) && b.Sleep && !a[3];
  },
  BirthStyle: function BirthStyle(c, d, b, a) {
    b.childNodes[1].src = this.PicArr[3];
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  PrivateBirth: function PrivateBirth(a) {
    SetHidden($(a.id).firstChild);
    PlayAudio("coffee");
    oSym.addTask(48, function (c) {
      PlayAudio("wakeup");
      var d = oGd.$[c],
          b;
      d && (b = d.WakeUP, !b ? ($(d.id).childNodes[1].src = d.PicArr[d.NormalGif], d.canTrigger = 1, d.Sleep = 0) : b(d));
      a.Die();
    }, [a.R + "_" + a.C + "_1"]);
  }
}),
    oPuffShroom = InheritO(oFumeShroom, {
  EName: "oPuffShroom",
  CName: $__language_Array__["e29d853f96ee304591f7aff356e3001e"],
  width: 40,
  height: 66,
  beAttackedPointL: 15,
  beAttackedPointR: 25,
  SunNum: 0,
  Range: $__language_Array__["e1e0867b74f7a79b3249d7b12dcf03d5"],
  coolTime: 6,
  Stature: -1,
  PicArr: ["images/Card/Plants/PuffShroom.png", "images/Plants/PuffShroom/0.gif", "images/Plants/PuffShroom/PuffShroom.gif", "images/Plants/PuffShroom/PuffShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  AudioArr: ["puff"],
  Tooltip: $__language_Array__["d71bc7327210ebbebe3cfc35b87fac32"],
  Produce: $__language_Array__["4bfea45cf3ad7eb5766c060b1ad80049"],
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +35) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -35;
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 250, oS.W), 0]];
  },
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("puff");
    var b = this,
        c = "PSB" + Math.random(),
        a = b.AttackedLX;
    EditEle(b.BulletEle.cloneNode(false), {
      id: c
    }, 0, EDPZ);
    oSym.addTask(15, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (j, d, e, f, g) {
      var i = GetC(e),
          h = oZ.getZ0(e, f);
      h && h.Altitude == 1 ? (h.getPea(h, 20, 0), SetStyle(d, {
        left: g + 38 + "px"
      }).src = "images/Plants/ShroomBulletHit.gif", oSym.addTask(55, ClearChild, [d])) : (e += 5) < oS.W ? (d.style.left = (g += 5) + "px", oSym.addTask(1, arguments.callee, [j, d, e, f, g])) : ClearChild(d);
    }, [c, $(c), a, b.R, a - 46]);
  }
}),
    oPuffShroom1 = InheritO(oFumeShroom, {
  EName: "oPuffShroom1",
  CName: $__language_Array__["e29d853f96ee304591f7aff356e3001e"],
  width: 40,
  height: 66,
  beAttackedPointL: 15,
  beAttackedPointR: 25,
  SunNum: 0,
  Stature: -1,
  PicArr: ["images/Card/Plants/PuffShroom1.png", "images/Plants/PuffShroom/0.gif", "images/Plants/PuffShroom/PuffShroom.gif", "images/Plants/PuffShroom/PuffShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  AudioArr: ["puff"],
  Tooltip: $__language_Array__["98a84c41f1b47154f0d162da86eb6496"],
  Produce: $__language_Array__["f67d8bb9159ecb95956dd37152e59dac"],
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +35) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -35;
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 250, oS.W), 0]];
  },
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("puff");
    var b = this,
        c = "PSB" + Math.random(),
        a = b.AttackedLX;
    EditEle(b.BulletEle.cloneNode(false), {
      id: c
    }, 0, EDPZ);
    oSym.addTask(15, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (j, d, e, f, g) {
      var i = GetC(e),
          h = oZ.getZ0(e, f);
      h && h.Altitude == 1 ? (h.getPea(h, 20, 0), SetStyle(d, {
        left: g + 38 + "px"
      }).src = "images/Plants/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [d])) : (e += 5) < oS.W ? (d.style.left = (g += 5) + "px", oSym.addTask(1, arguments.callee, [j, d, e, f, g])) : ClearChild(d);
    }, [c, $(c), a, b.R, a - 46]);
  }
}),
    oScaredyShroom = InheritO(oFumeShroom, {
  EName: "oScaredyShroom",
  CName: $__language_Array__["3f54c7e042359915c100e403c4b4dd46"],
  width: 97,
  height: 81,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 37,
  SunNum: 25,
  HP: 1500,
  Cry: 0,
  ArZ: [],
  Attacking: 0,
  coolTime: 20,
  PicArr: ["images/Card/Plants/redstringer.png", "images/Plants/ScaredyShroom/0.gif", "images/Plants/ScaredyShroom/ScaredyShroom.gif", "images/Plants/ScaredyShroom/ScaredyShroomSleep.gif", "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  Tooltip: $__language_Array__["c12aa1632ef57c9a1fa124c853a56be6"],
  Produce: $__language_Array__["1f302aeb95423bb6c76c85b065e6cd1e"],
  GetDX: function GetDX() {
    return -60;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - 50) + "px;top:" + (a.height - 22) + "px";
  },
  getTriggerRange: CPlants.prototype.getTriggerRange,
  getTriggerR: function getTriggerR(c) {
    var b = this.MinR = c > 2 ? c - 1 : 1,
        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
    return [b, a];
  },
  TriggerCheck: function TriggerCheck(e, c) {
    var b = this,
        a = b.id;
    e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked ? (b.ArZ.push(e.id), !b.Cry && (b.Cry = 1, $(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", b.CryCheck(a))) : e.R == b.R && !b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack();
  },
  PrivateBirth: function PrivateBirth(c) {
    var b = c.AttackedLX,
        a = b - 46;
    c.BulletClass = NewO({
      X: b,
      R: c.R,
      pixelLeft: a,
      F: oGd.MB2
    });
    c.BulletEle = NewImg(0, "images/Plants/PBRS.gif", "left:" + a + "px;top:" + (c.pixelTop + 35) + "px;visibility:hidden;z-index:" + (c.zIndex + 2));
    c.MX = b + 9;
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  NormalAttack: function NormalAttack() {
    var c = this,
        a = c.id,
        d = "SSB" + Math.random(),
        b = c.AttackedLX;
    EditEle(c.BulletEle.cloneNode(false), {
      id: d
    }, 0, EDPZ);
    oSym.addTask(1, function (k, e, f, g, h) {
      var j = GetC(f),
          i = oZ.getZ0(f, g);
      i && i.Altitude == 1 ? (i.getred(i, 40, 0), SetStyle(e, {
        left: h + 38 + "px"
      }).src = "images/Plants/RSBU.gif", oSym.addTask(15, ClearChild, [e])) : (f += 5) < oS.W ? (e.style.left = (h += 5) + "px", oSym.addTask(1, arguments.callee, [k, e, f, g, h])) : ClearChild(e);
    }, [d, $(d), b, c.R, b - 46]);
    c.Attacking = 1;
    oSym.addTask(10, function (g, e) {
      var f = $(g);
      f && SetVisible(f);
      oSym.addTask(130, function (h) {
        var i = $P[h];
        i && (i.Attacking = 0);
      }, [e]);
    }, [d, a]);
  },
  CryCheck: function CryCheck(a) {
    oSym.addTask(140, function (b) {
      var d = $P[b],
          c,
          f,
          e;

      if (d) {
        c = (f = d.ArZ).length;

        while (c--) {
          (!(e = $Z[f[c]]) || !e.PZ || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1);
        }

        f.length ? d.CryCheck(b) : (d.Cry = 0, $(b).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif");
      }
    }, [a]);
  }
}),
    oIceShroom = InheritO(oFumeShroom, {
  EName: "oIceShroom",
  CName: $__language_Array__["1247dc98bf6479a1e11cdf67018a0cde"],
  width: 113,
  height: 75,
  beAttackedPointR: 63,
  SunNum: 50,
  coolTime: 1,
  PicArr: ["images/Card/Plants/soni.png", "images/Plants/IceShroom/0.gif", "images/Plants/IceShroom/IceShroom.gif", "images/Plants/IceShroom/IceShroomSleep.gif", "images/Plants/IceShroom/Snow.gif", "images/Plants/IceShroom/icetrap.png"],
  AudioArr: ["onion", "wakeup"],
  Tooltip: $__language_Array__["3b2e8fb2f163f48ebaa8f8fb3a0af3d9"],
  Produce: $__language_Array__["de164ceb1a2e174ca2d1b81cb6579745"],
  GetDX: CPlants.prototype.GetDX,
  GetDY: CPlants.prototype.GetDY,
  InitTrigger: function InitTrigger() {},
  PrivateDie: function PrivateDie(a) {},
  PrivateBirth: function PrivateBirth(a) {
    !oS.DKind ? (a.NormalAttack(a.id), a.getHurt = function (d, c, b) {}) : a.getHurt = CPlants.prototype.getHurt;
  },
  WakeUP: function WakeUP(a) {
    var b = a.id;
    a.Sleep = 0;
    $(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";
    a.NormalAttack(b);
  },
  NormalAttack: function NormalAttack(a) {
    oSym.addTask(95, function (c) {
      var f = $P[c];

      if (f) {
        PlayAudio("onion");
        var e,
            d,
            b = "Snow_" + Math.random();

        for (d in $Z) {
          (e = $Z[d]).ZX < 901 && e.getFreeze(e, d);
        }

        oSym.addTask(40, function (g) {
          ClearChild(g);
        }, [NewEle(b, "div", "position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#90D356 url(images/Plants/IceShroom/Snow.png) no-repeat scroll " + (f.pixelLeft - 197) + "px " + (f.pixelTop - 80) + "px", 0, EDPZ)]);
        f.Die();
      }
    }, [a]);
  }
}),
    oSunShroom = InheritO(oFumeShroom, {
  EName: "oSunShroom",
  CName: $__language_Array__["3aa43648918c3c16bc3952d98f821cf0"],
  width: 59,
  height: 61,
  beAttackedPointL: 15,
  beAttackedPointR: 44,
  SunNum: 25,
  Stature: -1,
  Status: 0,
  PicArr: ["images/Card/Plants/SunShroom.png", "images/Plants/SunShroom/0.gif", "images/Plants/SunShroom/SunShroom2.gif", "images/Plants/SunShroom/SunShroomSleep.gif", "images/Plants/SunShroom/SunShroom.gif"],
  Tooltip: $__language_Array__["85718284b7c617a933543f9a7e613313"],
  Produce: $__language_Array__["93eead53f008f18160749a43d2e17dd9"],
  GetDX: CPlants.prototype.GetDX,
  GetDY: CPlants.prototype.GetDY,
  InitTrigger: function InitTrigger() {},
  PrivateDie: function PrivateDie(a) {},
  PrivateBirth: function PrivateBirth() {},
  BirthStyle: function BirthStyle(c, d, b, a) {
    oS.DKind ? (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = "images/Plants/SunShroom/SunShroomSleep.gif") : (oSym.addTask(600, function (h, g, f) {
      var e = $P[h];
      e && e.ProduceSun(e, g, f);
    }, [d, GetX(c.C) - 40, GetY(c.R)]), oSym.addTask(12000, function (f) {
      var e = $P[f];
      e && (e.Sleep = 0, $(f).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif", e.Status = 1);
    }, [d]));
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  ProduceSun: function ProduceSun(a, c, b) {
    AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0), oSym.addTask(2400, function (g, f, e) {
      var d = $P[g];
      d && d.ProduceSun(d, f, e);
    }, [a.id, c, b]);
  },
  WakeUP: function WakeUP(a) {
    var b = a.id;
    a.ProduceSun(a, GetX(a.C) - 40, GetY(a.R));
    $(b).childNodes[1].src = "images/Plants/SunShroom/SunShroom2.gif";
    a.Sleep = 0;
    oSym.addTask(12000, function (d) {
      var c = $P[d];
      c && ($(d).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif", c.Status = 1);
    }, [b]);
  }
}),
    oBlower = InheritO(oFumeShroom, {
  EName: "oBlower",
  CName: $__language_Array__["185d0a7377280cd5b9a5e2d082701694"],
  width: 140,
  height: 120,
  beAttackedPointR: 80,
  coolTime: 50,
  SunNum: 150,
  PicArr: ["images/Card/Plants/Blower.png", "images/Plants/Blower/0.gif", "images/Plants/Blower/Blower.gif", "images/Plants/Blower/Sleep.gif", "images/Plants/Blower/BeginBoom.gif", "images/Plants/Blower/crater10.png", "images/Plants/Blower/crater11.png", "images/Plants/Blower/crater20.png", "images/Plants/Blower/crater21.png", "images/Plants/Blower/crater30.png", "images/Plants/Blower/crater31.png", "images/Plants/Blower/Boom.png"],
  Tooltip: $__language_Array__["a25c1dad16035b71495a31ac4b979698"],
  Produce: $__language_Array__["30d6944e734fec8b8e9cd6c09f0f132d"],
  InitTrigger: function InitTrigger() {},
  BirthStyle: function BirthStyle(c, d, b, a) {
    oS.DKind ? (c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]) : (c.Sleep = 0, c.getHurt = function () {}, b.childNodes[1].src = "images/Plants/Blower/BeginBoom.gif", c.NormalAttack(d));
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  WakeUP: function WakeUP(a) {
    var b = a.id;
    a.Sleep = 0;

    a.getHurt = function () {};

    $(b).childNodes[1].src = "images/Plants/Blower/BeginBoom.gif";
    a.NormalAttack(b);
  },
  NormalAttack: function NormalAttack(a) {
    oSym.addTask(100, function (c) {
      var d = $P[c],
          q = c + "_Boom";

      if (d) {
        var g = $(c),
            l = d.R,
            h = l > 3 ? l - 2 : 1,
            f = Math.min(oS.R, l + 2),
            n = d.pixelLeft - 240,
            m = d.pixelRight + 240,
            e,
            k,
            b = GetC(d.AttackedLX),
            o,
            r = l + "_" + b,
            j = oGd.$;

        do {
          k = (e = oZ.getArZ(n, m, h)).length;

          while (k--) {
            e[k].getExplosion();
          }
        } while (h++ < f);

        d.Die();
        (o = j[r + "_" + 0]) && o.Die();
        (o = j[r + "_" + 2]) && o.Die();
        oGd.$Crater[r] = 2;
        NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (d.zIndex + 2) + ";width:283px;height:324px;left:" + (d.pixelLeft - 80) + "px;top:" + (d.pixelTop - 220) + "px;background:url(images/Plants/Blower/Boom.png) no-repeat", 0, EDPZ);
        oSym.addTask(20, function (i) {
          ClearChild(i);
        }, [NewEle(q, "div", "position:absolute;z-index:20;width:900px;height:600px;left:0;top:0;background:#FFF;*filter:alpha(opacity=50);opacity:.5", 0, EDPZ)]);
        ImgSpriter(q, c, [["0 0", 10, 1], ["-283px 0", 10, 2], ["-566px 0", 10, 3], ["-849px 0", 10, 4], ["-1132px 0", 10, 5], ["-1415px 0", 10, 6], ["-1698px 0", 10, 7], ["-1981px 0", 10, 8], ["-2264px 0", 10, 9], ["-2547px 0", 10, -1]], 0, function (i, p) {
          ClearChild($(i));
          d.setCrater(c + "_crater", l, b, d.pixelLeft + 3, d.pixelTop + 50);
        });
      }
    }, [a]);
  },
  setCrater: function setCrater(f, b, d, e, c) {
    var a;

    switch (oGd.$LF[b]) {
      case 1:
        a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/Blower/crater1" + oS.DKind + ".png) no-repeat;width:90px;height:61px;left:" + (e || GetX(d) - 45) + "px;top:" + (c || GetY(b) - 30) + "px", 0, EDPZ);
        break;

      case 2:
        a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/Blower/crater2" + oS.DKind + ".png) no-repeat;width:85px;height:53px;left:" + (e || GetX(d) - 42) + "px;top:" + (c || GetY(b) - 26) + "px", 0, EDPZ);
        break;

      default:
    }

    oSym.addTask(9000, function (g) {
      var h = b + "_" + d;
      g.style.backgroundPosition = "100% 0";
      oGd.$Crater[h] = 1;
      oSym.addTask(9000, function (i, j) {
        ClearChild(i);
        delete oGd.$Crater[j];
      }, [g, h]);
    }, [a]);
  }
}),
    oTangleKlep = InheritO(CPlants, {
  EName: "oTangleKlep",
  CName: $__language_Array__["6df9319b0cf916827b15be456c30a91d"],
  width: 90,
  height: 72,
  beAttackedPointL: 15,
  beAttackedPointR: 80,
  coolTime: 30,
  SunNum: 25,
  BookHandBack: 4,
  GetDY: function GetDY(b, c, a) {
    return 5;
  },
  NormalGif: 1,
  PicArr: ["images/Card/Plants/tk.png", "images/Plants/TangleKlep/0.gif", "images/Plants/TangleKlep/Float.gif", "images/Plants/TangleKlep/Grab.gif", "images/interface/splash.png"],
  Tooltip: $__language_Array__["fa9fd647d3e2b2d510253b85c09abc10"],
  Produce: $__language_Array__["5692fc0117fcffe95d23c34e007c1374"],
  CanGrow: function CanGrow(c, b, d) {
    var a = b + "_" + d;
    return !(oGd.$LF[b] != 2 || d < 1 || d > 9 || oGd.$Crater[a] || c[0] || c[1]);
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  BirthStyle: function BirthStyle(c, d, b, a) {
    b.childNodes[1].src = "images/Plants/TangleKlep/Float.gif";
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  getHurt: function getHurt(d, b, a) {
    var c = this;
    b == 3 ? (c.HP -= a) < 1 && c.Die() : (c.canTrigger = 0, c.NormalAttack(c, d));
  },
  TriggerCheck: function TriggerCheck(b, a) {
    b.AttackedLX < GetX(9) && b.beAttacked && (this.canTrigger = 0, this.NormalAttack(this, b));
  },
  NormalAttack: function NormalAttack(a, b) {
    a.getHurt = function () {};

    b.getHurt = function () {};

    b.beAttacked = 0;
    b.isAttacking = 1;
    NewImg(0, "images/Plants/TangleKlep/Grab.gif", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);
    oSym.addTask(80, function (g, h) {
      var e = g.id,
          f = h.id,
          d = e + "_splash",
          c = f + "_splash";
      NewEle(d, "div", "position:absolute;background:url(images/interface/splash.png);left:" + (g.pixelLeft - 4) + "px;top:" + (g.pixelTop - 16) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);
      NewEle(c, "div", "position:absolute;background:url(images/interface/splash.png);left:" + (h.AttackedLX - 10) + "px;top:" + (h.pixelTop + h.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);
      ImgSpriter(d, e, [["0 0", 9, 1], ["-97px 0", 9, 2], ["-194px 0", 9, 3], ["-291px 0", 9, 4], ["-388px 0", 9, 5], ["-485px 0", 9, 6], ["-582px 0", 9, 7], ["-679px 0", 9, -1]], 0, function (i, j) {
        ClearChild($(i));
      });
      ImgSpriter(c, f, [["0 0", 9, 1], ["-97px 0", 9, 2], ["-194px 0", 9, 3], ["-291px 0", 9, 4], ["-388px 0", 9, 5], ["-485px 0", 9, 6], ["-582px 0", 9, 7], ["-679px 0", 9, -1]], 0, function (i, j) {
        ClearChild($(i));
      });
      h.DisappearDie();
      g.Die();
    }, [a, b]);
  }
}),
    oSeaShroom = InheritO(oPuffShroom, {
  EName: "oSeaShroom",
  CName: $__language_Array__["166c1e0d068eca1ec2947381031b3b70"],
  width: 48,
  height: 99,
  beAttackedPointL: 10,
  beAttackedPointR: 40,
  coolTime: 0,
  BookHandBack: 3,
  PicArr: ["images/Card/Plants/SeaShroom.png", "images/Plants/SeaShroom/0.gif", "images/Plants/SeaShroom/SeaShroom.gif", "images/Plants/SeaShroom/SeaShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  CanGrow: function CanGrow(c, b, d) {
    var a = b + "_" + d;
    return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a]);
  },
  Tooltip: $__language_Array__["145322b9d86da38dd0bd729246e8a673"],
  Produce: $__language_Array__["38148be80e86afe1cbb0ad5afee3478e"]
}),
    oRoseMan = InheritO(CPlants, {
  EName: "oRoseMan",
  CName: $__language_Array__["c297c920e6dacce29d691c4618d95748"],
  width: 100,
  height: 75,
  beAttackedPointR: 80,
  SunNum: 150,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/LG_NEWIMG/Card/RoseMan_Compressed.png", "images/LG_NEWIMG/PlantRoseMan/0.gif", "images/LG_NEWIMG/PlantRoseMan/1.gif", "images/LG_NEWIMG/PlantRoseMan/4.gif", "images/LG_NEWIMG/PlantRoseMan/2.gif", "images/LG_NEWIMG/PlantRoseMan/3.gif"],
  AudioArr: ["RoseMan"],
  Tooltip: $__language_Array__["dbcccda15d7fc2cd53709fb93ae9e87c"],
  Produce: $__language_Array__["aa3c20a529d02cc8d7eb65ceea15e5cf"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -45;
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/LG_NEWIMG/PlantRoseMan/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 160, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("RoseMan");
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 160, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 100);
    }

    b.childNodes[1].src = "images/LG_NEWIMG/PlantRoseMan/2.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/LG_NEWIMG/PlantRoseMan/1.gif", SetHidden($(i)));
    });
  }
}),
    oFD = InheritO(CPlants, {
  EName: "oFD",
  CName: $__language_Array__["8c022bd81969aa85fb71545420f8d06b"],
  width: 100,
  height: 75,
  beAttackedPointR: 80,
  SunNum: 125,
  Range: $__language_Array__["5deb8d4e84837f136eb5c4774e788a82"],
  BookHandBack: 2,
  SleepGif: 3,
  coolTime: 10,
  AudioArr: ["snaplong"],
  PicArr: ["images/LG_NEWIMG/Card/Bonkchoy.png", "images/LG_NEWIMG/PlantBonkChoy/0.gif", "images/LG_NEWIMG/PlantBonkChoy/1.gif", "images/LG_NEWIMG/PlantBonkChoy/4.gif", "images/LG_NEWIMG/PlantBonkChoy/2.gif", "images/LG_NEWIMG/PlantBonkChoy/3.gif"],
  Tooltip: $__language_Array__["a2526dd76b2633fcd56b3053f79efcaa"],
  Produce: $__language_Array__["122bde55e7cb69c76514558e7800e3a3"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -+65;
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(140, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/LG_NEWIMG/PlantBonkChoy/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 240, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("snaplong");
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 240, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 40);
    }

    b.childNodes[1].src = "images/LG_NEWIMG/PlantBonkChoy/2.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/LG_NEWIMG/PlantBonkChoy/1.gif", SetHidden($(i)));
    });
  }
}),
    oBB = InheritO(oWallNut, {
  EName: "oBB",
  CName: $__language_Array__["ebc73f0c69aa1d0b18b8359772920499"],
  width: 83,
  height: 93,
  beAttackedPointR: 63,
  SunNum: 125,
  HP: 3000,
  PicArr: ["images/LG_NEWIMG/Card/BB.png", "images/ENDLESSPLANTIMG/BambooBrother/0.gif", "images/ENDLESSPLANTIMG/BambooBrother/TallNut.gif", "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked1.gif", "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked2.gif"],
  Tooltip: $__language_Array__["ac76351452470e83ecddef9dbeb1ae87"],
  Produce: $__language_Array__["80e04bfa63f8d7a763fc9cbc20103896"],
  GetDX: function GetDX() {
    return -68;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  CanGrow: function CanGrow(c, b, f) {
    var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
    return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oTallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d;
  },
  Stature: 1,
  getHurt: function getHurt(e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 333 ? c.HurtStatus < 3 && (c.HurtStatus = 3, d.src = "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked3.gif") : c.HP < 999 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked2.gif") : c.HP < 2999 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked1.gif") : c.Die(1);
  }
}),
    oLavaGrava = InheritO(CPlants, {
  EName: "oLavaGrava",
  CName: $__language_Array__["508f283c511dd5c6d921a9b3b8cd0d08"],
  width: 129,
  height: 138,
  Range: "3×3",
  beAttackedPointR: 92,
  SunNum: 150,
  coolTime: 35,
  PicArr: ["images/Card/Plants/lavagrava.png", "images/Plants/LAVAGRAVA/0.gif", "images/Plants/LAVAGRAVA/CherryBomb.gif", "images/Plants/LAVAGRAVA/Boomnut.gif" + $Random],
  AudioArr: ["lavagrava"],
  Tooltip: $__language_Array__["7aa318e5c7a26235785e035b9d589eba"],
  Produce: $__language_Array__["9281f29ef6cc67a18931b9d22d2f59e5"],
  InitTrigger: function InitTrigger() {},
  getHurt: function getHurt() {},
  CanGrow: function CanGrow(c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1];
  },
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(70, function (b) {
      var c = $P[b];

      if (c) {
        PlayAudio("lavagrava");
        var f = $(b),
            j = c.R,
            g = j > 2 ? j - 1 : 1,
            e = j < oS.R ? j + 1 : oS.R,
            l = c.pixelLeft + c.width / 2 - 120,
            k = c.pixelLeft + c.width / 2 + 120,
            d,
            h;

        do {
          h = (d = oZ.getArZ(l, k, g)).length;

          while (h--) {
            d[h].getExplosion();
          }
        } while (g++ < e);

        c.Die(1);
        EditEle(f.childNodes[1], {
          src: c.PicArr[3]
        }, {
          width: "129px",
          height: "148px",
          left: "0px",
          top: "0px"
        });
        oSym.addTask(200, ClearChild, [f]);
      }
    }, [a.id]);
  }
}),
    oStallia = InheritO(oFumeShroom, {
  EName: "oStallia",
  CName: $__language_Array__["5a87ee6cf6b5701f4ad1c400f09fc715"],
  width: 113,
  height: 85,
  Range: $__language_Array__["53003b115bf8490b0fd6cb36253ea170"],
  beAttackedPointR: 63,
  SunNum: 0,
  coolTime: 20,
  PicArr: ["images/Card/Plants/soni.png", "images/Plants/Stallia/0.gif", "images/Plants/Stallia/IceShroom.gif", "images/Plants/Stallia/IceShroomSleep.gif", "images/Plants/Stallia/Snow.gif", "images/Plants/Stallia/icetrap.png"],
  AudioArr: ["stallia", "wakeup"],
  Tooltip: $__language_Array__["7ec01c159c39fa4dd0bea208d11cce5e"],
  Produce: $__language_Array__["ac7ae51004e6f92ae4aa739d09a45d12"],
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +50) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -60;
  },
  GetDY: CPlants.prototype.GetDY,
  InitTrigger: function InitTrigger() {},
  PrivateDie: function PrivateDie(a) {},
  PrivateBirth: function PrivateBirth(a) {
    a.NormalAttack(a.id);

    a.getHurt = function (d, c, b) {}; //! oS.DKind ? (a.NormalAttack(a.id), a.getHurt = function(d, c, b) {}) : a.getHurt = CPlants.prototype.getHurt

  },
  WakeUP: function WakeUP(a) {
    var b = a.id;
    a.Sleep = 0;
    $(b).childNodes[1].src = "images/Plants/Stallia/IceShroom.gif";
    a.NormalAttack(b);
  },
  NormalAttack: function NormalAttack(a) {
    oSym.addTask(100, function (c) {
      var f = $P[c];

      if (f) {
        PlayAudio("stallia");
        var e,
            d,
            b = "Snow_" + Math.random();

        for (d in $Z) {
          (e = $Z[d]).ZX < 901 && e.getStallia(e, d);
        }

        oSym.addTask(40, function (g) {
          ClearChild(g);
        }, [NewEle(b, "div", "position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#5A0094 url(images/Plants/Stallia/Snow.gif) no-repeat scroll " + (f.pixelLeft - 197) + "px " + (f.pixelTop - 80) + "px", 0, EDPZ)]);
        f.Die();
      }
    }, [a]);
  }
}),
    oBamboo1 = InheritO(CPlants, {
  EName: "oBamboo1",
  CName: $__language_Array__["3bc4d489ff8115e32de8c99475d34f9b"],
  HP: 1000,
  width: 81,
  height: 92,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Bamboo/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB05.gif", "images/Plants/BambooBulletHit.gif"],
  Tooltip: $__language_Array__["4cdca08964d24139013df8e25c8cd970"],
  Produce: $__language_Array__["2da1ed524bbe787ed8240d5578d49d87"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["8d040f6dc393371f2089f79ff3a47f9d"]);
    var a = this,
        b = "PB" + Math.random();
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    oSym.addTask(15, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/PB05.gif");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/Plants/BambooBulletHit.gif", oSym.addTask(40, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 25, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oBamboo = InheritO(oPeashooter, {
  EName: "oBamboo",
  CName: $__language_Array__["8a591dff0bb6f74d2f5d29f3f6e9c38a"],
  HP: 1500,
  width: 81,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  height: 110,
  SunNum: 175,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/BBB.png", "images/Plants/Bamboo/0.gif", "images/Plants/Bamboo/Peashooter.gif", "images/Plants/PB05.gif", "images/Plants/BambooBulletHit.gif"],
  Tooltip: $__language_Array__["4cdca08964d24139013df8e25c8cd970"],
  Produce: $__language_Array__["93ab8fd6b2cb61ea1d47020b62d010e5"],
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -68;
  },
  NormalAttack1: oBamboo1.prototype.NormalAttack,
  NormalAttack: function NormalAttack(a) {
    this.NormalAttack1();
    oSym.addTask(15, function (c) {
      var b = $P[c];
      b && b.NormalAttack1();
    }, [this.id]);
  }
}),
    oCGTree = InheritO(CPlants, {
  EName: "oCGTree",
  CName: $__language_Array__["60335e09dd16ac41bcb220fa5e686f30"],
  width: 80,
  height: 224,
  beAttackedPointR: 80,
  SunNum: 75,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  cooltime: 13,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/CGTree.png", "images/Plants/CGTree/0.gif", "images/Plants/CGTree/LaserPea.gif", "images/Plants/CGTree/LaserPeaSleep.gif", "images/Plants/CGTree/LaserPeaAttack.gif", "images/Plants/CGTree/LaserPeaBullet.gif"],
  AudioArr: ["fengshuzhi"],
  Tooltip: $__language_Array__["2be66e23330134afd17166aed9878ebd"],
  Produce: $__language_Array__["c7d7a764d777333cafc8923dd1df67c3"],
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(500, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -68;
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/CGTree/LaserPeaBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 686, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("fengshuzhi");
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 40);
    }

    b.childNodes[1].src = "images/Plants/CGTree/LaserPeaAttack.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 8, 1], ["0 -62px", 8, 2], ["0 -124px", 8, 3], ["0 -186px", 8, 4], ["0 -248px", 8, 5], ["0 -310px", 8, 6], ["0 -372px", 8, 7], ["0 -434px", 8, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/Plants/CGTree/LaserPea.gif", SetHidden($(i)));
    });
  }
}),
    oLotus = InheritO(oPeashooter, {
  EName: "oLotus",
  CName: $__language_Array__["3c38c0199970d4efbebe93771a69739f"],
  width: 73,
  height: 100,
  beAttackedPointR: 53,
  SunNum: 125,
  Range: $__language_Array__["4f48c11ecd5bb9c223250337fa7ff7e0"],
  coolTime: 20,
  PicArr: ["images/Card/Plants/Threepeater.png", "images/Plants/Threepeater/0.gif", "images/Plants/Threepeater/Threepeater.gif", "images/Plants/PB08.gif", "images/Plants/lotusBulletHit.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["cd87a3e61fd1c015e45868a1cd91b0f9"],
  Produce: $__language_Array__["12122dc10183972d0391271d18a86547"],
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(180, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -80;
  },
  getTriggerR: function getTriggerR(R) {
    return [R > 2 ? R - 1 : 1, R < oS.R ? Number(R) + 1 : R];
  },
  //传递行返回触发器行上下限,返回格式是[下限，上限]
  PrivateBirth: function PrivateBirth(o) {
    //oP.PBirthPrgs(o); //出生时建立一个子弹图片，射击直接使用cloneNode//创建一个子弹对象，射击直接继承该对象
    var LX = o.AttackedLX,
        pixelLeft = LX - 40,
        pixelTop,
        oT = o.oTrigger,
        R;
    o.BulletClass = [];
    o.BulletEle = [];

    for (R in oT) {
      o.BulletClass.push(NewO({
        X: LX,
        R: R,
        D: 0,
        Attack: 20,
        Kind: 0,
        ChangeC: 0,
        pixelLeft: pixelLeft,
        F: oGd.MB1
      }));
      o.BulletEle.push(NewImg(0, "images/Plants/PB08.gif", "left:" + pixelLeft + "px;top:" + (GetY(R) - 50) + "px;visibility:hidden;z-index:" + (3 * R + 2)));
    }
  },
  PrivateDie: function PrivateDie(a) {},
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["793afbd92b846646c6efa0022ca937f6"]);
    var v,
        o = this,
        id,
        i = 0;

    for (v in o.oTrigger) {
      EditEle(o.BulletEle[i++].cloneNode(false), {
        id: id = "PB" + Math.random()
      }, 0, EDPZ);
      oSym.addTask(15, function (id) {
        var o = $(id);
        o && SetVisible(o);
      }, [id]);
      oSym.addTask(1, function (id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T) {
        //移动豌豆类子弹
        var side,
            C = GetC(OX),
            Z = oZ["getZ" + D](OX, R);
        Kind == 0 && T[R + "_" + C] && ChangeC != C && (PlayAudio("firepea"), Kind = 1, Attack = 40, ChangeC = C, img.src = "images/Plants/PB08.gif");
        Z && Z.Altitude == 1 ? (Z[{
          "-1": "getSnowPea",
          0: "getPea",
          1: "getFirePea"
        }[Kind]](Z, Attack, D), SetStyle(img, {
          left: pixelLeft + 28 + "px",
          width: "52px",
          height: "46px"
        }).src = "images/Plants/lotusBulletHit.gif", oSym.addTask(30, ClearChild, [img])) : (OX += side = !D ? 5 : -5) < oS.W && OX > 100 ? (img.style.left = (pixelLeft += side) + "px", oSym.addTask(1, arguments.callee, [id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T])) : ClearChild(img);
      }, [id, $(id), 40, 0, o.AttackedLX, v, 0, 0, o.AttackedLX - 40, oGd.$Torch]);
    }
  }
}),
    oPlantern = InheritO(CPlants, {
  EName: "oPlantern",
  CName: $__language_Array__["1cc50299fb4a0ce23cd218d2d2a9fc47"],
  width: 250,
  height: 242,
  beAttackedPointL: 105,
  beAttackedPointR: 145,
  canEat: 0,
  coolTime: 10,
  BookHandBack: 2,
  SunNum: 50,
  coolTime: 15,
  PicArr: ["images/Card/Plants/Plantern.png", "images/xiyoures/Plantern/0.gif", "images/xiyoures/Plantern/Plantern.gif", "images/xiyoures/Plantern/light.gif"],
  Tooltip: $__language_Array__["6cce723993227ab666cc385639bc5358"],
  Produce: $__language_Array__["ad62cf99ba0620acacd8f707055556f6"],
  PrivateBirth: function PrivateBirth(c) {
    var a = c.R,
        b = c.C;
    oGd.$Plantern[a + "_" + b] = c.id;
    NewImg("", "images/xiyoures/Plantern/light.gif", "filter:alpha(opacity=30);opacity:.3;left:0;top:0;z-index:" + c.zIndex, $(c.id));
    oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 0);
  },
  InitTrigger: function InitTrigger() {},
  PrivateDie: function PrivateDie(c) {
    var a = c.R,
        b = c.C;
    delete oGd.$Plantern[a + "_" + b];
    oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 1);
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? 70 : 74;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - 43) + "px;top:" + (a.height - 100) + "px";
  }
}),
    oCactus = InheritO(CPlants, {
  EName: "oCactus",
  CName: $__language_Array__["e509b4f11cded320c1d654e75ef9964f"],
  width: 122,
  height: 150,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  SunNum: 125,
  beAttackedPointL: 10,
  beAttackedPointR: 80,
  AudioArr: ["plantgrow"],
  Status: 0,
  coolTime: 10,
  PicArr: function () {
    return ["images/xiyoures/Card/Cactus.png", "images/xiyoures/Cactus/0.gif", "images/xiyoures/Cactus/Cactus.gif", "images/xiyoures/Cactus/Cactus2.gif", "images/xiyoures/Cactus/Attack.gif", "images/xiyoures/Cactus/Attack2.gif", "images/xiyoures/Cactus/Elongation.gif", "images/xiyoures/Cactus/Shorten.gif", "images/xiyoures/Cactus/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png"];
  }(),
  GetDX: function GetDX() {
    return -58;
  },
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  Tooltip: $__language_Array__["3ea3e51a530cb94df504dc0fd0e1ecb7"],
  Produce: $__language_Array__["3d5acc1f79dbd1403bf3fd3c39b6ffb0"],
  PrivateBirth: function PrivateBirth(a) {
    a.ES = a.Elongation;
  },
  TriggerCheck: function TriggerCheck(b, a) {
    this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status == 0 && oSym.addTask(140, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CheckLoop2: function CheckLoop2(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status && oSym.addTask(150, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function AttackCheck1(g, f) {
    var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

    if (a && a.PZ && (h = c[a.R])) {
      k = a.ZX;
      e = h.length;

      while (e--) {
        j = h[e];

        if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
          b.CheckLoop(g, j[2]);
          return;
        }
      }
    }

    b.canTrigger = 1;
  },
  AttackCheck12: function AttackCheck12(a, c) {
    var b = this;
    b.CheckLoop(a, c);
  },
  Elongation: function Elongation() {
    var a = this,
        b = a.id;

    if (!oGd.$Balloon[a.R] > 0) {
      return true;
    } else {
      PlayAudio("plantgrow");
      a.canTrigger = 0;
      a.Status = 1;
      $(b).childNodes[1].src = "images/xiyoures/Cactus/Elongation.gif";
      oSym.addTask(1, function (e) {
        var d = $P[e],
            c;

        if (d) {
          d.NormalGif = 3;
          $(e).childNodes[1].src = "images/xiyoures/Cactus/Cactus2.gif";
          c = d.CheckLoop;
          d.CheckLoop = d.CheckLoop2;
          d.CheckLoop2 = c;
          c = d.NormalAttack;
          d.NormalAttack = d.NormalAttack2;
          d.NormalAttack2 = c;
          d.ES = d.Shorten;
          d.canTrigger = 1;
        }
      }, [b]);
      return false;
    }
  },
  Shorten: function Shorten() {
    var a = this,
        b = a.id;

    if (oGd.$Balloon[a.R] > 0) {
      return true;
    } else {
      a.canTrigger = 0;
      a.Status = 0;
      $(b).childNodes[1].src = "images/xiyoures/Cactus/Shorten.gif";
      oSym.addTask(1, function (e) {
        var d = $P[e],
            c;

        if (d) {
          d.NormalGif = 2;
          $(e).childNodes[1].src = "images/xiyoures/Cactus/Cactus.gif";
          c = d.CheckLoop;
          d.CheckLoop = d.CheckLoop2;
          d.CheckLoop2 = c;
          c = d.NormalAttack;
          d.NormalAttack = d.NormalAttack2;
          d.NormalAttack2 = c;
          d.ES = d.Elongation;
          d.canTrigger = 1;
        }
      }, [b]);
      return false;
    }
  },
  NormalAttack: function NormalAttack() {
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/xiyoures/Cactus/Attack.gif";
    oSym.addTask(40, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/xiyoures/Cactus/Cactus.gif");
    }, [a]);
    PlayAudio($__language_Array__["aa3e6a72a767756214cfc326f0ec2cf7"]);
    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 25) + "px;top:" + (b.pixelTop + 103) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
    oSym.addTask(30, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (g, i, d, k, h, l) {
      var j,
          f = GetC(k),
          e = oZ["getZ" + d](k, h);
      e && e.Altitude == 1 ? (e.getPea(e, 30, d), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  },
  NormalAttack2: function NormalAttack2() {
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/xiyoures/Cactus/Attack2.gif";
    oSym.addTask(50, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/xiyoures/Cactus/Cactus2.gif");
    }, [a]);
    PlayAudio($__language_Array__["aa3e6a72a767756214cfc326f0ec2cf7"]);
    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 125) + "px;top:" + (b.pixelTop + 33) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
    oSym.addTask(20, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (g, i, d, k, h, l) {
      var j,
          f = GetC(k),
          e = oZ["getZ" + d](k, h);
      e && e.Altitude == 3 ? (e.getHit0(e, 20, d), e.Drop(), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  }
}),
    oGloomShroom = InheritO(oFumeShroom, {
  EName: "oGloomShroom",
  CName: $__language_Array__["d41e6e431183b8eba95b2d16d0fd26b8"],
  HP: 600,
  width: 88,
  Range: "3×3",
  height: 75,
  beAttackedPointR: 68,
  SunNum: 150,
  coolTime: 10,
  PicArr: ["images/Card/Plants/GloomShroom.png", "images/xiyoures/GloomShroom/0.gif", "images/xiyoures/GloomShroom/GloomShroom.gif", "images/xiyoures/GloomShroom/GloomShroomSleep.gif", "images/xiyoures/GloomShroom/GloomShroomAttack.gif", "images/xiyoures/GloomShroom/GloomShroomBullet.gif"],
  AudioArr: ["fatbeet"],
  Tooltip: $__language_Array__["c26e61de387e3dfe13a2fc3dab6e8679"],
  Produce: $__language_Array__["c517475b4d5b4bfcba23ae0020ef1f10"],
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +30) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -58;
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/xiyoures/GloomShroom/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(c, d, e) {
    var f = GetX(this.C),
        b = this.MinX = f - 150,
        a = this.MaxX = f + 120;
    return [[b, a, 0]];
  },
  getTriggerR: function getTriggerR(c) {
    var b = this.MinR = c > 2 ? c - 1 : 1,
        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
    return [b, a];
  },
  NormalAttack: function NormalAttack() {
    var k = this,
        g,
        f = k.MaxR,
        c = k.MinX,
        b = k.MaxX,
        e,
        h,
        a,
        j = k.id,
        d = $(j),
        l = j + "_Bullet";

    for (g = k.MinR; g <= f; g++) {
      e = oZ.getArZ(c, b, g);

      for (h = e.length; h--; (a = e[h]).Altitude < 4 && a.getHit1(a, 40)) {}
    }

    oSym.addTask(0, function (i) {
      PlayAudio(["fatbeet"][Math.floor(Math.random() * 2)]);
      --i && oSym.addTask(100, arguments.callee, [i]);
    }, [4]);
    d.childNodes[1].src = "images/xiyoures/GloomShroom/GloomShroomAttack.gif";
    SetVisible($(l));
    ImgSpriter(l, j, [["0 0", 5, 1], ["0 -200px", 5, 2], ["0 -400px", 5, 3], ["0 -600px", 5, 4], ["0 -800px", 5, 5], ["0 -1000px", 5, 6], ["0 -1200px", 5, 7], ["0 -1400px", 5, 8], ["0 -1600px", 5, 9], ["0 -1800px", 5, 10], ["0 -2000px", 5, 11], ["0 -2200px", 5, -1]], 0, function (m, n) {
      var i = $(n);
      $P[n] && (i.childNodes[1].src = "images/xiyoures/GloomShroom/GloomShroom.gif");
      SetHidden($(m));
    });
  }
}),
    oBlueBerry = InheritO(CPlants, {
  EName: "oBlueBerry",
  CName: $__language_Array__["9d63b50d4703195c163b111c257bb726"],
  width: 122,
  height: 150,
  SunNum: 150,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  coolTime: 40.5,
  beAttackedPointL: 10,
  beAttackedPointR: 80,
  AudioArr: ["plantgrow"],
  Status: 0,
  PicArr: function () {
    return ["images/LG_NEWIMG/Card/blueberry.png", "images/xiyoures/BlueBerry/0.gif", "images/xiyoures/BlueBerry/Cactus.gif", "images/xiyoures/BlueBerry/Cactus.gif", "images/xiyoures/BlueBerry/Attack.gif", "images/xiyoures/BlueBerry/Attack.gif", "images/xiyoures/BlueBerry/Cactus.gif", "images/xiyoures/BlueBerry/Cactus.gif", "images/xiyoures/BlueBerry/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png"];
  }(),
  Tooltip: $__language_Array__["0e2094f853172e2fd04d894a235b1724"],
  Produce: $__language_Array__["aba76ad1e67abe2f3596b4ff4291f2ac"],
  getShadow: function getShadow(a) {
    return "left:3px;top:132px";
  },
  PrivateBirth: function PrivateBirth(a) {
    a.ES = a.Elongation;
  },
  TriggerCheck: function TriggerCheck(b, a) {
    this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status == 0 && oSym.addTask(1750, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CheckLoop2: function CheckLoop2(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status && oSym.addTask(2450, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function AttackCheck1(g, f) {
    var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

    if (a && a.PZ && (h = c[a.R])) {
      k = a.ZX;
      e = h.length;

      while (e--) {
        j = h[e];

        if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
          b.CheckLoop(g, j[2]);
          return;
        }
      }
    }

    b.canTrigger = 1;
  },
  AttackCheck12: function AttackCheck12(a, c) {
    var b = this;
    b.CheckLoop(a, c);
  },
  Elongation: function Elongation() {
    var a = this,
        b = a.id;

    if (!oGd.$BlueBerryObject[a.R] > 0) {
      return true;
    } else {
      PlayAudio("plantgrow");
      a.canTrigger = 0;
      a.Status = 1;
      $(b).childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif";
      oSym.addTask(1, function (e) {
        var d = $P[e],
            c;

        if (d) {
          d.NormalGif = 3;
          $(e).childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif";
          c = d.CheckLoop;
          d.CheckLoop = d.CheckLoop2;
          d.CheckLoop2 = c;
          c = d.NormalAttack;
          d.NormalAttack = d.NormalAttack2;
          d.NormalAttack2 = c;
          d.ES = d.Shorten;
          d.canTrigger = 1;
        }
      }, [b]);
      return false;
    }
  },
  Shorten: function Shorten() {
    var a = this,
        b = a.id;

    if (oGd.$BlueBerryObject[a.R] > 0) {
      return true;
    } else {
      a.canTrigger = 0;
      a.Status = 0;
      $(b).childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif";
      oSym.addTask(1, function (e) {
        var d = $P[e],
            c;

        if (d) {
          d.NormalGif = 2;
          $(e).childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif";
          c = d.CheckLoop;
          d.CheckLoop = d.CheckLoop2;
          d.CheckLoop2 = c;
          c = d.NormalAttack;
          d.NormalAttack = d.NormalAttack2;
          d.NormalAttack2 = c;
          d.ES = d.Elongation;
          d.canTrigger = 1;
        }
      }, [b]);
      return false;
    }
  },
  NormalAttack: function NormalAttack() {
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/xiyoures/BlueBerry/Attack.gif";
    oSym.addTask(310, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif");
    }, [a]);
    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 25) + "px;top:" + (b.pixelTop + 103) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
    oSym.addTask(280, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (g, i, d, k, h, l) {
      var j,
          f = GetC(k),
          e = oZ["getZ" + d](k, h);
      e && e.Altitude == 1 ? (e.getberry(e, 1800, d), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  },
  NormalAttack2: function NormalAttack2() {
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/xiyoures/BlueBerry/Attack.gif";
    oSym.addTask(310, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/xiyoures/BlueBerry/Cactus.gif");
    }, [a]);
    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 125) + "px;top:" + (b.pixelTop + 33) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
    oSym.addTask(280, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (g, i, d, k, h, l) {
      var j,
          f = GetC(k),
          e = oZ["getZ" + d](k, h);
      e && e.Altitude == 3 ? (e.getberry(e, 1800, d), e.Drop(), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  }
}),
    oOxygen = InheritO(CPlants, {
  EName: "oOxygen",
  CName: $__language_Array__["bfb6727c573dfcee97c4e29849b14e6b"],
  width: 82,
  height: 103,
  Range: $__language_Array__["a08eaf13bf678c542235812de3df6850"],
  beAttackedPointR: 45,
  SunNum: 25,
  HP: 300,
  coolTime: 10,
  PicArr: ["images/LG_NEWIMG/Card/Oxygen_Compressed.png", "images/LG_NEWIMG/PlantOxygen/0.gif", "images/LG_NEWIMG/PlantOxygen/Oxygen.gif"],
  Tooltip: $__language_Array__["55d448b37af7400b0fac9570a0cd7586"],
  Produce: $__language_Array__["216b5b6ef412796377d9700b1adf8ac4"],
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[1] || e[0] || oGd.$Crater[c]) : !!e[0];
  },
  Birth: function Birth(d, c, h, a, m, n) {
    PlayAudio("oxygen");
    var e = this,
        k = d + e.GetDX(),
        i = c + e.GetDY(h, a, m),
        l = e.prototype,
        g = i - e.height,
        b = e.id = "P_" + Math.random(),
        j = e.zIndex += 3 * h,
        f = NewEle(0, "div", "position:absolute");

    if ($User.HTML5) {
      e.PicArr = e.PicArr.slice(); //复制一份数组，避免中途更改PicArr
      //初始化随机化图片

      for (var index in e.PicArr) {
        if (e.PicArr[index] && !/base64/.test(e.PicArr[index])) {
          e.PicArr[index] = RandomPic(e.PicArr[index], false, true);
        }
      }

      f.addEventListener("DOMNodeRemoved", function fun(event) {
        if (event.target !== f) {
          return;
        }

        e.RemoveRandomPic();
        f.removeEventListener("DOMNodeRemoved", fun);
      });
    }

    NewImg(0, ShadowPNG, e.getShadow(e), f);
    NewImg(0, e.PicArr[e.NormalGif], "", f);
    e.pixelLeft = k;
    e.pixelRight = k + e.width;
    e.pixelTop = g;
    e.pixelBottom = g + e.GetDBottom();
    e.opacity = 1;
    e.InitTrigger(e, b, e.R = h, e.C = a, e.AttackedLX = k + e.beAttackedPointL, e.AttackedRX = k + e.beAttackedPointR);
    $P[b] = e;
    $P.length += 1;
    e.BirthStyle(e, b, f, {
      left: k + "px",
      top: g + "px",
      zIndex: j
    }, n);
    oGd.add(e, h + "_" + a + "_" + e.PKind);
    e.PrivateBirth(e, n);
  },
  NormalAttack: function NormalAttack() {},
  PrivateBirth: function PrivateBirth(a) {
    var R = a.R,
        C = a.C,
        R1,
        C1,
        MaxR = oS.R,
        MaxC = oS.C,
        LF = oGd.$LF,
        LFR,
        _$ = oGd.$,
        rc;

    for (R1 = R - 1; R1 <= R + 1; R1++) {
      if (R1 > 0 && R1 <= MaxR) {
        LFR = LF[R];

        for (C1 = C - 1; C1 <= C + 1; C1++) {
          if (C1 > 0 && C1 <= MaxC && (LFR == 1 || LFR == 3)) {
            rc = R1 + "_" + C1 + "_";
            !(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oFlowerPot, R1, C1);
          }
        }
      }
    }
  }
}),
    oThunderPine = InheritO(CPlants, {
  EName: "oThunderPine",
  CName: $__language_Array__["5c25b5310f503594a918166c14c99836"],
  width: 108,
  height: 102,
  beAttackedPointR: 53,
  SunNum: 175,
  PicArr: ["images/LG_NEWIMG/Card/ThunderPine_Compressed.png", "images/LG_NEWIMG/PlantThunderPine/0.gif", "images/LG_NEWIMG/PlantThunderPine/ThunderPine.gif", "images/LG_NEWIMG/PB02.png", "images/LG_NEWIMG/PB02.png", "images/LG_NEWIMG/PB03.gif", "images/LG_NEWIMG/PB03.gif", "images/Plants/Torchwood/SputteringFire.gif"],
  AudioArr: ["firepea", "ignite", "ignite2"],
  Tooltip: $__language_Array__["6d7e2b83373cb07781aa0f8adb039c38"],
  Produce: $__language_Array__["8291edacb34891e116281286e71d9dda"],
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[1] || e[0] || oGd.$Crater[c]) : !!e[0];
  },
  PrivateBirth: function PrivateBirth(c) {
    var a = c.R,
        b = c.C;
    oGd.$Pine[a + "_" + b] = c.id;
  },
  InitTrigger: function InitTrigger() {},
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    oSym.addTask(15, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/PB" + m + c + ".gif");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/Plants/PeaBulletHit.gif", oSym.addTask(75, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oGarlic = InheritO(CPlants, {
  EName: "oGarlic",
  CName: $__language_Array__["4799b7d5840573344832f4e18deb8899"],
  width: 139,
  height: 130,
  beAttackedPointR: 40,
  SunNum: 75,
  HP: 200,
  PicArr: ["images/LG_NEWIMG/Card/garlic.png", "images/ENDLESSPLANTIMG/PlantGarlic/0.gif", "images/ENDLESSPLANTIMG/PlantGarlic/Garlic.gif", "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body1.gif", "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body2.gif"],
  Tooltip: $__language_Array__["23993b7959f97948b39ede7be1fff854"],
  Produce: $__language_Array__["9d4033f6e0da5e6253b0c898814e056f"],
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - 70) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -50;
  },
  InitTrigger: function InitTrigger() {},
  HurtStatus: 0,
  getHurt: function getHurt(e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= 20) < 1 ? c.Die() : (e.ChangeR({
      R: c.R
    }), c.HP < 34 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body2.gif") : c.HP < 167 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body1.gif")) : c.Die(1);
  }
}),
    oBubbleFlower = InheritO(CPlants, {
  EName: "oBubbleFlower",
  CName: $__language_Array__["bd2b3a6ee35d5b84ae097fd9f58ceab4"],
  width: 71,
  height: 80,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/LG_NEWIMG/Card/BubbleFlower_Compressed .png", "images/LG_NEWIMG/PlantBubbleFlower/0.gif", "images/LG_NEWIMG/PlantBubbleFlower/BubbleFlower.gif", "images/LG_NEWIMG/PB02.png", "images/LG_NEWIMG/PBBS.gif"],
  Tooltip: $__language_Array__["825b9b676bcf23b0295221e1496aab23"],
  Produce: $__language_Array__["a66b2dcbdefd41682494da85e18dc042"],
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(150, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[1] || e[0] || oGd.$Crater[c]) : !!e[0];
  },
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("BubbleFlower");
    var a = this,
        b = "PB" + Math.random();
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    oSym.addTask(15, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/LG_NEWIMG/PB02.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), d.AttackedLX += 10, d.AttackedRX += 10, d.ZX += 10, d.X += 10, $(d.id).style.left = d.X + "px", SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/LG_NEWIMG/PBBS.gif", oSym.addTask(15, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 10, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Pine]);
  }
}),
    oLitchi = InheritO(oCherryBomb, {
  EName: "oLitchi",
  CName: $__language_Array__["a7c1548edbaf5492575be28bd18871e8"],
  width: 68,
  height: 78,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 48,
  coolTime: 25,
  PicArr: ["images/LG_NEWIMG/Card/Litchi_Compressed.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
  AudioArr: ["jalapeno"],
  Tooltip: $__language_Array__["5ecf718e791c900fb2f055d42ef73392"],
  Produce: $__language_Array__["2c98ce7a22a497d9ea30d19602fdb580"],
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[1] || e[0] || oGd.$Crater[c]) : !!e[0];
  },
  GetDX: function GetDX() {
    return -68;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(260, function (j) {
      var h = $P[j];

      if (h) {
        PlayAudio("jalapeno");
        var b = $(j),
            f = h.R,
            c = oZ.getArZ(100, oS.W, f),
            e = c.length,
            g = oGd.$Ice[f],
            d = oGd.$Crater;

        while (e--) {
          c[e].getExplosion();
        }

        h.Die(1);
        EditEle(b.childNodes[1], {
          src: "images/Plants/Jalapeno/JalapenoAttack.gif"
        }, {
          width: "922px",
          height: "238px",
          left: 48 - h.pixelLeft + "px",
          top: "-140px"
        });
        oSym.addTask(190, ClearChild, [b]);
        ClearChild($("dIceCar" + f));

        if (g) {
          for (e = g[1]; e < 11; e++) {
            delete d[f + "_" + e];
          }
        }
      }
    }, [a.id]);
  }
}),
    oHypnoShroom = InheritO(oFumeShroom, {
  EName: "oHypnoShroom",
  CName: $__language_Array__["f67df29f4830a559fc5a1845b4ff04e2"],
  width: 71,
  height: 70,
  beAttackedPointL: 10,
  beAttackedPointR: 61,
  SunNum: 100,
  coolTime: 30,
  PicArr: ["images/LG_NEWIMG/Card/hypno.png", "images/Plants/HypnoShroom/0.gif", "images/Plants/HypnoShroom/HypnoShroom.gif", "images/Plants/HypnoShroom/HypnoShroomSleep.gif"],
  Tooltip: $__language_Array__["d71bee8199b44054adea1331f00c9da7"],
  Produce: $__language_Array__["da804db44f2f12ee3e71413a33267498"],
  InitTrigger: function InitTrigger() {},
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - 45) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -40;
  },
  getHurt: function getHurt(d, b, a) {
    var c = this;

    switch (b) {
      case 3:
        (c.HP -= a) < 1 && c.Die();
        break;

      case 0:
        !c.Sleep && d.bedevil(d);
        c.Die();
        break;

      default:
        c.Die(1);
    }
  }
}),
    oSquash = InheritO(CPlants, {
  EName: "oSquash",
  CName: $__language_Array__["3108b60e184bface2a2295e0ae7a7199"],
  width: 100,
  height: 210,
  beAttackedPointR: 67,
  SunNum: 50,
  coolTime: 35,
  PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
  AudioArr: ["squash_hmm", "gargantuar_thump"],
  Tooltip: $__language_Array__["4bff1fe3daf54f22fe32d325f47f89a9"],
  Produce: $__language_Array__["52758ad48b6566c689c174533c337ecc"],
  GetDX: function GetDX() {
    return -55;
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -21 : -10;
  },
  getHurt: function getHurt(d, b, a) {
    var c = this;
    b != 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die();
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b - 50, c + 80, 0]];
  },
  TriggerCheck: function TriggerCheck(h, g, e) {
    var c = h.ZX,
        b = this.id,
        a = $(b).childNodes[1],
        f = h.isAttacking;
    h.beAttacked && h.Altitude > -1 && h.Altitude < 2 && (f || !f && c - this.AttackedRX < 71) && (PlayAudio("squash_hmm"), oT.$[this.R].splice(e, 1), a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png", oSym.addTask(100, function (d, j, i) {
      var k = $P[d];
      k && k.NormalAttack(k, h.id, i);
    }, [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]));
  },
  NormalAttack: function NormalAttack(d, c, b) {
    var a = $(d.id),
        e = $Z[c];
    e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
    a.childNodes[1].src = RandomPic("images/Plants/Squash/SquashAttack.gif", a);
    SetStyle(a, {
      left: b + "px"
    });
    d.Die(1);
    oSym.addTask(45, function (f, l, j) {
      PlayAudio("gargantuar_thump");
      var g = oZ.getArZ(l, l + 100, j),
          h = g.length,
          k;

      while (h--) {
        (k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump();
      }

      oSym.addTask(185, ClearChild, [f]);
    }, [a, b, d.R]);
  }
}),
    oShuilei = InheritO(oCherryBomb, {
  EName: "oShuilei",
  CName: $__language_Array__["0741a087908df2b1be27fb730002ba61"],
  width: 68,
  height: 100,
  PKind: 0,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 48,
  coolTime: 15,
  PicArr: ["images/LG_NEWIMG/Card/PlantStarFish_Compressed.png", "images/Plants/Shuilei/0.gif", "images/Plants/Shuilei/Jalapeno.gif", "images/Plants/Shuilei/JalapenoAttack.gif"],
  AudioArr: ["jalapeno"],
  Tooltip: $__language_Array__["32099e3211b0f83b8c435f45d7e43c10"],
  Produce: $__language_Array__["af1ee903b96328d7a453ee0937245753"],
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[1] || e[0] || oGd.$Crater[c]) : !!e[0];
  },
  GetDX: function GetDX() {
    return -68;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(80, function (j) {
      var h = $P[j];

      if (h) {
        PlayAudio("jalapeno");
        var b = $(j),
            f = h.R,
            c = oZ.getArZ(100, oS.W, f),
            e = c.length,
            g = oGd.$Ice[f],
            d = oGd.$Crater;

        while (e--) {
          if (c[e].EName == "oSeaConch" || c[e].EName == "oSeaGui") {
            c[e].OrnHP = 0;
            c[e].getHit0(c[e], 0, 0);
          }
        }

        h.Die(1);
        EditEle(b.childNodes[1], {
          src: "images/Plants/Shuilei/JalapenoAttack.gif"
        }, {
          width: "922px",
          height: "238px",
          left: 48 - h.pixelLeft + "px",
          top: "-140px"
        });
        oSym.addTask(190, ClearChild, [b]);
        ClearChild($("dIceCar" + f));

        if (g) {
          for (e = g[1]; e < 11; e++) {
            delete d[f + "_" + e];
          }
        }
      }
    }, [a.id]);
  }
}),
    oPrimnalPea = InheritO(CPlants, {
  EName: "oPrimnalPea",
  CName: $__language_Array__["7b75729cac8e7d6f0131c7ea83d7fc79"],
  width: 71,
  height: 80,
  beAttackedPointR: 51,
  SunNum: 175,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/PrimnalPea.png", "images/Plants/PrimnalPea/0.gif", "images/Plants/PrimnalPea/PrimnalPea.gif", "images/Plants/PB02.png", "images/Plants/PBBS.gif"],
  Tooltip: $__language_Array__["96bb09b212c39dbe8baf649126870ea3"],
  Produce: $__language_Array__["6a544a93e3a68aef15a64e02bc281599"],
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(300, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CanGrow: function CanGrow(c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1];
  },
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    oSym.addTask(15, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/LG_NEWIMG/PB02.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), d.AttackedLX += 30, d.AttackedRX += 30, d.ZX += 30, d.X += 30, $(d.id).style.left = d.X + "px", SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/Plants/PBBS.gif", oSym.addTask(40, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 40, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Pine]);
  }
}),
    oDinoCleaner = InheritO(CPlants, {
  EName: "oDinoCleaner",
  CName: $__language_Array__["9aa081afc2ca84a220ff55772db0ce99"],
  width: 71,
  height: 61,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/interface/DinoLawn.png"],
  AudioArr: ["Lawnmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function TriggerCheck(b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  GetDX: function GetDX() {
    return -68;
  },
  BoomDie: function BoomDie() {},
  Tooltip: $__language_Array__["f5eeb5222b3568c45f8417a777761cc2"],
  NormalAttack: function NormalAttack(a) {
    PlayAudio(a.AudioArr[0]);

    (function (b, c, k, j, e, g) {
      var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

      while (f--) {
        (h = d[f]).getCrushed(b) && h.CrushDie();
      }

      k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
    })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
  }
}),
    oFutureer = InheritO(CPlants, {
  EName: "oFutureer",
  CName: $__language_Array__["c3277b5046e507460f17a8409ae4f454"],
  width: 71,
  height: 61,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/interface/Futureer.png"],
  AudioArr: ["Lawnmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function TriggerCheck(b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  GetDX: function GetDX() {
    return -68;
  },
  BoomDie: function BoomDie() {},
  Tooltip: $__language_Array__["f5eeb5222b3568c45f8417a777761cc2"],
  NormalAttack: function NormalAttack(a) {
    PlayAudio(a.AudioArr[0]);

    (function (b, c, k, j, e, g) {
      var d = oZ.getArZ(k, j, e),
          f = d.length,
          h;

      while (f--) {
        (h = d[f]).getCrushed(b) && h.CrushDie();
      }

      k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
    })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
  }
}),
    oPrimnalNut = InheritO(CPlants, {
  EName: "oPrimnalNut",
  CName: $__language_Array__["9ed98ff7ddb59f55125a53ffac2f545b"],
  width: 65,
  height: 100,
  beAttackedPointR: 45,
  SunNum: 75,
  HP: 3000,
  coolTime: 10,
  PicArr: ["images/Card/Plants/PrimnalNut.png", "images/Plants/PrimnalNut/0.gif", "images/Plants/PrimnalNut/WallNut.gif", "images/Plants/PrimnalNut/Wallnut_cracked1.gif", "images/Plants/PrimnalNut/Wallnut_cracked2.gif"],
  Tooltip: $__language_Array__["b1672e0ba8c8f3653c2e0df1c4f5dc1a"],
  Produce: $__language_Array__["c7959bc70d62cb5a1eae621dcda21038"],
  GetDX: function GetDX() {
    return -68;
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  InitTrigger: function InitTrigger() {},
  HurtStatus: 0,
  getHurt: function getHurt(e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/PrimnalNut/Wallnut_cracked2.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/PrimnalNut/Wallnut_cracked1.gif") : c.Die(1);
  }
}),
    oPrimnalNutBowling = InheritO(CPlants, {
  EName: "oPrimnalNutBowling",
  CName: $__language_Array__["addc9ee809a7840b1b5c4a0920e7aa81"],
  width: 71,
  height: 100,
  beAttackedPointL: 10,
  beAttackedPointR: 61,
  SunNum: 0,
  HP: 4000,
  coolTime: 0,
  canEat: 0,
  Tooltip: "",
  PicArr: ["images/Card/Plants/PrimnalNut.png", "images/Plants/PrimnalNut/0.gif", "images/Plants/PrimnalNut/WallNutRoll.gif"],
  AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
  Produce: "",
  CanAttack: 1,
  InitTrigger: function InitTrigger() {},
  getHurt: function getHurt() {},
  CanGrow: function CanGrow(d, e, f) {
    return true;
  },
  GetDX: function GetDX() {
    return -68;
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  NormalAttack: null,
  PrivateBirth: function PrivateBirth(c) {
    var d = $(c.id);
    PlayAudio("bowling");

    (function (z, y, q, r, p, x, e, g, b) {
      var a = z.R,
          l = z.C,
          A,
          u,
          s,
          v = 0,
          w,
          i,
          t = false;

      if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
        u = A.id;
        PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);

        switch (A.Ornaments) {
          case 0:
            A.NormalDie();
            break;

          case 1:
            A.getHit0(A, Math.min(A.OrnHP, 900), 0);
            break;

          default:
            z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0);
        }

        z.CanAttack = 0;

        switch (a) {
          case oS.R:
            e = -1;
            break;

          case 1:
            e = 1;
            break;

          default:
            switch (e) {
              case 1:
                e = -1;
                break;

              case -1:
                e = 1;
                break;

              default:
                e = Math.random() > 0.5 ? 1 : -1;
            }

        }

        oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b]);
      } else {
        switch (e) {
          case 1:
            z.pixelBottom + 2 > b && (e = -1);
            break;

          case -1:
            z.pixelBottom - 2 < g && (e = 1);
            break;
        }

        q > y ? z.Die() : (i = GetC(z.pixelRight += 2), z.AttackedLX = q += 2, z.AttackedRX = r += 2, w = GetR(z.pixelBottom += e * 2), SetStyle(x, {
          left: (z.pixelLeft = p += 2) + "px",
          top: (z.pixelTop += e * 2) + "px"
        }), w != a && (z.R = w, t = true, !z.CanAttack && (z.CanAttack = 1)), i != l && (z.C = i, t = true), t && (oGd.del({
          R: a,
          C: l,
          PKind: 1
        }), oGd.add(z, w + "_" + i + "_1")), oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]));
      }
    })(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600);
  }
}),
    oShrubbery = InheritO(CPlants, {
  EName: "oShrubbery",
  CName: $__language_Array__["3bf6ba522ee379ad636d463c95ebc8a8"],
  width: 112,
  height: 130,
  beAttackedPointR: 92,
  SunNum: 225,
  Range: $__language_Array__["a08eaf13bf678c542235812de3df6850"],
  coolTime: 12.5,
  PicArr: ["images/Card/Plants/Shrubbery.png", "images/Plants/Shrubbery/0.gif", "images/Plants/Shrubbery/Shrubbery.gif", "images/Plants/Shrubbery/ShrubberyBoom.gif" + $Random],
  Tooltip: $__language_Array__["f8c3ba703234834175d57b14fa9dc892"],
  Produce: $__language_Array__["0f8a427a7697d6673fa3fb14e19dc7ba"],
  InitTrigger: function InitTrigger() {},
  getHurt: function getHurt() {},
  getShadow: function getShadow(a) {
    return "display:none";
  },
  GetDX: function GetDX() {
    return -100;
  },
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(150, function (j) {
      var h = $P[j];

      if (h) {
        var b = $(j),
            f = h.R,
            c = oZ.getArZ(100, oS.W, f),
            e = c.length,
            g = oGd.$Ice[f],
            d = oGd.$Crater;

        while (e--) {
          if (c[e].EName == "oSeaConch" || c[e].EName == "oSeaGui" || c[e].EName == "oConeheadZombie" || c[e].EName == "oBucketheadZombie" || c[e].EName == "oDinoConeheadZombie" || c[e].EName == "oDinoBucketheadZombie" || c[e].EName == "oDinoTombZombie") {
            c[e].OrnHP = 0;
            c[e].getHit0(c[e], 0, 0);
          }
        }

        h.Die(1);
        EditEle(b.childNodes[1], {
          src: "images/Plants/Shrubbery/ShrubberyBoom.gif"
        }, {
          width: "213px",
          height: "196px",
          left: "-50px",
          top: "-37px"
        });
        oSym.addTask(220, ClearChild, [b]);
      }
    }, [a.id]);
  }
}),
    oColdnap = InheritO(CPlants, {
  EName: "oColdnap",
  CName: $__language_Array__["17bfc38b980ec49e3e1c0c45283084be"],
  width: 100,
  height: 100,
  Range: $__language_Array__["8c26747260ba572f9b655451f4eb351d"],
  beAttackedPointR: 80,
  SunNum: 200,
  BookHandBack: 2,
  SleepGif: 3,
  coolTime: 5,
  PicArr: ["images/Card/Plants/Coldnap.png", "images/Plants/Coldnap/0.gif", "images/Plants/Coldnap/1.gif", "images/Plants/Coldnap/4.gif", "images/Plants/Coldnap/2.gif", "images/Plants/Coldnap/3.gif"],
  Tooltip: $__language_Array__["a2a2c7c5328462b19250b88cc0254343"],
  Produce: $__language_Array__["bcbc2f145f2f7f0f190ee3b45831a007"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -+65;
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(120, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/Coldnap/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 240, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 240, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getSnowPea(g, 30);
    }

    b.childNodes[1].src = "images/Plants/Coldnap/2.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/Plants/Coldnap/1.gif", SetHidden($(i)));
    });
  }
}),
    oPrimnalSun = InheritO(CPlants, {
  EName: "oPrimnalSun",
  CName: $__language_Array__["34f5c55126c963531095a2a4fe00dd4f"],
  width: 73,
  height: 90,
  beAttackedPointR: 53,
  SunNum: 75,
  PicArr: ["images/Card/Plants/PrimnalSun.png", "images/Plants/PrimnalSun/0.gif", "", "images/Plants/PrimnalSun/SunFlower.gif"],
  Tooltip: $__language_Array__["d1376168644f5a610517aaa6781afe1f"],
  Produce: $__language_Array__["6cde709b66cdc7bd297942ba4636b116"],
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -68;
  },
  BirthStyle: function BirthStyle(c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/PrimnalSun/SunFlower.gif";
    d.style.clip = "rect(0,auto,95px,0)";
    d.style.height = "190px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  ChangePosition: function ChangePosition(c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(95px,auto,auto,auto)",
      top: "-95px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,95px,auto)",
      top: 0
    });
  },
  PrivateBirth: function PrivateBirth(a) {
    oS.ProduceSun ? oSym.addTask(600, function (d, c, b) {
      $P[d] && (a.ChangePosition($(d), 1), oSym.addTask(80, function (h, g, f, e) {
        $P[h] && (AppearSun(Math.floor(g + Math.random() * 41), f, 75, 0), oSym.addTask(80, function (i) {
          $P[i] && a.ChangePosition($(i), 0);
        }, [h]), oSym.addTask(2500, e, [h, g, f]));
      }, [d, c, b, arguments.callee]));
    }, [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function (f, c, b) {
      var e = this;

      switch (c) {
        case 0:
          var d = e.HP -= b;
          !(d % 100) && (AppearSun(Math.floor(GetX(e.C) - 40 + Math.random() * 41), GetY(e.R), 25, 0), oSym.addTask(50, function (h, g) {
            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0);
          }, [e.C, e.R]), d < 1 ? e.Die() : oSym.addTask(50, function (h, g) {
            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0);
          }, [e.C, e.R]));
          break;

        case 3:
          (e.HP -= b) < 1 && e.Die();
          break;

        default:
          e.Die(1);
      }
    };
  },
  InitTrigger: function InitTrigger() {}
}),
    oXiaoHuangTao = InheritO(CPlants, {
  EName: "oXiaoHuangTao",
  CName: $__language_Array__["0510bd47015f371185f61e9e3ed380ca"],
  width: 100,
  height: 100,
  Range: $__language_Array__["04184077426fbdf4295b173e8a3ab6d5"],
  beAttackedPointR: 80,
  SunNum: 75,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/XHT.png", "images/Future/XiaoHuangTao/0.gif", "images/Future/XiaoHuangTao/1.gif", "images/Future/XiaoHuangTao/4.gif", "images/Future/XiaoHuangTao/2.gif", "images/Future/XiaoHuangTao/3.gif"],
  Tooltip: $__language_Array__["de755508f716534f1b9c8f829c87a843"],
  Produce: $__language_Array__["ac6c54fdca0ab524bd82254313bba43e"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -+50;
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(150, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Future/XiaoHuangTao/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 331, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 331, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 30);
    }

    b.childNodes[1].src = "images/Future/XiaoHuangTao/2.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 3, 1], ["0 -62px", 3, 2], ["0 -124px", 3, 3], ["0 -186px", 3, 4], ["0 -248px", 3, 5], ["0 -310px", 3, 6], ["0 -372px", 2, 7], ["0 -434px", 5, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/Future/XiaoHuangTao/1.gif", SetHidden($(i)));
    });
  }
}),
    oempeach = InheritO(oFumeShroom, {
  EName: "oempeach",
  CName: $__language_Array__["c5ae488f89b4db18c14db3df0fe5636f"],
  HP: 300,
  Range: "3×3",
  width: 88,
  height: 119,
  beAttackedPointR: 68,
  SunNum: 150,
  coolTime: 15,
  PicArr: ["images/Card/Plants/empeach.png", "images/Future/emp/0.gif", "images/Future/emp/GloomShroom.gif", "images/Future/emp/GloomShroomSleep.gif", "images/Future/emp/GloomShroomAttack.gif", "images/Future/emp/GloomShroomBullet.gif"],
  Tooltip: $__language_Array__["bd8416a96f0cd2f162a6c97c8991fd1c"],
  Produce: $__language_Array__["5cfc6a5702e8bc1dd0f8cb5e65d961bc"],
  CanGrow: function CanGrow(b, a, d) {
    var c = b[1];
    return c && c.EName == "oXiaoHuangTao";
  },
  GetDX: function GetDX() {
    return -30;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - 60) + "px;top:" + (a.height - 22) + "px";
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Future/emp/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(c, d, e) {
    var f = GetX(this.C),
        b = this.MinX = f - 120,
        a = this.MaxX = f + 120;
    return [[b, a, 0]];
  },
  getTriggerR: function getTriggerR(c) {
    var b = this.MinR = c > 2 ? c - 1 : 1,
        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
    return [b, a];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["cabab01f8c3fb66f9ed26fbcf99b8601"]);
    var k = this,
        g,
        f = k.MaxR,
        c = k.MinX,
        b = k.MaxX,
        e,
        h,
        a,
        j = k.id,
        d = $(j),
        l = j + "_Bullet";

    for (g = k.MinR; g <= f; g++) {
      e = oZ.getArZ(c, b, g);

      for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 50)) {}
    }

    oSym.addTask(0, function (i) {
      PlayAudio(["cone"][Math.floor(Math.random() * 2)]);
      --i && oSym.addTask(100, arguments.callee, [i]);
    }, [4]);
    d.childNodes[1].src = "images/Future/emp/GloomShroomAttack.gif";
    SetVisible($(l));
    ImgSpriter(l, j, [["0 0", 4, 1], ["0 -200px", 4, 2], ["0 -400px", 4, 3], ["0 -600px", 4, 4], ["0 -800px", 4, 5], ["0 -1000px", 4, 6], ["0 -1200px", 4, 7], ["0 -1400px", 4, 8], ["0 -1600px", 4, 9], ["0 -1800px", 4, 10], ["0 -2000px", 4, 11], ["0 -2200px", 4, -1]], 0, function (m, n) {
      var i = $(n);
      $P[n] && (i.childNodes[1].src = "images/Future/emp/GloomShroom.gif");
      SetHidden($(m));
    });
  }
}),
    oPrimnalPotatoMine = InheritO(CPlants, {
  EName: "oPrimnalPotatoMine",
  CName: $__language_Array__["7616b821d39d4980bffe0494aefd7e1f"],
  width: 75,
  height: 30,
  beAttackedPointR: 55,
  SunNum: 50,
  Range: $__language_Array__["d2b3ae4cf44e49fef219c45fc551d508"],
  coolTime: 10,
  Stature: -1,
  CanGrow: function CanGrow(d, c, f) {
    var b = c + "_" + f,
        a = oGd.$LF[c],
        e = oS.ArP;

    if (e) {
      switch (a) {
        case (0, 3):
          return false;

        case 1:
          return f > 0 && f < e.ArC[1] && !(d[1] || oGd.$Crater[b] || oGd.$Tombstones[b]);

        case 2:
          return f > 0 && f < e.ArC[1] && d[0] && !d[1];
      }
    } else {
      switch (a) {
        case (0, 3):
          return false;

        case 1:
          return !(f < 1 || f > 9 || d[1] || oGd.$Crater[b] || oGd.$Tombstones[b]);

        case 2:
          return d[0] && !d[1];
      }
    }
  },
  PicArr: ["images/Card/Plants/PrimnalPotatoMine.png", "images/Plants/PrimnalPotatoMine/0.gif", "images/Plants/PPrimnalotatoMine/PotatoMine.gif", "images/Plants/PrimnalPotatoMine/PotatoMineNotReady.gif", "images/Plants/PrimnalPotatoMine/PotatoMine_mashed.gif", "images/Plants/PrimnalPotatoMine/ExplosionSpudow.gif"],
  Tooltip: $__language_Array__["1f9194ecd38b1312db4d891654a18c2e"],
  Produce: $__language_Array__["5c060bb9036d4270a1fecd9d88edcee5"],
  Status: 0,
  AudioArr: [$__language_Array__["7d8d010d68202cc78e990cc3eff231ef"]],
  canTrigger: 0,
  BirthStyle: function BirthStyle(d, e, c, b, a) {
    c.childNodes[1].src = !a ? "images/Plants/PrimnalPotatoMine/PotatoMineNotReady.gif" : (~function () {
      d.Status = 1;
      d.canTrigger = 1;
      d.getHurt = d.getHurt2;
    }(), "images/Plants/PrimnalPotatoMine/PotatoMine.gif");
    EditEle(c, {
      id: e
    }, b, EDPZ);
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  getHurt2: function getHurt2(d, b, a) {
    var c = this;
    b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
  },
  PrivateBirth: function PrivateBirth(b, a) {
    !a && oSym.addTask(500, function (d) {
      var c = $P[d];
      c && ($(d).childNodes[1].src = "images/Plants/PrimnalPotatoMine/PotatoMine.gif", c.Status = 1, c.canTrigger = 1, c.getHurt = c.getHurt2);
    }, [b.id]);
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function TriggerCheck(e, c) {
    var a = this.R,
        b = this.C;
    e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
  },
  NormalAttack: function NormalAttack(j, h, e) {
    var g = this,
        b = g.id,
        d = $(b),
        c = oZ.getArZ(j, h, e),
        f = c.length,
        a;

    while (f--) {
      (a = c[f]).Altitude < 2 && a.getThump();
    }

    g.Die(1);
    PlayAudio($__language_Array__["7d8d010d68202cc78e990cc3eff231ef"]);
    EditEle(d.childNodes[1], {
      src: "images/Plants/PrimnalPotatoMine/PotatoMine_mashed.gif"
    }, {
      width: "132px",
      height: "148px",
      left: "-40px",
      top: "-90px"
    });
    NewImg(0, "images/Plants/PrimnalPotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
    oSym.addTask(200, function (i) {
      ClearChild(i.lastChild);
      oSym.addTask(100, ClearChild, [i]);
    }, [d]);
  }
}),
    oHotPotato = InheritO(CPlants, {
  EName: "oHotPotato",
  CName: $__language_Array__["3c32e8d796201a111596f655f5efa7eb"],
  width: 99,
  height: 106,
  beAttackedPointR: 70,
  SunNum: 5,
  BookHandBack: 2,
  PicArr: ["images/Card/Plants/5.png", "images/Plants/GraveBuster/0.gif", "images/Plants/GraveBuster/GraveBuster.gif"],
  AudioArr: ["gravebusterchomp"],
  CanGrow: function CanGrow(b, a, d) {
    var c = oS.ArP;
    return c ? d > 0 && d < c.ArC[1] && a + "_" + d in oGd.$Tombstones && !b[1] : a + "_" + d in oGd.$Tombstones && !b[1];
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - 48) + "px;top:" + a.height + "px";
  },
  BirthStyle: function BirthStyle(c, d, b, a) {
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  GetDY: function GetDY(b, c, a) {
    return -30;
  },
  InitTrigger: function InitTrigger() {},
  Tooltip: $__language_Array__["2836cb11f01e838643fe16601f53d38f"],
  Produce: $__language_Array__["de28cecb90f5c2ac3c79b9106387b451"],
  PrivateBirth: function PrivateBirth(a) {
    PlayAudio("gravebusterchomp");
    oSym.addTask(400, function (b) {
      var e = $P[b],
          c,
          d,
          f;
      e && (d = e.R, f = e.C, delete oGd.$Tombstones[c = d + "_" + f], e.Die(), ClearChild($("dTombstones" + c)), CustomPlants(0, d, f));
    }, [a.id]);
  }
}),
    oXiaoJinJu = InheritO(CPlants, {
  EName: "oXiaoJinJu",
  CName: $__language_Array__["23c7e9643f1b81312e07baffeda67d92"],
  width: 71,
  height: 40,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 51,
  SunNum: 100,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/XiaoJinJu.png", "images/Plants/XiaoJinJu/0.gif", "images/Plants/XiaoJinJu/XiaoJinJu.gif", "images/Plants/XiaoJinJuBullet.png", "images/Plants/XiaoJinJuHit.gif", "images/Plants/XiaoJinJu/XiaoJinJuAttack.gif"],
  Tooltip: $__language_Array__["39a423b8cd7371bf8da8796740eddebc"],
  Produce: $__language_Array__["16618ad641b64323ab4af29cb073d921"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    w = a.id;
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    $(w).childNodes[1].src = "images/Plants/XiaoJinJu/XiaoJinJuAttack.gif";
    oSym.addTask(40, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/XiaoJinJu/XiaoJinJu.gif");
    }, [w]);
    oSym.addTask(15, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 20, k = e, j.src = "images/Plants/XiaoJinJuBullet.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 28 + "px"
      }).src = ["images/Plants/XiaoJinJuHit.gif"][m], oSym.addTask(30, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oAoTeMan = InheritO(CPlants, {
  EName: "oAoTeMan",
  CName: $__language_Array__["7f35dc2c13b92e257b58869414781ef8"],
  width: 122,
  height: 135,
  SunNum: 150,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointL: 10,
  beAttackedPointR: 80,
  AudioArr: ["plantgrow"],
  Status: 0,
  coolTime: 10,
  PicArr: function () {
    return ["images/Card/Plants/AoTeMan.png", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/Attack.gif", "images/Plants/AoTeMan/Attack.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png"];
  }(),
  Tooltip: $__language_Array__["c3b01bdedf19e86ec208134697cd4be0"],
  Produce: $__language_Array__["31148f56e0fe70766f0d56d3ed4f2736"],
  CanGrow: function CanGrow(b, a, d) {
    var c = b[1];
    return c && c.EName == "oXiaoJinJu";
  },
  GetDX: function GetDX() {
    return -58;
  },
  PrivateBirth: function PrivateBirth(a) {
    a.ES = a.Elongation;
  },
  TriggerCheck: function TriggerCheck(b, a) {
    this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status == 0 && oSym.addTask(840, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CheckLoop2: function CheckLoop2(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status && oSym.addTask(850, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function AttackCheck1(g, f) {
    var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

    if (a && a.PZ && (h = c[a.R])) {
      k = a.ZX;
      e = h.length;

      while (e--) {
        j = h[e];

        if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
          b.CheckLoop(g, j[2]);
          return;
        }
      }
    }

    b.canTrigger = 1;
  },
  AttackCheck12: function AttackCheck12(a, c) {
    var b = this;
    b.CheckLoop(a, c);
  },
  Elongation: function Elongation() {
    var a = this,
        b = a.id;

    if (!oGd.$Balloon[a.R] > 0) {
      return true;
    } else {
      PlayAudio("plantgrow");
      a.canTrigger = 0;
      a.Status = 1;
      $(b).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
      oSym.addTask(1, function (e) {
        var d = $P[e],
            c;

        if (d) {
          d.NormalGif = 3;
          $(e).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
          c = d.CheckLoop;
          d.CheckLoop = d.CheckLoop2;
          d.CheckLoop2 = c;
          c = d.NormalAttack;
          d.NormalAttack = d.NormalAttack2;
          d.NormalAttack2 = c;
          d.ES = d.Shorten;
          d.canTrigger = 1;
        }
      }, [b]);
      return false;
    }
  },
  Shorten: function Shorten() {
    var a = this,
        b = a.id;

    if (oGd.$Balloon[a.R] > 0) {
      return true;
    } else {
      a.canTrigger = 0;
      a.Status = 0;
      $(b).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
      oSym.addTask(1, function (e) {
        var d = $P[e],
            c;

        if (d) {
          d.NormalGif = 2;
          $(e).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
          c = d.CheckLoop;
          d.CheckLoop = d.CheckLoop2;
          d.CheckLoop2 = c;
          c = d.NormalAttack;
          d.NormalAttack = d.NormalAttack2;
          d.NormalAttack2 = c;
          d.ES = d.Elongation;
          d.canTrigger = 1;
        }
      }, [b]);
      return false;
    }
  },
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["9474f404a3bc1e52052271f4ab9cb1d3"]);
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/Plants/AoTeMan/Attack.gif";
    oSym.addTask(40, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/AoTeMan/0.gif");
    }, [a]);
    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 25) + "px;top:" + (b.pixelTop + 103) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
    oSym.addTask(15, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (g, i, d, k, h, l) {
      var j,
          f = GetC(k),
          e = oZ["getZ" + d](k, h);
      e && e.Altitude == 1 ? (e.getPea(e, 800, d), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  },
  NormalAttack2: function NormalAttack2() {
    PlayAudio($__language_Array__["9474f404a3bc1e52052271f4ab9cb1d3"]);
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/Plants/AoTeMan/Attack.gif";
    oSym.addTask(50, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/AoTeMan/0.gif");
    }, [a]);
    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 125) + "px;top:" + (b.pixelTop + 33) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
    oSym.addTask(15, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (g, i, d, k, h, l) {
      var j,
          f = GetC(k),
          e = oZ["getZ" + d](k, h);
      e && e.Altitude == 3 ? (e.getHit0(e, 800, d), e.Drop(), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  }
}),
    oSuperManBean = InheritO(CPlants, {
  EName: "oSuperManBean",
  CName: $__language_Array__["a7cd209441581b44b3820d7fe42956b2"],
  width: 80,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  height: 80,
  beAttackedPointR: 80,
  SunNum: 150,
  BookHandBack: 2,
  SleepGif: 3,
  coolTime: 20,
  PicArr: ["images/Card/Plants/SuperManBean.png", "images/Plants/SuperManBean/0.gif", "images/Plants/SuperManBean/LaserPea.gif", "images/Plants/SuperManBean/LaserPeaSleep.gif", "images/Plants/SuperManBean/LaserPeaAttack.gif", "images/Plants/SuperManBean/LaserPeaBullet.gif"],
  AudioArr: ["LaserBean"],
  Tooltip: $__language_Array__["ea3fadf240134f20c61aa9c5fadb08b1"],
  Produce: $__language_Array__["0b58841ddf9dd6c38f22fbba3530f480"],
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(292, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CanGrow: function CanGrow(b, a, d) {
    var c = b[1];
    return c && c.EName == "oLaserBean1";
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -68;
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 686, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("LaserBean");
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 80);
    }

    b.childNodes[1].src = "images/Plants/SuperManBean/LaserPeaAttack.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/Plants/SuperManBean/LaserPea.gif", SetHidden($(i)));
    });
  }
}),
    oLaserBean1 = InheritO(CPlants, {
  EName: "oLaserBean1",
  CName: $__language_Array__["e98efb4e16043db0b83c23be70db7097"],
  width: 80,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  height: 80,
  beAttackedPointR: 80,
  SunNum: 125,
  BookHandBack: 2,
  SleepGif: 3,
  coolTime: 15,
  PicArr: ["images/LG_NEWIMG/Card/LaserPea.png", "images/Plants/LaserPea/0.gif", "images/Plants/LaserPea/LaserPea.gif", "images/Plants/LaserPea/LaserPeaSleep.gif", "images/Plants/LaserPea/LaserPeaAttack.gif", "images/Plants/LaserPea/LaserPeaBullet.gif"],
  AudioArr: ["LaserBean"],
  Tooltip: $__language_Array__["ea3fadf240134f20c61aa9c5fadb08b1"],
  Produce: $__language_Array__["20a02b07d20d6eae7a278cb38208caaf"],
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(292, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -68;
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 686, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("LaserBean");
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 40);
    }

    b.childNodes[1].src = "images/Plants/LaserPea/LaserPeaAttack.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/Plants/LaserPea/LaserPea.gif", SetHidden($(i)));
    });
  }
}),
    oClivia = InheritO(CPlants, {
  EName: "oClivia",
  CName: $__language_Array__["f8c6e01a62723fd1aeb722797fd1579f"],
  width: 71,
  height: 102,
  beAttackedPointR: 51,
  SunNum: 175,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Clivia.png", "images/Plants/Clivia/0.gif", "images/Plants/Clivia/Clivia.gif", "images/Plants/CliviaBullet.png", "images/Plants/CliviaHit.gif", "images/Plants/Clivia/CliviaAttack.gif"],
  Tooltip: $__language_Array__["e8edc00d16b7001754a6efe09fb0ea61"],
  Produce: $__language_Array__["3225f6bf7647170dcb6adbdabdda2c8c"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -82;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    w = a.id;
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    $(w).childNodes[1].src = "images/Plants/Clivia/CliviaAttack.gif";
    oSym.addTask(30, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/Clivia/Clivia.gif");
    }, [w]);
    oSym.addTask(30, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/CliviaBullet.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 0 + "px"
      }).src = ["images/Plants/CliviaHit.gif"][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 50, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oFirePea = InheritO(CPlants, {
  EName: "oFirePea",
  CName: $__language_Array__["96b895396a495fd3110a2c23492aa46d"],
  width: 71,
  height: 102,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/FirePea.png", "images/Plants/FirePea/0.gif", "images/Plants/FirePea/FirePea.gif", "images/Plants/FirePeaBullet.png", "images/Plants/FirePeaHit.gif", "images/Plants/FirePea/FirePeaAttack.gif"],
  Tooltip: $__language_Array__["8291cd8e224557f611af885132120bc2"],
  Produce: $__language_Array__["f2594721fe7b2b1d1e3c0581671d57dc"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -82;
  },
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["793afbd92b846646c6efa0022ca937f6"]);
    var a = this,
        b = "PB" + Math.random();
    w = a.id;
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    $(w).childNodes[1].src = "images/Plants/FirePea/FirePeaAttack.gif";
    oSym.addTask(20, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/FirePea/FirePea.gif");
    }, [w]);
    oSym.addTask(25, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/FirePeaBullet.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 0 + "px"
      }).src = ["images/Plants/FirePeaHit.gif"][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 64, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oFirePea1 = InheritO(CPlants, {
  EName: "oFirePea1",
  CName: $__language_Array__["96b895396a495fd3110a2c23492aa46d"],
  width: 71,
  height: 102,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/FirePea.png", "images/Plants/FirePea/0.gif", "images/Plants/FirePea/FirePea.gif", "images/Plants/FirePeaBullet.png", "images/Plants/FirePeaHit.gif", "images/Plants/FirePea/FirePeaAttack.gif"],
  Tooltip: $__language_Array__["8291cd8e224557f611af885132120bc2"],
  Produce: $__language_Array__["f2594721fe7b2b1d1e3c0581671d57dc"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -82;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    w = a.id;
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    $(w).childNodes[1].src = "images/Plants/FirePea/FirePeaAttack.gif";
    oSym.addTask(20, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/FirePea/FirePea.gif");
    }, [w]);
    oSym.addTask(25, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/FirePeaBullet.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 0 + "px"
      }).src = ["images/Plants/FirePeaHit.gif"][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 64, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oAoTeMan1 = InheritO(CPlants, {
  EName: "oAoTeMan1",
  CName: $__language_Array__["7f35dc2c13b92e257b58869414781ef8"],
  width: 122,
  height: 135,
  SunNum: 150,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointL: 10,
  beAttackedPointR: 80,
  AudioArr: ["plantgrow"],
  Status: 0,
  PicArr: function () {
    return ["images/Card/Plants/AoTeMan.png", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/Attack.gif", "images/Plants/AoTeMan/Attack.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png"];
  }(),
  Tooltip: $__language_Array__["c3b01bdedf19e86ec208134697cd4be0"],
  Produce: $__language_Array__["31148f56e0fe70766f0d56d3ed4f2736"],
  CanGrow: function CanGrow(b, a, d) {
    var c = b[1];
    return c && c.EName == "oXiaoJinJu";
  },
  GetDX: function GetDX() {
    return -58;
  },
  PrivateBirth: function PrivateBirth(a) {
    a.ES = a.Elongation;
  },
  TriggerCheck: function TriggerCheck(b, a) {
    this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status == 0 && oSym.addTask(840, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CheckLoop2: function CheckLoop2(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status && oSym.addTask(850, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function AttackCheck1(g, f) {
    var b = this,
        c = b.oTrigger,
        a = $Z[g],
        h,
        e,
        k,
        j;

    if (a && a.PZ && (h = c[a.R])) {
      k = a.ZX;
      e = h.length;

      while (e--) {
        j = h[e];

        if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
          b.CheckLoop(g, j[2]);
          return;
        }
      }
    }

    b.canTrigger = 1;
  },
  AttackCheck12: function AttackCheck12(a, c) {
    var b = this;
    b.CheckLoop(a, c);
  },
  Elongation: function Elongation() {
    var a = this,
        b = a.id;

    if (!oGd.$Balloon[a.R] > 0) {
      return true;
    } else {
      PlayAudio("plantgrow");
      a.canTrigger = 0;
      a.Status = 1;
      $(b).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
      oSym.addTask(1, function (e) {
        var d = $P[e],
            c;

        if (d) {
          d.NormalGif = 3;
          $(e).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
          c = d.CheckLoop;
          d.CheckLoop = d.CheckLoop2;
          d.CheckLoop2 = c;
          c = d.NormalAttack;
          d.NormalAttack = d.NormalAttack2;
          d.NormalAttack2 = c;
          d.ES = d.Shorten;
          d.canTrigger = 1;
        }
      }, [b]);
      return false;
    }
  },
  Shorten: function Shorten() {
    var a = this,
        b = a.id;

    if (oGd.$Balloon[a.R] > 0) {
      return true;
    } else {
      a.canTrigger = 0;
      a.Status = 0;
      $(b).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
      oSym.addTask(1, function (e) {
        var d = $P[e],
            c;

        if (d) {
          d.NormalGif = 2;
          $(e).childNodes[1].src = "images/Plants/AoTeMan/0.gif";
          c = d.CheckLoop;
          d.CheckLoop = d.CheckLoop2;
          d.CheckLoop2 = c;
          c = d.NormalAttack;
          d.NormalAttack = d.NormalAttack2;
          d.NormalAttack2 = c;
          d.ES = d.Elongation;
          d.canTrigger = 1;
        }
      }, [b]);
      return false;
    }
  },
  NormalAttack: function NormalAttack() {
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/Plants/AoTeMan/Attack.gif";
    oSym.addTask(40, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/AoTeMan/0.gif");
    }, [a]);
    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 25) + "px;top:" + (b.pixelTop + 103) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
    oSym.addTask(15, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (g, i, d, k, h, l) {
      var j,
          f = GetC(k),
          e = oZ["getZ" + d](k, h);
      e && e.Altitude == 1 ? (e.getPea(e, 800, d), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  },
  NormalAttack2: function NormalAttack2() {
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/Plants/AoTeMan/Attack.gif";
    oSym.addTask(50, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/AoTeMan/0.gif");
    }, [a]);
    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 125) + "px;top:" + (b.pixelTop + 33) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
    oSym.addTask(15, function (e) {
      var d = $(e);
      d && SetVisible(d);
    }, [c]);
    oSym.addTask(1, function (g, i, d, k, h, l) {
      var j,
          f = GetC(k),
          e = oZ["getZ" + d](k, h);
      e && e.Altitude == 3 ? (e.getHit0(e, 800, d), e.Drop(), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  }
}),
    oLemon = InheritO(CPlants, {
  EName: "oLemon",
  CName: $__language_Array__["4971a763e7be2e6fe781b63f6940c364"],
  width: 71,
  height: 140,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  coolTime: 12,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Lemon.png", "images/Plants/Lemon/0.gif", "images/Plants/Lemon/0.gif", "images/Plants/Lemon.png", "images/Plants/LemonHIT.gif", "images/Plants/Lemon/20.gif"],
  Tooltip: $__language_Array__["3092163ef07efd6b6ce482cecfb107ef"],
  Produce: $__language_Array__["a8ce93e9d1eb206851c761afdd42fadb"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +10) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -72;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    w = a.id;
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    $(w).childNodes[1].src = "images/Plants/Lemon/20.gif";
    oSym.addTask(60, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/Lemon/0.gif");
    }, [w]);
    oSym.addTask(40, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/Lemon.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 0 + "px"
      }).src = ["images/Plants/LemonHIT.gif"][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 50, 0, a.AttackedLX, a.R, 1, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oSnapShooter = InheritO(CPlants, {
  EName: "oSnapShooter",
  CName: $__language_Array__["6911252cc382e3de47fb8037b82a2b94"],
  width: 71,
  height: 115,
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/SnapShooter.png", "images/Plants/SnapShooter/0.gif", "images/Plants/SnapShooter/0.gif", "images/Plants/PBSnap.gif", "images/Plants/PBSnapHIT.gif", "images/Plants/SnapShooter/20.gif"],
  Tooltip: $__language_Array__["703f7d2515f2c9d8b3d80340e8551e0d"],
  Produce: $__language_Array__["68c12ac57e312968b64ca661c1524589"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - -20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -90;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    w = a.id;
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    $(w).childNodes[1].src = "images/Plants/SnapShooter/20.gif";
    oSym.addTask(80, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/Plants/SnapShooter/0.gif");
    }, [w]);
    oSym.addTask(40, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m < 1 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), ++m && (h = 40), k = e, j.src = "images/Plants/PBSnow.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/Plants/PBSnapHIT.gif", oSym.addTask(100, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 0, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oLongAn = InheritO(CPlants, {
  EName: "oLongAn",
  CName: $__language_Array__["1728e8e84587da139755029157cca9b1"],
  width: 100,
  height: 90,
  Range: $__language_Array__["04184077426fbdf4295b173e8a3ab6d5"],
  zIndex: 1,
  beAttackedPointR: 80,
  SunNum: 125,
  BookHandBack: 2,
  SleepGif: 3,
  coolTime: 17,
  PicArr: ["images/Card/Plants/LongAn.png", "images/Plants/LongAn/0.gif", "images/Plants/LongAn/0.gif", "images/Plants/LongAn/4.gif", "images/Plants/LongAn/2.gif", "images/Plants/LongAn/3.gif"],
  Tooltip: $__language_Array__["ee05ca576ae6a2fb59653f69f5733cc2"],
  Produce: $__language_Array__["d38f5103aa313c5e91324da338b7808b"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -+55;
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(300, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LongAn/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 100, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio("LongAn");
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 100, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getSnowPea(g, 100);
    }

    b.childNodes[1].src = "images/Plants/LongAn/2.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 15, 1], ["0 -62px", 15, 2], ["0 -124px", 15, 3], ["0 -186px", 15, 4], ["0 -248px", 15, 5], ["0 -310px", 15, 6], ["0 -372px", 15, 7], ["0 -434px", 15, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/Plants/LongAn/0.gif", SetHidden($(i)));
    });
  }
}),
    oNap = InheritO(CPlants, {
  EName: "oNap",
  CName: $__language_Array__["a1992672de3b997b31d6a6c7fbb809d3"],
  width: 100,
  height: 90,
  zIndex: 1,
  canEat: 0,
  Range: $__language_Array__["d2b3ae4cf44e49fef219c45fc551d508"],
  beAttackedPointR: 80,
  SunNum: 50,
  BookHandBack: 2,
  coolTime: 12.5,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/Nap.png", "images/Plants/Nap/0.gif", "images/Plants/Nap/0.gif", "images/Plants/Nap/4.gif", "images/Plants/Nap/2.gif", "images/Plants/Nap/3.gif"],
  Tooltip: $__language_Array__["a2a2c7c5328462b19250b88cc0254343"],
  Produce: $__language_Array__["6aad6b5d75e1f668b156f73464487adb"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -+55;
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(120, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LongAn/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 0, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 0, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getSnowPea(g, 0);
    }

    b.childNodes[1].src = "images/Plants/Nap/2.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/Plants/Nap/0.gif", SetHidden($(i)));
    });
  }
}),
    oTaro = InheritO(CPlants, {
  EName: "oTaro",
  CName: $__language_Array__["42e720022e39c58f5f5bd885fd26b05f"],
  width: 90,
  height: 110,
  Range: $__language_Array__["d2b3ae4cf44e49fef219c45fc551d508"],
  beAttackedPointL: 0,
  beAttackedPointR: 20,
  coolTime: 12.5,
  SunNum: 75,
  BookHandBack: 4,
  GetDY: function GetDY(b, c, a) {
    return 5;
  },
  NormalGif: 1,
  PicArr: ["images/Card/Plants/Taro.png", "images/Plants/Taro/0.gif", "images/Plants/Taro/Float.gif", "images/Plants/Taro/Grab.gif", "images/Plants/Taro/TaroGrab.png"],
  Tooltip: $__language_Array__["94abc52889bc4ffccabf5bc9d1214c75"],
  Produce: $__language_Array__["35786de23691151b8727d8c85bae9e1b"],
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  BirthStyle: function BirthStyle(c, d, b, a) {
    b.childNodes[1].src = "images/Plants/Taro/Float.gif";
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  getHurt: function getHurt(d, b, a) {
    var c = this;
    b == 3 ? (c.HP -= a) < 1 && c.Die() : (c.canTrigger = 0, c.NormalAttack(c, d));
  },
  TriggerCheck: function TriggerCheck(b, a) {
    b.AttackedLX < GetX(9) && b.beAttacked && (this.canTrigger = 0, this.NormalAttack(this, b));
  },
  NormalAttack: function NormalAttack(a, b) {
    a.getHurt = function () {};

    b.getHurt = function () {};

    b.beAttacked = 0;
    b.isAttacking = 1;
    NewImg(0, "images/Plants/Taro/Grab.gif", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 100) + "px", b.Ele);
    oSym.addTask(100, function (g, h) {
      var e = g.id,
          f = h.id,
          d = e + "_splash",
          c = f + "_splash";
      NewEle(d, "div", "position:absolute;background:url(images/Plants/Taro/TaroGrab.png);left:" + (g.pixelLeft - 4) + "px;top:" + (g.pixelTop - 16) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);
      NewEle(c, "div", "position:absolute;background:url(images/Plants/Taro/TaroGrab.png);left:" + (h.AttackedLX - 10) + "px;top:" + (h.pixelTop + h.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);
      ImgSpriter(d, e, [["0 0", 9, 1], ["-97px 0", 9, 2], ["-194px 0", 9, 3], ["-291px 0", 9, 4], ["-388px 0", 9, 5], ["-485px 0", 9, 6], ["-582px 0", 9, 7], ["-679px 0", 9, -1]], 0, function (i, j) {
        ClearChild($(i));
      });
      ImgSpriter(c, f, [["0 0", 9, 1], ["-97px 0", 9, 2], ["-194px 0", 9, 3], ["-291px 0", 9, 4], ["-388px 0", 9, 5], ["-485px 0", 9, 6], ["-582px 0", 9, 7], ["-679px 0", 9, -1]], 0, function (i, j) {
        ClearChild($(i));
      });
      h.DisappearDie();
      g.Die();
    }, [a, b]);
  }
}),
    oPumpkinHead = InheritO(CPlants, {
  EName: "oPumpkinHead",
  CName: $__language_Array__["97a90b288907f394a373ec21fa950b63"],
  width: 97,
  height: 67,
  beAttackedPointL: 15,
  beAttackedPointR: 82,
  SunNum: 125,
  PKind: 2,
  HP: 4000,
  coolTime: 30,
  zIndex: 1,
  PicArr: ["images/Card/Plants/PumpkinHead.png", "images/Plants/PumpkinHead/0.gif", "images/Plants/PumpkinHead/PumpkinHead1.gif", "images/Plants/PumpkinHead/PumpkinHead2.gif"],
  Tooltip: $__language_Array__["88cc396d1c50a29509155c0be09e37a0"],
  Produce: $__language_Array__["1e16f4e23ee785e91059e4c9c685af50"],
  CanGrow: function CanGrow(c, b, d) {
    var a = b + "_" + d;
    return c[2] ? 1 : oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0];
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -12 : -5;
  },
  HurtStatus: 0,
  InitTrigger: function InitTrigger() {},
  BirthStyle: function BirthStyle(c, d, b, a) {
    b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
    EditEle(b, {
      id: d
    }, a, EDPZ);
    NewImg(d + "_2", "images/Plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_2"));
  }
}),
    oPingGuo = InheritO(CPlants, {
  EName: "oPingGuo",
  CName: $__language_Array__["20d7fceb0eeaafca77a49dbb5a8ec63d"],
  width: 65,
  height: 43,
  beAttackedPointR: 45,
  SunNum: 50,
  HP: 500,
  coolTime: 30,
  PicArr: ["images/Card/Plants/PingGuo.png", "images/Plants/PingGuo/1.png", "images/Plants/PingGuo/4.png", "images/Plants/PingGuo/3.png", "images/Plants/PingGuo/2.png"],
  Tooltip: "===",
  Produce: "===",
  InitTrigger: function InitTrigger() {},
  HurtStatus: 0,
  getHurt: function getHurt(e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 100 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/PingGuo/2.png") : c.HP < 250 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/PingGuo/3.png") : c.Die(1);
  }
}),
    oPepper = InheritO(oFumeShroom, {
  EName: "oPepper",
  CName: $__language_Array__["e298df668b920b3713df895da3f107a9"],
  HP: 1,
  width: 88,
  height: 125,
  canEat: 0,
  beAttackedPointR: 68,
  SunNum: 75,
  coolTime: 22.5,
  PicArr: ["images/Card/Plants/Pepper.png", "images/Plants/Pepper/0.gif", "images/Plants/Pepper/idle.gif", "images/Plants/Pepper/GloomShroomSleep.gif", "images/Plants/Pepper/wolf.gif", "images/Plants/Pepper/eff.png"],
  AudioArr: [$__language_Array__["730d6391cdc5c225f10cfc3d3aa5096c"]],
  Tooltip: $__language_Array__["88ee1e32ae6780a41cdb3babcbeb0a40"],
  Produce: $__language_Array__["d0dbdb68329621e85f26e0d9c2ab1f25"],
  getShadow: function getShadow(a) {
    return "display:none";
  },
  GetDX: function GetDX() {
    return -58;
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Plants/Pepper/eff.png);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(c, d, e) {
    var f = GetX(this.C),
        b = this.MinX = f - 120,
        a = this.MaxX = f + 120;
    return [[b, a, 0]];
  },
  getTriggerR: function getTriggerR(c) {
    var b = this.MinR = c > 2 ? c - 1 : 1,
        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
    return [b, a];
  },
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["730d6391cdc5c225f10cfc3d3aa5096c"]);
    var k = this,
        g,
        f = k.MaxR,
        c = k.MinX,
        b = k.MaxX,
        e,
        h,
        a,
        j = k.id,
        d = $(j),
        l = j + "_Bullet";

    for (g = k.MinR; g <= f; g++) {
      e = oZ.getArZ(c, b, g);

      for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 20)) {}
    }

    oSym.addTask(0, function (i) {
      PlayAudio(["fatbeet"][Math.floor(Math.random() * 2)]);
      --i && oSym.addTask(100, arguments.callee, [i]);
    }, [4]);
    d.childNodes[1].src = "images/Plants/Pepper/wolf.gif";
    SetVisible($(l));
    ImgSpriter(l, j, [["0 0", 5, 1], ["0 -200px", 5, 2], ["0 -400px", 5, 3], ["0 -600px", 5, 4], ["0 -800px", 5, 5], ["0 -1000px", 5, 6], ["0 -1200px", 5, 7], ["0 -1400px", 5, 8], ["0 -1600px", 5, 9], ["0 -1800px", 5, 10], ["0 -2000px", 5, 11], ["0 -2200", 5, 12], ["0 -2400px", 5, 13], ["0 -2800px", 5, 14], ["0 -3000px", 5, 15], ["0 -3200px", 5, 16], ["0 -3400px", 5, 17], ["0 -3600px", 5, 18], ["0 -3800px", 5, 19], ["0 -4000px", 5, 20], ["0 -4200px", 5, 21], ["0 -4400px", 5, 22], ["0 -4600px", 5, 23], ["0 -4800px", 5, 24], ["0 -5000px", 5, 25], ["0 -5200px", 5, 26], ["0 -5400px", 5, 27], ["0 -5600px", 5, 28], ["0 -5800px", 5, -1]], 0, function (m, n) {
      var i = $(n);
      $P[n] && (i.childNodes[1].src = "images/Plants/Pepper/idle.gif");
      SetHidden($(m));
    });
  }
}),
    oStarfruit = InheritO(CPlants, {
  EName: "oStarfruit",
  CName: $__language_Array__["28b23b501df8bea05c0df4576578bd2d"],
  width: 77,
  height: 50,
  Range: $__language_Array__["c096014765f4d3b7c4960f0b21ddb057"],
  beAttackedPointR: 57,
  SunNum: 125,
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -17 : -10;
  },
  PicArr: ["images/Card/Plants/Starfruit.png", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/Star.gif"],
  Tooltip: $__language_Array__["70d899edbab5a98043ddf5281022c97c"],
  Produce: $__language_Array__["2ca99f6db9d02cc95c20648c5d19ba98"],
  getTriggerRange: function getTriggerRange(e, g, f) {
    var a = this.R,
        b = GetY(a),
        c = oS.W,
        j = this.ArFlyTime,
        h = this.ArHitX,
        i,
        d = 0.5 * (g + f);
    !j && (j = this.ArFlyTime = {}, h = this.ArHitX = {});

    switch (true) {
      case e < a:
        j[e] = [(i = b - GetY(e)) / 5, i / 3];
        h[e] = [d, d + i / 3 * 4];
        return [[100, c, 0]];

      case e == a:
        return [[100, g + 25, 4]];

      default:
        j[e] = [(i = GetY(e) - b) / 5, i / 3];
        h[e] = [d, d + i / 3 * 4];
        return [[100, c, 0]];
    }
  },
  AttackCheck2: function AttackCheck2(l) {
    var j = l.R;

    if (j == this.R) {
      return l.Altitude > 0;
    }

    var q = 0,
        t = l.AttackedLX,
        b = l.AttackedRX,
        e,
        g,
        d = this.ArFlyTime,
        c = this.ArHitX,
        s = d[j],
        r = c[j],
        f = l.WalkDirection ? -1 : 1,
        k = false,
        m,
        p,
        n,
        h,
        a = l.Speed;

    while (q < s.length) {
      h = a * s[q] * f * 0.1;
      e = Math.floor(t - h);
      g = Math.floor(b - h);
      p = r[0];
      n = r[1];

      if (e + 20 < p && g - 20 > p || e < n && g > n) {
        k = true;
        break;
      }

      ++q;
    }

    return k && l.Altitude > 0;
  },
  getTriggerR: function getTriggerR(a) {
    return [1, oS.R];
  },
  PrivateBirth: function PrivateBirth(d) {
    var c = d.pixelLeft + 38,
        b = c - 15,
        a = d.pixelTop + 20;
    d.BulletEle = NewImg(0, "images/Plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getHurt: function getHurt(d, b, a) {
    var c = this;
    b != 3 && c.NormalAttack();
    (c.HP -= a) < 1 && c.Die();
  },
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["793afbd92b846646c6efa0022ca937f6"]);

    var g = this,
        f = g.pixelLeft + 38,
        d = f - 15,
        b = g.pixelTop + 20,
        c = g.R,
        e = f + 15,
        a = function a(j, i, h) {
      return j && j.Altitude == 1 ? (j.getPea(j, 20, i), ClearChild(h), false) : true;
    };

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (m, k, l, i, j) {
        j(oZ.getZ1(m, k), 4, i) && ((m -= 5) < 100 ? ClearChild(i) : (i.style.left = (l -= 5) + "px", oSym.addTask(1, arguments.callee, [m, k, l, i, j])));
      }, [f, c, d, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (m, n, l, k, i, j) {
        j(oZ.getRangeLeftZ(m, n, l), 6, i) && ((k -= 5) < -15 ? ClearChild(i) : (i.style.top = k + "px", oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
      }, [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (m, n, l, k, i, j) {
        j(oZ.getRangeLeftZ(m, n, l), 2, i) && ((k += 5) > 600 ? ClearChild(i) : (i.style.top = k + "px", oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
      }, [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (n, l, m, k, i, j) {
        j(oZ.getZ0(n, l), 7, i) && ((n += 4) > 900 || (k -= 3) < -15 ? ClearChild(i) : (SetStyle(i, {
          left: (m += 4) + "px",
          top: k + "px"
        }), oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
      }, [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (n, l, m, k, i, j) {
        j(oZ.getZ0(n, l), 1, i) && ((n += 4) > 900 || (k += 3) > 600 ? ClearChild(i) : (SetStyle(i, {
          left: (m += 4) + "px",
          top: k + "px"
        }), oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
      }, [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());
  }
}),
    oStarfruit_T = InheritO(CPlants, {
  EName: "oStarfruit_T",
  CName: $__language_Array__["7cc6b30c4f6960de529a0f2e66b97a96"],
  width: 77,
  height: 50,
  Range: $__language_Array__["c096014765f4d3b7c4960f0b21ddb057"],
  beAttackedPointR: 57,
  SunNum: 150,
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -17 : -10;
  },
  PicArr: ["images/Card/Plants/Starfruit_T.png", "images/Plants/Starfruit_T/0.gif", "images/Plants/Starfruit_T/0.gif", "images/Plants/Starfruit_T/Star.gif"],
  Tooltip: $__language_Array__["c738df7e3f3db440ecaa8940b970d918"],
  Produce: $__language_Array__["906c61d39fb8623e25bc60d39108a6b1"],
  getTriggerRange: function getTriggerRange(e, g, f) {
    var a = this.R,
        b = GetY(a),
        c = oS.W,
        j = this.ArFlyTime,
        h = this.ArHitX,
        i,
        d = 0.5 * (g + f);
    !j && (j = this.ArFlyTime = {}, h = this.ArHitX = {});

    switch (true) {
      case e < a:
        j[e] = [(i = b - GetY(e)) / 5, i / 3];
        h[e] = [d, d + i / 3 * 4];
        return [[100, c, 0]];

      case e == a:
        return [[100, g + 25, 4]];

      default:
        j[e] = [(i = GetY(e) - b) / 5, i / 3];
        h[e] = [d, d + i / 3 * 4];
        return [[100, c, 0]];
    }
  },
  AttackCheck2: function AttackCheck2(l) {
    var j = l.R;

    if (j == this.R) {
      return l.Altitude > 0;
    }

    var q = 0,
        t = l.AttackedLX,
        b = l.AttackedRX,
        e,
        g,
        d = this.ArFlyTime,
        c = this.ArHitX,
        s = d[j],
        r = c[j],
        f = l.WalkDirection ? -1 : 1,
        k = false,
        m,
        p,
        n,
        h,
        a = l.Speed;

    while (q < s.length) {
      h = a * s[q] * f * 0.1;
      e = Math.floor(t - h);
      g = Math.floor(b - h);
      p = r[0];
      n = r[1];

      if (e + 20 < p && g - 20 > p || e < n && g > n) {
        k = true;
        break;
      }

      ++q;
    }

    return k && l.Altitude > 0;
  },
  getTriggerR: function getTriggerR(a) {
    return [1, oS.R];
  },
  CanGrow: function CanGrow(b, a, d) {
    var c = b[1];
    return c && c.EName == "oStarfruit";
  },
  PrivateBirth: function PrivateBirth(d) {
    var c = d.pixelLeft + 38,
        b = c - 15,
        a = d.pixelTop + 20;
    d.BulletEle = NewImg(0, "images/Plants/Starfruit_T/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getHurt: function getHurt(d, b, a) {
    var c = this;
    b != 3 && c.NormalAttack();
    (c.HP -= a) < 1 && c.Die();
  },
  NormalAttack: function NormalAttack() {
    PlayAudio($__language_Array__["793afbd92b846646c6efa0022ca937f6"]);

    var g = this,
        f = g.pixelLeft + 38,
        d = f - 15,
        b = g.pixelTop + 20,
        c = g.R,
        e = f + 15,
        a = function a(j, i, h) {
      return j && j.Altitude == 1 ? (j.getPea(j, 40, i), ClearChild(h), false) : true;
    };

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (m, k, l, i, j) {
        j(oZ.getZ1(m, k), 4, i) && ((m -= 5) < 100 ? ClearChild(i) : (i.style.left = (l -= 5) + "px", oSym.addTask(1, arguments.callee, [m, k, l, i, j])));
      }, [f, c, d, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (m, n, l, k, i, j) {
        j(oZ.getRangeLeftZ(m, n, l), 6, i) && ((k -= 5) < -15 ? ClearChild(i) : (i.style.top = k + "px", oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
      }, [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (m, n, l, k, i, j) {
        j(oZ.getRangeLeftZ(m, n, l), 2, i) && ((k += 5) > 600 ? ClearChild(i) : (i.style.top = k + "px", oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
      }, [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (n, l, m, k, i, j) {
        j(oZ.getZ0(n, l), 7, i) && ((n += 4) > 900 || (k -= 3) < -15 ? ClearChild(i) : (SetStyle(i, {
          left: (m += 4) + "px",
          top: k + "px"
        }), oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
      }, [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());

    (function (h) {
      oSym.addTask(15, function (j) {
        var i = $(j);
        i && SetVisible(i);
      }, [h]);
      oSym.addTask(1, function (n, l, m, k, i, j) {
        j(oZ.getZ0(n, l), 1, i) && ((n += 4) > 900 || (k += 3) > 600 ? ClearChild(i) : (SetStyle(i, {
          left: (m += 4) + "px",
          top: k + "px"
        }), oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
      }, [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), {
        id: h
      }, 0, EDPZ), a]);
    })("StarB" + Math.random());
  }
}),
    oKiller = InheritO(oSpikeweed, {
  EName: "oKiller",
  CName: $__language_Array__["ed8ec317d5612cb2517c75c3c39e6859"],
  width: 70,
  SunNum: 250,
  coolTime: 50,
  height: 30,
  beAttackedPointL: 10,
  beAttackedPointR: 74,
  PicArr: ["", ""],
  Attack: 500,
  canEat: 0,
  GetDY: function GetDY(b, c, a) {
    return 0;
  },
  GetDX: function GetDX() {
    return -45;
  },
  NormalAttack: function NormalAttack(b, a) {
    var c = $Z[b];
    c.getPea(c, this.Attack, 0);
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  TriggerCheck: function TriggerCheck(i, h) {
    var c = i.id,
        g = this.ArZ,
        a,
        b,
        e,
        f;
    i.PZ && !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(100, function (d, j) {
      var k = $P[d];
      k && delete k.ArZ[j];
    }, [this.id, c]));
  },
  AttackCheck2: function AttackCheck2(a) {
    return a.Altitude == 1 && a.beAttacked;
  }
}),
    oWaterBoom = InheritO(CPlants, {
  EName: "oWaterBoom",
  CName: $__language_Array__["9f51dcf004dbcb2fa9af5975121b0371"],
  width: 216,
  height: 164,
  Range: "3×3",
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  SunNum: 175,
  coolTime: 10,
  PicArr: function () {
    var a = "images/Plants/WaterBoom/";
    b = "images/Plants/WaterBoom/";
    return ["images/Card/Plants/WaterBoom.png", a + "0.gif", a + "0.gif", b + "Boom.gif"];
  }(),
  AudioArr: ["lavagrava"],
  Tooltip: $__language_Array__["ee4c1310daae1b0db22962dc36c6878c"],
  Produce: $__language_Array__["d83f0b4ac2ce0afd02ecb83aa73d6c71"],
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[1] || e[0] || oGd.$Crater[c]) : !!e[0];
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function TriggerCheck(b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  NormalAttack: function NormalAttack(a) {
    oSym.addTask(40, function (b) {
      var c = $P[b];

      if (c) {
        PlayAudio("lavagrava");
        var f = $(b),
            j = c.R,
            g = j > 2 ? j - 1 : 1,
            e = j < oS.R ? j + 1 : oS.R,
            l = c.pixelLeft - 80,
            k = c.pixelLeft + 160,
            d,
            h;

        do {
          h = (d = oZ.getArZ(l, k, g)).length;

          while (h--) {
            d[h].getExplosion();
          }
        } while (g++ < e);

        c.Die(1);
        $(f.id).childNodes[1].src = "images/Plants/WaterBoom/Boom.gif";
        oSym.addTask(120, ClearChild, [f]);
      }
    }, [a.id]);
  }
}),
    oSeaFlower = InheritO(oSunFlower, {
  EName: "oSeaFlower",
  CName: $__language_Array__["278fc00806fe95d7e35d6d13431fc56c"],
  width: 83,
  height: 110,
  beAttackedPointR: 63,
  SunNum: 100,
  coolTime: 15,
  PicArr: ["images/Card/Plants/SeaFlower.png", "images/Plants/SeaFlower/0.gif", "images/Plants/SeaFlower/SeaFlower.gif", "images/Plants/SeaFlower/SeaFlower.gif"],
  Tooltip: $__language_Array__["69fb976269c6c063b89f97b8c57bf684"],
  Produce: $__language_Array__["623cde72dbf1589ae558be2268b08ae2"],
  BirthStyle: function BirthStyle(c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/SeaFlower/SeaFlower.gif";
    d.style.clip = "rect(0px,auto,121px,0)";
    d.style.height = "236px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[0] || e[1] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[1] || e[0] || oGd.$Crater[c]) : !!e[0];
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -68;
  },
  ChangePosition: function ChangePosition(c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(121px,auto,auto,auto)",
      top: "-118px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,121px,auto)",
      top: 0
    });
  },
  PrivateBirth: function PrivateBirth(a) {
    var b = GetX(a.C);
    oSym.addTask(240, function (f, d, c, e) {
      $P[f] && (a.ChangePosition($(f), 1), oSym.addTask(100, function (k, h, g, j, i) {
        AppearSun(Math.floor(h + Math.random() * 21), j, 50, 0), AppearSun(Math.floor(g + Math.random() * 21), j, 50, 0), oSym.addTask(100, function (l) {
          $P[l] && a.ChangePosition($(l), 0);
        }, [k]), oSym.addTask(3200, i, [k, h, g, j]);
      }, [f, d, c, e, arguments.callee]));
    }, [a.id, b - 40, b - 20, GetY(a.R)]);
  }
}),
    oLight = InheritO(CPlants, {
  EName: "oLight",
  CName: $__language_Array__["68aec2687052f9105e56750804868418"],
  SunNum: 0,
  canEat: 0,
  coolTime: 40,
  width: 71,
  height: 71,
  beAttackedPointR: 51,
  PicArr: function () {
    var a = "images/Props/Light/";
    return ["images/Card/Light.png", a + "0.gif", a + "Light.gif"];
  }(),
  Tooltip: $__language_Array__["019ac70533332aa75845fc0dfedc6996"],
  BoomDie: function BoomDie() {},
  GetDY: function GetDY(b, c, a) {
    return -30;
  },
  InitTrigger: function InitTrigger() {},
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(40, function (b) {
      var e = $P[b],
          c,
          d,
          f;
      e && (d = e.R, f = e.C, e.Die(), oS.StaticCard && AppearSun(Math.floor(GetX(f) + Math.random() * 41), GetY(d), 300, 0));
    }, [a.id]);
  }
}),
    oBubble = InheritO(oLight, {
  EName: "oBubble",
  width: 216,
  height: 164,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  PicArr: function () {
    var a = "images/interface/";
    return ["", "", a + "Bubble.gif"];
  }(),
  CanGrow: function CanGrow(d, e, f) {
    return true;
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(40, function (b) {
      var e = $P[b],
          c,
          d,
          f;
      e && (d = e.R, f = e.C, e.Die());
    }, [a.id]);
  }
}),
    oDurian = InheritO(CPlants, {
  EName: "oDurian",
  CName: $__language_Array__["1719006b30aa15874881caa844507c8c"],
  width: 100,
  height: 90,
  Range: $__language_Array__["d2b3ae4cf44e49fef219c45fc551d508"],
  zIndex: 1,
  beAttackedPointR: 80,
  HP: 3000,
  SunNum: 100,
  coolTime: 15,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/Durian.png", "images/KungFu/Durian/0.gif", "images/KungFu/Durian/0.gif", "images/KungFu/Durian/4.gif", "images/KungFu/Durian/2.gif", "images/KungFu/Durian/3.gif"],
  Tooltip: $__language_Array__["6380925f7a2a1a7d40b46fb6e7c325fc"],
  Produce: $__language_Array__["4ae09cdc1881d778cb2738c1ee9573b8"],
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function GetDX() {
    return -+55;
  },
  CheckLoop: function CheckLoop(b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(90, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function PrivateBirth(b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/interface/blank.png);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[b, Math.min(c + 0, oS.W), 0]];
  },
  NormalAttack: function NormalAttack() {
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 0, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getPea(g, 25);
    }

    b.childNodes[1].src = "images/KungFu/Durian/2.gif";
    SetVisible($(a));
    ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0, function (i, j) {
      var h = $(j);
      $P[j] && (h.childNodes[1].src = "images/KungFu/Durian/0.gif", SetHidden($(i)));
    });
  }
}),
    oSagesage = InheritO(CPlants, {
  EName: "oSagesage",
  CName: $__language_Array__["79609bd92487736c2bb5e828ba660f09"],
  width: 71,
  height: 120,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Sagesage.png", "images/KungFu/Sagesage/0.gif", "images/KungFu/Sagesage/0.gif", "images/KungFu/Sagesage/Bullet.png", "images/Plants/PeaBulletHit.gif", "images/KungFu/Sagesage/1.gif"],
  Tooltip: $__language_Array__["8076f50bd721bb8257b88e882d693a0e"],
  Produce: $__language_Array__["93c730f0795cd2ae2959bcecf4b483a8"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +30) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -40;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    w = a.id;
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    $(w).childNodes[1].src = "images/KungFu/Sagesage/1.gif";
    oSym.addTask(20, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/KungFu/Sagesage/0.gif");
    }, [w]);
    oSym.addTask(25, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/KungFu/Sagesage/Bullet.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getSage",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 0 + "px"
      }).src = ["images/Plants/PeaBulletHit.gif"][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 25, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oPereira = InheritO(CPlants, {
  EName: "oPereira",
  CName: $__language_Array__["2a953cf55d210383b6d40ff1e920ed87"],
  width: 71,
  height: 123,
  beAttackedPointR: 51,
  SunNum: 150,
  BKind: 0,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Pereira.png", "images/KungFu/Pereira/0.gif", "images/KungFu/Pereira/Attack.gif", "images/KungFu/Pereira/Wind.gif"],
  Tooltip: $__language_Array__["24d70e8454ed3dc87aa3e88f0e01fd55"],
  Produce: $__language_Array__["5c212b94fc177954b64b5019206a070e"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -68;
  },
  NormalAttack: function NormalAttack() {
    //PlayAudio("PLANT_PEAPOD.BNK_000002_自定义转码_纯音频输出");
    var a = this,
        b = "PB" + Math.random();
    w = a.id;
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    $(w).childNodes[1].src = "images/KungFu/Pereira/Attack.gif";
    oSym.addTask(15, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/KungFu/Pereira/0.gif");
    }, [w]);
    oSym.addTask(25, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/KungFu/Pereira/Wind.gif");
      d && d.Altitude == 1 && d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c);
      (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 64, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oFireHill = InheritO(CPlants, {
  EName: "oFireHill",
  CName: $__language_Array__["83f230d5d9d5f379e983eb64dd259642"],
  width: 85,
  height: 35,
  canShovel: false,
  beAttackedPointL: 10,
  beAttackedPointR: 75,
  SunNum: 0,
  Stature: -1,
  canEat: 0,
  PicArr: ["images/interface/52_feel.png", "images/interface/52_feel.png", "images/interface/52_feel.png"],
  Attack: 20,
  ArZ: {},
  getShadow: function getShadow(a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  CanGrow: function CanGrow(c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0]) : !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a]);
  },
  getHurt: function getHurt(d, b, a) {
    var c = this;

    switch (b) {
      case 2:
        d.flatTire();
        c.Die();
        break;

      case 1:
        d.getHit2(d, 10, 0);
        c.Die();
        break;

      default:
        (c.HP -= a) < 1 && c.Die();
    }
  },
  NormalAttack: function NormalAttack(b, a) {
    var c = $Z[b];
    c.getExplosion();
  },
  GetDY: function GetDY(b, c, a) {
    return -2;
  },
  getTriggerRange: function getTriggerRange(a, b, c) {
    return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
  },
  TriggerCheck: function TriggerCheck(i, h) {
    var c = i.id,
        g = this.ArZ,
        a,
        b,
        e,
        f;
    i.PZ && !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(0.5, function (d, j) {
      var k = $P[d];
      k && delete k.ArZ[j];
    }, [this.id, c]));
  },
  AttackCheck2: function AttackCheck2(a) {
    return a.Altitude == 1 && a.beAttacked;
  }
}),
    oCamel = InheritO(oLight, (_InheritO = {
  EName: "oCamel",
  width: 216,
  canShovel: false,
  height: 200,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  PicArr: function () {
    var a = "images/Zombies/DinoCamelZombie/";
    return ["", "", a + "Camel.gif"];
  }(),
  CanGrow: function CanGrow(d, e, f) {
    return true;
  },
  PrivateBirth: function PrivateBirth() {},
  Stature: -1,
  canEat: 0,
  GetDY: function GetDY(b, c, a) {
    return +10;
  }
}, _InheritO["canShovel"] = false, _InheritO.getShadow = function getShadow(a) {
  return "display:none";
  return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
}, _InheritO)),
    oRelicFern = InheritO(CPlants, {
  EName: "oRelicFern",
  CName: $__language_Array__["4a7a145509feba663b81c1c73a961e61"],
  width: 71,
  height: 102,
  beAttackedPointR: 51,
  SunNum: 75,
  BKind: 0,
  Range: $__language_Array__["6431bff9e4357d3c97ff5abcc250dc00"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/RelicFern.png", "images/Plants/RelicFern/0.gif", "images/Plants/RelicFern/0.gif", "images/Plants/RelicFern/Bullet.gif", "images/Plants/RelicFern/Effect.gif", "images/Plants/RelicFern/Attack.gif"],
  Tooltip: $__language_Array__["630ba58f7bfec3f2b4f73e9a35b0bfba"],
  Produce: $__language_Array__["5cf2cc8db8c734c81849474038cbc17e"],
  PrivateBirth: function PrivateBirth(a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function PrivateDie(a) {
    a.BulletEle = null;
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -60;
  },
  NormalAttack: function NormalAttack() {
    var a = this,
        b = "PB" + Math.random();
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    oSym.addTask(15, function (d) {
      var c = $(d);
      c && SetVisible(c);
    }, [b]);
    oSym.addTask(1, function (f, j, h, c, n, i, m, k, o, g) {
      var l,
          e = GetC(n),
          d = oZ["getZ" + c](n, i);
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/RelicFern/Bullet.gif");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), !d.isAttacking && (d.AttackedLX -= 15, d.AttackedRX -= 15, d.ZX -= 15, d.X -= 15, $(d.id).style.left = d.X + "px"), SetStyle(j, {
        left: o + 28 + "px"
      }).src = ["images/Plants/RelicFern/Effect.gif"][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 80, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oSimian = InheritO(oLight, {
  EName: "oSimian",
  width: 216,
  height: 164,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  PicArr: function () {
    var a = "images/interface/";
    return ["", "", a + "ChoseLevel_Title_Num_9.png"];
  }(),
  CanGrow: function CanGrow(d, e, f) {
    return true;
  },
  getShadow: function getShadow(a) {
    return "display:none";
  },
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(1, function (b) {
      var e = $P[b],
          c,
          d,
          f;
      e && (d = e.R, f = e.C, e.Die());
    }, [a.id]);
  }
}),
    oAloe = InheritO(CPlants, {
  EName: "oAloe",
  CName: $__language_Array__["f42adba4e7b0b7976aceedb30ddff640"],
  width: 142,
  Range: $__language_Array__["04184077426fbdf4295b173e8a3ab6d5"],
  height: 178,
  beAttackedPointR: 40,
  SunNum: 75,
  BKind: 0,
  AudioArr: ["Aloe"],
  PicArr: ["images/Card/Plants/Aloe.png", "images/Plants/Aloe/0.gif", "images/Plants/Aloe/Aloe.gif" + $Random, "images/Plants/Aloe/Attack_Clip.gif" + $Random, "images/Plants/Aloe/Break.gif" + $Random, "images/Plants/Aloe/Grow.gif" + $Random],
  Tooltip: $__language_Array__["b654bf23c48c637ab1393ecd89416ccf"],
  Produce: $__language_Array__["877b713f2fb79a9896bc9be66f3acdae"],
  BirthStyle: function BirthStyle(c, d, b, a) {
    b.childNodes[1].src = this.PicArr[2];
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  getShadow: function getShadow(a) {
    return "left:" + (a.width * 0.5 - +65) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function GetDX() {
    return -48;
  },
  Watch: function Watch() {
    var w = this.id,
        gg = this.C + 1,
        dd = this.R,
        jj = this.PicArr;

    if (this.EnrichBlood()) {
      $P[w] && ($(w).childNodes[1].src = this.PicArr[3]);
      oSym.addTask(55, function () {
        CustomSpecial(oAloe_Health, dd, gg);
        $P[w] && ($(w).childNodes[1].src = jj[4]);
        oSym.addTask(3200, function () {
          $P[w] && ($(w).childNodes[1].src = jj[5]);
        }, []);
      }, []);
    }
  },
  EnrichBlood: function EnrichBlood() {
    var a = this,
        gg = a.C + 1,
        g = oGd.$[a.R + "_" + gg + "_1"];

    if (g) {
      g && (g.HP += 150);
      return true;
    } else {
      return false;
    }
  },
  PrivateBirth: function PrivateBirth(a) {
    var jj = this.PicArr;
    oS.ProduceSun ? oSym.addTask(500, function (d, c, b) {
      $P[d] && ($(d).childNodes[1].src = jj[2], oSym.addTask(100, function (h, g, f, e) {
        $P[h] && (a.Watch(), oSym.addTask(3400, e, [h, g, f]));
      }, [d, c, b, arguments.callee]));
    }, [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function (f, c, b) {
      var e = this;

      switch (c) {
        case 0:
          (e.HP -= b) < 1 && e.Die();
          break;

        default:
          e.Die(1);
      }
    };
  },
  InitTrigger: function InitTrigger() {}
}),
    oAloe_Health = InheritO(CPlants, {
  EName: "oAloe_Health",
  CName: $__language_Array__["e3d87d9f13ff7928bbeccbb10fba1e84"],
  width: 59,
  canEat: 0,
  height: 82,
  beAttackedPointL: 15,
  beAttackedPointR: 82,
  SunNum: 0,
  PKind: 2,
  HP: 20,
  coolTime: 30,
  zIndex: 1,
  PicArr: ["", "images/Plants/Aloe/Effect_Body.gif", "images/Plants/Aloe/Effect_Ground.gif"],
  CanGrow: function CanGrow(c, b, d) {
    var a = b + "_" + d;
    return c[2] ? 1 : oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0];
  },
  getShadow: function getShadow(a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -12 : -5;
  },
  HurtStatus: 0,
  InitTrigger: function InitTrigger() {},
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(50, function (b) {
      var e = $P[b],
          d,
          f;
      e && (d = e.R, f = e.C, e.Die(), ClearChild($(a.id + "_2")));
    }, [a.id]);
  },
  BirthStyle: function BirthStyle(c, d, b, a) {
    b.childNodes[1].src = "images/Plants/Aloe/Effect_Body.gif";
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_2"));
  }
}),
    oRobinHoak = InheritO(CPlants, {
  EName: "oRobinHoak",
  CName: $__language_Array__["8e4bc76c7d3931193744a6bcad65ae78"],
  Range: $__language_Array__["4ef0d07fefe2fd541e30702e17c72b99"],
  width: 71,
  height: 67,
  beAttackedPointR: 51,
  SunNum: 275,
  BKind: 0,
  AudioArr: ["RobinHoak"],
  PicArr: ["images/Card/Plants/RobinHoak.png", "images/Plants/RobinHoak/0.gif"],
  Tooltip: $__language_Array__["c7db458bcecd4fa513ad256ec6958ce7"],
  Produce: $__language_Array__["6f49c1286e73f1837613616e95b5bad7"]
}),
    oKiwiBeast = InheritO(CPlants, {
  EName: "oKiwiBeast",
  CName: $__language_Array__["7ea70dcfe1bcb53cf30825c75aa715b1"],
  width: 71,
  Range: "3×3",
  height: 67,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["KiwiBeast"],
  PicArr: ["images/Card/Plants/KiwiBeast.png", "images/Plants/KiwiBeast/0.gif"],
  Tooltip: $__language_Array__["d76be9d1e5df8a3296cd45fe4937e8dd"],
  Produce: $__language_Array__["ede9a205ce87d210e4f4bcb4263b0bb4"]
}),
    oMoonflower = InheritO(CPlants, {
  EName: "oMoonflower",
  CName: $__language_Array__["9a156e3eddaf37b327618f298aca9e21"],
  width: 71,
  Range: "3×3",
  height: 67,
  beAttackedPointR: 51,
  SunNum: 50,
  BKind: 0,
  AudioArr: ["MoonFlower"],
  PicArr: ["images/Card/Plants/Moonflower.png", "images/Plants/MoonFlower/0.gif"],
  Tooltip: $__language_Array__["20f83443dd9dd3b470200e9be2025723"],
  Produce: $__language_Array__["e896ce009326f8162bc0fa360f4d1f0c"]
}),
    oPeach_Health = InheritO(CPlants, {
  EName: "oPeach_Health",
  CName: $__language_Array__["959ceb8a845419013368ddb7c9c9d7f4"],
  width: 59,
  canEat: 0,
  height: 82,
  beAttackedPointL: 15,
  beAttackedPointR: 82,
  SunNum: 0,
  PKind: 2,
  HP: 20,
  coolTime: 30,
  zIndex: 1,
  PicArr: ["", "images/KungFu/Peach/Effect_Body.gif"],
  CanGrow: function CanGrow(c, b, d) {
    var a = b + "_" + d;
    return c[2] ? 1 : oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0];
  },
  getShadow: function getShadow(a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function GetDY(b, c, a) {
    return a[0] ? -12 : -5;
  },
  HurtStatus: 0,
  InitTrigger: function InitTrigger() {},
  PrivateBirth: function PrivateBirth(a) {
    oSym.addTask(100, function (b) {
      var e = $P[b],
          d,
          f;
      e && (d = e.R, f = e.C, e.Die(), ClearChild($(a.id + "_2")));
    }, [a.id]);
  },
  BirthStyle: function BirthStyle(c, d, b, a) {
    b.childNodes[1].src = "images/KungFu/Peach/Effect_Body.gif";
    EditEle(b, {
      id: d
    }, a, EDPZ);
    NewImg(d + "_2", "images/interface/ChoseLevel_Title_Num_9.png", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ);
  },
  PrivateDie: function PrivateDie(a) {
    ClearChild($(a.id + "_2"));
  }
}),
    oPeach = InheritO(CPlants, {
  EName: "oPeach",
  CName: $__language_Array__["56507d17cd0b17771f5770ea15c60b60"],
  Range: "3×3",
  width: 71,
  height: 58,
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  AudioArr: ["peach"],
  PicArr: ["images/Card/Plants/Peach.png", "images/KungFu/Peach/0.gif", "images/KungFu/Peach/health.gif"],
  Tooltip: $__language_Array__["b1fc763a3d7e91838dc5f85cb2ccbfd5"],
  Produce: $__language_Array__["1249a83a8133476ce4b180d395406978"],
  EnrichBlood: function EnrichBlood(b) {
    /*R为行(从上往下计算)，C为列(从右往左计算)*/
    var a = this,
        ff = a.C - 1,
        f = oGd.$[a.R + "_" + ff + "_1"]; //后

    gg = a.C + 1, g = oGd.$[a.R + "_" + gg + "_1"]; //前

    h1 = a.C - 1, h2 = a.R - 1, h = oGd.$[h2 + "_" + h1 + "_1"]; //上左

    i1 = a.R - 1, i = oGd.$[i1 + "_" + a.C + "_1"]; //上♂

    j1 = a.C + 1, j2 = a.R - 1, j = oGd.$[j2 + "_" + j1 + "_1"]; //上右

    l1 = a.C - 1, l2 = a.R + 1, l = oGd.$[l2 + "_" + l1 + "_1"]; //下左

    m1 = a.R + 1, m = oGd.$[m1 + "_" + a.C + "_1"]; //下

    n1 = a.C + 1, n2 = a.R + 1, n = oGd.$[n2 + "_" + n1 + "_1"]; //下右
    //下面开始为真正的加血执行代码(加多少血由传的b参数决定)，上面只是定位植物的计算代码

    if (f) {
      CustomSpecial(oPeach_Health, a.R, ff);
    }

    f && (f.HP += b);

    if (g) {
      CustomSpecial(oPeach_Health, a.R, gg);
    }

    g && (g.HP += b);

    if (h) {
      CustomSpecial(oPeach_Health, h2, h1);
    }

    h && (h.HP += b);

    if (i) {
      CustomSpecial(oPeach_Health, i1, a.C);
    }

    i && (i.HP += b);

    if (j) {
      CustomSpecial(oPeach_Health, j2, j1);
    }

    j && (j.HP += b);

    if (l) {
      CustomSpecial(oPeach_Health, l2, l1);
    }

    l && (l.HP += b);

    if (m) {
      CustomSpecial(oPeach_Health, m1, a.C);
    }

    m && (m.HP += b);

    if (n) {
      CustomSpecial(oPeach_Health, n2, n1);
    }

    n && (n.HP += b);
  },
  PrivateBirth: function PrivateBirth(a) {
    oS.ProduceSun ? oSym.addTask(0, function (d, c, b) {
      $P[d] && ($(d).childNodes[1].src = "images/KungFu/Peach/health.gif", oSym.addTask(100, function (h, g, f, e) {
        $P[h] && (a.EnrichBlood(20), oSym.addTask(90, function (i) {
          $P[i] && ($(i).childNodes[1].src = "images/KungFu/Peach/0.gif"); //仙桃加血动画
        }, [h]), oSym.addTask(400, e, [h, g, f]));
      }, [d, c, b, arguments.callee]));
    }, [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function (f, c, b) {
      var e = this;

      switch (c) {
        case 0:
          (e.HP -= b) < 1 && e.Die();
          break;

        default:
          e.Die(1);
      }
    };
  },
  InitTrigger: function InitTrigger() {}
}),
    oBamboo_1 = InheritO(CPlants, (_InheritO2 = {
  EName: "oBamboo_1",
  CName: $__language_Array__["9556b24d2f7cbd164aadb9580168396c"],
  width: 100,
  height: 60,
  Range: $__language_Array__["04184077426fbdf4295b173e8a3ab6d5"],
  beAttackedPointR: 80,
  SunNum: 175,
  BookHandBack: 2,
  SleepGif: 3,
  AudioArr: ["Bamboo_1"],
  PicArr: ["images/Card/Plants/Bamboo_1.png", "images/KungFu/BamBoo/0.gif", "images/KungFu/BamBoo/0.gif", "images/KungFu/BamBoo/1.gif"],
  Tooltip: $__language_Array__["a2a2c7c5328462b19250b88cc0254343"]
}, _InheritO2["Tooltip"] = $__language_Array__["21a67019d26ec5764a48ffb75a97bc2e"], _InheritO2.Produce = $__language_Array__["5ba9b09e2a494d4c9634f11ca17f8617"], _InheritO2.GetDY = function GetDY(b, c, a) {
  return a[0] ? -18 : -10;
}, _InheritO2.getShadow = function getShadow(a) {
  return "left:" + (a.width * 0.5 - +65) + "px;top:" + (a.height - 22) + "px";
}, _InheritO2.GetDX = function GetDX() {
  return -28;
}, _InheritO2.CheckLoop = function CheckLoop(b, c) {
  var a = this.id;
  this.NormalAttack(b);
  oSym.addTask(120, function (e, f, h) {
    var g;
    (g = $P[e]) && g.AttackCheck1(f, h);
  }, [a, b, c]);
}, _InheritO2.PrivateBirth = function PrivateBirth(b) {
  var a = b.id;
  NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/interface/blank.png);z-index:" + (b.zIndex + 1), 0, EDPZ);
}, _InheritO2.PrivateDie = function PrivateDie(a) {
  ClearChild($(a.id + "_Bullet"));
}, _InheritO2.getTriggerRange = function getTriggerRange(a, b, c) {
  return [[b, Math.min(c + 270, oS.W), 0]];
}, _InheritO2.NormalAttack = function NormalAttack() {
  var f = this,
      d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 270, oS.W), f.R),
      e = d.length,
      g,
      c = f.id,
      b = $(c),
      a = c + "_Bullet";

  while (e--) {
    (g = d[e]).Altitude < 2 && g.getPea(g, 30);
  }

  b.childNodes[1].src = "images/KungFu/BamBoo/1.gif";
  SetVisible($(a));
  ImgSpriter(a, c, [["0 0", 9, 1], ["0 -62px", 9, 2], ["0 -124px", 9, 3], ["0 -186px", 9, 4], ["0 -248px", 9, 5], ["0 -310px", 9, 6], ["0 -372px", 9, 7], ["0 -434px", 9, -1]], 0, function (i, j) {
    var h = $(j);
    $P[j] && (h.childNodes[1].src = "images/KungFu/BamBoo/0.gif", SetHidden($(i)));
  });
}, _InheritO2)),
    oYXPlant = InheritO(CPlants, {
  EName: "oYXPlant",
  CName: $__language_Array__["4d830aaba7779d4034df1e65e477a8ad"],
  width: 155,
  height: 130,
  HP: 99999999,
  canShovel: false,
  beAttackedPointR: 52,
  SunNum: 0,
  BookHandBack: 5,
  PicArr: ["images/Card/Plants/Path.png", "images/Zombies/PZombie/ZombieHead.gif", "images/Zombies/PZombie/ZombieHead.gif"],
  Stature: -1,
  GetDY: function GetDY(b, c, a) {
    return -15;
  },
  getShadow: function getShadow(a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  CanGrow: function CanGrow(e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  Tooltip: $__language_Array__["10320b1ec56a09f9ba25343ce3a96c20"],
  Produce: $__language_Array__["51b539cdfaf459ac15f2b856d840c393"],
  InitTrigger: function InitTrigger() {}
}),
    oMudBreak = InheritO(CPlants, {
  EName: "oMudBreak",
  width: 71,
  coolTime: 0,
  height: 67,
  beAttackedPointR: 51,
  SunNum: 50,
  canEat: 0,
  canShovel: false,
  BKind: 0,
  PicArr: ["", "images/interface/52_feel.png", "images/interface/52_feel.png", "images/interface/52_feel.png", "images/interface/52_feel.png"],
  getShadow: function getShadow(a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  PlantB: function PlantB(a, b) {
    var c = this,
        o = c.id,
        q = o + "Boom";
    NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + c.zIndex + ";width:166px;height:166px;left:" + a + "px;top:" + b + "px;background:url(images/interface/Mud.png) no-repeat", 0, EDPZ);
    oSym.addTask(20, function (i) {
      ClearChild(i);
    }, []);
    ImgSpriter(q, c, [["0 0", 5, 1], ["-166px 0", 5, 2], ["-332px 0", 5, 3], ["-498px 0", 5, 4], ["-664px 0", 5, 5], ["-830px 0", 5, 6], ["-996px 0", 5, 7], ["-1162px 0", 5, 8], ["-1328px 0", 5, 9], ["-1494px 0", 5, 10], ["-1660px 0", 5, 11], ["-1826px 0", 5, 12], ["-1992px 0", 5, 13], ["-2158px 0", 5, 14], ["-2324px 0", 5, 15], ["-2490px 0", 5, 16], ["-2656px 0", 10, 17], ["-2822px 0", 5, 18], ["-2988px 0", 5, 19], ["-3154px 0", 5, 20], ["-3320px 0", 5, 21], ["-3486px 0", 5, 22], ["-3652px 0", 5, 23], ["-3818px 0", 5, 24], ["-3984px 0", 5, -1]], 0, function (i, p) {
      ClearChild($(i));
    });
  },
  PrivateBirth: function PrivateBirth(a) {
    this.PlantB(this.pixelLeft - 50, this.pixelTop - 70);
  },
  InitTrigger: function InitTrigger() {}
}),
    oPlantBreak = InheritO(CPlants, {
  EName: "oPlantBreak",
  width: 71,
  coolTime: 0,
  height: 67,
  beAttackedPointR: 51,
  SunNum: 50,
  canEat: 0,
  canShovel: false,
  BKind: 0,
  PicArr: ["", "images/interface/52_feel.png", "images/interface/52_feel.png", "images/interface/52_feel.png", "images/interface/52_feel.png"],
  getShadow: function getShadow(a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  PlantB: function PlantB(a, b) {
    var c = this,
        o = c.id,
        q = o + "Boom";
    NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + c.zIndex + ";width:166px;height:166px;left:" + a + "px;top:" + b + "px;background:url(images/interface/PlantB.png) no-repeat", 0, EDPZ);
    oSym.addTask(20, function (i) {
      ClearChild(i);
    }, []);
    ImgSpriter(q, c, [["0 0", 5, 1], ["-166px 0", 5, 2], ["-332px 0", 5, 3], ["-498px 0", 5, 4], ["-664px 0", 5, 5], ["-830px 0", 5, 6], ["-996px 0", 5, 7], ["-1162px 0", 5, 8], ["-1328px 0", 5, 9], ["-1494px 0", 5, 10], ["-1660px 0", 5, 11], ["-1826px 0", 5, 12], ["-1992px 0", 5, 13], ["-2158px 0", 5, 14], ["-2324px 0", 5, 15], ["-2490px 0", 5, 16], ["-2656px 0", 10, 17], ["-2822px 0", 5, 18], ["-2988px 0", 5, 19], ["-3154px 0", 5, 20], ["-3320px 0", 5, 21], ["-3486px 0", 5, 22], ["-3652px 0", 5, 23], ["-3818px 0", 5, 24], ["-3984px 0", 5, 25], ["-4150px 0", 5, 26], ["-4316px 0", 5, 27], ["-4482px 0", 5, 28], ["-4648px 0", 5, 29], ["-4814px 0", 5, 30], ["-4980px 0", 5, 31], ["-5146px 0", 5, 32], ["-5312px 0", 5, 33], ["-5478px 0", 10, 34], ["-5644px 0", 5, -1]], 0, function (i, p) {
      ClearChild($(i));
    });
  },
  PrivateBirth: function PrivateBirth(a) {
    this.PlantB(this.pixelLeft - 50, this.pixelTop - 70);
    oSym.addTask(200, function (b) {
      var e = $P[b],
          d,
          f;
      e && (d = e.R, f = e.C, e.Die(), ClearChild($(a.id + "_2")));
    }, [a.id]);
  },
  InitTrigger: function InitTrigger() {}
});