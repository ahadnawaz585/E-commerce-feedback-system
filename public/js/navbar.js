class Navigation {
  constructor() {
      document.addEventListener('DOMContentLoaded', () => {
          this.toggleNavigation();
          this.toggleDropdowns();
          this.closeDropdownsOnClickOutside();
          this.preventDropdownCloseOnClickInside();
      });
  }

  toggleNavigation() {
      document.getElementById('navbar-toggle').addEventListener('click', function() {
          const navList = document.querySelector('nav ul');
          navList.style.display = (navList.style.display === 'block') ? 'none' : 'block';
          this.classList.toggle('active');
      });
  }

  toggleDropdowns() {
      document.querySelectorAll('nav ul li a:not(:only-child)').forEach(function(element) {
          element.addEventListener('click', function(e) {
              const dropdown = this.nextElementSibling;
              if (dropdown && dropdown.classList.contains('navbar-dropdown')) {
                  dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';

                  document.querySelectorAll('.navbar-dropdown').forEach(function(dd) {
                      if (dd !== dropdown) {
                          dd.style.display = 'none';
                      }
                  });
                  e.stopPropagation();
              }
          });
      });
  }

  closeDropdownsOnClickOutside() {
      document.addEventListener('click', function() {
          document.querySelectorAll('.navbar-dropdown').forEach(function(dd) {
              dd.style.display = 'none';
          });
      });
  }

  preventDropdownCloseOnClickInside() {
      document.querySelectorAll('nav ul').forEach(function(navUl) {
          navUl.addEventListener('click', function(e) {
              e.stopPropagation();
          });
      });
  }

  logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
}

}

// Create an instance of the Navigation class to initialize the navigation functionality
const navigation = new Navigation();
