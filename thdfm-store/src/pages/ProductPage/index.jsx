import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import "./styles.css";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentImage, setCurrentImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState("descricao");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const mockReviews = [
    {
      id: 1,
      user: "João Silva",
      rating: 5,
      date: "20/11/2024",
      comment: "A camiseta é excelente! Tecido confortável e estampa de alta qualidade.",
    },
    {
      id: 2,
      user: "Maria Oliveira",
      rating: 4,
      date: "18/11/2024",
      comment: "Gostei muito, mas achei a forma pequena. Peça um número maior.",
    },
    {
      id: 3,
      user: "Carlos Souza",
      rating: 5,
      date: "15/11/2024",
      comment: "Entrega rápida e produto top! Clássica demais.",
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetch("/produtos/produtos.json")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao carregar");
        return response.json();
      })
      .then((data) => {
        const currentId = parseInt(id);
        const foundProduct = data.find((p) => p.id === currentId);
        
        setProduct(foundProduct);

        if (foundProduct) {
          const initialImg = foundProduct.imagemPrincipal || foundProduct.imagem;
          setCurrentImage(initialImg); 
        }

        const others = data.filter((p) => p.id !== currentId).slice(0, 3);
        setRelatedProducts(others);

        setLoading(false);
        setActiveTab("descricao");
        setSelectedSize("M");
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.error("Erro:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-container">Carregando...</div>;
  if (!product) return <div className="loading-container">Produto não encontrado</div>;

  const displayVariant = product.variantes ? product.variantes[0] : {};
  const displayPrice = displayVariant.preco || product.preco;
  const displayOldPrice = displayVariant.precoAntigo || product.precoAntigo;

  const discountValue = displayOldPrice
    ? Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100)
    : 0;

  const sizes = product.tamanhos || ["P", "M", "G", "GG"];
  const reviewCount = product.avaliacoes || mockReviews.length;

  const fullDescription = product.descricaoLonga || 
    "Esta camiseta é confeccionada com algodão 100% premium, fio 30.1 penteado, garantindo um toque macio e maior durabilidade. A estampa é feita em Silk Screen de alta definição.";

  let galleryImages = [];
  if (product.imagens && product.imagens.length > 0) {
    galleryImages = product.imagens;
  } else {
    galleryImages = [product.imagemPrincipal || product.imagem];
    if (product.variantes) {
      product.variantes.forEach((v) => {
        if (v.imagem && !galleryImages.includes(v.imagem)) {
          galleryImages.push(v.imagem);
        }
      });
    }
  }
  galleryImages = [...new Set(galleryImages)];
  if (galleryImages.length === 1) {
     galleryImages.push(galleryImages[0]); 
  }

  const addToCart = () => {
    const newItem = {
      id: product.id,
      nome: product.nome,
      imagem: currentImage,
      preco: displayPrice,
      precoPix: displayPrice * 0.95,
      quantidade: 1,
      tamanho: selectedSize,
      cor: "Padrão",
      estilo: `REF-${product.id}`,
    };

    const currentCart = JSON.parse(localStorage.getItem("thdfm_cart")) || [];
    const existingItemIndex = currentCart.findIndex(
      (item) => item.id === newItem.id && item.tamanho === newItem.tamanho
    );

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantidade += 1;
    } else {
      currentCart.push(newItem);
    }

    localStorage.setItem("thdfm_cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("cartUpdated"));
    setShowSuccessModal(true);
  };

  return (
    <div className="page-container">
      <Header />

      <main className="product-page">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/">Camisetas</Link> /{" "}
          <span>{product.nome}</span>
        </div>

        <div className="product-container">
          
          <div className="product-image-section">
            <div className="main-image">
              <img src={currentImage} alt={product.nome} />
            </div>
            <div className="thumbnails">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumb ${index}`}
                  className={`thumbnail ${currentImage === img ? "active" : ""}`}
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="product-info-section">
            <h1>{product.nome}</h1>

            <div className="rating-row">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="reviews-count">({reviewCount} avaliações)</span>
            </div>

            <div className="price-row">
              <span className="current-price">R$ {displayPrice?.toFixed(2)}</span>
              {displayOldPrice && (
                <>
                  <span className="old-price">R$ {displayOldPrice.toFixed(2)}</span>
                  {discountValue > 0 && (
                    <span className="discount-tag">-{discountValue}% OFF</span>
                  )}
                </>
              )}
            </div>

            <div className="size-section">
              <label>Tamanho:</label>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {product.estoque !== false && (
              <div className="stock-status">✅ Em estoque</div>
            )}

            {/* --- NOVAS CLASSES AQUI --- */}
            <div className="action-buttons">
              {/* Botão Primário (Azul) */}
              <button className="pp-btn-primary" onClick={addToCart}>
                ADICIONAR AO CARRINHO
              </button>
              
              {/* Botão Secundário (Transparente) */}
              <Link to="/" className="pp-btn-secondary">
                Continuar Comprando
              </Link>
            </div>
            {/* -------------------------- */}

            <div className="shipping-info">
              <p>🚚 Frete grátis acima de R$ 200</p>
              <p>💳 Parcele em até 3x sem juros</p>
            </div>

            <div className="calculate-shipping">
              <label>Calcular Frete:</label>
              <div className="shipping-input-group">
                <input type="text" placeholder="00000-000" maxLength="9" />
                <button className="btn-calc">Calcular</button>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "descricao" ? "active" : ""}`}
              onClick={() => setActiveTab("descricao")}
            >
              Especificações
            </button>
            <button
              className={`tab-btn ${activeTab === "avaliacoes" ? "active" : ""}`}
              onClick={() => setActiveTab("avaliacoes")}
            >
              Avaliações ({reviewCount})
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === "descricao" && (
              <div className="tab-panel fade-in">
                <h3>Descrição do Produto:</h3>
                <p>{fullDescription}</p>
                <br />
                <h3>Ficha Técnica:</h3>
                <ul className="specs-list">
                  <li><strong>Material:</strong> 100% Algodão 30.1 Penteado</li>
                  <li><strong>Estampa:</strong> Silk Screen (Serigrafia)</li>
                  <li><strong>Gola:</strong> Careca com reforço</li>
                  <li><strong>Manga:</strong> Curta</li>
                  <li><strong>Origem:</strong> Nacional</li>
                </ul>
              </div>
            )}

            {activeTab === "avaliacoes" && (
              <div className="tab-panel fade-in">
                <h3>O que os clientes estão dizendo:</h3>
                <div className="reviews-list">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <span className="review-author">{review.user}</span>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <div className="review-rating">
                        {"⭐".repeat(review.rating)}
                      </div>
                      <p className="review-text">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Quem viu, comprou também</h2>
            <div className="products-grid">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Produto Adicionado!</h3>
              <p className="modal-product-name">{product.nome}</p>
              <p className="modal-product-details">
                Tamanho: <strong>{selectedSize}</strong>
              </p>
              <div className="modal-actions">
                <button className="btn-modal-continue" onClick={() => setShowSuccessModal(false)}>
                  Continuar Comprando
                </button>
                <Link to="/carrinho" className="btn-modal-cart">
                  Finalizar Compra
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}