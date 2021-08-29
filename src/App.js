import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as S from './styled';


const FormInput = styled.input`
padding: 3px;
margin-left: 8px;
border: 1px solid #ddd;
border-radius: 15px;

`;
const ErrorSpan = styled.span`
  display: ${(props) => props.isError ? 'block' : 'none'};
  padding: 3px;
  margin-left: 8px;
  border: 1px solid #ddd;
  border-radius: 15px;
`;


const App = (props) => {

  const fetchAddress = async () => {
    const address = await axios.get(`https://viacep.com.br/ws/${form.cep}/json/`);
    setForm({ ...form, logradouro: address.data.logradouro });
  };

  const createCandidate = async (candidate) => {
    try {
      const user = await axios.post('http://localhost:5000/register', form);
      if (user.status === 200) {
        alert('iti malia deu certo');
      }

    } catch (error) {
      setCpfError(true);
    }
  };

  const [form, setForm] = useState({
    name: '',
    cep: '',
    email: '',
    gender: '',
  });

  const [cpfError, setCpfError] = useState(false);



  return (
    <S.Corpo>
    <S.Conteiner>
       <S.Dtitle>
        <S.Title>JobsNET</S.Title>
      </S.Dtitle>

      <S.Form>
        <S.Cabecalho>Dados Pessoais</S.Cabecalho>
        <label>Nome Completo</label>
        <FormInput onChange={(e) => {
          setForm({ ...form, name: e.target.value });
        }} value={form.name}></FormInput>

        <p><label for="ccargo">Cargo Pretendido</label><S.Entrada type="text" name="tnome"id="ccargo" size="30" maxlength="20"/></p>
                
        <p><label for="cdata">Data de Nascimento<S.Asterisco>*</S.Asterisco></label><S.Entrada type="date" name="tdata" id="cdata"/></p>
                
        <p><label for="ccivil">Estado Civil</label><S.Selecao name="tcivil" id="ccivil">
            <optgroup>
              <option value="Solteira(o)">Solteira(o)</option>
              <option value="Casada(o)">Casada(o)</option>
              <option value="Separada(o)">Separada(o)</option>
              <option value="Divorciada(o)">Divorciada(o)</option>
              <option value="Viúva(o)">Viúva(o)</option>
            </optgroup>
          </S.Selecao></p>
                
          <label>Gênero</label>
        <FormInput onChange={(e) => {
          setForm({ ...form, gender: e.target.value });
        }} value={form.gender}></FormInput>

      
      
           <p><label for="cend">Endereço<S.Asterisco>*</S.Asterisco></label><S.Entrada type="text" placeholder="Logradouro, nº e complemento" name="tend" id="cend" size="30" maxlength="80"/></p>

            <p><label for="cbairro">Bairro<S.Asterisco>*</S.Asterisco></label><S.Entrada type="text" name="tbairro" id="cbairro" size="15" maxlength="20"/></p>

            <p><label for="ccid">Cidade<S.Asterisco>*</S.Asterisco></label><S.Entrada type="text" name="tcid" id="ccid" size="15" maxlength="20"/></p> 

        <label>CEP</label>
        <FormInput onBlur={() => {
          fetchAddress();
        }} onChange={(e) => {
          setForm({ ...form, cep: e.target.value });
        }} value={form.cep}></FormInput>
      
      
      
      <p><label for="ctel">Telefone</label><S.Entrada type="text" name="ttel" id="ctel"/></p>

      <p><label for="ccel">Celular</label><S.Entrada type="text" name="tcel" id="ccel"/></p>

        <label>Email</label>
        <FormInput onChange={(e) => {
          setForm({ ...form, email: e.target.value });
        }} value={form.email}></FormInput>
        <ErrorSpan isError={cpfError}>CEP inválido ou incorreto. Por favor, tente novamente.</ErrorSpan>
      

      
        <S.Cabecalho>Documentos</S.Cabecalho>
      <p><label for="cid">RG<S.Asterisco>*</S.Asterisco></label><S.Entrada type="text" name="tid" id="cid"/></p>
                
                <p><label for="ccpf">CPF<S.Asterisco>*</S.Asterisco></label><S.Entrada type="text" name="tcpf" id="ccpf"/></p>

                <p><label for="ccarro">Possui veículo</label><S.Selecao name="tcarro" id="ccarro">
                    <optgroup>
                        <option value="sim">Sim</option>
                        <option value="não">Não</option>
                    </optgroup>
                </S.Selecao></p>

                <p><label for="chab">Habilitação</label><S.Selecao name="thab" id="chab">
                    <optgroup>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="não">Não</option>
                    </optgroup>
                </S.Selecao></p>

                <button onClick={() => createCandidate()}> Enviar!</button>
      </S.Form>

      
      </S.Conteiner>
      </S.Corpo>

  );
};

export default App;
