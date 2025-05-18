//数据库操作
//开启数据库缓存(植物僵尸动图，音乐) (测试时请关闭)
var Tmp_Save_Resources = true;
window.ResourcesDatabase = null;

if (!Tmp_Save_Resources) {
  indexedDB.deleteDatabase("JNG_PVZZL_RES");
}

var openDB = async function (name, ver) {
  if (!Tmp_Save_Resources) {
    return;
  }

  let version = ver || 1;
  let req = new Promise(async function (resolve, reject) {
    let request = indexedDB.open(name, version);

    request.onerror = function (e) {
      console.log("open Database error!");
      indexedDB.deleteDatabase("JNG_PVZZL_RES");
    };

    request.onsuccess = function (e) {
      //e.target.result;
      resolve(e);
      console.log("open Database success!");
    };

    request.onupgradeneeded = async function (e) {
      var db = e.target.result;

      if (e.oldVersion >= 1) {
        await db.deleteObjectStore("images");
        await db.deleteObjectStore("audios");
      }

      if (!db.objectStoreNames.contains("images")) {
        await db.createObjectStore("images", {
          keyPath: "src"
        });
      }

      if (!db.objectStoreNames.contains("audios")) {
        await db.createObjectStore("audios", {
          keyPath: "src"
        });
      }

      console.log("indexedDB version change to " + version);
    };
  });
  return req;
},
    //通过key查询
getDataByKey = function (db, storeName, key) {
  if (!Tmp_Save_Resources) {
    return null;
  }

  return new Promise(function (resolve, reject) {
    var transaction = db.transaction(storeName, "readwrite");
    var store = transaction.objectStore(storeName);
    var request = store.get(key);

    request.onsuccess = function (e) {
      resolve(e.target.result);
    };

    request.onerror = function () {
      reslove(null);
    };
  });
},
    putDataByKey = function (db, storeName, key, value) {
  if (!Tmp_Save_Resources) {
    return null;
  }

  return new Promise(function (reslove, reject) {
    let data;

    if (!value) {
      data = key;
    } else {
      data = {
        src: key,
        data: value
      };
    }

    var request = db.transaction(storeName, "readwrite").objectStore(storeName).put(data);

    request.onsuccess = function (event) {
      reslove(true);
    };

    request.onerror = function (event) {
      reslove(false);
    };
  });
},
    canXHR = navigator.onLine && /(http:\/\/)|(https:\/\/)/.test(location.href),
    RandomPic = function (l, dom = false, forceLoad = false, callback = null) {
  if (!$User.HTML5) {
    return l;
  }

  if (!canXHR) {
    return l + "?" + oSym.Now;
  }

  if (!oImage["temp"] || Math.abs(oSym.Now - oImage["temp"]["_SYSTEM_NOW"]) > 5) {
    oImage["temp"] = {
      _SYSTEM_NOW: oSym.Now
    };
  }

  if (!oImage["garbage"]) {
    oImage["garbage"] = [];
  }

  if (oImage[l] && oImage[l] != "loading") {
    let url;

    if (oImage["temp"][l] && !forceLoad) {
      url = oImage["temp"][l];
    } else {
      url = URL.createObjectURL(oImage[l]);
      oImage["garbage"][url] = url;
      oImage["temp"][l] = url;
    }

    if (dom) {
      dom.addEventListener("DOMNodeRemoved", function fun(event) {
        if (event.target !== dom) {
          return;
        }

        try {
          oSym.addTask(6000, () => {
            URL.revokeObjectURL(url);
          });

          if (oImage["temp"][l] && oImage["temp"][l] == url) {
            delete oImage["temp"][l];
          }

          delete oImage["garbage"][url];
        } catch (err) {}

        ;
        dom.removeEventListener("DOMNodeRemoved", fun);
      });
    }

    callback && callback();
    return url;
  } else if (!oImage[l]) {
    oImage[l] = "loading";

    (async function () {
      let local = false;

      if (window.ResourcesDatabase) {
        let res = await getDataByKey(window.ResourcesDatabase, "images", l);

        if (res) {
          oImage[l] = res.data;
          local = true;
          callback && callback(local);
        }
      }

      if (!local) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", l, true);
        xhr.responseType = "blob";

        xhr.onload = function () {
          let self = this;

          if (self.status == 200) {
            var blob = self.response;
            oImage[l] = blob;
            callback && callback(local);
          }
        };

        xhr.error = function () {
          delete oImage[l];
          callback && callback(local);
        };

        xhr.send();
      }
    })();
  } else if (oImage[l] === "loading") {
    callback && callback(true);
  }

  return l;
};

(async function () {
  if (Tmp_Save_Resources) {
    window.ResourcesDatabase = (await openDB("JNG_PVZZL_RES", 1)).target.result;
  }
})();