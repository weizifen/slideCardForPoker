cc.Class({
    extends: cc.Component,

    properties: {

        // defaults, set visually when attaching this script to the Canvas
        item: {
            default: null,
            type: cc.Prefab,
        }
    },

    // use this for initialization
    onLoad: function () {
        this.pokers = cc.find('Canvas/background/pokers');
        this.pokerstouch = cc.find('Canvas/background/pokerstouch');
        for (let i = 0; i < 5; i++) {
             let item = cc.instantiate(this.item);
             item.setPosition(0, 0);
            //  item.on('touchstart', () => {
            //      console.log(i);
            //  });
             item.parent = this.pokers;                  
        };
        console.log(this.pokers)

        this.pokerstouch.on('touchstart', (event) => {
            console.log('触摸了');
            this.checkPointInPoker(event.getLocation());
            this.moveStartPoint = event.getLocation();
            
        });
        this.pokerstouch.on('touchmove', (event) => {
            console.log('触摸移动');
            if(Math.abs(event.getLocation().x - this.moveStartPoint.x) >= 126){
                this.checkPointInPoker(event.getLocation());                
            }
            
        });
        this.pokerstouch.on('touchend', (event) => {
            console.log('触摸结束');
        });
        this.pokerstouch.on('touchcancel', (event) => {
            console.log('触摸结束');
        });     
           
    },

    //检测点是否在poker上
    checkPointInPoker(point){
        console.log(point);
        this.moveStartPoint = point
        for (let i = 0; i < this.pokers.children.length; i++) {
            let item = this.pokers.children[i];
            let newBox = item.getNodeToWorldTransform();
            console.log(newBox);
            var box = new cc.rect(newBox.tx, newBox.ty, item.width - 30, item.height);
            // console.log(item.x, item.y, item.width, item.height);
            let own = cc.rectContainsPoint(box, point);
            // console.log(own);
            if(own){
                console.log('包含了这个点');
                if(item.y == 50 ){
                    item.y = 0;
                }else{
                    item.y = 50;
                    
                }
            }
            
        }
    },
    // called every frame
    update: function (dt) {

    },
});
