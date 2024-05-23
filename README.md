<div align="center">
	<h1>Lazaki</h1>
	<p>
		<b>Lazaki - Hệ thống thương mại điện tử</b>
	</p>
	<!-- Badges -->
	<p>
	<a href="https://github.com/loozzi/lazaki/graphs/contributors">
		<img src="https://img.shields.io/github/contributors/loozzi/lazaki" alt="contributors" />
	</a>
	<a href="">
		<img src="https://img.shields.io/github/last-commit/loozzi/lazaki" alt="last update" />
	</a>
	<a href="https://github.com/loozzi/lazaki/network/members">
		<img src="https://img.shields.io/github/forks/loozzi/lazaki" alt="forks" />
	</a>
	<a href="https://github.com/loozzi/lazaki/stargazers">
		<img src="https://img.shields.io/github/stars/loozzi/lazaki" alt="stars" />
	</a>
	<a href="https://github.com/loozzi/lazaki/issues/">
		<img src="https://img.shields.io/github/issues/loozzi/lazaki" alt="open issues" />
	</a>
	</p>
	
<h4>
	<a href="https://lazaki.vercel.app" target="_blank">Xem Demo</a>
<span> · </span>
	<a href="http://lazaki.hieutn.xyz/api" target="_blank">API</a>
<span> · </span>
	<a href="https://github.com/loozzi/lazaki/issues/">Báo cáo lỗi</a>
<span> · </span>
	<a href="https://github.com/loozzi/lazaki/issues/">Yêu cầu tính năng</a>
</h4>
</div>

## Về dự án

<p>
	Hệ thống thương mại điện tử có sử dụng mô hình học máy để đề xuất sản phẩm phù hợp với người dùng.

</p>

## Công nghệ sử dụng

- **Frontend:**
  - ReactJs, TypeScript
  - NextUI
  - Redux Toolkit + Saga
- **Backend:**
  - Python
  - Flask
  - Sqlalchemy
  - Mysql
- **Bảo mật và xác thực người dùng**
  - JSON Web Tokens, Firebase

## Tính năng
- Xem danh sách sản phẩm
- Tìm kiếm sản phẩm: theo tên, theo danh mục, theo khoảng giá
- Xem chi tiết sản phẩm: thông tin, hình ảnh, đánh giá...
- Thêm sản phẩm vào giỏ hàng, sửa, xóa sản phẩm ở giỏ hàng
- Đặt hàng
- Xem lịch sử mua hàng
- Cài đặt thông tin người dùng
- Quản lý số lượng sản phẩm, danh mục, người dùng, đơn hàng
- Thêm, sửa, xóa sản phẩm
- Thêm, sửa, danh mục sản phẩm
- Vô hiệu hóa/mở khóa tài khoản người dùng
- Quản lý, cập nhật trạng thái của các đơn hàng
- ...

## Cài đặt

Docker repositoy: [Lazaki](https://hub.docker.com/r/tahodev/lazaki/tags)

Tải xuống repository

```
git clone https://github.com/loozzi/lazaki.git
```

Đi tới thư mục code

```
cd lazaki
```

### Backend

```
cd backend
```

Cài đặt Python [tại đây](https://www.python.org/) và các thư viện liên quan

```
pip install -r requirements.txt
```

Cấu hình biến môi trường

<details>
<summary>Environment config (.env)</summary>

```
SQLALCHEMY_DATABASE_URI=mysql+pymysql://<DB_USERNAME>:<DB_PASSWORD>@<DB_HOST>/<DB_DATABASE>?charset=utf8mb4
SECRET_KEY=<string>
```

</details>
Khởi tạo database

```
flask db upgrade
```

Khởi chạy máy chủ api

```
python app.ppy
```

### Frontend

```
cd frontend
```

Cài đặt NodeJs [tại đây](https://nodejs.org/en) và cài đặt các thư viện liên quan

```
npm install
```
Cấu hình biến môi trường
<details>
<summary>Environment config (.env)</summary>

```
VITE_REACT_APP_API_ENDPOINT=<API URL>
VITE_REACT_APP_FIREBASE_API_KEY=<FIREBASE API KEY>
```

</details>

Khởi chạy server frontend

```
npm run dev
```

## Đóng góp

<center>
	<table>
		<th>
			<td>Họ tên</td>
			<td>Email</td>
		</th>
		<tr>
			<td>1</td>
			<td>Vũ Thành Đạt</td>
			<td><a href="mailto:22022620@vnu.edu.vn">22022620@vnu.edu.vn</a></td>
		</tr>
		<tr>
			<td>2</td>
			<td>Nguyễn Trần Hải Ninh</td>
			<td><a href="mailto:22022526@vnu.edu.vn">22022526@vnu.edu.vn</a></td>
		</tr>
		<tr>
			<td>3</td>
			<td>Nguyễn Quang Thao</td>
			<td><a href="mailto:22022619@vnu.edu.vn">22022619@vnu.edu.vn</a></td>
		</tr>
		<tr>
			<td>4</td>
			<td>Nguyễn Quang Trung</td>
			<td><a href="mailto:22022665@vnu.edu.vn">22022665@vnu.edu.vn</a></td>
		</tr>
	</table>
</center>
