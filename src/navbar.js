class RoninNavbar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      const navbarHTML = `
        <style>
          :host {
            --nav-background-color: #053658;
            --nav-text-color: #fff;
            --nav-hover-color: rgba(255, 255, 255, 0.7);
          }
          nav {
            display: flex;
            justify-content: center;
            background-color: var(--nav-background-color);
            padding: 10px 0;
          }
          nav a {
            color: var(--nav-text-color);
            text-decoration: none;
            margin: 0 15px;
            transition: color 0.3s;
          }
          nav a:hover {
            color: var(--nav-hover-color);
          }
  
          /* Responsive styles */
          @media (max-width: 768px) {
            nav {
              flex-direction: column;
              align-items: center;
            }
            nav a {
              display: block;
              margin: 5px 0;
            }
            .menu-btn {
              display: none;
            }
          }
  
          /* Styles for menu button (hamburger icon) */
          @media (max-width: 768px) {
            .menu-btn {
              display: initial;
              position: absolute;
              right: 10px;
              top: 10px;
              cursor: pointer;
            }
            nav {
              display: none;
            }
            nav.open {
              display: flex;
            }
          }
        </style>
        <div class="menu-btn">☰</div>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>
      `;
  
      this.shadowRoot.innerHTML = navbarHTML;
  
      // Add JavaScript for toggle button
      this.shadowRoot.querySelector('.menu-btn').addEventListener('click', () => {
        const nav = this.shadowRoot.querySelector('nav');
        nav.classList.toggle('open');
      });
    }
  }
  
  customElements.define('ronin-navbar', RoninNavbar);
  