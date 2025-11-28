import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './styles.css';

// --- COMPONENTE LOGIN (Mantido igual) ---
function LoginForm({ onToggle }) { 
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Fazer Login</h1>
        <p>Entre na sua conta para continuar</p>
      </div>

      <form className="login-form">
        <div className="form-group">
          <label htmlFor="login-email">E-mail *</label>
          <input type="email" id="login-email" placeholder="seu@email.com" required />
        </div>

        <div className="form-group">
          <div className="password-header">
            <label htmlFor="login-senha">Senha *</label>
            <Link to="/esqueci-senha" className="forgot-password">Esqueci minha senha</Link>
          </div>
          <input type="password" id="login-senha" placeholder="Sua senha" required />
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="lembrar" />
          <label htmlFor="lembrar">Lembrar de mim</label>
        </div>

        <button type="submit" className="btn-login">Entrar</button>

        <div className="login-divider"><span>ou</span></div>

        <div className="social-login">
          <button type="button" className="btn-social btn-google">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuar com Google
          </button>
          <button type="button" className="btn-social btn-facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Continuar com Facebook
          </button>
        </div>

        <div className="register-link">
          <p>
            Não tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); onToggle(); }} className="toggle-link">Cadastre-se</a>
          </p>
        </div>
      </form>
    </div>
  );
}

// --- COMPONENTE CADASTRO (ATUALIZADO COM IBGE) ---
function RegisterForm({ onToggle }) {
  // 1. Estados para controlar UF e Cidades
  const [selectedUF, setSelectedUF] = useState('');
  const [cityList, setCityList] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  // 2. Busca as cidades na API do IBGE quando a UF muda
  useEffect(() => {
    if (selectedUF) {
      setLoadingCities(true);
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
        .then(response => response.json())
        .then(data => {
          // Ordena as cidades por nome para ficar bonito
          const cities = data.map(city => city.nome).sort();
          setCityList(cities);
          setLoadingCities(false);
        })
        .catch(err => {
          console.error("Erro ao buscar cidades do IBGE:", err);
          setLoadingCities(false);
        });
    } else {
      setCityList([]); // Limpa se não tiver UF
    }
  }, [selectedUF]);

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>Criar Conta</h1>
        <p>Cadastre-se para uma experiência personalizada</p>
      </div>

      <form className="register-form">
        {/* Dados Pessoais */}
        <div className="form-section">
          <h3>Dados Pessoais</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome Completo *</label>
              <input type="text" id="nome" placeholder="Seu nome completo" required />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF *</label>
              <input type="text" id="cpf" placeholder="000.000.000-00" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento *</label>
              <input type="date" id="dataNascimento" required />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone *</label>
              <input type="tel" id="telefone" placeholder="(11) 99999-9999" required />
            </div>
          </div>
        </div>

        {/* Dados de Acesso */}
        <div className="form-section">
          <h3>Dados de Acesso</h3>
          <div className="form-group">
            <label htmlFor="reg-email">E-mail *</label>
            <input type="email" id="reg-email" placeholder="seu@email.com" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reg-senha">Senha *</label>
              <input type="password" id="reg-senha" placeholder="Mínimo 8 caracteres" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha *</label>
              <input type="password" id="confirmarSenha" placeholder="Digite novamente sua senha" required />
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="form-section">
          <h3>Endereço</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cep">CEP *</label>
              <input type="text" id="cep" placeholder="00000-000" required />
            </div>
            
            {/* SELECT DE ESTADO COM EVENTO ONCHANGE */}
            <div className="form-group">
              <label htmlFor="estado">Estado *</label>
              <select 
                id="estado" 
                required 
                value={selectedUF}
                onChange={(e) => setSelectedUF(e.target.value)} // Atualiza o estado
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            {/* CIDADE AGORA É UM SELECT DINÂMICO */}
            <div className="form-group">
              <label htmlFor="cidade">Cidade *</label>
              {cityList.length > 0 ? (
                <select id="cidade" required disabled={loadingCities}>
                  <option value="">{loadingCities ? 'Carregando...' : 'Selecione a cidade'}</option>
                  {cityList.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              ) : (
                // Fallback caso não tenha estado selecionado ou dê erro
                <input 
                  type="text" 
                  id="cidade" 
                  placeholder={selectedUF ? "Carregando cidades..." : "Selecione o Estado primeiro"} 
                  disabled={!selectedUF}
                  required
                />
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="bairro">Bairro *</label>
              <input type="text" id="bairro" placeholder="Seu bairro" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="logradouro">Logradouro *</label>
            <input type="text" id="logradouro" placeholder="Rua, Avenida, etc." required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="numero">Número *</label>
              <input type="text" id="numero" placeholder="123" required />
            </div>
            <div className="form-group">
              <label htmlFor="complemento">Complemento</label>
              <input type="text" id="complemento" placeholder="Apto, Bloco, etc." />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="checkbox-group">
            <input type="checkbox" id="termos" required />
            <label htmlFor="termos">
              Concordo com os <Link to="/termos">Termos de Uso</Link> e <Link to="/privacidade">Política de Privacidade</Link> *
            </label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="newsletter" />
            <label htmlFor="newsletter">Desejo receber ofertas e novidades por e-mail</label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Criar Conta</button>
          <p className="login-link">
            Já tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); onToggle(); }} className="toggle-link">Fazer Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.startView === 'register') {
      setIsLoginView(false);
    } else if (location.state?.startView === 'login') {
      setIsLoginView(true);
    }
  }, [location]);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="page-container">
      <Header /> 
      <main className="auth-main">
        {isLoginView ? (
          <LoginForm onToggle={toggleView} />
        ) : (
          <RegisterForm onToggle={toggleView} />
        )}
      </main>
      <Footer />
    </div>
  );
}