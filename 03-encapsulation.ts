// ===== VÍ DỤ 3: TÍNH ĐÓNG GÓI (ENCAPSULATION) =====

class TaiKhoanNganHang {
  private readonly soTaiKhoan: string; // readonly - chỉ đọc, không thể thay đổi
  private soDu: number;
  private _tenChuTaiKhoan: string; // private với prefix _
  private matKhau: string;
  private static readonly LAI_SUAT: number = 0.05; // static - thuộc về class, không phải instance

  constructor(soTaiKhoan: string, tenChuTaiKhoan: string, matKhau: string, soDuBanDau: number = 0) {
    this.soTaiKhoan = soTaiKhoan;
    this._tenChuTaiKhoan = tenChuTaiKhoan;
    this.matKhau = matKhau;
    this.soDu = soDuBanDau;
  }

  // Getter và Setter với validation
  public get tenChuTaiKhoan(): string {
    return this._tenChuTaiKhoan;
  }

  public set tenChuTaiKhoan(ten: string) {
    if (ten && ten.trim().length > 0) {
      this._tenChuTaiKhoan = ten.trim();
    } else {
      throw new Error("Tên chủ tài khoản không được rỗng!");
    }
  }

  public getSoTaiKhoan(): string {
    return this.soTaiKhoan;
  }

  // Phương thức kiểm tra mật khẩu
  private kiemTraMatKhau(matKhau: string): boolean {
    return this.matKhau === matKhau;
  }

  // Phương thức xem số dư (cần mật khẩu)
  public xemSoDu(matKhau: string): number | null {
    if (this.kiemTraMatKhau(matKhau)) {
      return this.soDu;
    } else {
      console.log("Mật khẩu không đúng!");
      return null;
    }
  }

  // Phương thức nạp tiền
  public napTien(soTien: number, matKhau: string): boolean {
    if (!this.kiemTraMatKhau(matKhau)) {
      console.log("Mật khẩu không đúng!");
      return false;
    }

    if (soTien <= 0) {
      console.log("Số tiền nạp phải lớn hơn 0!");
      return false;
    }

    this.soDu += soTien;
    console.log(`Đã nạp ${soTien.toLocaleString()}đ. Số dư hiện tại: ${this.soDu.toLocaleString()}đ`);
    return true;
  }

  // Phương thức rút tiền
  public rutTien(soTien: number, matKhau: string): boolean {
    if (!this.kiemTraMatKhau(matKhau)) {
      console.log("Mật khẩu không đúng!");
      return false;
    }

    if (soTien <= 0) {
      console.log("Số tiền rút phải lớn hơn 0!");
      return false;
    }

    if (soTien > this.soDu) {
      console.log("Số dư không đủ để thực hiện giao dịch!");
      return false;
    }

    this.soDu -= soTien;
    console.log(`Đã rút ${soTien.toLocaleString()}đ. Số dư còn lại: ${this.soDu.toLocaleString()}đ`);
    return true;
  }

  // Phương thức đổi mật khẩu
  public doiMatKhau(matKhauCu: string, matKhauMoi: string): boolean {
    if (!this.kiemTraMatKhau(matKhauCu)) {
      console.log("Mật khẩu cũ không đúng!");
      return false;
    }

    if (matKhauMoi.length < 6) {
      console.log("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return false;
    }

    this.matKhau = matKhauMoi;
    console.log("Đã đổi mật khẩu thành công!");
    return true;
  }

  // Phương thức tính lãi (static method)
  public static tinhLai(soTien: number, thoiGian: number): number {
    return soTien * TaiKhoanNganHang.LAI_SUAT * thoiGian;
  }

  // Phương thức hiển thị thông tin (không hiển thị thông tin nhạy cảm)
  public hienThiThongTin(): void {
    console.log("=== THÔNG TIN TÀI KHOẢN ===");
    console.log(`Số tài khoản: ${this.soTaiKhoan}`);
    console.log(`Chủ tài khoản: ${this._tenChuTaiKhoan}`);
    console.log(`Lãi suất: ${TaiKhoanNganHang.LAI_SUAT * 100}%/năm`);
    console.log("===========================");
  }
}

// Lớp kế thừa với tính năng nâng cao
class TaiKhoanTietKiem extends TaiKhoanNganHang {
  private kyHanGui: number; // tháng
  private ngayMoTaiKhoan: Date;

  constructor(soTaiKhoan: string, tenChuTaiKhoan: string, matKhau: string, soDuBanDau: number, kyHanGui: number) {
    super(soTaiKhoan, tenChuTaiKhoan, matKhau, soDuBanDau);
    this.kyHanGui = kyHanGui;
    this.ngayMoTaiKhoan = new Date();
  }

  public getKyHanGui(): number {
    return this.kyHanGui;
  }

  public getNgayMoTaiKhoan(): Date {
    return this.ngayMoTaiKhoan;
  }

  // Override phương thức rút tiền với điều kiện kỳ hạn
  public rutTien(soTien: number, matKhau: string): boolean {
    const ngayHienTai = new Date();
    const soThangDaGui = (ngayHienTai.getTime() - this.ngayMoTaiKhoan.getTime()) / (1000 * 60 * 60 * 24 * 30);

    if (soThangDaGui < this.kyHanGui) {
      console.log(`Chưa đến kỳ hạn! Còn ${(this.kyHanGui - soThangDaGui).toFixed(1)} tháng nữa.`);
      return false;
    }

    return super.rutTien(soTien, matKhau);
  }

  public tinhLaiSuat(): number {
    const soDuHienTai = this.xemSoDu("password123"); // Trong thực tế cần xử lý tốt hơn
    if (soDuHienTai) {
      return TaiKhoanNganHang.tinhLai(soDuHienTai, this.kyHanGui / 12);
    }
    return 0;
  }

  public hienThiThongTin(): void {
    super.hienThiThongTin();
    console.log(`Kỳ hạn gửi: ${this.kyHanGui} tháng`);
    console.log(`Ngày mở tài khoản: ${this.ngayMoTaiKhoan.toLocaleDateString()}`);
  }
}

// Sử dụng tính đóng gói
console.log("=== VÍ DỤ TÍNH ĐÓNG GÓI ===");

const taiKhoan1 = new TaiKhoanNganHang("123456789", "Nguyễn Văn An", "password123", 1000000);
const taiKhoanTietKiem = new TaiKhoanTietKiem("987654321", "Trần Thị Bình", "mypassword", 5000000, 12);

console.log("\n--- Thông tin tài khoản ---");
taiKhoan1.hienThiThongTin();

console.log("\n--- Giao dịch với mật khẩu đúng ---");
console.log(`Số dư hiện tại: ${taiKhoan1.xemSoDu("password123")?.toLocaleString()}đ`);
taiKhoan1.napTien(500000, "password123");
taiKhoan1.rutTien(200000, "password123");

console.log("\n--- Giao dịch với mật khẩu sai ---");
taiKhoan1.napTien(100000, "wrongpassword");
taiKhoan1.xemSoDu("wrongpassword");

console.log("\n--- Đổi mật khẩu ---");
taiKhoan1.doiMatKhau("password123", "newpass123");
console.log(`Số dư sau khi đổi mật khẩu: ${taiKhoan1.xemSoDu("newpass123")?.toLocaleString()}đ`);

console.log("\n--- Tài khoản tiết kiệm ---");
taiKhoanTietKiem.hienThiThongTin();
console.log(`Lãi dự kiến: ${taiKhoanTietKiem.tinhLaiSuat().toLocaleString()}đ`);

// Sử dụng static method
console.log("\n--- Tính lãi suất ---");
const laiSuat1Nam = TaiKhoanNganHang.tinhLai(10000000, 1);
console.log(`Lãi của 10,000,000đ trong 1 năm: ${laiSuat1Nam.toLocaleString()}đ`);

// Thử truy cập thuộc tính private (sẽ lỗi nếu uncomment)
// console.log(taiKhoan1.soDu); // Error: Property 'soDu' is private

// Sử dụng getter/setter
console.log("\n--- Getter/Setter ---");
console.log(`Tên chủ tài khoản: ${taiKhoan1.tenChuTaiKhoan}`);
taiKhoan1.tenChuTaiKhoan = "Nguyễn Văn Bình";
console.log(`Tên mới: ${taiKhoan1.tenChuTaiKhoan}`);
