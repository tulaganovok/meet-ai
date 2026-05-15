import { StreamVideoClient } from "@stream-io/video-react-sdk"

let client: StreamVideoClient | null = null

export const getStreamVideoClient = ({
  apiKey,
  user,
  tokenProvider,
}: {
  apiKey: string
  user: {
    id: string
    name: string
    image?: string
  }
  tokenProvider: () => Promise<string>
}) => {
  if (!client) {
    client = StreamVideoClient.getOrCreateInstance({
      apiKey,
      user,
      tokenProvider,
    })
  }

  return client
}

export const disconnectStreamVideoClient = async () => {
  if (client) {
    await client.disconnectUser()
    client = null
  }
}
