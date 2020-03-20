const oSnake = new Snake();
oSnake.head = null;
oSnake.tail = null;

const DIRECTIONENUM = {
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 }
}

oSnake.init = function () {
    const snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    const snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    const snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    // 蛇头
    oGround.remove(snakeHead.x, snakeHead.y);
    oGround.append(snakeHead);

    // 蛇尾
    oGround.remove(snakeBody1.x, snakeBody1.y);
    oGround.append(snakeBody1);
    oGround.remove(snakeBody2.x, snakeBody2.y);
    oGround.append(snakeBody2);

    // 形成双向链表
    snakeHead.last = null;
    snakeHead.next = snakeBody1;
    snakeBody1.last = snakeHead;
    snakeBody1.next = snakeBody2;
    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;

    //默认方向right
    this.direction = DIRECTIONENUM.RIGHT;
    this.head = snakeHead;
    this.tail = snakeBody2;




}

// 策略处理
oSnake.strategies = {
    move: function(snake, square, ground, fromEat){
        const newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        //新建蛇头
        const newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');

        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);

        //将新的头作为头
        snake.head = newHead;

        if (!fromEat) {
            // 删除最后一节身体
            const newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
    
            snake.tail = snake.tail.last;
        }



    },
    eat: function(snake, square, ground){
        this.move(snake, square, ground, true);
        oGame.score++;

        createFood(ground);

    },
    die: function(){
        oGame.over();
    }
}

function createFood(ground) {
    let x =null, y = null;
    let flag = true;
    while (flag) {
        x = 1 + Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        let ok = true;
        for (let node = oSnake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                ok = false;
                break;
            }
        };
        if (ok) {
            flag = false;
        };
    };
    const oFood = SquareFactory.create('Food', x, y, 'red');
    ground.remove(oFood.x, oFood.y);
    ground.append(oFood);
}



// move 移动预判
// 根据方向和蛇头进行预判，判断下一个碰到的方块是什么
oSnake.move = function(ground){
    const tempSquare = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof tempSquare.touch == 'function') {
        this.strategies[tempSquare.touch()](this, tempSquare, ground);
    }else {
        console.log('touch is not a function')
    }
}