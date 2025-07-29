declare module '@permaweb/aoconnect' {
  export function message(params: {
    process: string
    tags: Array<{ name: string; value: string }>
    signer: any
    data: string
  }): Promise<any>

  export function result(params: {
    process: string
    message: string
  }): Promise<any>

  export function createDataItemSigner(wallet: any): any

  export function connect(params?: any): any
}

declare global {
  interface Window {
    arweaveWallet: {
      connect(): Promise<void>
      disconnect(): Promise<void>
      getActiveAddress(): Promise<string>
      sign(transaction: any): Promise<any>
      dispatch(transaction: any): Promise<any>
    }
  }
}

export {}
