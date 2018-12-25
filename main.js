window.onload = () => {

	//変数の準備
	var file = document.getElementById('file');
	var canvas = document.getElementById('canvas1');
	var btn = document.getElementById("btn");
	var canvasWidth = 1100;
	var canvasHeight = 1100;
	var TRIM_SIZE = 1100;
	var uploadImgSrc;
	var startLX = -220;
	var startLY = 110;
	var endLX = -565;
	var endLY = 163;
	var startRX = 45;
	var startRY = -165;
	var endRX = 15;
	var endRY = -480;

	var diffLX = endLX - startLX;
	var diffLY = endLY - startLY;
	var diffRX = endRX - startRX;
	var diffRY = endRY - startRY;
	var time = 1000;


	// Canvasの準備
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	var ctx = canvas.getContext('2d');

	var subCanvas = document.getElementById("canvas2");
	var subCtx = subCanvas.getContext("2d");
	subCanvas.width = subCanvas.height = 1100;




	function loadLocalImage(e) {
	    // ファイル情報を取得
    	var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    	if(!fileData.type.match('image.*')) {
        	alert('画像を選択してください');
        	return;
    	}

    	// FileReaderオブジェクトを使ってファイル読み込み
    	var reader = new FileReader();
    	// ファイル読み込みに成功したときの処理
    	reader.onload = function() {
    	    // Canvas上に表示する
    	    	lx = startLX;
				ly = startLY;
				rx = startRX;
				ry = startRY;
    	    uploadImgSrc = reader.result;
    	    render();

    	}
    	// ファイル読み込みを実行
    	reader.readAsDataURL(fileData);
    	setTimeout(() => {
    		setInterval(addText, 400);
    	}, 2000);
	}


	function render() {
		canvasDrawImage();
		canvasDrawLeft();
		canvasDrawRight();
		setTimeout(() => {grayScale();}, 1000);
	}


	function renderCOPY() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		canvasDrawImage();
		var count = 0;
		var onTimeout = function() {
				setInterval(() => {
					count++;
					if(count > 10) {
						clearInterval();
				    } else {
				    	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
						canvasDrawImage();
						lx += 5;
						ly -= 5;
						rx -= 5;
						ry += 5;
						console.log(lx);
						canvasDrawLeft(lx, ly);
						canvasDrawRight(rx, ry);
						console.log(count);
				    }
				}, 150);
			}
		onTimeout();
	    setTimeout(() => {grayScale();}, 1000);
	}



	function handsRotate() {
		ctx.translate(200, 80);
	    ctx.rotate(Math.PI/180 * 5);
	    ctx.translate(-200, -80);
	}

	function strRotate() {
		subCtx.translate(200, 80);
	    subCtx.rotate(Math.PI/180 * 4);
	    subCtx.translate(-200, -80);
	}


	//グレースケール
	function grayScale() {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var dataMiddle = data.slice(717200, 4035000);

        var num = dataMiddle.length;
        var pix = num / 4;

        console.log(imageData);
        console.log(data);
        console.log(dataMiddle);
        console.log(num);
        console.log(pix);


        for(var i = 0; i < pix; i++){
        	var r = dataMiddle[i*4];
        	var g = dataMiddle[i*4 + 1];
        	var b = dataMiddle[i*4 + 2];
        	var a = dataMiddle[i*4 + 3];

        	var g = parseInt((r*30 + g*59 + b*11) / 100);
        	dataMiddle[i*4] = g;
        	dataMiddle[i*4 + 1] = g;        	        	        	
        	dataMiddle[i*4 + 2] = g;	        	
        }

        console.log(data);
        console.log(imageData);
        console.log(dataMiddle);

        data.set(dataMiddle, 717200);

        console.log(data);
        ctx.putImageData(imageData, 0, 0);
	}	




	// Canvas上に画像を表示する
	function canvasDrawImage() {
    // canvas内の要素をクリアする
	    // Canvas上に画像を表示
	    var img1 = new Image();
	    img1.src = uploadImgSrc;
	    img1.onload = function() {
	    	if (img1.width > img1.height) {
            h = TRIM_SIZE;
            w = img1.width * (TRIM_SIZE / img1.height);
            xOffset = -(w - TRIM_SIZE) / 2;
            yOffset = 0;
        } else {
            w = TRIM_SIZE;
            h = img1.height * (TRIM_SIZE / img1.width);
            yOffset = -(h - TRIM_SIZE) / 2;
            xOffset = 0;
        }
        ctx.drawImage(img1, xOffset, yOffset, w, h);

	    }
	}

	function canvasDrawLeft() {
		var img2 = new Image();
	    img2.onload = function() {
	    	ctx.save();
	    	handsRotate();
	        ctx.drawImage(img2, endLX, endLY, 1710, 1450);
	    	ctx.restore();
	    }

		img2.src = "./img/left.png";

	}

	function canvasDrawRight() {

	    var img3 = new Image();
	    img3.onload = function() {
	    	ctx.save();
			handsRotate();
	    	ctx.drawImage(img3, endRX, endRY, 1800, 1332);
	    	ctx.restore();
		}
	    img3.src = "./img/right.png";
	}

	// Canvas上にテキストを表示する
	function addTextCOPY() {
		var text = document.getElementById("story").value;
			render();
			strRotate;
			console.log(text);
			var fontSize = 12;
			var x = 30;
			var y = 60;
			ctx.beginPath();
			ctx.font = "bold 12px serif";
			var lineHeight = 1;
    		ctx.textBaseline = 'middle';
    		ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';

			for( var lines=text.split( "\n" ), i=0, l=lines.length; l>i; i++ ) {
				var line = lines[i] ;
				var addY = fontSize ;
				console.log(line);
			    console.log(addY);
				if ( i ) addY += fontSize * lineHeight * i ;

				ctx.fillText( line, x + 0, y + addY ) ;
				btn.href = canvas.toDataURL("image/png");
				console.log(btn.href);
			}

	}



	function addText() {
		var text = document.getElementById("story").value;
			subCtx.clearRect(0, 0, 9999, 9999);
			console.log(text);
			var fontSize = 52;
			var x = 577;
			var y = 450;
			var fontFamily = 
			subCtx.save();
			strRotate();
			subCtx.beginPath();
			subCtx.font = 'bold 52px "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "ＭＳ Ｐゴシック", "游ゴシック体", "YuGothic", "游ゴシック Medium", "Yu Gothic Medium", "游ゴシック", "Yu Gothic", "メイリオ", "sans-serif"';
			var lineHeight = 1.4;
    		subCtx.textBaseline = 'middle';
    		subCtx.textAlign = "center";

			for( var lines=text.split( "\n" ), i=0, l=lines.length; l>i; i++ ) {
				var line = lines[i] ;
				var addY = fontSize ;
				var textWidth = subCtx.measureText(line).width;
				console.log(textWidth);
				if ( i ) addY += fontSize * lineHeight * i ;
				if (l > 1) addY -= fontSize * l / 2 ;
				if (text % 17 === 0) text + "\n";
				subCtx.fillStyle = '#000';
    			subCtx.fillRect(x - textWidth / 2, y + addY - 23, textWidth, fontSize + 2);
				subCtx.strokeStyle = '#000';
    			subCtx.lineWidth = 5;
    			subCtx.strokeRect(x - textWidth / 2, y + addY - 23, textWidth, fontSize + 2);
    			subCtx.fillStyle = 'rgba(255, 255, 255, 1.0)';
				subCtx.fillText( line, x + 0, y + addY ) ;
			}
			subCtx.restore();
			console.log(line);
			console.log(addY);
	}

		// ファイルが指定された時にloadLocalImage()を実行
	file.addEventListener('change', loadLocalImage, false);

	btn.addEventListener("click", downloadImg, false);

	function downloadImg() {
			ctx.drawImage(subCanvas, 0, 0);
			var newImg = canvas.toDataURL("image/png");
			btn.setAttribute("href", newImg);
			console.log(btn.href);
	}
} 