const container = document.getElementById('reportList');
const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');
const applyFilterBtn = document.getElementById("applyFilter");
const clearBtn = document.getElementById('clearFilter');

// Variabel reports harus diinisialisasi secara global
let reports = JSON.parse(localStorage.getItem('reports')) || [];

// --- FUNGSI UTAMA: MEMUAT DATA DAN MERENDER ---
function loadReports() {
    // Ambil data terbaru dari localStorage dan update variabel global 'reports'
    reports = JSON.parse(localStorage.getItem('reports')) || [];
    
    // Tampilkan info total laporan
    const infoElement = document.getElementById("filterStatusInfo");
    if (infoElement) {
        infoElement.innerText = `Total: ${reports.length} laporan`;
    }

    renderCards(reports);
}

// --- FUNGSI MERENDER kartu laporan ke HTML ---
function renderCards(reportsToRender) {
    container.innerHTML = '';
    if (reportsToRender.length === 0) {
      container.innerHTML = `<p class="text-center">Tidak ada laporan.</p>`;
      return;
    }

    reportsToRender.forEach(r => {
  container.innerHTML += `
    <div class="col-md-4">
      <div class="card shadow-sm">
        ${r.image ? `<img src="${r.image}" class="card-img-top" alt="Foto Fasilitas">` : ''}
        <div class="card-body">
          <h5 class="card-title">${r.name}</h5>
          <p class="card-text text-truncate">${r.description}</p>
          <span class="badge bg-${r.status === 'Selesai' ? 'success' : r.status === 'Diproses' ? 'warning' : 'secondary'}">
            ${r.status}
          </span>
          <div class="mt-3 d-flex justify-content-between">
            <a href="report-detail.html?id=${r.id}" class="btn btn-sm btn-primary">Detail</a>
            <button class="btn btn-sm btn-danger" onclick="deleteReport(${r.id})">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  `;
});
}


// --- FUNGSI untuk FILTER laporan ---
function applyFilter() {
  const searchValue = searchInput.value.toLowerCase();
  const filterValue = filterStatus.value;

  const filtered = reports.filter(r =>
    (r.name.toLowerCase().includes(searchValue)) &&
    (filterValue === "" || r.status === filterValue)
  );

  document.getElementById("filterStatusInfo").innerText =
    `Filter diterapkan: ${filtered.length} laporan ditemukan`;

  renderCards(filtered);
}


// --- FUNGSI untuk HAPUS laporan (Dibuat global) ---
function deleteReport(id) {
  if (!confirm("Yakin ingin menghapus laporan ini?")) return;

  reports = reports.filter(report => report.id !== id);
  localStorage.setItem('reports', JSON.stringify(reports));

  alert("Laporan berhasil dihapus!");
  loadReports(); 
}


// --- EVENT LISTENERS & INITIAL LOAD ---

// Memastikan loadReports dipanggil setelah DOM siap
window.addEventListener('DOMContentLoaded', loadReports);

applyFilterBtn.addEventListener("click", applyFilter);
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    filterStatus.value = '';
    loadReports();
});

// Panggil sekali untuk memastikan tampilan awal terisi
loadReports();