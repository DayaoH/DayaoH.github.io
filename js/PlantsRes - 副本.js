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
  CName: $__language_Array__["ff59e484dbd7746a4d4c5664c670d3e5"],
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
  Tooltip: $__language_Array__["70e5686368524f3a611c0f62ad2e79ae"],
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
  CName: $__language_Array__["2f87b3fafa324ec5aaf8763920bc7318"],
  width: 71,
  height: 57,
  beAttackedPointL: 0,
  beAttackedPointR: 47,
  SunNum: 0,
  PicArr: ["images/interface/LawnCleaner.png"],
  Tooltip: $__language_Array__["2f87b3fafa324ec5aaf8763920bc7318"],
  AudioArr: ["pool_cleaner"]
}),
    oSeaCleaner = InheritO(CPlants, {
  EName: "oSeaCleaner",
  CName: $__language_Array__["b7bb19ff5328422e60f49ccad2d02561"],
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
  Tooltip: $__language_Array__["249db8d92cd090a1b0ca4b07662922c7"],
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
  CName: $__language_Array__["b4f6d73a04b5ac2e6fd5e5c1535f28de"],
  width: 32,
  height: 31,
  beAttackedPointL: 0,
  beAttackedPointR: 32,
  SunNum: 0,
  PicArr: ["images/interface/brain.png"],
  Tooltip: $__language_Array__["d0aad9f803a4e312ff30cf5cb8ee7376"],
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
  CName: $__language_Array__["c4e8ad53d7941f663c0f3ec6d4b63d83"],
  width: 71,
  height: 67,
  beAttackedPointR: 51,
  SunNum: 100,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Peashooter/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
  Tooltip: $__language_Array__["2541d1290b3341861486f95676ecbc4a"],
  Produce: $__language_Array__["1302f88d7483961fe9e680cc67d05856"],
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
  CName: $__language_Array__["4d49f044ad67d2e7fc69b934ae6c6462"],
  width: 78,
  height: 67,
  SunNum: 175,
  BKind: -1,
  PicArr: ["images/Card/Plants/SnowPea.png", "images/Plants/SnowPea/0.gif", "images/Plants/SnowPea/SnowPea.gif", "images/Plants/PBSnow.png", "images/Plants/PeaSBulletHit.gif"],
  AudioArr: ["frozen", "SnowPeaHit1", "SnowPeaHit2", "SnowPeaHit3", "shieldhit", "shieldhit2", "plastichit"],
  Tooltip: $__language_Array__["1c1332a4fb58df0a0b50bad2b7415b7a"],
  Produce: $__language_Array__["777c5ba6f22ec00a1c1afd3886bd0bdc"],
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
  CName: $__language_Array__["cc0f3ce5ae94707d1ccf2d1cdd8df5a6"],
  width: 73,
  height: 71,
  beAttackedPointR: 53,
  SunNum: 200,
  PicArr: ["images/Card/Plants/Repeater.png", "images/Plants/Repeater/0.gif", "images/Plants/Repeater/Repeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["03facdbfecd92603dfc9e838ee20c1cf"],
  Produce: $__language_Array__["883978cf39694be65239364bb9d43dc6"],
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
  CName: $__language_Array__["847b982163a831f1041b53145a30ae0c"],
  width: 73,
  height: 80,
  beAttackedPointR: 53,
  SunNum: 325,
  PicArr: ['images/Card/Plants/Threepeater.png', 'images/Plants/Threepeater/0.gif', 'images/Plants/Threepeater/Threepeater.gif', 'images/Plants/PB00.gif', 'images/Plants/PeaBulletHit.gif'],
  AudioArr: ['splat1', 'splat2', 'splat3', 'plastichit', 'shieldhit', 'shieldhit2'],
  Tooltip: $__language_Array__["c105fd54b153d5f4f828cbe82793ce88"],
  Produce: $__language_Array__["55c4844ffa80b8d4175b5dff55e8619b"],
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
  CName: $__language_Array__["541d47db01010a17ca09a4a98c05df59"],
  width: 92,
  height: 72,
  beAttackedPointR: 72,
  SunNum: 125,
  PicArr: ["images/Card/Plants/SplitPea.png", "images/Plants/SplitPea/0.gif", "images/Plants/SplitPea/SplitPea.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PeaBulletHit.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["74aec7d5c6f997fa28172b0503331836"],
  Produce: $__language_Array__["0f4f18be51cc5d871711da1fa197703a"],
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
  CName: $__language_Array__["1975e59c1b4515df477288020a4e5be1"],
  width: 86,
  height: 71,
  beAttackedPointR: 51,
  SunNum: 200,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/LG_NEWIMG/Card/BagOfCoin.png", "images/ENDLESSPLANTIMG/Coins/0.png", "images/ENDLESSPLANTIMG/Coins/Peashooter.png"],
  Tooltip: $__language_Array__["0618312884090cc863352b81c0c13896"],
  Produce: $__language_Array__["0618312884090cc863352b81c0c13896"]
}),
    oCoi = InheritO(CPlants, {
  EName: "oCoi",
  CName: $__language_Array__["89788abc47cb60b9bb6155a58173bbb6"],
  width: 86,
  height: 71,
  beAttackedPointR: 51,
  SunNum: 0,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/LG_NEWIMG/Card/BagOfCoin.png", "images/ENDLESSPLANTIMG/Coi/0.png", "images/ENDLESSPLANTIMG/Coi/Peashooter.png"],
  Tooltip: $__language_Array__["c4546bae361745a8982459e2ca5d194a"],
  Produce: $__language_Array__["c4546bae361745a8982459e2ca5d194a"]
}),
    oSunFlower = InheritO(CPlants, {
  EName: "oSunFlower",
  CName: $__language_Array__["474e8b8fadfd2be8126a08c3fc0c2528"],
  width: 73,
  height: 68,
  beAttackedPointR: 53,
  SunNum: 50,
  PicArr: ["images/Card/Plants/SunFlower.png", "images/Plants/SunFlower/0.gif", "images/Plants/SunFlower/SunFlower1.gif", "images/Plants/SunFlower/SunFlower.gif"],
  Tooltip: $__language_Array__["4ef99463484e7ae5cc96a7d500bd6629"],
  Produce: $__language_Array__["db50dfeb17602c318c93cf91cd1539dc"],
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
    oTwinSunflower = InheritO(oSunFlower, {
  EName: "oTwinSunflower",
  CName: $__language_Array__["903c2a7a90091810d9e0272a6eec70ce"],
  width: 83,
  height: 84,
  beAttackedPointR: 63,
  SunNum: 150,
  coolTime: 50,
  PicArr: ["images/Card/Plants/TwinSunflower.png", "images/Plants/TwinSunflower/0.gif", "images/Plants/TwinSunflower/TwinSunflower1.gif", "images/Plants/TwinSunflower/TwinSunflower.gif"],
  Tooltip: $__language_Array__["7bc1c0e09495e3bf2dfa63b762b4140f"],
  Produce: $__language_Array__["e71ef9ca24ade31c0af6d5b2bb4dd5e5"],
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
  CName: $__language_Array__["3d338370313bd909e9e6f952d0ae274f"],
  width: 72,
  height: 68,
  canShovel: false,
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
  Tooltip: $__language_Array__["0d7495914164bb21192b965d8806a167"],
  Produce: $__language_Array__["ace6a2ae3cf32fcfd0d730d374aadf89"],
  InitTrigger: function () {}
}),
    oLilyPad = InheritO(oFlowerPot, {
  BookHandBack: 4,
  Stature: -1,
  EName: "oLilyPad",
  CName: $__language_Array__["12b8474162b03bfc54ec5a30293788db"],
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
  Tooltip: $__language_Array__["ed683adac92426f82a59fd9e685d7b30"],
  Produce: $__language_Array__["fc2c671d8566bb06109a9105e6bfc948"]
}),
    oMud = InheritO(CPlants, {
  EName: "oMud",
  CName: $__language_Array__["ed04da9491cfe7d57465c77f174f9f4d"],
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
  Tooltip: $__language_Array__["0d7495914164bb21192b965d8806a167"],
  Produce: $__language_Array__["ace6a2ae3cf32fcfd0d730d374aadf89"],
  InitTrigger: function () {}
}),
    oPotatoMine = InheritO(CPlants, {
  EName: "oPotatoMine",
  CName: $__language_Array__["545a5b52151def908e5604cc4af22000"],
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
  Tooltip: $__language_Array__["0d6339fd288c89c11cec4f5c396a5eec"],
  Produce: $__language_Array__["49d7ed8b3a21dd32f0d3d52b8d264a37"],
  Status: 0,
  AudioArr: ["potato_mine"],
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
    PlayAudio("potato_mine");
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
  CName: $__language_Array__["8e322b28f9a1be3432f47eb799756237"],
  width: 73,
  height: 83,
  beAttackedPointR: 53,
  SunNum: 175,
  PicArr: ["images/Card/Plants/Torchwood.png", "images/Plants/Torchwood/0.gif", "images/Plants/Torchwood/Torchwood.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PB10.gif", "images/Plants/PB11.gif", "images/Plants/Torchwood/SputteringFire.gif"],
  AudioArr: ["firepea", "ignite", "ignite2"],
  Tooltip: $__language_Array__["1ba8259c70f6d80bb061f81052af397b"],
  Produce: $__language_Array__["f43c0fa7fe968de595d6ed5c526471ca"],
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
  CName: $__language_Array__["9b1105508a2aa66c70294e430f52d407"],
  width: 65,
  height: 65,
  beAttackedPointR: 45,
  SunNum: 50,
  HP: 4000,
  coolTime: 30,
  PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/0.gif"],
  Tooltip: $__language_Array__["dadc69446040f81b4c2704625298bd53"],
  Produce: $__language_Array__["9ff780bb26f690a060d7aaabd7ec920a"],
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
  CName: $__language_Array__["0e045c052fe912cbfff16a6095331720"],
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
  CName: $__language_Array__["7c5a5ed3481bcbd4c0dd6d49b0e9cace"],
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
  CName: $__language_Array__["5ed6633c14101d55292724e9339963f1"],
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
  CName: $__language_Array__["58916a33bd9091ada148c79240309718"],
  width: 83,
  height: 119,
  beAttackedPointR: 63,
  SunNum: 125,
  HP: 8000,
  PicArr: ["images/Card/Plants/TallNut.png", "images/Plants/TallNut/0.gif", "images/Plants/TallNut/TallNut.gif", "images/Plants/TallNut/TallnutCracked1.gif", "images/Plants/TallNut/TallnutCracked2.gif"],
  Tooltip: $__language_Array__["e463a1e2daaf707d3061a59f10bcecdf"],
  Produce: $__language_Array__["8edf7fa6b7badc7d8521bcb59c5d0a5a"],
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
  CName: $__language_Array__["2ff2c6c6fe0ed4f46c758e6ccd9b9f9a"],
  width: 112,
  height: 81,
  beAttackedPointR: 92,
  SunNum: 150,
  coolTime: 52.5,
  PicArr: ["images/Card/Plants/ch.png", "images/Plants/CherryBomb/0.gif", "images/Plants/CherryBomb/CherryBomb.gif", "images/Plants/CherryBomb/Boomnut.gif" + $Random],
  AudioArr: ["cherrybomb"],
  Tooltip: $__language_Array__["d2d8f8440422cbad991e0149637f5881"],
  Produce: $__language_Array__["93d5eb46ac3cc3e2ef00fd4891ac4427"],
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
  CName: $__language_Array__["60132baf5ce7b03483197c4641158b6f"],
  width: 68,
  height: 89,
  coolTime: 52.5,
  SunNum: 125,
  beAttackedPointR: 48,
  PicArr: ["images/Card/Plants/Jalapeno.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
  AudioArr: ["jalapeno"],
  Tooltip: $__language_Array__["d1129fd9145e420f870df92008193c3c"],
  Produce: $__language_Array__["0ddc4c6d2d64449db5350519011cdac2"],
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
  CName: $__language_Array__["0f6d8d6ecc66a5ee9e8148a248113d32"],
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
  Tooltip: $__language_Array__["16ecff0acda34509b7284d7de1666a99"],
  Produce: $__language_Array__["35c9eed14f1b9c1e029e40194c9baeb1"],
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
  CName: $__language_Array__["c28b48bd8aa433ab35158e1df259c351"],
  width: 70,
  height: 30,
  beAttackedPointL: 10,
  beAttackedPointR: 74,
  SunNum: 250,
  coolTime: 50,
  PicArr: ["images/Card/Plants/Spikerock.png", "images/Plants/Spikerock/0.gif", "images/Plants/Spikerock/Spikerock.gif", "images/Plants/Spikerock/2.gif", "images/Plants/Spikerock/3.gif"],
  Attack: 40,
  Tooltip: $__language_Array__["80b2c39126f37e62935b7467c6889ab9"],
  Produce: $__language_Array__["c829e28a5b14863316677a346173698f"],
  GetDY: function (b, c, a) {
    return 0;
  },
  GetDX: function () {
    return -45;
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
        f.getHit2(f, 50, 0);
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
  CName: $__language_Array__["79d35c8d3c48459ee5ced64fb8219457"],
  width: 100,
  height: 226,
  beAttackedPointR: 67,
  SunNum: 50,
  coolTime: 22.5,
  PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
  AudioArr: ["squash_hmm", "gargantuar_thump"],
  Tooltip: $__language_Array__["e8cb91395d931a81e4476654ee1a7db2"],
  Produce: $__language_Array__["2c92ebd26c4bbf4f70ecbd3e82711113"],
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
  CName: $__language_Array__["85ca887735fc8f73a0ebd0fa2dc62cd9"],
  width: 130,
  height: 135,
  beAttackedPointR: 70,
  SunNum: 150,
  PicArr: ["images/Card/Plants/Chomper.png", "images/Plants/Chomper/0.gif", "images/Plants/Chomper/Chomper.gif", "images/Plants/Chomper/ChomperAttack.gif", "images/Plants/Chomper/ChomperDigest.gif"],
  Tooltip: $__language_Array__["c4cc7a9e8f7dd85b73724356f01356d3"],
  Produce: $__language_Array__["dea78b94c676a733672f554cb3a578e7"],
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
  CName: $__language_Array__["e5884a941896f262d3c76bef002e1da0"],
  width: 100,
  height: 88,
  beAttackedPointR: 80,
  SunNum: 175,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/akee.png", "images/Plants/FumeShroom/0.gif", "images/Plants/FumeShroom/FumeShroom.gif", "images/Plants/FumeShroom/FumeShroomSleep.gif", "images/Plants/FumeShroom/FumeShroomAttack.gif", "images/Plants/FumeShroom/FumeShroomBullet.gif"],
  AudioArr: ["AKEE"],
  Tooltip: $__language_Array__["3849160efa9dc38dd3a293586b74878f"],
  Produce: $__language_Array__["ac0731da504544cd43d9a9c0f4842fcc"],
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
  CName: $__language_Array__["4deaa4f2706f4fdb745ba76572701639"],
  width: 100,
  height: 83,
  beAttackedPointR: 80,
  SunNum: 125,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/shuzi.png", "images/Plants/Shizuki/0.gif", "images/Plants/Shizuki/FumeShroom.gif", "images/Plants/Shizuki/FumeShroomSleep.gif", "images/Plants/Shizuki/FumeShroomAttack.gif", "images/Plants/Shizuki/FumeShroomBullet.gif"],
  AudioArr: ["fumeattack"],
  Tooltip: $__language_Array__["81c55596d0f953653d06539e28a8dbff"],
  Produce: $__language_Array__["bbb9301cc4b6caadb0914960591409bb"],
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
  CName: $__language_Array__["a030ec5789fb14d63cd696c31bbd5fed"],
  width: 39,
  height: 97,
  beAttackedPointL: 10,
  beAttackedPointR: 29,
  SunNum: 10,
  PKind: 3,
  canEat: 0,
  PicArr: ["images/Card/Plants/A-BAG.png", "images/LG_NEWIMG/PlantIce/0.gif", "images/LG_NEWIMG/PlantIce/IceIdle.png", "images/LG_NEWIMG/PlantIce/IceAttack.gif" + $Random],
  AudioArr: ["coffee", "wakeup"],
  Tooltip: $__language_Array__["72818ac379362d18aeb6df19ff241dd8"],
  Produce: $__language_Array__["72818ac379362d18aeb6df19ff241dd8"],
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
  CName: $__language_Array__["b3194ac33400fb37aa7dcf9530bc8e53"],
  width: 40,
  height: 66,
  beAttackedPointL: 15,
  beAttackedPointR: 25,
  SunNum: 0,
  Stature: -1,
  PicArr: ["images/Card/Plants/PuffShroom.png", "images/Plants/PuffShroom/0.gif", "images/Plants/PuffShroom/PuffShroom.gif", "images/Plants/PuffShroom/PuffShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  AudioArr: ["puff"],
  Tooltip: $__language_Array__["eb429fc653520f9e5a1d8a898bc71e2b"],
  Produce: $__language_Array__["f950c14ff4dc1556e6b0de5751db1f1a"],
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
  CName: $__language_Array__["b3194ac33400fb37aa7dcf9530bc8e53"],
  width: 40,
  height: 66,
  beAttackedPointL: 15,
  beAttackedPointR: 25,
  SunNum: 0,
  Stature: -1,
  PicArr: ["images/Card/Plants/PuffShroom1.png", "images/Plants/PuffShroom/0.gif", "images/Plants/PuffShroom/PuffShroom.gif", "images/Plants/PuffShroom/PuffShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  AudioArr: ["puff"],
  Tooltip: $__language_Array__["75424b8f9fa0126b490bfe7e7f63dd46"],
  Produce: $__language_Array__["6e3920a5c86b080798c894ad51948752"],
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
  CName: $__language_Array__["9f98f2e5dae097debfbac7905f38c8c8"],
  width: 97,
  height: 81,
  beAttackedPointR: 37,
  SunNum: 25,
  HP: 1500,
  Cry: 0,
  ArZ: [],
  Attacking: 0,
  PicArr: ["images/Card/Plants/redstringer.png", "images/Plants/ScaredyShroom/0.gif", "images/Plants/ScaredyShroom/ScaredyShroom.gif", "images/Plants/ScaredyShroom/ScaredyShroomSleep.gif", "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
  Tooltip: $__language_Array__["8f609e9f6cd4ff7b75ec791023ff955b"],
  Produce: $__language_Array__["0ccd14d722aba6cf47e05e8c77d4055a"],
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
  CName: $__language_Array__["15970d3d79b42c030b7f0ceceb5f6896"],
  width: 113,
  height: 75,
  beAttackedPointR: 63,
  SunNum: 50,
  coolTime: 1,
  PicArr: ["images/Card/Plants/soni.png", "images/Plants/IceShroom/0.gif", "images/Plants/IceShroom/IceShroom.gif", "images/Plants/IceShroom/IceShroomSleep.gif", "images/Plants/IceShroom/Snow.gif", "images/Plants/IceShroom/icetrap.png"],
  AudioArr: ["onion", "wakeup"],
  Tooltip: $__language_Array__["bed58c248af3c3c0826d42e37aa07b5b"],
  Produce: $__language_Array__["a7071098de8475ef84132bd54bab9156"],
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
  CName: $__language_Array__["b15e3cddfd95ba3f9768240286dce892"],
  width: 59,
  height: 61,
  beAttackedPointL: 15,
  beAttackedPointR: 44,
  SunNum: 25,
  Stature: -1,
  Status: 0,
  PicArr: ["images/Card/Plants/SunShroom.png", "images/Plants/SunShroom/0.gif", "images/Plants/SunShroom/SunShroom2.gif", "images/Plants/SunShroom/SunShroomSleep.gif", "images/Plants/SunShroom/SunShroom.gif"],
  Tooltip: $__language_Array__["cafa4d42fb5db99d69418d308958fb82"],
  Produce: $__language_Array__["fb23ef35b1666e3074c4f07afdbca0f6"],
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
    oDoomShroom = InheritO(oFumeShroom, {
  EName: "oDoomShroom",
  CName: $__language_Array__["d2071edc27507f6e7f65a9e4f135aeeb"],
  width: 140,
  height: 120,
  beAttackedPointR: 80,
  coolTime: 50,
  SunNum: 150,
  PicArr: ["images/Card/Plants/DoomShroom.png", "images/Plants/DoomShroom/0.gif", "images/Plants/DoomShroom/DoomShroom.gif", "images/Plants/DoomShroom/Sleep.gif", "images/Plants/DoomShroom/BeginBoom.gif", "images/Plants/DoomShroom/crater10.png", "images/Plants/DoomShroom/crater11.png", "images/Plants/DoomShroom/crater20.png", "images/Plants/DoomShroom/crater21.png", "images/Plants/DoomShroom/crater30.png", "images/Plants/DoomShroom/crater31.png", "images/Plants/DoomShroom/Boom.png"],
  Tooltip: $__language_Array__["2436f9c7760d9c2e55fbf2e2fc539ca7"],
  Produce: $__language_Array__["36f4f9721adcc156c5da190eeceb692c"],
  InitTrigger: function () {},
  BirthStyle: function (c, d, b, a) {
    oS.DKind ? (c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]) : (c.Sleep = 0, c.getHurt = function () {}, b.childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif", c.NormalAttack(d));
    EditEle(b, {
      id: d
    }, a, EDPZ);
  },
  WakeUP: function (a) {
    var b = a.id;
    a.Sleep = 0;

    a.getHurt = function () {};

    $(b).childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif";
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
        NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (d.zIndex + 2) + ";width:283px;height:324px;left:" + (d.pixelLeft - 80) + "px;top:" + (d.pixelTop - 220) + "px;background:url(images/Plants/DoomShroom/Boom.png) no-repeat", 0, EDPZ);
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
        a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/DoomShroom/crater1" + oS.DKind + ".png) no-repeat;width:90px;height:61px;left:" + (e || GetX(d) - 45) + "px;top:" + (c || GetY(b) - 30) + "px", 0, EDPZ);
        break;

      case 2:
        a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/DoomShroom/crater2" + oS.DKind + ".png) no-repeat;width:85px;height:53px;left:" + (e || GetX(d) - 42) + "px;top:" + (c || GetY(b) - 26) + "px", 0, EDPZ);
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
  CName: $__language_Array__["dca976c500146da85a68b22c4605aabe"],
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
  Tooltip: $__language_Array__["a68c904d94ac5c190d8ed1d4064ae383"],
  Produce: $__language_Array__["55d91ad0038c453dce81925aa64bee7d"],
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
  CName: $__language_Array__["e4f55b975d9c4e6e87891a0224287fa7"],
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
  Tooltip: $__language_Array__["248a37a8c0fffa151c9eec819908153a"],
  Produce: $__language_Array__["2e11407188826bda389a67318d8d253b"]
}),
    oRoseMan = InheritO(CPlants, {
  EName: "oRoseMan",
  CName: $__language_Array__["c91473acdf2cad9d950d8abf5de23a39"],
  width: 100,
  height: 75,
  beAttackedPointR: 80,
  SunNum: 150,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/LG_NEWIMG/Card/RoseMan_Compressed.png", "images/LG_NEWIMG/PlantRoseMan/0.gif", "images/LG_NEWIMG/PlantRoseMan/1.gif", "images/LG_NEWIMG/PlantRoseMan/4.gif", "images/LG_NEWIMG/PlantRoseMan/2.gif", "images/LG_NEWIMG/PlantRoseMan/3.gif"],
  AudioArr: ["RoseMan"],
  Tooltip: $__language_Array__["b8dc2dfcbb1d97fb177073d8de1871a1"],
  Produce: $__language_Array__["0ee9e01e470f0761d9b6f0b7b4b5fa05"],
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
  CName: $__language_Array__["e9b0b960f4a29e20f8417b68b7e37753"],
  width: 100,
  height: 75,
  beAttackedPointR: 80,
  SunNum: 125,
  BookHandBack: 2,
  SleepGif: 3,
  AudioArr: ["snaplong"],
  PicArr: ["images/LG_NEWIMG/Card/Bonkchoy.png", "images/LG_NEWIMG/PlantBonkChoy/0.gif", "images/LG_NEWIMG/PlantBonkChoy/1.gif", "images/LG_NEWIMG/PlantBonkChoy/4.gif", "images/LG_NEWIMG/PlantBonkChoy/2.gif", "images/LG_NEWIMG/PlantBonkChoy/3.gif"],
  Tooltip: $__language_Array__["55793cf88393b7524a55f9f9b5f6d04e"],
  Produce: $__language_Array__["8353d0396b6e1762de9958462881e1c2"],
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
  CName: $__language_Array__["0b5f4da3dbd3f22567dbf58eb8d5030e"],
  width: 83,
  height: 93,
  beAttackedPointR: 63,
  SunNum: 125,
  HP: 3000,
  PicArr: ["images/LG_NEWIMG/Card/BB.png", "images/ENDLESSPLANTIMG/BambooBrother/0.gif", "images/ENDLESSPLANTIMG/BambooBrother/TallNut.gif", "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked1.gif", "images/ENDLESSPLANTIMG/BambooBrother/TallnutCracked2.gif"],
  Tooltip: $__language_Array__["fba422fbcce8479efaa0af03e050ad1b"],
  Produce: $__language_Array__["cdd960e6eea9a1784afb2e215ad8dcaf"],
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
  CName: $__language_Array__["2ff2c6c6fe0ed4f46c758e6ccd9b9f9a"],
  width: 129,
  height: 138,
  beAttackedPointR: 92,
  SunNum: 150,
  coolTime: 35,
  PicArr: ["images/Card/Plants/lavagrava.png", "images/Plants/LAVAGRAVA/0.gif", "images/Plants/LAVAGRAVA/CherryBomb.gif", "images/Plants/LAVAGRAVA/Boomnut.gif" + $Random],
  AudioArr: ["lavagrava"],
  Tooltip: $__language_Array__["baf52fd38babfb538c06a76bb7b2a76b"],
  Produce: $__language_Array__["347a7e5d8122bac02caa057882cd66d2"],
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
  CName: $__language_Array__["7f8f70b569f8a9519d05e687d7d91e49"],
  width: 113,
  height: 85,
  beAttackedPointR: 63,
  SunNum: 0,
  coolTime: 20,
  PicArr: ["images/Card/Plants/soni.png", "images/Plants/Stallia/0.gif", "images/Plants/Stallia/IceShroom.gif", "images/Plants/Stallia/IceShroomSleep.gif", "images/Plants/Stallia/Snow.gif", "images/Plants/Stallia/icetrap.png"],
  AudioArr: ["stallia", "wakeup"],
  Tooltip: $__language_Array__["e1dc80b6c55fb1e7a62d6729f48c7562"],
  Produce: $__language_Array__["8846c849261bc5c8bbc53dd7edf42de1"],
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
    !oS.DKind ? (a.NormalAttack(a.id), a.getHurt = function (d, c, b) {}) : a.getHurt = CPlants.prototype.getHurt;
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
  CName: $__language_Array__["4eb357a52e4eace6b992eade3d05123e"],
  HP: 1000,
  width: 81,
  height: 92,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Bamboo/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB05.gif", "images/Plants/BambooBulletHit.gif"],
  Tooltip: $__language_Array__["a5703edc844ff1cda10f18888e42525b"],
  Produce: $__language_Array__["2c36d4b735fcb1dd789c15def7c0eb61"],
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
  CName: $__language_Array__["443900ccfed9a421a89f74251b64d295"],
  HP: 1500,
  width: 81,
  height: 110,
  SunNum: 175,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/BBB.png", "images/Plants/Bamboo/0.gif", "images/Plants/Bamboo/Peashooter.gif", "images/Plants/PB05.gif", "images/Plants/BambooBulletHit.gif"],
  Tooltip: $__language_Array__["a5703edc844ff1cda10f18888e42525b"],
  Produce: $__language_Array__["92b701ae69c84e632db82415eccddf51"],
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
  CName: $__language_Array__["f66816705d698b7d04542d60acceba3e"],
  width: 80,
  height: 224,
  beAttackedPointR: 80,
  SunNum: 75,
  cooltime: 13,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/CGTree.png", "images/Plants/CGTree/0.gif", "images/Plants/CGTree/LaserPea.gif", "images/Plants/CGTree/LaserPeaSleep.gif", "images/Plants/CGTree/LaserPeaAttack.gif", "images/Plants/CGTree/LaserPeaBullet.gif"],
  AudioArr: ["fengshuzhi"],
  Tooltip: $__language_Array__["5b120d498fb03df311c9aa0e76c8eb53"],
  Produce: $__language_Array__["871a544c14490a4efbaad098200fed11"],
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
  CName: $__language_Array__["c0723c39a1554f4ef107a4d08c1eaecb"],
  width: 73,
  height: 100,
  beAttackedPointR: 53,
  SunNum: 125,
  cooltime: 20,
  PicArr: ['images/Card/Plants/Threepeater.png', 'images/Plants/Threepeater/0.gif', 'images/Plants/Threepeater/Threepeater.gif', 'images/Plants/PB08.gif', 'images/Plants/lotusBulletHit.gif'],
  AudioArr: ['splat1', 'splat2', 'splat3', 'plastichit', 'shieldhit', 'shieldhit2'],
  Tooltip: $__language_Array__["1767271dd82aceb344365c95bad2cd68"],
  Produce: $__language_Array__["de4894dc3334646ff9baea5344114dcd"],
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
  CName: $__language_Array__["24ef82925512c3ff62f04bf627bbb8c5"],
  width: 250,
  height: 242,
  beAttackedPointL: 105,
  beAttackedPointR: 145,
  canEat: 0,
  coolTime: 7.5,
  BookHandBack: 2,
  SunNum: 50,
  PicArr: ["images/Card/Plants/Plantern.png", "images/xiyoures/Plantern/0.gif", "images/xiyoures/Plantern/Plantern.gif", "images/xiyoures/Plantern/light.gif"],
  Tooltip: $__language_Array__["c90eea8a7041323a0bbaa8d728842db6"],
  Produce: $__language_Array__["781aa6f3c7947b468ca195a61b6758be"],
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
  CName: $__language_Array__["721966b110adcebe2c37e4d510b34061"],
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
  Tooltip: $__language_Array__["507195acef186be696c4c16ce86083eb"],
  Produce: $__language_Array__["08ccd4ee035097709f6a27f2eaf33ec0"],
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
  CName: $__language_Array__["59dac936971b7a9fd6777e8b69a94f7e"],
  HP: 500,
  width: 88,
  height: 75,
  beAttackedPointR: 68,
  SunNum: 150,
  coolTime: 7.5,
  PicArr: ["images/Card/Plants/GloomShroom.png", "images/xiyoures/GloomShroom/0.gif", "images/xiyoures/GloomShroom/GloomShroom.gif", "images/xiyoures/GloomShroom/GloomShroomSleep.gif", "images/xiyoures/GloomShroom/GloomShroomAttack.gif", "images/xiyoures/GloomShroom/GloomShroomBullet.gif"],
  AudioArr: ["fatbeet"],
  Tooltip: $__language_Array__["a67ae7201b3e0df1d5aa6a5cb1f07695"],
  Produce: $__language_Array__["c84c6fbd6c299ce4e437e263d2d30a00"],
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
  CName: $__language_Array__["8bf0286d8449ec4cf1d0d1b85a7e585f"],
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
  Tooltip: $__language_Array__["514b8dbe8f9e207a7b9bda124747c53d"],
  Produce: $__language_Array__["46f5039a0f874573eea8f54380a2c783"],
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
    oaneone1 = InheritO(CPlants, {
  EName: "oaneone1",
  CName: $__language_Array__["e6bd8688c2f6ff761ec0074da69f8a94"],
  HP: 300,
  width: 92,
  height: 110,
  beAttackedPointR: 51,
  SunNum: 125,
  PicArr: ["images/Card/Plants/SplitPea.png", "images/LG_NEWIMG/Plantaneone/0.gif", "images/LG_NEWIMG/Plantaneone/SplitPea.gif", "images/LG_NEWIMG/Plantaneone/Bullet.gif", "images/LG_NEWIMG/Plantaneone/Bullet.gif", "images/LG_NEWIMG/Plantaneone/Effect.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["68d5c3d2a91d39455816b1d49ee84571"],
  Produce: $__language_Array__["e7c9ad2809593bb1c3f67b9016cbf87c"],
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
      m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/LG_NEWIMG/Plantaneone/Bullet.gif");
      d && d.Altitude == 1 ? (d[{
        "-1": "getSnowPea",
        0: "getPea",
        1: "getFirePea"
      }[m]](d, h, c), SetStyle(j, {
        left: o + 28 + "px"
      }).src = "images/LG_NEWIMG/Plantaneone/Effect.gif", oSym.addTask(40, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j);
    }, [b, $(b), 10, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]);
  }
}),
    oOxygen = InheritO(CPlants, {
  EName: "oOxygen",
  CName: $__language_Array__["8571f9b830c3b31258066d5b5f89c090"],
  width: 82,
  height: 103,
  beAttackedPointR: 45,
  SunNum: 25,
  HP: 300,
  coolTime: 7.5,
  PicArr: ["images/LG_NEWIMG/Card/Oxygen_Compressed.png", "images/LG_NEWIMG/PlantOxygen/0.gif", "images/LG_NEWIMG/PlantOxygen/Oxygen.gif"],
  Tooltip: $__language_Array__["e8b7dfd41eaf90b911c9ad8771547cc2"],
  Produce: $__language_Array__["a52f53f7bebc119ab4ba8ed7a7dc14ee"],
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
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
  CName: $__language_Array__["89aa5c107b9ea1421369cc5eff07a399"],
  width: 108,
  height: 102,
  beAttackedPointR: 53,
  SunNum: 175,
  PicArr: ["images/LG_NEWIMG/Card/ThunderPine_Compressed.png", "images/LG_NEWIMG/PlantThunderPine/0.gif", "images/LG_NEWIMG/PlantThunderPine/ThunderPine.gif", "images/LG_NEWIMG/PB02.png", "images/LG_NEWIMG/PB02.png", "images/LG_NEWIMG/PB03.gif", "images/LG_NEWIMG/PB03.gif", "images/Plants/Torchwood/SputteringFire.gif"],
  AudioArr: ["firepea", "ignite", "ignite2"],
  Tooltip: $__language_Array__["c36d9215fff6d0c1ba8ef04ceb31aab8"],
  Produce: $__language_Array__["51173dce1e3a3a17e098ef09e3b332ad"],
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
  CName: $__language_Array__["ed670b2f2b5e05782b43bdee0ce82b11"],
  width: 139,
  height: 130,
  beAttackedPointR: 40,
  SunNum: 75,
  HP: 200,
  PicArr: ["images/LG_NEWIMG/Card/garlic.png", "images/ENDLESSPLANTIMG/PlantGarlic/0.gif", "images/ENDLESSPLANTIMG/PlantGarlic/Garlic.gif", "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body1.gif", "images/ENDLESSPLANTIMG/PlantGarlic/Garlic_body2.gif"],
  Tooltip: $__language_Array__["e15422f0229107459685025cf07261a5"],
  Produce: $__language_Array__["9297442b5e2db547c409a4f90903f6d5"],
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
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
  CName: $__language_Array__["a45a01ceff06901443fedee83b12189d"],
  width: 71,
  height: 80,
  PKind: 0,
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/LG_NEWIMG/Card/BubbleFlower_Compressed .png", "images/LG_NEWIMG/PlantBubbleFlower/0.gif", "images/LG_NEWIMG/PlantBubbleFlower/BubbleFlower.gif", "images/LG_NEWIMG/PB02.png", "images/LG_NEWIMG/PBBS.gif"],
  Tooltip: $__language_Array__["690bfff7ce969590e3cd8f1cbb13fe7e"],
  Produce: $__language_Array__["b5059971a848d1a51f933063185354fc"],
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
  CName: $__language_Array__["d9fb9c980149d1fcd499d6a48fe90bcf"],
  width: 68,
  height: 78,
  PKind: 0,
  beAttackedPointR: 48,
  coolTime: 20,
  PicArr: ["images/LG_NEWIMG/Card/Litchi_Compressed.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
  AudioArr: ["jalapeno"],
  Tooltip: $__language_Array__["210ad00c5195095f82fd52af2cacc623"],
  Produce: $__language_Array__["487e9f39854749e0dce79f8333508532"],
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
    oaneone = InheritO(oPeashooter, {
  EName: "oaneone",
  CName: $__language_Array__["04222548091e4a493c86d815d931a909"],
  HP: 500,
  width: 92,
  PKind: 0,
  height: 110,
  SunNum: 125,
  PicArr: ["images/LG_NEWIMG/Card/aneone.png", "images/LG_NEWIMG/Plantaneone/0.gif", "images/LG_NEWIMG/Plantaneone/SplitPea.gif", "images/LG_NEWIMG/Plantaneone/Bullet.gif", "images/LG_NEWIMG/Plantaneone/Bullet.gif", "images/LG_NEWIMG/Plantaneone/Effect.gif"],
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  Tooltip: $__language_Array__["0e1a2879aadfac0a417bb3ceee6478a4"],
  Produce: $__language_Array__["83d01d5b399a1e2f5432efa89d2e2bc4"],
  CanGrow: function (e, d, f) {
    var c = d + "_" + f,
        b = oGd.$LF[d],
        a = f < 1 || f > 9;
    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0;
  },
  CheckLoop: function (b, c) {
    var a = this.id;
    this.NormalAttack(b);
    oSym.addTask(190, function (e, f, h) {
      var g;
      (g = $P[e]) && g.AttackCheck1(f, h);
    }, [a, b, c]);
  },
  NormalAttack1: oaneone1.prototype.NormalAttack,
  NormalAttack2: function (a) {
    this.NormalAttack1();
    oSym.addTask(15, function (c) {
      var b = $P[c];
      b && b.NormalAttack1();
    }, [this.id]);
  },
  NormalAttack: function (a) {
    this.NormalAttack2();
    oSym.addTask(15, function (c) {
      var b = $P[c];
      b && b.NormalAttack2();
    }, [this.id]);
  }
}),
    oHypnoShroom = InheritO(oFumeShroom, {
  EName: "oHypnoShroom",
  CName: $__language_Array__["18152414d9d10c54c6ea3bff517b6033"],
  width: 71,
  height: 70,
  beAttackedPointL: 10,
  beAttackedPointR: 61,
  SunNum: 100,
  coolTime: 30,
  PicArr: ["images/LG_NEWIMG/Card/hypno.png", "images/Plants/HypnoShroom/0.gif", "images/Plants/HypnoShroom/HypnoShroom.gif", "images/Plants/HypnoShroom/HypnoShroomSleep.gif"],
  Tooltip: $__language_Array__["4b1283326db7153df5365b0424f7a287"],
  Produce: $__language_Array__["1cf4ccb407fe7d06ecb2d0ee0f812606"],
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
  CName: $__language_Array__["79d35c8d3c48459ee5ced64fb8219457"],
  width: 100,
  height: 210,
  beAttackedPointR: 67,
  SunNum: 50,
  coolTime: 35,
  PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
  AudioArr: ["squash_hmm", "gargantuar_thump"],
  Tooltip: $__language_Array__["e8cb91395d931a81e4476654ee1a7db2"],
  Produce: $__language_Array__["2c92ebd26c4bbf4f70ecbd3e82711113"],
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
  CName: $__language_Array__["79a162d4af4e7e67ee25e4307f2f8bdd"],
  width: 68,
  height: 100,
  PKind: 0,
  beAttackedPointR: 48,
  coolTime: 15,
  PicArr: ["images/LG_NEWIMG/Card/PlantStarFish_Compressed.png", "images/Plants/Shuilei/0.gif", "images/Plants/Shuilei/Jalapeno.gif", "images/Plants/Shuilei/JalapenoAttack.gif"],
  AudioArr: ["jalapeno"],
  Tooltip: $__language_Array__["5072c85129dc775806598eafacaeb046"],
  Produce: $__language_Array__["5d1cfdc5fa8fe7cdcfddb6adbc64d6b1"],
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
  CName: $__language_Array__["5b0947d4e1b8d1dc7681b22eb6d9ee9f"],
  width: 71,
  height: 80,
  beAttackedPointR: 51,
  SunNum: 175,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/PrimnalPea.png", "images/Plants/PrimnalPea/0.gif", "images/Plants/PrimnalPea/PrimnalPea.gif", "images/Plants/PB02.png", "images/Plants/PBBS.gif"],
  Tooltip: $__language_Array__["54d081c54e0ce6516661d72bd080c383"],
  Produce: $__language_Array__["d12d61c6a7113089b2b0ec5e6accfbf0"],
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
  CName: $__language_Array__["a7f08ed0f36216f94d1f742d4cda8bcb"],
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
  Tooltip: $__language_Array__["50fccb690f3e411d38878d07bc0770a2"],
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
  CName: $__language_Array__["26fdca2a41b0fb44cd994cb6954116a4"],
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
  Tooltip: $__language_Array__["50fccb690f3e411d38878d07bc0770a2"],
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
  CName: $__language_Array__["4a37e2f339ee1b9b4bbf76a95eb89af9"],
  width: 65,
  height: 100,
  beAttackedPointR: 45,
  SunNum: 75,
  HP: 3000,
  coolTime: 7.5,
  PicArr: ["images/Card/Plants/PrimnalNut.png", "images/Plants/PrimnalNut/0.gif", "images/Plants/PrimnalNut/WallNut.gif", "images/Plants/PrimnalNut/Wallnut_cracked1.gif", "images/Plants/PrimnalNut/Wallnut_cracked2.gif"],
  Tooltip: $__language_Array__["b74ab82df1c35a7281b41cc10860f8b0"],
  Produce: $__language_Array__["ee5855b4687fc29dbe32f36fb92ed4f0"],
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
  CName: $__language_Array__["7977fda6ec82e4a77fe0a8a9b2c13834"],
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
  CName: $__language_Array__["dcfbccbac98dfc44608e700fabbd2cd9"],
  width: 112,
  height: 130,
  beAttackedPointR: 92,
  SunNum: 225,
  coolTime: 7.5,
  PicArr: ["images/Card/Plants/Shrubbery.png", "images/Plants/Shrubbery/0.gif", "images/Plants/Shrubbery/Shrubbery.gif", "images/Plants/Shrubbery/ShrubberyBoom.gif" + $Random],
  Tooltip: $__language_Array__["7df6d8d2cfd7a8f984bccc95342a6fdd"],
  Produce: $__language_Array__["24fecb0e7a5799e94116a8a96f806bb9"],
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
  CName: $__language_Array__["410a53cffdfd0f446fcdb302285e090f"],
  width: 100,
  height: 100,
  beAttackedPointR: 80,
  SunNum: 200,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/Coldnap.png", "images/Plants/Coldnap/0.gif", "images/Plants/Coldnap/1.gif", "images/Plants/Coldnap/4.gif", "images/Plants/Coldnap/2.gif", "images/Plants/Coldnap/3.gif"],
  Tooltip: $__language_Array__["636babc99c164b69c8847ed99809db6e"],
  Produce: $__language_Array__["4c17ffeee879c7641afbcbf73533ae08"],
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
  CName: $__language_Array__["73d0445b899c4059aaefc1d5395d5e2a"],
  width: 73,
  height: 90,
  beAttackedPointR: 53,
  SunNum: 75,
  PicArr: ["images/Card/Plants/PrimnalSun.png", "images/Plants/PrimnalSun/0.gif", "images/Plants/PrimnalSun/SunFlower1.gif", "images/Plants/PrimnalSun/SunFlower.gif"],
  Tooltip: $__language_Array__["5035f17787f3918a4b0158b4000ced64"],
  Produce: $__language_Array__["4858f20d5c934b8016d2481651af913a"],
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
  CName: $__language_Array__["57a4d685f9a792da8b7fdb2cf633f12d"],
  width: 100,
  height: 100,
  beAttackedPointR: 80,
  SunNum: 75,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/XHT.png", "images/Future/XiaoHuangTao/0.gif", "images/Future/XiaoHuangTao/1.gif", "images/Future/XiaoHuangTao/4.gif", "images/Future/XiaoHuangTao/2.gif", "images/Future/XiaoHuangTao/3.gif"],
  Tooltip: $__language_Array__["86d2f27986c85e3a44beb5d4821304ae"],
  Produce: $__language_Array__["2b7538d3825211b50e55b5ad4eec6d3a"],
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
  CName: $__language_Array__["af6a4fa4b4c9823baa1d09bbc98c8c9d"],
  HP: 300,
  width: 88,
  height: 119,
  beAttackedPointR: 68,
  SunNum: 150,
  coolTime: 7.5,
  PicArr: ["images/Card/Plants/empeach.png", "images/Future/emp/0.gif", "images/Future/emp/GloomShroom.gif", "images/Future/emp/GloomShroomSleep.gif", "images/Future/emp/GloomShroomAttack.gif", "images/Future/emp/GloomShroomBullet.gif"],
  Tooltip: $__language_Array__["1f16ea3db4aa06ec39795b469b500e62"],
  Produce: $__language_Array__["76ef1dfcb7b92d870469eb3ecd2d8867"],
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
  CName: $__language_Array__["bf1f50f0a755866ab3666b95ac823ad4"],
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
  Tooltip: $__language_Array__["0d6339fd288c89c11cec4f5c396a5eec"],
  Produce: $__language_Array__["7f2398bc5d7ce273ac0eab57b0e2a52d"],
  Status: 0,
  AudioArr: ["potato_mine"],
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
    PlayAudio("potato_mine");
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
  CName: $__language_Array__["1282a7ec76e6a4ea9e5920393446b36f"],
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
  Tooltip: $__language_Array__["20645613c2e8efbc8ec3b5608bdf14d3"],
  Produce: $__language_Array__["565d4a7a874fbbc88721f9ad2a856337"],
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
  CName: $__language_Array__["8dacd313a0b670b2525aab037f4c5df6"],
  width: 71,
  height: 40,
  beAttackedPointR: 51,
  SunNum: 100,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/XiaoJinJu.png", "images/Plants/XiaoJinJu/0.gif", "images/Plants/XiaoJinJu/XiaoJinJu.gif", "images/Plants/XiaoJinJuBullet.png", "images/Plants/XiaoJinJuHit.gif", "images/Plants/XiaoJinJu/XiaoJinJuAttack.gif"],
  Tooltip: $__language_Array__["2f55d6e844cd1bc8a013a6b573ea911e"],
  Produce: $__language_Array__["d48467d8ee0b0bbe35430d3748c45cac"],
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
  CName: $__language_Array__["3b9d24625cf170ca00426c669ab5c53c"],
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
  Tooltip: $__language_Array__["380f983c0fd198adcb75f52ecaf51038"],
  Produce: $__language_Array__["deadf1cf06c2ca65f542131d44b7496e"],
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
    oSuperManBean = InheritO(CPlants, {
  EName: "oSuperManBean",
  CName: $__language_Array__["1e86778083d35571ca06df67ccebae84"],
  width: 80,
  height: 80,
  beAttackedPointR: 80,
  SunNum: 150,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/Card/Plants/SuperManBean.png", "images/Plants/SuperManBean/0.gif", "images/Plants/SuperManBean/LaserPea.gif", "images/Plants/SuperManBean/LaserPeaSleep.gif", "images/Plants/SuperManBean/LaserPeaAttack.gif", "images/Plants/SuperManBean/LaserPeaBullet.gif"],
  AudioArr: ["LaserBean"],
  Tooltip: $__language_Array__["1e4963c243532b778b8263ddfbf9e6ad"],
  Produce: $__language_Array__["0b5d21a98ca307d4a8d58d4dd4111d96"],
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
  CName: $__language_Array__["ba37a4a97e52c5cd052fbfc83fa05284"],
  width: 80,
  height: 80,
  beAttackedPointR: 80,
  SunNum: 125,
  BookHandBack: 2,
  SleepGif: 3,
  PicArr: ["images/LG_NEWIMG/Card/LaserPea.png", "images/Plants/LaserPea/0.gif", "images/Plants/LaserPea/LaserPea.gif", "images/Plants/LaserPea/LaserPeaSleep.gif", "images/Plants/LaserPea/LaserPeaAttack.gif", "images/Plants/LaserPea/LaserPeaBullet.gif"],
  AudioArr: ["LaserBean"],
  Tooltip: $__language_Array__["1e4963c243532b778b8263ddfbf9e6ad"],
  Produce: $__language_Array__["d4b607a24497c978eff1dfb364b39796"],
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
  CName: $__language_Array__["b0a391fe215fc54b0bee88a41a16f64b"],
  width: 71,
  height: 102,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Clivia.png", "images/Plants/Clivia/0.gif", "images/Plants/Clivia/Clivia.gif", "images/Plants/CliviaBullet.png", "images/Plants/CliviaHit.gif", "images/Plants/Clivia/CliviaAttack.gif"],
  Tooltip: $__language_Array__["5ce502498f00dd276ec7eaf4690469ae"],
  Produce: $__language_Array__["448eb1063adbe3fbab1b71133da517d6"],
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
  CName: $__language_Array__["52f22208746ce4c0d593876be9ab29cb"],
  width: 71,
  height: 102,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/FirePea.png", "images/Plants/FirePea/0.gif", "images/Plants/FirePea/FirePea.gif", "images/Plants/FirePeaBullet.png", "images/Plants/FirePeaHit.gif", "images/Plants/FirePea/FirePeaAttack.gif"],
  Tooltip: $__language_Array__["3ed7befa59ac4c698516b3e6a6275bf1"],
  Produce: $__language_Array__["34e216c56d3a9e6dc7c0aa18b1e51699"],
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
    oFirePea1 = InheritO(CPlants, {
  EName: "oFirePea1",
  CName: $__language_Array__["52f22208746ce4c0d593876be9ab29cb"],
  width: 71,
  height: 102,
  beAttackedPointR: 51,
  SunNum: 175,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/FirePea.png", "images/Plants/FirePea/0.gif", "images/Plants/FirePea/FirePea.gif", "images/Plants/FirePeaBullet.png", "images/Plants/FirePeaHit.gif", "images/Plants/FirePea/FirePeaAttack.gif"],
  Tooltip: $__language_Array__["3ed7befa59ac4c698516b3e6a6275bf1"],
  Produce: $__language_Array__["34e216c56d3a9e6dc7c0aa18b1e51699"],
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
  CName: $__language_Array__["3b9d24625cf170ca00426c669ab5c53c"],
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
  Tooltip: $__language_Array__["380f983c0fd198adcb75f52ecaf51038"],
  Produce: $__language_Array__["deadf1cf06c2ca65f542131d44b7496e"],
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
  CName: $__language_Array__["327459c3712f558f93ed7350dd873c97"],
  width: 71,
  height: 140,
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/Lemon.png", "images/Plants/Lemon/0.gif", "images/Plants/Lemon/0.gif", "images/Plants/Lemon.png", "images/Plants/LemonHIT.gif", "images/Plants/Lemon/20.gif"],
  Tooltip: $__language_Array__["47aef9465ab740c5f7de8ee7cbc035a9"],
  Produce: $__language_Array__["6924a659f1c1c61cfc7adcda3372bcf1"],
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
  CName: $__language_Array__["036ade108aed5448fe8ab7bf048b767b"],
  width: 71,
  height: 115,
  beAttackedPointR: 51,
  SunNum: 125,
  BKind: 0,
  AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
  PicArr: ["images/Card/Plants/SnapShooter.png", "images/Plants/SnapShooter/0.gif", "images/Plants/SnapShooter/0.gif", "images/Plants/PBSnap.gif", "images/Plants/PBSnapHIT.gif", "images/Plants/SnapShooter/20.gif"],
  Tooltip: $__language_Array__["9096d92a6cebcb440f2eb0bb9977e5de"],
  Produce: $__language_Array__["8cfde159b1920ab25be2f5f451f3ae0f"],
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
});