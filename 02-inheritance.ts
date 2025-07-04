// ===== VÍ DỤ 2: TÍNH KẾ THỪA (INHERITANCE) =====

// Lớp cha (Base class)
abstract class DongVat {
  protected ten: string;
  protected tuoi: number;
  protected canNang: number;

  constructor(ten: string, tuoi: number, canNang: number) {
    this.ten = ten;
    this.tuoi = tuoi;
    this.canNang = canNang;
  }

  // Phương thức chung
  public an(): void {
    console.log(`${this.ten} đang ăn...`);
  }

  public ngu(): void {
    console.log(`${this.ten} đang ngủ...`);
  }

  // Phương thức trừu tượng - phải được override ở lớp con
  public abstract keuKeu(): void;
  public abstract diChuyen(): void;

  // Getter
  public getTen(): string {
    return this.ten;
  }

  public getTuoi(): number {
    return this.tuoi;
  }

  public getCanNang(): number {
    return this.canNang;
  }

  public hienThiThongTin(): void {
    console.log(`Tên: ${this.ten}, Tuổi: ${this.tuoi}, Cân nặng: ${this.canNang}kg`);
  }
}

// Lớp con kế thừa từ DongVat
class Cho extends DongVat {
  private giong: string;

  constructor(ten: string, tuoi: number, canNang: number, giong: string) {
    super(ten, tuoi, canNang); // Gọi constructor của lớp cha
    this.giong = giong;
  }

  // Override phương thức trừu tượng
  public keuKeu(): void {
    console.log(`${this.ten} sủa: Gâu gâu!`);
  }

  public diChuyen(): void {
    console.log(`${this.ten} đang chạy bằng 4 chân.`);
  }

  // Phương thức riêng của lớp Cho
  public batKhach(): void {
    console.log(`${this.ten} đang bắt khách!`);
  }

  public getGiong(): string {
    return this.giong;
  }

  // Override phương thức từ lớp cha
  public hienThiThongTin(): void {
    super.hienThiThongTin(); // Gọi phương thức của lớp cha
    console.log(`Giống: ${this.giong}`);
  }
}

class Meo extends DongVat {
  private mauLong: string;

  constructor(ten: string, tuoi: number, canNang: number, mauLong: string) {
    super(ten, tuoi, canNang);
    this.mauLong = mauLong;
  }

  public keuKeu(): void {
    console.log(`${this.ten} kêu: Meo meo!`);
  }

  public diChuyen(): void {
    console.log(`${this.ten} đang đi bằng 4 chân một cách nhẹ nhàng.`);
  }

  public batChuot(): void {
    console.log(`${this.ten} đang bắt chuột!`);
  }

  public getMauLong(): string {
    return this.mauLong;
  }

  public hienThiThongTin(): void {
    super.hienThiThongTin();
    console.log(`Màu lông: ${this.mauLong}`);
  }
}

class Chim extends DongVat {
  private kichThuocCanh: number; // cm

  constructor(ten: string, tuoi: number, canNang: number, kichThuocCanh: number) {
    super(ten, tuoi, canNang);
    this.kichThuocCanh = kichThuocCanh;
  }

  public keuKeu(): void {
    console.log(`${this.ten} hót: Chip chip!`);
  }

  public diChuyen(): void {
    console.log(`${this.ten} đang bay với đôi cánh ${this.kichThuocCanh}cm.`);
  }

  public bay(): void {
    console.log(`${this.ten} đang bay lên cao!`);
  }

  public getKichThuocCanh(): number {
    return this.kichThuocCanh;
  }

  public hienThiThongTin(): void {
    super.hienThiThongTin();
    console.log(`Kích thước cánh: ${this.kichThuocCanh}cm`);
  }
}

// Sử dụng kế thừa
console.log("=== VÍ DỤ TÍNH KẾ THỪA ===");

const cho1 = new Cho("Buddy", 3, 15, "Golden Retriever");
const meo1 = new Meo("Kitty", 2, 4, "Trắng");
const chim1 = new Chim("Tweety", 1, 0.5, 20);

console.log("\n--- Thông tin các động vật ---");
cho1.hienThiThongTin();
console.log();
meo1.hienThiThongTin();
console.log();
chim1.hienThiThongTin();

console.log("\n--- Hoạt động của các động vật ---");
cho1.an();
cho1.keuKeu();
cho1.diChuyen();
cho1.batKhach();

console.log();
meo1.an();
meo1.keuKeu();
meo1.diChuyen();
meo1.batChuot();

console.log();
chim1.an();
chim1.keuKeu();
chim1.diChuyen();
chim1.bay();

// Polymorphism - sử dụng cùng một interface
console.log("\n--- Polymorphism ---");
const cacDongVat: DongVat[] = [cho1, meo1, chim1];

cacDongVat.forEach(dongVat => {
  dongVat.keuKeu();
  dongVat.diChuyen();
  console.log();
});
