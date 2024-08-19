document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.sidebar ul li');

    sidebarItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const submenu = item.querySelector('.submenu');

            if (submenu) {
                event.preventDefault(); // Prevent navigation if submenu is toggled
                submenu.classList.toggle('open');
                item.classList.toggle('open');
            }
        });
    });

    // Allow click event to propagate for submenu links
    const submenuLinks = document.querySelectorAll('.submenu a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.stopPropagation();
            window.location.href = link.href;
        });
    });
});

// Dynamically fill submenu links
fillSubmenu();

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
}

// Dynamically fill submenu links
function fillSubmenu() {
    const submenuData = {
        'services': [
            { href: '?page=product', text: 'Products' },
            { href: '?page=delivery', text: 'Delivery' }
        ],
        'feedback': [
            { href: '?page=feedback', text: 'Feedback' },
            { href: '?page=productFeedBack', text: 'Product Feedback' },
            { href: '?page=platformFeedBack', text: 'Platform Feedback' },
            { href: '?page=report', text: 'Feedback Report', adminOnly: true }
        ],
        'account': [
            { href: '?page=admin', text: 'AdminLTE', adminOnly: true },
            { href: '?page=login', text: 'Login', loggedIn: false },
            { href: '#', text: 'Logout', loggedIn: true, onClick: logout }
        ]
    };

    const isAdmin = document.cookie.includes('admin_token');
    const isLoggedIn = document.cookie.includes('token');

    document.querySelectorAll('.has-submenu').forEach(item => {
        const submenuKey = item.querySelector('a').innerText.toLowerCase();
        const submenu = item.querySelector('.submenu');

        if (submenuData[submenuKey]) {
            submenuData[submenuKey].forEach(linkData => {
                if ((linkData.adminOnly && !isAdmin) || (linkData.loggedIn !== undefined && linkData.loggedIn !== isLoggedIn)) {
                    return;
                }

                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = linkData.href;
                a.textContent = linkData.text;
                if (linkData.onClick) {
                    a.addEventListener('click', linkData.onClick);
                }
                li.appendChild(a);
                submenu.appendChild(li);
            });
        }
    });
}
