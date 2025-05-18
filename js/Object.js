function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var $User = function () {
  var b = navigator.platform,
      i = navigator.userAgent,
      f = b == "Win32" || b == "Windows",
      g = b == "Mac68K" || b == "MacPPC" || b == "Macintosh",
      d = b == "X11" && !f && !g,
      h = f || g || d,
      a = "sunflower.lonelystar.org",
      c = !!(window.attachEvent && !window.opera),
      e = c && !window.XMLHttpRequest,
      j = location.protocol.toLowerCase() == "http:" ? 1 : 0;
  $Random = j ? "#" : "?";
  innerText = c ? function (l, k) {
    l.innerText = k;
  } : function (l, k) {
    l.textContent = k;
  };
  e ? (document.execCommand("BackgroundImageCache", false, true), ShadowPNG = "images/interface/plantshadow8.gif") : ShadowPNG = "images/interface/plantshadow32.png";
  return {
    Browser: {
      IE: c,
      IE6: e,
      IE9: c && i.indexOf("MSIE 9.0") > 0,
      Opera: !!window.opera,
      WebKit: i.indexOf("AppleWebKit/") > -1,
      Gecko: i.indexOf("Gecko") > -1 && i.indexOf("KHTML") == -1
    },
    Server: {
      List: [[$__language_Array__["dacc91169ed0ab81811bd6f02f6d7916"], "http://pvz1.lonelystar.org/", "NaN"], [$__language_Array__["627ed5d02c3a2de30e86b095314d4df1"], "http://pvz2.lonelystar.org/", "NaN"]],
      SpeedURL: "",
      DataURL: "",
      SpeedInx: 0,
      DataInx: 0,
      ErrNum: 0
    },
    HTML5: function () {
      return !!document.createElement("canvas").getContext;
    }(),
    System: {
      Win: f,
      Mac: g,
      Unix: d
    },
    Client: {
      PC: h,
      Mobile: !h
    },
    HTTP: j,
    AuthorWebsite: a,
    isAuthorWebsite: false,
    Visitor: {
      UserName: $__language_Array__["b942da9b7095aa7b2bf70beb71bdc01a"],
      UserAuthority: 0,
      Progress: 1,
      SelectServerT: 0,
      NowStep: 1,
      TimeStep: 10,
      SaveLvl: 1,
      SaveLvlCallBack: null
    }
  };
}(),
    AcrossWorldUi = function AcrossWorldUi() {
  PlayAudio("pause");
  SetVisible($("AcrossWorldUi"));
},
    CloseAcrossWorld = function CloseAcrossWorld() {
  PlayAudio("Close");
  SetHidden($("AcrossWorldUi"));
},
    oSym = {
  Init: function Init(b, a) {
    this.Now = 0;
    this.Timer = this.execTask = null;
    this.TQ = [{
      T: 0,
      f: b,
      ar: a || []
    }];
    this.NowStep = 1;
    this.TimeStep = 10;
    this.Start();
  },
  Clear: function Clear() {
    this.TQ.length = 0;
  },
  Start: function Start() {
    if (this.Timer == null) {
      (function () {
        var a = oSym;

        try {
          a.Now += a.NowStep;
        } catch (b) {
          alert($__language_Array__["548613e4339c676217b1e3224994c6d5"]);
          location.reload();
        }

        a.Timer = setTimeout(arguments.callee, a.TimeStep);
      })();

      (function () {
        var d = oSym,
            a = d.TQ,
            c = a.length,
            b,
            e;

        while (c--) {
          d.Now >= (b = a[c]).T && ((e = b.f).apply(e, b.ar), d.removeTask(c));
        }

        d.execTask = setTimeout(arguments.callee, d.TimeStep);
      })();
    }
  },
  Stop: function Stop() {
    clearTimeout(oSym.Timer);
    clearTimeout(oSym.execTask);
    oSym.Timer = null;
    oSym.execTask = null;
  },
  addTask: function addTask(b, c, a) {
    var d = this.TQ;
    d[d.length] = {
      T: this.Now + b,
      f: c,
      ar: a
    };
    return this;
  },
  removeTask: function removeTask(a) {
    this.TQ.splice(a, 1);
    return this;
  }
},
    oS = {
  W: 880,
  H: 600,
  C: 9,
  LawnMowerX: 70,
  Lvl: 0,
  GlobalVariables: {},
  LvlVariables: {},
  SelfVariables: [],
  LvlClearFunc: null,
  Init: function Init(e, g, b, d) {
    var c,
        a = window;
    e.LoadMusic ? (PlayMusic(e.LoadMusic), NewAudio({
      source: "",
      loop: true
    })) : PlayMusic(e.LoadMusic = "");
    NewAudio({
      source: "groan2"
    });

    if (b != d) {
      for (c in b) {
        a[c] != d ? (this.GlobalVariables[c] = a[c], a[c] = b[c]) : this.LvlVariables[c] = a[c] = b[c];
      }
    }

    ArCard = [];
    ArPCard = [];
    ArSun = [];
    $Pn = [];
    $Z = [];
    $P = [];
    EDAll = $("dAll");
    EDPZ = $("dPZ");
    EDAlloffsetLeft = EDAll.offsetLeft;
    EDNewAll = EDAll.cloneNode(true);
    EDNewFlagMeter = $("dFlagMeter").cloneNode(true);
    ESSunNum = $("sSunNum");
    this.DynamicDifficulty = null; //是否开启动态难度

    this.AudioArr = [];
    this.MustAllReady = true;
    this.LoadAccess = null;
    this.InitLawnMower = null;
    this.StartGame = null;
    this.ChoseCard = this.MPID = "";
    this.PicNum = this.AccessNum = this.MCID = this.Chose = 0;
    this.Monitor = null;
    this.UserDefinedFlagFunc = null;
    this.SunNum = d;
    this.BrainsNum = d;
    this.HaveFog = 0;

    for (c in e) {
      this.SelfVariables.push(c);
      this[c] = e[c];
    }
    /*$User.isAuthorWebsite && oS.LevelEName != 0 && (ClearChild($("JSPVZAjax")), NewEle("JSPVZAjax", "script", 0, {
    src: $User.Server.DataURL + "asp/SaveUserPosition.asp?l=" + escape(oS.LevelName),
    type: "text/javascript"
    },
    document.body));*/


    !this.PicArr && (this.PicArr = []);
    !this.PName && (this.PName = []);
    !this.ZName && (this.ZName = []);
    !this.backgroundImage && (this.backgroundImage = "images/interface/background1.jpg");
    this.DynamicDifficulty === null && (this.DynamicDifficulty = true); //动态难度初始为false

    !this.LF && (this.LF = [0, 1, 1, 1, 1, 1]);
    !this.ZF && (this.ZF = this.LF);
    !this.LargeWaveFlag && (this.LargeWaveFlag = {});
    !this.StartGameMusic && (this.StartGameMusic = "UraniwaNi");
    this.ArCard = this.CardKind == d ? e.PName : e.ZName;
    this.SunNum == d && (this.SunNum = 9990);
    this.CanSelectCard == d && (this.CanSelectCard = 1);
    this.DKind == d && (this.DKind = 1);
    this.StaticCard == d && (this.StaticCard = 1);
    this.ShowScroll == d && (this.ShowScroll = true);
    this.ProduceSun == d && (this.ProduceSun = true);
    this.Coord == d && (this.Coord = 1);
    oCoord[this.Coord]();
    oP.Init(g);
    oT.Init(this.R);
    oZ.Init(this.R);
    oGd.Init();
    this.LoadTips();
    this.LoadProgress();
  },
  LoadTips: function LoadTips() {
    var b = NewEle("dTips", "div", $__language_Array__["d564f94f7dc3c412adb092aa72d933ec"], "", EDAll),
        a = [$__language_Array__["8a0a8ef96891c0341c59dc03f26e639f"]];
    b.innerHTML = '<img src="images/interface/Flower.gif" style="position:absolute;top:0%;left:0%;transform:translateX(280px) translateY(-300px);pointer-events:none;"><span style="font-weight:bold"></span><span>' + a[Math.floor(Math.random() * a.length)] + "</span>";
  },
  LoadProgress: function LoadProgress(r, l, a, t, b) {
    SetVisible($("dFlagMeter"));
    SetHidden($("imgGQJC"));
    var p = oS,
        j = [],
        i = p.PicArr,
        k = p.PName,
        s = p.ZName,
        w = 0,
        u = GetX(11),
        g = oGd.$LF,
        c = oGd.$ZF,
        d = oS.R + 1,
        x = $("sFlagMeterTitleF"),
        y = $("dFlagMeterTitle"),
        e = p.LoadImage,
        h = p.CheckImg,
        f = p.InitPn,
        m,
        q;
    NewImg(0, "images/interface/brain.png", "", $Pn.oBrains = NewEle(0, "div", "position:absolute"));

    switch (p.Coord) {
      case 2:
        NewImg(0, "images/interface/PoolCleaner.png", "", $Pn.oPoolCleaner = NewEle(0, "div", "position:absolute"));

      case 1:
        NewImg(0, "images/interface/LawnCleaner.png", "", $Pn.oLawnCleaner = NewEle(0, "div", "position:absolute"));
        break;
    }

    while (r--) {
      copy = (l = k[r].prototype).PicArr.slice(0);

      for (var _q in copy) {
        if (copy[_q] && !/base64/.test(copy[_q])) {
          copy[_q] = {
            img: copy[_q],
            randomPic: true
          };
        }
      }

      Array.prototype.push.apply(i, a);

      if ($User.HTML5) {
        t = l.AudioArr;
        b = t.length;

        while (b--) {
          NewAudio({
            source: t[b]
          });
        }
      }
    }

    for (r in oS.LargeWaveFlag) {
      s[s.length] = oS.FlagZombie || oFlagZombie;
      break;
    }

    r = s.length;

    while (r--) {
      l = (q = s[r]).prototype;

      var _copy = l.PicArr.slice();

      for (var _q2 in _copy) {
        if (_copy[_q2] && !/base64/.test(_copy[_q2])) {
          _copy[_q2] = {
            img: _copy[_q2],
            randomPic: true
          };
        }
      }

      Array.prototype.push.apply(i, l);

      if ($User.HTML5) {
        t = l.AudioArr;
        b = t.length;

        while (b--) {
          NewAudio({
            source: t[b]
          });
        }
      }

      l.Init.call(q, u, l, c, d);
    }

    p.PicNum = w += i.length;
    r = i.length;
    y.setAttribute("title", $__language_Array__["310f65be97bbe9199aae527fff1658b8"]);
    y.style.cursor = "pointer";

    y.onclick = function () {
      oS.MustAllReady = false;
      oS.LoadReady(oS);
    };

    loadRes({
      img: [h].concat(i),
      au: p.AudioArr
    });
  },

  /*LoadAudio: $User.HTML5
  ? function () {
      var b = oS.AudioArr,
        a = b.length;
       while (a--) {
        NewAudio({
          source: b[a]
        });
      }
    }
  : function () {},*/
  InitPn: function InitPn(a) {
    var b = $Pn[a[0]] = NewEle(0, "div", "position:absolute");
    NewImg(0, ShadowPNG, a[2], b);
    NewImg(0, a[1], "", b);
    oS.CheckImg();
  },

  /*LoadImage: $User.Browser.IE
  ? function (b, d, c) {
      var a = new Image();
       a.onreadystatechange = function () {
        a.readyState == "complete" && d(c, 1);
      };
       a.onerror = function () {
        a.onreadystatechange = null;
        a.title = b;
        d(c, 0);
      };
       a.src = b;
    }
  : function (b, d, c) {
      var a = new Image();
      a.src = b;
      a.complete
        ? d(c, 1)
        : ((a.onload = function () {
            a.complete && d(c, 1);
          }),
          (a.onerror = function () {
            a.title = b;
            d(c, 0);
          }));
    },*/
  LoadScript: $User.Browser.IE ? function (f, c, e, a, d) {
    var b = NewEle(f, "script", 0, {
      type: "text/javascript"
    });

    b.onreadystatechange = function () {
      (b.readyState == "loaded" || b.readyState == "complete") && (b.onreadystatechange = null, e(d, 1));
    };

    b.onerror = function () {
      b.onreadystatechange = null;
      e(d, 0);
    };

    b.src = c;
    a.appendChild(b);
  } : function (f, c, e, a, d) {
    var b = NewEle(f, "script", 0, {
      type: "text/javascript"
    });

    b.onload = function () {
      e(d, 1);
    };

    b.onerror = function () {
      e(d, 0);
    };

    b.src = c;
    a.appendChild(b);
  },
  CheckImg: function CheckImg(b, a) {
    var c = oS;

    if (c.AccessNum > c.PicNum || !c.MustAllReady) {
      return;
    }

    b = 139 - c.AccessNum++ * 140 / c.PicNum - 11;
    $("imgFlagHead").style.left = b + "px";
    $("sFlagMeterTitleF").innerHTML = $__language_Array__["698ea41ddd46b0bf7e2f4572e697c48f"] + c.AccessNum + "/" + c.PicNum + ")</span>";
    $("imgFlagMeterFull").style.clip = "rect(0,auto,21px," + (b + 11) + "px)";

    if (c.AccessNum == c.PicNum) {
      oS.Lvl == 0;

      if (c.MustAllReady) {
        $("sFlagMeterTitleF").innerHTML = $__language_Array__["8a3317c9c6a82305f368a876b4885599"];
        c.LoadReady(c);
      }
    }
  },
  LoadReady: function LoadReady(f) {
    var c = $("dFlagMeterTitle");

    if (c.onclick == null) {
      return;
    }

    if (f.CenterContent) {
      var e = oS.Lvl;

      if (oS.MustAllReady && oS.DisplayAD) {
        var b = (oS.Lvl ? 0 : 0) - oSym.Now;

        if (b > 0) {
          oSym.addTask(b, arguments.callee, [f]);

          (function (g) {
            var h = $("ADTimer");
            h && ($("ADTimer").innerHTML = $__language_Array__["d45a70d3bcb8775270807276f7871469"] + g + $__language_Array__["9e77166e055a1a7b543b6743c81244b0"]);
            --g && oSym.addTask(100, arguments.callee, [g]);
          })(Math.ceil(b / 100));

          return;
        }
      }

      oS.DisplayAD = false;
      $("dAdFlash").innerHTML = '<iframe name="fGGAdsense" marginwidth="1" marginheight="1" height="280" width="336" scrolling="no" border="0" frameborder="0" src="js/ggadsense.htm?' + Math.random() + '"></iframe><br><div style="font-family:arial,sans-serif;font-size:11px;position:absolute;left:300px;width:200px"></div>';
      SetNone($("dAdFlash"), $("dAD2"));
    }

    SetNone($("dLvlLink"));
    ClearChild($("dTips"));
    oSym.NowStep = $User.Visitor.NowStep;
    oSym.TimeStep = $User.Visitor.TimeStep;
    c.onclick = null;
    c.title = null;
    c.style.cursor = "default";
    SetHidden($("dFlagMeterContent"), dFlagMeter);
    $("dFlagMeter").style.top = "545px";
    $("sFlagMeterTitleF").innerHTML = $("dFlagMeterTitleB").innerHTML = f.LevelName;
    $("imgFlagHead").style.left = "139px";
    $("imgFlagMeterFull").style.clip = "rect(0,auto,auto,157px)";
    delete f.PicArr;
    delete f.Coord;
    delete f.LF;
    delete f.ZF;
    var a = {
      background: "url(" + f.backgroundImage + ") no-repeat",
      visibility: "visible"
    };
    !f.ShowScroll && (a.left = "-115px");
    SetStyle($("tGround"), a);
    $("tGround").innerHTML = oS.GifHTML;

    var d = function d(h) {
      var i = oS,
          g = $User.Visitor;
      NewImg("imgGrowSoil", "images/interface/GrowSoil.gif", "visibility:hidden;z-index:50", EDAll);
      NewImg("imgGrowSpray", "images/interface/GrowSpray.gif", "visibility:hidden;z-index:50", EDAll);
      NewEle("dTitle", "div", 0, 0, $("dBody"));
      innerText(ESSunNum, i.SunNum);
      InitPCard();
      i.ShowScroll ? oSym.addTask(h == undefined ? 200 : h, function (j) {
        ClearChild(j);
        i.ScrollScreen();
      }, [NewEle("DivParty", "div", $__language_Array__["a1ac938d62a4d5036abe3cd6ccbc6e0c"], {
        innerHTML: (Math.floor(g.UserAuthority) == "255" ? '<span style="color:#CE9A00;font-size:40px">&lt;' + g.UserName + "&gt;</span>" : "&lt;" + g.UserName + "&gt;") + $__language_Array__["d0239ca7a283152a31169e8185f9d2ff"]
      }, EDAll)]) : (SetVisible($("dMenu")), AutoSelectCard(), LetsGO());
    };

    f.LoadAccess ? f.LoadAccess(d) : d();
  },
  ScrollScreen: function ScrollScreen() {
    (EDAll.scrollLeft += 25) < 500 ? oSym.addTask(2, arguments.callee, []) : (DisplayZombie(), SetVisible($("dMenu")), oS.CanSelectCard ? SetVisible($("dTop"), $("dSelectCard"), $("dCardList")) : (AutoSelectCard(), oSym.addTask(200, oS.ScrollBack, [LetsGO])));
  },
  ScrollBack: function ScrollBack(a) {
    SetHidden($("dZombie"), $("dSelectCard"), $("dTitle"), $("dCardList"));
    $("tGround").style.left = "-115px";
    $("dZombie").innerHTML = "";

    (function (c) {
      var b = EDAll.scrollLeft;
      (b -= 25) > 0 ? (EDAll.scrollLeft = b, oSym.addTask(2, arguments.callee, [c])) : (EDAll.scrollLeft = 0, c());
    })(a);
  }
},
    oCoord = {
  1: function _() {
    oS.R = 5;

    ChosePlantX = function ChosePlantX(a) {
      return Compare(GetC(a), 1, oS.C, GetX);
    };

    ChosePlantY = function ChosePlantY(a) {
      return $SSml(a, [86, 181, 281, 386, 476], [[75, 0], [175, 1], [270, 2], [380, 3], [470, 4], [575, 5]]);
    };

    GetC = function GetC(a) {
      return $SSml(a, [-50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    };

    GetR = function GetR(a) {
      return $SSml(a, [86, 181, 281, 386, 476], [0, 1, 2, 3, 4, 5]);
    };

    GetX = function GetX(a) {
      return $SEql(a, {
        "-2": -50,
        "-1": 100,
        0: 140,
        1: 187,
        2: 267,
        3: 347,
        4: 427,
        5: 507,
        6: 587,
        7: 667,
        8: 747,
        9: 827,
        10: 865,
        11: 950
      });
    };

    GetY = function GetY(a) {
      return $SEql(a, {
        0: 75,
        1: 175,
        2: 270,
        3: 380,
        4: 470,
        5: 575
      });
    };

    GetY1Y2 = function GetY1Y2(a) {
      return $SEql(a, {
        0: [0, 85],
        1: [86, 180],
        2: [181, 280],
        3: [281, 385],
        4: [386, 475],
        5: [476, 600]
      });
    };

    GetX1X2 = function GetX1X2(a) {
      return $SEql(a, {
        "-2": [-100, -49],
        "-1": [-50, 99],
        0: [100, 139],
        1: [140, 219],
        2: [220, 294],
        3: [295, 378],
        4: [379, 459],
        5: [460, 539],
        6: [540, 624],
        7: [625, 694],
        8: [695, 774],
        9: [775, 854],
        10: [855, 934],
        11: [950, 1030]
      });
    };

    !oS.InitLawnMower && (oS.InitLawnMower = function () {
      var a = 6;

      while (--a) {
        CustomSpecial(oLawnCleaner, a, -1);
      }
    });
    oS.GifHTML = "";
  },
  2: function _() {
    oS.R = 6;

    ChosePlantX = function ChosePlantX(a) {
      return Compare(GetC(a), 1, oS.C, GetX);
    };

    ChosePlantY = function ChosePlantY(a) {
      return $SSml(a, [86, 171, 264, 368, 440, 532], [[75, 0], [161, 1], [254, 2], [358, 3], [430, 4], [524, 5], [593, 6]]);
    };

    GetC = function GetC(a) {
      return $SSml(a, [-50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    };

    GetR = function GetR(a) {
      return $SSml(a, [86, 171, 264, 368, 440, 532], [0, 1, 2, 3, 4, 5, 6]);
    };

    GetX = function GetX(a) {
      return $SEql(a, {
        "-2": -50,
        "-1": 100,
        0: 140,
        1: 187,
        2: 267,
        3: 347,
        4: 427,
        5: 507,
        6: 587,
        7: 667,
        8: 747,
        9: 827,
        10: 865,
        11: 950
      });
    };

    GetY = function GetY(a) {
      return $SEql(a, {
        0: 75,
        1: 165,
        2: 253,
        3: 355,
        4: 430,
        5: 522,
        6: 587
      });
    };

    GetY1Y2 = function GetY1Y2(a) {
      return $SEql(a, {
        0: [0, 85],
        1: [86, 170],
        2: [171, 263],
        3: [264, 367],
        4: [368, 439],
        5: [440, 531],
        6: [532, 600]
      });
    };

    GetX1X2 = function GetX1X2(a) {
      return $SEql(a, {
        "-2": [-100, -49],
        "-1": [-50, 99],
        0: [100, 139],
        1: [140, 219],
        2: [220, 294],
        3: [295, 378],
        4: [379, 459],
        5: [460, 539],
        6: [540, 624],
        7: [625, 694],
        8: [695, 774],
        9: [775, 854],
        10: [855, 934],
        11: [950, 1030]
      });
    };

    !oS.InitLawnMower && (oS.InitLawnMower = function () {
      CustomSpecial(oLawnCleaner, 1, -1);
      CustomSpecial(oLawnCleaner, 2, -1);
      CustomSpecial(oPoolCleaner, 3, -1);
      CustomSpecial(oPoolCleaner, 4, -1);
      CustomSpecial(oLawnCleaner, 5, -1);
      CustomSpecial(oLawnCleaner, 6, -1);
    });
    oS.GifHTML = '<img style="position:absolute;left:0px;top:0px" src="images/xiyoures/background' + (oS.DKind ? 3 : 4) + '_.gif">';
    !oS.DKind && oGd.MakeFog();
  }
},
    oCoord1 = {
  1: function _() {
    oS.R = 5;
    oS.GifHTML = '<img style="position:absolute;left:0px;top:0px" src="images/xiyoures/background' + (oS.DKind ? 3 : 4) + '_.gif">';
    !oS.DKind && oGd.MakeFog();
  }
},
    operateDynamicDifficulty = function operateDynamicDifficulty(val, absolute, noCorrect) {
  if (val === void 0) {
    val = null;
  }

  if (absolute === void 0) {
    absolute = false;
  }

  if (noCorrect === void 0) {
    noCorrect = false;
  } //动态难度设置


  var num = Number.parseInt(getCookie("JNG_ZL_DYNAMIC_DIFFICULTY_WINRATE")) || 0;

  if (val === null) {
    return Math.round(num / 2);
  }

  if (absolute) {
    num = val;
  } else {
    if (noCorrect) {
      num += val;
    } else {
      if (val < 0 && num + val >= 4) {
        num = 0;
      } else if (val > 0 && num + val <= -4) {
        num = -4;
      } else {
        num += val;
      }
    }
  }

  num = Math.min(10, Math.max(-10, num));
  addCookie("JNG_ZL_DYNAMIC_DIFFICULTY_WINRATE", num);
  return Math.round(num / 2);
},
    oP = {
  Init: function Init(a) {
    var r = this;
    r.NumZombies = r.FlagZombies = 0;

    if (a) {
      var l;

      for (l in a) {
        r[l] = a[l];
      }

      var tmpEnd = oP.FlagToEnd;

      oP.FlagToEnd = function (_) {
        tmpEnd();

        if (oS.DynamicDifficulty) {
          operateDynamicDifficulty(1);
        }
      };

      if (oS.DynamicDifficulty) {
        var calcFunc = function calcFunc(last, now) {
          //计算动态难度
          if (_config_diff == 0 || !last || !now) {
            return 0;
          }

          var arr = [0, 1, 2, 1, 0];
          var sum = 0;
          var flag = last + 1;
          now = Math.min(now, last + 30);
          var delta = 10 - 1.5 * Math.floor(Math.abs(_config_diff / 1.5));

          for (var _i = 0; _i < last / delta; _i++) {
            for (var j in arr) {
              arr[j] = arr[j] + 0.2;
            }
          }

          for (var _i2 = last + 1; _i2 <= now; _i2++) {
            if (_config_diff > 0) {
              sum += arr[(_i2 - 1) % arr.length];
            } else {
              sum -= arr[(_i2 - 1) % arr.length];
            }

            if (_i2 - flag > delta) {
              for (var _j in arr) {
                arr[_j] = Math.min(16, Math.floor(arr[_j] + 1));
              }

              flag = _i2;
            }
          }

          sum = Math.round(sum / Math.max(1, now - last));
          return sum;
        };

        var _config_diff = operateDynamicDifficulty();

        for (var _i3 = 0; _i3 < oP.FlagToSumNum.a2.length; _i3++) {
          var originalNum = oP.FlagToSumNum.a2[_i3];
          oP.FlagToSumNum.a2[_i3] += calcFunc(_i3 - 1 >= 0 ? oP.FlagToSumNum.a1[_i3 - 1] : 0, _i3 >= oP.FlagToSumNum.a1.length ? oP.FlagNum : oP.FlagToSumNum.a1[_i3]);
          oP.FlagToSumNum.a2[_i3] = Math.round(oP.FlagToSumNum.a2[_i3] * (1 + operateDynamicDifficulty() / 7));
          oP.FlagToSumNum.a2[_i3] = Math.max(oP.FlagToSumNum.a2[_i3], 1);

          if (originalNum == 0 && oP.FlagToSumNum.a2[_i3] > 0) {
            oP.FlagToSumNum.a2[_i3] = 0;
          }
        }
      }

      if (a.AZ) {
        var k,
            b = {},
            g,
            c,
            q,
            p,
            d,
            m = [],
            h,
            e,
            n;
        r.ArZ = [];
        h = (k = r.AZ).sort(function (i, f) {
          return i[2] - f[2];
        }).length;

        while (h--) {
          c = (n = k[h])[0];
          q = n[1];
          p = n[2];

          while (q--) {
            m.push([c, p]);
          }

          if (d = n[3]) {
            e = d.length;

            while (e--) {
              b[g = d[e]] ? b[g].push(c) : b[g] = [c];
            }
          }
        }

        r.AZ = m;
        r.MustShowAtFlag = b;
      }
    }

    a && a.FlagNum ? (r.FlagHeadStep = Math.floor(140 / (a.FlagNum - 1)), r.MonPrgs = function () {
      var u = oP,
          j,
          i = u.FlagZombies,
          s,
          t,
          f = $User.Visitor;
      ! --u.NumZombies && (i < u.FlagNum ? (u.ReadyFlag = ++i, oSym.addTask(500, u.FlagPrgs, [])) : (u.FlagToEnd(), f.SaveLvlCallBack && f.SaveLvlCallBack({
        UserName: f.UserName,
        SunNum: oS.SunNum,
        Lvl: s,
        T: oSym.Now - oS.StartTime
      }), !isNaN(Math.floor(s)) && (t = $("dAdventure"), $User.Visitor.Progress = ++s, t.firstChild.innerHTML = Math.ceil(s / 10), t.childNodes[1].innerHTML = (s = s - Math.floor(s / 10) * 10) ? s : s + 1), NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:255", 0, EDAll), PauseGame($("dMenu0"), 1)));
    }) : r.MonPrgs = function () {};
    (!a || !a.FlagToEnd) && (r.FlagToEnd = function () {
      NewImg("1imgSF", "images/interface/PVE_Won.png", "left:0px;top:0px;z-index:555", EDAll, {});
      NewImg("imgSF", "images/interface/PassLevel_Continue.png", "left:357px;top:490px;z-index:557", EDAll, {
        onclick: function onclick() {
          SelectModal("HomeTown");
        }
      });
    });
  },
  AddZombiesFlag: function AddZombiesFlag(d) {
    var g = oP,
        c = oS.LargeWaveFlag,
        e,
        b = g.FlagHeadStep,
        a = g.FlagNum;
    SetVisible($("imgGQJC"), $("dFlagMeterContent"));

    for (e in c) {
      Math.floor(e) < a ? SetStyle(c[e], {
        visibility: "visible",
        left: 150 - (e - 1) * b + "px"
      }) : SetVisible(c[e]);
    }

    PlayAudio("awooga");
    $User.HTML5 && function () {
      oSym.addTask(2000, function () {
        [function () {
          PlayAudio(["groan1", "groan2"][Math.floor(Math.random() * 2)]);
        }, function () {
          PlayAudio(["groan3", "groan4"][Math.floor(Math.random() * 2)]);
        }, function () {
          PlayAudio(["groan5", "groan6"][Math.floor(Math.random() * 2)]);
        }, function () {
          PlayAudio("groan1");
          oSym.addTask(150, function () {
            PlayAudio("groan5");
          }, []);
        }, function () {
          PlayAudio("groan2");
          oSym.addTask(150, function () {
            PlayAudio("groan6");
          }, []);
        }][Math.floor(Math.random() * 3)]();
        oSym.addTask(2000, arguments.callee, []);
      }, []);
    }();
    g.ReadyFlag = 1;
    g.FlagPrgs(d);
  },
  SelectFlagZombie: function SelectFlagZombie(j, d) {
    var e = oP,
        m = e.ArZ,
        k = e.AZ,
        s = k.length,
        q,
        r,
        i = [],
        g = 0,
        n = oS.LargeWaveFlag[d],
        c = false,
        h = !n ? 150 : (PlayAudio("siren"), n.style.top = "5px", --j, i[g++] = oS.FlagZombie || oFlagZombie, 30),
        p,
        b,
        f = e.MustShowAtFlag,
        a;

    while (s--) {
      if ((r = (q = k[s])[1]) > d) {
        break;
      } else {
        m.push(q[0]);
        --k.length;
        c = true;
      }
    }

    c && m.sort(function (t, l) {
      return t.prototype.Lvl - l.prototype.Lvl;
    });

    if (a = f[d]) {
      s = a.length;

      while (s--) {
        j -= (i[g++] = a[s]).prototype.Lvl;
      }
    }

    b = m[s = (p = m.length) - 1].prototype.Lvl;

    while (j > 0) {
      if (s && b > j) {
        while (--s && m[s].prototype.Lvl > j) {}

        p = s + 1;
        b = m[s].prototype.Lvl;
      }

      j -= (i[g++] = m[Math.floor(Math.random() * p)]).prototype.Lvl;
    }

    e.NumZombies += g;
    e.SetTimeoutZombie(i, h);
  },
  SelectFlagZombie1: function SelectFlagZombie1(d) {
    var h = oP,
        c = [],
        a = 0,
        g = h.ArZ,
        f = oS.LargeWaveFlag[h.FlagZombies],
        e = h.SumToZombie,
        b = !f ? 150 : (f.style.top = "5px", --d, c[a++] = oS.FlagZombie || oFlagZombie, 30);

    while (d > 0) {
      d -= (c[a++] = g[Math.floor(Math.random() * $SEql(d, e))]).prototype.Lvl;
    }

    h.NumZombies += a;
    h.SetTimeoutZombie(c, b);
  },
  SetTimeoutTomZombie: function SetTimeoutTomZombie(c) {
    var f = [],
        d = [],
        e = 0,
        a = c.length,
        b,
        g;

    for (b in oGd.$Tombstones) {
      g = b.split("_");
      d[e] = (f[e] = new c[Math.floor(Math.random() * a)]()).CustomBirth(g[0], g[1], 100);
      ++e;
    }

    this.AppearUP(d, f, e);
  },
  SetTimeoutWaterZombie: function SetTimeoutWaterZombie(j, b, e, h) {
    var f = oGd.$LF,
        l = [],
        c = f.length,
        m = [],
        k = [],
        g = h.length,
        a,
        d = b - j + 1;

    while (--c) {
      f[c] == 2 && l.push(c);
    }

    a = l.length;
    c = e;

    while (c--) {
      k[c] = (m[c] = new h[Math.floor(Math.random() * g)]()).CustomBirth(l[Math.floor(Math.random() * a)], Math.floor(j + Math.random() * d));
    }

    this.AppearUP(k, m, e);
  },
  AppearUP: function AppearUP(a, c, b) {
    oP.NumZombies += b;
    asyncInnerHTML(a.join(""), function (h, f) {
      EDPZ.appendChild(h);
      var e = f.length,
          g,
          d;

      while (e--) {
        g = f[e];
        g.Birth.call(g);
        SetBlock(g.Ele);
        oSym.addTask(10, function (l, k, i, j) {
          k = Math.max(k - j, 0);
          SetStyle(l, {
            top: k + "px",
            clip: "rect(0,auto," + (i += j + 1) + "px,0)"
          });
          k && oSym.addTask(10, arguments.callee, [l, k, i, j]);
        }, [g.EleBody, d = g.height, 0, d * 0.1]);
      }
    }, c);
  },
  SetTimeoutZombie: function SetTimeoutZombie(b, d) {
    var f = [],
        c = [],
        e = 0,
        g = 0,
        a = b.length;

    while (e < a) {
      c[e] = (f[e] = new b[e]()).prepareBirth(g);
      g += d;
      ++e;
    }

    asyncInnerHTML(c.join(""), function (k, j) {
      EDPZ.appendChild(k);
      var h = j.length;

      while (h--) {
        j[h].Birth();
      }
    }, f);
  },
  FlagPrgs: function FlagPrgs() {
    var f = oP,
        c = f.FlagZombies,
        e = f.FlagToSumNum,
        a = 139 - c * f.FlagHeadStep,
        d = $SSml(c, e.a1, e.a2),
        b;
    f.FlagNum > (c = ++f.FlagZombies) ? ($("imgFlagHead").style.left = a + "px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + (a + 11) + "px)", (b = $SEql(c, f.FlagToMonitor)) && oSym.addTask(1690, function (g) {
      !g[1] && (g[0](), g[1] = 1);
    }, [b]), oSym.addTask(1990, function (g) {
      var h = oP;
      h.ReadyFlag == g++ && (h.ReadyFlag = g, h.FlagPrgs());
    }, [c])) : ($("imgFlagHead").style.left = "-1px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)");
    f.SelectFlagZombie.call(f, d, c);
    f.UserDefinedFlagFunc && f.UserDefinedFlagFunc();
  },
  Monitor: function Monitor(a, b) {
    a && a.f.apply(a.f, a.ar);
    oP.UserDefinedFlagFunc = b ? b : null;

    (function () {
      oZ.traversalOf();
      oSym.addTask(10, arguments.callee, []);
    })();
  }
},
    QinBossZ = function QinBossZ() {
  ClearChild($("1imgSF"));

  if ($("boss0")) {
    ClearChild($("boss0"));
  }

  NewImg("boss0", "images/interface/Qin_Boss_Atk.gif", "left:627px;top:128px;z-index:254", EDAll);
  oSym.addTask(300, function () {
    ClearChild($("boss0"));
    NewImg("boss0", "images/interface/Qin_Boss_Idle.gif", "left:627px;top:128px;z-index:254", EDAll);
  }, []);
},
    QinBossD = function QinBossD() {
  ClearChild($("boss0"));
  ClearChild($("1imgSF"));
  NewImg("boss1", "images/interface/Qin_Boss_Atk.gif", "left:627px;top:128px;z-index:254", EDAll);
  var a = oPlantBreak;
  CustomSpecial(a, 1, 1);
  CustomSpecial(a, 1, 3);
  CustomSpecial(a, 1, 5);
  CustomSpecial(a, 2, 2);
  CustomSpecial(a, 2, 4);
  CustomSpecial(a, 3, 1);
  CustomSpecial(a, 3, 3);
  CustomSpecial(a, 3, 5);
  CustomSpecial(a, 4, 2);
  CustomSpecial(a, 4, 4);
  CustomSpecial(a, 5, 1);
  CustomSpecial(a, 5, 3);
  CustomSpecial(a, 5, 5);
  oSym.addTask(300, function () {
    ClearChild($("boss1"));
    NewImg("boss2", "images/interface/Qin_Boss_Idle.gif", "left:627px;top:128px;z-index:254", EDAll);
  }, []);
},
    QinBossZ1 = function QinBossZ1() {
  ClearChild($("boss2"));
  NewImg("boss2", "images/interface/Qin_Boss_Atk.gif", "left:627px;top:128px;z-index:254", EDAll);
  oSym.addTask(300, function () {
    ClearChild($("boss2"));
    NewImg("boss2", "images/interface/Qin_Boss_Idle.gif", "left:627px;top:128px;z-index:254", EDAll);
  }, []);
},
    QinBossK = function QinBossK() {
  ClearChild($("boss2"));
  NewImg("boss3", "images/interface/Qin_Boss_Atk.gif", "left:627px;top:128px;z-index:254", EDAll);
  NewEle(0, "div", "width:1400px;height:600px;margin:0px 0 0 0px;position:absolute;z-index:1;background:url(images/interface/background5.jpg)", 0, $("tGround"));
  var a = oMudBreak;
  CustomSpecial(a, 1, 1);
  CustomSpecial(a, 1, 2);
  CustomSpecial(a, 1, 3);
  CustomSpecial(a, 2, 3);

  for (i = 3; i < 8; i++) {
    CustomSpecial(a, 3, i);
  }

  oSym.addTask(300, function () {
    ClearChild($("boss3"));
    NewImg("boss4", "images/interface/Qin_Boss_Idle.gif", "left:627px;top:128px;z-index:254", EDAll);
  }, []);
},
    QinBossZ2 = function QinBossZ2() {
  ClearChild($("boss2"));
  ClearChild($("boss4"));
  NewImg("boss4", "images/interface/Qin_Boss_Atk.gif", "left:627px;top:128px;z-index:254", EDAll);
  oSym.addTask(300, function () {
    ClearChild($("boss4"));
    ClearChild($("boss2"));
    NewImg("boss4", "images/interface/Qin_Boss_Idle.gif", "left:627px;top:128px;z-index:254", EDAll);
  }, []);
},
    QinBossDie = function QinBossDie() {
  ClearChild($("bossshadow"), $("boss5"), $("boss4"));
  NewImg("boss5", "images/interface/Qin_Boss_Die.gif", "left:627px;top:128px;z-index:254", EDAll);
  NewImg("bossshadow2", "images/interface/Qin_Boss_Die_BlackHole.png", "left:707px;top:152px", EDAll);
  oSym.addTask(500, function () {
    ClearChild($("bossshadow2"));
  }, []);
},
    oGd = {
  Init: function Init() {
    this.$ = [];
    this.$Crater = [];
    this.$Tombstones = {};
    this.$Torch = [];
    this.$Pine = [];
    this.$Plantern = [];
    this.$LF = oS.LF;
    this.$ZF = oS.ZF;
    this.$Ice = [];
    this.$JackinTheBox = 0;
    this.$Balloon = new Array(oS.R + 1);
    this.$BlueBerryObject = new Array(oS.R + 1);
    this.$Fog = [];
  },
  add: function add(c, a, b, d) {
    (b = (d = this.$)[a]) && b.Die();
    d[a] = c;
  },
  del: function del(a) {
    delete this.$[a.R + "_" + a.C + "_" + a.PKind];
  },
  MakeFog: function MakeFog() {
    var d = "",
        g = tx = ri = cj = 0,
        c = oGd.$Fog,
        b,
        a = 2 * oS.HaveFog + 3,
        e = function () {
      return function (f) {
        var h = $User.Browser.IE && !$User.Browser.IE9;
        d += '<img id="' + f + '" src="images/interface/fog' + Math.floor(Math.random() * 4) + "." + (h ? "gif" : "png") + '" style="left:' + g + "px;top:" + tx + 'px">';
      };
    }();

    for (ri = 1, tx = 0; ri < 7; g = 0, ri++) {
      for (ci = 0; ci <= a; ci++) {
        e(c[b = ri + "_" + ci] = "Fog" + b);
        g += 35;
      }

      tx += 90;
    }

    NewEle("dFog", "div", "", {
      innerHTML: d
    }, EDAll);
  },
  MoveFogLeft: function MoveFogLeft(a) {
    (function (c, d, b, e) {
      d -= 50;
      d > b ? (c.style.left = d + "px", oSym.addTask(5, arguments.callee, [c, d, b, e])) : (c.style.left = b + "px", e && e());
    })($("dFog"), 900, GetX(oS.C - oS.HaveFog) - 30, a);
  },
  MoveFogRight: function MoveFogRight() {
    if (arguments.callee.caller.caller == null) {
      return;
    }

    (function (a, b) {
      (b += 50) < 901 ? (a.style.left = b + "px", oSym.addTask(5, arguments.callee, [a, b])) : a.style.left = "900px";
    })($("dFog"), GetX(oS.C - oS.HaveFog) - 3);
  },
  GatherFog: function GatherFog(d, r, x, t, z) {
    var c = d - x,
        b = d + x,
        q = r - t,
        p = r + t,
        e = [SetNone, SetBlock][z],
        w = oS.C,
        m = oS.R,
        h = w + 1,
        g = oS.HaveFog,
        a = g * 2,
        k = [],
        l,
        j,
        u,
        n = function n(i) {
      return (i - w) * 2 + a;
    },
        s = function s(i) {
      return (i - w) * 2 + a - 2;
    };

    if (c > 0) {
      l = s(q > 0 ? q + 1 : 1);
      j = n(p > h ? h : p - 1);

      do {
        l > -1 && k.push("Fog" + c + "_" + l);
      } while (l++ < j);
    }

    if (b <= m) {
      l = s(q > 0 ? q + 1 : 1);
      j = n(p > h ? h : p - 1);

      do {
        l > -1 && k.push("Fog" + b + "_" + l);
      } while (l++ < j);
    }

    ++c;
    --b;
    l = s(q < 1 ? 1 : q);
    j = n(p > h ? h : p);
    u = l;

    do {
      do {
        l > -1 && k.push("Fog" + c + "_" + l);
      } while (l++ <= j);

      l = u;
    } while (c++ < b);

    for (l = 0; l < k.length; e($(k[l])), l++) {}

    if (z) {
      var y = oGd.$Torch,
          f;

      for (u in y) {
        f = $P[y[u]];
        this.GatherFog(f.R, f.C, 1, 1, 0);
      }

      b = oGd.$Plantern;

      for (w in b) {
        g = $P[b[w]];
        this.GatherFog(g.R, g.C, 2, 3, 0);
      }
    }
  }
},
    oZ = {
  Init: function Init(b) {
    this.$ = [];
    this.$R = [];
    var a;

    for (a = b; a; this.$[a] = [], this.$R[a--] = []) {}
  },
  add: function add(b, a) {
    (a = oZ.$[b.R]).push(b);
    a.sort(function (d, c) {
      return d.AttackedLX - c.AttackedLX;
    });
    a.RefreshTime = oSym.Now;
  },
  getZ0: function getZ0(b, d) {
    if (d < 1 || d > oS.R) {
      return;
    }

    var c = 0,
        e = this.$[d],
        f,
        a = e.length;

    while (c < a && (f = e[c++]).AttackedLX <= b) {
      if (f.PZ && f.HP && f.AttackedRX >= b) {
        return f;
      }
    }
  },
  getZ1: function getZ1(h, b) {
    if (b < 1 || b > oS.R) {
      return;
    }

    var d = 0,
        j = this.$[b],
        f = this.$R[b],
        g,
        c,
        k,
        e;
    (k = j.RefreshTime) == f.RefreshTime ? g = f : (g = (this.$R[b] = j.slice(0)).sort(function (l, i) {
      return i.AttackedRX - l.AttackedRX;
    })).RefreshTime = k;
    e = g.length;

    while (d < e && (c = g[d++]).AttackedRX >= h) {
      if (c.PZ && c.HP && c.AttackedLX <= h) {
        return c;
      }
    }
  },
  getArZ: function getArZ(e, d, b) {
    var g = 0,
        l = this.$[b],
        f = [],
        k = 0,
        c,
        h = l.length,
        j;

    while (g < h && (j = (c = l[g++]).AttackedLX) < d) {
      c.PZ && c.HP && (j > e || c.AttackedRX > e) && (f[k++] = c);
    }

    return f;
  },
  getRangeLeftZ: function getRangeLeftZ(e, d, b) {
    if (b < 1 || b > oS.R) {
      return;
    }

    var g = 0,
        l = this.$[b],
        f = [],
        k = 0,
        c,
        h = l.length,
        j;

    while (g < h && (j = (c = l[g++]).AttackedLX) < d) {
      if (c.PZ && c.HP && (j > e || c.AttackedRX > e)) {
        return c;
      }
    }

    return;
  },
  moveTo: function moveTo(g, f, c) {
    var b = this.$[f],
        a = this.$[c],
        e = b.length,
        d;

    while (e--) {
      (o = b[e]).id == g && (b.splice(e, 1), o.R = c, a.push(o), a.sort(function (i, h) {
        return i.AttackedLX - h.AttackedLX;
      }).RefreshTime = b.RefreshTime = oSym.Now, e = 0);
    }
  },
  traversalOf: function traversalOf() {
    var a,
        b = this.$,
        j,
        l = 0,
        d = 0,
        k = 1000,
        i,
        h,
        f = [function (n) {
      d = 1;
      k = i;
    }, function (n) {
      (i = n.AttackedLX) > k && (l = d = 1);
      k = i;
    }],
        e = b.length,
        m,
        c,
        g;

    (function (r) {
      var q = (j = b[r]).length,
          n = arguments.callee,
          p = oT.$[r],
          s = oT.$L[r];

      while (q--) {
        a = j[q];
        a.HP && a.PZ && a.ZX < 901 && oT["chkD" + a.WalkDirection](a, r, p, s);
        !a.HP ? (j.splice(q, 1), f[0](a)) : f[a.ChkActs(a, r, j, q)](a);
      }

      l ? (l = d = 0, j.sort(function (u, t) {
        return u.AttackedLX - t.AttackedLX;
      }), j.RefreshTime = oSym.Now) : d && (d = 0, j.RefreshTime = oSym.Now);
      --r && oSym.addTask(0, n, [r]);
    })(b.length - 1);
  }
},
    oT = {
  Init: function Init(b) {
    this.$ = [];
    this.$L = [];

    for (var a = b; a;) {
      this.$[a] = [];
      this.$L[a--] = [];
    }
  },
  add: function add(f, c, g) {
    if (f <= 0 || f > oS.R) {
      return;
    }

    var e = this.$[f],
        d = c.length,
        b;

    while (d--) {
      b = c[d];
      e.push([b[0], b[1], b[2], g]);
    }

    e.sort(function (i, h) {
      return h[1] - i[1];
    });
    e.RefreshTime = new Date();
  },
  chkD0: function chkD0(g, e, d, h) {
    var f = g.AttackedLX,
        c = 0,
        b,
        a;

    while (c < d.length && (b = d[c])[1] >= f) {
      (a = $P[b[3]]).canTrigger && b[0] <= f && a.TriggerCheck(g, b[2], c);
      ++c;
    }
  },
  chkD1: function chkD1(b, e, c, g) {
    var j = b.AttackedLX,
        h = b.AttackedRX,
        f = 0,
        m,
        l,
        d,
        a,
        k;
    (l = c.RefreshTime) == g.RefreshTime ? m = g : (m = (this.$L[e] = c.slice(0)).sort(function (n, i) {
      return n[0] - i[0];
    })).RefreshTime = l;

    while (f < m.length && (d = m[f])[0] <= h) {
      (a = $P[d[3]]).canTrigger && d[1] >= h && a.TriggerCheck(b, d[2], f);
      ++f;
    }
  },
  delP: function delP(e) {
    var b = e.oTrigger,
        f = e.id,
        d,
        a,
        c;

    for (d in b) {
      for (c = (a = this.$[d]).length; c--; a[c][3] == f && a.splice(c, 1)) {}

      a.RefreshTime = new Date();
    }
  },
  indexOf: function indexOf(j, d) {
    var f = new RegExp(d + ",", "g"),
        h = (j.toString() + ",").replace(f, "┢,").replace(/[^,┢]/g, ""),
        i = 0,
        g = 0,
        b = [];

    for (; (g = h.indexOf("┢", g)) > 0; b.push((g++ - i++ - 2) / 3)) {}

    return b;
  }
},
    //植物僵尸卡片对象
PZCard = {
  Init: function Init() {
    var _this$PData;

    this.PData = (_this$PData = {
      0: oPeashooter,
      1: oSunFlower,
      2: oCherryBomb,
      3: oWallNut,
      54: oHotPotato,
      4: oPotatoMine,
      5: oSnowPea,
      6: oChomper,
      7: oRepeater,
      8: oPuffShroom,
      9: oSunShroom,
      10: oFumeShroom,
      11: oGraveBuster,
      12: oHypnoShroom,
      13: oPumpkinHead,
      14: oIceShroom,
      15: oDoomShroom,
      16: oLilyPad,
      17: oSquash,
      18: oThreepeater,
      20: oJalapeno,
      21: oSpikeweed,
      22: oTorchwood,
      23: oTallNut,
      24: oSeaShroom,
      25: oPlantern,
      26: oCactus,
      27: oBlover,
      28: oSplitPea,
      29: oStarfruit,
      35: oCoffeeBean,
      41: oTwinSunflower,
      42: oGloomShroom,
      43: oCattail,
      46: oSpikerock,
      47: ohuoPeashooter,
      48: ofumeinter,
      49: omarigrass,
      50: oPumpkinHead,
      51: opowerlily,
      52: osnowre,
      53: oLOVEFAN
    }, _this$PData["54"] = oyangqizao, _this$PData[55] = oBL, _this$PData[56] = oDandelion, _this$PData[57] = oTileTurnip, _this$PData[58] = oLittleCherry, _this$PData[59] = oDirtyApple, _this$PData[60] = oTangleKlep, _this$PData[61] = oMushroom, _this$PData[62] = oFumeShroomSong, _this$PData[63] = oXshot, _this$PData[64] = oLavaGrava, _this$PData[65] = oBubbleFlower, _this$PData[66] = oThunderPine, _this$PData[67] = oOxygen, _this$PData[68] = oShuilei, _this$PData[69] = oMagicShroom, _this$PData[70] = oRoseMan, _this$PData[71] = oLaserBean, _this$PData[72] = oFD, _this$PData[78] = oLitchi, _this$PData[79] = oBB, _this$PData[80] = oStallia, _this$PData[81] = oBamboo, _this$PData[82] = oCGTree, _this$PData[83] = oLotus, _this$PData[84] = oCactus, _this$PData[85] = oPlantern, _this$PData[86] = oBlueBerry, _this$PData[87] = oaneone, _this$PData[88] = oPrimnalPea, _this$PData[89] = oPrimnalNut, _this$PData[90] = oColdnap, _this$PData[91] = oShrubbery, _this$PData[92] = oXiaoLaserBean, _this$PData["Bow_0"] = oNutBowling, _this$PData["Bow_1"] = oHugeNutBowling, _this$PData["Bow_2"] = oBoomNutBowling, _this$PData);
    this.ZData = {
      0: oZombie,
      1: oFlagZombie,
      2: oConeheadZombie,
      3: oBucketheadZombie,
      5: oCowBoy,
      6: oBiluZZ,
      7: oBull,
      8: oPatterZombie,
      9: oPZombie,
      10: oRollerZombie,
      11: oSarZombie,
      12: oSeagullZombie,
      13: oBackerZombie,
      14: oScreenZ,
      15: oLostCityZombie,
      99: oBikiniZombie,
      98: oKnife,
      97: oGongfujiangshi,
      96: oCavesZombie,
      95: oPlayLionZombie,
      94: oPOIZombie,
      93: oWZZombie,
      92: oNomrolZombie,
      4: oJetPack,
      100: oTouZombie,
      101: oJaneZombie,
      102: oSeaBasic,
      103: oSeaFlag,
      104: oSeaShrimp,
      105: oSeaConch,
      106: oSeaGui,
      107: oSeaXie,
      108: oSeaBoss,
      109: oSeaJelly,
      110: oSeaBengGu,
      111: oJWZ,
      112: oJWC,
      113: oJWG,
      114: oJWTA,
      115: oJWLF,
      116: oJWBT,
      117: oJWCG,
      118: oBalloonZombie,
      119: oJWBZ,
      120: oJWHX
    };
  },
  trans: function trans(ar, inx, undefined) {
    //把关卡定义的PName,ZName的[0,1,2]形式转化成[oZombie]的形式
    if (ar == undefined || ar.length == 0) return [];
    var i = 0,
        l = ar.length,
        PZ = [this.PData, this.ZData][inx];

    do {
      ar[i] = PZ[ar[i]];
    } while (++i < l);

    return ar;
  }
},
    //图鉴对象
Almanac = {
  Init: function Init() {
    //图鉴总框
    NewEle("dHandBook", "div", 0, 0, document.body, {
      class: "WindowFrame"
    }).innerHTML = $__language_Array__["9cbd0ca75c0618e6af1767b13f28debf"]; //植物和僵尸图鉴

    NewEle("dHandBookPZ", "div", 0, 0, document.body, {
      class: "WindowFrame Almanac_PlantBack"
    }).innerHTML = $__language_Array__["4864d30c7fcbafcb83a63325f240bea8"]; //生成初始界面的图鉴标签

    $("iSurfaceBackground").insertBefore(NewEle("dHandBookIcon", "div", 0, {
      onmouseover: function onmouseover() {
        this.style.backgroundPosition = "bottom";
        PlayAudio("bleep");
      },
      onmouseout: function onmouseout() {
        this.style.backgroundPosition = "top";
      },
      onclick: Almanac.ViewHandBook
    }, 0, {
      class: "handbook"
    }), $("ZombieHand"));
    this.isReady = true;
  },
  //关闭图鉴
  CloseHandBook: function CloseHandBook() {
    PlayAudio("tap");
    StopAudio("");
    oS.LvlEName ? ResetGame($("dMenu0")) : oSym.addTask(100, AllAudioPauseCanceled);
    SetNone($("dHandBookP"), $("dHandBookZ"));
    SetHidden($("dHandBookPZ"), $("dHandBook"));
  },
  Clear: function Clear() {
    //清除图鉴大框架，植物僵尸图鉴，图鉴图标，右下角图鉴按钮
    ClearChild($("dHandBook"), $("dHandBookPZ"), $("dHandBookIcon"), $("bShowHandBook"));
    this.isReady = false;
    $User.Visitor.OpenAlmanac = 0; //默认不开启图鉴
  },
  //标记图鉴是否已经初始化
  isReady: false,
  //查看图鉴
  ViewHandBook: function ViewHandBook() {
    if (!Almanac.isReady) {
      alert($User.Visitor.UserName == $__language_Array__["3b3b82dccb43d51589b93ef6dfff281e"] ? $__language_Array__["1ad10f60fa06f1272ff12bf81265a625"] : $__language_Array__["396c91f70d1ecce9c7243116bb8c1054"]);
      return;
    }

    SetNone($("dOptionsMenubackShadow"), $("dOptionsMenuback"), $("dOptionsMenu"));
    oS.LvlEName ? (AllAudioPaused(), PlayAudio("gravebutton"), SetNone($("dSurface")), oSym.Stop(), innerText($("dMenu0"), $__language_Array__["ae228c7d4f933cfcc2d1f325d1488dd9"]), $("dMenu1").onclick = null) : (AllAudioPaused(), PlayAudio("tap"));
    PlayAudio("");
    SetVisible($("dHandBook"));
  },
  InitHandBookPCard: function InitHandBookPCard() {
    //初始化植物图鉴
    PlayAudio("gravebutton");
    var s = "",
        P,
        EName,
        PData = PZCard.PData,
        i = 0,
        Pro,
        AlPInx = $User.Visitor.AlPInx,
        L = AlPInx.length,
        CardNum = 0;

    while (i < L) {
      AlPInx.substr(i, 1) == 1 ? (EName = (Pro = (P = PData[i]).prototype).EName, s += '<div class="span1" onclick="Almanac.ViewProducePlant(' + EName + ')"><img src="' + Pro.PicArr[0] + '"><div class="span2">' + Pro.SunNum + "</div></div>", ++CardNum) : s += '<div class="span1"></div>';
      ++i; //i++%4==5&&(s+='<br>');
    }

    $("dHandBookPCard").innerHTML = s;
    $("dHandBookPCard").style.overflowY = CardNum > 28 ? "auto" : "hidden";
    Almanac.ViewProducePlant(PData[0]);
    $("dHandBookPZ").className = "WindowFrame Almanac_PlantBack";
    SetVisible($("dHandBookPZ"));
    SetNone($("dHandBookZ"));
    SetBlock($("dHandBookP"));
  },
  InitHandBookZCard: function InitHandBookZCard() {
    //初始化僵尸图鉴
    PlayAudio("gravebutton");
    var s = "",
        P,
        EName,
        ZData = PZCard.ZData,
        i = 0,
        Pro,
        AlZInx = $User.Visitor.AlZInx,
        L = AlZInx.length,
        CardNum;

    while (i < L) {
      AlZInx.substr(i, 1) == 1 ? (EName = (Pro = (P = ZData[i]).prototype).EName, s += '<div class="span1" onclick="Almanac.ViewProduceZombie(' + EName + ')"><img src="' + Pro.PicArr[0] + '"><div class="span2">' + Pro.SunNum + "</div></div>", ++CardNum) : s += '<div class="span1"></div>';
      ++i;
    }

    $("dHandBookZCard").innerHTML = s;
    $("dHandBookPCard").style.overflowY = CardNum > 28 ? "auto" : "hidden";
    Almanac.ViewProduceZombie(ZData[0]);
    $("dHandBookPZ").className = "WindowFrame Almanac_ZombieBack";
    SetVisible($("dHandBookPZ"));
    SetNone($("dHandBookP"));
    SetBlock($("dHandBookZ"));
  },
  InitHandBookZCard2: function InitHandBookZCard2() {
    //初始化僵尸图鉴
    PlayAudio("gravebutton");
    var s = "",
        P,
        EName,
        ZData = PZCard.ZData,
        i = 0,
        Pro,
        AlZInx = $User.Visitor.AlZInx,
        L = AlZInx.length,
        CardNum;

    while (i < L) {
      AlZInx.substr(i, 1) == 1 ? (EName = (Pro = (P = ZData[i]).prototype).EName, s += '<div class="span1" onclick="Almanac.ViewProduceZombie(' + EName + ')"><img src="' + Pro.PicArr[0] + '"><div class="span2">' + Pro.SunNum + "</div></div>", ++CardNum) : s += '<div class="span1"></div>';
      ++i;
    }

    $("dHandBookZCard").innerHTML = s;
    $("dHandBookPCard").style.overflowY = CardNum > 28 ? "auto" : "hidden";
    Almanac.ViewProduceZombie(ZData[0]);
    $("dHandBookPZ").className = "WindowFrame Almanac_ZombieBack";
    SetVisible($("dHandBookPZ"));
    SetNone($("dHandBookP"));
    SetBlock($("dHandBookZ"));
  },
  ViewProducePlant: function ViewProducePlant(o) {
    PlayAudio("plant1"); //查看植物介绍

    var Pro = o.prototype;
    $("pHandBookPlant").style.backgroundImage = "url(" + Pro.PicArr[Pro.StaticGif] + ")";
    $("pHandBookPlant").style.backgroundPosition = "50% " + (90 - (Pro.height + Pro.GetDTop) * 0.5) + "px";
    $("dProducePlant").innerHTML = Pro.Produce;
    innerText($("dHandBookPlantName"), Pro.CName);
    innerText($("spSunNum"), Pro.SunNum + $__language_Array__["878ce089bccd280974e1725cfa3118f8"]);
    innerText($("spCoolTime"), Pro.coolTime + $__language_Array__["c5438c597cf8c7154fdaa03c58121cf2"]);
    innerText($("spHP"), Pro.HP + $__language_Array__["878ce089bccd280974e1725cfa3118f8"]);
    innerText($("spRange"), Pro.Range);
    $("pPlantBack").style.backgroundPosition = -200 * Pro.BookHandBack + "px 0";
  },
  ViewProduceZombie: function ViewProduceZombie(o) {
    PlayAudio("plant1"); //查看僵尸介绍

    var Pro = o.prototype;
    $("pHandBookZombie").style.background = "url(" + Pro.PicArr[Pro.StaticGif] + ") no-repeat scroll " + Pro.BookHandPosition;
    $("dProduceZombie").innerHTML = Pro.Produce;
    innerText($("dHandBookZombieName"), Pro.CName);
  },
  //返回图鉴索引
  ReturnHandBookInx: function ReturnHandBookInx() {
    PlayAudio("tap");
    SetNone($("dHandBookP"), $("dHandBookZ"));
    SetHidden($("dHandBookPZ"));
  },
  //根据关卡检查图鉴,把用户图鉴里没有的植物和僵尸添加入图鉴
  Check: function Check(PAr, ZAr) {
    //传递关卡植物和僵尸数据[0,1,2,3]格式
    if (!Almanac.isReady) return; //还未获得图鉴

    var Visitor = $User.Visitor,
        AlPInx = Visitor.AlPInx,
        AlZInx = Visitor.AlZInx,
        i,
        l = PAr.length,
        n,
        s,
        Inx = AlPInx.length - 1; //检查植物图鉴字符串

    for (i = 0; i < l; i++) {
      if (!isNaN(n = PAr[i]) && AlPInx.substr(n, 1) != 1) AlPInx = (n > 0 ? AlPInx.substr(0, n) : "") + 1 + AlPInx.substring(n + 1, Inx);
    }

    Visitor.AlPInx = AlPInx; //检查僵尸图鉴字符串

    l = ZAr.length;
    Inx = AlZInx.length - 1;

    for (i = 0; i < l; i++) {
      if (!isNaN(n = ZAr[i]) && AlZInx.substr(n, 1) != 1) AlZInx = (n > 0 ? AlZInx.substr(0, n) : "") + 1 + AlZInx.substring(n + 1, Inx);
    }

    Visitor.AlZInx = AlZInx;
  }
},
    asyncInnerHTML = function asyncInnerHTML(d, c, a) {
  var b = $n("div"),
      e = document.createDocumentFragment();
  b.innerHTML = d;

  (function (g) {
    var f = arguments.callee;
    g-- ? (e.appendChild(b.firstChild), setTimeout(function () {
      f(g);
    }, 0)) : c(e, a);
  })(b.childNodes.length);
},
    WhichMouseButton = function WhichMouseButton(a) {
  a = window.event || a;
  var b = $User.Browser;
  return !b.Gecko ? $SEql(a.button, {
    1: 1,
    0: b.IE ? 2 : 1,
    2: 2,
    default: 1
  }) : $SEql(a.which, {
    1: 1,
    3: 2,
    default: 1
  });
},
    GroundOnmousedown = function GroundOnmousedown(i) {
  i = window.event || i;
  var a = i.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
      k = i.clientY + EBody.scrollTop || EElement.scrollTop,
      g = ChosePlantX(a),
      h = ChosePlantY(k),
      d = g[0],
      c = h[0],
      f = h[1],
      b = g[1],
      j = GetAP(a, k, f, b);

  switch (oS.Chose) {
    case 1:
      WhichMouseButton(i) < 2 ? GrowPlant(j[0], d, c, f, b) : (PlayAudio("tap"), CancelPlant());
      break;

    case -1:
      WhichMouseButton(i) < 2 ? (PlayAudio("plant2"), ShovelPlant(j)) : (PlayAudio("tap"), CancelShovel());
  }
},
    GetAP = function GetAP(a, h, d, c) {
  var f,
      i = oGd.$,
      e,
      g = [],
      b;

  for (f = 0; f < 4; g.push(e = i[d + "_" + c + "_" + f++]), e && !(a < e.pixelLeft || a > e.pixelRight || h < e.pixelTop || h > e.pixelBottom) && (b = e)) {}

  return [g, b];
},
    GroundOnkeydown = function GroundOnkeydown(b) {
  var a;

  if ((a = (b || event).keyCode) == 27) {
    switch (oS.Chose) {
      case 1:
        CancelPlant();
        break;

      case -1:
        CancelShovel();
    }

    return false;
  } else {
    !oS.Chose && KeyBoardGrowPlant(a);
  }
},
    KeyBoardGrowPlant = function KeyBoardGrowPlant(b, a) {
  a = a || 0;

  if (b > 47 && b < 58) {
    switch (a) {
      case 0:
        ChosePlant({
          clientX: 450,
          clientY: 300
        }, String.fromCharCode(b));
    }
  }
},
    DayLevel = function DayLevel(a) {
  var d = new Date();
  var day = new Array(7);
  day[0] = "0"; //周末

  day[1] = "1";
  day[2] = "2";
  day[3] = "3";
  day[4] = "4";
  day[5] = "5";
  day[6] = "6";
  SelectModal(a + day[d.getDay()]);
},
    GroundOnmousemove = function GroundOnmousemove() {},
    GroundOnmousemove1 = function GroundOnmousemove1(j) {
  j = window.event || j;
  var d = j.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
      b = j.clientY + EBody.scrollTop || EElement.scrollTop,
      k = oS.ChoseCard,
      h = ChosePlantX(d),
      i = ChosePlantY(b),
      f = h[0],
      c = i[0],
      g = i[1],
      a = h[1],
      m = GetAP(d, b, g, a);
  var l = ArCard[k].PName.prototype;
  SetStyle($("MovePlant"), {
    left: d - 0.5 * (l.beAttackedPointL + l.beAttackedPointR) + "px",
    top: b + 20 - l.height + "px"
  });
  l.CanGrow(m[0], g, a) ? SetStyle($("MovePlantAlpha"), {
    visibility: "visible",
    left: f + l.GetDX() + "px",
    top: c - l.height + l.GetDY(g, a, m[0]) + "px"
  }) : SetHidden($("MovePlantAlpha"));
},
    GroundOnmousemove2 = function GroundOnmousemove2(k) {
  k = window.event || k;
  var d = k.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
      b = k.clientY + EBody.scrollTop || EElement.scrollTop,
      m = oS.ChoseCard,
      h = ChosePlantX(d),
      i = ChosePlantY(b),
      f = h[0],
      c = i[0],
      g = i[1],
      a = h[1],
      n = GetAP(d, b, g, a);
  var j = n[1],
      l = j ? j.id : "",
      p = oS.MPID;
  p != l && (p && SetAlpha($(p).childNodes[1], 100, 1), (oS.MPID = l) && SetAlpha($(l).childNodes[1], 60, 0.6));
  SetStyle($("tShovel"), {
    left: d - 15 + "px",
    top: b - 16 + "px"
  });
},
    DisplayZombie = function DisplayZombie() {
  SetVisible($("bShowHandBook"));
  var d = oP.AZ.slice(0),
      b = d.length,
      c,
      g,
      h = $("dZombie"),
      f = [],
      e = [],
      a;

  while (b--) {
    d[b][0].prototype.CanDiaplay == 0 && d.splice(b, 1);
  }

  c = b = d.length;

  while (c--) {
    f.push(Math.floor(150 + Math.random() * 444));
  }

  f.sort(function (j, i) {
    return j - i;
  });

  while (b) {
    g = d[a = Math.floor(Math.random() * b)][0].prototype;
    g.CanDisplay ? (d.splice(a, 1), e[b--] = g.getHTML("", Math.floor(50 + Math.random() * 201) - g.width * 0.5, f[b] - g.height, 1, "block", "auto", g.GetDTop, g.PicArr[g.StandGif])) : --b;
  }

  asyncInnerHTML(e.join(""), function (i) {
    h.appendChild(i);
  });
},
    AutoSelectCard = function AutoSelectCard() {
  var c = oS.ArCard,
      b = -1,
      a = c.length;

  while (++b < a) {
    SelectCard(c[b].prototype.EName);
  }
},
    InitPCard = function InitPCard() {
  var d = "",
      f,
      e = oS.ArCard,
      a = e.length,
      b = 0,
      c;

  while (b < a) {
    f = e[b];
    c = f.prototype;

    if (!c.CanSelect) {
      ++b;
      continue;
    }

    ArPCard[EName = c.EName] = {
      Select: 0,
      PName: f
    };
    d += '<div class="span1" id="Card' + EName + '" onmouseout="SetHidden($(\'dTitle\'))" onmousemove="ViewCardTitle(' + EName + ',event)" onclick="SelectCard(\'' + EName + '\')"><img src="' + c.PicArr[0] + '"><span class="span2">' + c.SunNum + "</span></div>";
    b++ % 6 == 5 && (d += "<br>");
  }

  $("dPCard").innerHTML = d;
},
    InitHandBookPCard = function InitHandBookPCard() {
  PlayAudio("gravebutton");
  var d = "",
      g,
      f,
      e = [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oHatSnowPea, oFumeShroom, oStallia, oLavaGrava, oScaredyShroom, oFumeShroomSong, oTwinSunflower, oPuffShroom, oOxygen, oShuilei, oBubbleFlower, oThunderPine, oLitchi, oWaterBoom, oSeaFlower, oFD, oBB, oBamboo, oCGTree, oLotus, oCactus, oGloomShroom, oBlueBerry, oGarlic, oSpikerock, oPrimnalPea, oPrimnalNut, oColdnap, oShrubbery, oPrimnalSun, oPrimnalPotatoMine, oChomper, oLilyPad, oXiaoHuangTao, oempeach, oLaserBean1, oSuperManBean, oXiaoJinJu, oAoTeMan, oClivia, oFirePea, oLemon, oLongAn, oPumpkinHead, oNap, oTaro, oStarfruit, oStarfruit_T, oRelicFern, oPereira, oSagesage, oDurian, oPeach, oBamboo_1, oMoonflower, oRobinHoak, oAloe, oKiwiBeast],
      a = e.length,
      b = 0,
      c;

  while (b < a) {
    g = e[b];
    c = g.prototype;
    f = c.EName;
    d += '<div class="span1" onclick="ViewProducePlant(' + f + ')"><img src="' + c.PicArr[0] + '"><div class="span2">' + c.SunNum + "</div></div>";
    b++ % 6 == 5 && (d += "<br>");
  }

  $("dHandBookPCard").innerHTML = d;
  ViewProducePlant(e[0]);
  $("dHandBookPZ").className = "WindowFrame Almanac_PlantBack";
  SetVisible($("dHandBookPZ"));
  SetNone($("dHandBookZ"));
  SetBlock($("dHandBookP"));
},
    InitHandBookZCard = function InitHandBookZCard() {
  PlayAudio("gravebutton");
  var d = "",
      g,
      f,
      e = [oSeaBasic, oSeaFlag, oSeaConch, oSeaShrimp, oSeaXie, oSeaGui, oSeaJelly, oDPSeaJelly, oJWZ, oJWC, oJWZG, oJWTA, oJWBT, oJWCG, oJWTSA, oJWBZ, oJWHX, oJWNZ, oDinoZombie, oDinoConeheadZombie, oDinoBucketheadZombie, oDinoTombZombie, oDinoCamelZombie, oDinoBossImp, oFutureZombie, oHeadZombie, oConeZombie, oDisco3000, oBackupDancer, oJetPack, oShield, oBossJetpack1, oFirstKing_1, oFirstKing_2, oFirstKing_3, oFirstKing_4, oFirstKing_5, oFirstKing_6, oFirstKing_8, oFirstKing_9, oFirstKing_10, oQinBoss, oForest_Basic, oForest_Hair, oForest_Tomb, oForest_Acher, oForest_Ninja, oPEZombie, oLostCityZombie, oJaneZombie, osZombie, oscZombie, oZombie, oConeheadZombie, oBucketheadZombie, oKungFuZombie, oKungFuConeheadZombie, oKungFuBucketheadZombie, oMonkZombie, oMonkConeheadZombie, oMonkBucketheadZombie, oKungFuBonk, oKungFuBomb, oKungFuDrum, oKungFuHuoBa],
      a = e.length,
      b = 0,
      c;

  while (b < a) {
    g = e[b];
    c = g.prototype;
    f = c.EName;
    d += '<div class="span1" onclick="ViewProduceZombie(' + f + ')"><img src="' + c.PicArr[0] + '"><div class="span2">' + c.SunNum + "</div></div>";
    b++;
  }

  $("dHandBookZCard").innerHTML = d;
  ViewProduceZombie(e[0]);
  $("dHandBookPZ").className = "WindowFrame Almanac_ZombieBack";
  SetVisible($("dHandBookPZ"));
  SetNone($("dHandBookP"));
  SetBlock($("dHandBookZ"));
},
    ViewProducePlant = function ViewProducePlant(b) {
  PlayAudio("plant1");
  var a = b.prototype;
  $("pHandBookPlant").style.backgroundImage = "url(" + a.PicArr[a.StaticGif] + ")";
  $("dProducePlant").innerHTML = a.Produce;
  innerText($("dHandBookPlantName"), a.CName);
  innerText($("spSunNum"), a.SunNum);
  innerText($("spCoolTime"), a.coolTime + $__language_Array__["c5438c597cf8c7154fdaa03c58121cf2"]);
  innerText($("spHP"), a.HP);
  innerText($("spRange"), a.Range);
  $("pPlantBack").style.backgroundPosition = -200 * a.BookHandBack + "px 0";
},
    ViewProduceZombie = function ViewProduceZombie(b) {
  PlayAudio("plant1");
  var a = b.prototype;
  $("pHandBookZombie").style.background = "url(" + a.PicArr[a.StaticGif] + ") no-repeat scroll " + a.BookHandPosition;
  $("dProduceZombie").innerHTML = a.Produce;
  innerText($("dHandBookZombieName"), a.CName);
  $("pZombieBack").style.backgroundPosition = -200 * a.BookHandBack + "px 0";
},
    ViewCardTitle = function ViewCardTitle(b, c) {
  c = c || window.event;
  var f = $("dTitle"),
      a = b.prototype;
  f.innerHTML = a.CName + $__language_Array__["fc8d9cb5aebe71f19883fa66c4131664"] + a.coolTime + $__language_Array__["1654d125d7496883b0bb58ed7d0bab93"] + (oS.DKind && a.night ? $__language_Array__["1cf01d7d284ff5dade407209e228c788"] + a.Tooltip : a.Tooltip || '<span style="text-align:left">' + a.Produce + "</span>");
  SetStyle(f, {
    left: c.clientX + (EBody.scrollLeft || EElement.scrollLeft) - 3 + "px",
    top: c.clientY + 18 + EBody.scrollTop || EElement.scrollTop + "px",
    visibility: "visible"
  });
},
    ViewBox = function ViewBox() {
  SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
  oS.Lvl ? (AllAudioPaused(), SetNone($("dSurface")), oSym.Stop(), innerText($("dMenu0"), $__language_Array__["ae228c7d4f933cfcc2d1f325d1488dd9"]), $("dMenu1").onclick = null) : AllAudioPaused();
  PlayAudio("pause");
  SetVisible($("Box"));
},
    CloseBox = function CloseBox() {
  PlayAudio("Close");
  oS.Lvl ? ResetGame($("dMenu0")) : oSym.addTask(100, AllAudioPauseCanceled);
  SetHidden($("Box"));
  SelectModal(0);
  SetBlock($("dSurface"), $("iSurfaceBackground"));
},
    ViewDiary = function ViewDiary() {
  SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
  oS.Lvl ? (AllAudioPaused(), SetNone($("dSurface")), oSym.Stop(), innerText($("dMenu0"), $__language_Array__["ae228c7d4f933cfcc2d1f325d1488dd9"]), $("dMenu1").onclick = null) : AllAudioPaused();
  PlayAudio("pause");
  SetVisible($("Diary"));
},
    CloseDiary = function CloseDiary() {
  PlayAudio("Close");
  oS.Lvl ? ResetGame($("dMenu0")) : oSym.addTask(100, AllAudioPauseCanceled);
  SetHidden($("Diary"));
  SelectModal(0);
  SetBlock($("dSurface"), $("iSurfaceBackground"));
},
    SelectCard = function SelectCard(c) {
  PlayAudio("tap");
  var h = $("Card" + c).childNodes,
      f = h[0],
      b = ArPCard[c],
      i = b.PName.prototype,
      g,
      a,
      j,
      e = $("btnOK");

  if (!b.Select) {
    if (!(ArPCard.SelNum |= 0)) {
      e.disabled = "";
      e.style.color = "#FC6";
    } else {
      if (ArPCard.SelNum > 8) {
        return;
      }
    }

    ++ArPCard.SelNum;
    b.Select = 1;
    oS.StaticCard && (g = NewEle("dCard" + c, "div", "", {
      onclick: function onclick() {
        SelectCard(c);
      }
    }, $("dCardList")), NewImg(0, f.src, "width:100px;height:120px", g), innerText(NewEle("sSunNum" + c, "span", 0, 0, g), i.SunNum), f.style.top = "-42px");
  } else {
    b.Select = 0;
    ! --ArPCard.SelNum && (e.disabled = "disabled", e.style.color = "#888");
    (g = $("dCard" + c)).onclick = null;
    ClearChild(g.firstChild, g.childNodes[1], g.lastChild, g);
    f.style.top = 0;
  }
},
    ResetSelectCard = function ResetSelectCard() {
  var b,
      a = $("btnOK");

  for (b in ArPCard) {
    ArPCard[b].Select && SelectCard(b);
  }

  a.disabled = "disalbed";
  a.style.color = "#888";
},
    LetsGO = function LetsGO() {
  var e = $("dCardList"),
      g = 0,
      k = e.childNodes.length,
      f,
      h,
      l,
      c,
      j,
      a,
      b = document.body;
  SetStyle($("dTop"), {
    left: "105px",
    top: 0
  });
  e.style.left = 0;
  SetVisible(e);

  while (g < k) {
    (function (d) {
      f = (j = e.childNodes[d]).id.substr(5);
      l = (h = ArPCard[f].PName).prototype;

      j.onclick = function (i) {
        ChosePlant(i, d);
      };

      j.onmouseover = function () {
        SetVisible($("dTitle"));
        ViewPlantTitle(oS.MCID = d);
      };

      j.onmouseout = function () {
        SetHidden($("dTitle"));
      };

      j.firstChild.style.top = "-60px";
      (a = j.lastChild).id = "sSunNum" + d;
      innerText(a, l.SunNum);
      ArCard.push({
        DID: j.id,
        CDReady: 0,
        SunReady: 0,
        PName: h
      });
    })(g++);
  }

  b.onkeydown = function (d) {
    GroundOnkeydown(d);
  };

  b.onmousedown = function (d) {
    GroundOnmousedown(d);
  };

  b.onmousemove = function (d) {
    GroundOnmousemove(d);
  };

  SetVisible(e);
  !oS.BrainsNum && CustomSpecial(oBrains, oS.R - 1, -2);
  (oS.StartGame || function () {
    StopMusic();
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
  })();
  oS.StartTime = oSym.Now;
},
    ViewPlantTitle = function ViewPlantTitle(b) {
  var f = $("dTitle"),
      e = ArCard[b],
      c = e.PName.prototype,
      a = c.CName;
  !oS.CardKind && (a += $__language_Array__["fc8d9cb5aebe71f19883fa66c4131664"] + c.coolTime + $__language_Array__["1654d125d7496883b0bb58ed7d0bab93"] + c.Tooltip, !e.CDReady && (a += $__language_Array__["c390d3106ed3a4b4c50da6a41f1bc26b"]));
  !e.SunReady && (a += $__language_Array__["3bb48e88a04a4b40fab82a534306d473"]);
  f.innerHTML = a;
  SetStyle(f, {
    top: 60 * b + 60 + "px",
    left: EDAlloffsetLeft + 100 + "px"
  });
},
    BeginCool = function BeginCool() {
  var b = ArCard.length,
      c,
      d,
      a,
      e;

  while (b--) {
    a = (c = (d = ArCard[b]).PName.prototype).coolTime;
    e = c.SunNum;

    switch (a) {
      case 0:
      case 7.5:
        d.CDReady = 1;
        e <= oS.SunNum && (d.SunReady = 1, $(d.DID).childNodes[0].style.top = "0");
        break;

      default:
        let firstCoolTime = a; //如果有默认首次冷却的，取默认值

        if (a <= 10) firstCoolTime = 0; //如果冷却时间小于等于10s,开局0冷却
        else if (a >= 15 && a <= 25) firstCoolTime -= 5; //如果冷却在15~25s之间，开局减去5s

        DoCoolTimer(b, firstCoolTime);
      //注册计时器
    }
  }
},
    ImmediatelyCool = function ImmediatelyCool() {
  var b = ArCard.length,
      c,
      d,
      a,
      e;

  while (b--) {
    a = (c = (d = ArCard[b]).PName.prototype).coolTime;
    e = c.SunNum;
    d.CDReady = 1;
    d.SunReady = 1;
    $(d.DID).childNodes[0].style.top = 0;
  }
},
    MonitorCard = function MonitorCard(d) {
  var b = ArCard.length,
      c,
      a = Number(ESSunNum.innerHTML);
  a != oS.SunNum && (oS.SunNum = Math.min(a, oS.SunNum));

  if (oS.Chose < 1) {
    while (b--) {
      (c = (d = ArCard[b]).PName.prototype).SunNum > oS.SunNum ? (d.SunReady && (d.SunReady = 0), $(d.DID).childNodes[0].style.top = "-60px") : (!d.SunReady && (d.SunReady = 1), d.CDReady && ($(d.DID).childNodes[0].style.top = 0));
    }
  } else {
    while (b--) {
      (c = (d = ArCard[b]).PName.prototype).SunNum > oS.SunNum ? d.SunReady && (d.SunReady = 0) : !d.SunReady && (d.SunReady = 1);
    }
  }

  ViewPlantTitle(oS.MCID);
},
    DoCoolTimer = function DoCoolTimer(c, b) {
  var a = $(ArCard[c].DID);
  NewEle("dCD1" + c, "span", "position:absolute;left:22px;top:22px;font-size:18px;font-weight:500;font-family:Verdana;color:#000", "", a);
  NewEle("dCD2" + c, "span", "position:absolute;left:20px;top:20px;font-size:18px;font-weight:500;font-family:Verdana;color:#FF0", "", a);

  (function (d, e) {
    d > 0 ? (innerText($("dCD1" + e), d), innerText($("dCD2" + e), d), oSym.addTask(50, arguments.callee, [(d - 0.5).toFixed(1), e])) : (ClearChild($("dCD1" + e), $("dCD2" + e)), ArCard[e].CDReady = 1, MonitorCard());
  })(b, c);
},
    ChosePlant = function ChosePlant(h, d) {
  PlayAudio("seedlift");
  var g = ArCard[oS.ChoseCard = d];

  if (!(g.CDReady && g.SunReady)) {
    return;
  }

  h = window.event || h;
  var b = h.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
      a = h.clientY + EBody.scrollTop || EElement.scrollTop,
      j = g.PName.prototype,
      e = ArCard.length,
      f,
      c = j.PicArr;
  oS.Chose = 1;
  !oS.CardKind ? EditImg(NewImg("MovePlant", c[j.StaticGif], "left:" + b - 0.5 * (j.beAttackedPointL + j.beAttackedPointR) + "px;top:" + a + 20 - j.height + "px;z-index:254", EDAll).cloneNode(false), "MovePlantAlpha", "", {
    visibility: "hidden",
    filter: "alpha(opacity=40)",
    opacity: 0.4,
    zIndex: 30
  }, EDAll) : (NewImg("MovePlant", j.PicArr[j.StandGif], "left:" + (b - 0.5 * (j.beAttackedPointL + j.beAttackedPointR)) + "px;top:" + (a + 20 - j.height) + "px;z-index:254", EDAll), NewImg("MovePlantAlpha", j.PicArr[j.StandGif], "visibility:hidden;filter:alpha(opacity=40);opacity:0.4;z-index:30", EDAll));

  while (e--) {
    $(ArCard[e].DID).childNodes[0].style.top = "-60px";
  }

  SetHidden($("dTitle"));
  GroundOnmousemove = GroundOnmousemove1;
},
    CancelPlant = function CancelPlant() {
  ClearChild($("MovePlant"), $("MovePlantAlpha"));
  oS.Chose = 0;
  MonitorCard();

  GroundOnmousemove = function GroundOnmousemove() {};
},
    ShovelPlant = function ShovelPlant(a) {
  PlayAudio("plant2");
  var b = a[0],
      c = a[1];
  c && c.canShovel && (c.Die(), oS.MPID = "");
  CancelShovel();
},
    ChoseShovel = function ChoseShovel(a) {
  PlayAudio("shovel");
  WhichMouseButton(a) < 2 && (SetHidden($("imgShovel")), NewImg("tShovel", "images/interface/Shovel.png", "left:" + (a.clientX - 10) + "px;top:" + (a.clientY + document.body.scrollTop - 17) + "px;z-index:1", EDAll), oS.Chose = -1, GroundOnmousemove = GroundOnmousemove2, StopBubble(a));
},
    CancelShovel = function CancelShovel(a) {
  var b = oS.MPID;
  ClearChild($("tShovel"));
  oS.Chose = 0;
  SetVisible($("imgShovel")); //b && SetAlpha($(b).childNodes[1], 100, 1);

  GroundOnmousemove = function GroundOnmousemove() {};
},
    StopBubble = function StopBubble(a) {
  window.event ? event.cancelBubble = true : a.stopPropagation();
},
    GrowPlant = function GrowPlant(l, d, c, e, b) {
  var j = oS.ChoseCard,
      f = ArCard[j],
      h = f.PName,
      k = h.prototype,
      i = k.coolTime,
      a,
      g = oGd.$LF[e];
  k.CanGrow(l, e, b) && (PlayAudio(g != 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water"), !oS.CardKind ? new h().Birth(d, c, e, b, l) : asyncInnerHTML((a = new h()).CustomBirth(e, b, 0, "auto"), function (n, m) {
    EDPZ.appendChild(n);
    m.Birth();
  }, a), innerText(ESSunNum, oS.SunNum -= k.SunNum), i && (f.CDReady = 0, DoCoolTimer(j, k.coolTime)), oSym.addTask(20, SetHidden, [SetStyle(g != 2 ? $("imgGrowSoil") : $("imgGrowSpray"), {
    left: d - 30 + "px",
    top: c - 30 + "px",
    zIndex: 3 * e + 1,
    visibility: "visible"
  })]));
  CancelPlant();
},
    AutoProduceSun = function AutoProduceSun(a) {
  AppearSun(GetX(Math.floor(1 + Math.random() * oS.C)), GetY(Math.floor(1 + Math.random() * oS.R)), a, 1);
  oSym.addTask(Math.floor(9 + Math.random() * 3) * 100, AutoProduceSun, [a]);
},
    AppearSun = function AppearSun(h, f, e, a) {
  var b,
      d,
      g = "Sun" + Math.random(),
      c = "cursor:pointer;z-index:25;filter:alpha(opacity=80);opacity:0.8;left:" + h + "px;";

  switch (e) {
    case 25:
      c += "width:78px;height:78px";
      b = 39;
      break;

    case 15:
      c += "width:46px;height:46px";
      b = 23;
      break;

    default:
      c += "width:100px;height:100px";
      b = 55;
  }

  a ? (d = 0, oSym.addTask(10, MoveDropSun, [g, f])) : (d = f - b - 20, c += ";top:" + d + "px", oSym.addTask(1, function (q, p, n, j, l, k, m, i) {
    if (ArSun[q] && ArSun[q].C) {
      SetStyle($(q), {
        left: (p = p + j * k) + "px",
        top: (n = n + Number(l[0])) + "px"
      });
      l.shift();
      --m;
      m > 0 && (l.length == 0 && (l = [8, 16, 24, 32]), oSym.addTask(i, arguments.callee, [q, p, n, j, l, k, m, ++i]));
    }
  }, [g, h, d, Math.floor(Math.random() * 4), [-32, -24, -16, -8], [-1, 1][Math.floor(Math.random() * 2)], 8, 2]), oSym.addTask(800, DisappearSun, [g], 3));
  ArSun[g] = {
    id: g,
    N: e,
    C: 1,
    left: h,
    top: d
  };
  NewImg(g, "images/interface/Sun.gif", c, EDAll, {
    onclick: function onclick() {
      ClickSun(this.id);
    }
  });
  oS.AutoSun && oSym.addTask(100, ClickSun, [g]);
},
    MoveDropSun = function MoveDropSun(c, b) {
  var a = ArSun[c];
  a && a.C && (a.top < b - 53 ? ($(c).style.top = (a.top += 3) + "px", oSym.addTask(5, MoveDropSun, [c, b])) : oSym.addTask(800, DisappearSun, [c]));
},
    DisappearSun = function DisappearSun(b) {
  var a = ArSun[b];
  a && a.C && (delete ArSun[b], ClearChild($(b)));
},
    ClickSun = function ClickSun(b) {
  PlayAudio("points");
  var a = ArSun[b];
  a && a.C && (a.C = 0, oSym.addTask(0, MoveClickSun, [b]));
},
    MoveClickSun = function MoveClickSun(b) {
  var a = 15,
      c = ArSun[b],
      e = 85,
      i = -20,
      d = c.left,
      h = c.top,
      g = Math.round((d - e) / a),
      f = Math.round((h - i) / a);

  (function (k, l, n, s, m, r, j, q, p) {
    (m -= q) > n ? (SetStyle($(k), {
      left: m + "px",
      top: (r -= p) + "px"
    }), oSym.addTask(j, arguments.callee, [k, l, n, s, m, r, j += 0.3, q, p])) : (SetStyle($(k), {
      left: n + "px",
      top: s + "px"
    }), Number(ESSunNum.innerHTML) != oS.SunNum && (oS.SunNum = Math.min(Number(ESSunNum.innerHTML), oS.SunNum)), innerText(ESSunNum, oS.SunNum = Math.min(oS.SunNum + l.N, 9990)), MonitorCard(), delete ArSun[k], oSym.addTask(20, ClearChild, [$(k)]));
  })(b, c, e, i, d, h, 1, g, f);
},
    AutoClickSun = function AutoClickSun() {
  var a, b;

  for (b in ArSun) {
    ArSun[b].C && ClickSun(b);
  }
},
    ShowLargeWave = function ShowLargeWave(a) {
  PlayAudio("hugewave");
  NewImg("LargeWave", "images/interface/LargeWave.gif", "left:71px;top:249px;width:858px;height:102px;z-index:50", EDAll);
  oSym.addTask(4, function (b, c, d) {
    SetStyle($("LargeWave"), {
      width: (b -= 57.2) + "px",
      height: (c -= 6.8) + "px",
      left: 500 - b * 0.5 + "px",
      top: 300 - c * 0.5 + "px"
    });
    b > 286 ? oSym.addTask(4, arguments.callee, [b, c, d]) : (oSym.addTask(460, function () {
      ClearChild($("LargeWave"));
    }, []), d && d());
  }, [858, 102, a]);
},
    ShowFinalWave = function ShowFinalWave() {
  var a = function a(b) {
    PlayAudio("finalwave");
    NewImg("FinalWave", "images/interface/FinalWave.gif", "left:122px;top:194px;width:756px;height:213px;z-index:50", EDAll);
    oSym.addTask(4, function (c, e, d) {
      SetStyle($("FinalWave"), {
        width: (c -= 50.4) + "px",
        height: (e -= 14.2) + "px",
        left: 500 - c * 0.5 + "px",
        top: 300 - e * 0.5 + "px"
      });
      c > 252 ? oSym.addTask(4, arguments.callee, [c, e, d]) : oSym.addTask(d, function () {
        ClearChild($("FinalWave"));
      }, []);
    }, [756, 213, b]);
  };

  oP.FlagNum in oS.LargeWaveFlag ? ShowLargeWave(function () {
    oSym.addTask(560, a, [150]);
  }) : a(500);
},
    GameOver = function GameOver() {
  PlayAudio("scream");
  NewImg("iGameOver", "images/interface/ZombiesWon.jpg", "width:900px;height:600px;z-index:255", EDAll, {
    onclick: function onclick() {
      if (oS.DynamicDifficulty) {
        operateDynamicDifficulty(-1);
      }

      SelectModal(oS.Lvl);
    }
  });
  oSym.Stop();
},
    YourPlantIsAte = function YourPlantIsAte() {
  PlayAudio("YourPlantIsAte");
  NewImg("iGameOver", "images/interface/YourPlantIsAte.jpg", "width:900px;height:600px;z-index:255", EDAll, {
    onclick: function onclick() {
      if (oS.DynamicDifficulty) {
        operateDynamicDifficulty(-1);
      }

      SelectModal(oS.Lvl);
    }
  });
  oSym.Stop();
},
    LoseMower = function LoseMower() {
  PlayAudio("YourPlantIsAte");
  NewImg("iGameOver", "images/interface/LoseMower.jpg", "width:900px;height:600px;z-index:255", EDAll, {
    onclick: function onclick() {
      if (oS.DynamicDifficulty) {
        operateDynamicDifficulty(-1);
      }

      SelectModal(oS.Lvl);
    }
  });
  oSym.Stop();
},
    PrepareGrowPlants = function PrepareGrowPlants(a) {
  var b = function b() {
    PlayAudio("readysetplant");
    oSym.addTask(60, function (d, c) {
      var e = d.style;
      e.backgroundPosition = "0 -108px";
      oSym.addTask(40, function (g, h, f) {
        h.backgroundPosition = "0 -216px";
        oSym.addTask(100, function (j, i) {
          ClearChild(j);
          i();
        }, [g, f]);
      }, [d, e, c]);
    }, [NewEle(0, "div", "position:absolute;overflow:hidden;background:url(images/interface/PrepareGrowPlants.png) no-repeat;width:255px;height:108px;z-index:50;left:" + (oS.W * 0.5 - 77) + "px;top:" + (oS.H * 0.5 - 54) + "px", 0, EDAll), a]);
  };

  oS.HaveFog ? oGd.MoveFogLeft(b) : b();
},
    CustomPlants = function CustomPlants(b, a, c) {
  new ArCard[b].PName().Birth(GetX(c), GetY(a), a, c, []);
},
    CustomSpecial = function CustomSpecial(c, b, d, a) {
  new c().Birth(GetX(d), GetY(b), b, d, [], a);
},
    CheckAutoSun = function CheckAutoSun(a) {
  var b = a.checked ? 1 : 0;
  b != oS.AutoSun && (addCookie("JSPVZAutoSun", oS.AutoSun = b), b && AutoClickSun());
},
    GetNewCard = function GetNewCard(a, b, c) {
  StopMusic();
  PlayAudio("winmusic");
  oSym.Clear();
  SetStyle(a, {
    left: "350px",
    top: "131px",
    width: "200px",
    height: "240px",
    clip: "rect(0,auto,120px,0)",
    cursor: "default"
  }).onclick = null;
  oSym.Init(function (d, e) {
    ++d < 100 ? (SetAlpha(e, d, d * 0.01), oSym.addTask(4, arguments.callee, [d, e])) : function () {
      StopAudio("winmusic");
      PlayAudio("plantsgarden", true);
      SetHidden(EDAll, $("dTop"));
      var f = b.prototype;
      $("iNewPlantCard").src = f.PicArr[f.StaticGif];
      $("iNewPlantCard").style.marginTop = 180 - f.height + "px";
      innerText($("dNewPlantName"), f.CName);
      $("dNewPlantTooltip").innerHTML = f.Tooltip;

      $("btnNextLevel").onclick = function () {
        StopAudio("plantsgarden");
        SelectModal(c);
      };

      SetStyle($("dNewPlant"), {
        visibility: "visible",
        zIndex: 255
      });
    }();
  }, [0, $("DivA")]);
},
    getCookie1 = function getCookie1(b, g) {
  var d = document.cookie,
      f = d.split(";"),
      c = f.length,
      a,
      e,
      h;

  while (c--) {
    h = (a = f[c]).split("=");

    if (h[0].replace(" ", "") == b) {
      if ((e = h.length) == 2) {
        return unescape(h[1]);
      } else {
        h.shift();
        h = h.join("=").split("&");

        if (g == undefined) {
          return unescape(h);
        } else {
          e = h.length;

          while (e--) {
            if ((a = h[e].split("="))[0].replace(" ", "") == g) {
              return unescape(a[1]);
            }
          }
        }
      }
    }
  }

  return 0;
},
    getCookie = function getCookie(b) {
  var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));

  if (a != null) {
    return unescape(a[2]);
  }

  return 0;
},
    addCookie = function addCookie(b, d, e = 24 * 365 * 3) {
  var c = b + "=" + escape(d);

  if (e) {
    var a = new Date();
    a.setTime(a.getTime() + e * 3600 * 1000);
    c += ";expires=" + a.toGMTString();
  }

  document.cookie = c;
},
    deleteCookie = function deleteCookie(a) {
  document.cookie = a + "=0;";
},
    WordUTF8 = '<div id="dLogo" style="position:absolute;width:900px;height:600px;z-index:1"><div id="LogoWord" style="position:absolute;color:#FF0;top:300px;width:100%;height:100px"><span style="position:absolute;width:278px;height:82px;left:314px;top:105px;cursor:pointer" onclick="PlayAudio(\'gravebutton\');SetBlock($(\'dSurface\'),$(\'iSurfaceBackground\'));ShowNameDiv()"></span><div style="position:absolute;font-size:14px;left:660px;text-align:center;width:140px;top:185px;line-height:1.5;font-weight:bold"><span style="cursor:pointer"><span id="sTime" style="cursor:pointer;color: rgba(255, 255, 255, 0);">　　</span></span></div></div><div style="position:absolute;width:110px;height:60px;left:765px;top:450px;cursor:pointer;z-index:300" onclick="SetVisible($(\'dProcess\'))"></div></div>',
    //版本号
ShowNameDiv = function ShowNameDiv() {
  oSym.Start();

  (function (c) {
    var b = c[0],
        d = 3;
    c.shift();

    while (d--) {//     SetStyle($("dNameDiv" + d).style.top = b[d] + "px")  //20150825
    }

    c.length && oSym.addTask(b[3], arguments.callee, [c]);
  })([[-260, 96, 136, 10], [-94, 96, 136, 10], [-6, 127, 176, 10], [-8, 134, 188, 17], [-8, 130, 179, 17], [-8, 136, 189, 17], [-8, 134, 187, 10]]);
},
    GotoAuthorWebsite = function GotoAuthorWebsite(b) {
  PlayAudio("tap");
  var a = "http://" + $User.AuthorWebsite;
  confirm($__language_Array__["01179d445410ae824ae62419460b5cee"] + b + $__language_Array__["7a59def3c9a4d4d6d4f65ca52880cbd3"] + a + $__language_Array__["b332b57947362ec86982fc7155c69bf2"]) && (location.href = a);
},
    ShowLoginDiv = function ShowLoginDiv() {
  $User.isAuthorWebsite ? (PlayAudio("tap"), SetBlock($("dLogin"))) : GotoAuthorWebsite($__language_Array__["7351ae4c471f6f5d9a456693f4373d32"]);
},

/*GameLogin = function(h) {
if (!CheckLogin()) {
    return (alert("用户名只能输入3-10个中文、字母、数字、下划线\n\n密码只能输入3-20个字母、数字、下划线"))
}
var a, g, f, b = $User.Visitor,
e = $User.Server,
d = e.List,
c;
if (!h && $("txtName").value == b.UserName) {
    return (alert("你已经登录!"))
}
SetVisible($("dLoadUserName"));
SetHidden($("dLoginButton"), $("dRegButton"));
ClearChild($("JSPVZAjax"));
NewEle("JSPVZAjax", "script", 0, {
    src: d[e.DataInx][1] + "asp/User" + (h ? "Reg": "Login") + ".asp?l=" + escape(oS.LevelName) + "&Username=" + $("txtName").value + "&UserPass=" + $("txtPass").value,
    type: "text/javascript"
},
document.body)
},
GameLogout = function() {
var a = $User.Visitor,
c = $("dAdventure"),
d = $User.Server,
b = d.List;
ClearChild($("JSPVZAjax")),
NewEle("JSPVZAjax", "script", 0, {
    src: b[d.DataInx][1] + "asp/UserLogout.asp",
    type: "text/javascript"
},
document.body),
SetNone($("dLogin"));
SetHidden($("dLoadUserName"));
SetVisible($("dLoginButton"), $("dRegButton"));
a.UserName = "游客";
a.UserAuthority = 0;
a.Progress = 1;
$("dName").innerHTML = "&lt;游客&gt;";
c.className = "adventure0";
c.innerHTML = "";
$("txtName").value = $("txtPass").value = "";
$("IF2").src = $User.Server.DataURL + "asp/ChatSend.asp?C=10000"
},
CheckLogin = function() {
var c = $("txtName").value,
e = $("txtPass").value,
a = /^\w{3,10}$/,
b = /^[\u4e00-\u9fa5\w]{3,10}$/,
d = /^\w{3,20}$/;
return (a.exec(c) || b.exec(c)) && d.exec(e) ? true: false
},*/
SelectModal = function SelectModal(g) {
  HiddenLevel();
  HiddenMiniGame(1);
  HiddenRiddleGame(1);
  StopMusic();
  PausedAudioArr = [];
  g == undefined && (g = $User.Visitor.Progress);

  if (g > 147) {
    alert($__language_Array__["b1620fc780c9381f9809a6fdb341c78e"]);
    return;
  }

  oS.LvlClearFunc && oS.LvlClearFunc();
  var b = oS.GlobalVariables,
      c = oS.LvlVariables,
      e = oS.SelfVariables,
      a = window,
      d;

  for (d in b) {
    a[d] = b[d];
  }

  for (d in c) {
    a[d] = null;
  }

  for (d = e.length; d--; delete oS[e[d]]) {}

  for (d in $Pn) {
    $Pn[d] = null;
  } //清除没被清除掉的垃圾blob图片


  if (oImage["garbage"]) {
    for (var _iterator = _createForOfIteratorHelperLoose(oImage["garbage"]), _step; !(_step = _iterator()).done;) {
      var _i4 = _step.value;

      try {
        URL.revokeObjectURL(_i4);
      } catch (_unused) {}
    }
  }

  oImage = {}; //清除oImage缓存的blob

  oS.GlobalVariables = {};
  oS.LvlVariables = {};
  oS.SelfVariables.length = 0;
  SetHidden($("dCardList"), $("tGround"), $("dSelectCard"), $("dTop"), $("dMenu"), $("dHandBook"), $("dNewPlant"), $("dProcess"));
  SetNone($("dSurface"), $("iSurfaceBackground"));
  ClearChild($("dFlagMeterTitleB").firstChild);
  EDAll = $("dBody").replaceChild(EDNewAll, EDAll);
  $("dBody").replaceChild(EDNewFlagMeter, $("dFlagMeter"));
  LoadLvl(g);
},
    InitGame = function InitGame() {
  var e = NewEle("dServer", "div", $__language_Array__["7f6d34b1ccba210436418bb33bf3d1c0"], 0, $("dAll")),
      c = $User.Server,
      b = c.List,
      a = $("dProcess2");
  !$("dText1") && a.insertBefore(NewEle("dText1", "div", 0, {//innerHTML: '<span style="line-height:23px;font-size:15px;font-family:&#x9ED1;&#x4F53;;color:#F60;top:32px"><span style="font-family:Verdana;font-weight:700"></span><span style="font-family:Verdana;font-weight:700"></span></span><br><br><div style="text-align:center"><b><a style="color:#FF0;font-size:15px;text-decoration:none" href="http://dwz.cn/pvz2js/" target="_blank">游戏网站</a>&nbsp;&nbsp;&nbsp;<a style="color:#FF0;font-size:15px;text-decoration:none" href="http://blog.lonelystar.org/view" target="_blank">我要吐槽</a>&nbsp;&nbsp;&nbsp;<a href="http://sunflower.lonelystar.org/tousu.html" target="_blank"  style="color:#FF0;font-size:15px;text-decoration: none">我要投诉</a></b></div>'
  }, 0), a.firstChild);
  /*$("IF2").src = b[c.DataInx][1] + "asp/ChatSend.asp" + {
  0 : "",
  1 : "?C=5000",
  255 : "?C=0"
  } [$User.Visitor.UserAuthority];*/
  //$("ChatView").src = b[c.DataInx][1] + "asp/ViewChat.asp";
  //    e.innerHTML = (Number(c.SpeedInx) + 1) + "号服<br>" + (Number(c.DataInx) + 1) + "号服";

  LoadLvl();
},
    LoadLvl = function LoadLvl(e, c) {
  oSym.Timer && oSym.Stop();
  var b = oSym.Now == c,
      d = $User,
      a = d.Visitor;
  oS.CenterContent && (e == 0 && b || e != 0) && (oS.DisplayAD = true, SetBlock($("dAdFlash"), $("dAD2")));
  SetBlock($("dLvlLink"));
  e = e || 0;
  $("dServer") && e != 0 && SetNone($("dServer"));
  oSym.Init(function (g, f) {
    (f = $("JSPVZ")) && ClearChild(f);
    NewEle("JSPVZ", "script", 0, {
      src: "level/" + (oS.Lvl = g) + ".js",
      type: "text/javascript"
    }, document.getElementsByTagName("head").item(0));
  }, [e && b ? 0 : e]); //$("aLvlLink").href = "html/2-1" + (e && !isNaN(e) ? "-" + e: "") + ".htm"
},
    AppearTombstones = function AppearTombstones(n, e, m) {
  var r = oGd.$Tombstones,
      k = [],
      h = oS.R + 1,
      b,
      d = 0,
      q,
      a,
      g,
      f,
      s = oGd.$,
      l,
      p;

  while (--h) {
    g = e;

    while (g >= n) {
      !r[h + "_" + g] && (k[d++] = [h, g]);
      --g;
    }
  }

  while (m--) {
    q = k[g = Math.floor(Math.random() * k.length)];
    r[p = (h = q[0]) + "_" + (b = q[1])] = 1;

    for (f = 0; f < 4; f++) {
      (l = s[p + "_" + f]) && l.Die();
    }

    k.splice(g, 1);
    a = NewEle("dTombstones" + h + "_" + b, "div", "position:absolute;width:86px;height:91px;left:" + (GetX(b) - 43) + "px;top:" + (GetY(h) - 91) + "px", 0, EDAll);
    h = Math.floor(Math.random() * 4);
    b = Math.floor(Math.random() * 2);
    var c;
    a.appendChild(c = NewEle("", "div", "background-position:-" + 86 * h + "px -" + 91 * b + "px", {
      className: "Tom1"
    }, a).cloneNode(false)).className = "Tom2";
  }
},
    ResetGame = function ResetGame(b) {
  AllAudioPauseCanceled();
  var a = oSym;
  a.Start();
  innerText(b, $__language_Array__["ea8bb7cc48ca278e4f47dc16ea12ab02"]);
  $("dMenu1").onclick = ClickMenu;
  SetNone($("dSurface"), $("dPause"));
  $("dPauseAD").innerHTML = "";
},
    PauseGame = function PauseGame(c, a) {
  var b = oSym;
  AllAudioPaused();
  b.Stop();
  innerText(c, $__language_Array__["ae228c7d4f933cfcc2d1f325d1488dd9"]);
  $("dMenu1").onclick = null;
  !a && SetBlock($("dSurface"), $("dPause"));
},
    ClickMenu = function ClickMenu() {
  oSym.Timer && (AllAudioPaused(), PlayAudio("pause"), oSym.Stop(), SetBlock($("dSurface")), innerText($("dMenu0"), $__language_Array__["ae228c7d4f933cfcc2d1f325d1488dd9"]), ShowOptions());
},
    OptionsMenuDown = function OptionsMenuDown(b, a) {
  b.className = "OptionsMenuButtonDown";
  a.style.lineHeight = "102px";
},
    OptionsMenuUP = function OptionsMenuUP(b, a) {
  b.className = "OptionsMenuButton";
  a.style.lineHeight = "100px";
},
    ShowSpeed = function ShowSpeed() {
  PlayAudio("gravebutton");
  SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
  SetBlock($("dSpeedContainer"));
},
    HiddenSpeed = function HiddenSpeed() {
  PlayAudio("tap");
  SetNone($("dSpeedContainer"));
  oS.Lvl && ResetGame($("dMenu0"));
},
    CSpeed = function CSpeed(a, c, b) {
  $User.Visitor.NowStep = oSym.NowStep = a;
  $User.Visitor.TimeStep = oSym.TimeStep = c;
  $("dDisplaySpeed").innerHTML = b;
},
    ShowLevel = function ShowLevel() {
  PlayAudio("gravebutton");
  SetNone($("dOptionsMenu"));
  SetBlock($("dAdvSmallContainer"));
},
    HiddenLevel = function HiddenLevel() {
  PlayAudio("tap");
  SetNone($("dOptionsMenuback"), $("dAdvSmallContainer"));
  oS.Lvl && (SetNone($("dSurface")), ResetGame($("dMenu0")));
},
    ShowMiniGame = function ShowMiniGame() {
  PlayAudio("gravebutton");
  SetBlock($("dMiniSmallContainer"));
},
    HiddenMiniGame = function HiddenMiniGame(a) {
  !a && PlayAudio("tap");
  SetNone($("dMiniSmallContainer"));
},
    ShowRiddleGame = function ShowRiddleGame() {
  PlayAudio("gravebutton");
  SetBlock($("dRiddleSmallContainer"));
},
    HiddenRiddleGame = function HiddenRiddleGame(a) {
  !a && PlayAudio("tap");
  SetNone($("dRiddleSmallContainer"));
},
    ShowRiddle0 = function ShowRiddle0() {
  PlayAudio("gravebutton");
  SetNone($("dRiddleInx"));
  SetBlock($("dRiddle0"));
  $("dRiddleTitle").innerHTML = $__language_Array__["ae8f0fedfcf69c64ccf91d505de4e4e5"];
},
    ShowRiddle1 = function ShowRiddle1() {
  $User.isAuthorWebsite ? (PlayAudio("gravebutton"), SetNone($("dRiddleInx")), SetBlock($("dRiddle1")), $("dRiddleTitle").innerHTML = $__language_Array__["6e08b279f211c0c6ec1c4d487c55aec7"]) : GotoAuthorWebsite($__language_Array__["70bbb209abdfdaaa9453237eb5568d79"]);
},
    ReturnRiddleInx = function ReturnRiddleInx() {
  PlayAudio("tap");
  SetBlock($("dRiddleInx"));
  SetNone($("dRiddle0"), $("dRiddle1"));
  $("dRiddleSmallContainer").className = "TitleSmallContainer  Almanac_IndexBack";
  $("dRiddleTitle").innerHTML = $__language_Array__["fbea57e197c9f1fd6b7a8faf0297f2e7"];
},
    ShowOptions = function ShowOptions() {
  PlayAudio(oS.Lvl ? "gravebutton" : "tap");
  SetBlock($("dOptionsMenuback"), $("dOptionsMenu"));
},
    HiddenOptions = function HiddenOptions() {
  PlayAudio("gravebutton");
  PlayAudio("buttonclick");
  SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
  oS.Lvl && (SetNone($("dSurface")), ResetGame($("dMenu0")));
},
    ViewHandBook = function ViewHandBook() {
  SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
  oS.Lvl ? (AllAudioPaused(), PlayAudio("gravebutton"), SetNone($("dSurface")), oSym.Stop(), innerText($("dMenu0"), $__language_Array__["ae228c7d4f933cfcc2d1f325d1488dd9"]), $("dMenu1").onclick = null) : (AllAudioPaused(), PlayAudio("tap"));
  PlayAudio("");
  SetVisible($("dHandBook"));
},
    ViewShowSkill = function ViewShowSkill() {
  SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
  oS.Lvl ? (AllAudioPaused(), PlayAudio("gravebutton"), SetNone($("dSurface")), oSym.Stop(), innerText($("dMenu0"), $__language_Array__["ae228c7d4f933cfcc2d1f325d1488dd9"]), $("dMenu1").onclick = null) : (AllAudioPaused(), PlayAudio("tap"));
  PlayAudio("");
  SetVisible($("dShowSkill"));
},
    ReturnHandBookInx = function ReturnHandBookInx() {
  PlayAudio("tap");
  SetNone($("dHandBookP"), $("dHandBookZ"));
  SetHidden($("dHandBookPZ"));
},
    CloseHandBook = function CloseHandBook() {
  PlayAudio("tap");
  StopAudio("");
  oS.Lvl ? ResetGame($("dMenu0")) : oSym.addTask(100, AllAudioPauseCanceled);
  SetNone($("dHandBookP"), $("dHandBookZ"));
  SetHidden($("dHandBookPZ"), $("dHandBook"));
},
    ShowHelp = function ShowHelp() {
  AllAudioPaused();
  PlayAudio("tap");
  SetBlock($("dHelp"));
},
    HiddenHelp = function HiddenHelp() {
  PlayAudio("tap");
  AllAudioPauseCanceled();
  SetNone($("dHelp"));
},
    $ = function $(a) {
  return document.getElementById(a);
},
    $n = function $n(a) {
  return document.createElement(a);
},
    ClearChild = function ClearChild() {
  var a = arguments.length,
      c;

  while (a--) {
    try {
      c = arguments[a];
      c.parentNode.removeChild(c);
      c = null;
    } catch (b) {}
  }
},
    SetBlock = function SetBlock() {
  var a = arguments.length;

  while (a--) {
    arguments[a].style.display = "block";
  }
},
    SetNone = function SetNone() {
  var a = arguments.length;

  while (a--) {
    arguments[a].style.display = "none";
  }
},
    SetHidden = function SetHidden() {
  var a = arguments.length;

  while (a--) {
    arguments[a].style.visibility = "hidden";
  }
},
    SetVisible = function SetVisible() {
  var a = arguments.length;

  while (a--) {
    arguments[a].style.visibility = "visible";
  }
},
    SetAlpha = $User.Browser.IE6 ? function (c, b, a) {
  c.style.filter = "alpha(opacity=" + b + ")";
} : function (c, b, a) {
  c.style.opacity = a;
},
    SetStyle = function SetStyle(d, b) {
  var c = d.style,
      a;

  for (a in b) {
    c[a] = b[a];
  }

  return d;
},
    NewImg = function NewImg(f, e, b, c, d) {
  var a = $n("img");
  a.src = e;
  b && (a.style.cssText = b);

  if (d) {
    for (v in d) {
      a[v] = d[v];
    }
  }

  f && (a.id = f);
  c && c.appendChild(a);
  return a;
},
    EditImg = function EditImg(e, f, c, b, a) {
  f && (e.id = f);
  c && (e.src = c);
  b && SetStyle(e, b);
  a && a.appendChild(e);
  return e;
},
    NewEle = function NewEle(h, b, d, a, e, f, g, c) {
  g = $n(b);
  h && (g.id = h);
  d && (g.style.cssText = d);

  if (a) {
    for (c in a) {
      g[c] = a[c];
    }
  }

  if (f) {
    for (c in f) {
      g.setAttribute(c, f[c]);
    }
  }

  e && e.appendChild(g);
  return g;
},
    EditEle = function EditEle(g, f, a, e, b, c) {
  if (f) {
    for (c in f) {
      g.setAttribute(c, f[c]);
    }
  }

  a && SetStyle(g, a);

  if (b) {
    for (c in b) {
      g[c] = b[c];
    }
  }

  e && e.appendChild(g);
  return g;
},
    NewO = function NewO(b, a) {
  return (a = function a() {}).prototype = b, a;
},
    SetPrototype = function SetPrototype(d, c, a) {
  a = d.prototype;

  for (var b in c) {
    a[b] = c[b];
  }
},
    InheritO = function InheritO(d, i, c, g, b, h, f, e, a) {
  var g = function g() {};

  g.prototype = new d();
  i && SetPrototype(g, i);

  if (c) {
    a = g.prototype;

    for (f in c) {
      b = a[f].slice(0);
      h = c[f];

      for (e in h) {
        b[e] = h[e];
      }

      g.prototype[f] = b;
    }
  }

  return g;
},
    Compare = function Compare(e, b, a, c, d) {
  return d = e < b ? b : e > a ? a : e, c ? [c(d), d] : [d];
},
    $Switch = function $Switch(h, d, c, a, g, b, e) {
  b = 0;
  g = d.length;
  e = c;

  while (b < g) {
    if (e(h, d[b])) {
      break;
    }

    ++b;
  }

  return a[b];
},
    $SEql = function $SEql(c, b, a) {
  return c in b ? b[c] : b["default"];
};

$SSml = function $SSml(d, c, a) {
  var b = 0;
  LX = c.length;

  while (b < LX) {
    if (d < c[b]) {
      break;
    }

    ++b;
  }

  return a[b];
}, $SGrt = function $SGrt(d, c, a) {
  var b = 0;
  LX = c.length;

  while (b < LX) {
    if (d > c[b]) {
      break;
    }

    ++b;
  }

  return a[b];
}, ImgSpriter = function (_ImgSpriter) {
  function ImgSpriter(_x, _x2, _x3, _x4, _x5) {
    return _ImgSpriter.apply(this, arguments);
  }

  ImgSpriter.toString = function () {
    return _ImgSpriter.toString();
  };

  return ImgSpriter;
}(function (h, c, e, f, g) {
  var b = e[f],
      d = b[2],
      a = $(h);
  a && (a.style.backgroundPosition = b[0], oSym.addTask(b[1], function (j) {
    j > -1 ? ImgSpriter(h, c, e, j, g) : g(h, c);
  }, [d]));
}), Ajax = function Ajax(a, e, d, c) {
  var b;
  (b = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP")) && (c && (b.onreadystatechange = function () {
    b.readyState == 4 && b.status == 200 && c(b.responseText);
  }), b.open(e, a, true), e == "get" ? b.send(null) : (b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"), b.send(d)));
}, ShowAD = function ShowAD(b, a) {
  document.write(oS.CenterContent = '<div id="dAdFlash">' + oS.adFlash + "</div>");
  oS.CenterContent = 2;
  SetBlock($("dAdFlash"), $("dAD2"));

  (function () {
    var d = document.createElement("script"),
        c = document.getElementsByTagName("script")[0];
    d.type = "text/javascript";
    d.async = true;
    d.defer = "defer";
    d.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
    c.parentNode.insertBefore(d, c);
  })();
}, ViewChat = function ViewChat(a) {
  a.value == $__language_Array__["e938456d34a61a7848cdbcb5bd581fad"] ? (SetBlock($("IF2"), $("dChatView")), a.value = $__language_Array__["6ff55c16545e9eb789f4ad0fb55350f6"]) : (SetNone($("IF2"), $("dChatView")), a.value = $__language_Array__["e938456d34a61a7848cdbcb5bd581fad"]);
};
Date.prototype.format = function (b) {
  var c = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };

  if (/(y+)/.test(b)) {
    b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var a in c) {
    if (new RegExp("(" + a + ")").test(b)) {
      b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length));
    }
  }

  return b;
}, NewMusic = $User.HTML5 ? function (a) {
  NewAudio({
    autoplay: true,
    loop: true,
    source: a
  });
} : function (a) {
  !oS.Silence && ($("oEmbed").innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="0" height="0" align="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="false" /><param name="movie" value="music/' + a + '.swf"><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><embed width="0" height="0" src="music/' + a + '" quality="high" pluginspage="http://www.adobe.com/go/getflashplayer_cn" align="middle" play="true" loop="true" scale="showall" wmode="window" devicefont="false" bgcolor="#ffffff" name="ad" menu="true" allowfullscreen="false" allowscriptaccess="always" salign="" type="application/x-shockwave-flash"></object>');
}, PauseMusic = $User.HTML5 ? function () {
  var a = oAudio[oS.LoadMusic];
  a.currentTime = 0;
  a.pause();
} : function () {
  $("oEmbed").innerHTML = "";
}, StartAdventure = function (_StartAdventure) {
  function StartAdventure(_x6) {
    return _StartAdventure.apply(this, arguments);
  }

  StartAdventure.toString = function () {
    return _StartAdventure.toString();
  };

  return StartAdventure;
}(function (d) {
  if (d != undefined && d != 0) {
    SelectModal(d);
    return;
  }

  var c = $("ZombieHand"),
      b = $("dAdventure"),
      a = NewImg("", "images/interface/ZombieHand.png", "position:absolute;left:0", c);
  b.onclick = b.onmouseover = b.onmouseout = null;
  SetBlock(c);
  StopMusic();
  PlayAudio("losemusic");
  oSym.addTask(120, function () {
    PlayAudio("evillaugh");
  }, []);
  oSym.addTask(7, function (f, e, g) {
    e.style.left = (g -= 330) + "px";
    --f && oSym.addTask(7, arguments.callee, [f, e, g]);
  }, [6, a, 0]);
  $User.HTML5 ? function (g, h, e) {
    var f = oAudio.evillaugh;

    if (--e) {
      g.style.backgroundPosition = ["top", "bottom"][h];
      oSym.addTask(10, arguments.callee, [g, h ? 0 : 1, e]);
    } else {
      g.style.backgroundPosition = "top", g.onclick = StartAdventure;

      g.onmouseover = function () {
        this.style.backgroundPosition = "bottom";
      };

      g.onmouseout = function () {
        this.style.backgroundPosition = "top";
      };

      StopAudio("evillaugh");
      SelectModal(d);
      c.innerHTML = "";
    }
  }(b, 1, 50) : (NewMusic("evillaugh"), function (f, g, e) {
    if (--e) {
      f.style.backgroundPosition = ["top", "bottom"][g];
      oSym.addTask(10, arguments.callee, [f, g ? 0 : 1, e]);
    } else {
      f.style.backgroundPosition = "top", f.onclick = StartAdventure;

      f.onmouseover = function () {
        this.style.backgroundPosition = "bottom";
      };

      f.onmouseout = function () {
        this.style.backgroundPosition = "top";
      };

      SelectModal(d);
      c.innerHTML = "";
    }
  }(b, 1, 50));
}), oAudio = {}, oAudioLink = {}, oImage = {}, PausedAudioArr = [], NewAudio = $User.HTML5 ? function (json) {
  var source = json.source;

  if (!source) {
    return null;
  }

  var src = "audio/" + source + ".mp3";

  if (oAudio[source]) {
    return oAudio[source];
  }

  var ele = new Audio();
  ele.autoplay = !!json.autoplay; //是否立即播放

  function fun() {
    ele.src = src; //设置音频源
  }

  ele.preload = json.preload === undefined ? "auto" : ["auto", "meta", "none"][json.preload]; //加载方式

  ele.muted = oS.Silence; //静音控制

  json.loop ? ele.loop = "loop" : ele.volume = 0.8; //设定音频是否循环播放

  json.callback && ele.addEventListener("canplaythrough", json.callback, false);

  if (!json.loop) {
    ele.addEventListener("ended", function (_) {
      ele.remove();
      ele.src = "";
      delete oAudio[source];
    }, {
      once: true
    });
  }

  if (window.ResourcesDatabase && canXHR) {
    //如果已经读取过直接快速读取即可
    if (oAudioLink[src] && oAudioLink[src] != "loading") {
      src = oAudioLink[src];
      fun();
    } else if (oAudioLink[src] == "loading") {
      fun();
    } else {
      //没有读取过尝试从数据库中读取
      getDataByKey(window.ResourcesDatabase, "audios", source).then(function (r) {
        if (r) {
          src = oAudioLink[src] = URL.createObjectURL(r.data);
          fun();
        } else {
          //数据库没有即保存，顺便缓存链接到快速读取数组
          //注意，保存时同时直接替换音频链接即可，以免过长时间无音频
          fun();

          if (!oAudioLink[src]) {
            oAudioLink[src] = "loading";
            fetch(src).then(function (response) {
              if (response.ok) {
                return response.blob();
              } else {
                return null;
              }
            }).then(function (r) {
              if (!r) {
                //delete oAudioLink[src];
                //不取消loading状态原因是这个鬼版本可能有找不到的音频，不让它加载第二次
                return;
              }

              putDataByKey(window.ResourcesDatabase, "audios", source, r);
              oAudioLink[src] = URL.createObjectURL(r);
            });
          }
        }
      });
    }
  } else {
    //不能缓存的情况
    fun();
  }

  if (!!json.autoplay) {
    return oAudio[source] = ele;
  } else {
    return null;
  }
} : function () {}, PlayMusic = $User.HTML5 ? function (b) {
  var a = oAudio[b];

  if (a) {
    try {
      a.currentTime = 0;
    } catch (c) {}

    a.play();
  } else {
    NewMusic(b);
    oAudio[b] && oAudio[b].play();
  }
} : function (a) {
  NewMusic(a);
}, PlayAudio = $User.HTML5 ? function (source, loop) {
  var _NewAudio;

  if (loop === void 0) {
    loop = false;
  }

  var audio = oAudio[source];
  return audio ? (audio.loop = loop, audio.play()) : (_NewAudio = NewAudio({
    source: source,
    loop: loop,
    autoplay: true
  })) === null || _NewAudio === void 0 ? void 0 : _NewAudio.play();
} : function () {}, PauseAudio = $User.HTML5 ? function (a) {
  oAudio[a].pause();
} : function () {}, StopMusic = $User.HTML5 ? function () {
  [oS.LoadMusic, oS.StartGameMusic].forEach(function (a) {
    if (oAudio[a]) {
      oAudio[a].pause();
      oAudio[a].remove();
      oAudio[a].src = "";
      delete oAudio[a];
    }
  });
} : function () {}, StopAudio = $User.HTML5 ? function (b) {
  oAudio[b] && function (b) {
    var a = oAudio[b];
    a.pause();
    a.remove();
    a.src = "";
    delete oAudio[b];
  }(b);
} : function () {}, AllAudioPaused = $User.HTML5 ? function () {
  var a, b;

  for (a in oAudio) {
    b = oAudio[a];
    !(b.paused || b.ended) && (PausedAudioArr.push(a), b.pause());
  }
} : function () {}, AllAudioPauseCanceled = $User.HTML5 ? function () {
  var a = PausedAudioArr.length;

  while (a--) {
    var _oAudio$PausedAudioAr;

    (_oAudio$PausedAudioAr = oAudio[PausedAudioArr[a]]) === null || _oAudio$PausedAudioAr === void 0 ? void 0 : _oAudio$PausedAudioAr.play();
  }

  PausedAudioArr.length = 0;
} : function () {}, AllAudioMuted = function AllAudioMuted() {
  var a;

  for (a in oAudio) {
    oAudio[a].muted = true;
  }
}, AllAudioMuteCanceled = function AllAudioMuteCanceled() {
  var a;

  for (a in oAudio) {
    oAudio[a].muted = false;
  }
}, SeeZombie = function SeeZombie(a) {
  var R,
      C,
      tzombie,
      AHTML = [],
      AO = [];

  for (R = 1; R <= oS.R; R++) {
    for (C = 9; C <= oS.C; C++) {
      AO.push(tzombie = new a());
      AHTML.push(tzombie.CustomBirth(R, C, 0, 0, 0));
    }
  }

  oP.AppearUP(AHTML, AO, AO.length);
}, CheckSilence = $User.HTML5 ? function (a) {
  var b = a.checked ? 1 : 0;
  b != oS.Silence && (addCookie("JSPVZSilence", oS.Silence = b), b ? AllAudioMuted() : AllAudioMuteCanceled());
} : function (a) {
  var b = a.checked ? 1 : 0;
  b != oS.Silence && (addCookie("JSPVZSilence", oS.Silence = b), b ? PauseMusic() : NewMusic(oS.StartGameMusic));
};

var loadRes = function loadRes(ziyuanBiao, o) {
  var au = NewAudio,
      head = document.getElementsByTagName("head")[0]; //处理js加载

  if (ziyuanBiao.js) {
    var huidiaoJs = ziyuanBiao.js[0],
        //拿出回调函数
    d = 0;

    if (typeof huidiaoJs === "string") {
      d = -1;
    }

    ziyuanBiao.js.forEach(function (x, index) {
      if (index > d) {
        var res = NewEle(false, "script", false, {
          src: x
        }, head); //发送加载请求

        d === 0 && (res.onload = huidiaoJs); //注册回调
      }
    });
  } //处理css加载


  if (ziyuanBiao.css) {
    var huidiaoCss = ziyuanBiao.css[0],
        //拿出回调函数
    _d = 0;

    if (typeof huidiaoCss === "string") {
      _d = -1;
    }

    ziyuanBiao.css.forEach(function (x, index) {
      if (index > _d) {
        var res = NewEle(false, "link", false, {
          href: x,
          rel: "stylesheet"
        }, head); //发送加载请求

        _d === 0 && (res.onload = huidiaoCss); //注册回调
      }
    });
  } //处理图片加载


  if (ziyuanBiao.img) {
    var huidiaoImg = ziyuanBiao.img[0],
        //拿出回调函数
    _d2 = 0;

    if (typeof huidiaoImg !== "function") {
      _d2 = -1;
    }

    if (ziyuanBiao["img"].length < 2 && _d2 === 0) {
      //处理加载图片为0的情况
      huidiaoImg && huidiaoImg();
      return;
    }

    var num = 0;
    ziyuanBiao.img.forEach(function (x, index) {
      if (index > _d2) {
        var _tmpOBJ;

        var tmpOBJ;

        if (typeof x !== "string") {
          tmpOBJ = x;
          x = tmpOBJ.img;
        }

        if (canXHR && (_tmpOBJ = tmpOBJ) !== null && _tmpOBJ !== void 0 && _tmpOBJ.randomPic) {
          RandomPic(x, false, true, _d2 === 0 ? function (local) {
            var tmp = new Image();
            tmp.src = x;
            huidiaoImg(tmp);

            if (window.ResourcesDatabase && !local) {
              putDataByKey(window.ResourcesDatabase, "images", x, oImage[x]);
            }
          } : false);
        } else {
          var img = new Image();
          img.src = x;
          img.complete ? function () {
            _d2 === 0 && huidiaoImg(img);
          }() : img.onload = img.onerror = function () {
            _d2 === 0 && huidiaoImg(img);
          };
        }
      }
    });
  } //处理音频加载


  ziyuanBiao.au && ziyuanBiao.au.forEach(function (x) {
    var index = x.lastIndexOf(".");
    var extension = x.substring(index + 1, x.length);
    var name = x.substring(0, index);

    if (index == -1) {
      NewAudio({
        source: x
      });
    } else {
      NewAudio({
        source: name,
        suffix: extension
      });
    }
  });
};