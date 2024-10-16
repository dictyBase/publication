import React from "react"
import querystring from "querystring"
import { useLoginMutation, User } from "dicty-graphql-schema"
import { useAuthStore, ActionType } from "components/auth/AuthStore"
import oauthConfig from "common/utils/oauthConfig"
import { useRouter } from "next/router"

type LoginEventData = {
  /** Third-party provider (orcid, google, linkedin) */
  provider: string
  /** Query containing authorization code and possibly state */
  query: string
  /** Callback URL */
  url: string
}

const getLoginInputVariables = (data: LoginEventData) => {
  const provider = (oauthConfig as any)[data.provider]
  const parsed = querystring.parse(data.query.replace("?", ""))

  const variables = {
    input: {
      client_id: provider.clientId,
      redirect_url: data.url,
      state: parsed?.state?.toString() || "state",
      code: parsed.code as string,
      scopes: provider.scopes[0],
      provider: data.provider,
    },
  }

  return variables
}

/**
 * OauthSignHandler listens to an event message and attempts to login
 * with the event data.
 */

const OauthSignHandler = () => {
  const router = useRouter()
  const { dispatch } = useAuthStore()
  const [login, { data }] = useLoginMutation()

  React.useEffect(() => {
    const onMessage = async (event: MessageEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (!event.data.provider) {
        return
      }
      router.push("/load/auth")
      try {
        const { data } = await login({
          variables: getLoginInputVariables(event.data),
        })
        dispatch({
          type: ActionType.LOGIN,
          payload: {
            token: data?.login?.token as string,
            user: data?.login?.user as User,
            provider: data?.login?.identity.provider as string,
          },
        })
        router.push("/")
      } catch (error) {
        dispatch({
          type: ActionType.LOGIN_ERROR,
          payload: {
            error: error,
          },
        })
        router.push("/login")
      }
    }
    window.addEventListener("message", onMessage, false)
    return () => {
      window.removeEventListener("message", onMessage)
    }
  }, [data, dispatch, history, login])

  return null
}

export default OauthSignHandler
