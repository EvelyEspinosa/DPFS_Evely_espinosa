document.querySelector('.dropdown button').addEventListener('click', function() {
    const menu = document.querySelector('#dropdownMenu');
    
    menu.classList.toggle('active');
    
    const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !isExpanded);
  });