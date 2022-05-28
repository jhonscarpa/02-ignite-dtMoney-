import logoImg from '../../assets/logo.svg'

import { Container, Content } from './styles'

interface IPropsHeader {
  onOpenNewTransactionModal: () => void
}

export function Header({ onOpenNewTransactionModal }: IPropsHeader) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt Money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  )
}
