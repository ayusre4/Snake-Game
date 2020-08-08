		var width = 520;
		var height = 520;
		var n = 20;
		var matrix = new Array(n);
		for(var i = 0;i<matrix.length;i++){
			matrix[i] = new Array(n);
		}
		var cell_size = width/n;					//n = no of small cell in a row/cloumn
		var canvas = document.getElementById("ayusre4");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#9900FF"; 					//Selecting Brush Colour	
		ctx.fillRect(0, 0, width, height);			//Filling The Rectangle
		for (var i = 0; i < n; i++){
			for (var j = 0; j < n; j++){
				matrix[i][j] = 0;
				draw(i,j);
			}
		}
		function draw(i,j){
			if((i+j)%2==0){
				ctx.fillStyle = "#9900FF";
			}
			else{
				ctx.fillStyle = "#FF66FF";
			}
			ctx.fillRect(cell_size*i, cell_size*j, cell_size, cell_size);			//Filling Small Rectangles
		}


			
		//Detecting Key Press And Playing Movement Audio
		document.onkeydown = key_press;
		var state = 0;								//0->Left 1->Up 2->Right 3->Down
		function key_press(a) {	 					//Function to Detect Keypress
			a = a || window.event; 
			if (a.keyCode == '37' && state!=0 && state!=2){				//Left Arrow Pressed
				state =0;
				play_left();
			}
			else if (a.keyCode == '38' && state!=1 && state!=3){		//UP Arrow Pressed
				state=1;
				play_up();
			}
			else if (a.keyCode == '39' && state!=0 && state!=2){		//Right Arrow Pressed
				state = 2;
				play_right();
			}
			else if (a.keyCode == '40' && state!=1 && state!=3){		//Down Arrow Pressed
				state=3;
				play_down();
			}
		}
		function play_up(){										//Movement Audio
			var audio = new Audio('sounds/up.wav');
			audio.play();
		}
		function play_down(){										//Movement Audio
			var audio = new Audio('sounds/down.wav');
			audio.play();
		}
		function play_left(){										//Movement Audio
			var audio = new Audio('sounds/left.wav');
			audio.play();
		}
		function play_right(){										//Movement Audio
			var audio = new Audio('sounds/right.wav');
			audio.play();
		}

		//Snake Body
		var body = [];
		body.push([(n/2)+1,n/2]);											//Head->(x,y)
		body.push([(n/2),n/2]);											//Body->(x,y)
		body.push([(n/2)-1,n/2]);										//Tail->(x,y)

		//Generating Food
		var food_x = 0;
		var food_y = 0;
		var food_image = new Image();
		food_image.src = "http://www.clipartbest.com/cliparts/aie/6px/aie6pxyLT.png";
		function gen_food(){
			var success = false;
			while(!success){
				food_x = parseInt(Math.random()*n);
				food_y = parseInt(Math.random()*n);
				success = true;
				for (var i=0;i<body.length;i++){
					if (body[i][0]==food_x && body[i][1]==food_y){
						success = false;
					}
				}
			}
		}
		gen_food();
		function play_consume() {										//Food Consume Audio
			var audio = new Audio('sounds/consume.mp3');
			audio.play();
		}
		function update(){
			
			var increase = false;
			if(body[0][0]==food_x && body[0][1]==food_y){
				gen_food();
				play_consume();
				increase = true;
			}
			for (var i = 0; i < n; i++){
				for (var j = 0; j < n; j++){
					draw(i,j);
				}
			}
			for (var i=0;i<body.length;i++){
				ctx.fillStyle = "#A7D948";
				ctx.fillRect(cell_size*body[i][0], cell_size*body[i][1], cell_size, cell_size);
			}
			ctx.drawImage(food_image, food_x*cell_size, food_y*cell_size, cell_size, cell_size);
			var x = 0;
		    var y = 0;
		    if(state==2){
		    	x++;
		    }
		    else if(state==3){
		    	y++;
		    }
		    else if(state==0){
		    	x--;
		    }
		    else if(state==1){
		    	y--;
		    }

		    var first = body[0];
		    for(var i=0; i<first.length;i++){
		    	for(var j=0;j<first[i].lenght;j++){
		    		console.log(first[i][j]);
		    	}
		    }
		    var arr = [ first[0]+x , first[1]+y ];
		    body.splice(0,0, arr);
		    if(!increase){
		    	body.pop();
		    }
		}
		setInterval(update,150);
		