//  DOM
const url = 'https://vue3-course-api.hexschool.io';
const path = 'dogezad'

const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const userCheckBtn = document.querySelector('#userCheck');

const app = {
	data: {
    products: [],
	},
  // 取得商品品項
  getData() {
    axios.get(`${url}/api/${path}/admin/products`)
    .then(res =>{
      if(res.data.success){
        this.data.products = res.data.products;
        console.log(this.data.products);
        this.render();
      }
      // else{
      //   // 返回登入畫面
      //   window.location = 'login.html';
      // }
    })
  },

  // 渲染商品列表
  render() {
    const productListDom = document.querySelector('#productList');
    let template = '';
    this.data.products.forEach(item =>{
      template += `
        <tr>
          <td>${item.title}</td>
          <td><img src="${item.imageUrl}" style="width: 150px"></td>
          <td width="120">${item.origin_price}</td>
          <td width="120">${item.price}</td>
          <td width="150">
          <span class="${item.is_enabled ? 'text-success fw-bolder' : 'text-danger fw-bolder'}">${item.is_enabled ? '已啟用' : '未啟用'}</span>
          </td>
          <td width="120">
            <button type="button" class="btn btn-sm btn-danger delProduct" data-action="remove" data-id="${item.id}"> 刪除 </button>
          </td>
        </tr>
      ` 
    });
    /** sol-2 
     * 使用 map() 產生一個新的陣列回傳
     const template = this.data.products.map(item =>`
      <tr>
          <td>${item.title}</td>
          <td width="120">${item.origin_price}</td>
          <td width="120">${item.price}</td>
          <td width="150">
          <span class="${item.is_enabled ? 'text-success fw-bolder' : 'text-danger fw-bolder'}">${item.is_enabled ? '已啟用' : '未啟用'}</span>
          </td>
          <td width="120">
            <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
          </td>
        </tr>
     `).join('');   渲染到畫面有問題，透過join把陣列轉為字串
    */
    //console.log(template);
    productListDom.innerHTML = template;
  // 刪除產品
    const delBtn = document.querySelectorAll('.delProduct');
    // 觸發方法為deleteProduct
    delBtn.forEach(btn =>{
      btn.addEventListener('click', this.deleteProduct);
    })
  },
  // 刪除產品
  deleteProduct(e){
    // 事件物件
    // console.log('deleteProduct',e); 在 target內可以找到 dataset id，再用 id 做到資料料刪除
    const id = e.target.dataset.id;
    axios.delete(`${url}/api/${path}/admin/product/${id}`)
      .then(res =>{
          console.log(res);
          app.getData();
      })
   
  },
  

	// 初始化
	init(){
    // 取出 cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 把 token 加到 axios，每次發送 API才會把這個 token 代出去
	  // 儲存到 header 屬性下
		axios.defaults.headers.common['Authorization'] = token;
    // 顯示商品資訊
		this.getData();
	}
}
app.init();

