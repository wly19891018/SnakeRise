const oGround = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

oGround.init = function(){
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + "px";
    this.viewContent.style.top = this.y + "px";
    this.viewContent.style.width = this.width + "px";
    this.viewContent.style.height = this.height + "px";
    this.viewContent.style.backgroundColor = "#0ff";
    document.body.appendChild(this.viewContent);
    this.SquareTable = []; 
    for (let y = 0; y < YLEN; y++) {
        this.SquareTable[y] = new Array(XLEN);
        let newSquare;
        for (let x = 0; x < XLEN; x++) {
            if (x == 0 || x == XLEN - 1 || y == 0 || y == YLEN-1) {
                // 墙
                newSquare = SquareFactory.create('Stone', x, y, 'black')
            } else {
                // 地板
                newSquare = SquareFactory.create('Floor', x, y, 'orange')
            }
            this.viewContent.appendChild(newSquare.viewContent);
            this.SquareTable[y][x] = newSquare;
        }
    }
}

// 移除该坐标的所有数据
oGround.remove = function(x, y){
    let tempData = this.SquareTable[y][x];
    this.viewContent.removeChild(tempData.viewContent);
    tempData = null;
}

//将该数据添加到oGround的SquareTable中，并渲染
oGround.append = function(square){
    //插入新节点
    this.viewContent.appendChild(square.viewContent);
    // 更新数据
    this.SquareTable[square.y][square.x] = square;
}