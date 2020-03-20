function SquareFactory() {

};

SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == 'undefined'){
        throw 'no this type';
    };
    // 如果没有继承关系，建立继承关系
    if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    };

    const newSquare = new SquareFactory.prototype[type](x, y, color);
    return newSquare;
}
SquareFactory.prototype.init = function(square, color, msg){
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.backgroundColor = color;
    square.viewContent.style.width = square.width + "px";
    square.viewContent.style.height = square.height + "px";
    square.viewContent.style.left = square.x * SQUAREWIDTH + "px";
    square.viewContent.style.top = square.y * SQUAREWIDTH + "px";
    square.touch = function(){
        return msg;
    }
}

SquareFactory.prototype.Floor = function(x, y, color){
    const oFloor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oFloor, color, STRATEGYMESSAGEENUM.MOVE);
    return oFloor;
}

SquareFactory.prototype.Stone = function(x, y, color){
    const oStone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oStone, color, STRATEGYMESSAGEENUM.DIE);
    return oStone;
}

SquareFactory.prototype.Food = function(x, y, color){
    const oFood = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oFood, color, STRATEGYMESSAGEENUM.EAT);
    oFood.upDate(x, y);
    return oFood;
}

SquareFactory.prototype.SnakeHead = function(x, y, color){
    const oSnakeHead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oSnakeHead, color, STRATEGYMESSAGEENUM.DIE);
    oSnakeHead.upDate(x, y);
    return oSnakeHead;
}

SquareFactory.prototype.SnakeBody = function(x, y, color){
    const oSnakeBody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oSnakeBody, color, STRATEGYMESSAGEENUM.DIE);
    return oSnakeBody;
}