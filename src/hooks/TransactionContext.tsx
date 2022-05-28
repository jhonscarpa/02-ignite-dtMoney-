import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { TypeTransactions } from '../@types/transactionType'
import { api } from '../services/api'

interface IPropsContext {
  children: ReactNode
}
type TransactionInput = Omit<TypeTransactions, 'id' | 'createAt'>

interface IPropsContextValues {
  transactions: TypeTransactions[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionContext = createContext<IPropsContextValues>(
  {} as IPropsContextValues,
)

export function TransactionProvider({ children }: IPropsContext) {
  const [transactions, setTransactions] = useState<TypeTransactions[]>([])

  useEffect(() => {
    api
      .get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createAt: new Date(),
    })
    const { transaction } = response.data
    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction() {
  const context = useContext(TransactionContext)

  return context
}
