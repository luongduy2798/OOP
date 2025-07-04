// ===== VÍ DỤ 1: CLASS CƠ BẢN =====

class ConNguoi {
  // Thuộc tính private (chỉ truy cập được trong class)
  private hoVaTen: string;
  private tuoi: number;
  private gioiTinh: string;
  private diaChi: string;
  private giau: boolean;

  // Constructor - hàm khởi tạo
  constructor(hoVaTen: string, tuoi: number, gioiTinh: string, diaChi: string, giau: boolean = false) {
    this.hoVaTen = hoVaTen;
    this.tuoi = tuoi;
    this.gioiTinh = gioiTinh;
    this.diaChi = diaChi;
    this.giau = giau;
  }

  // Getter methods - lấy giá trị thuộc tính
  public getHoVaTen(): string {
    return this.hoVaTen;
  }

  public getTuoi(): number {
    return this.tuoi;
  }

  public getGioiTinh(): string {
    return this.gioiTinh;
  }

  public getDiaChi(): string {
    return this.diaChi;
  }

  public isGiau(): boolean {
    return this.giau;
  }

  // Setter methods - thiết lập giá trị thuộc tính
  public setHoVaTen(hoVaTen: string): void {
    this.hoVaTen = hoVaTen;
  }

  public setTuoi(tuoi: number): void {
    if (tuoi >= 0 && tuoi <= 150) {
      this.tuoi = tuoi;
    } else {
      console.log("Tuổi không hợp lệ!");
    }
  }

  public setDiaChi(diaChi: string): void {
    this.diaChi = diaChi;
  }

  public setGiau(giau: boolean): void {
    this.giau = giau;
  }

  // Các phương thức hành vi
  public an(): void {
    console.log(`${this.hoVaTen} đang ăn...`);
  }

  public ngu(): void {
    console.log(`${this.hoVaTen} đang ngủ...`);
  }

  public xemTV(): void {
    console.log(`${this.hoVaTen} đang xem TV...`);
  }

  public giaoTiep(): void {
    console.log(`${this.hoVaTen} đang giao tiếp với người khác.`);
  }

  // Phương thức hiển thị thông tin
  public hienThiThongTin(): void {
    console.log("=== THÔNG TIN CÁ NHÂN ===");
    console.log(`Họ và tên: ${this.hoVaTen}`);
    console.log(`Tuổi: ${this.tuoi}`);
    console.log(`Giới tính: ${this.gioiTinh}`);
    console.log(`Địa chỉ: ${this.diaChi}`);
    console.log(`Giàu có: ${this.giau ? "Có" : "Không"}`);
    console.log("========================");
  }
}

// Sử dụng class
console.log("=== VÍ DỤ SỬ DỤNG CLASS CƠ BẢN ===");

const nguoi1 = new ConNguoi("Nguyễn Văn An", 25, "Nam", "Hà Nội", false);
const nguoi2 = new ConNguoi("Trần Thị Bình", 30, "Nữ", "TP.HCM", true);

nguoi1.hienThiThongTin();
nguoi1.an();
nguoi1.ngu();

nguoi2.hienThiThongTin();
nguoi2.xemTV();
nguoi2.giaoTiep();

// Thay đổi thông tin
nguoi1.setTuoi(26);
nguoi1.setDiaChi("Đà Nẵng");
console.log(`\nSau khi cập nhật, tuổi của ${nguoi1.getHoVaTen()}: ${nguoi1.getTuoi()}`);
console.log(`Địa chỉ mới: ${nguoi1.getDiaChi()}`);
