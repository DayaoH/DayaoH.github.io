var CPlants = NewO({
  name: "Plants",
  HP: 300,
  PKind: 1,
  beAttackedPointL: 20,
  CardGif: 0,
  StaticGif: 1,
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
  CanGrow: function (c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1];
  },
  getHurt: function (e, c, b) {
    var d = this,
        a = d.id;
    !(c % 3) ? (d.HP -= b) < 1 && d.Die() : d.Die();
  },
  GetDY: function (b, c, a) {
    return a[0] ? -21 : -15;
  },
  GetDX: function () {
    return -Math.floor(this.width * 0.5);
  },
  GetDBottom: function () {
    return this.height;
  },
  Birth: function (d, c, h, a, m, n) {
    var e = this,
        k = d + e.GetDX(),
        i = c + e.GetDY(h, a, m),
        l = e.prototype,
        g = i - e.height,
        b = e.id = "P_" + Math.random(),
        j = e.zIndex += 3 * h,
        f = NewEle(0, "div", "position:absolute");
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
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - 48) + "px;top:" + (a.height - 22) + "px";
  },
  BirthStyle: function (c, d, b, a) {
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  PrivateBirth: function (a) {},
  getTriggerRange: function (a, b, c) {
    return [[b, oS.W, 0]];
  },
  getTriggerR: function (a) {
    return [a, a];
  },
  InitTrigger: function (c, b, f, a, h, g) {
    var j = {},
        i = c.getTriggerR(f),
        e = i[0],
        d = i[1];

    do {
      oT.add(e, j[e] = c.getTriggerRange(e, h, g), b);
    } while (e++ != d);

    c.oTrigger = j;
  },
  TriggerCheck: function (b, a) {
    this.AttackCheck2(b) && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(140, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function (g, f) {
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
  AttackCheck2: function (a) {
    return a.Altitude > 0;
  },
  PrivateDie: function (a) {},
  BoomDie: function () {
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
  Die: function (a) {
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
  CName: $__language_Array__["3fb36e84364b9713f5fa2d6bba24e95d"],
  width: 71,
  height: 57,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/interface/LawnCleaner.png"],
  AudioArr: ["lawnmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function (b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  BoomDie: function () {},
  Tooltip: $__language_Array__["0fd589298bfe8ef014298f16291ff5b1"],
  NormalAttack: function (a) {
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
  CName: $__language_Array__["ad389f6bf55847dfa0591e038b462e54"],
  width: 71,
  height: 57,
  beAttackedPointL: 0,
  beAttackedPointR: 47,
  SunNum: 0,
  PicArr: ["images/interface/LawnCleaner.png"],
  Tooltip: $__language_Array__["ad389f6bf55847dfa0591e038b462e54"],
  AudioArr: ["pool_cleaner"]
}),
    oSeaCleaner = InheritO(CPlants, {
  EName: "oSeaCleaner",
  CName: $__language_Array__["52e025a09fcfc5be8ea6d9a0976d29af"],
  width: 71,
  height: 48,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/LG_NEWIMG/SeaCleaner.png"],
  AudioArr: ["lawnmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function (b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  BoomDie: function () {},
  Tooltip: $__language_Array__["34af766d9868c7c540ceb94a183d578a"],
  NormalAttack: function (a) {
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
  CName: $__language_Array__["cb42dd3e928fd5d3fb1ac97b5b28069c"],
  width: 71,
  height: 48,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/interface/Mower_qin.png"],
  AudioArr: ["lawnmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  getShadow: function (a) {
    return "display:none";
  },
  GetDX: function () {
    return -68;
  },
  TriggerCheck: function (b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  BoomDie: function () {},
  NormalAttack: function (a) {
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
  CName: $__language_Array__["f33bf7113e598a798469817f9c6ea27a"],
  width: 32,
  height: 31,
  beAttackedPointL: 0,
  beAttackedPointR: 32,
  SunNum: 0,
  PicArr: ["images/interface/brain.png"],
  Tooltip: $__language_Array__["4465d4664e9c5d892a635b71ccf4cb24"],
  NormalGif: 0,
  InitTrigger: function () {},
  PrivateBirth: function (a) {
    a.PrivateDie = oS.BrainsNum ? (a.DieStep = Math.floor(150 / oS.BrainsNum), function (d) {
      var c, b;
      AppearSun(Math.floor(GetX(d.C) - 40 + Math.random() * 41), GetY(d.R), 50, 0);
      (b = --oS.BrainsNum) ? (c = b * d.DieStep, $("imgFlagHead").style.left = c - 11 + "px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + c + "px)") : ($("imgFlagHead").style.left = "-1px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)", oP.FlagToEnd());
    }) : function (b) {
      GameOver();
    };
  },
  GetDX: function () {
    return -40;
  }
}),
    oPeashooter = InheritO(CPlants, {
  EName: "oPeashooter",
  CName: $__language_Array__["c54216eaabcf37b64fd51e66a1100aa8"],
  width: 71,
  height: 67,
  beAttackedPointR: 51,
  SunNum: 100,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Peashooter/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
  Tooltip: $__language_Array__["bea2a1e07e2cb1a9ea5ab760e29a5ff3"],
  Produce: $__language_Array__["e0ee91f3c176b2f99f99eb5c9a09ca51"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["59948654b88359ad153aff5a34b4ada0"],
  width: 78,
  height: 67,
  SunNum: 175,
  BKind: -1,
  PicArr: ["images/Card/Plants/SnowPea.png", "images/Plants/SnowPea/0.gif", "images/Plants/SnowPea/SnowPea.gif", "images/Plants/PBSnow.png", "images/Plants/PeaSBulletHit.gif"],
  AudioArr: ["frozen", "SnowPeaHit1", "SnowPeaHit2", "SnowPeaHit3", "shieldhit", "shieldhit2", "plastichit"],
  Tooltip: $__language_Array__["71e824c6c30056d653d0b6addcba82d5"],
  Produce: $__language_Array__["82b05fa83a6765759533d69c9fb59a9c"],
  NormalAttack: function () {
    PlayAudio($__language_Array__["857e68d2f97e97a18ec7e4aedf7ca14b"]);
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
    oRepeater = InheritO(oPeashooter, {
  EName: "oRepeater",
  CName: $__language_Array__["51c507519d241f0be1d6a3f96e560d8b"],
  width: 73,
  height: 71,
  beAttackedPointR: 53,
  SunNum: 200,
  PicArr: ["images/Card/Plants/Repeater.png", "images/Plants/Repeater/0.gif", "images/Plants/Repeater/Repeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["1cc99d91d5a87a7926394f459b3a52eb"],
  Produce: $__language_Array__["6310a8a34c9a44303c8a58972daabb21"],
  NormalAttack1: oPeashooter.prototype.NormalAttack,
  NormalAttack: function (a) {
    this.NormalAttack1();
    oSym.addTask(15, function (c) {
      var b = $P[c];
      b && b.NormalAttack1();
    }, [this.id]);
  }
}),
    oThreepeater = InheritO(oPeashooter, {
  EName: 'oThreepeater',
  CName: $__language_Array__["1cd85a57f6b19928a3c1b3c84cacb3cb"],
  width: 73,
  height: 80,
  beAttackedPointR: 53,
  SunNum: 325,
  PicArr: ['images/Card/Plants/Threepeater.png', 'images/Plants/Threepeater/0.gif', 'images/Plants/Threepeater/Threepeater.gif', 'images/Plants/PB00.gif', 'images/Plants/PeaBulletHit.gif'],
  AudioArr: ['splat1', 'splat2', 'splat3', 'plastichit', 'shieldhit', 'shieldhit2'],
  Tooltip: $__language_Array__["47b4f11eff5b880c5bca8ec41a92322e"],
  Produce: $__language_Array__["83e5564084e1ef20bfb2ce021c4408eb"],
  getTriggerR: function (R) {
    return [R > 2 ? R - 1 : 1, R < oS.R ? Number(R) + 1 : R];
  },
  //传递行返回触发器行上下限,返回格式是[下限，上限]
  PrivateBirth: function (o) {
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
      o.BulletEle.push(NewImg(0, 'images/Plants/PB00.gif', 'left:' + pixelLeft + 'px;top:' + (GetY(R) - 50) + 'px;visibility:hidden;z-index:' + (3 * R + 2)));
    }
  },
  PrivateDie: function (o) {
    oP.PDiePrgs(o);
    o.BulletEle.length = 0;
  },
  NormalAttack: function () {
    var v,
        o = this,
        id,
        i = 0;

    for (v in o.oTrigger) {
      EditEle(o.BulletEle[i++].cloneNode(false), {
        id: id = 'PB' + Math.random()
      }, 0, EDPZ);
      oSym.addTask(15, function (id) {
        var o = $(id);
        o && SetVisible(o);
      }, [id]);
      oSym.addTask(1, function (id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T) {
        //移动豌豆类子弹
        var side,
            C = GetC(OX),
            Z = oZ['getZ' + D](OX, R);
        Kind == 0 && T[R + '_' + C] && ChangeC != C && ( //冰豌豆和普通豌豆飞过有火炬的格子，且在当前格子中是第一次变化（避免冰豌豆在一个格子就变成火豆）
        PlayAudio('firepea'), Kind = 1, Attack = 40, ChangeC = C, img.src = 'images/Plants/PB' + Kind + D + '.gif');
        Z && Z.Altitude == 1 ? (Z[{
          '-1': 'getSnowPea',
          0: 'getPea',
          1: 'getFirePea'
        }[Kind]](Z, Attack, D), SetStyle(img, {
          left: pixelLeft + 28 + 'px',
          width: '52px',
          height: '46px'
        }).src = 'images/Plants/PeaBulletHit.gif', oSym.addTask(30, ClearChild, [img])) : (OX += side = !D ? 5 : -5) < oS.W && OX > 100 ? (img.style.left = (pixelLeft += side) + 'px', oSym.addTask(1, arguments.callee, [id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T])) : ClearChild(img);
      }, [id, $(id), 20, 0, o.AttackedLX, v, 0, 0, o.AttackedLX - 40, oGd.$Torch]);
    }
  }
}),
    oSplitPea = InheritO(oPeashooter, {
  EName: "oSplitPea",
  CName: $__language_Array__["7832cb94498bf759d0b84045d3042b01"],
  width: 92,
  height: 72,
  beAttackedPointR: 72,
  SunNum: 125,
  PicArr: ["images/Card/Plants/SplitPea.png", "images/Plants/SplitPea/0.gif", "images/Plants/SplitPea/SplitPea.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PeaBulletHit.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["e74ccc44f08a6d1d55de35eac84c49f9"],
  Produce: $__language_Array__["3146da704030076e307608567d69d848"],
  GetDX: function () {
    return -55;
  },
  getShadow: function (a) {
    return "left:5px;top:" + (a.height - 22) + "px";
  },
  getTriggerRange: function (a, b, c) {
    return [[100, b + 25, 1], [b + 26, oS.W, 0]];
  },
  PrivateBirth: function (c) {
    var b = c.PicArr,
        a = "px;top:" + (c.pixelTop + 3) + "px;visibility:hidden;z-index:" + (c.zIndex + 2);
    c.BulletEle = [NewImg(0, b[3], "left:" + (c.AttackedLX - 40) + a), NewImg(0, b[4], "left:" + (c.AttackedRX - 16) + a)], c.aTri = [0, 0];
  },
  PrivateDie: function (a) {
    a.BulletEle.length = 0;
  },
  TriggerCheck: function (b, a) {
    if (this.aTri[a]) {
      return;
    }

    if (this.AttackCheck2(b)) {
      ++this.aTri[a];
      this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
      this.CheckLoop(b.id, a);
    }
  },
  AttackCheck1: function (b, f) {
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
  CheckLoop: function (a, b) {
    this.NormalAttack(b);
    oSym.addTask(140, function (c, e, g) {
      var f;
      (f = $P[c]) && f.AttackCheck1(e, g);
    }, [this.id, a, b]);
  },
  NormalAttack: function (c) {
    var d = this,
        e,
        a = c ? (oSym.addTask(15, function (f) {
      $P[f] && b(1);
    }, [d.id]), d.AttackedRX - 16) : d.AttackedLX - 40,
        b = function () {
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
  CName: $__language_Array__["a541555ef8a19f52cddb00054b1b5765"],
  width: 86,
  height: 71,
  beAttackedPointR: 51,
  SunNum: 200,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/LG_NEWIMG/Card/BagOfCoin.png", "images/ENDLESSPLANTIMG/Coins/0.png", "images/ENDLESSPLANTIMG/Coins/Peashooter.png"],
  Tooltip: $__language_Array__["b14389cd15f7627af681dbbcd0ce23a4"],
  Produce: $__language_Array__["b14389cd15f7627af681dbbcd0ce23a4"]
}),
    oCoi = InheritO(CPlants, {
  EName: "oCoi",
  CName: $__language_Array__["2fc9b34142736d9205a687f29f9f5d0c"],
  width: 86,
  height: 71,
  beAttackedPointR: 51,
  SunNum: 0,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/LG_NEWIMG/Card/BagOfCoin.png", "images/ENDLESSPLANTIMG/Coi/0.png", "images/ENDLESSPLANTIMG/Coi/Peashooter.png"],
  Tooltip: $__language_Array__["ed3e0a62c32a7d6aa9f2ccba483dfdeb"],
  Produce: $__language_Array__["ed3e0a62c32a7d6aa9f2ccba483dfdeb"]
}),
    oNurse = InheritO(CPlants, {
  EName: "oNurse",
  CName: $__language_Array__["b128515e23a40a955e4fec1f3510ff97"],
  width: 73,
  height: 68,
  beAttackedPointR: 53,
  SunNum: 50,
  PicArr: ["images/Card/Plants/SunFlower.png", "images/Plants/SunFlower/0.gif", "images/Plants/SunFlower/SunFlower1.gif", "images/Plants/SunFlower/SunFlower.gif"],
  Tooltip: $__language_Array__["35becabf7b4b05063e8ebfd8bb025a78"],
  Produce: $__language_Array__["59715d75881fe2e647622d46dbe8fc5a"],
  BirthStyle: function (c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/SunFlower/SunFlower.gif";
    d.style.clip = "rect(0,auto,74px,0)";
    d.style.height = "148px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  ChangePosition: function (c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(74px,auto,auto,auto)",
      top: "-74px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,74px,auto)",
      top: 0
    });
  },
  PrivateBirth: function (a) {
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
  InitTrigger: function () {}
}),
    oSunFlower = InheritO(CPlants, {
  EName: "oSunFlower",
  CName: $__language_Array__["b128515e23a40a955e4fec1f3510ff97"],
  width: 73,
  height: 68,
  beAttackedPointR: 53,
  SunNum: 50,
  PicArr: ["images/Card/Plants/SunFlower.png", "images/Plants/Nurse/0.gif", "images/Plants/Nurse/SunFlower1.gif", "images/Plants/Nurse/SunFlower.gif"],
  Tooltip: $__language_Array__["35becabf7b4b05063e8ebfd8bb025a78"],
  Produce: $__language_Array__["59715d75881fe2e647622d46dbe8fc5a"],
  BirthStyle: function (c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/Nurse/SunFlower.gif";
    d.style.clip = "rect(0,auto,74px,0)";
    d.style.height = "148px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  ChangePosition: function (c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(74px,auto,auto,auto)",
      top: "-74px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,74px,auto)",
      top: 0
    });
  },
  PrivateBirth: function (a) {
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
  InitTrigger: function () {}
}),
    oTwinSunflower = InheritO(oSunFlower, {
  EName: "oTwinSunflower",
  CName: $__language_Array__["eb0cc99664d36d75ca04c1d515dd7740"],
  width: 83,
  height: 84,
  beAttackedPointR: 63,
  SunNum: 150,
  coolTime: 50,
  PicArr: ["images/Card/Plants/TwinSunflower.png", "images/Plants/TwinSunflower/0.gif", "images/Plants/TwinSunflower/TwinSunflower1.gif", "images/Plants/TwinSunflower/TwinSunflower.gif"],
  Tooltip: $__language_Array__["6af281839677f89a7e47b34c4d5cd94a"],
  Produce: $__language_Array__["817ca92d3e03db55b6f54f81e6168036"],
  CanGrow: function (b, a, d) {
    var c = b[1];
    return c && c.EName == "oSunFlower";
  },
  BirthStyle: function (c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/TwinSunflower/TwinSunflower.gif";
    d.style.clip = "rect(0,auto,84px,0)";
    d.style.height = "168px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  ChangePosition: function (c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(84px,auto,auto,auto)",
      top: "-84px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,84px,auto)",
      top: 0
    });
  },
  PrivateBirth: function (a) {
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
  CName: $__language_Array__["0ec69ccfce31041ffe76a9ae2b6e2722"],
  width: 72,
  height: 68,
  beAttackedPointR: 52,
  SunNum: 25,
  canEat: 0,
  BookHandBack: 5,
  PicArr: ["images/Card/Plants/FlowerPot.png", "images/Plants/FlowerPot/0.gif", "images/Plants/FlowerPot/FlowerPot.gif"],
  PKind: 0,
  Stature: -1,
  GetDY: function (b, c, a) {
    return -15;
  },
  getShadow: function (a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  Tooltip: $__language_Array__["d7de45bee73ce0558bece1bc3ddddac4"],
  Produce: $__language_Array__["25c0e5f8d58778e6e0c4eb797c125b09"],
  InitTrigger: function () {}
}),
    oLilyPad = InheritO(oFlowerPot, {
  BookHandBack: 4,
  Stature: -1,
  EName: "oLilyPad",
  CName: $__language_Array__["a319f0c0c99814f9ff88d72cb653727d"],
  width: 79,
  height: 40,
  beAttackedPointR: 59,
  PicArr: ["images/Card/Plants/LilyPad.png", "images/Plants/LilyPad/0.png", "images/Plants/LilyPad/LilyPad.png"],
  getShadow: function (a) {
    return "display:none";
  },
  CanGrow: function (c, b, d) {
    var a = b + "_" + d;
    return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a]);
  },
  Tooltip: $__language_Array__["d2ee4eed41cdaf889e30d201b8deafba"],
  Produce: $__language_Array__["cfa8965a4d4a8a35ad6c80d7080f7b67"]
}),
    oMud = InheritO(CPlants, {
  EName: "oMud",
  CName: $__language_Array__["1c10acfe14bfbab8e29b01f296a6b612"],
  width: 155,
  height: 130,
  canShovel: false,
  beAttackedPointR: 52,
  SunNum: 0,
  canEat: 0,
  BookHandBack: 5,
  PicArr: ["images/Card/Plants/Path.png", "images/Zombies/PZombie/ZombieHead.gif", "images/Zombies/PZombie/ZombieHead.gif"],
  Stature: -1,
  GetDY: function (b, c, a) {
    return -15;
  },
  getShadow: function (a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  Tooltip: $__language_Array__["d7de45bee73ce0558bece1bc3ddddac4"],
  Produce: $__language_Array__["25c0e5f8d58778e6e0c4eb797c125b09"],
  InitTrigger: function () {}
}),
    oPotatoMine = InheritO(CPlants, {
  EName: "oPotatoMine",
  CName: $__language_Array__["10feb590e0ec65dc05c9b597775ea4c7"],
  width: 75,
  height: 55,
  beAttackedPointR: 55,
  SunNum: 25,
  coolTime: 30,
  Stature: -1,
  CanGrow: function (d, c, f) {
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
  Tooltip: $__language_Array__["f10363dcb51805668652ba76dad0ae87"],
  Produce: $__language_Array__["8676e15bda06a92faffe5363ddebf411"],
  Status: 0,
  AudioArr: [$__language_Array__["9f22504ec56c33424a2448030171f346"]],
  canTrigger: 0,
  BirthStyle: function (d, e, c, b, a) {
    c.childNodes[1].src = !a ? "images/Plants/PotatoMine/PotatoMineNotReady.gif" : (~function () {
      d.Status = 1;
      d.canTrigger = 1;
      d.getHurt = d.getHurt2;
    }(), "images/Plants/PotatoMine/PotatoMine.gif");
    EditEle(c, {
      id: e
    }, b, EDPZ);
  },
  getHurt2: function (d, b, a) {
    var c = this;
    b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
  },
  PrivateBirth: function (b, a) {
    !a && oSym.addTask(1500, function (d) {
      var c = $P[d];
      c && ($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif", c.Status = 1, c.canTrigger = 1, c.getHurt = c.getHurt2);
    }, [b.id]);
  },
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function (e, c) {
    var a = this.R,
        b = this.C;
    e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
  },
  NormalAttack: function (j, h, e) {
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
    PlayAudio($__language_Array__["9f22504ec56c33424a2448030171f346"]);
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
  CName: $__language_Array__["9e0dee176df59cc27f4222f6ba73ccce"],
  width: 73,
  height: 83,
  beAttackedPointR: 53,
  SunNum: 175,
  PicArr: ["images/Card/Plants/Torchwood.png", "images/Plants/Torchwood/0.gif", "images/Plants/Torchwood/Torchwood.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PB10.gif", "images/Plants/PB11.gif", "images/Plants/Torchwood/SputteringFire.gif"],
  AudioArr: ["firepea", "ignite", "ignite2"],
  Tooltip: $__language_Array__["7489bf58563e9906134f8040dd97a127"],
  Produce: $__language_Array__["19dbada740c75be17fd68b14fac60c32"],
  PrivateBirth: function (c) {
    var a = c.R,
        b = c.C;
    oGd.$Torch[a + "_" + b] = c.id;
    oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0);
  },
  InitTrigger: function () {},
  PrivateDie: function (c) {
    var a = c.R,
        b = c.C;
    delete oGd.$Torch[a + "_" + b];
    oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1);
  }
}),
    oWallNut = InheritO(CPlants, {
  EName: "oWallNut",
  CName: $__language_Array__["26215937c0a639788773cd96e1b6813e"],
  width: 65,
  height: 65,
  beAttackedPointR: 45,
  SunNum: 50,
  HP: 4000,
  coolTime: 30,
  PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/0.gif"],
  Tooltip: $__language_Array__["7883cf47e0add6690a51e97f6adee947"],
  Produce: $__language_Array__["6391f5a0bc2a24419e9036c69d451967"],
  CanGrow: function (c, b, f) {
    var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
    return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oWallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d;
  },
  InitTrigger: function () {},
  HurtStatus: 0,
  getHurt: function (e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/WallNut/0.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/WallNut/0.gif") : c.Die(1);
  }
}),
    oNutBowling = InheritO(CPlants, {
  EName: "oNutBowling",
  CName: $__language_Array__["5c2798e06898f229fec627b5c9b0565d"],
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
  InitTrigger: function () {},
  getHurt: function () {},
  CanGrow: function (d, e, f) {
    return true;
  },
  NormalAttack: null,
  PrivateBirth: function (c) {
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
  CName: $__language_Array__["fa307df498c4299be867b520e18c2749"],
  width: 142,
  height: 142,
  beAttackedPointL: 5,
  beAttackedPointR: 137,
  HP: 8000,
  Stature: 1,
  PicArr: ["images/Card/Plants/HugeWallNut.png", "images/Plants/WallNut/2.gif", "images/Plants/WallNut/HugeWallNutRoll.gif"],
  PrivateBirth: function (a) {
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
  CName: $__language_Array__["3ed0e53b9abd58cd47835ac494634946"],
  PicArr: ["images/Card/Plants/BoomWallNut.png", "images/Plants/WallNut/1.gif", "images/Plants/WallNut/BoomWallNutRoll.gif", "images/Plants/CherryBomb/Boomnut.gif"],
  AudioArr: ["cherrybomb", "bowling"],
  PrivateBirth: function (a) {
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
  CName: $__language_Array__["5a9fefbb056020f7da84e5fe0a8bb49a"],
  width: 83,
  height: 119,
  beAttackedPointR: 63,
  SunNum: 125,
  HP: 8000,
  PicArr: ["images/Card/Plants/TallNut.png", "images/Plants/TallNut/0.gif", "images/Plants/TallNut/TallNut.gif", "images/Plants/TallNut/TallnutCracked1.gif", "images/Plants/TallNut/TallnutCracked2.gif"],
  Tooltip: $__language_Array__["e40b165c28a0dad2324aa0f4490d5017"],
  Produce: $__language_Array__["b23825bcf99a646f081a6a66e43f82fc"],
  CanGrow: function (c, b, f) {
    var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
    return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oTallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d;
  },
  Stature: 1,
  getHurt: function (e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 2667 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/TallNut/TallnutCracked2.gif") : c.HP < 5333 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/TallNut/TallnutCracked1.gif") : c.Die(1);
  }
}),
    oCherryBomb = InheritO(CPlants, {
  EName: "oCherryBomb",
  CName: $__language_Array__["f1cdd46957bde638d1c1cc55fccd4845"],
  width: 112,
  height: 81,
  beAttackedPointR: 92,
  SunNum: 150,
  coolTime: 52.5,
  PicArr: ["images/Card/Plants/ch.png", "images/Plants/CherryBomb/0.gif", "images/Plants/CherryBomb/CherryBomb.gif", "images/Plants/CherryBomb/Boomnut.gif" + $Random],
  AudioArr: ["cherrybomb"],
  Tooltip: $__language_Array__["059fa1a0212f2ab578fe77e0963ffee3"],
  Produce: $__language_Array__["5d7433c90bee0fdcb38b17dccf88f01b"],
  InitTrigger: function () {},
  getHurt: function () {},
  PrivateBirth: function (a) {
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
          src: c.PicArr[3] + Math.random()
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
  CName: $__language_Array__["b76d25c6ab7164d64b21db3df2f7f859"],
  width: 68,
  height: 89,
  coolTime: 52.5,
  SunNum: 125,
  beAttackedPointR: 48,
  PicArr: ["images/Card/Plants/Jalapeno.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
  AudioArr: ["jalapeno"],
  Tooltip: $__language_Array__["a8621c9a9d4e93b498829b85e2ed06f7"],
  Produce: $__language_Array__["ee8f66616064dc72f9abfa63da97d72a"],
  PrivateBirth: function (a) {
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
  CName: $__language_Array__["d05bea444a392cf471da995c5c7d7d46"],
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
  Tooltip: $__language_Array__["59dafb371113528063da50be32c0ac5d"],
  Produce: $__language_Array__["a290e6db1eb8aaf62f5c0f86323f421b"],
  CanGrow: function (c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0]) : !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a]);
  },
  getHurt: function (d, b, a) {
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
  NormalAttack: function (b, a) {
    var c = $Z[b];
    c.getHit2(c, this.Attack, 0);
  },
  GetDY: function (b, c, a) {
    return -2;
  },
  getTriggerRange: function (a, b, c) {
    return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
  },
  TriggerCheck: function (i, h) {
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
  AttackCheck2: function (a) {
    return a.Altitude == 1 && a.beAttacked;
  }
}),
    oSpikerock = InheritO(oSpikeweed, {
  EName: "oSpikerock",
  CName: $__language_Array__["7962edf6f151894c77ab1f920131d033"],
  width: 70,
  SunNum: 250,
  coolTime: 50,
  height: 30,
  beAttackedPointL: 10,
  beAttackedPointR: 74,
  PicArr: ["images/Card/Plants/Spikerock.png", "images/Plants/Spikerock/0.gif", "images/Plants/Spikerock/Spikerock.gif", "images/Plants/Spikerock/2.gif", "images/Plants/Spikerock/3.gif"],
  Attack: 20,
  canEat: 0,
  GetDY: function (b, c, a) {
    return 0;
  },
  GetDX: function () {
    return -45;
  },
  NormalAttack: function (b, a) {
    var c = $Z[b];
    PlayAudio($__language_Array__["005198fd9390d5cefb4d2f5f2dedc783"]);
    c.getPea(c, this.Attack, 0);
  },
  getTriggerRange: function (a, b, c) {
    return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
  },
  TriggerCheck: function (i, h) {
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
  AttackCheck2: function (a) {
    return a.Altitude == 1 && a.beAttacked;
  },
  getHurt: function (f, c, b) {
    var e = this,
        d,
        a = $(e.id).childNodes[1];

    switch (c) {
      case 2:
        f.flatTire();
        break;

      case 1:
        f.getHit2(f, 20, 0);
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
  CName: $__language_Array__["054c7290fda725c6aac6949586395ba7"],
  width: 100,
  height: 226,
  beAttackedPointR: 67,
  SunNum: 50,
  coolTime: 22.5,
  PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
  AudioArr: ["squash_hmm", "gargantuar_thump"],
  Tooltip: $__language_Array__["f495f93bb369f421216ac1827120ac1f"],
  Produce: $__language_Array__["1159959a6dcceb62c173c4ba8aad7cc4"],
  GetDY: function (b, c, a) {
    return a[0] ? -21 : -10;
  },
  getHurt: function (d, b, a) {
    var c = this;
    b != 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die();
  },
  getTriggerRange: function (a, b, c) {
    return [[b - 50, c + 80, 0]];
  },
  TriggerCheck: function (h, g, e) {
    var c = h.ZX,
        b = this.id,
        a = $(b).childNodes[1],
        f = h.isAttacking;
    h.beAttacked && h.Altitude > -1 && h.Altitude < 2 && (f || !f && c - this.AttackedRX < 71) && (PlayAudio("squash_hmm"), oT.$[this.R].splice(e, 1), a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png", oSym.addTask(100, function (d, j, i) {
      var k = $P[d];
      k && k.NormalAttack(k, h.id, i);
    }, [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]));
  },
  NormalAttack: function (d, c, b) {
    var a = $(d.id),
        e = $Z[c];
    e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
    a.childNodes[1].src = "images/Plants/Squash/SquashAttack.gif" + $Random + Math.random();
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
  CName: $__language_Array__["9fd21895a1a6cd65d7f188ccdf8dea60"],
  width: 130,
  height: 135,
  beAttackedPointR: 70,
  SunNum: 150,
  PicArr: ["images/Card/Plants/Chomper.png", "images/Plants/Chomper/0.gif", "images/Plants/Chomper/Chomper.gif", "images/Plants/Chomper/ChomperAttack.gif", "images/Plants/Chomper/ChomperDigest.gif"],
  Tooltip: $__language_Array__["6ac41438a99ac6f66a781d612a4350c3"],
  Produce: $__language_Array__["495ab47aa9aa43fc8d25aa68ef02ec92"],
  GetDX: function () {
    return -68;
  },
  getShadow: function (a) {
    return "top:" + (a.height - 22) + "px";
  },
  getTriggerRange: function (a, b, c) {
    return [[this.pixelLeft, c + 80, 0]];
  },
  TriggerCheck: function (a) {
    this.AttackCheck2(a) && (this.canTrigger = 0, this.NormalAttack(this.id, a.id));
  },
  AttackCheck2: function (a) {
    return a.Altitude == 1 && a.beAttacked;
  },
  NormalAttack: function (a, b) {
    PlayAudio($__language_Array__["7b1e5064692c13e0c15ea9e785cc2c94"]);
    $(a).childNodes[1].src = "images/Plants/Chomper/ChomperAttack.gif" + $Random + Math.random();
    oSym.addTask(60, function (c, d) {
      $P[c] && oSym.addTask(18, function (e, f) {
        var g = $P[e],
            h;
        g && ((h = $Z[f]) && h.beAttacked && h.PZ ? $(e).childNodes[1].src = h.getRaven(e) ? (oSym.addTask(4200, function (i) {
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
  CName: $__language_Array__["dc81f8a277b80798eef32015a4d53768"],
  width: 100,
  height: 88,
  beAttackedPointR: 80,
  SunNum: 175,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/akee.png", "images/Plants/FumeShroom/0.gif", "images/Plants/FumeShroom/FumeShroom.gif", "images/Plants/FumeShroom/FumeShroomSleep.gif", "images/Plants/FumeShroom/FumeShroomAttack.gif", "images/Plants/FumeShroom/FumeShroomBullet.gif"],
  AudioArr: ["AKEE"],
  Tooltip: $__language_Array__["3587705c259cf8c014a8682fb590c708"],
  Produce: $__language_Array__["1637318c2383bfa018a9abf152cd1a01"],
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -60;
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(260, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 330, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["64e635545a5fc682da241566dd23d251"],
  width: 100,
  height: 83,
  beAttackedPointR: 80,
  SunNum: 125,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/shuzi.png", "images/Plants/Shizuki/0.gif", "images/Plants/Shizuki/FumeShroom.gif", "images/Plants/Shizuki/FumeShroomSleep.gif", "images/Plants/Shizuki/FumeShroomAttack.gif", "images/Plants/Shizuki/FumeShroomBullet.gif"],
  AudioArr: ["fumeattack"],
  Tooltip: $__language_Array__["063c84b3074caee525c4cd3fc0517870"],
  Produce: $__language_Array__["e097d0a4903336f70d130be7eb263158"],
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(290, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  GetDX: function () {
    return -60;
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/Shizuki/FumeShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 406, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["4a8476eb6b1fda8b64d767ead2174606"],
  width: 39,
  height: 97,
  beAttackedPointL: 10,
  beAttackedPointR: 29,
  SunNum: 10,
  PKind: 3,
  canEat: 0,
  PicArr: ["images/Card/Plants/A-BAG.png", "images/LG_NEWIMG/PlantIce/0.gif", "images/LG_NEWIMG/PlantIce/IceIdle.png", "images/LG_NEWIMG/PlantIce/IceAttack.gif" + $Random],
  AudioArr: ["coffee", "wakeup"],
  Tooltip: $__language_Array__["7296bdc6f9d0525309c9b12456122d4e"],
  Produce: $__language_Array__["7296bdc6f9d0525309c9b12456122d4e"],
  InitTrigger: function () {},
  GetDBottom: function () {
    return 49;
  },
  GetDY: function () {
    return -30;
  },
  CanGrow: function (a, b) {
    return (b = a[1]) && b.Sleep && !a[3];
  },
  BirthStyle: function (c, d, b, a) {
    b.childNodes[1].src = this.PicArr[3] + Math.random();
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  PrivateBirth: function (a) {
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
  CName: $__language_Array__["04603aac852b953f894ea84d3df35c03"],
  width: 40,
  height: 66,
  beAttackedPointL: 15,
  beAttackedPointR: 25,
  SunNum: 0,
  Stature: -1,
  PicArr: ["images/Card/Plants/PuffShroom.png", "images/Plants/PuffShroom/0.gif", "images/Plants/PuffShroom/PuffShroom.gif", "images/Plants/PuffShroom/PuffShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  AudioArr: ["puff"],
  Tooltip: $__language_Array__["c891a201584864b66af9a756158ece73"],
  Produce: $__language_Array__["11083a114040c905213980cc3c54566e"],
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +35) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -35;
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 250, oS.W), 0]];
  },
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["04603aac852b953f894ea84d3df35c03"],
  width: 40,
  height: 66,
  beAttackedPointL: 15,
  beAttackedPointR: 25,
  SunNum: 0,
  Stature: -1,
  PicArr: ["images/Card/Plants/PuffShroom1.png", "images/Plants/PuffShroom/0.gif", "images/Plants/PuffShroom/PuffShroom.gif", "images/Plants/PuffShroom/PuffShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  AudioArr: ["puff"],
  Tooltip: $__language_Array__["16674fa1648053cc7637026b7793a398"],
  Produce: $__language_Array__["2f0532a5b8d0c9ac98153128a7dbd169"],
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +35) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -35;
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 250, oS.W), 0]];
  },
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["ac2e08ff22aa6901247da86df6c0ff2e"],
  width: 97,
  height: 81,
  beAttackedPointR: 37,
  SunNum: 25,
  HP: 1500,
  Cry: 0,
  ArZ: [],
  Attacking: 0,
  PicArr: ["images/Card/Plants/redstringer.png", "images/Plants/ScaredyShroom/0.gif", "images/Plants/ScaredyShroom/ScaredyShroom.gif", "images/Plants/ScaredyShroom/ScaredyShroomSleep.gif", "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  Tooltip: $__language_Array__["cc7b48d742040196660915cdb2b7b623"],
  Produce: $__language_Array__["2b7da76b0b9db18f606113da067b6380"],
  GetDX: function () {
    return -60;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - 50) + "px;top:" + (a.height - 22) + "px";
  },
  getTriggerRange: CPlants.prototype.getTriggerRange,
  getTriggerR: function (c) {
    var b = this.MinR = c > 2 ? c - 1 : 1,
        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
    return [b, a];
  },
  TriggerCheck: function (e, c) {
    var b = this,
        a = b.id;
    e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked ? (b.ArZ.push(e.id), !b.Cry && (b.Cry = 1, $(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", b.CryCheck(a))) : e.R == b.R && !b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack();
  },
  PrivateBirth: function (c) {
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
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
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
  CryCheck: function (a) {
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
  CName: $__language_Array__["61ff45f431a608355d306904dde087b2"],
  width: 113,
  height: 75,
  beAttackedPointR: 63,
  SunNum: 50,
  coolTime: 1,
  PicArr: ["images/Card/Plants/soni.png", "images/Plants/IceShroom/0.gif", "images/Plants/IceShroom/IceShroom.gif", "images/Plants/IceShroom/IceShroomSleep.gif", "images/Plants/IceShroom/Snow.gif", "images/Plants/IceShroom/icetrap.png"],
  AudioArr: ["onion", "wakeup"],
  Tooltip: $__language_Array__["214af6e536710a57a6083893bb19eb5a"],
  Produce: $__language_Array__["4c6b88f23c6df88b9b09defea2876b8d"],
  GetDX: CPlants.prototype.GetDX,
  GetDY: CPlants.prototype.GetDY,
  InitTrigger: function () {},
  PrivateDie: function (a) {},
  PrivateBirth: function (a) {
    !oS.DKind ? (a.NormalAttack(a.id), a.getHurt = function (d, c, b) {}) : a.getHurt = CPlants.prototype.getHurt;
  },
  WakeUP: function (a) {
    var b = a.id;
    a.Sleep = 0;
    $(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";
    a.NormalAttack(b);
  },
  NormalAttack: function (a) {
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
  CName: $__language_Array__["069500b33dd26203b7411ca501c85ca0"],
  width: 59,
  height: 61,
  beAttackedPointL: 15,
  beAttackedPointR: 44,
  SunNum: 25,
  Stature: -1,
  Status: 0,
  PicArr: ["images/Card/Plants/SunShroom.png", "images/Plants/SunShroom/0.gif", "images/Plants/SunShroom/SunShroom2.gif", "images/Plants/SunShroom/SunShroomSleep.gif", "images/Plants/SunShroom/SunShroom.gif"],
  Tooltip: $__language_Array__["a06df4885f5cae125f020bb560cb950b"],
  Produce: $__language_Array__["635c54f0b02a380d455206f8c344649f"],
  GetDX: CPlants.prototype.GetDX,
  GetDY: CPlants.prototype.GetDY,
  InitTrigger: function () {},
  PrivateDie: function (a) {},
  PrivateBirth: function () {},
  BirthStyle: function (c, d, b, a) {
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
  ProduceSun: function (a, c, b) {
    AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0), oSym.addTask(2400, function (g, f, e) {
      var d = $P[g];
      d && d.ProduceSun(d, f, e);
    }, [a.id, c, b]);
  },
  WakeUP: function (a) {
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
  CName: $__language_Array__["4015fbc3802f1826c48dd5431d72e1f9"],
  width: 140,
  height: 120,
  beAttackedPointR: 80,
  coolTime: 50,
  SunNum: 150,
  PicArr: ["images/Card/Plants/Blower.png", "images/Plants/Blower/0.gif", "images/Plants/Blower/Blower.gif", "images/Plants/Blower/Sleep.gif", "images/Plants/Blower/BeginBoom.gif", "images/Plants/Blower/crater10.png", "images/Plants/Blower/crater11.png", "images/Plants/Blower/crater20.png", "images/Plants/Blower/crater21.png", "images/Plants/Blower/crater30.png", "images/Plants/Blower/crater31.png", "images/Plants/Blower/Boom.png"],
  Tooltip: $__language_Array__["800162c971d90b22e89ba44d7c63d64a"],
  Produce: $__language_Array__["e985f9a770658bb34022a5b9ebbd4705"],
  InitTrigger: function () {},
  BirthStyle: function (c, d, b, a) {
    oS.DKind ? (c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]) : (c.Sleep = 0, c.getHurt = function () {}, b.childNodes[1].src = "images/Plants/Blower/BeginBoom.gif", c.NormalAttack(d));
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  WakeUP: function (a) {
    var b = a.id;
    a.Sleep = 0;

    a.getHurt = function () {};

    $(b).childNodes[1].src = "images/Plants/Blower/BeginBoom.gif";
    a.NormalAttack(b);
  },
  NormalAttack: function (a) {
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
  setCrater: function (f, b, d, e, c) {
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
  CName: $__language_Array__["72e315e0a53cd82b16d4589b1dcf09f5"],
  width: 90,
  height: 72,
  beAttackedPointL: 15,
  beAttackedPointR: 80,
  coolTime: 30,
  SunNum: 25,
  BookHandBack: 4,
  GetDY: function (b, c, a) {
    return 5;
  },
  NormalGif: 1,
  PicArr: ["images/Card/Plants/tk.png", "images/Plants/TangleKlep/0.gif", "images/Plants/TangleKlep/Float.gif", "images/Plants/TangleKlep/Grab.gif", "images/interface/splash.png"],
  Tooltip: $__language_Array__["7ab9a916213f78a9dc800dcccfc38359"],
  Produce: $__language_Array__["ca0aeb1ba67f1870334f27b58e718a70"],
  CanGrow: function (c, b, d) {
    var a = b + "_" + d;
    return !(oGd.$LF[b] != 2 || d < 1 || d > 9 || oGd.$Crater[a] || c[0] || c[1]);
  },
  getShadow: function (a) {
    return "display:none";
  },
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  BirthStyle: function (c, d, b, a) {
    b.childNodes[1].src = "images/Plants/TangleKlep/Float.gif";
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  getHurt: function (d, b, a) {
    var c = this;
    b == 3 ? (c.HP -= a) < 1 && c.Die() : (c.canTrigger = 0, c.NormalAttack(c, d));
  },
  TriggerCheck: function (b, a) {
    b.AttackedLX < GetX(9) && b.beAttacked && (this.canTrigger = 0, this.NormalAttack(this, b));
  },
  NormalAttack: function (a, b) {
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
  CName: $__language_Array__["f2fffae6f37ef814400c279bc1c0c49c"],
  width: 48,
  height: 99,
  beAttackedPointL: 10,
  beAttackedPointR: 40,
  coolTime: 0,
  BookHandBack: 3,
  PicArr: ["images/Card/Plants/SeaShroom.png", "images/Plants/SeaShroom/0.gif", "images/Plants/SeaShroom/SeaShroom.gif", "images/Plants/SeaShroom/SeaShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  CanGrow: function (c, b, d) {
    var a = b + "_" + d;
    return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a]);
  },
  Tooltip: $__language_Array__["99e8dd2e076fbf20814ad1c302547857"],
  Produce: $__language_Array__["241add261f6e4579f7449fba81e76331"]
}),
    oRoseMan = InheritO(CPlants, {
  EName: "oRoseMan",
  CName: $__language_Array__["ce8dc264144ec69adec8a39ca11abfd8"],
  width: 100,
  height: 75,
  beAttackedPointR: 80,
  SunNum: 150,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/LG_NEWIMG/Card/RoseMan_Compressed.png", "images/LG_NEWIMG/PlantRoseMan/0.gif", "images/LG_NEWIMG/PlantRoseMan/1.gif", "images/LG_NEWIMG/PlantRoseMan/4.gif", "images/LG_NEWIMG/PlantRoseMan/2.gif", "images/LG_NEWIMG/PlantRoseMan/3.gif"],
  AudioArr: ["RoseMan"],
  Tooltip: $__language_Array__["fb1044406567610cd81b75b15968a50c"],
  Produce: $__language_Array__["958767beaa1866bebe30ee699c7033a6"],
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -45;
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/LG_NEWIMG/PlantRoseMan/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 160, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["864baae89b5b3a9e5060c9c1d28d66f1"],
  width: 100,
  height: 75,
  beAttackedPointR: 80,
  SunNum: 125,
  BookHandBack: 2,
  SleepGif: 3,
  AudioArr: ["snaplong"],
  PicArr: ["images/LG_NEWIMG/Card/Bonkchoy.png", "images/LG_NEWIMG/PlantBonkChoy/0.gif", "images/LG_NEWIMG/PlantBonkChoy/1.gif", "images/LG_NEWIMG/PlantBonkChoy/4.gif", "images/LG_NEWIMG/PlantBonkChoy/2.gif", "images/LG_NEWIMG/PlantBonkChoy/3.gif"],
  Tooltip: $__language_Array__["e3a1c2e5e1b2b5f66e7270ac7f11d127"],
  Produce: $__language_Array__["d5aa1cf396fb091d22053914d6519c44"],
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -+65;
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(140, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/LG_NEWIMG/PlantBonkChoy/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 240, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["d1497bf1025f16360e42a98e5fc275f3"],
  width: 83,
  height: 93,
  beAttackedPointR: 63,
  SunNum: 125,
  HP: 3000,
  PicArr: ["images/LG_NEWIMG/Card/BB.png", "images/ENDLESSPLANTIMG/BambooBrother/0.gif", "images/ENDLESSPLANTIMG/BambooBrother/TallNut.gif", "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked1.gif", "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked2.gif"],
  Tooltip: $__language_Array__["aa5a5d79758af22fe2e459c909f07435"],
  Produce: $__language_Array__["0e7816943054bbeacdcd93249c4e5a25"],
  GetDX: function () {
    return -68;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  CanGrow: function (c, b, f) {
    var a = b + "_" + f,
        d = c[1],
        e = oS.ArP;
    return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oTallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d;
  },
  Stature: 1,
  getHurt: function (e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 333 ? c.HurtStatus < 3 && (c.HurtStatus = 3, d.src = "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked3.gif") : c.HP < 999 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked2.gif") : c.HP < 2999 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked1.gif") : c.Die(1);
  }
}),
    oLavaGrava = InheritO(CPlants, {
  EName: "oLavaGrava",
  CName: $__language_Array__["f1cdd46957bde638d1c1cc55fccd4845"],
  width: 129,
  height: 138,
  beAttackedPointR: 92,
  SunNum: 150,
  coolTime: 35,
  PicArr: ["images/Card/Plants/lavagrava.png", "images/Plants/LAVAGRAVA/0.gif", "images/Plants/LAVAGRAVA/CherryBomb.gif", "images/Plants/LAVAGRAVA/Boomnut.gif" + $Random],
  AudioArr: ["lavagrava"],
  Tooltip: $__language_Array__["cd7c76400ae1bfc323f4b50d8ab751dd"],
  Produce: $__language_Array__["a6e4ed31c834cc5ef00f27241cfa1537"],
  InitTrigger: function () {},
  getHurt: function () {},
  CanGrow: function (c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1];
  },
  PrivateBirth: function (a) {
    oSym.addTask(70, function (b) {
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
        EditEle(f.childNodes[1], {
          src: c.PicArr[3] + Math.random()
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
  CName: $__language_Array__["976c7ed2648733c008cbaf7ba33e9a7b"],
  width: 113,
  height: 85,
  beAttackedPointR: 63,
  SunNum: 0,
  coolTime: 20,
  PicArr: ["images/Card/Plants/soni.png", "images/Plants/Stallia/0.gif", "images/Plants/Stallia/IceShroom.gif", "images/Plants/Stallia/IceShroomSleep.gif", "images/Plants/Stallia/Snow.gif", "images/Plants/Stallia/icetrap.png"],
  AudioArr: ["stallia", "wakeup"],
  Tooltip: $__language_Array__["908cb24125ec96d0f23a201ca69a3991"],
  Produce: $__language_Array__["a3c0db0e9f88a456dda64ab2d7f4e3ff"],
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +50) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -60;
  },
  GetDY: CPlants.prototype.GetDY,
  InitTrigger: function () {},
  PrivateDie: function (a) {},
  PrivateBirth: function (a) {
    a.NormalAttack(a.id);

    a.getHurt = function (d, c, b) {}; //! oS.DKind ? (a.NormalAttack(a.id), a.getHurt = function(d, c, b) {}) : a.getHurt = CPlants.prototype.getHurt

  },
  WakeUP: function (a) {
    var b = a.id;
    a.Sleep = 0;
    $(b).childNodes[1].src = "images/Plants/Stallia/IceShroom.gif";
    a.NormalAttack(b);
  },
  NormalAttack: function (a) {
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
  CName: $__language_Array__["6e9392781c7968035dee20bf0a63e96d"],
  HP: 1000,
  width: 81,
  height: 92,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Bamboo/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB05.gif", "images/Plants/BambooBulletHit.gif"],
  Tooltip: $__language_Array__["1918cbc5592d9cfbd9108d9bb73a56d4"],
  Produce: $__language_Array__["a8760ac383e2d081109f0bca096d4ce3"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
    PlayAudio($__language_Array__["c9faf300f2592481cb03c55201f37daf"]);
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
  CName: $__language_Array__["e91119f5d49a1e3b2331fdc97d465e2a"],
  HP: 1500,
  width: 81,
  height: 110,
  SunNum: 175,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/BBB.png", "images/Plants/Bamboo/0.gif", "images/Plants/Bamboo/Peashooter.gif", "images/Plants/PB05.gif", "images/Plants/BambooBulletHit.gif"],
  Tooltip: $__language_Array__["1918cbc5592d9cfbd9108d9bb73a56d4"],
  Produce: $__language_Array__["e41e7f756b7d81ededcb18f4b54fe2b3"],
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -68;
  },
  NormalAttack1: oBamboo1.prototype.NormalAttack,
  NormalAttack: function (a) {
    this.NormalAttack1();
    oSym.addTask(15, function (c) {
      var b = $P[c];
      b && b.NormalAttack1();
    }, [this.id]);
  }
}),
    oCGTree = InheritO(CPlants, {
  EName: "oCGTree",
  CName: $__language_Array__["cfba0946030b599ea9f8a78bd9fdce50"],
  width: 80,
  height: 224,
  beAttackedPointR: 80,
  SunNum: 75,
  cooltime: 13,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/CGTree.png", "images/Plants/CGTree/0.gif", "images/Plants/CGTree/LaserPea.gif", "images/Plants/CGTree/LaserPeaSleep.gif", "images/Plants/CGTree/LaserPeaAttack.gif", "images/Plants/CGTree/LaserPeaBullet.gif"],
  AudioArr: ["fengshuzhi"],
  Tooltip: $__language_Array__["0275e15120cb5c4bbf2170ee0abfe0dc"],
  Produce: $__language_Array__["20e3a3b8a5cb9f029f13c5f9a2017ca2"],
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(500, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -68;
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/CGTree/LaserPeaBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 686, oS.W), 0]];
  },
  NormalAttack: function () {
    PlayAudio("fengshuzhi");
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 78);
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
  EName: 'oLotus',
  CName: $__language_Array__["42a533cb5f17bae83d44eddb46014350"],
  width: 73,
  height: 100,
  beAttackedPointR: 53,
  SunNum: 125,
  cooltime: 20,
  PicArr: ['images/Card/Plants/Threepeater.png', 'images/Plants/Threepeater/0.gif', 'images/Plants/Threepeater/Threepeater.gif', 'images/Plants/PB08.gif', 'images/Plants/lotusBulletHit.gif'],
  AudioArr: ['splat1', 'splat2', 'splat3', 'plastichit', 'shieldhit', 'shieldhit2'],
  Tooltip: $__language_Array__["5c15130c1a83cbb44545171d66f62bc1"],
  Produce: $__language_Array__["f725ed82053ab777de1565bc99730078"],
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(180, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -80;
  },
  getTriggerR: function (R) {
    return [R > 2 ? R - 1 : 1, R < oS.R ? Number(R) + 1 : R];
  },
  //传递行返回触发器行上下限,返回格式是[下限，上限]
  PrivateBirth: function (o) {
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
      o.BulletEle.push(NewImg(0, 'images/Plants/PB08.gif', 'left:' + pixelLeft + 'px;top:' + (GetY(R) - 50) + 'px;visibility:hidden;z-index:' + (3 * R + 2)));
    }
  },
  PrivateDie: function (a) {},
  NormalAttack: function () {
    PlayAudio($__language_Array__["857e68d2f97e97a18ec7e4aedf7ca14b"]);
    var v,
        o = this,
        id,
        i = 0;

    for (v in o.oTrigger) {
      EditEle(o.BulletEle[i++].cloneNode(false), {
        id: id = 'PB' + Math.random()
      }, 0, EDPZ);
      oSym.addTask(15, function (id) {
        var o = $(id);
        o && SetVisible(o);
      }, [id]);
      oSym.addTask(1, function (id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T) {
        //移动豌豆类子弹
        var side,
            C = GetC(OX),
            Z = oZ['getZ' + D](OX, R);
        Kind == 0 && T[R + '_' + C] && ChangeC != C && ( //冰豌豆和普通豌豆飞过有火炬的格子，且在当前格子中是第一次变化（避免冰豌豆在一个格子就变成火豆）
        PlayAudio('firepea'), Kind = 1, Attack = 40, ChangeC = C, img.src = 'images/Plants/PB08.gif');
        Z && Z.Altitude == 1 ? (Z[{
          '-1': 'getSnowPea',
          0: 'getPea',
          1: 'getFirePea'
        }[Kind]](Z, Attack, D), SetStyle(img, {
          left: pixelLeft + 28 + 'px',
          width: '52px',
          height: '46px'
        }).src = 'images/Plants/lotusBulletHit.gif', oSym.addTask(30, ClearChild, [img])) : (OX += side = !D ? 5 : -5) < oS.W && OX > 100 ? (img.style.left = (pixelLeft += side) + 'px', oSym.addTask(1, arguments.callee, [id, img, Attack, D, OX, R, Kind, ChangeC, pixelLeft, T])) : ClearChild(img);
      }, [id, $(id), 40, 0, o.AttackedLX, v, 0, 0, o.AttackedLX - 40, oGd.$Torch]);
    }
  }
}),
    oPlantern = InheritO(CPlants, {
  EName: "oPlantern",
  CName: $__language_Array__["70a90ef6d55b87144dce7b5d09ba37ae"],
  width: 250,
  height: 242,
  beAttackedPointL: 105,
  beAttackedPointR: 145,
  canEat: 0,
  coolTime: 7.5,
  BookHandBack: 2,
  SunNum: 50,
  PicArr: ["images/Card/Plants/Plantern.png", "images/xiyoures/Plantern/0.gif", "images/xiyoures/Plantern/Plantern.gif", "images/xiyoures/Plantern/light.gif"],
  Tooltip: $__language_Array__["78d77e911d08bf73941466365e991652"],
  Produce: $__language_Array__["ad70c3ec4d0ce2421fd2a7a44027ccf6"],
  PrivateBirth: function (c) {
    var a = c.R,
        b = c.C;
    oGd.$Plantern[a + "_" + b] = c.id;
    NewImg("", "images/xiyoures/Plantern/light.gif", "filter:alpha(opacity=30);opacity:.3;left:0;top:0;z-index:" + c.zIndex, $(c.id));
    oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 0);
  },
  InitTrigger: function () {},
  PrivateDie: function (c) {
    var a = c.R,
        b = c.C;
    delete oGd.$Plantern[a + "_" + b];
    oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 1);
  },
  GetDY: function (b, c, a) {
    return a[0] ? 70 : 74;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - 43) + "px;top:" + (a.height - 100) + "px";
  }
}),
    oCactus = InheritO(CPlants, {
  EName: "oCactus",
  CName: $__language_Array__["94cd971b55614090d84387c034b3469d"],
  width: 122,
  height: 150,
  SunNum: 125,
  beAttackedPointL: 10,
  beAttackedPointR: 80,
  AudioArr: ["plantgrow"],
  Status: 0,
  PicArr: function () {
    return ["images/xiyoures/Card/Cactus.png", "images/xiyoures/Cactus/0.gif", "images/xiyoures/Cactus/Cactus.gif", "images/xiyoures/Cactus/Cactus2.gif", "images/xiyoures/Cactus/Attack.gif", "images/xiyoures/Cactus/Attack2.gif", "images/xiyoures/Cactus/Elongation.gif", "images/xiyoures/Cactus/Shorten.gif", "images/xiyoures/Cactus/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png"];
  }(),
  GetDX: function () {
    return -58;
  },
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  Tooltip: $__language_Array__["6bc444c090a26f54474768a59ad05b91"],
  Produce: $__language_Array__["04f7c4abdd3c5360020d1904009a768c"],
  PrivateBirth: function (a) {
    a.ES = a.Elongation;
  },
  TriggerCheck: function (b, a) {
    this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status == 0 && oSym.addTask(140, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CheckLoop2: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status && oSym.addTask(150, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function (g, f) {
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
  AttackCheck12: function (a, c) {
    var b = this;
    b.CheckLoop(a, c);
  },
  Elongation: function () {
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
  Shorten: function () {
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
  NormalAttack: function () {
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/xiyoures/Cactus/Attack.gif";
    oSym.addTask(40, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/xiyoures/Cactus/Cactus.gif");
    }, [a]);
    PlayAudio($__language_Array__["75241ccfa1eda52ae031a3abac98eebb"]);
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
  NormalAttack2: function () {
    var b = this,
        c = "CB" + Math.random(),
        a = b.id;
    $(a).childNodes[1].src = "images/xiyoures/Cactus/Attack2.gif";
    oSym.addTask(50, function (e) {
      var d = $(e);
      d && (d.childNodes[1].src = "images/xiyoures/Cactus/Cactus2.gif");
    }, [a]);
    PlayAudio($__language_Array__["75241ccfa1eda52ae031a3abac98eebb"]);
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
  CName: $__language_Array__["e8643f356964467e65a759b6129916ed"],
  HP: 500,
  width: 88,
  height: 75,
  beAttackedPointR: 68,
  SunNum: 150,
  coolTime: 7.5,
  PicArr: ["images/Card/Plants/GloomShroom.png", "images/xiyoures/GloomShroom/0.gif", "images/xiyoures/GloomShroom/GloomShroom.gif", "images/xiyoures/GloomShroom/GloomShroomSleep.gif", "images/xiyoures/GloomShroom/GloomShroomAttack.gif", "images/xiyoures/GloomShroom/GloomShroomBullet.gif"],
  AudioArr: ["fatbeet"],
  Tooltip: $__language_Array__["4ca7ca09aa8d36e14047854ec7cd9ccd"],
  Produce: $__language_Array__["a7d38e3b026688e481cfeccd136c376c"],
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +30) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -58;
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/xiyoures/GloomShroom/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (c, d, e) {
    var f = GetX(this.C),
        b = this.MinX = f - 120,
        a = this.MaxX = f + 120;
    return [[b, a, 0]];
  },
  getTriggerR: function (c) {
    var b = this.MinR = c > 2 ? c - 1 : 1,
        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
    return [b, a];
  },
  NormalAttack: function () {
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

      for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 45)) {}
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
  CName: $__language_Array__["a3ed31762fbb6b8a66b0ec03ce31dd9f"],
  width: 122,
  height: 150,
  SunNum: 150,
  coolTime: 40.5,
  beAttackedPointL: 10,
  beAttackedPointR: 80,
  AudioArr: ["plantgrow"],
  Status: 0,
  PicArr: function () {
    return ["images/LG_NEWIMG/Card/blueberry.png", "images/xiyoures/BlueBerry/0.gif", "images/xiyoures/BlueBerry/Cactus.gif", "images/xiyoures/BlueBerry/Cactus.gif", "images/xiyoures/BlueBerry/Attack.gif", "images/xiyoures/BlueBerry/Attack.gif", "images/xiyoures/BlueBerry/Cactus.gif", "images/xiyoures/BlueBerry/Cactus.gif", "images/xiyoures/BlueBerry/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png"];
  }(),
  Tooltip: $__language_Array__["017775d0fc44d9c4e48c65ee909f270f"],
  Produce: $__language_Array__["5ee71f732bd5eee5fe41134d52a7acf4"],
  getShadow: function (a) {
    return "left:3px;top:132px";
  },
  PrivateBirth: function (a) {
    a.ES = a.Elongation;
  },
  TriggerCheck: function (b, a) {
    this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status == 0 && oSym.addTask(1250, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CheckLoop2: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status && oSym.addTask(2250, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function (g, f) {
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
  AttackCheck12: function (a, c) {
    var b = this;
    b.CheckLoop(a, c);
  },
  Elongation: function () {
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
  Shorten: function () {
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
  NormalAttack: function () {
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
      e && e.Altitude == 1 ? (e.getberry(e, 9999999, d), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  },
  NormalAttack2: function () {
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
      e && e.Altitude == 3 ? (e.getberry(e, 9999999, d), e.Drop(), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i);
    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40]);
  }
}),
    oOxygen = InheritO(CPlants, {
  EName: "oOxygen",
  CName: $__language_Array__["6d6ba7c25fafbe2feb4290b53669909d"],
  width: 82,
  height: 103,
  beAttackedPointR: 45,
  SunNum: 25,
  HP: 300,
  coolTime: 7.5,
  PicArr: ["images/LG_NEWIMG/Card/Oxygen_Compressed.png", "images/LG_NEWIMG/PlantOxygen/0.gif", "images/LG_NEWIMG/PlantOxygen/Oxygen.gif"],
  Tooltip: $__language_Array__["bbeb66cffd10ae6f1c1ec3efccf6a6da"],
  Produce: $__language_Array__["e08e8ba249acfbbe3218e116e34a4d92"],
  CanGrow: function (b, a, d) {
    return oGd.$LF[a] == 3 && !(d < 1 || d > 9 || b[1] || oGd.$Crater[a + '_' + d]);
  },
  Birth: function (d, c, h, a, m, n) {
    PlayAudio("oxygen");
    var e = this,
        k = d + e.GetDX(),
        i = c + e.GetDY(h, a, m),
        l = e.prototype,
        g = i - e.height,
        b = e.id = "P_" + Math.random(),
        j = e.zIndex += 3 * h,
        f = NewEle(0, "div", "position:absolute");
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
  NormalAttack: function () {},
  PrivateBirth: function (a) {
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
            rc = R1 + '_' + C1 + '_';
            !(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oFlowerPot, R1, C1);
          }
        }
      }
    }
  }
}),
    oThunderPine = InheritO(CPlants, {
  EName: "oThunderPine",
  CName: $__language_Array__["4c24137659d65afa0de1dd6f2c4c7dfd"],
  width: 108,
  height: 102,
  beAttackedPointR: 53,
  SunNum: 175,
  PicArr: ["images/LG_NEWIMG/Card/ThunderPine_Compressed.png", "images/LG_NEWIMG/PlantThunderPine/0.gif", "images/LG_NEWIMG/PlantThunderPine/ThunderPine.gif", "images/LG_NEWIMG/PB02.png", "images/LG_NEWIMG/PB02.png", "images/LG_NEWIMG/PB03.gif", "images/LG_NEWIMG/PB03.gif", "images/Plants/Torchwood/SputteringFire.gif"],
  AudioArr: ["firepea", "ignite", "ignite2"],
  Tooltip: $__language_Array__["d858effd536e0d19dfed0d7b8ea3fa8d"],
  Produce: $__language_Array__["17ff7029e70fc00dc296d2e2a9b2184d"],
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  PrivateBirth: function (c) {
    var a = c.R,
        b = c.C;
    oGd.$Pine[a + "_" + b] = c.id;
  },
  InitTrigger: function () {},
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["ca9257359a5c03ab8fb6725c530d30f2"],
  width: 139,
  height: 130,
  beAttackedPointR: 40,
  SunNum: 75,
  HP: 200,
  PicArr: ["images/LG_NEWIMG/Card/garlic.png", "images/ENDLESSPLANTIMG/PlantGarlic/0.gif", "images/ENDLESSPLANTIMG/PlantGarlic/Garlic.gif", "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body1.gif", "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body2.gif"],
  Tooltip: $__language_Array__["681a2bb880a21025b25b49db2cbe5f84"],
  Produce: $__language_Array__["be738452b1012afae349f75238561f63"],
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - 70) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -50;
  },
  InitTrigger: function () {},
  HurtStatus: 0,
  getHurt: function (e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= 20) < 1 ? c.Die() : (e.ChangeR({
      R: c.R
    }), c.HP < 34 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body2.gif") : c.HP < 167 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body1.gif")) : c.Die(1);
  }
}),
    oBubbleFlower = InheritO(CPlants, {
  EName: "oBubbleFlower",
  CName: $__language_Array__["d9eacd6b4c967c7b753815e2d8575d38"],
  width: 71,
  height: 80,
  PKind: 0,
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/LG_NEWIMG/Card/BubbleFlower_Compressed .png", "images/LG_NEWIMG/PlantBubbleFlower/0.gif", "images/LG_NEWIMG/PlantBubbleFlower/BubbleFlower.gif", "images/LG_NEWIMG/PB02.png", "images/LG_NEWIMG/PBBS.gif"],
  Tooltip: $__language_Array__["79ee9000defd4f8e7433e3feac38c17c"],
  Produce: $__language_Array__["38cc8469e0e5e98e0df1185330d4304e"],
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(150, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
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
      }[m]](d, h, c), d.AttackedLX += 10, d.AttackedRX += 10, d.ZX += 10, d.X += 10, //SetStyle($(d.id),left:d.X+'px'),
      $(d.id).style.left = d.X + 'px', SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/LG_NEWIMG/PBBS.gif", oSym.addTask(15, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 10, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Pine]);
  }
}),
    oLitchi = InheritO(oCherryBomb, {
  EName: "oLitchi",
  CName: $__language_Array__["c145b071ac40c1217ce23ff964c8b5cd"],
  width: 68,
  height: 78,
  PKind: 0,
  beAttackedPointR: 48,
  coolTime: 20,
  PicArr: ["images/LG_NEWIMG/Card/Litchi_Compressed.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
  AudioArr: ["jalapeno"],
  Tooltip: $__language_Array__["b3e9408bf9ac8968a1d8e2fe85328f39"],
  Produce: $__language_Array__["7ac75b7e5a834d72f1d6bf770e414666"],
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  GetDX: function () {
    return -68;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  PrivateBirth: function (a) {
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
  CName: $__language_Array__["2e5ada48eabc41b26b31170f21da4f60"],
  width: 71,
  height: 70,
  beAttackedPointL: 10,
  beAttackedPointR: 61,
  SunNum: 100,
  coolTime: 30,
  PicArr: ["images/LG_NEWIMG/Card/hypno.png", "images/Plants/HypnoShroom/0.gif", "images/Plants/HypnoShroom/HypnoShroom.gif", "images/Plants/HypnoShroom/HypnoShroomSleep.gif"],
  Tooltip: $__language_Array__["00496919ae6a9b2008107972bddbbd64"],
  Produce: $__language_Array__["cabb75cc241ba066e819477c399573a3"],
  InitTrigger: function () {},
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - 45) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -40;
  },
  getHurt: function (d, b, a) {
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
  CName: $__language_Array__["054c7290fda725c6aac6949586395ba7"],
  width: 100,
  height: 210,
  beAttackedPointR: 67,
  SunNum: 50,
  coolTime: 35,
  PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
  AudioArr: ["squash_hmm", "gargantuar_thump"],
  Tooltip: $__language_Array__["f495f93bb369f421216ac1827120ac1f"],
  Produce: $__language_Array__["1159959a6dcceb62c173c4ba8aad7cc4"],
  GetDX: function () {
    return -55;
  },
  GetDY: function (b, c, a) {
    return a[0] ? -21 : -10;
  },
  getHurt: function (d, b, a) {
    var c = this;
    b != 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die();
  },
  getTriggerRange: function (a, b, c) {
    return [[b - 50, c + 80, 0]];
  },
  TriggerCheck: function (h, g, e) {
    var c = h.ZX,
        b = this.id,
        a = $(b).childNodes[1],
        f = h.isAttacking;
    h.beAttacked && h.Altitude > -1 && h.Altitude < 2 && (f || !f && c - this.AttackedRX < 71) && (PlayAudio("squash_hmm"), oT.$[this.R].splice(e, 1), a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png", oSym.addTask(100, function (d, j, i) {
      var k = $P[d];
      k && k.NormalAttack(k, h.id, i);
    }, [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]));
  },
  NormalAttack: function (d, c, b) {
    var a = $(d.id),
        e = $Z[c];
    e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
    a.childNodes[1].src = "images/Plants/Squash/SquashAttack.gif" + $Random + Math.random();
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
  CName: $__language_Array__["e4c71e200c2492b2c2117b8d1f6ceee8"],
  width: 68,
  height: 100,
  PKind: 0,
  beAttackedPointR: 48,
  coolTime: 15,
  PicArr: ["images/LG_NEWIMG/Card/PlantStarFish_Compressed.png", "images/Plants/Shuilei/0.gif", "images/Plants/Shuilei/Jalapeno.gif", "images/Plants/Shuilei/JalapenoAttack.gif"],
  AudioArr: ["jalapeno"],
  Tooltip: $__language_Array__["60b9de2425491c8ccf969a846519b3b3"],
  Produce: $__language_Array__["921246bf596d44100fba643467ec0387"],
  CanGrow: function (c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 3 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1];
  },
  GetDX: function () {
    return -68;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  PrivateBirth: function (a) {
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
          if (c[e].EName == 'oSeaConch' || c[e].EName == 'oSeaGui') {
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
  CName: $__language_Array__["75bf4e4cd9e7d9e922121187237c7ee1"],
  width: 71,
  height: 80,
  beAttackedPointR: 51,
  SunNum: 175,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/PrimnalPea.png", "images/Plants/PrimnalPea/0.gif", "images/Plants/PrimnalPea/PrimnalPea.gif", "images/Plants/PB02.png", "images/Plants/PBBS.gif"],
  Tooltip: $__language_Array__["120e0281e668f99474673f16f88320ed"],
  Produce: $__language_Array__["3f0bd6df3d3104ec468d77f5bad1ab78"],
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(300, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CanGrow: function (c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1];
  },
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
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
      }[m]](d, h, c), d.AttackedLX += 30, d.AttackedRX += 30, d.ZX += 30, d.X += 30, //SetStyle($(d.id),left:d.X+'px'),
      $(d.id).style.left = d.X + 'px', SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/Plants/PBBS.gif", oSym.addTask(40, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 40, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Pine]);
  }
}),
    oDinoCleaner = InheritO(CPlants, {
  EName: "oDinoCleaner",
  CName: $__language_Array__["99d9fe273cb408f5790bfb9bcf3508b6"],
  width: 71,
  height: 61,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/interface/DinoLawn.png"],
  AudioArr: ["lawnmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function (b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  getShadow: function (a) {
    return "display:none";
  },
  GetDX: function () {
    return -68;
  },
  BoomDie: function () {},
  Tooltip: $__language_Array__["8ca703251c2247568ede396e711d0902"],
  NormalAttack: function (a) {
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
  CName: $__language_Array__["6e7341d16f600afd2fbd1ae021b9d752"],
  width: 71,
  height: 61,
  beAttackedPointL: 0,
  beAttackedPointR: 71,
  SunNum: 0,
  PicArr: ["images/interface/Futureer.png"],
  AudioArr: ["lawnmower"],
  NormalGif: 0,
  canEat: 0,
  Stature: 1,
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function (b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  getShadow: function (a) {
    return "display:none";
  },
  GetDX: function () {
    return -68;
  },
  BoomDie: function () {},
  Tooltip: $__language_Array__["8ca703251c2247568ede396e711d0902"],
  NormalAttack: function (a) {
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
  CName: $__language_Array__["7f6c5650860037d5c314c02376ccd808"],
  width: 65,
  height: 100,
  beAttackedPointR: 45,
  SunNum: 75,
  HP: 3000,
  coolTime: 7.5,
  PicArr: ["images/Card/Plants/PrimnalNut.png", "images/Plants/PrimnalNut/0.gif", "images/Plants/PrimnalNut/WallNut.gif", "images/Plants/PrimnalNut/Wallnut_cracked1.gif", "images/Plants/PrimnalNut/Wallnut_cracked2.gif"],
  Tooltip: $__language_Array__["5502582045a92a1f932d11f3b2ba19de"],
  Produce: $__language_Array__["d613cfd488ab3d8dea14835845ce8e79"],
  GetDX: function () {
    return -68;
  },
  getShadow: function (a) {
    return "display:none";
  },
  InitTrigger: function () {},
  HurtStatus: 0,
  getHurt: function (e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/PrimnalNut/Wallnut_cracked2.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/PrimnalNut/Wallnut_cracked1.gif") : c.Die(1);
  }
}),
    oPrimnalNutBowling = InheritO(CPlants, {
  EName: "oPrimnalNutBowling",
  CName: $__language_Array__["c4a4a04ca56462806a45a1b76099f4fb"],
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
  InitTrigger: function () {},
  getHurt: function () {},
  CanGrow: function (d, e, f) {
    return true;
  },
  GetDX: function () {
    return -68;
  },
  getShadow: function (a) {
    return "display:none";
  },
  NormalAttack: null,
  PrivateBirth: function (c) {
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
  CName: $__language_Array__["aa656559cf91f56b39dbce8f691b4c48"],
  width: 112,
  height: 130,
  beAttackedPointR: 92,
  SunNum: 225,
  coolTime: 7.5,
  PicArr: ["images/Card/Plants/Shrubbery.png", "images/Plants/Shrubbery/0.gif", "images/Plants/Shrubbery/Shrubbery.gif", "images/Plants/Shrubbery/ShrubberyBoom.gif" + $Random],
  Tooltip: $__language_Array__["c90feb9a512168371bd18130fa927953"],
  Produce: $__language_Array__["25df0327f2be24fbbc4f1ce0a21f65bf"],
  InitTrigger: function () {},
  getHurt: function () {},
  getShadow: function (a) {
    return "display:none";
  },
  GetDX: function () {
    return -100;
  },
  PrivateBirth: function (a) {
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
          if (c[e].EName == 'oSeaConch' || c[e].EName == 'oSeaGui' || c[e].EName == 'oConeheadZombie' || c[e].EName == 'oBucketheadZombie' || c[e].EName == 'oDinoConeheadZombie' || c[e].EName == 'oDinoBucketheadZombie' || c[e].EName == 'oDinoTombZombie') {
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
  CName: $__language_Array__["1de4db9e08c88afb58df9147486d3e05"],
  width: 100,
  height: 100,
  beAttackedPointR: 80,
  SunNum: 200,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/Coldnap.png", "images/Plants/Coldnap/0.gif", "images/Plants/Coldnap/1.gif", "images/Plants/Coldnap/4.gif", "images/Plants/Coldnap/2.gif", "images/Plants/Coldnap/3.gif"],
  Tooltip: $__language_Array__["f08d6f64e25616f6d16119e6b3522a6b"],
  Produce: $__language_Array__["07fbe1e050776ec9762d440b95f95255"],
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -+65;
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(120, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/Coldnap/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 240, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["91cf36cfd696775d3753adf47257c1ae"],
  width: 73,
  height: 90,
  beAttackedPointR: 53,
  SunNum: 75,
  PicArr: ["images/Card/Plants/PrimnalSun.png", "images/Plants/PrimnalSun/0.gif", "images/Plants/PrimnalSun/SunFlower1.gif", "images/Plants/PrimnalSun/SunFlower.gif"],
  Tooltip: $__language_Array__["9d3e5608feccf913326b140e9bcf00b2"],
  Produce: $__language_Array__["eca66553f32488357eb4577929822ba6"],
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -68;
  },
  BirthStyle: function (c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/PrimnalSun/SunFlower.gif";
    d.style.clip = "rect(0,auto,95px,0)";
    d.style.height = "190px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  ChangePosition: function (c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(95px,auto,auto,auto)",
      top: "-95px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,95px,auto)",
      top: 0
    });
  },
  PrivateBirth: function (a) {
    oS.ProduceSun ? oSym.addTask(750, function (d, c, b) {
      $P[d] && (a.ChangePosition($(d), 1), oSym.addTask(80, function (h, g, f, e) {
        $P[h] && (AppearSun(Math.floor(g + Math.random() * 41), f, 75, 0), oSym.addTask(80, function (i) {
          $P[i] && a.ChangePosition($(i), 0);
        }, [h]), oSym.addTask(4000, e, [h, g, f]));
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
  InitTrigger: function () {}
}),
    oXiaoHuangTao = InheritO(CPlants, {
  EName: "oXiaoHuangTao",
  CName: $__language_Array__["50f90a2fa873107f99a38d1444568515"],
  width: 100,
  height: 100,
  beAttackedPointR: 80,
  SunNum: 75,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/XHT.png", "images/Future/XiaoHuangTao/0.gif", "images/Future/XiaoHuangTao/1.gif", "images/Future/XiaoHuangTao/4.gif", "images/Future/XiaoHuangTao/2.gif", "images/Future/XiaoHuangTao/3.gif"],
  Tooltip: $__language_Array__["f5a3fdd12a4de62b3c8f11bdb1fd53c0"],
  Produce: $__language_Array__["cd8c99ab23b4c0eb74edb97e93dde8da"],
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -+50;
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(150, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Future/XiaoHuangTao/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 331, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["bf07cb227698eb80f63c93d864d09c91"],
  HP: 300,
  width: 88,
  height: 119,
  beAttackedPointR: 68,
  SunNum: 150,
  coolTime: 7.5,
  PicArr: ["images/Card/Plants/empeach.png", "images/Future/emp/0.gif", "images/Future/emp/GloomShroom.gif", "images/Future/emp/GloomShroomSleep.gif", "images/Future/emp/GloomShroomAttack.gif", "images/Future/emp/GloomShroomBullet.gif"],
  Tooltip: $__language_Array__["24d32a75c423f702e42b471e9929a560"],
  Produce: $__language_Array__["614603abeff6b64c1453e84cb827c41d"],
  CanGrow: function (b, a, d) {
    var c = b[1];
    return c && c.EName == "oXiaoHuangTao";
  },
  GetDX: function () {
    return -30;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - 60) + "px;top:" + (a.height - 22) + "px";
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Future/emp/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (c, d, e) {
    var f = GetX(this.C),
        b = this.MinX = f - 120,
        a = this.MaxX = f + 120;
    return [[b, a, 0]];
  },
  getTriggerR: function (c) {
    var b = this.MinR = c > 2 ? c - 1 : 1,
        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
    return [b, a];
  },
  NormalAttack: function () {
    PlayAudio($__language_Array__["f45c0e2c203ee55e734571e7e9269bd2"]);
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

      for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 60)) {}
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
  CName: $__language_Array__["7aea47b71b8a28327586f3a6c5ab4360"],
  width: 75,
  height: 30,
  beAttackedPointR: 55,
  SunNum: 50,
  coolTime: 7.5,
  Stature: -1,
  CanGrow: function (d, c, f) {
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
  Tooltip: $__language_Array__["f10363dcb51805668652ba76dad0ae87"],
  Produce: $__language_Array__["dbac5d7f978e6ab3b4f8f6fd4ae03a54"],
  Status: 0,
  AudioArr: [$__language_Array__["9f22504ec56c33424a2448030171f346"]],
  canTrigger: 0,
  BirthStyle: function (d, e, c, b, a) {
    c.childNodes[1].src = !a ? "images/Plants/PrimnalPotatoMine/PotatoMineNotReady.gif" : (~function () {
      d.Status = 1;
      d.canTrigger = 1;
      d.getHurt = d.getHurt2;
    }(), "images/Plants/PrimnalPotatoMine/PotatoMine.gif");
    EditEle(c, {
      id: e
    }, b, EDPZ);
  },
  getShadow: function (a) {
    return "display:none";
  },
  getHurt2: function (d, b, a) {
    var c = this;
    b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
  },
  PrivateBirth: function (b, a) {
    !a && oSym.addTask(500, function (d) {
      var c = $P[d];
      c && ($(d).childNodes[1].src = "images/Plants/PrimnalPotatoMine/PotatoMine.gif", c.Status = 1, c.canTrigger = 1, c.getHurt = c.getHurt2);
    }, [b.id]);
  },
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function (e, c) {
    var a = this.R,
        b = this.C;
    e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
  },
  NormalAttack: function (j, h, e) {
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
    PlayAudio($__language_Array__["9f22504ec56c33424a2448030171f346"]);
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
  CName: $__language_Array__["2c653bb2f1650693ea1ef5952063be16"],
  width: 99,
  height: 106,
  beAttackedPointR: 70,
  SunNum: 5,
  BookHandBack: 2,
  PicArr: ["images/Card/Plants/5.png", "images/Plants/GraveBuster/0.gif", "images/Plants/GraveBuster/GraveBuster.gif" + $Random + Math.random()],
  AudioArr: ["gravebusterchomp"],
  CanGrow: function (b, a, d) {
    var c = oS.ArP;
    return c ? d > 0 && d < c.ArC[1] && a + "_" + d in oGd.$Tombstones && !b[1] : a + "_" + d in oGd.$Tombstones && !b[1];
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - 48) + "px;top:" + a.height + "px";
  },
  BirthStyle: function (c, d, b, a) {
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  GetDY: function (b, c, a) {
    return -30;
  },
  InitTrigger: function () {},
  Tooltip: $__language_Array__["71e92ee1392e21c636892d69dcbb1e5c"],
  Produce: $__language_Array__["940b3d7cbe39f5db10ded6a3a7f2a76a"],
  PrivateBirth: function (a) {
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
  CName: $__language_Array__["79d2a790816a12a2554ad54f6a47b7f0"],
  width: 71,
  height: 40,
  beAttackedPointR: 51,
  SunNum: 100,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/XiaoJinJu.png", "images/Plants/XiaoJinJu/0.gif", "images/Plants/XiaoJinJu/XiaoJinJu.gif", "images/Plants/XiaoJinJuBullet.png", "images/Plants/XiaoJinJuHit.gif", "images/Plants/XiaoJinJu/XiaoJinJuAttack.gif"],
  Tooltip: $__language_Array__["a035bbcc439d30ef4da7cd0766b48b24"],
  Produce: $__language_Array__["18f444bb23b3b1617cbe2f5c70f2c6cb"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
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
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/XiaoJinJuBullet.png");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 28 + "px"
      }).src = ['images/Plants/XiaoJinJuHit.gif'][m], oSym.addTask(30, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oAoTeMan = InheritO(CPlants, {
  EName: "oAoTeMan",
  CName: $__language_Array__["eea390d61cfd84e495a9f375a039159f"],
  width: 122,
  height: 135,
  SunNum: 150,
  beAttackedPointL: 10,
  beAttackedPointR: 80,
  AudioArr: ["plantgrow"],
  Status: 0,
  PicArr: function () {
    return ["images/Card/Plants/AoTeMan.png", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/Attack.gif", "images/Plants/AoTeMan/Attack.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png"];
  }(),
  Tooltip: $__language_Array__["e9eda5bd033a84393edc56ea971d2b8b"],
  Produce: $__language_Array__["d2b245ff27935649c0a4e2b4d7187763"],
  CanGrow: function (b, a, d) {
    var c = b[1];
    return c && c.EName == "oXiaoJinJu";
  },
  GetDX: function () {
    return -58;
  },
  PrivateBirth: function (a) {
    a.ES = a.Elongation;
  },
  TriggerCheck: function (b, a) {
    this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status == 0 && oSym.addTask(840, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CheckLoop2: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status && oSym.addTask(850, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function (g, f) {
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
  AttackCheck12: function (a, c) {
    var b = this;
    b.CheckLoop(a, c);
  },
  Elongation: function () {
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
  Shorten: function () {
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
  NormalAttack: function () {
    PlayAudio($__language_Array__["e982abad1dc5b50ae48b23be43275def"]);
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
  NormalAttack2: function () {
    PlayAudio($__language_Array__["e982abad1dc5b50ae48b23be43275def"]);
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
  CName: $__language_Array__["0d06f74b1dd24d2c1a0fb545f5503c69"],
  width: 80,
  height: 80,
  beAttackedPointR: 80,
  SunNum: 150,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/SuperManBean.png", "images/Plants/SuperManBean/0.gif", "images/Plants/SuperManBean/LaserPea.gif", "images/Plants/SuperManBean/LaserPeaSleep.gif", "images/Plants/SuperManBean/LaserPeaAttack.gif", "images/Plants/SuperManBean/LaserPeaBullet.gif"],
  AudioArr: ["LaserBean"],
  Tooltip: $__language_Array__["1f8e43d490c7d9e252ecfde28b1d6e32"],
  Produce: $__language_Array__["8e759947a6918f57defdd80dec04d494"],
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(292, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CanGrow: function (b, a, d) {
    var c = b[1];
    return c && c.EName == "oLaserBean1";
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -68;
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 686, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["81bb6f9a97cddc122886e344552d6626"],
  width: 80,
  height: 80,
  beAttackedPointR: 80,
  SunNum: 125,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/LG_NEWIMG/Card/LaserPea.png", "images/Plants/LaserPea/0.gif", "images/Plants/LaserPea/LaserPea.gif", "images/Plants/LaserPea/LaserPeaSleep.gif", "images/Plants/LaserPea/LaserPeaAttack.gif", "images/Plants/LaserPea/LaserPeaBullet.gif"],
  AudioArr: ["LaserBean"],
  Tooltip: $__language_Array__["1f8e43d490c7d9e252ecfde28b1d6e32"],
  Produce: $__language_Array__["57eaca9a7dbbdd5062f56126136e81a5"],
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(292, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -68;
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 686, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["6e442b06370cb801dc07695f9c2d57f4"],
  width: 71,
  height: 102,
  beAttackedPointR: 51,
  SunNum: 225,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Clivia.png", "images/Plants/Clivia/0.gif", "images/Plants/Clivia/Clivia.gif", "images/Plants/CliviaBullet.png", "images/Plants/CliviaHit.gif", "images/Plants/Clivia/CliviaAttack.gif"],
  Tooltip: $__language_Array__["0511040e5e84a098cc1f30d098e00bce"],
  Produce: $__language_Array__["766ee8a8f4f532eb5fe0cff90b37781e"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -82;
  },
  NormalAttack: function () {
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
      }).src = ['images/Plants/CliviaHit.gif'][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 50, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oFirePea = InheritO(CPlants, {
  EName: "oFirePea",
  CName: $__language_Array__["7ad8b5d14ffe8ccfe9150e5372d13570"],
  width: 71,
  height: 102,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/FirePea.png", "images/Plants/FirePea/0.gif", "images/Plants/FirePea/FirePea.gif", "images/Plants/FirePeaBullet.png", "images/Plants/FirePeaHit.gif", "images/Plants/FirePea/FirePeaAttack.gif"],
  Tooltip: $__language_Array__["2ca16a6d1fcc97f1b51886b9034571fd"],
  Produce: $__language_Array__["a6c47258ceb24649b82d9e73ddfac7bf"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -82;
  },
  NormalAttack: function () {
    PlayAudio($__language_Array__["857e68d2f97e97a18ec7e4aedf7ca14b"]);
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
      }).src = ['images/Plants/FirePeaHit.gif'][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 64, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oFirePea1 = InheritO(CPlants, {
  EName: "oFirePea1",
  CName: $__language_Array__["7ad8b5d14ffe8ccfe9150e5372d13570"],
  width: 71,
  height: 102,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/FirePea.png", "images/Plants/FirePea/0.gif", "images/Plants/FirePea/FirePea.gif", "images/Plants/FirePeaBullet.png", "images/Plants/FirePeaHit.gif", "images/Plants/FirePea/FirePeaAttack.gif"],
  Tooltip: $__language_Array__["2ca16a6d1fcc97f1b51886b9034571fd"],
  Produce: $__language_Array__["a6c47258ceb24649b82d9e73ddfac7bf"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +0) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -82;
  },
  NormalAttack: function () {
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
      }).src = ['images/Plants/FirePeaHit.gif'][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 64, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oAoTeMan1 = InheritO(CPlants, {
  EName: "oAoTeMan1",
  CName: $__language_Array__["eea390d61cfd84e495a9f375a039159f"],
  width: 122,
  height: 135,
  SunNum: 150,
  beAttackedPointL: 10,
  beAttackedPointR: 80,
  AudioArr: ["plantgrow"],
  Status: 0,
  PicArr: function () {
    return ["images/Card/Plants/AoTeMan.png", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/Attack.gif", "images/Plants/AoTeMan/Attack.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/0.gif", "images/Plants/AoTeMan/Projectile" + ($User.Browser.IE6 ? 8 : 32) + ".png"];
  }(),
  Tooltip: $__language_Array__["e9eda5bd033a84393edc56ea971d2b8b"],
  Produce: $__language_Array__["d2b245ff27935649c0a4e2b4d7187763"],
  CanGrow: function (b, a, d) {
    var c = b[1];
    return c && c.EName == "oXiaoJinJu";
  },
  GetDX: function () {
    return -58;
  },
  PrivateBirth: function (a) {
    a.ES = a.Elongation;
  },
  TriggerCheck: function (b, a) {
    this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a));
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status == 0 && oSym.addTask(840, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  CheckLoop2: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    this.ES();
    this.Status && oSym.addTask(850, function (e, f, h) {
      var g;
      (g = $P[e]) && g.ES() && g.AttackCheck12(f, h);
    }, [a, b, c]);
  },
  AttackCheck1: function (g, f) {
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
  AttackCheck12: function (a, c) {
    var b = this;
    b.CheckLoop(a, c);
  },
  Elongation: function () {
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
  Shorten: function () {
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
  NormalAttack: function () {
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
  NormalAttack2: function () {
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
  CName: $__language_Array__["8fc1431b0fbdbd79661b9260875675c6"],
  width: 71,
  height: 140,
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Lemon.png", "images/Plants/Lemon/0.gif", "images/Plants/Lemon/0.gif", "images/Plants/Lemon.png", "images/Plants/LemonHIT.gif", "images/Plants/Lemon/20.gif"],
  Tooltip: $__language_Array__["22d9624bbcc36f18ceaaabb44c92ec44"],
  Produce: $__language_Array__["f9e0944706d015896d14f758ccc8cc58"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +10) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -72;
  },
  NormalAttack: function () {
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
      }).src = ['images/Plants/LemonHIT.gif'][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 50, 0, a.AttackedLX, a.R, 1, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oSnapShooter = InheritO(CPlants, {
  EName: "oSnapShooter",
  CName: $__language_Array__["4261ddfc7973f089f9244d8bd18fea10"],
  width: 71,
  height: 115,
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/SnapShooter.png", "images/Plants/SnapShooter/0.gif", "images/Plants/SnapShooter/0.gif", "images/Plants/PBSnap.gif", "images/Plants/PBSnapHIT.gif", "images/Plants/SnapShooter/20.gif"],
  Tooltip: $__language_Array__["2722374e265a9b7e4cd668e8d486bc1e"],
  Produce: $__language_Array__["57d1b4260414b56192f95d98a9855b96"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - -20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -90;
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["c58a15fb4823bd5e91c4a7829f59a23b"],
  width: 100,
  height: 90,
  zIndex: 1,
  beAttackedPointR: 80,
  SunNum: 125,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/LongAn.png", "images/Plants/LongAn/0.gif", "images/Plants/LongAn/0.gif", "images/Plants/LongAn/4.gif", "images/Plants/LongAn/2.gif", "images/Plants/LongAn/3.gif"],
  Tooltip: $__language_Array__["26914232b5925019e49bf1f1675592d6"],
  Produce: $__language_Array__["9e2cfacacf5c074d587821fbcd799b93"],
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -+55;
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(300, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LongAn/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 100, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["2cb7799ec5232cfe61f94731cb2d724b"],
  width: 100,
  height: 90,
  zIndex: 1,
  canEat: 0,
  beAttackedPointR: 80,
  SunNum: 50,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/Nap.png", "images/Plants/Nap/0.gif", "images/Plants/Nap/0.gif", "images/Plants/Nap/4.gif", "images/Plants/Nap/2.gif", "images/Plants/Nap/3.gif"],
  Tooltip: $__language_Array__["f08d6f64e25616f6d16119e6b3522a6b"],
  Produce: $__language_Array__["9ffa46ab125f74f47cc2e85408576bdb"],
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -+55;
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(120, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LongAn/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 0, oS.W), 0]];
  },
  NormalAttack: function () {
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
  CName: $__language_Array__["46e2c0a9707420044c2f362640e7466c"],
  width: 90,
  height: 110,
  beAttackedPointL: 0,
  beAttackedPointR: 20,
  coolTime: 30,
  SunNum: 75,
  BookHandBack: 4,
  GetDY: function (b, c, a) {
    return 5;
  },
  NormalGif: 1,
  PicArr: ["images/Card/Plants/Taro.png", "images/Plants/Taro/0.gif", "images/Plants/Taro/Float.gif", "images/Plants/Taro/Grab.gif", "images/Plants/Taro/TaroGrab.png"],
  Tooltip: $__language_Array__["b00f61e5c7b53e73110255ce8075f350"],
  Produce: $__language_Array__["4956449bb892f8a5a6bb4a555e8d2a42"],
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  BirthStyle: function (c, d, b, a) {
    b.childNodes[1].src = "images/Plants/Taro/Float.gif";
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  getHurt: function (d, b, a) {
    var c = this;
    b == 3 ? (c.HP -= a) < 1 && c.Die() : (c.canTrigger = 0, c.NormalAttack(c, d));
  },
  TriggerCheck: function (b, a) {
    b.AttackedLX < GetX(9) && b.beAttacked && (this.canTrigger = 0, this.NormalAttack(this, b));
  },
  NormalAttack: function (a, b) {
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
  CName: $__language_Array__["9aeb8a86490a5cdf38bb45de82b6d517"],
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
  Tooltip: $__language_Array__["fe42bd107319b491421258625a73e1ca"],
  Produce: $__language_Array__["f6a8fe357c9d49e79c62bf3984f9cac2"],
  CanGrow: function (c, b, d) {
    var a = b + "_" + d;
    return c[2] ? 1 : oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0];
  },
  GetDY: function (b, c, a) {
    return a[0] ? -12 : -5;
  },
  HurtStatus: 0,
  InitTrigger: function () {},
  BirthStyle: function (c, d, b, a) {
    b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
    EditEle(b, {
      id: d
    }, a, EDPZ);
    NewImg(d + "_2", "images/Plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_2"));
  }
}),
    oPingGuo = InheritO(CPlants, {
  EName: "oPingGuo",
  CName: $__language_Array__["5fc3b1e00a19f73a6dfe222d345591cc"],
  width: 65,
  height: 43,
  beAttackedPointR: 45,
  SunNum: 50,
  HP: 500,
  coolTime: 30,
  PicArr: ["images/Card/Plants/PingGuo.png", "images/Plants/PingGuo/1.png", "images/Plants/PingGuo/4.png", "images/Plants/PingGuo/3.png", "images/Plants/PingGuo/2.png"],
  Tooltip: "===",
  Produce: '===',
  InitTrigger: function () {},
  HurtStatus: 0,
  getHurt: function (e, b, a) {
    var c = this,
        d = $(c.id).childNodes[1];
    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 100 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/PingGuo/2.png") : c.HP < 250 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/PingGuo/3.png") : c.Die(1);
  }
}),
    oPepper = InheritO(oFumeShroom, {
  EName: "oPepper",
  CName: $__language_Array__["c3f6ce3808e0538175f8e8a24f8969cc"],
  HP: 1,
  width: 88,
  height: 125,
  canEat: 0,
  beAttackedPointR: 68,
  SunNum: 75,
  coolTime: 22.5,
  PicArr: ["images/Card/Plants/Pepper.png", "images/Plants/Pepper/0.gif", "images/Plants/Pepper/idle.gif", "images/Plants/Pepper/GloomShroomSleep.gif", "images/Plants/Pepper/wolf.gif", "images/Plants/Pepper/eff.png"],
  AudioArr: [$__language_Array__["be98ef2a61e770eef02d4b7c48a436ad"]],
  Tooltip: $__language_Array__["29b7fab07708d9a90bd0ab23bcafe5bd"],
  Produce: $__language_Array__["bead8e8c2f44456fe89798d9cdc52076"],
  getShadow: function (a) {
    return "display:none";
  },
  GetDX: function () {
    return -58;
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Plants/Pepper/eff.png);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (c, d, e) {
    var f = GetX(this.C),
        b = this.MinX = f - 120,
        a = this.MaxX = f + 120;
    return [[b, a, 0]];
  },
  getTriggerR: function (c) {
    var b = this.MinR = c > 2 ? c - 1 : 1,
        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
    return [b, a];
  },
  NormalAttack: function () {
    PlayAudio($__language_Array__["be98ef2a61e770eef02d4b7c48a436ad"]);
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
  CName: $__language_Array__["a3230bae1b77ffce78bac583ba5b1b53"],
  width: 77,
  height: 50,
  beAttackedPointR: 57,
  SunNum: 125,
  GetDY: function (b, c, a) {
    return a[0] ? -17 : -10;
  },
  PicArr: ["images/Card/Plants/Starfruit.png", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/Star.gif"],
  Tooltip: $__language_Array__["61cc4f79b55a00e9fb5b279e38baa006"],
  Produce: $__language_Array__["e667f2368b47a929cc01c3b23f3c9f92"],
  getTriggerRange: function (e, g, f) {
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
  AttackCheck2: function (l) {
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
  getTriggerR: function (a) {
    return [1, oS.R];
  },
  PrivateBirth: function (d) {
    var c = d.pixelLeft + 38,
        b = c - 15,
        a = d.pixelTop + 20;
    d.BulletEle = NewImg(0, "images/Plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  getHurt: function (d, b, a) {
    var c = this;
    b != 3 && c.NormalAttack();
    (c.HP -= a) < 1 && c.Die();
  },
  NormalAttack: function () {
    PlayAudio($__language_Array__["857e68d2f97e97a18ec7e4aedf7ca14b"]);

    var g = this,
        f = g.pixelLeft + 38,
        d = f - 15,
        b = g.pixelTop + 20,
        c = g.R,
        e = f + 15,
        a = function (j, i, h) {
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
  CName: $__language_Array__["489eca7aa2a4f487b51191bd360c4ca0"],
  width: 77,
  height: 50,
  beAttackedPointR: 57,
  SunNum: 150,
  GetDY: function (b, c, a) {
    return a[0] ? -17 : -10;
  },
  PicArr: ["images/Card/Plants/Starfruit_T.png", "images/Plants/Starfruit_T/0.gif", "images/Plants/Starfruit_T/0.gif", "images/Plants/Starfruit_T/Star.gif"],
  Tooltip: $__language_Array__["c9a88eee45fc654b298bc32196935ab1"],
  Produce: $__language_Array__["f1fa15128640a3d4c01dce6a032bbb75"],
  getTriggerRange: function (e, g, f) {
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
  AttackCheck2: function (l) {
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
  getTriggerR: function (a) {
    return [1, oS.R];
  },
  CanGrow: function (b, a, d) {
    var c = b[1];
    return c && c.EName == "oStarfruit";
  },
  PrivateBirth: function (d) {
    var c = d.pixelLeft + 38,
        b = c - 15,
        a = d.pixelTop + 20;
    d.BulletEle = NewImg(0, "images/Plants/Starfruit_T/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  getHurt: function (d, b, a) {
    var c = this;
    b != 3 && c.NormalAttack();
    (c.HP -= a) < 1 && c.Die();
  },
  NormalAttack: function () {
    PlayAudio($__language_Array__["857e68d2f97e97a18ec7e4aedf7ca14b"]);

    var g = this,
        f = g.pixelLeft + 38,
        d = f - 15,
        b = g.pixelTop + 20,
        c = g.R,
        e = f + 15,
        a = function (j, i, h) {
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
  CName: $__language_Array__["7962edf6f151894c77ab1f920131d033"],
  width: 70,
  SunNum: 250,
  coolTime: 50,
  height: 30,
  beAttackedPointL: 10,
  beAttackedPointR: 74,
  PicArr: ["", ""],
  Attack: 500,
  canEat: 0,
  GetDY: function (b, c, a) {
    return 0;
  },
  GetDX: function () {
    return -45;
  },
  NormalAttack: function (b, a) {
    var c = $Z[b];
    c.getPea(c, this.Attack, 0);
  },
  getTriggerRange: function (a, b, c) {
    return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
  },
  getShadow: function (a) {
    return "display:none";
  },
  TriggerCheck: function (i, h) {
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
  AttackCheck2: function (a) {
    return a.Altitude == 1 && a.beAttacked;
  }
}),
    oWaterBoom = InheritO(CPlants, {
  EName: "oWaterBoom",
  CName: $__language_Array__["36abedeb00260fc4b533d132e2a9a22a"],
  width: 216,
  height: 164,
  beAttackedPointL: 60,
  beAttackedPointR: 130,
  SunNum: 175,
  coolTime: 20,
  PicArr: function () {
    var a = "images/Plants/WaterBoom/";
    b = "images/Plants/WaterBoom/";
    return ["images/Card/Plants/WaterBoom.png", a + "0.gif", a + "0.gif", b + "Boom.gif"];
  }(),
  AudioArr: ["lavagrava"],
  Tooltip: $__language_Array__["2203884b48321e3c559392cc6742ae0f"],
  Produce: $__language_Array__["173028b4d0d39d4b609699b4b70b7057"],
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  getTriggerRange: function (a, b, c) {
    return [[b, c, 0]];
  },
  TriggerCheck: function (b, a) {
    b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this));
  },
  NormalAttack: function (a) {
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
  CName: $__language_Array__["af85468220dbfea0b76d0c750133cc08"],
  width: 83,
  height: 110,
  beAttackedPointR: 63,
  SunNum: 100,
  coolTime: 7.5,
  PicArr: ["images/Card/Plants/SeaFlower.png", "images/Plants/SeaFlower/0.gif", "images/Plants/SeaFlower/SeaFlower.gif", "images/Plants/SeaFlower/SeaFlower.gif"],
  Tooltip: $__language_Array__["bd8de58f3ef88ca335b9dccf5e54c11b"],
  Produce: $__language_Array__["b280892730c2cf616ace8f5d0d4fdec9"],
  BirthStyle: function (c, e, b, a) {
    var d = b.childNodes[1];
    d.src = "images/Plants/SeaFlower/SeaFlower.gif";
    d.style.clip = "rect(0px,auto,121px,0)";
    d.style.height = "236px";
    EditEle(b, {
      id: e
    }, a, EDPZ);
  },
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +20) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -68;
  },
  ChangePosition: function (c, a) {
    var b = c.childNodes[1];
    a ? SetStyle(b, {
      clip: "rect(121px,auto,auto,auto)",
      top: "-118px"
    }) : SetStyle(b, {
      clip: "rect(auto,auto,121px,auto)",
      top: 0
    });
  },
  PrivateBirth: function (a) {
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
  CName: $__language_Array__["85bd7150379ff9de5d5d857ffb13112a"],
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
  Tooltip: $__language_Array__["d2e632474cb258f07f69c453087efb82"],
  BoomDie: function () {},
  GetDY: function (b, c, a) {
    return -30;
  },
  InitTrigger: function () {},
  PrivateBirth: function (a) {
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
  CanGrow: function (d, e, f) {
    return true;
  },
  getShadow: function (a) {
    return "display:none";
  },
  PrivateBirth: function (a) {
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
  CName: $__language_Array__["c5212fe8ccf1bc3caf78b89a7fa37f89"],
  width: 100,
  height: 90,
  zIndex: 1,
  beAttackedPointR: 80,
  HP: 3000,
  SunNum: 100,
  coolTime: 15,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/Durian.png", "images/KungFu/Durian/0.gif", "images/KungFu/Durian/0.gif", "images/KungFu/Durian/4.gif", "images/KungFu/Durian/2.gif", "images/KungFu/Durian/3.gif"],
  Tooltip: $__language_Array__["7523d0ad9c836a671194e1853b12a604"],
  Produce: $__language_Array__["32d94b6d909e38ab215bd69658fb013c"],
  GetDY: function (b, c, a) {
    return a[0] ? -18 : -10;
  },
  GetDX: function () {
    return -+55;
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(100, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  PrivateBirth: function (b) {
    var a = b.id;
    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LongAn/3.gif);z-index:" + (b.zIndex + 1), 0, EDPZ);
  },
  PrivateDie: function (a) {
    ClearChild($(a.id + "_Bullet"));
  },
  getTriggerRange: function (a, b, c) {
    return [[b, Math.min(c + 0, oS.W), 0]];
  },
  NormalAttack: function () {
    var f = this,
        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 0, oS.W), f.R),
        e = d.length,
        g,
        c = f.id,
        b = $(c),
        a = c + "_Bullet";

    while (e--) {
      (g = d[e]).Altitude < 2 && g.getHit1(g, 25);
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
  CName: $__language_Array__["e1117ceb5147edcb4ae170dcfd3ef168"],
  width: 71,
  height: 120,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Sagesage.png", "images/KungFu/Sagesage/0.gif", "images/KungFu/Sagesage/0.gif", "images/KungFu/Sagesage/Bullet.png", "images/Plants/PeaBulletHit.gif", "images/KungFu/Sagesage/1.gif"],
  Tooltip: $__language_Array__["83b32b02e65ea12a52e7fa06cb1cd45e"],
  Produce: $__language_Array__["9838e971e5d8cb6cb399cbd5cbfbb1b0"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 1) + "px;visibility:hidden;z-index:" + (a.zIndex + 3));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  getShadow: function (a) {
    return "left:" + (a.width * 0.5 - +30) + "px;top:" + (a.height - 22) + "px";
  },
  GetDX: function () {
    return -40;
  },
  NormalAttack: function () {
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
      }).src = ['images/Plants/PeaBulletHit.gif'][m], oSym.addTask(80, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 25, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oPereira = InheritO(CPlants, {
  EName: "oPereira",
  CName: $__language_Array__["44f1e2374571515a9eb89ac5a7636c39"],
  width: 71,
  height: 67,
  beAttackedPointR: 51,
  SunNum: 150,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Pereira.png", "images/KungFu/Pereira/0.gif", "images/KungFu/Pereira/Attack.gif", "images/KungFu/Pereira/Wind.gif"],
  Tooltip: $__language_Array__["bea2a1e07e2cb1a9ea5ab760e29a5ff3"],
  Produce: $__language_Array__["e0ee91f3c176b2f99f99eb5c9a09ca51"],
  PrivateBirth: function (a) {
    a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
  },
  PrivateDie: function (a) {
    a.BulletEle = null;
  },
  NormalAttack: function () {
    PlayAudio($__language_Array__["857e68d2f97e97a18ec7e4aedf7ca14b"]);
    var a = this,
        b = "PB" + Math.random();
    w = a.id;
    EditEle(a.BulletEle.cloneNode(false), {
      id: b
    }, 0, EDPZ);
    $(w).childNodes[1].src = "images/KungFu/Pereira/Attack.gif";
    oSym.addTask(20, function (e) {
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
      d && d.Altitude == 1 ? d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 64, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oFireHill = InheritO(CPlants, {
  EName: "oFireHill",
  CName: $__language_Array__["12c42e3dc4a1ed20adfd5da57992cf4a"],
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
  getShadow: function (a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  },
  CanGrow: function (c, b, e) {
    var a = b + "_" + e,
        d = oS.ArP;
    return d ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0]) : !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a]);
  },
  getHurt: function (d, b, a) {
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
  NormalAttack: function (b, a) {
    var c = $Z[b];
    c.getExplosion();
  },
  GetDY: function (b, c, a) {
    return -2;
  },
  getTriggerRange: function (a, b, c) {
    return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
  },
  TriggerCheck: function (i, h) {
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
  AttackCheck2: function (a) {
    return a.Altitude == 1 && a.beAttacked;
  }
}),
    oCamel = InheritO(oLight, {
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
  CanGrow: function (d, e, f) {
    return true;
  },
  PrivateBirth: function () {},
  Stature: -1,
  canEat: 0,
  GetDY: function (b, c, a) {
    return +10;
  },
  canShovel: false,
  getShadow: function (a) {
    return "display:none";
    return "left:" + (a.width * 0.5 - 20) + "px;top:" + (a.height - 22) + "px";
  }
});