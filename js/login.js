//  DOM
const url = 'https://vue3-course-api.hexschool.io';
const path = 'dogezad'

const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const userCheckBtn = document.querySelector('#userCheck');

// 登入 ： 取得 token、expired 後存入 cookie
function login(event){
	event.preventDefault();
  	
	const username = usernameInput.value;
	const password = passwordInput.value;
	const data = {
		username,       // "username": username 縮寫
		password,
	}
	// 若登入成功，跳轉到商品頁面
   axios.post(`${url}/admin/signin`, data)
		.then(res =>{
			if(res.data.success = true){
				
				// const token = res.data.token;
				// const expired = res.data.expired; 為 unix timestamp
				const { token,expired } = res.data;
				window.location = 'product.html';
				// 登入成功後會把 expired: unix timestamp用 new Date()轉換為台北標準時間、token 存入 cookie
				document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
			}
			else{
				alert(`${res.data.message}，請確認帳號、密碼是否輸入正確`);
				usernameInput.value = '';
				passwordInput.value = '';
			}
		});
}

// const app = {
// 	data: {

// 	},
// 	// 初始化
// 	init(){
// 		// 取出 cookie
// 		const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
// 		axios.defaults.headers.common['Authorization'] = token;
// 	}
// }
// app.init();

// 驗證登入
function userCheck(){
	// 取出 cookie
	const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	// 把 token 加到 axios，每次發送 API才會把這個 token 代出去
	// 儲存到 header 屬性下
	axios.defaults.headers.common['Authorization'] = token;
	axios.post(`${url}/api/user/check`)
		.then(res =>{
			if(res.data.success = true){
				userCheckBtn.classList.add("btn-success");
				userCheckBtn.textContent = "已登入"
			}
			else{
				userCheckBtn.classList.add("btn-waring");
				userCheckBtn.textContent = "未登入"
			}
			//console.log(res);
		})
}
// 事件觸發
loginBtn.addEventListener('click', login);
userCheckBtn.addEventListener('click', userCheck);