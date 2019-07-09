<template>
    <div class="upload" id="upload">
        <div class="upload-content">
			<div class="gather-title">
				<div @click="backBtn">
					<img src="/static/images/gather/back-icon.png" alt="" srcset="">
				</div>
				<div>上传图片</div>
				<div>
					<img src="" alt="">
				</div>
			</div>
			<div class="upload-maddile">
				<ul style="position: relative;">
					<li v-for="item in oImages"  
					:style="{
						width:item.width,
						height:item.height,
						position:'absolute',
						top:item.top,
						left:item.left
					}">
						
						<!-- <input type="file" accept="image/*" @change="imageFunc"> -->
					</li>
				</ul>
			</div>
			<input type="file" name="img" id="img">
			class<input type="text" id="img1">
			title<input type="text" id="img2">,name<input type="text" id="img3">,sign<input type="text" id="img4">
			<button @click="upBtn">上传</button>
        </div>
    </div>
</template>

<script>
import Api from "src/services/api"
var avatar1,avatar2,avatar3;
export default {
	data() {
		return {
			 bookname:"",
			image:"",
			img_url:[],
			upImages:[],
			oImages:[{
				id:1,
				width:"100px",
				height:"200px",
				top:"0",
				left:"0px"
			},{
				id:2,
				width:"100px",
				height:"200px",
				top:"0",
				left:"102px"
			},{
				id:3,
				width:"100px",
				height:"200px",
				top:"0",
				left:"204px"
			},{
				id:4,
				width:"100px",
				height:"200px",
				top:"0",
				left:"306px"
			}]
		};
	},
	components: {},
	methods: {
		upload(){
			Api.uploadPictures({
				bookname:this.bookname,
				image:this.image,
			}).then(res=>{
				console.log(res)
			})
		},
		cancelupload(){

		},
		backBtn() {
			window.history.back();
		},
		clip() {
			avatar.imageClipper(function(data) {
				console.log(data);
				//  将图片上传至后台
				// avatar.upload({
				// 	url: "http://localhost:3080/profile",
				// 	name: "avatar",
				// 	data: { userName: "hzy0913", info: "someInfo" },
				// 	success: function(data) {
				// 		console.log(data);
				// 	},
				// 	error: function(error) {
				// 		console.log(error);
				// 	}
				// });
			});
		},
		reset() {
			avatar.resetImage();
		},
		funcMavatar(){
		
		},
		onFileChange(e){
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length) return; 

			this.createImage(files);
		},
		createImage(file){
			if(typeof FileReader==='undefined'){
                console.log('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            var image = new Image();         
            var vm = this;
			var leng=file.length;
			
            for(let i=0;i<leng;i++){
                var reader = new FileReader();
                reader.readAsDataURL(file[i]); 
                reader.onload =  function(e){
					console.log(file[i])
					vm.upImages.push({
						imgBase:e.target.result,
						imgName:file[i].name,
						imgType:file[i].type,
						imgSize:file[i].size
					});  
				};          
			} 			
		},
		ccccc(e){

			Api.upfileImg().then(res=>{
				console.log(res)
			})
		},
		bbbb(){
			console.log(this.upImages)
			Api.upfileP({
				type:this.upImages[0].imgType,
				name:this.upImages[0].imgName,
				base:this.upImages[0].imgBase
			}).then(res=>{
				console.log(res)
			})
			
			
		},
		aaa(){
			this.getfileFunc()
		},
		getfileFunc(){
			Api.getfile().then(res=>{
				var res=JSON.parse(res)
				// console.log(res.errcode)
				res.forEach(element => {
					console.log(element)
					this.img_url.push(element.base)
				});
				// this.getImg=res;
			})
		},
		upBtn(){
			console.log($('#img1').val())
			var formData=new FormData();
			formData.append("imgUploader",$('#img')[0].files[0])
			formData.append("imgUploader",$('#img1').val())
			formData.append("imgUploader",$('#img2').val())
			formData.append("imgUploader",$('#img3').val())
			formData.append("imgUploader",$('#img4').val())

			$.ajax({
				url:"http://1434253600.xyz/api/uploader",
				type:"post",
				data:formData,
				cache: false,
				contentType: false,
				processData: false,
				success:res=>{
					console.log(res)
				}
			})
		}
	},
	mounted() {
		// this.getfileFunc()
		
		

	}
};
</script>
<style lang="less">
#upload {
	width: 100%;height: 100%;
	overflow: hidden;
	.upload-content{
		width: 100%;height: 100%;
		flex: 1;display: flex;
		flex-direction: column;justify-content: flex-start;
		.gather-title {
			width: 100%;height: 50Px;
			line-height: 50Px;
			font-size: 40px;color: #000;
			padding: 0 20px;box-sizing: border-box;
			font-weight: bold;
			background: #ffffff;
			box-shadow: 0 2px 10px rgba(177, 175, 175, 0.8);
			display: flex;justify-content: space-between;align-items: center;
			div:nth-of-type(3) {
				width: 40px;
			}
			img {
				width: 40px;
			}
		}
		.upload-maddile{
			width: 100%;height: 100%;
			ul{
				
				li{
					background: red;
					position: relative;
					input{
						position: absolute;top: 0;left: 0;
						display: block;
						width: 100%;height: 100%;
						background:yellow;
						opacity: 0;
					}
				}
			}
		}
	}
}
.img-box{
	width: 100%;
	display: flex;justify-content: flex-start;
	flex-wrap: wrap;
	img{
		width: 50%;display: block;
	}
}

</style>

