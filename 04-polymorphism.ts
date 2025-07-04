// ===== VÍ DỤ 4: TÍNH ĐA HÌNH (POLYMORPHISM) =====

// Interface định nghĩa hành vi chung
interface ICoBan {
  diChuyen(): void;
  anUong(): void;
}

interface IChet {
  chet(): void;
}

interface ISinhSan {
  sinhSan(): void;
}

// Abstract class
abstract class SinhVat implements ICoBan {
  protected ten: string;
  protected tuoi: number;
  protected trangThai: "song" | "chet";

  constructor(ten: string, tuoi: number) {
    this.ten = ten;
    this.tuoi = tuoi;
    this.trangThai = "song";
  }

  // Phương thức abstract - bắt buộc override
  abstract diChuyen(): void;
  abstract anUong(): void;
  abstract moTa(): string;

  // Phương thức có thể override
  public hienThiThongTin(): void {
    console.log(`${this.ten} - Tuổi: ${this.tuoi} - Trạng thái: ${this.trangThai}`);
  }

  public getTen(): string {
    return this.ten;
  }

  public getTuoi(): number {
    return this.tuoi;
  }

  public getTrangThai(): "song" | "chet" {
    return this.trangThai;
  }
}

// Các class con implement polymorphism
class Ca extends SinhVat implements IChet, ISinhSan {
  private loaiCa: string;

  constructor(ten: string, tuoi: number, loaiCa: string) {
    super(ten, tuoi);
    this.loaiCa = loaiCa;
  }

  public diChuyen(): void {
    console.log(`${this.ten} bơi trong nước`);
  }

  public anUong(): void {
    console.log(`${this.ten} ăn tảo và sinh vật nhỏ`);
  }

  public chet(): void {
    this.trangThai = "chet";
    console.log(`${this.ten} đã chết 💀`);
  }

  public sinhSan(): void {
    console.log(`${this.ten} đẻ trứng 🥚`);
  }

  public moTa(): string {
    return `Tôi là ${this.ten}, một con ${this.loaiCa}`;
  }

  public getLoaiCa(): string {
    return this.loaiCa;
  }
}

class ChimBay extends SinhVat implements IChet, ISinhSan {
  private loaiChim: string;
  private coBay: boolean;

  constructor(ten: string, tuoi: number, loaiChim: string, coBay: boolean = true) {
    super(ten, tuoi);
    this.loaiChim = loaiChim;
    this.coBay = coBay;
  }

  public diChuyen(): void {
    if (this.coBay) {
      console.log(`${this.ten} bay trên trời`);
    } else {
      console.log(`${this.ten} chạy trên mặt đất`);
    }
  }

  public anUong(): void {
    console.log(`${this.ten} ăn hạt và côn trùng`);
  }

  public chet(): void {
    this.trangThai = "chet";
    console.log(`${this.ten} đã chết 💀`);
  }

  public sinhSan(): void {
    console.log(`${this.ten} đẻ trứng và ấp nở 🐣`);
  }

  public moTa(): string {
    return `Tôi là ${this.ten}, một con ${this.loaiChim}${this.coBay ? " biết bay" : " không biết bay"}`;
  }

  public hatNhac(): void {
    console.log(`${this.ten} hót líu lo 🎵`);
  }
}

class SuTu extends SinhVat implements IChet, ISinhSan {
  private gioiTinh: "duc" | "cai";

  constructor(ten: string, tuoi: number, gioiTinh: "duc" | "cai") {
    super(ten, tuoi);
    this.gioiTinh = gioiTinh;
  }

  public diChuyen(): void {
    console.log(`${this.ten} chạy trên đồng cỏ với tốc độ cao`);
  }

  public anUong(): void {
    console.log(`${this.ten} săn mồi và ăn thịt`);
  }

  public chet(): void {
    this.trangThai = "chet";
    console.log(`${this.ten} đã chết 💀`);
  }

  public sinhSan(): void {
    if (this.gioiTinh === "cai") {
      console.log(`${this.ten} sinh con 🦁`);
    } else {
      console.log(`${this.ten} (đực) không thể sinh con`);
    }
  }

  public moTa(): string {
    return `Tôi là ${this.ten}, một con sư tử ${this.gioiTinh}`;
  }

  public gaumGaum(): void {
    console.log(`${this.ten} gầm rống 🦁`);
  }

  public sanMoi(): void {
    console.log(`${this.ten} đang săn mồi...`);
  }
}

class Robot implements ICoBan {
  private ten: string;
  private pin: number; // %

  constructor(ten: string) {
    this.ten = ten;
    this.pin = 100;
  }

  public diChuyen(): void {
    if (this.pin > 10) {
      console.log(`${this.ten} di chuyển bằng bánh xe/chân máy`);
      this.pin -= 5;
    } else {
      console.log(`${this.ten} hết pin, không thể di chuyển`);
    }
  }

  public anUong(): void {
    console.log(`${this.ten} sạc pin 🔋`);
    this.pin = Math.min(100, this.pin + 20);
  }

  public thucHienNhiemVu(): void {
    if (this.pin > 20) {
      console.log(`${this.ten} đang thực hiện nhiệm vụ`);
      this.pin -= 15;
    } else {
      console.log(`${this.ten} cần sạc pin để thực hiện nhiệm vụ`);
    }
  }

  public getTen(): string {
    return this.ten;
  }

  public getPin(): number {
    return this.pin;
  }
}

// Function sử dụng polymorphism
function choAnUong(doiTuong: ICoBan): void {
  console.log(`--- Cho ${doiTuong instanceof Robot ? (doiTuong as Robot).getTen() : (doiTuong as SinhVat).getTen()} ăn/sạc pin ---`);
  doiTuong.anUong();
}

function choDiChuyen(doiTuong: ICoBan): void {
  console.log(`--- Cho ${doiTuong instanceof Robot ? (doiTuong as Robot).getTen() : (doiTuong as SinhVat).getTen()} di chuyển ---`);
  doiTuong.diChuyen();
}

function chuKySinhVat(sinhVat: SinhVat & IChet & ISinhSan): void {
  console.log(`\n=== CHU KỲ SINH VẬT: ${sinhVat.getTen().toUpperCase()} ===`);
  
  console.log(sinhVat.moTa());
  sinhVat.hienThiThongTin();
  
  console.log("\n--- Hoạt động sống ---");
  sinhVat.anUong();
  sinhVat.diChuyen();
  
  console.log("\n--- Sinh sản ---");
  sinhVat.sinhSan();
  
  console.log("\n--- Cuối đời ---");
  sinhVat.chet();
  sinhVat.hienThiThongTin();
}

// Sử dụng polymorphism
console.log("=== VÍ DỤ TÍNH ĐA HÌNH ===");

// Tạo các đối tượng
const ca1 = new Ca("Nemo", 2, "Cá hề");
const caBay1 = new ChimBay("Tweety", 1, "Chim vàng anh", true);
const caBay2 = new ChimBay("Penguin", 5, "Chim cánh cụt", false);
const suTu1 = new SuTu("Simba", 8, "duc");
const suTu2 = new SuTu("Nala", 7, "cai");
const robot1 = new Robot("R2D2");

// Mảng polymorphic - chứa các đối tượng khác loại nhưng implement cùng interface
const cacDoiTuong: ICoBan[] = [ca1, caBay1, caBay2, suTu1, suTu2, robot1];

console.log("\n--- HOẠT ĐỘNG CỦA TẤT CẢ ĐỐI TƯỢNG ---");
cacDoiTuong.forEach((doiTuong, index) => {
  console.log(`\n${index + 1}. `);
  choDiChuyen(doiTuong);
  choAnUong(doiTuong);
});

// Type checking và casting
console.log("\n--- HOẠT ĐỘNG ĐẶC BIỆT ---");
cacDoiTuong.forEach(doiTuong => {
  if (doiTuong instanceof ChimBay) {
    doiTuong.hatNhac();
  } else if (doiTuong instanceof SuTu) {
    doiTuong.gaumGaum();
    doiTuong.sanMoi();
  } else if (doiTuong instanceof Robot) {
    doiTuong.thucHienNhiemVu();
    console.log(`Pin còn: ${doiTuong.getPin()}%`);
  }
});

// Chu kỳ sinh vật (chỉ áp dụng cho sinh vật)
console.log("\n--- CHU KỲ SINH VẬT ---");
const cacSinhVat = [ca1, caBay1, suTu2]; // Chọn một số sinh vật

cacSinhVat.forEach(sinhVat => {
  // Type assertion - đảm bảo đối tượng implement các interface cần thiết
  chuKySinhVat(sinhVat as SinhVat & IChet & ISinhSan);
});

// Polymorphism với method overloading (simulation)
console.log("\n--- METHOD OVERLOADING SIMULATION ---");

class TinhToan {
  // Simulation của method overloading bằng union types
  public static cong(a: number, b: number): number;
  public static cong(a: string, b: string): string;
  public static cong(a: number[], b: number[]): number[];
  public static cong(a: any, b: any): any {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    } else if (typeof a === "string" && typeof b === "string") {
      return a + b;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b);
    }
    throw new Error("Kiểu dữ liệu không được hỗ trợ");
  }
}

console.log("Cộng số:", TinhToan.cong(5, 3));
console.log("Cộng chuỗi:", TinhToan.cong("Hello ", "World"));
console.log("Cộng mảng:", TinhToan.cong([1, 2], [3, 4]));
