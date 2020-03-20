const tool = {
    // 不能使用箭头函数, this会指向window
    inherit: function (target, origin) {
        const temp = function () { // 不能使用箭头函数

        };
        //继承原始函数原型链上的所有方法
        temp.prototype = origin.prototype;
        //断开自身与原函数的关系
        target.prototype = new temp();
        //将自身函数重新指向到自身原型链下的构造函数里
        target.prototype.constructor = target;
        // 继承结束
    },
    extends: function (origin) {//私有属性
        const result = function () {
            origin && origin.apply(this, arguments);
            return this;
        };
        this.inherit(result, origin);
        return result;
    },
    single: function(origin){//单例模式：食物，蛇头
        const resultSingle = (function(){
            var instance;
            return function(){
                if (typeof instance == "object") {
                    return instance;
                }
                // 如果有参数，this重新指向
                origin && origin.apply(this, arguments); 
                instance = this;
            }
        })();
        // 如果有参数，需要重新继承
        origin && this.inherit(resultSingle, origin);
        return resultSingle;
    }
};

function Square(x, y, width, height, dom) {// 不能使用箭头函数
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
};

Square.prototype.touch = function () {
    console.log("touch")
}

Square.prototype.upDate = function(x, y){
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + "px";
    this.viewContent.style.top = y * SQUAREWIDTH + "px";
}
