defmodule Rpgr.Auth.Guardian do
  use Guardian, otp_app: :rpgr
  alias Rpgr.Auth
  require Logger

  def subject_for_token(user, _claims) do
    {:ok, to_string(user.id)}
  end

  def resource_from_claims(claims) do
    Logger.debug("Getting claims")

    user =
      claims["sub"]
      |> Auth.get_user!()

    Logger.debug("Got claims")

    {:ok, user}
    # If something goes wrong here return {:error, reason}
  end
end
