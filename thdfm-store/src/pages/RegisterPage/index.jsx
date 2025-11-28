import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./styles.css";

export default function RegisterPage() {
  return (
    <div className="page-container">
      <Header />
      <main className="register-main">
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
                  <input
                    type="text"
                    id="nome"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpf">CPF *</label>
                  <input
                    type="text"
                    id="cpf"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dataNascimento">Data de Nascimento *</label>
                  <input type="date" id="dataNascimento" required />
                </div>
                <div className="form-group">
                  <label htmlFor="telefone">Telefone *</label>
                  <input
                    type="tel"
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dados de Acesso */}
            <div className="form-section">
              <h3>Dados de Acesso</h3>
              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="senha">Senha *</label>
                  <input
                    type="password"
                    id="senha"
                    placeholder="Mínimo 8 caracteres"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmarSenha">Confirmar Senha *</label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    placeholder="Digite novamente sua senha"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="form-section">
              <h3>Endereço</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cep">CEP *</label>
                  <input
                    type="text"
                    id="cep"
                    placeholder="00000-000"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="estado">Estado *</label>
                  <select id="estado" required>
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
                <div className="form-group">
                  <label htmlFor="cidade">Cidade *</label>
                  <input
                    type="text"
                    id="cidade"
                    placeholder="Sua cidade"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bairro">Bairro *</label>
                  <input
                    type="text"
                    id="bairro"
                    placeholder="Seu bairro"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="logradouro">Logradouro *</label>
                <input
                  type="text"
                  id="logradouro"
                  placeholder="Rua, Avenida, etc."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="numero">Número *</label>
                  <input type="text" id="numero" placeholder="123" required />
                </div>
                <div className="form-group">
                  <label htmlFor="complemento">Complemento</label>
                  <input
                    type="text"
                    id="complemento"
                    placeholder="Apto, Bloco, etc."
                  />
                </div>
              </div>
            </div>

            {/* Termos e Condições */}
            <div className="form-section">
              <div className="checkbox-group">
                <input type="checkbox" id="termos" required />
                <label htmlFor="termos">
                  Concordo com os <Link to="/termos">Termos de Uso</Link> e{" "}
                  <Link to="/privacidade">Política de Privacidade</Link> *
                </label>
              </div>

              <div className="checkbox-group">
                <input type="checkbox" id="newsletter" />
                <label htmlFor="newsletter">
                  Desejo receber ofertas e novidades por e-mail
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Criar Conta
              </button>
              <p className="login-link">
                Já tem uma conta? <Link to="/login">Fazer Login</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
