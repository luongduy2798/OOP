# Ví dụ Lập trình Hướng đối tượng với TypeScript

Đây là bộ sưu tập các ví dụ về lập trình hướng đối tượng (OOP) sử dụng TypeScript, từ cơ bản đến nâng cao.

## 📁 Cấu trúc file

### 1. `01-basic-class.ts` - Class cơ bản
- **Chủ đề**: Class, Constructor, Getter/Setter, Encapsulation cơ bản
- **Nội dung**:
  - Khai báo class với thuộc tính private
  - Constructor với tham số mặc định
  - Phương thức getter/setter
  - Validation dữ liệu
  - Phương thức hiển thị thông tin

### 2. `02-inheritance.ts` - Tính kế thừa
- **Chủ đề**: Inheritance, Abstract Class, Polymorphism
- **Nội dung**:
  - Abstract class `DongVat` làm lớp cha
  - Các lớp con: `Cho`, `Meo`, `Chim`
  - Phương thức abstract bắt buộc override
  - Polymorphism với mảng đối tượng khác nhau
  - Override phương thức từ lớp cha

### 3. `03-encapsulation.ts` - Tính đóng gói
- **Chủ đề**: Encapsulation, Access Modifiers, Data Protection
- **Nội dung**:
  - Class `TaiKhoanNganHang` với thuộc tính private
  - Validation và bảo mật dữ liệu
  - Static methods và properties
  - Kế thừa với `TaiKhoanTietKiem`
  - Getter/Setter với logic kiểm tra

### 4. `04-polymorphism.ts` - Tính đa hình
- **Chủ đề**: Polymorphism, Interface, Type Checking
- **Nội dung**:
  - Multiple interfaces: `ICoBan`, `IChet`, `ISinhSan`
  - Các class implement nhiều interface
  - Polymorphic arrays và functions
  - Type checking với `instanceof`
  - Method overloading simulation

### 5. `05-interface-abstract.ts` - Interface và Abstract Class
- **Chủ đề**: Interface vs Abstract Class, Multiple Implementation
- **Nội dung**:
  - Interface: `IHinhHoc`, `IVeHinh`, `IMauSac`
  - Abstract class `Hinh`
  - Các hình học: `HinhTron`, `HinhChuNhat`, `HinhVuong`, `HinhTamGiac`
  - Utility classes: `QuanLyHinh`, `ThaoTacVe`
  - Kết hợp interface và inheritance

### 6. `06-composition-aggregation.ts` - Composition và Aggregation
- **Chủ đề**: Object Relationships, Has-a vs Uses-a
- **Nội dung**:
  - **Composition**: `XeHoi` có `DongCo` và `BanhXe` (không thể tồn tại độc lập)
  - **Aggregation**: `LopHoc` sử dụng `GiangVien` và `SinhVien` (có thể tồn tại độc lập)
  - Minh họa sự khác biệt giữa 2 mối quan hệ
  - Quản lý lifecycle của đối tượng

### 7. `07-design-patterns.ts` - Design Patterns
- **Chủ đề**: Common Design Patterns
- **Nội dung**:
  - **Singleton**: `DatabaseConnection` - đảm bảo chỉ có 1 instance
  - **Factory**: `VehicleFactory` - tạo đối tượng mà không biết class cụ thể
  - **Observer**: `NewsPublisher/Subscriber` - thông báo thay đổi
  - **Strategy**: `PaymentStrategy` - thay đổi thuật toán tại runtime

## 🚀 Cách chạy

3. **Chạy tất cả file**:
   ```bash
   # Chạy từng file JavaScript
   node 01-basic-class.js
   node 02-inheritance.js
   # ... và tiếp tục
   ```

## 📚 Khái niệm chính

### 1. **Class và Object**
- Class là template/blueprint để tạo object
- Object là instance của class
- Constructor để khởi tạo object

### 2. **Tính đóng gói (Encapsulation)**
- `private`: chỉ truy cập được trong class
- `protected`: truy cập được trong class và lớp con
- `public`: truy cập được từ mọi nơi
- Getter/Setter để kiểm soát truy cập

### 3. **Tính kế thừa (Inheritance)**
- Lớp con kế thừa thuộc tính và phương thức từ lớp cha
- `extends` keyword để kế thừa
- `super()` để gọi constructor/method của lớp cha
- `abstract` class không thể tạo instance trực tiếp

### 4. **Tính đa hình (Polymorphism)**
- Cùng một interface nhưng có nhiều implementation khác nhau
- Method overriding: ghi đè phương thức
- Interface để định nghĩa contract

### 5. **Interface vs Abstract Class**
- **Interface**: chỉ định nghĩa signature, không có implementation
- **Abstract Class**: có thể có cả abstract methods và concrete methods
- Một class có thể implement nhiều interface nhưng chỉ extend một class

### 6. **Composition vs Aggregation**
- **Composition**: "has-a" relationship, object con không thể tồn tại độc lập
- **Aggregation**: "uses-a" relationship, object con có thể tồn tại độc lập

### 7. **Design Patterns**
- **Singleton**: đảm bảo chỉ có một instance
- **Factory**: tạo object mà không cần biết class cụ thể
- **Observer**: pattern thông báo thay đổi
- **Strategy**: thay đổi algorithm tại runtime

## 💡 Lời khuyên học tập

1. **Đọc theo thứ tự**: Bắt đầu từ file 01 đến 07
2. **Thực hành**: Chạy code và thử modify
3. **Experiment**: Tạo thêm class và method riêng
4. **Debug**: Sử dụng console.log để hiểu flow
5. **Ứng dụng**: Áp dụng vào project thực tế

## 🎯 Bài tập mở rộng

1. **Tạo hệ thống quản lý thư viện** với sách, độc giả, và mượn trả
2. **Xây dựng game RPG** với character, skill, item
3. **Thiết kế e-commerce** với product, cart, order, payment
4. **Tạo social media** với user, post, comment, like

Chúc bạn học tốt! 🎉
