let defaultLocation = [
    [],
    [1,2,3,4, 5],
    []
]

class TowerOfHanoi {
    constructor() {
        this.stick = [
            [1, 3, 4],
            [2, 5, 6, 7],
            [8]
        ];
        this.rings = [
            [],
            [],
            []
        ];
        this.win = false
        this.curFrom = NaN;
        this.createRings();
        this.correctPosition();
        this.moves = 0;
      this.slideSound =  loadSound('move.mp3');
      this.moveSound =  loadSound('move.mp3');
    }
    createRings() {
        for (let j = 0; j < 3; j++) {
            for (let i = defaultLocation[j].length - 1; i >= 0; i--) {
                let _size = defaultLocation[j][i];
                this.rings[j].push({
                    rollover: false,
                    dragging: false,
                    moved: true,
                    size: _size,
                    x: -300,
                    y: -300 + 20 * _size,
                    w: 30 + 20 * _size,
                    h: 20,
                    // color: color('green'),
                    offsetX: 0,
                    offsetY: 0
                });
            }
        }
      
    }
    correctPosition() {
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < this.rings[j].length; i++) {

                if (this.rings[j][i].moved) {
                    
//                 if (true) {
                    let y = 380 - 20 * (i + 1);
                    let x = (200 * (j + 1)) - (this.rings[j][i].w / 2);
                    if (this.rings[j][i].x != x || this.rings[j][i].y != y) {
                        let dx = (this.rings[j][i].x - x);
                        let dy = (this.rings[j][i].y - y);

                        if (abs(dx) < 1 && abs(dy) < 1) {
                            this.rings[j][i].x = x;
                            this.rings[j][i].y = y;
                        } else {
                            this.rings[j][i].x -= dx * 0.5;
                            this.rings[j][i].y -= dy * 0.5;
                        }
                    } else {
                        // this.slideSound.stop();
                        this.rings[j][i].moved = false;
                    }
                }
            }
        }
    }


    show() {
        this.showTable();
        this.showSticks();
        push()
        stroke(0);
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < this.rings[j].length; i++) {
                if (this.rings[j][i].dragging) {
                    fill(50);
                    // this.rings[j][i].color.setAlpha(200);
                } else if (this.rings[j][i].rollover) {
                    // this.rings[j][i].color.setAlpha(235);
                    fill(100);
                } else {
                    // this.rings[j][i].color.setAlpha(255);
                    fill(175, 230);
                }
                rect(this.rings[j][i].x, this.rings[j][i].y, this.rings[j][i].w, this.rings[j][i].h, 30);
                fill(0);
                text(this.rings[j][i].size, this.rings[j][i].x + this.rings[j][i].w / 2, this.rings[j][i].y + 15);
            }
        }
      
      textSize(24);
      stroke(30);
      strokeWeight(3);
      fill(230);
      text("Moves Used : "+this.moves,320,50,200,100);
        pop();
    }
    update() {

        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < this.rings[j].length; i++) {

                if (this.rings[j][i].dragging) {
                    this.rings[j][i].x = mouseX + this.rings[j][i].offsetX;
                    this.rings[j][i].y = mouseY + this.rings[j][i].offsetY;
                }

            }
        }

        this.correctPosition();

    }


    over() {
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < this.rings[j].length; i++) {
                if (mouseX > this.rings[j][i].x && mouseX < this.rings[j][i].x + this.rings[j][i].w && mouseY > this.rings[j][i].y && mouseY < this.rings[j][i].y + this.rings[j][i].h) {
                    this.rings[j][i].rollover = true;
                } else {
                    this.rings[j][i].rollover = false;
                }
            }
        }
    }
    released() {
        for (let j = 0; j < 3; j++) {
//             let i = this.rings[j].length-1;
              for(let i = 0; i< this.rings[j].length;i++)
                 {

                this.rings[j][i].dragging = false;
                this.rings[j][i].moved = true;

                if (!isNaN(this.curFrom)) {
                    let centerX = mouseX + (this.rings[j][i].w / 2);

                    if (centerX < 300) {
                        if (this.curFrom !== 0)
                            this.move(this.curFrom, 0)
                        else
                          this.slideSound.play();
                    } else if (centerX < 500 && centerX > 300) {
                        if (this.curFrom !== 1)
                            this.move(this.curFrom, 1)
                        else
                          this.slideSound.play();
                    } else if (centerX > 500) {
                        if (this.curFrom !== 2)
                            this.move(this.curFrom, 2)
                        else
                          this.slideSound.play();
                    }else
                      this.slideSound.play();
                    this.curFrom = NaN;
                }else{
                  this.slideSound.play();
                }
              }

        }
    }
    pressed() {

        for (let j = 0; j < 3; j++) {
          let i = this.rings[j].length-1;
          if(i!==-1)
          {
                if (mouseX > this.rings[j][i].x && mouseX < this.rings[j][i].x + this.rings[j][i].w && mouseY > this.rings[j][i].y && mouseY < this.rings[j][i].y + this.rings[j][i].h) {

                    this.curFrom = j;

                    this.rings[j][i].dragging = true;

                    this.rings[j][i].offsetX = this.rings[j][i].x - mouseX;
                    this.rings[j][i].offsetY = this.rings[j][i].y - mouseY;
                }

            }
        }
    }


    showTable() {
        push();
        fill(color('maroon'))
        rect(50, 380, 700, 20, 5);
        pop();
    }
    showSticks() {
        push();

        fill(color('brown'))
        rect(190, 180, 20, 205, 3);

        fill(color('brown'))
        rect(390, 180, 20, 205, 3);

        fill(color('brown'))
        rect(590, 180, 20, 205, 3);

        pop();
    
    }

    move(from, to) {
        if (this.rings[to].length !== 0)
            if (this.rings[to].at(-1).size < this.rings[from].at(-1).size)
                return false;
        this.rings[to].push(this.rings[from].pop());
      this.moves++;
      this.moveSound.play();
      this.checkWin();
      return true;
    }
  checkWin(){
    if(this.rings[0].length===8||this.rings[2].length===8)
       {
        this.win = true;
       }
    
  }
  getWin(){
    return this.win;
  }
    
}
