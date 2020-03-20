const oGame = new Game();
oGame.timer = null;
oGame.score = 0;

oGame.init = function () {
    oGround.init();
    oSnake.init(oGround);
    // 初始化食物
    createFood(oGround);
    // 绑定事件

    // 防抖
    document.onkeydown = function(e){
        // e.which
        // 37 -->left 38 --> up 39 --> right 40 --> down
        if (e.which == 37 && oSnake.direction != DIRECTIONENUM.RIGHT){
            oSnake.direction = DIRECTIONENUM.LEFT;
        } else if (e.which == 38 && oSnake.direction != DIRECTIONENUM.DOWN) {
            oSnake.direction = DIRECTIONENUM.UP;
        } else if (e.which == 39 && oSnake.direction != DIRECTIONENUM.LEFT) {
            oSnake.direction = DIRECTIONENUM.RIGHT;
        } else if (e.which == 40 && oSnake.direction != DIRECTIONENUM.UP) {
            oSnake.direction = DIRECTIONENUM.DOWN;
        }
    };

    const oBtn = document.getElementById('btn');
    oBtn.onclick = function(){
        oGame.start();
    }

};

oGame.start = function () {
    this.timer = setInterval(function(){
        oSnake.move(oGround);
    }, INTERVAL);
};

oGame.over = function () {
    clearInterval(this.timer);
    alert('游戏结束！最终分数为：'+this.score);
};

oGame.init();