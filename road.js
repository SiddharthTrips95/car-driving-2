class Road{
    constructor(x,width,laneCount=3){
        this.x=x;
        this.width=width;
        this.laneCount=laneCount;

        this.left = x-width/2;
        this.right = x+width/2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topleft = {x:this.left,y:this.top};
        const topright = {x:this.right,y:this.top};
        const bottomleft = {x:this.left,y:this.bottom};
        const bottomright = {x:this.right,y:this.bottom};
        this.borders = [[topleft,bottomleft],[topright,bottomright]];
    }

    getLaneCenter(laneIndex){
        const laneWidth = this.width/this.laneCount;
        return this.left+laneWidth/2+Math.min(laneIndex,this.laneCount-1)*laneWidth;   
    }

    draw(ctx){
        ctx.linewidth = 5;
        ctx.strokeStyle = "white";

        // for road lines
        for(let i = 1; i <= this.laneCount-1; i++){
            // this is linear interpolation
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            );

            // this is for dashed line
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(borders => {
            ctx.beginPath();
            ctx.moveTo(borders[0].x,borders[0].y);
            ctx.lineTo(borders[1].x,borders[1].y);
            ctx.stroke();
        });
    }
}
