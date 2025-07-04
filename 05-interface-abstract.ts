// ===== VÍ DỤ 5: INTERFACE VÀ ABSTRACT CLASS =====

// Interface định nghĩa contract
interface IHinhHoc {
  tinhDienTich(): number;
  tinhChuVi(): number;
  hienThi(): void;
}

interface IVeHinh {
  ve(): void;
  taoToaDo(): { x: number; y: number }[];
}

interface IMauSac {
  mau: string;
  doiMau(mauMoi: string): void;
}

// Abstract class cung cấp implementation cơ bản
abstract class Hinh implements IHinhHoc {
  protected ten: string;
  protected x: number; // tọa độ x
  protected y: number; // tọa độ y

  constructor(ten: string, x: number = 0, y: number = 0) {
    this.ten = ten;
    this.x = x;
    this.y = y;
  }

  // Abstract methods - bắt buộc implement
  abstract tinhDienTich(): number;
  abstract tinhChuVi(): number;

  // Concrete method có thể override
  public hienThi(): void {
    console.log(`${this.ten} - Tọa độ: (${this.x}, ${this.y})`);
    console.log(`Diện tích: ${this.tinhDienTich().toFixed(2)}`);
    console.log(`Chu vi: ${this.tinhChuVi().toFixed(2)}`);
  }

  public getTen(): string {
    return this.ten;
  }

  public getToaDo(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public diChuyen(x: number, y: number): void {
    this.x = x;
    this.y = y;
    console.log(`${this.ten} đã di chuyển đến (${x}, ${y})`);
  }
}

// Class kế thừa abstract class và implement thêm interface
class HinhTron extends Hinh implements IVeHinh, IMauSac {
  private banKinh: number;
  public mau: string;

  constructor(banKinh: number, x: number = 0, y: number = 0, mau: string = "đỏ") {
    super("Hình tròn", x, y);
    this.banKinh = banKinh;
    this.mau = mau;
  }

  public tinhDienTich(): number {
    return Math.PI * this.banKinh * this.banKinh;
  }

  public tinhChuVi(): number {
    return 2 * Math.PI * this.banKinh;
  }

  public ve(): void {
    console.log(`Vẽ hình tròn màu ${this.mau} có bán kính ${this.banKinh} tại (${this.x}, ${this.y})`);
  }

  public taoToaDo(): { x: number; y: number }[] {
    const toaDo: { x: number; y: number }[] = [];
    for (let goc = 0; goc < 360; goc += 30) {
      const radian = (goc * Math.PI) / 180;
      toaDo.push({
        x: this.x + this.banKinh * Math.cos(radian),
        y: this.y + this.banKinh * Math.sin(radian)
      });
    }
    return toaDo;
  }

  public doiMau(mauMoi: string): void {
    console.log(`Đổi màu ${this.ten} từ ${this.mau} thành ${mauMoi}`);
    this.mau = mauMoi;
  }

  public getBanKinh(): number {
    return this.banKinh;
  }

  public setBanKinh(banKinh: number): void {
    if (banKinh > 0) {
      this.banKinh = banKinh;
    }
  }

  // Override phương thức từ lớp cha
  public hienThi(): void {
    super.hienThi();
    console.log(`Bán kính: ${this.banKinh}`);
    console.log(`Màu sắc: ${this.mau}`);
  }
}

class HinhChuNhat extends Hinh implements IVeHinh, IMauSac {
  private chieuDai: number;
  private chieuRong: number;
  public mau: string;

  constructor(chieuDai: number, chieuRong: number, x: number = 0, y: number = 0, mau: string = "xanh") {
    super("Hình chữ nhật", x, y);
    this.chieuDai = chieuDai;
    this.chieuRong = chieuRong;
    this.mau = mau;
  }

  public tinhDienTich(): number {
    return this.chieuDai * this.chieuRong;
  }

  public tinhChuVi(): number {
    return 2 * (this.chieuDai + this.chieuRong);
  }

  public ve(): void {
    console.log(`Vẽ hình chữ nhật màu ${this.mau} ${this.chieuDai}x${this.chieuRong} tại (${this.x}, ${this.y})`);
  }

  public taoToaDo(): { x: number; y: number }[] {
    return [
      { x: this.x, y: this.y },
      { x: this.x + this.chieuDai, y: this.y },
      { x: this.x + this.chieuDai, y: this.y + this.chieuRong },
      { x: this.x, y: this.y + this.chieuRong }
    ];
  }

  public doiMau(mauMoi: string): void {
    console.log(`Đổi màu ${this.ten} từ ${this.mau} thành ${mauMoi}`);
    this.mau = mauMoi;
  }

  public getKichThuoc(): { chieuDai: number; chieuRong: number } {
    return { chieuDai: this.chieuDai, chieuRong: this.chieuRong };
  }

  public hienThi(): void {
    super.hienThi();
    console.log(`Kích thước: ${this.chieuDai} x ${this.chieuRong}`);
    console.log(`Màu sắc: ${this.mau}`);
  }
}

class HinhVuong extends HinhChuNhat {
  constructor(canh: number, x: number = 0, y: number = 0, mau: string = "vàng") {
    super(canh, canh, x, y, mau);
    this.ten = "Hình vuông";
  }

  public getCanh(): number {
    return this.getKichThuoc().chieuDai;
  }

  public setCanh(canh: number): void {
    if (canh > 0) {
      // Cập nhật cả chiều dài và chiều rong
      const kichThuoc = this.getKichThuoc();
      Object.assign(this, { chieuDai: canh, chieuRong: canh });
    }
  }
}

// Class chỉ implement interface (không kế thừa)
class HinhTamGiac implements IHinhHoc, IVeHinh, IMauSac {
  private a: number;
  private b: number;
  private c: number;
  private x: number;
  private y: number;
  public mau: string;

  constructor(a: number, b: number, c: number, x: number = 0, y: number = 0, mau: string = "tím") {
    if (this.kiemTraTamGiac(a, b, c)) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.x = x;
      this.y = y;
      this.mau = mau;
    } else {
      throw new Error("Không thể tạo tam giác với các cạnh này!");
    }
  }

  private kiemTraTamGiac(a: number, b: number, c: number): boolean {
    return (a + b > c) && (a + c > b) && (b + c > a);
  }

  public tinhDienTich(): number {
    const p = this.tinhChuVi() / 2;
    return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
  }

  public tinhChuVi(): number {
    return this.a + this.b + this.c;
  }

  public hienThi(): void {
    console.log(`Hình tam giác - Tọa độ: (${this.x}, ${this.y})`);
    console.log(`Các cạnh: ${this.a}, ${this.b}, ${this.c}`);
    console.log(`Diện tích: ${this.tinhDienTich().toFixed(2)}`);
    console.log(`Chu vi: ${this.tinhChuVi().toFixed(2)}`);
    console.log(`Màu sắc: ${this.mau}`);
  }

  public ve(): void {
    console.log(`Vẽ tam giác màu ${this.mau} với các cạnh ${this.a}-${this.b}-${this.c} tại (${this.x}, ${this.y})`);
  }

  public taoToaDo(): { x: number; y: number }[] {
    // Tạo tọa độ tam giác đơn giản
    return [
      { x: this.x, y: this.y },
      { x: this.x + this.a, y: this.y },
      { x: this.x + this.a/2, y: this.y + Math.sqrt(this.b * this.b - (this.a/2) * (this.a/2)) }
    ];
  }

  public doiMau(mauMoi: string): void {
    console.log(`Đổi màu tam giác từ ${this.mau} thành ${mauMoi}`);
    this.mau = mauMoi;
  }

  public getCacCanh(): { a: number; b: number; c: number } {
    return { a: this.a, b: this.b, c: this.c };
  }
}

// Utility classes sử dụng interface
class QuanLyHinh {
  private cacHinh: IHinhHoc[] = [];

  public themHinh(hinh: IHinhHoc): void {
    this.cacHinh.push(hinh);
    console.log(`Đã thêm hình vào danh sách`);
  }

  public hienThiTatCa(): void {
    console.log("\n=== DANH SÁCH TẤT CẢ HÌNH ===");
    this.cacHinh.forEach((hinh, index) => {
      console.log(`\n${index + 1}.`);
      hinh.hienThi();
    });
  }

  public tinhTongDienTich(): number {
    return this.cacHinh.reduce((tong, hinh) => tong + hinh.tinhDienTich(), 0);
  }

  public tinhTongChuVi(): number {
    return this.cacHinh.reduce((tong, hinh) => tong + hinh.tinhChuVi(), 0);
  }

  public timHinhLonNhat(): IHinhHoc | null {
    if (this.cacHinh.length === 0) return null;
    
    return this.cacHinh.reduce((max, hinh) => 
      hinh.tinhDienTich() > max.tinhDienTich() ? hinh : max
    );
  }

  public getSoLuong(): number {
    return this.cacHinh.length;
  }
}

class ThaoTacVe {
  public static veNhieuHinh(cacHinh: IVeHinh[]): void {
    console.log("\n=== VẼ TẤT CẢ HÌNH ===");
    cacHinh.forEach(hinh => hinh.ve());
  }

  public static doiMauNhieu(cacHinh: IMauSac[], mauMoi: string): void {
    console.log(`\n=== ĐỔI MÀU TẤT CẢ THÀNH ${mauMoi.toUpperCase()} ===`);
    cacHinh.forEach(hinh => hinh.doiMau(mauMoi));
  }
}

// Sử dụng Interface và Abstract Class
console.log("=== VÍ DỤ INTERFACE VÀ ABSTRACT CLASS ===");

// Tạo các hình
const hinhTron = new HinhTron(5, 10, 10, "đỏ");
const hinhChuNhat = new HinhChuNhat(8, 6, 20, 20, "xanh");
const hinhVuong = new HinhVuong(4, 30, 30, "vàng");
const tamGiac = new HinhTamGiac(3, 4, 5, 40, 40, "tím");

// Sử dụng QuanLyHinh
const quanLy = new QuanLyHinh();
quanLy.themHinh(hinhTron);
quanLy.themHinh(hinhChuNhat);
quanLy.themHinh(hinhVuong);
quanLy.themHinh(tamGiac);

quanLy.hienThiTatCa();

console.log(`\nTổng số hình: ${quanLy.getSoLuong()}`);
console.log(`Tổng diện tích: ${quanLy.tinhTongDienTich().toFixed(2)}`);
console.log(`Tổng chu vi: ${quanLy.tinhTongChuVi().toFixed(2)}`);

const hinhLonNhat = quanLy.timHinhLonNhat();
if (hinhLonNhat) {
  console.log(`\nHình có diện tích lớn nhất:`);
  hinhLonNhat.hienThi();
}

// Sử dụng ThaoTacVe
const cacHinhVe: IVeHinh[] = [hinhTron, hinhChuNhat, hinhVuong, tamGiac];
ThaoTacVe.veNhieuHinh(cacHinhVe);

const cacHinhCoMau: IMauSac[] = [hinhTron, hinhChuNhat, hinhVuong, tamGiac];
ThaoTacVe.doiMauNhieu(cacHinhCoMau, "hồng");

// Di chuyển và thay đổi thuộc tính
console.log("\n=== THAO TÁC TRÊN HÌNH ===");
hinhTron.diChuyen(50, 50);
hinhTron.setBanKinh(7);
hinhTron.doiMau("cam");

hinhVuong.setCanh(6);
hinhVuong.doiMau("nâu");

console.log("\nSau khi thay đổi:");
hinhTron.hienThi();
console.log();
hinhVuong.hienThi();

// Sử dụng tọa độ
console.log("\n=== TỌA ĐỘ HÌNH ===");
const toaDoTron = hinhTron.taoToaDo();
console.log(`Hình tròn có ${toaDoTron.length} điểm trên đường tròn`);

const toaDoChuNhat = hinhChuNhat.taoToaDo();
console.log("Các đỉnh hình chữ nhật:", toaDoChuNhat);
