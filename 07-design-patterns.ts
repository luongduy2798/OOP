// ===== VÍ DỤ 7: DESIGN PATTERNS =====

// ===== 1. SINGLETON PATTERN =====
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connectionString: string;
  private isConnected: boolean;

  private constructor() {
    this.connectionString = "mongodb://localhost:27017/myapp";
    this.isConnected = false;
    console.log("Tạo kết nối database mới");
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public connect(): void {
    if (!this.isConnected) {
      this.isConnected = true;
      console.log(`Đã kết nối database: ${this.connectionString}`);
    } else {
      console.log("Database đã được kết nối rồi!");
    }
  }

  public disconnect(): void {
    if (this.isConnected) {
      this.isConnected = false;
      console.log("Đã ngắt kết nối database");
    }
  }

  public query(sql: string): string[] {
    if (this.isConnected) {
      console.log(`Thực hiện query: ${sql}`);
      return [`result1`, `result2`, `result3`];
    } else {
      throw new Error("Chưa kết nối database!");
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

// ===== 2. FACTORY PATTERN =====
abstract class Vehicle {
  protected brand: string;
  protected model: string;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
  }

  abstract start(): void;
  abstract stop(): void;
  abstract getInfo(): string;
}

class CarVehicle extends Vehicle {
  private doors: number;

  constructor(brand: string, model: string, doors: number = 4) {
    super(brand, model);
    this.doors = doors;
  }

  start(): void {
    console.log(`${this.brand} ${this.model} (xe hơi) đã khởi động`);
  }

  stop(): void {
    console.log(`${this.brand} ${this.model} (xe hơi) đã dừng`);
  }

  getInfo(): string {
    return `Xe hơi ${this.brand} ${this.model} có ${this.doors} cửa`;
  }
}

class MotorbikeVehicle extends Vehicle {
  private engineSize: number; // cc

  constructor(brand: string, model: string, engineSize: number) {
    super(brand, model);
    this.engineSize = engineSize;
  }

  start(): void {
    console.log(`${this.brand} ${this.model} (xe máy) đã khởi động`);
  }

  stop(): void {
    console.log(`${this.brand} ${this.model} (xe máy) đã dừng`);
  }

  getInfo(): string {
    return `Xe máy ${this.brand} ${this.model} động cơ ${this.engineSize}cc`;
  }
}

class TruckVehicle extends Vehicle {
  private payload: number; // tấn

  constructor(brand: string, model: string, payload: number) {
    super(brand, model);
    this.payload = payload;
  }

  start(): void {
    console.log(`${this.brand} ${this.model} (xe tải) đã khởi động`);
  }

  stop(): void {
    console.log(`${this.brand} ${this.model} (xe tải) đã dừng`);
  }

  getInfo(): string {
    return `Xe tải ${this.brand} ${this.model} tải trọng ${this.payload} tấn`;
  }
}

// Factory class
class VehicleFactory {
  public static createVehicle(type: string, brand: string, model: string, ...args: any[]): Vehicle {
    switch (type.toLowerCase()) {
      case "car":
        return new CarVehicle(brand, model, args[0] || 4);
      case "motorbike":
        return new MotorbikeVehicle(brand, model, args[0] || 150);
      case "truck":
        return new TruckVehicle(brand, model, args[0] || 5);
      default:
        throw new Error(`Không hỗ trợ loại xe: ${type}`);
    }
  }

  public static getSupportedTypes(): string[] {
    return ["car", "motorbike", "truck"];
  }
}

// ===== 3. OBSERVER PATTERN =====
interface Observer {
  update(data: any): void;
  getId(): string;
}

interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observerId: string): void;
  notifyObservers(data: any): void;
}

class NewsPublisher implements Subject {
  private observers: Observer[] = [];
  private latestNews: string = "";

  public addObserver(observer: Observer): void {
    if (!this.observers.find(obs => obs.getId() === observer.getId())) {
      this.observers.push(observer);
      console.log(`Đã thêm subscriber: ${observer.getId()}`);
    }
  }

  public removeObserver(observerId: string): void {
    const index = this.observers.findIndex(obs => obs.getId() === observerId);
    if (index !== -1) {
      this.observers.splice(index, 1);
      console.log(`Đã xóa subscriber: ${observerId}`);
    }
  }

  public notifyObservers(data: any): void {
    console.log(`\n📢 Gửi tin tức đến ${this.observers.length} subscribers...`);
    this.observers.forEach(observer => observer.update(data));
  }

  public publishNews(news: string): void {
    this.latestNews = news;
    console.log(`\n🗞️ Tin tức mới: ${news}`);
    this.notifyObservers({
      news: news,
      timestamp: new Date(),
      publisher: "VN News"
    });
  }

  public getLatestNews(): string {
    return this.latestNews;
  }

  public getSubscriberCount(): number {
    return this.observers.length;
  }
}

class NewsSubscriber implements Observer {
  private id: string;
  private name: string;
  private receivedNews: any[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public update(data: any): void {
    this.receivedNews.push(data);
    console.log(`📧 ${this.name} nhận tin: "${data.news}" lúc ${data.timestamp.toLocaleTimeString()}`);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getReceivedNews(): any[] {
    return [...this.receivedNews];
  }

  public showHistory(): void {
    console.log(`\n📚 Lịch sử tin tức của ${this.name}:`);
    this.receivedNews.forEach((news, index) => {
      console.log(`${index + 1}. ${news.news} (${news.timestamp.toLocaleString()})`);
    });
  }
}

// ===== 4. STRATEGY PATTERN =====
interface PaymentStrategy {
  pay(amount: number): void;
  getPaymentType(): string;
}

class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;
  private cardHolderName: string;

  constructor(cardNumber: string, cardHolderName: string) {
    this.cardNumber = cardNumber;
    this.cardHolderName = cardHolderName;
  }

  pay(amount: number): void {
    console.log(`💳 Thanh toán ${amount.toLocaleString()}đ bằng thẻ tín dụng`);
    console.log(`   Thẻ: ****${this.cardNumber.slice(-4)} - ${this.cardHolderName}`);
  }

  getPaymentType(): string {
    return "Credit Card";
  }
}

class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  pay(amount: number): void {
    console.log(`🅿️ Thanh toán ${amount.toLocaleString()}đ qua PayPal`);
    console.log(`   Email: ${this.email}`);
  }

  getPaymentType(): string {
    return "PayPal";
  }
}

class BankTransferPayment implements PaymentStrategy {
  private bankAccount: string;
  private bankName: string;

  constructor(bankAccount: string, bankName: string) {
    this.bankAccount = bankAccount;
    this.bankName = bankName;
  }

  pay(amount: number): void {
    console.log(`🏦 Thanh toán ${amount.toLocaleString()}đ bằng chuyển khoản`);
    console.log(`   Ngân hàng: ${this.bankName} - STK: ****${this.bankAccount.slice(-4)}`);
  }

  getPaymentType(): string {
    return "Bank Transfer";
  }
}

class ShoppingCart {
  private items: { name: string; price: number; quantity: number }[] = [];
  private paymentStrategy: PaymentStrategy | null = null;

  public addItem(name: string, price: number, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ name, price, quantity });
    }
    console.log(`➕ Đã thêm ${quantity} ${name} vào giỏ hàng`);
  }

  public removeItem(name: string): void {
    const index = this.items.findIndex(item => item.name === name);
    if (index !== -1) {
      this.items.splice(index, 1);
      console.log(`➖ Đã xóa ${name} khỏi giỏ hàng`);
    }
  }

  public setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
    console.log(`💰 Đã chọn phương thức thanh toán: ${strategy.getPaymentType()}`);
  }

  public getTotalAmount(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  public showCart(): void {
    console.log("\n🛒 GIỎ HÀNG:");
    if (this.items.length === 0) {
      console.log("   Giỏ hàng trống");
      return;
    }

    this.items.forEach(item => {
      const total = item.price * item.quantity;
      console.log(`   ${item.name} x${item.quantity} - ${item.price.toLocaleString()}đ = ${total.toLocaleString()}đ`);
    });
    console.log(`   TỔNG CỘNG: ${this.getTotalAmount().toLocaleString()}đ`);
  }

  public checkout(): void {
    if (this.items.length === 0) {
      console.log("❌ Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    if (!this.paymentStrategy) {
      console.log("❌ Vui lòng chọn phương thức thanh toán!");
      return;
    }

    console.log("\n💰 THANH TOÁN:");
    this.showCart();
    this.paymentStrategy.pay(this.getTotalAmount());
    
    // Clear cart after payment
    this.items = [];
    console.log("✅ Thanh toán thành công! Giỏ hàng đã được xóa.");
  }
}

// ===== SỬ DỤNG CÁC DESIGN PATTERNS =====

console.log("=== VÍ DỤ DESIGN PATTERNS ===");

// 1. SINGLETON PATTERN
console.log("\n--- 1. SINGLETON PATTERN ---");
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log("db1 === db2:", db1 === db2); // true - cùng một instance

db1.connect();
db1.query("SELECT * FROM users");

// Thử tạo kết nối khác
db2.connect(); // Sẽ báo đã kết nối

// 2. FACTORY PATTERN
console.log("\n--- 2. FACTORY PATTERN ---");
console.log("Các loại xe được hỗ trợ:", VehicleFactory.getSupportedTypes());

const car = VehicleFactory.createVehicle("car", "Toyota", "Camry", 4);
const motorbike = VehicleFactory.createVehicle("motorbike", "Honda", "Wave", 110);
const truck = VehicleFactory.createVehicle("truck", "Hyundai", "Mighty", 3.5);

const vehicles = [car, motorbike, truck];
vehicles.forEach(vehicle => {
  console.log(vehicle.getInfo());
  vehicle.start();
  vehicle.stop();
  console.log();
});

// 3. OBSERVER PATTERN
console.log("\n--- 3. OBSERVER PATTERN ---");
const newsPublisher = new NewsPublisher();

const subscriber1 = new NewsSubscriber("001", "Nguyễn Văn A");
const subscriber2 = new NewsSubscriber("002", "Trần Thị B");
const subscriber3 = new NewsSubscriber("003", "Lê Văn C");

// Subscribe to news
newsPublisher.addObserver(subscriber1);
newsPublisher.addObserver(subscriber2);
newsPublisher.addObserver(subscriber3);

// Publish news
newsPublisher.publishNews("Việt Nam vô địch AFF Cup!");
newsPublisher.publishNews("Giá xăng tăng 500đ/lít từ ngày mai");

// Unsubscribe
newsPublisher.removeObserver("002");
newsPublisher.publishNews("Thời tiết hôm nay: Mưa rào và dông");

// Show history
subscriber1.showHistory();

// 4. STRATEGY PATTERN
console.log("\n--- 4. STRATEGY PATTERN ---");
const cart = new ShoppingCart();

// Add items to cart
cart.addItem("Laptop Dell", 15000000, 1);
cart.addItem("Chuột wireless", 500000, 2);
cart.addItem("Bàn phím cơ", 2000000, 1);

cart.showCart();

// Try different payment strategies
console.log("\n--- Thanh toán bằng thẻ tín dụng ---");
const creditCard = new CreditCardPayment("1234567890123456", "NGUYEN VAN A");
cart.setPaymentStrategy(creditCard);
cart.checkout();

// Add more items
cart.addItem("Màn hình 24 inch", 3000000, 1);
cart.addItem("Tai nghe", 1000000, 1);

console.log("\n--- Thanh toán bằng PayPal ---");
const paypal = new PayPalPayment("user@example.com");
cart.setPaymentStrategy(paypal);
cart.checkout();

// Add more items
cart.addItem("USB 32GB", 200000, 3);

console.log("\n--- Thanh toán bằng chuyển khoản ---");
const bankTransfer = new BankTransferPayment("1234567890", "Vietcombank");
cart.setPaymentStrategy(bankTransfer);
cart.checkout();

console.log("\n=== TÓM TẮT DESIGN PATTERNS ===");
console.log("1. SINGLETON: Đảm bảo chỉ có một instance duy nhất (DatabaseConnection)");
console.log("2. FACTORY: Tạo đối tượng mà không cần biết class cụ thể (VehicleFactory)");
console.log("3. OBSERVER: Thông báo thay đổi đến nhiều đối tượng (NewsPublisher/Subscriber)");
console.log("4. STRATEGY: Thay đổi thuật toán/chiến lược tại runtime (PaymentStrategy)");
