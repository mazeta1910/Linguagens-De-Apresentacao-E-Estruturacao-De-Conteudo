import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles.css';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('thdfm_cart')) || [];
    const count = cart.reduce((acc, item) => acc + (item.quantidade || 1), 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">

          <div className="header-left">
            <Link to="/" className="logo">
              <img src="/logo/THDFM.png" alt="THDFM Store Logo" className="logo-image"/>
              <span className="logo-text">THDFM Store</span>
            </Link>
            
            <nav className="nav">
              <Link to="/">Lançamentos</Link>
              <Link to="/">Promoções</Link>

              <div className="nav-dropdown">
                <span className="dropdown-trigger">
                  Camisetas <span className="arrow">▼</span>
                </span>
                <div className="dropdown-menu">
                  <Link to="/">Camisetas Oficiais</Link>
                  <Link to="/">Camisetas Exclusivas</Link>
                  <Link to="/">Seleções</Link>
                  <Link to="/">Clubes Nacionais</Link>
                </div>
              </div>

              <Link to="/">Acessórios</Link>
            </nav>
          </div>

          <div className="header-actions">
            
            <div className="search-container">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <input type="search" placeholder="Buscar..." className="search-input" />
            </div>
            
            <div className="profile-dropdown">
              <Link to="/auth" className="profile-btn" title="Minha Conta">
                <svg className="profile-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>

              <div className="dropdown-menu dropdown-right">
                <div className="dropdown-header-text">Olá, Visitante!</div>
                <Link to="/auth" state={{ startView: 'login' }}>Entrar</Link>
                <Link to="/auth" state={{ startView: 'register' }}>Criar Conta</Link>
                <div className="dropdown-divider"></div>
                <Link to="/minha-conta">Meus Pedidos</Link>
              </div>
            </div>
            
            <Link to="/carrinho" className="cart-btn" title="Carrinho">
              <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6zM3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="cart-count">{cartCount}</span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
}