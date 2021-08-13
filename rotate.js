 const PI2 = Math.PI * 2;
 const COLORS = [

                '#4b45ab',
                '#554fb8',
                '#605ac7',
                '#2a91a8',
                '#2e9ab2',
                '#32a5bf',
                '#81b144',
                '#85b944',
                '#8fc549',
                '#e0af27',
                '#eeba2a',
                '#fec72e',
                '#bf342d',
                '#ca3931',
                '#d7423a',
  ];

  class Polygon {

            constructor (x, y, radius, sides){
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.sides = sides;
                this.rotate = 0;
                
}
    
 animate(ctx, moveX) {
    
    ctx.save();
    
    //ctx.beginPath();
     
            const angle = PI2 / this.sides;
            
            ctx.translate(this.x, this.y);
            
            this.rotate -= moveX * 0.008;
            ctx.rotate(this.rotate);
     
    for (let i = 0; i < this.sides; i++){
        
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);
            
            //(i == 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);

            ctx.fillStyle = COLORS[i];
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, PI2, false);
            ctx.fill();
    }
     
            //ctx.fill();
            //ctx.closePath();
            ctx.restore();
 }  
}

    class App { 
        
    constructor() {    

            this.canvas = document.getElementById('layer1');
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

            window.addEventListener('resize', this.resize.bind(this), false);
            this.resize();
                
            this.isDown = false;
            this.moveX = 0;
            this.offsetX = 0;
                
            document.addEventListener('pointerdown', this.onDown.bind(this), false);
            document.addEventListener('pointermove', this.onMove.bind(this), false);
            document.addEventListener('pointerup', this.onUp.bind(this), false);

                
            window.requestAnimationFrame(this.animate.bind(this));    
        
    }

    resize() {
        
            this.stageWidth = document.body.clientWidth;
            this.stageHeight = document.body.clientHeight;

            this.canvas.width = this.stageWidth * this.pixelRatio;
            this.canvas.height = this.stageHeight * this.pixelRatio;
            this.ctx.scale(this.pixelRatio, this.pixelRatio);

            this.polygon = new Polygon(
            this.stageWidth / 2,
            this.stageHeight / 2,
            this.stageHeight / 3.5,
            15
    );
        
    } 
        
    animate() {
        
            window.requestAnimationFrame(this.animate.bind(this)); 

            this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

            this.moveX *= 0.92;

            this.polygon.animate(this.ctx, this.moveX);
        
    }
        
    onDown(e) {
        
            this.isDown = true;
            this.moveX = 0;
            this.offsetX = e.clientX;
        
    }
        
    onMove(e) {
        
            if (this.isDown) {
            this.moveX = e.clientX - this.offsetX;    
            this.offsetX = e.clientX;       
            }
    }
        
    onUp(e) {
            
            this.isDown = false;    
        }
    }
    window.onload = () => {
        console.log("inside rotate")
            
    new App();
    }
