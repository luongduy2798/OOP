// ===== VÍ DỤ 6: COMPOSITION VÀ AGGREGATION =====

// Composition: "có một" - đối tượng con không thể tồn tại độc lập
// Aggregation: "sử dụng" - đối tượng con có thể tồn tại độc lập

// ===== COMPOSITION EXAMPLE =====

class DongCo {
  private congSuat: number; // HP
  private loai: string;
  private trangThai: "tat" | "bat";

  constructor(congSuat: number, loai: string) {
    this.congSuat = congSuat;
    this.loai = loai;
    this.trangThai = "tat";
  }

  public khoidong(): void {
    this.trangThai = "bat";
    console.log(`Động cơ ${this.loai} ${this.congSuat}HP đã khởi động`);
  }

  public tatMay(): void {
    this.trangThai = "tat";
    console.log(`Động cơ ${this.loai} đã tắt`);
  }

  public getTrangThai(): "tat" | "bat" {
    return this.trangThai;
  }

  public getCongSuat(): number {
    return this.congSuat;
  }

  public getLoai(): string {
    return this.loai;
  }
}

class BanhXe {
  private kichThuoc: number; // inch
  private loai: string;
  private apSuat: number; // psi

  constructor(kichThuoc: number, loai: string, apSuat: number = 32) {
    this.kichThuoc = kichThuoc;
    this.loai = loai;
    this.apSuat = apSuat;
  }

  public bom(apSuatMoi: number): void {
    this.apSuat = apSuatMoi;
    console.log(`Đã bơm bánh xe ${this.loai} ${this.kichThuoc}" đến ${this.apSuat} psi`);
  }

  public kiemTra(): void {
    console.log(`Bánh xe ${this.loai} ${this.kichThuoc}" - Áp suất: ${this.apSuat} psi`);
  }

  public getThongTin(): { kichThuoc: number; loai: string; apSuat: number } {
    return {
      kichThuoc: this.kichThuoc,
      loai: this.loai,
      apSuat: this.apSuat
    };
  }
}

class XeHoi {
  private hangXe: string;
  private model: string;
  private dongCo: DongCo; // Composition - động cơ là một phần của xe
  private cacBanhXe: BanhXe[]; // Composition - bánh xe là một phần của xe
  private trangThai: "dung" | "dang_chay";

  constructor(hangXe: string, model: string, dongCo: DongCo, cacBanhXe: BanhXe[]) {
    this.hangXe = hangXe;
    this.model = model;
    this.dongCo = dongCo; // Xe sở hữu động cơ
    this.cacBanhXe = [...cacBanhXe]; // Xe sở hữu bánh xe
    this.trangThai = "dung";

    if (this.cacBanhXe.length !== 4) {
      throw new Error("Xe hơi cần đúng 4 bánh xe!");
    }
  }

  public khoidong(): void {
    this.dongCo.khoidong();
    this.trangThai = "dang_chay";
    console.log(`${this.hangXe} ${this.model} đã sẵn sàng di chuyển`);
  }

  public tatMay(): void {
    this.dongCo.tatMay();
    this.trangThai = "dung";
    console.log(`${this.hangXe} ${this.model} đã dừng`);
  }

  public diChuyen(khoangCach: number): void {
    if (this.dongCo.getTrangThai() === "bat") {
      console.log(`${this.hangXe} ${this.model} đã di chuyển ${khoangCach}km`);
    } else {
      console.log("Cần khởi động động cơ trước khi di chuyển!");
    }
  }

  public kiemTraBanhXe(): void {
    console.log("\n--- Kiểm tra bánh xe ---");
    this.cacBanhXe.forEach((banh, index) => {
      console.log(`Bánh ${index + 1}:`);
      banh.kiemTra();
    });
  }

  public bomBanhXe(apSuatMoi: number): void {
    console.log(`\n--- Bơm tất cả bánh xe đến ${apSuatMoi} psi ---`);
    this.cacBanhXe.forEach(banh => banh.bom(apSuatMoi));
  }

  public hienThiThongTin(): void {
    console.log(`\n=== ${this.hangXe.toUpperCase()} ${this.model.toUpperCase()} ===`);
    console.log(`Trạng thái: ${this.trangThai === "dung" ? "Đậu" : "Đang chạy"}`);
    console.log(`Động cơ: ${this.dongCo.getLoai()} ${this.dongCo.getCongSuat()}HP - ${this.dongCo.getTrangThai()}`);
    this.kiemTraBanhXe();
  }
}

// ===== AGGREGATION EXAMPLE =====

class SinhVien {
  private maSV: string;
  private hoTen: string;
  private tuoi: number;
  private email: string;

  constructor(maSV: string, hoTen: string, tuoi: number, email: string) {
    this.maSV = maSV;
    this.hoTen = hoTen;
    this.tuoi = tuoi;
    this.email = email;
  }

  public hocBai(): void {
    console.log(`${this.hoTen} đang học bài`);
  }

  public lamBaiTap(): void {
    console.log(`${this.hoTen} đang làm bài tập`);
  }

  public getMaSV(): string {
    return this.maSV;
  }

  public getHoTen(): string {
    return this.hoTen;
  }

  public getTuoi(): number {
    return this.tuoi;
  }

  public getEmail(): string {
    return this.email;
  }

  public hienThiThongTin(): void {
    console.log(`${this.maSV} - ${this.hoTen} (${this.tuoi} tuổi) - ${this.email}`);
  }
}

class GiangVien {
  private maGV: string;
  private hoTen: string;
  private chuyenMon: string;
  private kiNhiem: number; // năm

  constructor(maGV: string, hoTen: string, chuyenMon: string, kiNhiem: number) {
    this.maGV = maGV;
    this.hoTen = hoTen;
    this.chuyenMon = chuyenMon;
    this.kiNhiem = kiNhiem;
  }

  public giangDay(): void {
    console.log(`GV ${this.hoTen} đang giảng dạy ${this.chuyenMon}`);
  }

  public chamDiem(): void {
    console.log(`GV ${this.hoTen} đang chấm điểm`);
  }

  public getMaGV(): string {
    return this.maGV;
  }

  public getHoTen(): string {
    return this.hoTen;
  }

  public getChuyenMon(): string {
    return this.chuyenMon;
  }

  public getKiNhiem(): number {
    return this.kiNhiem;
  }

  public hienThiThongTin(): void {
    console.log(`${this.maGV} - GV ${this.hoTen} - ${this.chuyenMon} (${this.kiNhiem} năm kinh nghiệm)`);
  }
}

class LopHoc {
  private maLop: string;
  private tenLop: string;
  private giangVien: GiangVien; // Aggregation - giảng viên có thể tồn tại độc lập
  private danhSachSinhVien: SinhVien[]; // Aggregation - sinh viên có thể tồn tại độc lập
  private soTinChi: number;

  constructor(maLop: string, tenLop: string, giangVien: GiangVien, soTinChi: number) {
    this.maLop = maLop;
    this.tenLop = tenLop;
    this.giangVien = giangVien; // Lớp sử dụng giảng viên nhưng không sở hữu
    this.danhSachSinhVien = []; // Lớp chứa sinh viên nhưng không sở hữu
    this.soTinChi = soTinChi;
  }

  public themSinhVien(sinhVien: SinhVien): void {
    if (!this.danhSachSinhVien.find(sv => sv.getMaSV() === sinhVien.getMaSV())) {
      this.danhSachSinhVien.push(sinhVien);
      console.log(`Đã thêm sinh viên ${sinhVien.getHoTen()} vào lớp ${this.tenLop}`);
    } else {
      console.log(`Sinh viên ${sinhVien.getHoTen()} đã có trong lớp!`);
    }
  }

  public xoaSinhVien(maSV: string): boolean {
    const index = this.danhSachSinhVien.findIndex(sv => sv.getMaSV() === maSV);
    if (index !== -1) {
      const sinhVien = this.danhSachSinhVien.splice(index, 1)[0];
      console.log(`Đã xóa sinh viên ${sinhVien.getHoTen()} khỏi lớp ${this.tenLop}`);
      return true;
    }
    console.log(`Không tìm thấy sinh viên có mã ${maSV}`);
    return false;
  }

  public doiGiangVien(giangVienMoi: GiangVien): void {
    const giangVienCu = this.giangVien;
    this.giangVien = giangVienMoi;
    console.log(`Đã đổi giảng viên từ ${giangVienCu.getHoTen()} sang ${giangVienMoi.getHoTen()}`);
  }

  public batDauHoc(): void {
    console.log(`\n=== BẮT ĐẦU LỚP ${this.tenLop.toUpperCase()} ===`);
    this.giangVien.giangDay();
    console.log("Sinh viên trong lớp:");
    this.danhSachSinhVien.forEach(sv => sv.hocBai());
  }

  public hienThiThongTin(): void {
    console.log(`\n=== THÔNG TIN LỚP HỌC ===`);
    console.log(`Mã lớp: ${this.maLop}`);
    console.log(`Tên lớp: ${this.tenLop}`);
    console.log(`Số tín chỉ: ${this.soTinChi}`);
    console.log(`Giảng viên:`);
    this.giangVien.hienThiThongTin();
    console.log(`Số sinh viên: ${this.danhSachSinhVien.length}`);
    console.log("Danh sách sinh viên:");
    this.danhSachSinhVien.forEach((sv, index) => {
      console.log(`  ${index + 1}. ${sv.getHoTen()} (${sv.getMaSV()})`);
    });
  }

  public getSoSinhVien(): number {
    return this.danhSachSinhVien.length;
  }

  public getDanhSachSinhVien(): SinhVien[] {
    return [...this.danhSachSinhVien]; // Trả về copy để bảo vệ dữ liệu
  }

  public getGiangVien(): GiangVien {
    return this.giangVien;
  }
}

// ===== SỬ DỤNG COMPOSITION VÀ AGGREGATION =====

console.log("=== VÍ DỤ COMPOSITION VÀ AGGREGATION ===");

// COMPOSITION: Tạo xe hơi
console.log("\n--- COMPOSITION: XE HƠI ---");

const dongCoToyota = new DongCo(200, "V6");
const banhXe1 = new BanhXe(18, "Michelin", 35);
const banhXe2 = new BanhXe(18, "Michelin", 35);
const banhXe3 = new BanhXe(18, "Michelin", 35);
const banhXe4 = new BanhXe(18, "Michelin", 35);

const xeToyota = new XeHoi("Toyota", "Camry", dongCoToyota, [banhXe1, banhXe2, banhXe3, banhXe4]);

xeToyota.hienThiThongTin();
xeToyota.khoidong();
xeToyota.diChuyen(50);
xeToyota.bomBanhXe(40);
xeToyota.tatMay();

// AGGREGATION: Trường học
console.log("\n\n--- AGGREGATION: TRƯỜNG HỌC ---");

// Tạo giảng viên (tồn tại độc lập)
const gv1 = new GiangVien("GV001", "Nguyễn Văn A", "Lập trình", 5);
const gv2 = new GiangVien("GV002", "Trần Thị B", "Cơ sở dữ liệu", 8);

// Tạo sinh viên (tồn tại độc lập)
const sv1 = new SinhVien("SV001", "Lê Văn C", 20, "levanc@email.com");
const sv2 = new SinhVien("SV002", "Phạm Thị D", 19, "phamthid@email.com");
const sv3 = new SinhVien("SV003", "Hoàng Văn E", 21, "hoangvane@email.com");
const sv4 = new SinhVien("SV004", "Ngô Thị F", 20, "ngothif@email.com");

// Tạo lớp học (sử dụng giảng viên và sinh viên)
const lopOOP = new LopHoc("OOP001", "Lập trình hướng đối tượng", gv1, 3);
const lopDB = new LopHoc("DB001", "Cơ sở dữ liệu", gv2, 4);

// Thêm sinh viên vào lớp
lopOOP.themSinhVien(sv1);
lopOOP.themSinhVien(sv2);
lopOOP.themSinhVien(sv3);

lopDB.themSinhVien(sv2); // sv2 học cả 2 lớp
lopDB.themSinhVien(sv3);
lopDB.themSinhVien(sv4);

// Hiển thị thông tin
lopOOP.hienThiThongTin();
lopDB.hienThiThongTin();

// Bắt đầu học
lopOOP.batDauHoc();
lopDB.batDauHoc();

// Thay đổi giảng viên (aggregation cho phép điều này)
console.log("\n--- Thay đổi giảng viên ---");
lopOOP.doiGiangVien(gv2);
lopOOP.hienThiThongTin();

// Xóa sinh viên
console.log("\n--- Xóa sinh viên ---");
lopOOP.xoaSinhVien("SV002");
lopOOP.hienThiThongTin();

// Minh họa sự khác biệt
console.log("\n=== SỰ KHÁC BIỆT COMPOSITION VS AGGREGATION ===");
console.log("COMPOSITION (Xe hơi):");
console.log("- Động cơ và bánh xe là một phần của xe");
console.log("- Khi xe bị hủy, động cơ và bánh xe cũng bị hủy");
console.log("- Động cơ không thể tồn tại độc lập với xe");

console.log("\nAGGREGATION (Lớp học):");
console.log("- Giảng viên và sinh viên có thể tồn tại độc lập");
console.log("- Khi lớp học kết thúc, giảng viên và sinh viên vẫn tồn tại");
console.log("- Sinh viên có thể học nhiều lớp, giảng viên có thể dạy nhiều lớp");

// Demonstration: Sinh viên và giảng viên vẫn tồn tại sau khi lớp học "kết thúc"
console.log("\n--- Sau khi lớp học kết thúc ---");
console.log("Sinh viên vẫn tồn tại:");
sv1.hienThiThongTin();
sv2.hienThiThongTin();

console.log("Giảng viên vẫn tồn tại:");
gv1.hienThiThongTin();
gv2.hienThiThongTin();
