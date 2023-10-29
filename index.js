// Định nghĩa đối tượng nhân viên
class NhanVien {
  constructor(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  ) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
  }
  validate() {
    if (!/^\d{4,6}$/.test(this.taiKhoan)) {
      alert("Tài khoản phải có từ 4 đến 6 ký số.");
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(this.hoTen)) {
      alert(
        "Tên nhân viên chỉ được chứa chữ cái khong dau và không được để trống."
      );
      return false;
    }

    //   const re =
    // /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //   if (!re.test(this.email)) {
    //     alert("Email không đúng định dạng hoặc để trống.");
    //     return false;
    //   }

    if (
      !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/.test(
        this.matKhau
      )
    ) {
      alert(
        "Mật khẩu phải từ 6 đến 10 ký tự, chứa ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt và không để trống."
      );
      return false;
    }

    if (!/\d{2}\/\d{2}\/\d{4}/.test(this.ngayLam)) {
      alert("Ngày làm không đúng định dạng (mm/dd/yyyy) hoặc để trống.");
      return false;
    }

    if (
      isNaN(this.luongCB) ||
      this.luongCB < 1000000 ||
      this.luongCB > 20000000
    ) {
      alert(
        "Lương cơ bản phải là số từ 1,000,000 đến 20,000,000 và không để trống."
      );
      return false;
    }

    if (this.chucVu === "Chọn chức vụ") {
      alert("Vui lòng chọn chức vụ.");
      return false;
    }

    if (isNaN(this.gioLam) || this.gioLam < 80 || this.gioLam > 200) {
      alert(
        "Số giờ làm trong tháng phải là số từ 80 đến 200 và không để trống."
      );
      return false;
    }

    return true; // Trả về true nếu tất cả điều kiện đều đúng
  }
  tinhTongLuong() {
    var heSoLuong;

    // Xác định hệ số lương dựa trên chức vụ
    switch (this.chucVu) {
      case "Giám đốc":
        heSoLuong = 3;
        break;
      case "Trưởng phòng":
        heSoLuong = 2;
        break;
      case "Nhân viên":
        heSoLuong = 1;
        break;
      default:
        heSoLuong = 1; // Mặc định nếu chức vụ không xác định
    }

    // Tính tổng lương dựa trên hệ số lương và số giờ làm
    return this.luongCB * heSoLuong * this.gioLam;
  }

  xepLoaiNhanVien() {
    var xepLoai;

    if (this.gioLam >= 192) {
      xepLoai = "Xuất sắc";
    } else if (this.gioLam >= 176) {
      xepLoai = "Giỏi";
    } else if (this.gioLam >= 160) {
      xepLoai = "Khá";
    } else {
      xepLoai = "Trung bình";
    }

    return xepLoai;
  }
}

// Thêm sự kiện click cho button "Thêm nhân viên"
document.getElementById("btnThemNV").addEventListener("click", function () {
  // Lấy giá trị từ form
  var taiKhoan = document.getElementById("tknv").value;
  var hoTen = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCB = document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = document.getElementById("gioLam").value;

  // Tạo đối tượng nhân viên từ thông tin nhập vào
  var nhanVien = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );

  // Hiển thị thông tin nhân viên trên bảng
  if (nhanVien.validate()) {
    hienThiThongTinNhanVien(nhanVien);
  }
});

// Hàm hiển thị thông tin nhân viên trên bảng
function hienThiThongTinNhanVien(nhanVien) {
  // Tạo một dòng mới trong bảng
  var tableDanhSach = document.getElementById("tableDanhSach");
  var newRow = tableDanhSach.insertRow();

  // Chèn thông tin nhân viên vào các ô của dòng mới
  newRow.insertCell().innerText = nhanVien.taiKhoan;
  newRow.insertCell().innerText = nhanVien.hoTen;
  newRow.insertCell().innerText = nhanVien.email;
  newRow.insertCell().innerText = nhanVien.ngayLam;
  newRow.insertCell().innerText = nhanVien.chucVu;
  newRow.insertCell().innerText = nhanVien.tinhTongLuong();
  newRow.insertCell().innerText = nhanVien.xepLoaiNhanVien();

  // Thêm nút chức năng (nếu cần)

  // Xóa giá trị trong các ô của form để chuẩn bị cho lần nhập tiếp theo
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "Chọn chức vụ";
  document.getElementById("gioLam").value = "";
  // Thêm button xóa
  var deleteButton = createDeleteButton();
  deleteButton.dataset.id = nhanVien.taiKhoan; // Lưu id để xác định nhân viên khi xóa
  var deleteCell = newRow.insertCell(-1);
  deleteCell.appendChild(deleteButton);

  // Đặt ID cho dòng
  newRow.id = nhanVien.taiKhoan + "-row";
}
function deleteEmployee() {
  var employeeId = this.dataset.id; // Lấy id của nhân viên từ thuộc tính dataset
  var row = document.getElementById(employeeId + "-row"); // ID của dòng chứa nhân viên

  if (!row) {
    console.error("Row not found for employee with ID:", employeeId);
    return;
  }

  console.log("Deleting employee with ID:", employeeId);

  // Xóa dòng từ bảng
  row.parentNode.removeChild(row);


}

// Hàm để tạo button xóa
function createDeleteButton() {
  var button = document.createElement("button");
  button.classList.add("btn", "btn-danger", "btn-sm");
  button.innerHTML = '<i class="fa fa-trash"></i>';
  button.addEventListener("click", deleteEmployee);
  return button;
}

function timKiemNhanVien() {
  var xepLoaiTimKiem = prompt("Nhập xếp loại cần tìm kiếm (Xuất sắc, Giỏi, Khá, Trung bình):");

  if (xepLoaiTimKiem) {
    // Convert the input to lowercase for case-insensitive comparison
    xepLoaiTimKiem = xepLoaiTimKiem.toLowerCase();

    // Loop through rows and hide/show based on the search criteria
    $("#tableDanhSach tr").each(function () {
      var xepLoaiNhanVien = $(this).find("td:eq(6)").text().toLowerCase();

      if (xepLoaiNhanVien.includes(xepLoaiTimKiem)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
}