//场景大小根据数值改变
// 宽度系数-每行多少方块
// 高度系数-一共多少行
const XLEN = 30;
const YLEN = 30;

//方块宽度
const SQUAREWIDTH = 20;

// 游戏场景的位置
const BASE_X_POINT = 200;
const BASE_Y_POINT = 100;


//贪吃蛇移动时间间隔
const INTERVAL = 300;

// 方块


const Floor = tool.extends(Square);
const Stone = tool.extends(Square);
const Food = tool.single(Square);
const SnakeHead = tool.single(Square);
const SnakeBody = tool.extends(Square);
const Snake = tool.single();
const Ground = tool.single(Square);

const Game = tool.single();

const STRATEGYMESSAGEENUM = {
    MOVE: 'move', 
    EAT: 'eat', 
    DIE:'die'
}