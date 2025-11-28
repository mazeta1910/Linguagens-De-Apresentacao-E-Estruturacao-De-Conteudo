import { Link } from "react-router-dom";
import "./styles.css";

export default function ProductCard({ product }) {
  // Lógica para pegar o preço (igual estava na Home)
  const displayVariant = product.variantes ? product.variantes[0] : {};
  const currentPrice = displayVariant.preco || product.preco;
  const oldPrice = displayVariant.precoAntigo || product.precoAntigo;

  return (
    <div className="product-card-component">
      {product.badge && (
        <div className="product-badge">{product.badge}</div>
      )}
      
      <Link to={`/produto/${product.id}`} className="product-link-area">
        <div className="product-image">
          <img 
            src={product.imagemPrincipal || product.imagem} 
            alt={product.nome} 
          />
        </div>
        
        <div className="product-info">
          <h3>{product.nome}</h3>
          <div className="product-price">
            <span className="price-current">
              R$ {currentPrice?.toFixed(2)}
            </span>
            {oldPrice && (
              <span className="price-old">
                R$ {oldPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <Link to={`/produto/${product.id}`} className="btn-card-action">
        🛒 Ver Opções
      </Link>
    </div>
  );
}