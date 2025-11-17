document.addEventListener('DOMContentLoaded', function () {
	// Initialize AOS (hanya jika ada)
	if (window.AOS && typeof AOS.init === 'function') {
		AOS.init({ duration: 800, once: true });
	}

	// === Bagian ini berpotensi menyebabkan error di reports.html ===
	
	// Gunakan pengecekan if untuk memastikan elemen ada
	var bsCollapse = document.querySelector('.navbar-collapse');
	
	if (bsCollapse) {
		var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
		
		if (navLinks.length) {
			navLinks.forEach(function (link) {
				link.addEventListener('click', function () {
					// Pastikan bootstrap.Collapse ada sebelum memanggilnya
					if (window.bootstrap && window.bootstrap.Collapse) {
						var bs = bootstrap.Collapse.getInstance(bsCollapse) || new bootstrap.Collapse(bsCollapse);
						bs.hide();
					}
				});
			});
		}
	}
	// === Akhir Bagian yang Diperbaiki ===

});