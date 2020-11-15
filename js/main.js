"use strict";

{
  $(function () {
    $("body").css("overflow", "hidden"); //初期状態ではスクロール不可

    ////////////////////////////////////////////////
    //ロード完了まで、スクロール処理を実行させない//
    ////////////////////////////////////////////////
    $(window).on("load", function () {
      const loadingView = $(".loadingView");
      loadingView.fadeOut(100); //ロードが完了したら.loadingViewを非表示に
      $("body").css("overflow", "auto"); //ロード完了後、スクロールを可能にする
    });

    //////////////////////////////
    //ハンバーガーメニューの動作//
    //////////////////////////////
    $(".ham").on("click", function () {
      if ($(this).hasClass("clicked")) {
        //.hamが"clicked"のセレクターを所有していた場合
        $(this).removeClass("clicked"); //.hamから"clicked"のセレクターを除去する
      } else {
        $(this).addClass("clicked"); //.hamになかった場合、"clicked"のセレクターを追加する
      }
      if ($(".menuWrapper").hasClass("clicked")) {
        $(".menuWrapper").removeClass("clicked");
      } else {
        $(".menuWrapper").addClass("clicked");
      }
    });

    ////////////////////////////////////
    // aクリック時のスムーススクロール//
    ////////////////////////////////////
    $("a[href ^=#]").click(function () {
      let speed = 400;
      let href = $(this).attr("href"); // アンカーhref属性の値を取得
      let target = $((href == "#") | (href == "") ? "html" : href);
      let position = target.offset().top; // 移動先を数値で取得
      $($.support.safari ? "body" : "html").animate(
        { scrollTop: position },
        speed,
        "swing"
      );
      if ($(".ham").hasClass("clicked")) {
        //.hamに"clicked"があった場合
        $(".ham").removeClass("clicked"); //外す
      }
      if ($(".menuWrapper").hasClass("clicked")) {
        //.menuWrapperに"clicked"があった場合
        $(".menuWrapper").removeClass("clicked"); //外す
      }
      return false; // URLにアンカーリンクを付加させない
    });

    ////////////////////////////
    //eyecatchのスライドショー//
    ////////////////////////////
    let page = 0; //①ページの概念・初期ページを設定
    let lastPage = parseInt($("#sliderWrap #slider").length - 1); //②イメージの数を最後のページ数として変数化
    let Timer;
    $("#sliderWrap #slider").css("display", "none"); //③最初に全部のイメージを一旦非表示にする
    $("#sliderWrap #slider").eq(page).css("display", "block"); //④初期ページを表示
    //⑤ページ切換用、自作関数作成
    function changePage() {
      $("#sliderWrap #slider").fadeOut(1500);
      $("#sliderWrap #slider").eq(page).fadeIn(1500);
    }
    //⑥～秒間隔でイメージ切換の発火設定
    function startTimer() {
      Timer = setInterval(function () {
        if (page === lastPage) {
          page = 0;
          changePage();
        } else {
          page++;
          changePage();
        }
      }, 3500);
    }
    function stopTimer() {
      clearInterval(Timer);
    }
    startTimer();
    /*オプションを足す場合はここへ記載*/
  });

  //////////////////////
  //スクロールイベント//
  //////////////////////
  $(".toTop").css("display", "none");
  $(window).scroll(function () {
    //////////////////////
    // toTopのarrow表示 //
    //////////////////////
    $(".toTop").each(function () {
      let scroll = $(window).scrollTop(); //ページのトップからスクロールした距離
      let targetElement = $("#Eyecatch").offset().top; //ターゲットまでのトップからの距離
      let windowHeight = $(window).height(); //実際のwindowの高さ（デバイスによって可変する）

      if (scroll > targetElement + 200) {
        // $(this).css("display", "block");
        $(this).fadeIn(400);
      } else {
        // $(this).css("display", "none");
        $(this).fadeOut(400);
      }
    });
    /////////////////////////////////////
    //profileでの左右からのスライド表示//
    /////////////////////////////////////
    $(".slideContsR").each(function () {
      let scroll = $(window).scrollTop();
      let targetElement = $(this).offset().top;
      let windowHeight = $(window).height();
      if (scroll > targetElement - windowHeight + 80) {
        $(this).css("transform", "translateX(0)");
      } else {
        $(this).css("transform", "translateX(100rem)");
      }
    });
    $(".slideContsL").each(function () {
      let scroll = $(window).scrollTop();
      let targetElement = $(this).offset().top;
      let windowHeight = $(window).height();
      if (scroll > targetElement - windowHeight + 80) {
        $(this).css("transform", "translateX(0)");
      } else {
        $(this).css("transform", "translateX(-200rem)");
      }
    });
    /////////////////////////////
    // skillCardでの上下の表示 //
    /////////////////////////////
    $(".scrollFade").each(function () {
      let scroll = $(window).scrollTop();
      let targetElement = $(this).offset().top;
      let windowHeight = $(window).height();
      if (scroll > targetElement - windowHeight + 100) {
        $(this).css("opacity", "1");
        $(this).css("transform", "translateY(0)");
      } else {
        $(this).css("opacity", "0");
        $(this).css("transform", "translateY(8rem)");
      }
    });
  });
  //スクロールイベント終了//

  ////////////////////////////////////////////////////////
  //パララックス調に背景を設定し、切り替える(iPhone対応)//
  ////////////////////////////////////////////////////////
  let beforeBg = "";
  $(window).on("load scroll touchmove", function () {
    let scrollTop = $(window).scrollTop(); // 画像を切り替える位置
    let changePoint1 = $(".urgeScroll").offset().top;
    let changePoint2 = $("#Skill").offset().top;
    if (scrollTop < changePoint1) {
      if (beforeBg !== "bg0") {
        $("#Service").addClass("bg0");
        $("#Service").removeClass("bg1");
        $("#Service").removeClass("bg2");
        beforeBg = "bg0";
      }
    } else if (scrollTop < changePoint2) {
      // 同じ背景画像への切替を行わないように判定
      if (beforeBg !== "bg1") {
        // 新しい画像へ切替
        $("#Service").removeClass("bg0");
        $("#Service").addClass("bg1");
        $("#Service").removeClass("bg2");
        beforeBg = "bg1";
      }
    } else {
      if (beforeBg !== "bg2") {
        $("#Service").removeClass("bg0");
        $("#Service").removeClass("bg1");
        $("#Service").addClass("bg2");
        beforeBg = "bg2";
      }
    }
  });
}
